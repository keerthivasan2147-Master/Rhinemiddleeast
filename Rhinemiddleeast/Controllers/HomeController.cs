using Microsoft.AspNetCore.Mvc;
using Rhinemiddleeast.Models;
using System.Diagnostics;

namespace Rhinemiddleeast.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            var initialGreeting = GetInitialGreeting();
            ViewData["InitialGreeting"] = initialGreeting;
            return View();
        }

        /// <summary>
        /// Provides a unique initial greeting on homepage initial load or page refresh.
        /// Generates a unique greeting instance ID (GreetingId) to prevent duplicate greeting requests and repeated speech.
        /// </summary>
        public InitialGreetingModel GetInitialGreeting(string? lang = "en")
        {
            var isAr = lang?.ToLower().StartsWith("ar") == true;

            var timeOfDay = DateTime.UtcNow.Hour switch
            {
                >= 4 and < 12 => "morning",
                >= 12 and < 17 => "afternoon",
                >= 17 and < 22 => "evening",
                _ => "night"
            };

            var greetingEn = "Hi there, welcome to RHINE ! I’m your AI Assistant. Are you looking to build something new, improve your existing business, or automate your operations? I’m here to help.";
            var greetingAr = "مرحباً بك في RHINE! أنا مساعدك الذكي. هل تتطلع لبناء مشروع جديد، أو تطوير أعمالك القائمة، أو أتمتة عملياتك التشغيلية؟ أنا هنا لمساعدتك.";

            var uniqueGreetingId = "greet_" + Guid.NewGuid().ToString("N")[..12];

            return new InitialGreetingModel
            {
                ShouldGreet = true,
                GreetingEn = greetingEn,
                GreetingAr = greetingAr,
                GreetingText = isAr ? greetingAr : greetingEn,
                GreetingId = uniqueGreetingId,
                Timestamp = DateTime.UtcNow.ToString("o")
            };
        }

        // Sub-page actions that support both Direct Full Page navigation and AJAX Partial Loading
        public IActionResult About()
        {
            if (IsAjaxRequest())
            {
                return PartialView("_AboutPartial");
            }
            ViewData["ActiveSection"] = "about";
            return View("Index");
        }

        public IActionResult HowItWorks()
        {
            if (IsAjaxRequest())
            {
                return PartialView("_HowItWorksPartial");
            }
            ViewData["ActiveSection"] = "how-it-works";
            return View("Index");
        }

        public IActionResult Industries()
        {
            if (IsAjaxRequest())
            {
                return PartialView("_IndustriesPartial");
            }
            ViewData["ActiveSection"] = "industries";
            return View("Index");
        }

        public IActionResult OurWork()
        {
            if (IsAjaxRequest())
            {
                return PartialView("_OurWorkPartial");
            }
            ViewData["ActiveSection"] = "our-work";
            return View("Index");
        }

        public IActionResult Insights()
        {
            if (IsAjaxRequest())
            {
                return PartialView("_InsightsPartial");
            }
            ViewData["ActiveSection"] = "insights";
            return View("Index");
        }

        public IActionResult Contact()
        {
            if (IsAjaxRequest())
            {
                return PartialView("_ContactPartial");
            }
            ViewData["ActiveSection"] = "contact";
            return View("Index");
        }

        [HttpGet]
        public IActionResult GetSection(string section)
        {
            return section?.ToLower() switch
            {
                "about" => PartialView("_AboutPartial"),
                "how-it-works" => PartialView("_HowItWorksPartial"),
                "industries" => PartialView("_IndustriesPartial"),
                "our-work" => PartialView("_OurWorkPartial"),
                "insights" => PartialView("_InsightsPartial"),
                "contact" => PartialView("_ContactPartial"),
                _ => PartialView("_AboutPartial")
            };
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult SubmitContact([FromBody] ContactInquiryModel model)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();
                return Json(new { success = false, message = "Please check the form fields.", errors });
            }

            _logger.LogInformation("Received enterprise inquiry from {Email} at {Company}", model.Email, model.Company);

            return Json(new
            {
                success = true,
                title = "Inquiry Received",
                message = $"Thank you, {model.FullName}. Our Dubai Executive Advisory Council at Rhine Middle East FZE has received your brief. A Managing Principal will connect with your team at {model.Company} within 24 hours.",
                referenceId = $"RHN-{DateTime.UtcNow.Ticks.ToString()[^6..]}"
            });
        }

        [HttpPost]
        public IActionResult GenerateWorkforcePlan([FromBody] WorkforcePlanRequest request)
        {
            request ??= new WorkforcePlanRequest();
            
            int agentCount = Math.Max(12, (int)(request.CurrentHeadcount * 0.28));
            string productivity = request.Industry switch
            {
                "Banking & Sovereign Wealth" => "+340% Deal Velocity & Zero-Hallucination Compliance",
                "Energy & Infrastructure" => "84,000 hrs Autonomous Inspection & Safety Orchestration",
                "Government & Smart Cities" => "4.8x Rapid Citizen Service Fulfillment",
                "Healthcare & Life Sciences" => "+290% Clinical Triage & MOH Protocol Adherence",
                _ => "+310% Coordinated Operational Throughput"
            };

            var capabilities = new List<string>
            {
                "GCC & UAE Sovereign Data Sovereign Compliance Layer",
                "Human-in-the-Loop Multi-Tier Executive Governance Gateways",
                "Real-time Enterprise Knowledge Graph Synchronizer",
                "Autonomous Multi-Agent Task Orchestration Swarm",
                "Telemetry Dashboard with Hallucination Guardrails & Audit Logs"
            };

            var response = new WorkforcePlanResponse
            {
                RecommendedSwarmArchitecture = $"{request.Industry} Enterprise Neural Operating Platform",
                EstimatedAIAgents = agentCount,
                ProjectedProductivityGain = productivity,
                GovernanceTier = "Tier-1 Sovereign Middle East Enterprise Grade",
                EstimatedTimeline = "4 to 6 Weeks to Phase 1 Production Deployment",
                CoreCapabilities = capabilities
            };

            return Json(new { success = true, plan = response });
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        private bool IsAjaxRequest()
        {
            return Request.Headers["X-Requested-With"] == "XMLHttpRequest" ||
                   Request.Query.ContainsKey("partial");
        }
    }
}
