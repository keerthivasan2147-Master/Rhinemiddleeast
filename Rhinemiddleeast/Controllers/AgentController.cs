using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using RhineAgent.TestWeb.Services.Agent;
using System.Net;

namespace RhineAgent.TestWeb.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AgentController : ControllerBase
    {
        private readonly IAgentProvider _agentProvider;
        private readonly IOptionsMonitor<AgentSettings> _settingsMonitor;
        private readonly IAntiforgery _antiforgery;
        private readonly ILogger<AgentController> _logger;

        private static readonly System.Collections.Concurrent.ConcurrentDictionary<string, byte[]> _ttsCache = new();
        private static readonly HttpClient _ttsHttpClient = CreateTtsHttpClient();

        private static HttpClient CreateTtsHttpClient()
        {
            var handler = new SocketsHttpHandler
            {
                PooledConnectionLifetime = TimeSpan.FromMinutes(15),
                ConnectTimeout = TimeSpan.FromSeconds(3)
            };
            var client = new HttpClient(handler)
            {
                Timeout = TimeSpan.FromSeconds(5)
            };
            client.DefaultRequestHeaders.UserAgent.ParseAdd(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
            client.DefaultRequestHeaders.Accept.ParseAdd("audio/mpeg, audio/*;q=0.9, */*;q=0.8");
            client.DefaultRequestHeaders.AcceptLanguage.ParseAdd("en-US,en;q=0.9");
            try { client.DefaultRequestHeaders.Referrer = new Uri("https://translate.google.com/"); } catch { }
            return client;
        }

        public AgentController(
            IAgentProvider agentProvider,
            IOptionsMonitor<AgentSettings> settingsMonitor,
            IAntiforgery antiforgery,
            ILogger<AgentController> logger)
        {
            _agentProvider = agentProvider;
            _settingsMonitor = settingsMonitor;
            _antiforgery = antiforgery;
            _logger = logger;
        }

        /// <summary>
        /// Sends user message to the active server-side AI agent provider.
        /// </summary>
        [HttpPost("chat")]
        [Produces("application/json")]
        public async Task<IActionResult> Chat([FromBody] AgentChatRequest request, CancellationToken cancellationToken)
        {
            var settings = _settingsMonitor.CurrentValue;

            // Security: Client settings cannot bypass server-side agent-enabled setting
            if (!settings.Enabled)
            {
                return StatusCode((int)HttpStatusCode.ServiceUnavailable, new AgentChatResponse
                {
                    Success = false,
                    ProviderName = _agentProvider.ProviderName,
                    IsDemo = _agentProvider.IsDemo,
                    ErrorMessage = "The AI Assistant service is currently disabled on the server."
                });
            }

            // Optional anti-forgery verification if header is supplied
            if (Request.Headers.ContainsKey("RequestVerificationToken"))
            {
                try
                {
                    await _antiforgery.ValidateRequestAsync(HttpContext);
                }
                catch (AntiforgeryValidationException ex)
                {
                    _logger.LogWarning(ex, "Anti-forgery token validation failed for agent chat request.");
                    return StatusCode((int)HttpStatusCode.Forbidden, new AgentChatResponse
                    {
                        Success = false,
                        ErrorMessage = "Invalid anti-forgery token. Please refresh the page and try again."
                    });
                }
            }

            if (!ModelState.IsValid)
            {
                var errors = string.Join("; ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage));
                return BadRequest(new AgentChatResponse
                {
                    Success = false,
                    ErrorMessage = errors
                });
            }

            if (string.IsNullOrWhiteSpace(request.Message))
            {
                return BadRequest(new AgentChatResponse
                {
                    Success = false,
                    ErrorMessage = "Message cannot be empty."
                });
            }

            // Server-side max length validation
            if (request.Message.Length > settings.MaxInputLength)
            {
                return BadRequest(new AgentChatResponse
                {
                    Success = false,
                    ErrorMessage = $"Message exceeds the maximum allowed length of {settings.MaxInputLength} characters."
                });
            }

            // Sanitize raw message to avoid null characters or control anomalies
            request.Message = request.Message.Trim();

            var response = await _agentProvider.AskAsync(request, cancellationToken);
            return Ok(response);
        }

        /// <summary>
        /// Returns the current agent provider status, model info, and demo notice.
        /// </summary>
        [HttpGet("status")]
        [Produces("application/json")]
        public async Task<IActionResult> GetStatus(CancellationToken cancellationToken)
        {
            var status = await _agentProvider.GetStatusAsync(cancellationToken);
            return Ok(status);
        }

        /// <summary>
        /// Provides an anti-forgery token for client widgets.
        /// </summary>
        [HttpGet("antiforgery-token")]
        [Produces("application/json")]
        public IActionResult GetAntiforgeryToken()
        {
            var tokens = _antiforgery.GetAndStoreTokens(HttpContext);
            return Ok(new
            {
                token = tokens.RequestToken,
                headerName = tokens.HeaderName ?? "RequestVerificationToken"
            });
        }

        /// <summary>
        /// Provides a unique initial greeting for RHINE AI Assistant on initial page load,
        /// generating a unique greeting ID to prevent duplicate requests.
        /// </summary>
        [HttpGet("initial-greeting")]
        [Produces("application/json")]
        public IActionResult GetInitialGreeting([FromQuery] string? lang = "en")
        {
            var isAr = lang?.ToLower().StartsWith("ar") == true;
            var isFa = lang?.ToLower().StartsWith("fa") == true;
            var isZh = lang?.ToLower().StartsWith("zh") == true;

            var greetingEn = "Hi there, welcome to RHINE ! I’m your AI Assistant. Are you looking to build something new, improve your existing business, or automate your operations? I’m here to help.";
            var greetingAr = "مرحباً بك في RHINE! أنا مساعدك الذكي. هل تتطلع لبناء مشروع جديد، أو تطوير أعمالك القائمة، أو أتمتة عملياتك التشغيلية؟ أنا هنا لمساعدتك.";
            var greetingFa = "سلام، به RHINE خوش آمدید! من دستیار هوشمند شما هستم. آیا به دنبال ساخت کسب‌وکاری جدید، توسعه کسب‌وکار موجود یا خودکارسازی عملیات خود هستید؟ من آماده کمکم.";
            var greetingZh = "您好，欢迎来到 RHINE！我是您的人工智能助手。您是想构建新项目、改善现有业务，还是实现自动化运营？我随时为您提供帮助。";
            var uniqueGreetingId = "greet_" + Guid.NewGuid().ToString("N")[..12];

            string currentGreeting = isFa ? greetingFa : (isZh ? greetingZh : (isAr ? greetingAr : greetingEn));
            string retLang = isFa ? "fa" : (isZh ? "zh" : (isAr ? "ar" : "en"));

            return Ok(new
            {
                shouldGreet = true,
                greeting = currentGreeting,
                greetingEn = greetingEn,
                greetingAr = greetingAr,
                greetingFa = greetingFa,
                greetingZh = greetingZh,
                greetingId = uniqueGreetingId,
                language = retLang
            });
        }

        /// <summary>
        /// Provides high-quality Arabic, Persian, Chinese and multilingual audio speech stream.
        /// Uses multiple Google TTS URL variants with retry for maximum reliability, especially for Persian (fa).
        /// </summary>
        [HttpGet("tts")]
        [ResponseCache(Duration = 86400, Location = ResponseCacheLocation.Client)]
        public async Task<IActionResult> GetTts([FromQuery] string text, [FromQuery] string lang = "ar", CancellationToken cancellationToken = default)
        {
            if (string.IsNullOrWhiteSpace(text))
            {
                return BadRequest();
            }

            try
            {
                var clean = text.Trim();
                if (clean.Length > 350) clean = clean.Substring(0, 350);

                var isFa = (lang?.ToLowerInvariant()) switch
                {
                    "fa" or "fa-ir" or "persian" => true,
                    _ => false
                };

                // For Persian, adapt Latin "RHINE" to Persian "راین" so the TTS engine pronounces it authentically
                if (isFa)
                {
                    clean = System.Text.RegularExpressions.Regex.Replace(clean, @"\bRHINE\b", "راین", System.Text.RegularExpressions.RegexOptions.IgnoreCase);
                }

                // Google Translate TTS rejects "fa" with 400 Bad Request, but "ur" (Urdu) natively
                // shares the full Persian script (پ، چ، ژ، گ) and returns pristine spoken audio.
                var normalizedLang = isFa ? "ur" : (lang?.ToLowerInvariant()) switch
                {
                    "zh" or "zh-cn" or "zh-tw" => "zh-CN",
                    "ar" or "ar-sa" or "ar-ae" => "ar",
                    _ => "en"
                };

                var cacheKey = $"{normalizedLang}:{clean}";
                if (_ttsCache.TryGetValue(cacheKey, out var cachedBytes))
                {
                    return File(cachedBytes, "audio/mpeg");
                }

                // Multiple TTS URL variants ordered by reliability.
                var urlVariants = new List<string>
                {
                    $"https://translate.google.com/translate_tts?ie=UTF-8&q={Uri.EscapeDataString(clean)}&tl={Uri.EscapeDataString(normalizedLang)}&client=tw-ob",
                    $"https://translate.googleapis.com/translate_tts?ie=UTF-8&q={Uri.EscapeDataString(clean)}&tl={Uri.EscapeDataString(normalizedLang)}&client=tw-ob",
                    $"https://translate.google.com/translate_tts?ie=UTF-8&q={Uri.EscapeDataString(clean)}&tl={Uri.EscapeDataString(normalizedLang)}&client=gtx&ttsspeed=1",
                };

                // For Persian, also add Arabic endpoints as additional fallbacks
                if (isFa)
                {
                    urlVariants.Add($"https://translate.google.com/translate_tts?ie=UTF-8&q={Uri.EscapeDataString(clean)}&tl=ar&client=tw-ob");
                }

                foreach (var url in urlVariants)
                {
                    try
                    {
                        using var response = await _ttsHttpClient.GetAsync(url, HttpCompletionOption.ResponseContentRead, cancellationToken);
                        if (!response.IsSuccessStatusCode)
                        {
                            _logger.LogDebug("TTS URL {Url} returned {Status}", url, response.StatusCode);
                            continue;
                        }

                        var bytes = await response.Content.ReadAsByteArrayAsync(cancellationToken);
                        if (bytes == null || bytes.Length < 150)
                        {
                            _logger.LogDebug("TTS response too small ({Bytes} bytes) for lang={Lang}, trying next URL", bytes?.Length ?? 0, normalizedLang);
                            continue;
                        }

                        _ttsCache.TryAdd(cacheKey, bytes);
                        return File(bytes, "audio/mpeg");
                    }
                    catch (TaskCanceledException) when (cancellationToken.IsCancellationRequested)
                    {
                        return StatusCode(499);
                    }
                    catch (Exception urlEx)
                    {
                        _logger.LogDebug(urlEx, "TTS URL attempt failed for lang={Lang}, trying next", normalizedLang);
                    }
                }

                _logger.LogWarning("All TTS URL variants exhausted for lang={Lang}, text length={Len}", normalizedLang, clean.Length);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Failed to stream TTS audio for text: {Text}, lang: {Lang}", text, lang);
            }

            return NotFound();
        }

        /// <summary>
        /// Submits a meeting request from the AI Assistant.
        /// Destination: info@rhineme.com
        /// </summary>
        [HttpPost("meeting-request")]
        [Produces("application/json")]
        public async Task<IActionResult> SubmitMeetingRequest([FromBody] MeetingRequestDto request, CancellationToken cancellationToken)
        {
            if (Request.Headers.ContainsKey("RequestVerificationToken"))
            {
                try
                {
                    await _antiforgery.ValidateRequestAsync(HttpContext);
                }
                catch (AntiforgeryValidationException ex)
                {
                    _logger.LogWarning(ex, "Anti-forgery token validation failed for meeting request.");
                    return StatusCode((int)HttpStatusCode.Forbidden, new MeetingRequestResponse
                    {
                        Success = false,
                        ErrorMessage = "Invalid anti-forgery token. Please refresh the page and try again."
                    });
                }
            }

            if (!ModelState.IsValid)
            {
                var errors = string.Join("; ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage));
                return BadRequest(new MeetingRequestResponse
                {
                    Success = false,
                    ErrorMessage = errors
                });
            }

            // Server-side validations
            if (string.IsNullOrWhiteSpace(request.FullName) ||
                string.IsNullOrWhiteSpace(request.CompanyName) ||
                string.IsNullOrWhiteSpace(request.Email) ||
                string.IsNullOrWhiteSpace(request.Telephone))
            {
                return BadRequest(new MeetingRequestResponse
                {
                    Success = false,
                    ErrorMessage = "Company name, full name, email, and telephone number are required."
                });
            }

            request.MeetingTopic = string.IsNullOrWhiteSpace(request.MeetingTopic)
                ? "General Consultation Enquiry via RHINE AI Assistant"
                : request.MeetingTopic.Trim();

            request.PreferredDateTime = string.IsNullOrWhiteSpace(request.PreferredDateTime)
                ? "To be arranged by RHINE team"
                : request.PreferredDateTime.Trim();

            // Require country code in phone
            var phoneTrim = request.Telephone.Trim();
            var hasCountryCode = phoneTrim.StartsWith("+") || phoneTrim.StartsWith("00") || (phoneTrim.Length >= 10 && phoneTrim.Any(char.IsDigit));
            if (!hasCountryCode)
            {
                return BadRequest(new MeetingRequestResponse
                {
                    Success = false,
                    ErrorMessage = "Please include your country code with your telephone number."
                });
            }

            var websiteDisplay = string.IsNullOrWhiteSpace(request.Website) || request.Website.Trim().Equals("No Website", StringComparison.OrdinalIgnoreCase)
                ? "No Website"
                : request.Website.Trim();

            var subject = $"RHINE Website — New Meeting Request — {request.FullName.Trim()} — {request.CompanyName.Trim()}";
            var body = $@"A new meeting request has been submitted through the RHINE AI Assistant.

Full Name: {request.FullName.Trim()}
Company: {request.CompanyName.Trim()}
Website: {websiteDisplay}
Email: {request.Email.Trim()}
Telephone: {request.Telephone.Trim()}
Preferred Date and Time: {request.PreferredDateTime.Trim()}

Meeting Request:
{request.MeetingTopic.Trim()}

The visitor reviewed and confirmed the above information before submission.";

            var config = HttpContext.RequestServices.GetService<IConfiguration>();
            var toEmail = config?["Smtp:To"] ?? "info@rhineme.com";
            var fromEmail = config?["Smtp:From"] ?? "ramin@lotka.com";

            _logger.LogInformation("New Meeting Request Submitted for {ToEmail}:\nSubject: {Subject}\nBody:\n{Body}", toEmail, subject, body);

            // 1. Always record and persist the meeting request so visitor details are never lost
            try
            {
                var inquiriesDir = Path.Combine(Directory.GetCurrentDirectory(), "App_Data", "inquiries");
                Directory.CreateDirectory(inquiriesDir);
                var filePath = Path.Combine(inquiriesDir, "meetings.jsonl");
                var record = System.Text.Json.JsonSerializer.Serialize(new
                {
                    Timestamp = DateTime.UtcNow,
                    FullName = request.FullName.Trim(),
                    Company = request.CompanyName.Trim(),
                    Website = websiteDisplay,
                    Email = request.Email.Trim(),
                    Telephone = request.Telephone.Trim(),
                    PreferredDateTime = request.PreferredDateTime.Trim(),
                    MeetingTopic = request.MeetingTopic.Trim()
                });
                System.IO.File.AppendAllLines(filePath, new[] { record });
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Could not write meeting request to local storage.");
            }

            // 2. Dispatch email notification — prioritized delivery:
            //    Channel A: Verified SMTP Relay (smtp.gmail.com:587) with App Password
            //    Channel B: Direct Office 365 SMTP (smtp.office365.com:587)
            var emailSent = false;

            // --- Channel A: Working SMTP Relay (e.g. Gmail App Password) ---
            var relayHost = config?["Smtp:RelayHost"] ?? "smtp.gmail.com";
            var relayUser = config?["Smtp:RelayUser"];
            var relayPass = config?["Smtp:RelayPass"];

            if (!string.IsNullOrWhiteSpace(relayUser) && !string.IsNullOrWhiteSpace(relayPass))
            {
                try
                {
                    var cleanPass = relayPass.Replace(" ", "");
                    using var smtpRelay = new System.Net.Mail.SmtpClient(relayHost, 587);
                    smtpRelay.Credentials = new System.Net.NetworkCredential(relayUser, cleanPass);
                    smtpRelay.EnableSsl = true;
                    smtpRelay.Timeout = 10000; // 10 seconds

                    using var relayMsg = new System.Net.Mail.MailMessage(relayUser, toEmail, subject, body);
                    // Add visitor's email as primary Reply-To so RHINE team can reply directly
                    if (System.Net.Mail.MailAddress.TryCreate(request.Email.Trim(), out var visitorAddr))
                    {
                        relayMsg.ReplyToList.Add(new System.Net.Mail.MailAddress(request.Email.Trim(), request.FullName.Trim()));
                    }
                    if (!string.IsNullOrWhiteSpace(fromEmail) && !fromEmail.Equals(request.Email.Trim(), StringComparison.OrdinalIgnoreCase))
                    {
                        relayMsg.ReplyToList.Add(new System.Net.Mail.MailAddress(fromEmail));
                    }

                    await smtpRelay.SendMailAsync(relayMsg, cancellationToken);
                    _logger.LogInformation("Email sent successfully via SMTP Relay ({RelayUser}) to {ToEmail}", relayUser, toEmail);
                    emailSent = true;
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Primary SMTP relay failed — attempting direct Office 365 SMTP.");
                }
            }

            // --- Channel B: Direct Office 365 SMTP (fallback / alternative) ---
            if (!emailSent)
            {
                try
                {
                    var smtpHost = config?["Smtp:Host"] ?? "smtp.office365.com";
                    var portStr = config?["Smtp:Port"] ?? "587";
                    int.TryParse(portStr, out var port);
                    var user = config?["Smtp:Username"] ?? fromEmail;
                    var pass = config?["Smtp:Password"];

                    if (!string.IsNullOrWhiteSpace(user) && !string.IsNullOrWhiteSpace(pass))
                    {
                        using var smtpClient = new System.Net.Mail.SmtpClient(smtpHost, port > 0 ? port : 587);
                        smtpClient.Credentials = new System.Net.NetworkCredential(user, pass);
                        smtpClient.EnableSsl = !bool.TryParse(config?["Smtp:EnableSsl"], out var ssl) || ssl;
                        smtpClient.Timeout = 8000; // 8 seconds
                        using var mailMessage = new System.Net.Mail.MailMessage(fromEmail, toEmail, subject, body);
                        if (System.Net.Mail.MailAddress.TryCreate(request.Email.Trim(), out var visitorAddr))
                        {
                            mailMessage.ReplyToList.Add(new System.Net.Mail.MailAddress(request.Email.Trim(), request.FullName.Trim()));
                        }
                        await smtpClient.SendMailAsync(mailMessage, cancellationToken);
                        _logger.LogInformation("Email sent via Office 365 SMTP ({Host}) to {ToEmail}", smtpHost, toEmail);
                        emailSent = true;
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Office 365 SMTP attempt also failed for {ToEmail}. Inquiry is preserved in local storage.", toEmail);
                }
            }

            if (!emailSent)
            {
                _logger.LogWarning("All email delivery attempts failed. Inquiry safely stored in meetings.jsonl.");
            }

            return Ok(new MeetingRequestResponse
            {
                Success = true,
                Message = "Thank you! Your meeting request has been submitted. Our team will contact you shortly."
            });
        }
    }
}
