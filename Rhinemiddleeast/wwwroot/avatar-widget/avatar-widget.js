/**
 * Rhine AI Avatar Presenter - Overlay Mode (D-ID / HeyGen Style)
 * Full-height video background with transparent floating captions & chat textbox.
 * Embedded intelligence for RHINE Middle East FZE — People and AI. Working for What's Next.
 */
(function (global) {
  'use strict';

  const ICONS = {
    close: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
    send: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`,
    speakerOn: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`,
    speakerMuted: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`,
    replay: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`,
    mic: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`,
    micOff: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`
  };

  // RHINE AI Assistant — Core Knowledge Base
  // Positioned as AI Assistant: turning ideas into structured operating businesses.
  // Strictly no supply chain, staffing, or manpower supply.
  // Topic title map for dynamic heading updates as per user question
  const TOPIC_TITLES = {
    en: {
      morning_greeting: "Welcome to RHINE",
      afternoon_greeting: "Welcome to RHINE",
      evening_greeting: "Welcome to RHINE",
      night_greeting: "Welcome to RHINE",
      greeting: "Welcome to RHINE",
      who_are_you: "RHINE AI Assistant",
      company: "About RHINE Middle East",
      process: "From Idea to Operations",
      idea_to_company: "Turn Idea into a Company",
      transform_company: "Transform Existing Business",
      platform_website: "Platform & Digital Guidance",
      what_we_build: "What RHINE Can Build",
      ai_agents: "Governed Digital Workforce",
      complete_solution: "Complete RHINE Solution",
      solutions: "RHINE Platform Capabilities",
      pillars: "Operating Capability",
      qualification: "Business Qualification",
      business_concept: "Business Concept Design",
      team_join: "Join the RHINE Team",
      contact: "Contact & Consultation",
      hours: "Operating Hours",
      pricing: "Tailored Project Scoping",
      website_info: "Platform Guidance",
      off_topic: "RHINE Company Scope",
      fallback: "RHINE Platform Guidance"
    },
    ar: {
      morning_greeting: "مرحباً بك في RHINE",
      afternoon_greeting: "مرحباً بك في RHINE",
      evening_greeting: "مرحباً بك في RHINE",
      night_greeting: "مرحباً بك في RHINE",
      greeting: "مرحباً بك في RHINE",
      who_are_you: "المساعد الذكي لـ RHINE",
      company: "عن شركة RHINE Middle East",
      process: "من الفكرة إلى التشغيل الفعلي",
      idea_to_company: "تحويل فكرة إلى شركة عاملة",
      transform_company: "تطوير وأتمتة شركة قائمة",
      platform_website: "إرشادات المنصة والموقع",
      what_we_build: "ماذا تبني RHINE",
      ai_agents: "قوى عاملة رقمية محكومة",
      complete_solution: "حلول RHINE المتكاملة",
      solutions: "قدرات منصة RHINE",
      pillars: "بيئة التشغيل المتكاملة",
      qualification: "تحديد مسار العمل",
      business_concept: "تصميم مفهوم العمل",
      team_join: "الانضمام إلى فريق RHINE",
      contact: "التواصل والاستشارة",
      hours: "أوقات العمل",
      pricing: "تحديد نطاق المشروع",
      website_info: "إرشادات المنصة",
      off_topic: "تنبيه نطاق RHINE",
      fallback: "إرشادات منصة RHINE"
    }
  };

  // RHINE AI Assistant — Core Knowledge Base
  // Positioned as Platform Guidance & Business Architecture: turning ideas into structured operating businesses.
  // Strictly no supply chain, staffing, or manpower supply.
  const RHINE_KNOWLEDGE = {
    en: {
      morning_greeting: "Good morning! Welcome to RHINE. We help turn business ideas and existing challenges into structured, technology-enabled operations—from business design and digital platforms to coordinated human and AI workforces. How can I help you today?",
      afternoon_greeting: "Good afternoon! Welcome to RHINE. We help turn business ideas and existing challenges into structured, technology-enabled operations—from business design and digital platforms to coordinated human and AI workforces. How can I help you today?",
      evening_greeting: "Good evening! Welcome to RHINE. We help turn business ideas and existing challenges into structured, technology-enabled operations—from business design and digital platforms to coordinated human and AI workforces. How can I help you today?",
      night_greeting: "Good evening! Welcome to RHINE. We help turn business ideas and existing challenges into structured, technology-enabled operations—from business design and digital platforms to coordinated human and AI workforces. How can I help you today?",
      greeting: "Hi there, welcome to RHINE ! I’m your AI Assistant. Are you looking to build something new, improve your existing business, or automate your operations? I’m here to help.",
      who_are_you: "I am the RHINE AI Assistant. I help entrepreneurs and organizations move from an idea or business challenge into a structured, technology-enabled operating company with governed digital agents and platform guidance.",
      company: "RHINE MIDDLE EAST FZE is more than an AI Agent Factory. RHINE helps entrepreneurs, companies, and organizations move from an idea or existing challenge to a structured, technology-enabled operating business. We bring together business design, organizational structure, operational workflows, digital platforms, corporate websites, professional knowledge, human expertise, and governed AI agents built for real work.",
      solutions: "Depending on your needs, RHINE designs and develops: 1. Business concepts and operating models. 2. Organizational structures, departments, and authority levels. 3. Operational workflows and business processes. 4. Industry-specific digital platforms and corporate websites. 5. Governed AI agents for specific professional roles. 6. Knowledge standards, approval paths, and continuous improvement systems.",
      what_we_build: "Depending on client needs, RHINE designs and develops: business concepts and operating models, organizational structures and authority levels, operational workflows, industry-specific digital platforms, corporate websites, governed AI agents for professional roles, and governance frameworks with continuous improvement.",
      process: "From Idea to Operations is RHINE's structured 5-stage transformation roadmap: Stage 1 UNDERSTAND — we study the business idea, objectives, and operating reality. Stage 2 ORGANIZE — we define departments, positions, responsibilities, and decision structures. Stage 3 DESIGN — we design the operating model, digital platform, website, and human-AI workforce. Stage 4 PREPARE — we build, configure, test, and prepare systems and workflows. Stage 5 OPERATE & IMPROVE — we support live operations with ongoing governance.",
      idea_to_company: "Turning an idea into a company is about building an operating business entity from scratch. RHINE provides end-to-end platform guidance: we help you formulate your commercial value proposition, define your core business functions, establish your client-facing digital platform, and embed governed digital agents so your company can execute real transactions from day one without heavy operational overhead.",
      transform_company: "For existing companies, RHINE reviews your operational workflows and decision bottlenecks, introduces governed AI agents into specific professional roles, and redesigns your processes to automate routine tasks while enhancing governance and control.",
      platform_website: "RHINE provides comprehensive platform guidance: we design and build industry-specific digital platforms and professional corporate websites that serve as the operating interface connecting your human team, clients, and governed AI agents.",
      ai_agents: "RHINE governed digital agents are software workers purpose-built for specific professional roles within defined permissions, knowledge boundaries, approval paths, and audit constraints — operating alongside your team with governed execution.",
      complete_solution: "The complete RHINE solution unifies our five core capabilities: business design, organizational structure, operational workflows, digital platforms and websites, and governed AI agents. We guide you through our 5-stage journey from idea to real, continuous operations.",
      pillars: "RHINE does not simply deliver isolated AI agents. An AI agent is one component of a complete business solution. RHINE's wider purpose is to build the operating environment in which people, technology, professional knowledge, and governed AI agents work together effectively. The result is a structured operating capability designed around your real business.",
      qualification: "Which situation best describes you? 1. I have a business idea and want to turn it into an operating company. 2. I already have a company and want to transform or automate it. 3. I need a business platform or professional website. 4. I want AI agents for specific business roles. 5. I want to understand the complete RHINE solution. Tell me your choice, and I will guide you.",
      contact: "Every company starts from a different point. RHINE designs the journey from that starting point to a structured, intelligent and operational business. Contact RHINE Middle East FZE directly: Phone +971 4 8818618, Email info@rhineme.com, JAFZA One, Office No: FZJOBB1609, Jebel Ali Freezone, Dubai, UAE (P.O. Box: 215142). We invite you to arrange a consultation.",
      hours: "RHINE Middle East FZE operates Monday to Friday, 8:00 AM to 5:00 PM Gulf Standard Time in JAFZA One, Jebel Ali Freezone, Dubai, UAE. For urgent enquiries please email info@rhineme.com.",
      pricing: "RHINE project development is tailored to your business scope and operating requirements. Contact us at +971 4 8818618 or info@rhineme.com to discuss your project and arrange an exploratory consultation.",
      website_info: "This platform is the RHINE AI Assistant. It features voice interaction, live captions on demand, curated business architecture knowledge, and interactive qualification to help turn your ideas into operations.",
      business_concept: "A business concept is the foundation of everything RHINE builds. It defines what your company does, who it serves, how it creates value, and how it operates. RHINE works with entrepreneurs and organisations to design clear, practical business concepts — covering your commercial model, core services or products, target market, and the structure needed to bring it to life. A well-designed concept becomes the blueprint for your entire operating company.",
      team_join: "RHINE brings together professionals from business strategy, technology, and organisational design. If you are looking to collaborate, partner, or explore opportunities with RHINE, we encourage you to get in touch. You can reach the RHINE team by email at info@rhineme.com or by phone at +971 4 8818618. We are always open to conversations with talented and motivated people who share our vision of building better businesses.",
      off_topic: "That topic falls outside what I can help with directly. I specialise in RHINE's business platform guidance — including business concepts, operating models, digital platforms, AI agents, and company transformation. For full information, contact us at info@rhineme.com or call +971 4 8818618.",
      fallback: "I don't have information on that type of question. I can only provide company details and platform guidance for RHINE Middle East FZE. For full information, please contact us at info@rhineme.com or call +971 4 8818618. You can also ask about RHINE's business platforms and services."
    },
    ar: {
      morning_greeting: "صباح الخير! مرحباً بك في RHINE. نحن نساعد في تحويل أفكار الأعمال والتحديات القائمة إلى عمليات تشغيلية منظمة ومدعومة بالتقنية — من تصميم الأعمال والمنصات الرقمية إلى تنسيق القوى العاملة البشرية والذكاء الاصطناعي. كيف يمكنني مساعدتك اليوم؟",
      afternoon_greeting: "مساء الخير! مرحباً بك في RHINE. نحن نساعد في تحويل أفكار الأعمال والتحديات القائمة إلى عمليات تشغيلية منظمة ومدعومة بالتقنية — من تصميم الأعمال والمنصات الرقمية إلى تنسيق القوى العاملة البشرية والذكاء الاصطناعي. كيف يمكنني مساعدتك اليوم؟",
      evening_greeting: "مساء الخير! مرحباً بك في RHINE. نحن نساعد في تحويل أفكار الأعمال والتحديات القائمة إلى عمليات تشغيلية منظمة ومدعومة بالتقنية — من تصميم الأعمال والمنصات الرقمية إلى تنسيق القوى العاملة البشرية والذكاء الاصطناعي. كيف يمكنني مساعدتك اليوم؟",
      night_greeting: "مساء الخير! مرحباً بك في RHINE. نحن نساعد في تحويل أفكار الأعمال والتحديات القائمة إلى عمليات تشغيلية منظمة ومدعومة بالتقنية — من تصميم الأعمال والمنصات الرقمية إلى تنسيق القوى العاملة البشرية والذكاء الاصطناعي. كيف يمكنني مساعدتك اليوم؟",
      greeting: "مرحباً بك في RHINE! أنا مساعدك الذكي. هل تتطلع لبناء مشروع جديد، أو تطوير أعمالك القائمة، أو أتمتة عملياتك التشغيلية؟ أنا هنا لمساعدتك.",
      who_are_you: "أنا المساعد الذكي لـ RHINE. أساعد رواد الأعمال والشركات على الانتقال من فكرة أو تحدٍ تجاري إلى عمل تشغيلي منظم ومدعوم بالتقنية عبر إرشادات المنصة والوكلاء الرقميين المحكومين.",
      company: "RHINE Middle East FZE هي أكثر من مجرد مصنع لوكلاء الذكاء الاصطناعي. نساعد رواد الأعمال والشركات والمؤسسات على الانتقال من فكرة أو تحدٍ تجاري إلى عمل تشغيلي منظم ومدعوم بالتقنية. نجمع بين تصميم الأعمال، والهيكل التنظيمي، وسير العمل التشغيلي، والمنصات الرقمية، والمواقع المؤسسية، والمعرفة المهنية، والخبرة البشرية، ووكلاء الذكاء الاصطناعي الخاضعين للحوكمة والمبنيين لمهام حقيقية.",
      solutions: "وفقاً لاحتياجاتك، تساعد RHINE في تصميم وتطوير: 1. مفاهيم ونماذج الأعمال التشغيلية. 2. الهياكل التنظيمية والأقسام والصلاحيات. 3. إجراءات وسير العمل التشغيلي. 4. المنصات الرقمية والمواقع المؤسسية. 5. وكلاء ذكاء اصطناعي خاضعين للحوكمة لأدوار مهنية محددة. 6. معايير المعرفة ومسارات الاعتماد والحوكمة وأنظمة التطوير المستمر.",
      what_we_build: "تساعد RHINE في تصميم وتطوير: مفاهيم الأعمال ونماذج التشغيل؛ الهياكل التنظيمية ومستويات السلطة؛ مسارات وسير العمليات التشغيلية؛ المنصات الرقمية والمواقع المؤسسية؛ وكلاء ذكاء اصطناعي محكومين لأدوار وظيفية محددة؛ وأطر الحوكمة والمراجعة والتحسين المستمر.",
      process: "من الفكرة إلى التشغيل الفعلي هي خارطة طريق RHINE المنظمة من 5 مراحل: المرحلة 1 الفهم — ندرس فكرة العمل والأهداف والواقع التشغيلي. المرحلة 2 التنظيم — نحدد الأقسام وهياكل القرارات. المرحلة 3 التصميم — نصمم المنصة الرقمية ونموذج التشغيل والتكامل مع الذكاء الاصطناعي. المرحلة 4 التجهيز — نبني ونختبر ونجهز مسارات العمل والأنظمة. المرحلة 5 التشغيل والتحسين — ندعم الانتقال إلى التشغيل الواقعي والتحسين المستمر.",
      idea_to_company: "تحويل فكرة إلى شركة عاملة يركز على تأسيس وبناء كيان تشغيلي متكامل من الصفر. تقدم RHINE إرشادات تأسيسية متكاملة للمنصة: نساعدك على صياغة القيمة التجارية لمشروعك، وتحديد وظائف العمل الأساسية، وتجهيز منصة تشغيلية للتفاعل مع العملاء، ودمج وكلاء رقميين محكومين لإدارة المعاملات اليومية بكفاءة عالية وبدون أعباء تشغيلية ضخمة.",
      transform_company: "للشركات القائمة، تدرس RHINE مسارات العمل ومواضع التعطيل، وتدمج وكلاء ذكاء اصطناعي محكومين في أدوار محددة، وتعيد هيكلة الإجراءات لزيادة الكفاءة والأتمتة مع الحوكمة والرقابة الكاملة.",
      platform_website: "تقدم RHINE إرشادات متكاملة للمنصات الرقمية: نصمم ونبني منصات متخصصة ومواقع مؤسسية وتشغيلية متطورة تمثل واجهة التشغيل المركزية لفريق عملك وعملائك ووكلاء الذكاء الاصطناعي.",
      ai_agents: "وكلاء RHINE المحكومين هم قوى عاملة رقمية مصممة لأدوار مهنية محددة، تعمل ضمن صلاحيات ومعرفة ومسارات اعتماد وسجلات تدقيق محددة، ليعملوا جنباً إلى جنب مع فريقك بحوكمة تامة.",
      complete_solution: "الحل المتكامل من RHINE يوحد ركائزنا الخمس: تصميم الأعمال، الهيكل التنظيمي، العمليات التشغيلية، المنصات والمواقع الرقمية، ووكلاء الذكاء الاصطناعي المحكومين، لنقودك عبر رحلتنا من 5 مراحل من الفكرة إلى التشغيل الفعلي المستمر.",
      pillars: "لا تقدم RHINE مجرد وكلاء ذكاء اصطناعي معزولين. وكيل الذكاء الاصطناعي هو جزء واحد من حل متكامل. هدف RHINE الأوسع هو بناء بيئة العمل التي تتكامل فيها الكفاءات البشرية والتقنية والمعرفة المهنية ووكلاء الذكاء الاصطناعي المحكومين، لتحقيق قدرة تشغيلية منظمة مصممة حول عملك الحقيقي.",
      qualification: "أي الحالات التالية تصف احتياجك الأفضل؟ 1. لدي فكرة عمل وأريد تحويلها إلى شركة عاملة. 2. لدي شركة قائمة وأريد تطويرها أو أتمتتها. 3. أحتاج إلى منصة أعمال أو موقع احترافي. 4. أريد وكلاء ذكاء اصطناعي لأدوار محددة. 5. أريد فهم حلول RHINE المتكاملة. أخبرني باختيارك وسأوجهك للمسار الأنسب.",
      contact: "كل شركة تبدأ من نقطة مختلفة. تصمم RHINE المسار من تلك النقطة إلى عمل تجاري منظم وذكي وعامل. تواصل مع RHINE Middle East FZE: هاتف 97148818618+، بريد info@rhineme.com، جافزا ون، مكتب رقم FZJOBB1609، المنطقة الحرة لجبل علي، دبي، الإمارات (ص.ب: 215142). نرحب بترتيب استشارة أولية.",
      hours: "تعمل RHINE Middle East FZE من الاثنين إلى الجمعة من الساعة 8:00 صباحاً حتى 5:00 مساءً بتوقيت الخليج في جافزا ون، المنطقة الحرة لجبل علي، دبي. للاستفسارات راسل info@rhineme.com.",
      pricing: "يعتمد تطوير مشاريع RHINE على نطاق العمل والمتطلبات التشغيلية لشركتك. تواصل معنا على 97148818618+ أو info@rhineme.com لترتيب استشارة استكشافية.",
      website_info: "هذا هو المساعد الذكي لـ RHINE. يتيح التفاعل الصوتي، وإرشادات المنصة المتقدمة، وقاعدة معرفية لهندسة الأعمال، والمساعدة التفاعلية لتحويل أفكارك إلى تشغيل واقعي.",
      business_concept: "مفهوم العمل هو الأساس الذي تبني عليه RHINE كل شيء. يحدد ماذا تفعل شركتك، ومن تخدم، وكيف تخلق قيمة، وكيف تعمل. تعمل RHINE مع رواد الأعمال والشركات لتصميم مفاهيم أعمال واضحة وعملية — تشمل نموذجك التجاري، وخدماتك أو منتجاتك الأساسية، وسوقك المستهدف، والهيكل اللازم لإحياء هذه الفكرة. المفهوم المُصمَّم جيداً يصبح مخطط شركتك التشغيلية بأكملها.",
      team_join: "تضم RHINE متخصصين في استراتيجية الأعمال والتقنية والتصميم التنظيمي. إن كنت تبحث عن التعاون أو الشراكة أو استكشاف فرص مع RHINE، نشجعك على التواصل معنا. يمكنك الوصول إلى فريق RHINE عبر البريد الإلكتروني info@rhineme.com أو الهاتف على الرقم +971 4 8818618. نحن دائماً منفتحون على التحدث مع الأشخاص الموهوبين والمتحمسين الذين يشاركوننا رؤيتنا في بناء شركات أفضل.",
      off_topic: "هذا الموضوع خارج نطاق ما يمكنني مساعدتك به مباشرة. أختص بإرشادات منصة RHINE — بما في ذلك مفاهيم الأعمال ونماذج التشغيل والمنصات الرقمية ووكلاء الذكاء الاصطناعي وتحويل الشركات. للمزيد من المساعدة، راسلنا على info@rhineme.com أو اتصل بنا على +971 4 8818618.",
      fallback: "لا تتوفر لدي معلومات حول هذا النوع من الأسئلة. يمكنني فقط تقديم تفاصيل الشركة وإرشادات المنصة لشركة RHINE Middle East FZE. للحصول على المعلومات الكاملة، يرجى التواصل معنا عبر info@rhineme.com أو الاتصال على الرقم +971 4 8818618. يمكنك أيضاً السؤال عن منصات وخدمات RHINE للأعمال."
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // MEETING FLOW — normalization helpers & bilingual strings
  // ─────────────────────────────────────────────────────────────────────────
  function normalizeSpokenEmail(raw) {
    if (!raw) return "";
    let s = raw.trim();
    s = s.replace(/\s+(?:at|@)\s+/gi, "@");
    s = s.replace(/\s+(?:dot|\.)\s+/gi, ".");
    s = s.replace(/\s+dot\b/gi, ".");
    s = s.replace(/\bdot\s+/gi, ".");
    if (s.includes("@")) {
      s = s.replace(/\s+/g, "");
    }
    return s;
  }

  function normalizePhoneNumber(raw) {
    if (!raw) return "";
    return raw.trim().replace(/[^\d+()\-\s.]/g, "").trim();
  }

  const MEETING_TEXT = {
    en: {
      offerQ: "Would you like me to help schedule a meeting with the RHINE team to discuss your business requirements?",
      offerYes: "Schedule a Meeting",
      offerNo: "Not Now",
      steps: [
        {
          key: "companyName",
          label: "Company Name",
          prompt: "What is your company name?",
          validate: (v) => v.trim().length >= 1 ? null : "Please enter your company name."
        },
        {
          key: "website",
          label: "Company Website",
          prompt: "What is your company website? If you don't have one, you can use the No Website button.",
          validate: () => null,
          optional: true
        },
        {
          key: "fullName",
          label: "Full Name",
          prompt: "May I have the full name of the person responsible for this enquiry?",
          validate: (v) => v.trim().length >= 2 ? null : "Please enter your full name."
        },
        {
          key: "email",
          label: "Email Address",
          prompt: "What is the email address to contact you?",
          normalize: (v) => normalizeSpokenEmail(v),
          validate: (v) => {
            const clean = normalizeSpokenEmail(v);
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean) ? null : "Please enter a valid email address (e.g. name@company.com).";
          }
        },
        {
          key: "telephone",
          label: "Phone Number",
          prompt: "What is the phone number to reach you?",
          normalize: (v) => normalizePhoneNumber(v),
          validate: (v) => {
            const clean = normalizePhoneNumber(v);
            const digits = clean.replace(/\D/g, "");
            return (digits.length >= 7 && digits.length <= 16) ? null : "Please enter a valid phone number with country code (e.g. +971 4 8818618).";
          }
        },
        {
          key: "meetingDiscussion",
          label: "Meeting Discussion",
          prompt: "What would you like to discuss with the RHINE team?\n\nYou may describe your business idea, existing company, required platform, website, AI agents, operational challenges or any other relevant requirements.\n\nI will include your complete message in the meeting request.",
          validate: (v) => v.trim().length >= 5 ? null : "Please describe what you would like to discuss so the RHINE team can prepare for the meeting."
        },
        {
          key: "meetingTime",
          label: "Preferred Meeting Time",
          prompt: "What date and time would be most convenient for you?\n\nPlease also confirm your time zone (e.g. UAE — GMT+4, UK — GMT+0, USA Eastern — GMT-5).",
          validate: (v) => v.trim().length >= 3 ? null : "Please provide your preferred meeting date, time and time zone."
        }
      ],
      reviewTitle: "Please confirm that these details are correct. Use Confirm & Sent Request button to send your meeting request to the RHINE team? otherwise use Edit information button",
      confirmBtn: "Confirm & Sent Request",
      editBtn: "Edit Information",
      cancelBtn: "Cancel",
      submitting: "Sending your meeting request to the RHINE team...",
      successTitle: "Meeting Request Sent",
      successMsg: (name) => `Thank you, ${name}. Your meeting request has been sent to the RHINE team. A team member will be in touch with you shortly.`,
      failTitle: "Sending Failed",
      failMsg: "We were unable to send your meeting request at this time. Please try again or contact us directly at info@rhineme.com or +971 4 8818618.",
      retryBtn: "Try Again",
      closeBtn: "Close",
      noWebsite: "No Website",
      validationError: (msg) => `⚠ ${msg}\n\nPlease try again:`,
      editFormTitle: "Edit Information",
      editSaveBtn: "Save Changes",
      editCancelBtn: "Back to Review"
    },
    ar: {
      offerQ: "هل تودّ مني مساعدتك في تحديد موعد اجتماع مع فريق RHINE لمناقشة متطلبات عملك؟",
      offerYes: "تحديد موعد اجتماع",
      offerNo: "ليس الآن",
      steps: [
        {
          key: "companyName",
          label: "اسم الشركة",
          prompt: "ما اسم شركتك؟",
          validate: (v) => v.trim().length >= 1 ? null : "الرجاء إدخال اسم شركتك."
        },
        {
          key: "website",
          label: "الموقع الإلكتروني",
          prompt: "ما هو الموقع الإلكتروني لشركتك؟ إذا لم يكن لديك موقع، يمكنك استخدام زر لا يوجد موقع.",
          validate: () => null,
          optional: true
        },
        {
          key: "fullName",
          label: "الاسم الكامل",
          prompt: "هل يمكنني معرفة الاسم الكامل للشخص المسؤول عن هذا الاستفسار؟",
          validate: (v) => v.trim().length >= 2 ? null : "الرجاء إدخال الاسم الكامل."
        },
        {
          key: "email",
          label: "البريد الإلكتروني",
          prompt: "ما هو البريد الإلكتروني للتواصل معك؟",
          normalize: (v) => normalizeSpokenEmail(v),
          validate: (v) => {
            const clean = normalizeSpokenEmail(v);
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean) ? null : "الرجاء إدخال بريد إلكتروني صحيح (مثال: name@company.com).";
          }
        },
        {
          key: "telephone",
          label: "رقم الهاتف",
          prompt: "ما هو رقم الهاتف للوصول إليك؟",
          normalize: (v) => normalizePhoneNumber(v),
          validate: (v) => {
            const clean = normalizePhoneNumber(v);
            const digits = clean.replace(/\D/g, "");
            return (digits.length >= 7 && digits.length <= 16) ? null : "الرجاء إدخال رقم هاتف صحيح متضمناً رمز الدولة (مثال: ‎+971 4 8818618).";
          }
        },
        {
          key: "meetingDiscussion",
          label: "موضوع الاجتماع",
          prompt: "ماذا تودّ مناقشته مع فريق RHINE؟\n\nيمكنك وصف فكرة عملك، أو شركتك القائمة، أو المنصة المطلوبة، أو الموقع الإلكتروني، أو وكلاء الذكاء الاصطناعي، أو التحديات التشغيلية أو أي متطلبات أخرى ذات صلة.\n\nسأضمّن رسالتك الكاملة في طلب الاجتماع.",
          validate: (v) => v.trim().length >= 5 ? null : "الرجاء وصف ما تودّ مناقشته حتى يتمكن فريق RHINE من الاستعداد للاجتماع."
        },
        {
          key: "meetingTime",
          label: "وقت الاجتماع المفضّل",
          prompt: "ما التاريخ والوقت الأنسب لك؟\n\nيرجى أيضاً تحديد منطقتك الزمنية (مثال: الإمارات — GMT+4، المملكة المتحدة — GMT+0، الولايات المتحدة الشرقية — GMT-5).",
          validate: (v) => v.trim().length >= 3 ? null : "الرجاء تحديد التاريخ والوقت والمنطقة الزمنية المفضّلة."
        }
      ],
      reviewTitle: "يرجى التأكيد على صحة هذه التفاصيل. استخدم زر تأكيد وإرسال الطلب لإرسال طلب الاجتماع إلى فريق RHINE، أو استخدم زر تعديل المعلومات.",
      confirmBtn: "تأكيد وإرسال الطلب",
      editBtn: "تعديل المعلومات",
      cancelBtn: "إلغاء",
      submitting: "جارٍ إرسال طلب اجتماعك إلى فريق RHINE...",
      successTitle: "تم إرسال طلب الاجتماع",
      successMsg: (name) => `شكراً لك، ${name}. تم إرسال طلب اجتماعك إلى فريق RHINE. سيتواصل معك أحد أعضاء الفريق قريباً.`,
      failTitle: "فشل الإرسال",
      failMsg: "لم نتمكن من إرسال طلب اجتماعك في الوقت الحالي. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرةً على info@rhineme.com أو ‎+971 4 8818618.",
      retryBtn: "إعادة المحاولة",
      closeBtn: "إغلاق",
      noWebsite: "لا يوجد موقع",
      validationError: (msg) => `⚠ ${msg}\n\nيرجى المحاولة مرة أخرى:`,
      editFormTitle: "تعديل المعلومات",
      editSaveBtn: "حفظ التغييرات",
      editCancelBtn: "العودة إلى المراجعة"
    }
  };

  // Intent rules: keywords map to knowledge topic keys
  // Arabic notes: keys use base forms; matching normalises alef/hamza variants and strips punctuation.
  const INTENT_RULES = [
    { keys: ["qualify", "describe", "situation", "option", "choice", "من انا", "خيارات", "اي الحالات", "تصنيف", "تحديد الاحتياج"], topic: "qualification" },
    { keys: ["complete solution", "all services", "full rhine", "option 5", "choice 5", "situation 5", "حلول متكاملة", "الحل الكامل", "الخيار الخامس", "الخيار 5", "الحالة 5"], topic: "complete_solution" },
    { keys: ["turn an idea into a company", "turn idea into company", "turn idea into a company", "turn idea", "launch company", "start company", "from scratch", "venture", "option 1", "choice 1", "situation 1", "تحويل فكرة الى شركة", "تحويل فكرة لشركة", "تحويل فكرة الى شركة عاملة", "تاسيس شركة من الصفر", "تأسيس شركة من الصفر", "بدء شركة جديدة", "الخيار الاول", "الخيار 1", "الحالة 1"], topic: "idea_to_company" },
    { keys: ["from idea to operation", "from idea to operations", "5 stages", "five stages", "roadmap", "journey", "understand organize design", "stages", "مراحل", "طريقة العمل", "من الفكرة الى التشغيل", "من الفكرة للتشغيل", "كيف تعملون", "كيف تعمل rhine", "الرحلة", "المراحل الخمس"], topic: "process" },
    { keys: ["transform", "automate", "existing company", "existing business", "improve business", "option 2", "choice 2", "situation 2", "تطوير شركة", "اتمتة", "أتمتة", "تطوير مؤسسة", "شركة قائمة", "تحسين الشركة", "الخيار الثاني", "الخيار 2", "الحالة 2"], topic: "transform_company" },
    { keys: ["platform", "website", "build website", "build platform", "guidance", "option 3", "choice 3", "situation 3", "منصة", "موقع", "بناء موقع", "منصة رقمية", "موقع الكتروني", "إرشادات المنصة", "ارشادات المنصة", "الخيار الثالث", "الخيار 3", "الحالة 3"], topic: "platform_website" },
    { keys: ["what can you build", "what rhine can build", "build", "develop", "ماذا يمكن", "ماذا تبنون", "ماذا تصممون", "ماذا تبني", "ماذا تنشئون"], topic: "what_we_build" },
    { keys: ["positioning", "why rhine", "isolated", "wider purpose", "not simply", "لماذا راين", "بيئة عمل", "فلسفة", "الركائز", "الهدف"], topic: "pillars" },
    { keys: ["solution", "service", "provide", "offer", "what do you do", "what does rhine do", "help", "حلول", "خدمات", "خدماتكم", "ماذا تقدم", "ماذا تفعل", "مساعدة", "ما هي خدماتكم"], topic: "solutions" },
    { keys: ["ai agent", "digital worker", "governed agent", "digital workforce", "option 4", "choice 4", "situation 4", "وكيل", "عامل رقمي", "وكلاء ذكاء", "وكلاء الذكاء", "مساعد ذكي", "وكلاء محكومين", "قوى عاملة رقمية", "الخيار الرابع", "الخيار 4", "الحالة 4"], topic: "ai_agents" },
    { keys: ["contact", "phone", "email", "call", "reach", "address", "location", "office", "headquarter", "number", "consultation", "jafza", "jebel ali", "تواصل", "تواصلوا", "هاتف", "ايميل", "بريد", "عنوان", "مقر", "رقم", "استشارة", "كيف اتواصل", "جافزا", "جبل علي"], topic: "contact" },
    { keys: ["hour", "open", "timing", "schedule", "working hour", "available", "ساعات", "وقت", "توقيت", "متاح", "اوقات", "أوقات", "دوام"], topic: "hours" },
    { keys: ["price", "cost", "fee", "quote", "pricing", "how much", "سعر", "تكلفة", "رسوم", "عرض سعر", "تسعير", "كم يكلف"], topic: "pricing" },
    { keys: ["website info", "assistant", "advisor", "app", "موقع", "المساعد", "المستشار"], topic: "website_info" },
    { keys: ["who are you", "what are you", "introduce yourself", "tell me about yourself", "من أنت", "من انت", "عرّف نفسك", "عرف نفسك", "من انتم"], topic: "who_are_you" },
    { keys: ["business concept", "concept", "business idea concept", "tell me about the business concept", "about the business concept", "explain the business concept", "conceptualize", "value proposition", "commercial model", "business model", "مفهوم العمل", "مفهوم الأعمال", "مفهوم", "فكرة العمل", "قيمة مقترحة", "نموذج العمل"], topic: "business_concept" },
    { keys: ["join team", "join in a team", "join a team", "join the team", "join in the team", "join in team", "joining a team", "guide me to join", "guide to join", "how to join", "join rhine", "work with rhine", "career", "careers", "join us", "become part", "collaborate", "partner with rhine", "employment", "hire", "hiring", "work for rhine", "الانضمام", "انضم إلى الفريق", "انضم لفريق", "انضم لـ rhine", "العمل مع rhine", "وظائف", "وظيفة", "فرصة عمل", "تعاون", "شراكة", "مسيرة مهنية"], topic: "team_join" },
    { keys: ["good morning", "morning", "صباح الخير", "صباح النور"], topic: "time_greeting" },
    { keys: ["good afternoon", "مساء الخير", "طاب مساؤك"], topic: "time_greeting" },
    { keys: ["good evening", "evening", "مساء النور"], topic: "time_greeting" },
    { keys: ["good night", "goodnight", "night", "تصبح على خير", "طابت ليلتك", "ليلة سعيدة"], topic: "time_greeting" },
    { keys: ["hello", "hi ", "hey", "greet", "مرحبا", "مرحباً", "أهلا", "اهلا", "السلام عليكم"], topic: "greeting" },
    { keys: ["arrange meeting", "book meeting", "schedule meeting", "schedule a meeting", "arrange a meeting", "book a meeting", "set a meeting", "set up a meeting", "request meeting", "meeting with rhine", "meeting", "meet", "book appointment", "schedule appointment", "arrange appointment", "appointment", "want to meet", "speak to team", "talk to team", "contact team", "طلب اجتماع", "ترتيب اجتماع", "حجز اجتماع", "اجتماع", "موعد", "حجز موعد", "موعد مع rhine", "اريد اجتماع", "أريد اجتماع", "التحدث مع الفريق", "التواصل مع الفريق"], topic: "__meeting__" },
    { keys: ["do you know", "do you have", "what is ai", "define ai", "tell me about ai", "general knowledge", "who is", "what is the capital", "tell joke", "joke", "weather", "football", "soccer", "recipe", "game", "movie", "song", "crypto", "bitcoin", "politics", "president", "capital of", "هل تعرف", "ما هو الذكاء", "ما معنى الذكاء", "ما هو ai", "معلومات عامة", "نكتة", "الطقس", "كرة القدم", "مباراة", "فيلم", "اغنية", "طبخ", "وصفة", "لعبة", "عملات", "سياسة", "عاصمة"], topic: "off_topic" },
    { keys: ["rhine", "company", "about rhine", "who is rhine", "راين", "شركة", "من هي", "ما هي شركة", "عن راين"], topic: "company" }
  ];

  class RhineAvatarWidget {
    constructor(options = {}) {
      // Auto-detect initial language if document or browser is Arabic
      const docLang = (typeof document !== "undefined" && document.documentElement.getAttribute("lang") || "").toLowerCase();
      const docDir = (typeof document !== "undefined" && document.documentElement.getAttribute("dir") || "").toLowerCase();
      const browserIsAr = (typeof navigator !== "undefined" && navigator.languages)
        ? Array.from(navigator.languages).some(l => l.toLowerCase().startsWith("ar"))
        : (typeof navigator !== "undefined" && navigator.language && navigator.language.toLowerCase().startsWith("ar"));
      const detectedLang = (docLang.startsWith("ar") || docDir === "rtl" || browserIsAr) ? "ar" : "en";

      this.options = Object.assign({
        title: detectedLang === "ar" ? "مساعد راين الذكي" : "RHINE AI Assistant",
        endpoint: "/api/agent/chat",
        statusEndpoint: "/api/agent/status",
        videoSrc: "/avatar-widget/assets/presenter.mp4",
        posterSrc: "/avatar-widget/assets/presenter-ai.png",
        kbUrl: "/kb.json",
        language: detectedLang,
        autoOpen: false,
        antiForgeryHeader: "RequestVerificationToken",
        antiForgeryToken: null
      }, options);

      this.isOpen = false;
      this.isSpeaking = false;
      this.isSpeechMuted = false;
      this.isCaptionsVisible = false;
      this.isListening = false;
      this.speechRecognition = null;
      this.kbData = null;
      this.lastCaption = "";
      this._voicesReady = false;
      this._greetingSpoken = false; // Track if greeting has been spoken this session
      this._hasActuallySpoken = false; // Track if audio/speech has actually begun playing

      this._init();
    }

    // Returns the appropriate time-based greeting topic key for current local time
    // Morning: 5:00 AM–11:59 AM
    // Afternoon: 12:00 PM–4:59 PM
    // Evening: 5:00 PM–4:59 AM
    _getTimeGreetingKey() {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) return "morning_greeting";
      if (hour >= 12 && hour < 17) return "afternoon_greeting";
      return "evening_greeting";
    }

    // Returns the greeting text appropriate for the language
    _getTimedGreeting(lang) {
      const kb = RHINE_KNOWLEDGE[lang] || RHINE_KNOWLEDGE.en;
      return kb.greeting;
    }

    async _init() {
      this._extractAntiforgeryToken();
      this._buildDOM();
      this._bindEvents();
      await this._loadKnowledgeBase();

      // Preload the video silently so it's ready to play without lag when speech starts
      if (this.videoEl) {
        this.videoEl.preload = "auto";
        this.videoEl.load();
      }

      // Ensure video starts strictly paused with mouth closed before speech
      this._setVideoActive(false);

      // Prepare voices
      if (window.speechSynthesis && window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.addEventListener('voiceschanged', () => { this._voicesReady = true; }, { once: true });
      } else {
        this._voicesReady = true;
      }

      if (this.options.autoOpen) {
        this.refreshGreeting();
      } else {
        this.close();
        const kb = RHINE_KNOWLEDGE[this.options.language] || RHINE_KNOWLEDGE.en;
        this.setCaptionAndSpeak(kb.greeting, false, null, "greeting");
      }
    }

    _extractAntiforgeryToken() {
      if (this.options.antiForgeryToken) return;
      const input = document.querySelector('input[name="__RequestVerificationToken"]');
      if (input && input.value) {
        this.options.antiForgeryToken = input.value;
        return;
      }
      const meta = document.querySelector('meta[name="csrf-token"]') || document.querySelector('meta[name="RequestVerificationToken"]');
      if (meta && meta.content) {
        this.options.antiForgeryToken = meta.content;
      }
    }

    async _loadKnowledgeBase() {
      try {
        const resp = await fetch(this.options.kbUrl, { cache: "no-store" });
        if (resp.ok) {
          this.kbData = await resp.json();
        }
      } catch (e) {
        console.warn("Rhine Avatar: Local knowledge base not loaded", e);
      }
    }

    _buildDOM() {
      const isAr = this.options.language === "ar";
      const launcherTitle = isAr ? "مساعد راين الذكي" : this._escapeHtml(this.options.title || "RHINE AI Assistant");
      const launcherSub = isAr ? "راين الشرق الأوسط ش.م.ح" : "RHINE Middle East FZE";

      // 1. Floating Launcher (Bottom-right circle with presenter avatar)
      this.launcherEl = document.createElement("div");
      this.launcherEl.className = "rhine-launcher";
      this.launcherEl.setAttribute("role", "button");
      this.launcherEl.setAttribute("aria-label", isAr ? "فتح المساعد الذكي" : "Open AI Assistant");
      this.launcherEl.setAttribute("dir", isAr ? "rtl" : "ltr");
      this.launcherEl.innerHTML = `
        <div class="rhine-launcher-avatar">
          <img src="${this._escapeHtml(this.options.posterSrc)}" alt="Presenter" onerror="this.style.display='none'" />
          <span class="rhine-launcher-badge"></span>
        </div>
        <div class="rhine-launcher-text">
          <span class="rhine-launcher-title">${launcherTitle}</span>
          <span class="rhine-launcher-subtitle">${launcherSub}</span>
        </div>
      `;
      document.body.appendChild(this.launcherEl);

      // 2. Backdrop Overlay (Dark background for centered popup)
      this.backdropEl = document.getElementById("rhineBackdrop");
      if (!this.backdropEl) {
        this.backdropEl = document.createElement("div");
        this.backdropEl.id = "rhineBackdrop";
        this.backdropEl.className = "rhine-backdrop";
        this.backdropEl.setAttribute("aria-hidden", "true");
        document.body.appendChild(this.backdropEl);
      }

      // 3. Main Avatar Presenter Card (Centered Modal Popup)
      this.widgetEl = document.createElement("div");
      this.widgetEl.className = "rhine-avatar-widget rhine-hidden";
      this.widgetEl.setAttribute("role", "dialog");

      if (isAr) {
        this.widgetEl.setAttribute("dir", "rtl");
      }

      this.widgetEl.innerHTML = `
        <!-- Full-Height Background Video & Fallback -->
        <div class="rhine-video-stage">
          <video id="rhineVideo"
                 playsinline
                 muted
                 loop
                 preload="auto"
                 poster="${this._escapeHtml(this.options.posterSrc)}">
            <source src="${this._escapeHtml(this.options.videoSrc)}" type="video/mp4">
          </video>
          <div class="rhine-video-fallback" id="rhineVideoFallback"
               style="background-image: url('${this._escapeHtml(this.options.posterSrc)}');">
          </div>
          <div class="rhine-video-scrim"></div>
        </div>

        <!-- Transparent Top Bar -->
        <div class="rhine-top-bar">
          <div class="rhine-top-info">
            <div class="rhine-launcher-avatar" style="width:28px;height:28px;border-width:1.5px;">
              <img src="${this._escapeHtml(this.options.posterSrc)}" alt="Presenter" />
            </div>
            <div>
              <div class="rhine-top-title" id="rhineTopTitle">${this._escapeHtml(this.options.title)}</div>
              <div class="rhine-top-status" id="rhinePresenterStatus">
                <span class="rhine-caption-dot"></span>
                <span id="rhineStatusText">Active</span>
              </div>
            </div>
          </div>
          <div class="rhine-top-actions">
            <!-- Language Toggle (EN / AR) -->
            <button type="button" class="rhine-lang-btn" id="rhineLangToggle">
              ${isAr ? "English" : "العربية"}
            </button>

            <!-- Transparent Caption Button (CC) -->
            <button type="button" class="rhine-btn-icon rhine-cc-btn" id="rhineCcBtn" title="Toggle Captions">
              CC
            </button>

            <!-- Audio Mute / Unmute -->
            <button type="button" class="rhine-btn-icon" id="rhineMuteBtn" title="Toggle audio speech">
              <span id="rhineMuteIcon">${ICONS.speakerOn}</span>
            </button>

            <!-- Close Button -->
            <button type="button" class="rhine-btn-icon" id="rhineCloseBtn" title="Close">
              ${ICONS.close}
            </button>
          </div>
        </div>

        <!-- Mic Listening Overlay -->
        <div class="rhine-mic-overlay" id="rhineMicOverlay" style="display:none;">
          <button type="button" class="rhine-mic-close" id="rhineMicClose" title="Cancel voice input">✕</button>
          <div class="rhine-mic-pulse" id="rhineMicPulseBtn" role="button" title="Tap to finish and ask">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
          </div>
          <div class="rhine-mic-label" id="rhineMicLabel">Listening... Speak now</div>
          <div class="rhine-mic-interim" id="rhineMicInterim">Speak your question clearly...</div>
          <div class="rhine-mic-actions" id="rhineMicActions">
            <button type="button" class="rhine-mic-submit-btn" id="rhineMicSubmitBtn" style="display:none;">
              Ask AI Assistant
            </button>
          </div>
          <div class="rhine-mic-chips" id="rhineMicChips">
            <div class="rhine-mic-hint">${isAr ? 'أو انقر للتحدث فوراً:' : 'Or tap a question to speak:'}</div>
            <div class="rhine-mic-chip-list">
              ${this._renderQuickChips(isAr)}
            </div>
          </div>
        </div>

        <!-- Bottom Container with Transparent Floating Captions & Chat Textbox -->
        <div class="rhine-bottom-container">
          <!-- Transparent Floating Caption Overlay (D-ID Style) -->
          <div class="rhine-caption-overlay rhine-caption-hidden" id="rhineCaptionOverlay">
            <div class="rhine-caption-header">
              <div class="rhine-caption-badge">
                <span class="rhine-caption-dot"></span>
                <span id="rhineCaptionBadgeText">${isAr ? 'إرشادات المنصة' : 'PLATFORM GUIDANCE'}</span>
                <div class="rhine-sound-wave">
                  <span></span><span></span><span></span>
                </div>
              </div>
              <button type="button" class="rhine-btn-icon" id="rhineReplayBtn" title="Replay answer" style="width:22px;height:22px;">
                ${ICONS.replay}
              </button>
            </div>
            <div class="rhine-caption-content" id="rhineCaptionContent"></div>
          </div>

          <!-- Speak Now Button (Hidden as requested) -->
          <button type="button" class="rhine-speak-now-btn" id="rhineSpeakNowBtn" style="display: none !important;">
            ${ICONS.mic}
            <span>${isAr ? 'تكلّم الآن' : 'Speak Now'}</span>
          </button>

          <!-- Customer Quick Question Chips (Hidden as requested) -->
          <div class="rhine-quick-questions" id="rhineQuickQuestions" style="display: none !important;">
            ${this._renderQuickChips(isAr)}
          </div>

          <!-- Enable Sound Option in Browser (Hidden — sound enabled automatically) -->
          <div class="rhine-enable-sound-pill" id="rhineEnableSoundPill" style="display: none !important;">
            <button type="button" class="rhine-enable-sound-btn" id="rhineEnableSoundBtn" style="display: none !important;">
              <span class="rhine-sound-icon">🔊</span>
              <span id="rhineEnableSoundText">${isAr ? 'انقر لتفعيل الصوت والترحيب' : 'Click to Enable Sound & Greeting'}</span>
            </button>
          </div>

          <!-- Transparent Chat Textbox with Microphone -->
          <form class="rhine-chat-form" id="rhineChatForm">
            <input type="text"
                   class="rhine-chat-input"
                   id="rhineChatInput"
                   placeholder="${isAr ? 'تحدث أو اكتب سؤالك...' : 'Speak or type your question...'}"
                   autocomplete="off" />
            <button type="button" class="rhine-chat-mic" id="rhineChatMic" title="Voice Input">
              <span id="rhineMicBtnIcon">${ICONS.mic}</span>
            </button>
            <button type="submit" class="rhine-chat-send" id="rhineChatSend" title="Send">
              ${ICONS.send}
            </button>
          </form>


        </div>
      `;

      document.body.appendChild(this.widgetEl);

      // Cache elements
      this.videoEl = this.widgetEl.querySelector("#rhineVideo");
      this.videoFallbackEl = this.widgetEl.querySelector("#rhineVideoFallback");
      this.topTitleEl = this.widgetEl.querySelector("#rhineTopTitle");
      this.captionOverlay = this.widgetEl.querySelector("#rhineCaptionOverlay");
      this.captionContent = this.widgetEl.querySelector("#rhineCaptionContent");
      this.captionBadgeText = this.widgetEl.querySelector("#rhineCaptionBadgeText");
      this.enableSoundPill = this.widgetEl.querySelector("#rhineEnableSoundPill");
      this.enableSoundBtn = this.widgetEl.querySelector("#rhineEnableSoundBtn");
      this.enableSoundText = this.widgetEl.querySelector("#rhineEnableSoundText");
      this.chatForm = this.widgetEl.querySelector("#rhineChatForm");
      this.chatInput = this.widgetEl.querySelector("#rhineChatInput");
      this.chatMic = this.widgetEl.querySelector("#rhineChatMic");
      this.micBtnIcon = this.widgetEl.querySelector("#rhineMicBtnIcon");
      this.chatSend = this.widgetEl.querySelector("#rhineChatSend");
      this.muteBtn = this.widgetEl.querySelector("#rhineMuteBtn");
      this.muteIcon = this.widgetEl.querySelector("#rhineMuteIcon");
      this.ccBtn = this.widgetEl.querySelector("#rhineCcBtn");
      this.closeBtn = this.widgetEl.querySelector("#rhineCloseBtn");
      this.replayBtn = this.widgetEl.querySelector("#rhineReplayBtn");
      this.langToggleBtn = this.widgetEl.querySelector("#rhineLangToggle");
      this.micOverlay = this.widgetEl.querySelector("#rhineMicOverlay");
      this.micClose = this.widgetEl.querySelector("#rhineMicClose");
      this.micPulseBtn = this.widgetEl.querySelector("#rhineMicPulseBtn");
      this.micLabel = this.widgetEl.querySelector("#rhineMicLabel");
      this.micInterim = this.widgetEl.querySelector("#rhineMicInterim");
      this.micSubmitBtn = this.widgetEl.querySelector("#rhineMicSubmitBtn");
      this.micChips = this.widgetEl.querySelector("#rhineMicChips");
      this.statusText = this.widgetEl.querySelector("#rhineStatusText");
      this.speakNowBtn = this.widgetEl.querySelector("#rhineSpeakNowBtn");
      this.quickQuestionsEl = this.widgetEl.querySelector("#rhineQuickQuestions");
    }

    _renderQuickChips(isAr) {
      const q1 = isAr ? "ماذا يمكن لـ RHINE بناؤه؟" : "What can RHINE build?";
      const meetingLabel = isAr ? "📅 حجز اجتماع مع RHINE" : "📅 Schedule a Meeting";
      const remainingQuestions = isAr ? [
        "من الفكرة إلى التشغيل الفعلي",
        "تحويل فكرة إلى شركة عاملة",
        "تطوير وأتمتة شركة قائمة",
        "بناء منصة أعمال أو موقع",
        "وكلاء ذكاء اصطناعي لأدوار محددة"
      ] : [
        "From Idea to Operations",
        "Turn an idea into a company",
        "Transform or automate a company",
        "Need a platform or website",
        "AI agents for business roles"
      ];

      const chip1 = `<button type="button" class="rhine-chip" data-question="${this._escapeHtml(q1)}">${this._escapeHtml(q1)}</button>`;
      const meetingChip = `<button type="button" class="rhine-chip rhine-chip-meeting" data-action="schedule-meeting">${this._escapeHtml(meetingLabel)}</button>`;
      const remainingChips = remainingQuestions.map(q => `
        <button type="button" class="rhine-chip" data-question="${this._escapeHtml(q)}">
          ${this._escapeHtml(q)}
        </button>
      `).join("");

      return chip1 + meetingChip + remainingChips;
    }

    setLanguage(lang) {
      if (!lang) lang = "en";
      this.options.language = lang;
      const isAr = lang === "ar";

      if (this.launcherEl) {
        this.launcherEl.setAttribute("dir", isAr ? "rtl" : "ltr");
        this.launcherEl.setAttribute("aria-label", isAr ? "فتح المساعد الذكي" : "Open AI Assistant");
        const lTitle = this.launcherEl.querySelector(".rhine-launcher-title");
        const lSub = this.launcherEl.querySelector(".rhine-launcher-subtitle");
        if (lTitle) lTitle.textContent = isAr ? "مساعد راين الذكي" : (this.options.title || "RHINE AI Assistant");
        if (lSub) lSub.textContent = isAr ? "راين الشرق الأوسط ش.م.ح" : "RHINE Middle East FZE";

        if (!this._hasCustomPos) {
          this.launcherEl.style.left = "";
          this.launcherEl.style.top = "";
          this.launcherEl.style.right = "";
          this.launcherEl.style.bottom = "";
        }
      }

      if (this.langToggleBtn) {
        this.langToggleBtn.textContent = isAr ? "English" : "العربية";
      }
      if (this.widgetEl) {
        this.widgetEl.setAttribute("dir", isAr ? "rtl" : "ltr");
      }
      if (this.topTitleEl) {
        this.topTitleEl.textContent = isAr ? "مساعد راين الذكي" : (this.options.title || "RHINE AI Assistant");
      }
      if (this.captionBadgeText) {
        this.captionBadgeText.textContent = isAr ? "إرشادات المنصة" : "PLATFORM GUIDANCE";
      }
      if (this.chatInput) {
        this.chatInput.placeholder = isAr ? "تحدث أو اكتب سؤالك..." : "Speak or type your question...";
      }
      if (this.speakNowBtn) {
        const s = this.speakNowBtn.querySelector("span");
        if (s) s.textContent = isAr ? "تكلّم الآن" : "Speak Now";
      }
      if (this.quickQuestionsEl) {
        this.quickQuestionsEl.innerHTML = this._renderQuickChips(isAr);
      }
      if (this.micChips) {
        const hint = this.micChips.querySelector(".rhine-mic-hint");
        if (hint) hint.textContent = isAr ? "أو انقر للتحدث فوراً:" : "Or tap a question to speak:";
        const list = this.micChips.querySelector(".rhine-mic-chip-list");
        if (list) list.innerHTML = this._renderQuickChips(isAr);
      }
      if (this.micLabel) {
        this.micLabel.textContent = isAr ? "نستمع إليك... تكلّم براحتك" : "Listening... Speak your question now";
      }
      if (this.micInterim) {
        this.micInterim.textContent = isAr ? "تحدّث الآن بسؤالك، نحن نستمع إليك..." : "Speak your question clearly...";
      }
      if (this.activeRecognition) {
        this.activeRecognition.lang = isAr ? "ar-SA" : "en-US";
      }
      if (this.enableSoundText) {
        this.enableSoundText.textContent = isAr ? "انقر لتفعيل الصوت والترحيب" : "Click to Enable Sound & Greeting";
      }
    }

    _makeLauncherDraggable() {
      const el = this.launcherEl;
      if (!el) return;

      let isDragging = false;
      let startX = 0;
      let startY = 0;
      let initialLeft = 0;
      let initialTop = 0;
      let hasMoved = false;
      const DRAG_THRESHOLD = 6;

      const onPointerDown = (e) => {
        if (e.button !== undefined && e.button !== 0) return;

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        startX = clientX;
        startY = clientY;

        const rect = el.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;

        isDragging = false;
        hasMoved = false;

        const onPointerMove = (ev) => {
          const curX = ev.touches ? ev.touches[0].clientX : ev.clientX;
          const curY = ev.touches ? ev.touches[0].clientY : ev.clientY;

          const dx = curX - startX;
          const dy = curY - startY;

          if (!hasMoved && Math.hypot(dx, dy) > DRAG_THRESHOLD) {
            hasMoved = true;
            isDragging = true;
            el.classList.add("rhine-launcher-dragging");
            el.style.transition = "none";
          }

          if (isDragging) {
            if (ev.cancelable) ev.preventDefault();

            const rectNow = el.getBoundingClientRect();
            const pad = 12;
            const maxLeft = window.innerWidth - rectNow.width - pad;
            const maxTop = window.innerHeight - rectNow.height - pad;

            const newLeft = Math.max(pad, Math.min(initialLeft + dx, maxLeft));
            const newTop = Math.max(pad, Math.min(initialTop + dy, maxTop));

            el.style.left = newLeft + "px";
            el.style.top = newTop + "px";
            el.style.right = "auto";
            el.style.bottom = "auto";
            this._hasCustomPos = true;
          }
        };

        const onPointerUp = () => {
          window.removeEventListener("mousemove", onPointerMove);
          window.removeEventListener("mouseup", onPointerUp);
          window.removeEventListener("touchmove", onPointerMove);
          window.removeEventListener("touchend", onPointerUp);
          window.removeEventListener("touchcancel", onPointerUp);

          if (isDragging || hasMoved) {
            this._justDragged = true;
            setTimeout(() => { this._justDragged = false; }, 140);
          }

          isDragging = false;
          hasMoved = false;
          el.classList.remove("rhine-launcher-dragging");
          el.style.transition = "";
        };

        window.addEventListener("mousemove", onPointerMove, { passive: false });
        window.addEventListener("mouseup", onPointerUp);
        window.addEventListener("touchmove", onPointerMove, { passive: false });
        window.addEventListener("touchend", onPointerUp);
        window.addEventListener("touchcancel", onPointerUp);
      };

      el.addEventListener("mousedown", onPointerDown);
      el.addEventListener("touchstart", onPointerDown, { passive: false });

      window.addEventListener("resize", () => {
        if (!this._hasCustomPos || !this.launcherEl) return;
        const rectNow = this.launcherEl.getBoundingClientRect();
        const pad = 12;
        const maxLeft = window.innerWidth - rectNow.width - pad;
        const maxTop = window.innerHeight - rectNow.height - pad;
        if (rectNow.left > maxLeft || rectNow.top > maxTop) {
          this.launcherEl.style.left = Math.max(pad, Math.min(rectNow.left, maxLeft)) + "px";
          this.launcherEl.style.top = Math.max(pad, Math.min(rectNow.top, maxTop)) + "px";
        }
      });
    }

    _bindEvents() {
      this._makeLauncherDraggable();

      this.launcherEl.addEventListener("click", (e) => {
        if (this._justDragged) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        this.open(true);
      });
      this.closeBtn.addEventListener("click", () => this.close());
      this.muteBtn.addEventListener("click", () => this.toggleMute());
      this.ccBtn.addEventListener("click", () => this.toggleCaptions());

      this.replayBtn.addEventListener("click", () => {
        if (this.lastCaption) this.speak(this.lastCaption);
      });

      // Speak Now big button
      if (this.speakNowBtn) {
        this.speakNowBtn.addEventListener("click", () => this._triggerMic());
      }

      // Mic Overlay interactive controls
      if (this.micClose) {
        this.micClose.addEventListener("click", (e) => {
          e.stopPropagation();
          this._stopListening();
        });
      }

      if (this.micPulseBtn) {
        this.micPulseBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const q = (this.capturedVoiceText || this.chatInput.value).trim();
          this._stopListening();
          if (q) {
            this.ask(q);
          }
        });
      }

      if (this.micSubmitBtn) {
        this.micSubmitBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const q = (this.capturedVoiceText || this.chatInput.value).trim();
          this._stopListening();
          if (q) {
            this.ask(q);
          }
        });
      }

      if (this.micChips) {
        this.micChips.addEventListener("click", (e) => {
          const chip = e.target.closest(".rhine-chip");
          if (!chip) return;
          e.stopPropagation();
          this._stopListening();
          if (chip.dataset.action === "schedule-meeting") {
            this._startMeetingFlow();
          } else if (chip.dataset.question) {
            this.ask(chip.dataset.question);
          }
        });
      }

      // Customer Quick Question Chips click delegation
      if (this.quickQuestionsEl) {
        this.quickQuestionsEl.addEventListener("click", (e) => {
          const chip = e.target.closest(".rhine-chip");
          if (!chip) return;
          if (chip.dataset.action === "schedule-meeting") {
            this._startMeetingFlow();
          } else if (chip.dataset.question) {
            this.ask(chip.dataset.question);
          }
        });
      }

      // Language Switcher (AI widget language only — does NOT change website language)
      this.langToggleBtn.addEventListener("click", () => {
        const nextLang = this.options.language === "en" ? "ar" : "en";
        this.setLanguage(nextLang);
        // Speak greeting in the newly selected language
        this._greetingSpoken = true;
        const kb = RHINE_KNOWLEDGE[nextLang] || RHINE_KNOWLEDGE.en;
        this.setCaptionAndSpeak(kb.greeting, true, null, "greeting");
      });

      // Chat Form submission — empty input triggers mic
      this.chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = this.chatInput.value.trim();
        if (!text) { this._triggerMic(); return; }
        this.chatInput.value = "";
        this.ask(text);
      });

      // Video error fallback & loop watchdog (prevents video freeze during speech)
      this.videoEl.addEventListener("error", () => {
        this.videoFallbackEl.classList.add("visible");
      });
      this.videoEl.addEventListener("ended", () => {
        if (this.isSpeaking) {
          this.videoEl.currentTime = 0;
          this.videoEl.play().catch(() => { });
        } else {
          this.videoEl.pause();
          try { this.videoEl.currentTime = 0; } catch { }
        }
      });
      this.videoEl.addEventListener("pause", () => {
        if (this.isSpeaking && !this._videoIntentionallyPaused) {
          this.videoEl.play().catch(() => { });
        }
      });
      // Strict lip-sync guards: video MUST remain paused at 00:00 when audio is not actively playing
      this.videoEl.addEventListener("play", () => {
        if (!this.isSpeaking) {
          this.videoEl.pause();
          try { this.videoEl.currentTime = 0; } catch { }
        }
      });
      this.videoEl.addEventListener("timeupdate", () => {
        if (!this.isSpeaking && this.videoEl.currentTime > 0) {
          this.videoEl.pause();
          try { this.videoEl.currentTime = 0; } catch { }
        }
      });
      this.videoEl.addEventListener("loadedmetadata", () => {
        if (!this.isSpeaking) {
          this.videoEl.pause();
          try { this.videoEl.currentTime = 0; } catch { }
        }
      });

      // Set up speech recognition / mic button
      this._setupSpeechRecognition();

      // Click backdrop to close centered popup
      if (this.backdropEl) {
        this.backdropEl.addEventListener("click", () => this.close());
      }

      // AI widget language is independent of website language.
      // No MutationObserver sync — changing website language does not affect AI widget.
    }

    async _triggerMic() {
      if (this.isListening) {
        this._stopListening();
        return;
      }

      this.stopSpeech();
      this.capturedVoiceText = "";
      this._recognitionRestarts = 0;

      const isAr = this.options.language === "ar";
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        this._setStatus(isAr ? "الصوت غير مدعوم في هذا المتصفح" : "Voice not supported in this browser");
        return;
      }

      // 1. Show listening UI directly on AI Assistant page (overlay screen kept hidden)
      this.isListening = true;
      if (this.chatMic) this.chatMic.classList.add("listening");
      if (this.micBtnIcon) this.micBtnIcon.innerHTML = ICONS.micOff;
      if (this.micOverlay) this.micOverlay.style.display = "none";
      const lbl = isAr ? "جارٍ الاستماع... تكلّم بسؤالك الآن" : "Listening... Speak your question now";
      this.chatInput.placeholder = lbl;
      this.chatInput.focus();
      this._setStatus(isAr ? "جارٍ الاستماع..." : "Listening...");

      // 2. Inject live waveform animation & countdown into overlay if not already present
      this._injectListeningExtras(isAr);

      // 3. Clear any active timers
      if (this._micSilenceTimeout) clearTimeout(this._micSilenceTimeout);
      if (this._micDebounceTimer) clearTimeout(this._micDebounceTimer);
      if (this._countdownInterval) clearInterval(this._countdownInterval);

      // 4. Start 60-second MAX countdown shown in the overlay
      this._listenSecondsLeft = 60;
      this._updateCountdown();
      this._countdownInterval = setInterval(() => {
        this._listenSecondsLeft--;
        this._updateCountdown();
        if (this._listenSecondsLeft <= 0) {
          clearInterval(this._countdownInterval);
          const q = (this.capturedVoiceText || this.chatInput.value).trim();
          this._stopListening();
          if (q) {
            this.ask(q);
          } else {
            this._setStatus(isAr ? "انتهى وقت الاستماع. انقر تكلّم الآن أو اختر سؤالاً:" : "Listening time ended. Click Speak Now or choose a question below:");
          }
        }
      }, 1000);

      // 5. Start SpeechRecognition session directly (without getUserMedia hardware lock contention)
      this._startRecognitionSession(SpeechRecognition, isAr);
    }

    _startRecognitionSession(SpeechRecognition, isAr) {
      if (!this.isListening) return;

      try {
        if (this.activeRecognition) {
          this.activeRecognition.onresult = null;
          this.activeRecognition.onerror = null;
          this.activeRecognition.onend = null;
          try { this.activeRecognition.abort(); } catch { }
          this.activeRecognition = null;
        }

        const rec = new SpeechRecognition();
        rec.continuous = true;
        rec.interimResults = true;
        rec.maxAlternatives = 1;
        rec.lang = isAr ? "ar-SA" : "en-US";
        this.activeRecognition = rec;

        rec.onstart = () => {
          if (this.isListening) {
            this._setStatus(isAr ? "جارٍ الاستماع..." : "Listening...");
          }
        };

        rec.onresult = (e) => {
          // Reset countdown to 60s on any speech activity
          this._listenSecondsLeft = 60;
          this._updateCountdown();

          let finalTranscript = "";
          let interimTranscript = "";
          for (let i = e.resultIndex; i < e.results.length; i++) {
            const t = e.results[i][0].transcript;
            if (e.results[i].isFinal) finalTranscript += t;
            else interimTranscript += t;
          }

          if (finalTranscript) {
            this.capturedVoiceText = ((this.capturedVoiceText || "") + " " + finalTranscript).trim();
          }
          const displayText = this.capturedVoiceText || (interimTranscript ? interimTranscript.trim() : "");

          if (displayText) {
            if (this.micInterim) {
              this.micInterim.innerHTML = this.capturedVoiceText
                ? `<strong>"${this._escapeHtml(this.capturedVoiceText)}"</strong>`
                + (interimTranscript ? ` <em style="opacity:.6">${this._escapeHtml(interimTranscript.trim())}</em>` : "")
                : `<em>"${this._escapeHtml(displayText)}"</em>`;
            }
            this.chatInput.value = displayText;
            this._setStatus(`"${displayText.slice(0, 40)}"`);

            if (this.micSubmitBtn) {
              this.micSubmitBtn.style.display = "inline-flex";
              this.micSubmitBtn.textContent = isAr
                ? `✓ إرسال السؤال الآن: "${displayText.slice(0, 22)}..."`
                : `✓ Submit Question: "${displayText.slice(0, 24)}..."`;
            }
          }

          // Debounce auto-submit: responsive speech detection without long delay
          if (finalTranscript && this.capturedVoiceText) {
            if (this._micDebounceTimer) clearTimeout(this._micDebounceTimer);
            const wordCount = this.capturedVoiceText.trim().split(/\s+/).length;
            const delay = wordCount >= 3 ? 1200 : 1500;
            this._micDebounceTimer = setTimeout(() => {
              const q = this.capturedVoiceText.trim();
              if (q && this.isListening) {
                this._showAnalyzing(isAr);
                setTimeout(() => {
                  this._stopListening();
                  this.ask(q);
                }, 200);
              }
            }, delay);
          }
        };

        rec.onerror = (e) => {
          if (e.error === "not-allowed" || e.error === "service-not-allowed") {
            this._stopListening();
            this._setStatus(isAr ? "تم حظر الميكروفون. يرجى السماح بصلاحية الميكروفون في المتصفح." : "Mic blocked. Please allow microphone in browser.");
            return;
          }
          if (e.error === "network") {
            this._stopListening();
            this._setStatus(isAr ? "خطأ في الاتصال بالشبكة لخدمة الصوت." : "Speech recognition network error.");
            return;
          }
          if (e.error === "audio-capture") {
            // Audio hardware momentarily busy — retry cleanly after brief pause
            if (this.isListening && !this._micDebounceTimer) {
              if (this._recRestartTimer) clearTimeout(this._recRestartTimer);
              this._recRestartTimer = setTimeout(() => {
                if (this.isListening && !this._micDebounceTimer) {
                  this._startRecognitionSession(SpeechRecognition, isAr);
                }
              }, 400);
            }
            return;
          }
          // Do not abort on 'no-speech' or 'aborted', let onend restart smoothly
        };

        rec.onend = () => {
          // If still listening and no submission is in progress, restart seamlessly
          if (this.isListening && !this._micDebounceTimer) {
            if (this._recRestartTimer) clearTimeout(this._recRestartTimer);
            this._recRestartTimer = setTimeout(() => {
              if (this.isListening && !this._micDebounceTimer) {
                this._startRecognitionSession(SpeechRecognition, isAr);
              }
            }, 180);
          }
        };

        rec.start();
      } catch (err) {
        console.warn("Speech recognition session start error:", err);
        if (this.isListening && !this._micDebounceTimer) {
          if (this._recRestartTimer) clearTimeout(this._recRestartTimer);
          this._recRestartTimer = setTimeout(() => {
            if (this.isListening) this._startRecognitionSession(SpeechRecognition, isAr);
          }, 350);
        }
      }
    }

    _injectListeningExtras(isAr) {
      if (!this.micOverlay || this.micOverlay.querySelector(".rhine-live-wave")) return;

      const wave = document.createElement("div");
      wave.className = "rhine-live-wave rhine-wave-animated";
      const barCount = 16;
      for (let i = 0; i < barCount; i++) {
        const bar = document.createElement("span");
        bar.className = "rhine-wave-bar";
        wave.appendChild(bar);
      }

      const countdown = document.createElement("div");
      countdown.className = "rhine-countdown";
      countdown.id = "rhineMicCountdown";

      const pulseBtn = this.micOverlay.querySelector(".rhine-mic-pulse");
      if (pulseBtn && pulseBtn.parentNode) {
        pulseBtn.parentNode.insertBefore(wave, pulseBtn.nextSibling);
      }
      const label = this.micOverlay.querySelector(".rhine-mic-label");
      if (label && label.parentNode) {
        label.parentNode.insertBefore(countdown, label.nextSibling);
      }
      this._countdownEl = countdown;
    }

    _updateCountdown() {
      if (!this._countdownEl) return;
      const s = this._listenSecondsLeft;
      const isAr = this.options.language === "ar";
      this._countdownEl.textContent = s > 0 ? (isAr ? `الاستماع مستمر (${s} ثانية)` : `Listening for ${s}s`) : "";
      this._countdownEl.style.color = s <= 10 ? "#fca5a5" : "rgba(236,213,158,0.8)";
    }

    _showAnalyzing(isAr) {
      if (this.micLabel) {
        this.micLabel.textContent = isAr ? "جارٍ التحليل..." : "Analyzing your question...";
      }
      if (this.micInterim) {
        const captured = this.capturedVoiceText || "";
        this.micInterim.innerHTML = `
          <span class="rhine-analyzing-dots">●●●</span>
          <em style="display:block;margin-top:4px;opacity:.8">${this._escapeHtml(captured)}</em>`;
      }
      if (this.micPulseBtn) {
        this.micPulseBtn.style.background = "linear-gradient(135deg,rgba(16,185,129,0.3),rgba(16,185,129,0.15))";
        this.micPulseBtn.style.borderColor = "#10b981";
        this.micPulseBtn.style.color = "#10b981";
      }
    }

    _stopListening() {
      this.isListening = false;
      this._micDebounceTimer = null;
      if (this._micSilenceTimeout) { clearTimeout(this._micSilenceTimeout); this._micSilenceTimeout = null; }
      if (this._countdownInterval) { clearInterval(this._countdownInterval); this._countdownInterval = null; }
      if (this._audioAnimFrame) cancelAnimationFrame(this._audioAnimFrame);
      // Reset pulse btn to default style
      if (this.micPulseBtn) {
        this.micPulseBtn.style.background = "";
        this.micPulseBtn.style.borderColor = "";
        this.micPulseBtn.style.color = "";
      }
      if (this.activeAudioStream) {
        try { this.activeAudioStream.getTracks().forEach(t => t.stop()); } catch { }
        this.activeAudioStream = null;
      }
      if (this.activeAudioCtx) {
        try { this.activeAudioCtx.close(); } catch { }
        this.activeAudioCtx = null;
      }
      if (this.activeRecognition) {
        this.activeRecognition.onresult = null;
        this.activeRecognition.onerror = null;
        this.activeRecognition.onend = null;
        try { this.activeRecognition.abort(); } catch { }
        this.activeRecognition = null;
      }
      this._stopListeningUI();
    }

    _stopListeningUI() {
      this.isListening = false;
      if (this.chatMic) this.chatMic.classList.remove("listening");
      if (this.micBtnIcon) this.micBtnIcon.innerHTML = ICONS.mic;
      if (this.speakNowBtn) {
        this.speakNowBtn.classList.remove("listening");
        const btnSpan = this.speakNowBtn.querySelector("span");
        if (btnSpan) btnSpan.textContent = this.options.language === "ar" ? "تكلّم الآن" : "Speak Now";
      }
      if (this.micOverlay) this.micOverlay.style.display = "none";
      if (this.micPulseBtn) this.micPulseBtn.style.transform = "";
      this.chatInput.placeholder = this.options.language === "ar" ? "تحدث أو اكتب سؤالك..." : "Speak or type your question...";
    }

    _setupSpeechRecognition() {
      if (this.chatMic) {
        this.chatMic.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          this._triggerMic();
        });
      }
    }

    _setStatus(text) {
      if (this.statusText) this.statusText.textContent = text;
    }

    _unlockSpeaker() {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          if (!this._audioCtx || this._audioCtx.state === 'closed') {
            this._audioCtx = new AudioCtx();
          }
          if (this._audioCtx.state === 'suspended') {
            this._audioCtx.resume().catch(() => { });
          }
          // Play a silent buffer — unlocks audio in incognito & strict autoplay policies
          const buf = this._audioCtx.createBuffer(1, 1, 22050);
          const src = this._audioCtx.createBufferSource();
          src.buffer = buf;
          src.connect(this._audioCtx.destination);
          src.start(0);
        }
      } catch { }

      if ("speechSynthesis" in window) {
        try {
          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }
          if (!window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
          }
        } catch { }
      }
    }

    /**
     * Trigger / refresh greeting on homepage initial visit or reload.
     * Guarantees greeting triggers only once per initial load/session.
     * If the visitor navigates back to the homepage within the same session, does not greet again.
     */
    refreshGreeting() {
      const path = (window.location.pathname || "/").toLowerCase();
      const hash = (window.location.hash || "").replace("#", "").trim().toLowerCase();
      const hostname = (window.location.hostname || "").toLowerCase();
      const href = (window.location.href || "").toLowerCase();

      const isHomePath = (path === "/" || path === "" || path === "/home" || path === "/home/index" || path === "/index");
      const isRenderHost = hostname.includes("rhine-middle-east.onrender.com") || href.includes("rhine-middle-east.onrender.com");
      const isHome = (isHomePath && (!hash || hash === "home")) || (isRenderHost && isHomePath);
      if (!isHome) return;

      // Detect if this is a fresh reload of the page
      let isReload = false;
      try {
        const navEntries = typeof performance !== "undefined" && performance.getEntriesByType && performance.getEntriesByType("navigation");
        if (navEntries && navEntries.length > 0) {
          isReload = navEntries[0].type === "reload";
        } else if (typeof performance !== "undefined" && performance.navigation) {
          isReload = performance.navigation.type === 1;
        }
      } catch { }

      let sessionGreeted = false;
      try {
        sessionGreeted = sessionStorage.getItem("rhine_home_greeted") === "true";
      } catch { }

      // If already greeted in this session and NOT a reload: do not greet again
      if (sessionGreeted && !isReload && this._greetingHasPlayed) {
        return;
      }

      // Mark session as greeted
      try {
        sessionStorage.setItem("rhine_home_greeted", "true");
      } catch { }

      // Reset flags for fresh initial visit or reload trigger
      this._greetingSpoken = false;
      this._greetingHasPlayed = false;
      this._hasActuallySpoken = false;

      this.open(true);
    }

    speakWelcomeOnHome() {
      this.refreshGreeting();
    }

    _autoEnableSoundAndSpeak(greetingText) {
      if (this.isSpeechMuted) return;
      if (this._hasActuallySpoken || this._greetingHasPlayed) return;

      // Ensure pill button is permanently hidden
      if (this.enableSoundPill) {
        this.enableSoundPill.style.display = "none";
      }

      this._unlockSpeaker();

      // 1. Immediately attempt direct speech (will play without interaction if browser policy allows)
      this.speak(greetingText);

      // 2. Real user interaction gestures (W3C User Activation compliant)
      const activationEvents = [
        'pointerdown', 'touchstart', 'touchend', 'click', 'keydown', 'mousedown', 'focus'
      ];

      const cleanup = () => {
        activationEvents.forEach(evt => {
          window.removeEventListener(evt, onUserActivation, { capture: true });
          document.removeEventListener(evt, onUserActivation, { capture: true });
        });
        if (this._greetingRetryTimer) {
          clearInterval(this._greetingRetryTimer);
          this._greetingRetryTimer = null;
        }
        this._autoSpeakListenersActive = false;
      };

      const onUserActivation = () => {
        // Unlock audio context and SpeechSynthesis synchronously within the gesture call stack
        this._unlockSpeaker();

        // If audio has already actually started playing, cleanup and exit
        if (this._hasActuallySpoken || this._greetingHasPlayed) {
          cleanup();
          return;
        }

        // Must run synchronously within the gesture event handler (no setTimeout) to satisfy Chrome
        if (!this.isSpeaking) {
          this.speak(greetingText);
        }
      };

      if (!this._autoSpeakListenersActive) {
        this._autoSpeakListenersActive = true;
        activationEvents.forEach(evt => {
          window.addEventListener(evt, onUserActivation, { capture: true, passive: true });
          document.addEventListener(evt, onUserActivation, { capture: true, passive: true });
        });
      }

      // 3. Watchdog: Automatically clean up listeners once audio starts playing; resume if paused
      if (this._greetingRetryTimer) clearInterval(this._greetingRetryTimer);
      let attempts = 0;
      this._greetingRetryTimer = setInterval(() => {
        attempts++;
        if (this._hasActuallySpoken || this._greetingHasPlayed) {
          cleanup();
          return;
        }
        if (attempts > 30) {
          cleanup();
          return;
        }
        // In Chromium, if speech was queued but engine stayed paused, unpause it
        if ("speechSynthesis" in window && window.speechSynthesis.speaking && window.speechSynthesis.paused) {
          try { window.speechSynthesis.resume(); } catch { }
        }
      }, 500);
    }

    open(speakGreeting = true) {
      this.isOpen = true;
      this.widgetEl.classList.remove("rhine-hidden");
      this.launcherEl.style.display = "none";
      if (this.backdropEl) {
        this.backdropEl.classList.add("active");
      }
      setTimeout(() => this.chatInput.focus(), 150);

      // Keep video paused until speech starts
      if (!this.isSpeaking) {
        this._setVideoActive(false);
      }

      this._unlockSpeaker();

      const kb = RHINE_KNOWLEDGE[this.options.language] || RHINE_KNOWLEDGE.en;
      const greetingText = kb.greeting;
      this.lastCaption = greetingText;

      // Automatically speak welcome greeting when opened
      if (speakGreeting && !this.isSpeechMuted && !this._greetingHasPlayed) {
        this._greetingSpoken = true;
        this._homeGreetingSpoken = true;
        this.setCaptionAndSpeak(greetingText, false, null, "greeting");
        this._autoEnableSoundAndSpeak(greetingText);
      } else if (!this.lastCaption) {
        this.setCaptionAndSpeak(greetingText, false, null, "greeting");
      }
    }
    close() {
      this.isOpen = false;
      this.widgetEl.classList.add("rhine-hidden");
      this.launcherEl.style.display = "flex";
      if (this.backdropEl) {
        this.backdropEl.classList.remove("active");
      }
      this.stopSpeech();
    }

    toggleMute() {
      this.isSpeechMuted = !this.isSpeechMuted;
      if (this.isSpeechMuted) {
        this.muteIcon.innerHTML = ICONS.speakerMuted;
        this.stopSpeech();
      } else {
        this.muteIcon.innerHTML = ICONS.speakerOn;
      }
    }

    toggleCaptions() {
      this.isCaptionsVisible = !this.isCaptionsVisible;
      if (this.isCaptionsVisible) {
        this.captionOverlay.classList.remove("rhine-caption-hidden");
        this.ccBtn.classList.add("active");
        this.ccBtn.title = "Hide Captions";
      } else {
        this.captionOverlay.classList.add("rhine-caption-hidden");
        this.ccBtn.classList.remove("active");
        this.ccBtn.title = "Show Captions";
      }
    }

    async ask(question) {
      // If we're in the middle of a meeting flow, route to the meeting handler first
      if (this._meetingFlow && this._meetingFlow.active) {
        this._handleMeetingInput(question);
        return;
      }

      this.stopSpeech();
      this.chatSend.disabled = true;
      this._setStatus("Thinking...");

      const lang = this.options.language;
      const lower = question.toLowerCase().trim();

      // 1. Intent rule matching
      // Normalise Arabic: strip punctuation (Arabic ؟ ! ، . ) and normalise alef variants
      const normaliseAr = (t) => t
        .replace(/[\u060C\u061B\u061F\u06D4!?.،؛]/g, " ") // Arabic punctuation → space
        .replace(/[أإآٱ]/g, "ا")                           // alef variants → bare alef
        .replace(/\s+/g, " ").trim();

      const normalised = normaliseAr(lower);

      let answer = "";
      let matchedTopic = null;
      for (const rule of INTENT_RULES) {
        if (rule.keys.some(k => normalised.includes(normaliseAr(k.toLowerCase())))) {
          // Special sentinel: launch meeting flow instead of returning KB text
          if (rule.topic === "__meeting__") {
            this.chatSend.disabled = false;
            this._setStatus("Active");
            this._startMeetingFlow();
            return;
          }
          // Dynamic time-based greetings (Good morning / afternoon / evening) based on local timezone
          if (rule.topic === "time_greeting" || ["morning_greeting", "afternoon_greeting", "evening_greeting", "night_greeting"].includes(rule.topic)) {
            matchedTopic = this._getTimeGreetingKey();
            const kb = RHINE_KNOWLEDGE[lang] || RHINE_KNOWLEDGE.en;
            answer = kb[matchedTopic] || kb.greeting;
            break;
          }
          // General welcome greeting (Hi / Hello / السلام عليكم)
          if (rule.topic === "greeting") {
            matchedTopic = "greeting";
            const kb = RHINE_KNOWLEDGE[lang] || RHINE_KNOWLEDGE.en;
            answer = kb.greeting;
            break;
          }
          const kb = RHINE_KNOWLEDGE[lang] || RHINE_KNOWLEDGE.en;
          answer = kb[rule.topic] || "";
          if (answer) {
            matchedTopic = rule.topic;
            break;
          }
        }
      }

      // If not matched, query backend server /api/agent/chat
      if (!answer) {
        try {
          const headers = { "Content-Type": "application/json" };
          if (this.options.antiForgeryToken) {
            headers[this.options.antiForgeryHeader] = this.options.antiForgeryToken;
          }
          const resp = await fetch(this.options.endpoint, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ message: question, language: lang })
          });
          if (resp.ok) {
            const data = await resp.json();
            if (data && data.success && data.message) {
              answer = data.message;
            }
          }
        } catch { }
      }

      // If still not matched, search curated knowledge base topics with strict stop-word filtering
      if (!answer && this.kbData && this.kbData.topics) {
        const STOP_WORDS = new Set([
          "who", "what", "where", "when", "why", "how", "are", "you", "the", "and", "for",
          "with", "all", "can", "get", "out", "not", "now", "know", "type", "this", "that",
          "from", "tell", "like", "need", "does", "have", "here", "help", "show", "some", "your",
          "about", "into", "been", "good", "more", "much", "very", "also", "just", "want",
          "هل", "من", "ما", "ماذا", "اين", "أين", "متى", "كيف", "في", "على", "الى", "إلى", "عن", "مع", "هذا", "هذه", "ذلك", "تلك", "كان", "ليس"
        ]);
        for (const t of this.kbData.topics) {
          const kw = (t["keywords_" + lang] || "") + " " + t.title;
          const words = kw.toLowerCase().split(/\s+/).filter(w => w.length >= 4 && !STOP_WORDS.has(w));
          if (words.some(w => {
            const escaped = w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            return new RegExp("(?:^|[^\\w\\u0600-\\u06FF])" + escaped + "(?:$|[^\\w\\u0600-\\u06FF])", "i").test(lower);
          })) {
            answer = t[lang] || t.en;
            if (answer) {
              matchedTopic = "website_info";
              break;
            }
          }
        }
      }

      if (!answer) {
        matchedTopic = "fallback";
        answer = (RHINE_KNOWLEDGE[lang] || RHINE_KNOWLEDGE.en).fallback;
      }

      this._setStatus("Active");
      this.chatSend.disabled = false;
      this.setCaptionAndSpeak(answer, true, question, matchedTopic);

      // After answering a contact/consultation question, offer the meeting flow
      if (matchedTopic === "contact" || matchedTopic === "hours" || matchedTopic === "pricing") {
        setTimeout(() => this._offerMeeting(), 2200);
      }
    }

    setCaptionAndSpeak(text, autoSpeak = true, customerQuestion = null, topicKey = null) {
      this.lastCaption = text;
      this.captionContent.textContent = "";

      // Dynamic heading and badge update as per user question / topic
      const isAr = this.options.language === "ar" || /[\u0600-\u06FF]/.test(text);
      const titles = (TOPIC_TITLES && (TOPIC_TITLES[isAr ? 'ar' : 'en'] || TOPIC_TITLES.en)) || {};
      let displayTitle = (topicKey && titles[topicKey]) ? titles[topicKey] : (customerQuestion ? customerQuestion.slice(0, 32) : this.options.title);
      if (this.topTitleEl && displayTitle) {
        this.topTitleEl.textContent = displayTitle;
      }
      if (this.captionBadgeText && displayTitle) {
        this.captionBadgeText.textContent = displayTitle.toUpperCase();
      }

      if (customerQuestion) {
        const qEl = document.createElement("div");
        qEl.className = "rhine-caption-q";
        qEl.innerHTML = `<strong>${this.options.language === 'ar' ? 'سؤالك:' : 'You asked:'}</strong> "${this._escapeHtml(customerQuestion)}"`;
        this.captionContent.appendChild(qEl);
      }

      const aEl = document.createElement("div");
      aEl.className = "rhine-caption-a";
      aEl.textContent = text;
      this.captionContent.appendChild(aEl);
      this.captionOverlay.scrollTop = 0;

      // Note: captions remain hidden unless user clicks the CC button
      if (autoSpeak && !this.isSpeechMuted) {
        setTimeout(() => this.speak(text), 100);
      }
    }

    speak(text) {
      if (this.isSpeechMuted) return;
      this.stopSpeech();

      const hasArabicChars = /[\u0600-\u06FF]/.test(text);
      const isAr = this.options.language === "ar" || hasArabicChars;
      const clean = text.replace(/[*_#`~\[\]•]/g, " ").replace(/\n/g, ". ").trim();
      if (!clean) return;

      const currentSessionId = (this._speechSessionId || 0) + 1;
      this._speechSessionId = currentSessionId;

      // Audio stream fallback for fluent Arabic when no native voice is installed
      const _speakViaAudioStream = (txt) => {
        if (this._speechSessionId !== currentSessionId) return;

        const cleanTxt = txt
          .replace(/[\u064B-\u065F\u0670\u0640]/g, "")
          .replace(/[*_#`~\[\]•]/g, " ")
          .trim();

        const rawSentences = cleanTxt.match(/[^.!?،؟;\n]+[.!?،؟;\n]*/g) || [cleanTxt];
        const chunks = [];
        let curr = "";
        for (const s of rawSentences) {
          const trimmed = s.trim();
          if (!trimmed) continue;
          if ((curr + " " + trimmed).trim().length <= 160) {
            curr = (curr + " " + trimmed).trim();
          } else {
            if (curr) chunks.push(curr);
            curr = trimmed.slice(0, 160);
          }
        }
        if (curr) chunks.push(curr);
        if (chunks.length === 0) chunks.push(cleanTxt.slice(0, 160));

        let idx = 0;
        this.isSpeaking = true;
        this._setStatus(isAr ? "المساعد يتحدث..." : "AI Assistant speaking...");

        // Preload queue of Audio objects for seamless playback with 0ms gap
        const preloadedAudios = chunks.map((c) => {
          const audio = new Audio();
          audio.preload = "auto";
          audio.crossOrigin = "anonymous";
          audio.src = "/api/agent/tts?text=" + encodeURIComponent(c) + "&lang=" + (isAr ? "ar" : "en");
          audio.load();
          return audio;
        });
        this._preloadedAudios = preloadedAudios;

        const playNext = () => {
          if (this._speechSessionId !== currentSessionId || !this.isSpeaking || idx >= preloadedAudios.length) {
            if (this._speechSessionId === currentSessionId) {
              this.isSpeaking = false;
              this._setVideoActive(false);
              this._setStatus("Active");
              this._activeAudio = null;
            }
            return;
          }

          const currentAudio = preloadedAudios[idx];
          const currentChunk = chunks[idx];
          idx++;
          this._activeAudio = currentAudio;

          currentAudio.onplaying = () => {
            if (this._speechSessionId !== currentSessionId) {
              try { currentAudio.pause(); } catch { }
              return;
            }
            this._hasActuallySpoken = true;
            this._greetingHasPlayed = true;
            if (this.isSpeaking) {
              this._setVideoActive(true);
            }
          };

          currentAudio.onwaiting = () => { };

          currentAudio.onended = () => {
            if (this._speechSessionId !== currentSessionId) return;
            if (idx < preloadedAudios.length) {
              playNext();
            } else {
              this.isSpeaking = false;
              this._setVideoActive(false);
              this._setStatus("Active");
              this._activeAudio = null;
            }
          };

          currentAudio.onerror = () => {
            if (this._speechSessionId !== currentSessionId) return;
            const directUrl = "https://translate.google.com/translate_tts?ie=UTF-8&q=" + encodeURIComponent(currentChunk) + "&tl=" + (isAr ? "ar" : "en") + "&client=tw-ob";
            const fallbackAudio = new Audio();
            fallbackAudio.src = directUrl;
            this._activeAudio = fallbackAudio;

            fallbackAudio.onplaying = () => {
              if (this._speechSessionId !== currentSessionId) {
                try { fallbackAudio.pause(); } catch { }
                return;
              }
              this._hasActuallySpoken = true;
              this._greetingHasPlayed = true;
              if (this.isSpeaking) this._setVideoActive(true);
            };
            fallbackAudio.onended = () => {
              if (this._speechSessionId !== currentSessionId) return;
              if (idx < preloadedAudios.length) playNext();
              else {
                this.isSpeaking = false;
                this._setVideoActive(false);
                this._setStatus("Active");
                this._activeAudio = null;
              }
            };
            fallbackAudio.onerror = () => {
              if (this._speechSessionId !== currentSessionId) return;
              if (idx < preloadedAudios.length) playNext();
              else {
                this.isSpeaking = false;
                this._setVideoActive(false);
                this._setStatus("Active");
              }
            };

            const p = fallbackAudio.play();
            if (p !== undefined) {
              p.catch(() => {
                fallbackAudio.onerror();
              });
            }
          };

          const playPromise = currentAudio.play();
          if (playPromise !== undefined) {
            playPromise.catch((err) => {
              if (err && err.name === "NotAllowedError") {
                // Browser blocked audio — reset speaking state so activation-listener retry works
                console.warn("Audio autoplay blocked by browser policy (incognito or strict policy)");
                this.isSpeaking = false;
                this._setVideoActive(false);
                this._setStatus("Active");
              } else {
                currentAudio.onerror();
              }
            });
          }
        };

        playNext();
      };

      // Native SpeechSynthesis check
      if ("speechSynthesis" in window) {
        const _doSpeak = () => {
          if (this._speechSessionId !== currentSessionId) return;
          const allVoices = window.speechSynthesis.getVoices();
          let voice = null;

          if (isAr) {
            const arTags = ["ar-sa", "ar-ae", "ar-eg", "ar-jo", "ar-kw", "ar"];
            for (const tag of arTags) {
              const found = allVoices.find(v => v.lang.toLowerCase() === tag);
              if (found) { voice = found; break; }
            }
            if (!voice) {
              const femaleAr = /salma|layla|zeina|marium|yasmin|shatha|female/i;
              voice = allVoices.find(v => (v.lang.toLowerCase().startsWith("ar") || /arabic|عرب/i.test(v.name)) && femaleAr.test(v.name)) ||
                      allVoices.find(v => v.lang.toLowerCase().startsWith("ar") || /arabic|عرب/i.test(v.name));
            }

            // If no Arabic voice found on Windows/browser, stream authentic Arabic audio via Google TTS
            if (!voice) {
              _speakViaAudioStream(clean);
              return;
            }
          } else {
            const enVoices = allVoices.filter(v => v.lang.toLowerCase().startsWith("en"));
            const localEn = enVoices.filter(v => v.localService === true);
            const femalePattern = /zira|samantha|karen|victoria|jenny|aria|female|ava|allison|serena|stephanie|susan|catherine|linda|natural.*female/i;
            const malePattern = /david|mark|george|male|guy|richard|james|paul/i;

            voice =
              (localEn.length > 0 ? localEn.find(v => femalePattern.test(v.name)) : null) ||
              enVoices.find(v => femalePattern.test(v.name)) ||
              (localEn.length > 0 ? localEn.find(v => !malePattern.test(v.name)) : null) ||
              enVoices.find(v => !malePattern.test(v.name)) ||
              (localEn.length > 0 ? localEn[0] : null) ||
              enVoices[0] ||
              null;
          }

          const utterance = new SpeechSynthesisUtterance(clean.slice(0, 600));
          utterance.lang = isAr ? "ar-SA" : "en-US";
          utterance.rate = isAr ? 0.9 : 0.95;
          utterance.pitch = 1.05;
          if (voice) utterance.voice = voice;

          // Prevent Chromium Garbage Collection bug which pauses speech or stops video early
          this._activeUtterance = utterance;

          utterance.onstart = () => {
            if (this._speechSessionId !== currentSessionId) {
              try { window.speechSynthesis.cancel(); } catch { }
              return;
            }
            this.isSpeaking = true;
            this._hasActuallySpoken = true;
            this._greetingHasPlayed = true;
            this._setVideoActive(true);
            this._setStatus(isAr ? "المساعد يتحدث..." : "AI Assistant speaking...");
          };

          utterance.onpause = () => {
            this._setVideoActive(false);
          };

          utterance.onresume = () => {
            if (this.isSpeaking) this._setVideoActive(true);
          };

          utterance.onend = () => {
            if (this._speechSessionId !== currentSessionId) return;
            this._activeUtterance = null;
            this.isSpeaking = false;
            this._setVideoActive(false);
            this._setStatus("Active");
          };

          utterance.onerror = (e) => {
            if (this._speechSessionId !== currentSessionId) return;
            console.warn("TTS error:", e);
            this._activeUtterance = null;
            this.isSpeaking = false;
            this._setVideoActive(false);
            this._setStatus("Active");
            // Do NOT fall back to audio stream if speech was intentionally canceled or interrupted
            if (e && (e.error === "canceled" || e.error === "interrupted")) {
              return;
            }
            // 'not-allowed' = browser autoplay policy blocked speechSynthesis (incognito).
            // The _autoEnableSoundAndSpeak activation listener will retry on first gesture.
            if (e && e.error === "not-allowed") {
              return;
            }
            if (!this._hasActuallySpoken) {
              _speakViaAudioStream(clean);
            }
          };

          // Chromium SpeechSynthesis keep-alive timer
          if (this._speechKeepAlive) clearInterval(this._speechKeepAlive);
          this._speechKeepAlive = setInterval(() => {
            if (!this.isSpeaking) {
              clearInterval(this._speechKeepAlive);
              this._speechKeepAlive = null;
            } else if (window.speechSynthesis && window.speechSynthesis.speaking && window.speechSynthesis.paused) {
              window.speechSynthesis.resume();
            }
          }, 4000);

          if (window.speechSynthesis.paused) window.speechSynthesis.resume();
          try {
            window.speechSynthesis.speak(utterance);
          } catch (e) {
            console.warn("Speech synthesis speak error:", e);
            _speakViaAudioStream(clean);
          }
        };

        const voices = window.speechSynthesis.getVoices();
        if (voices.length === 0) {
          const onVoicesChanged = () => {
            if (this._speechSessionId === currentSessionId && !this._hasActuallySpoken && !this.isSpeaking) {
              _doSpeak();
            }
          };
          window.speechSynthesis.addEventListener("voiceschanged", onVoicesChanged, { once: true });
          try { window.speechSynthesis.onvoiceschanged = onVoicesChanged; } catch { }
          setTimeout(() => {
            if (this._speechSessionId === currentSessionId && !this._hasActuallySpoken && !this.isSpeaking) {
              _doSpeak();
            }
          }, 250);
        } else {
          _doSpeak();
        }
      } else {
        _speakViaAudioStream(clean);
      }
    }

    stopSpeech() {
      this._speechSessionId = (this._speechSessionId || 0) + 1;
      if (this._speechKeepAlive) {
        clearInterval(this._speechKeepAlive);
        this._speechKeepAlive = null;
      }
      this._activeUtterance = null;
      if ("speechSynthesis" in window) {
        try { window.speechSynthesis.cancel(); } catch { }
      }
      if (this._activeAudio) {
        try {
          this._activeAudio.pause();
          this._activeAudio.currentTime = 0;
          this._activeAudio.src = "";
        } catch { }
        this._activeAudio = null;
      }
      if (this._preloadedAudios && Array.isArray(this._preloadedAudios)) {
        this._preloadedAudios.forEach(a => {
          try {
            a.pause();
            a.currentTime = 0;
            a.src = "";
          } catch { }
        });
        this._preloadedAudios = [];
      }
      this.isSpeaking = false;
      this._setVideoActive(false);
      this._setStatus("Active");
    }

    _setVideoActive(active) {
      if (active && this.isSpeaking) {
        this._videoIntentionallyPaused = false;
        this.widgetEl.classList.add("rhine-speaking");
        if (this.launcherEl) this.launcherEl.classList.add("rhine-speaking");
        if (this.videoEl && !this.videoFallbackEl.classList.contains("visible")) {
          // Always keep video muted — TTS provides the voice
          this.videoEl.muted = true;
          this.videoEl.loop = true;
          const p = this.videoEl.play();
          if (p !== undefined) p.catch(() => { });
        }
      } else {
        this._videoIntentionallyPaused = true;
        this.widgetEl.classList.remove("rhine-speaking");
        if (this.launcherEl) this.launcherEl.classList.remove("rhine-speaking");
        if (this.videoEl) {
          try {
            this.videoEl.pause();
            this.videoEl.currentTime = 0; // Strict: Reset to frame 0 so avatar lips remain closed
          } catch { }
        }
      }
    }

    _escapeHtml(str) {
      if (!str) return "";
      return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    // ─────────────────────────────────────────────────────────────────────────
    // MEETING REQUEST FLOW
    // ─────────────────────────────────────────────────────────────────────────

    /** Offer the meeting flow inline (called after contact/pricing answers). */
    _offerMeeting() {
      if (this._meetingFlow && this._meetingFlow.active) return;
      const lang = this.options.language;
      const mt = MEETING_TEXT[lang] || MEETING_TEXT.en;
      this._renderMeetingOfferChips(mt);
    }

    /** Public API to open the avatar widget and start meeting request flow */
    startMeetingFlow() {
      if (!this.isOpen) {
        this.open();
      }
      this._startMeetingFlow();
    }

    /** Start the meeting flow immediately (triggered by explicit meeting intent or button). */
    _startMeetingFlow() {
      if (!this.isOpen) {
        this.open();
      }
      if (this.isListening) {
        this._stopListening();
      }
      const lang = this.options.language;
      const mt = MEETING_TEXT[lang] || MEETING_TEXT.en;
      this.stopSpeech();
      this.setCaptionAndSpeak(mt.offerQ, true, null, "contact");
      this._renderMeetingOfferChips(mt);
    }

    /** Render the Yes / Not Now chips below the chat input. */
    _renderMeetingOfferChips(mt) {
      this._clearMeetingUI();
      const container = document.createElement("div");
      container.id = "rhineMeetingOffer";
      container.className = "rhine-meeting-actions";
      container.innerHTML = `
        <button type="button" class="rhine-meeting-chip primary" id="rhineMeetingYes">${this._escapeHtml(mt.offerYes)}</button>
        <button type="button" class="rhine-meeting-chip secondary" id="rhineMeetingNo">${this._escapeHtml(mt.offerNo)}</button>
      `;
      this.chatForm.insertAdjacentElement("beforebegin", container);

      container.querySelector("#rhineMeetingYes").addEventListener("click", () => {
        this._clearMeetingUI();
        this._initMeetingFlow();
        this._advanceMeetingStep();
      });
      container.querySelector("#rhineMeetingNo").addEventListener("click", () => {
        this._clearMeetingUI();
        const lang = this.options.language;
        const answer = lang === "ar"
          ? "حسناً! إذا احتجت مساعدة في أي وقت، فأنا هنا."
          : "No problem! Feel free to ask me anything else.";
        this.setCaptionAndSpeak(answer, true, null, "contact");
      });
    }

    /** Initialise/reset the meeting data state. */
    _initMeetingFlow() {
      const lang = this.options.language;
      const mt = MEETING_TEXT[lang] || MEETING_TEXT.en;
      this._meetingFlow = {
        active: true,
        lang,
        mt,
        stepIndex: 0,
        data: {}
      };
    }

    /** Advance to the next step, show prompt and listen for input. */
    _advanceMeetingStep() {
      const flow = this._meetingFlow;
      if (!flow || !flow.active) return;
      const mt = flow.mt;
      const steps = mt.steps;

      if (flow.stepIndex >= steps.length) {
        // All steps collected — show review
        this._showMeetingReview();
        return;
      }

      const step = steps[flow.stepIndex];
      const promptText = typeof step.prompt === "function" ? step.prompt(flow.data) : step.prompt;
      this.setCaptionAndSpeak(promptText, true, null, "contact");

      // For the website step, also inject a "No Website" chip
      this._clearMeetingStepUI();
      if (step.optional) {
        const chip = document.createElement("div");
        chip.id = "rhineMeetingStepUI";
        chip.className = "rhine-meeting-actions";
        chip.innerHTML = `<button type="button" class="rhine-meeting-chip secondary" id="rhineMeetingNoWebsite">${this._escapeHtml(mt.noWebsite)}</button>`;
        this.chatForm.insertAdjacentElement("beforebegin", chip);
        chip.querySelector("#rhineMeetingNoWebsite").addEventListener("click", () => {
          this._clearMeetingStepUI();
          this._saveMeetingValue(mt.noWebsite);
        });
      }

      // Focus the input to invite typing/voice
      if (this.chatInput) {
        this.chatInput.placeholder = flow.lang === "ar" ? "اكتب إجابتك هنا..." : "Type your answer here...";
        this.chatInput.focus();
      }
    }

    /** Called when user submits text while meeting flow is active. */
    _handleMeetingInput(value) {
      const flow = this._meetingFlow;
      if (!flow || !flow.active) return;
      const step = flow.mt.steps[flow.stepIndex];
      if (!step) return;

      // If user typed/spoke skip or no on optional website step
      if (step.key === "website") {
        const trimmed = value.trim().toLowerCase();
        if (!trimmed || trimmed === "no" || trimmed === "none" || trimmed === "skip" || trimmed === "n/a" || trimmed === "لا" || trimmed === "لا يوجد موقع") {
          this._saveMeetingValue(flow.mt.noWebsite);
          return;
        }
      }

      const cleanVal = step.normalize ? step.normalize(value) : value.trim();
      const error = step.validate ? step.validate(cleanVal) : null;
      if (error) {
        const errText = flow.mt.validationError(error);
        this.setCaptionAndSpeak(errText, true, null, "contact");
        if (this.chatInput) this.chatInput.value = "";
        return;
      }

      this._saveMeetingValue(cleanVal);
    }

    /** Save a validated value, advance to next step. */
    _saveMeetingValue(value) {
      const flow = this._meetingFlow;
      const step = flow.mt.steps[flow.stepIndex];
      flow.data[step.key] = value;
      flow.stepIndex++;
      this._clearMeetingStepUI();
      if (this.chatInput) this.chatInput.value = "";
      this._advanceMeetingStep();
    }

    /** Render the full review modal. */
    _showMeetingReview() {
      const flow = this._meetingFlow;
      const mt = flow.mt;
      const data = flow.data;
      this._clearMeetingUI();

      this.setCaptionAndSpeak(mt.reviewTitle, true, null, "contact");

      const overlay = document.createElement("div");
      overlay.id = "rhineMeetingModal";
      overlay.className = "rhine-modal-overlay";

      const isAr = flow.lang === "ar";

      const rows = mt.steps.map(s => `
        <tr>
          <td class="rhine-review-label">${this._escapeHtml(s.label)}</td>
          <td class="rhine-review-value">${this._escapeHtml(data[s.key] || "—")}</td>
        </tr>
      `).join("");

      overlay.innerHTML = `
        <div class="rhine-modal-box" dir="${isAr ? 'rtl' : 'ltr'}">
          <div class="rhine-modal-header">
            <span>${isAr ? '📋 مراجعة طلب الاجتماع' : '📋 Review Meeting Request'}</span>
          </div>
          <div class="rhine-modal-body">
            <table class="rhine-review-table">
              <tbody>${rows}</tbody>
            </table>
          </div>
          <div class="rhine-modal-footer">
            <button type="button" class="rhine-modal-btn primary" id="rhineMeetingConfirm">${this._escapeHtml(mt.confirmBtn)}</button>
            <button type="button" class="rhine-modal-btn secondary" id="rhineMeetingEdit">${this._escapeHtml(mt.editBtn)}</button>
            <button type="button" class="rhine-modal-btn cancel" id="rhineMeetingCancel">${this._escapeHtml(mt.cancelBtn)}</button>
          </div>
        </div>
      `;

      this.widgetEl.appendChild(overlay);

      overlay.querySelector("#rhineMeetingConfirm").addEventListener("click", () => {
        overlay.remove();
        this._submitMeetingRequest();
      });
      overlay.querySelector("#rhineMeetingEdit").addEventListener("click", () => {
        overlay.remove();
        this._showMeetingEditForm();
      });
      overlay.querySelector("#rhineMeetingCancel").addEventListener("click", () => {
        overlay.remove();
        this._cancelMeetingFlow();
      });
    }

    /** Render editable form so user can change any field before re-confirming. */
    _showMeetingEditForm() {
      const flow = this._meetingFlow;
      const mt = flow.mt;
      const data = flow.data;
      const isAr = flow.lang === "ar";

      const overlay = document.createElement("div");
      overlay.id = "rhineMeetingModal";
      overlay.className = "rhine-modal-overlay";

      const fields = mt.steps.map(s => `
        <div class="rhine-edit-field">
          <label class="rhine-edit-label" for="rhineEdit_${s.key}">${this._escapeHtml(s.label)}</label>
          ${s.key === "topic"
          ? `<textarea class="rhine-edit-textarea" id="rhineEdit_${s.key}" rows="3">${this._escapeHtml(data[s.key] || "")}</textarea>`
          : `<input type="text" class="rhine-edit-input" id="rhineEdit_${s.key}" value="${this._escapeHtml(data[s.key] || "")}" />`
        }
        </div>
      `).join("");

      overlay.innerHTML = `
        <div class="rhine-modal-box" dir="${isAr ? 'rtl' : 'ltr'}">
          <div class="rhine-modal-header">
            <span>${isAr ? '✏️ تعديل المعلومات' : '✏️ Edit Information'}</span>
          </div>
          <div class="rhine-modal-body">
            <div class="rhine-edit-form">${fields}</div>
          </div>
          <div class="rhine-modal-footer">
            <button type="button" class="rhine-modal-btn primary" id="rhineMeetingEditSave">${this._escapeHtml(mt.editSaveBtn)}</button>
            <button type="button" class="rhine-modal-btn secondary" id="rhineMeetingEditBack">${this._escapeHtml(mt.editCancelBtn)}</button>
          </div>
        </div>
      `;

      this.widgetEl.appendChild(overlay);

      overlay.querySelector("#rhineMeetingEditSave").addEventListener("click", () => {
        // Validate & save each field
        let allOk = true;
        for (const s of mt.steps) {
          const el = overlay.querySelector(`#rhineEdit_${s.key}`);
          if (!el) continue;
          let val = el.value.trim();
          if (s.normalize) val = s.normalize(val);
          const err = s.validate ? s.validate(val) : null;
          if (err && !s.optional) {
            el.style.borderColor = "#ef4444";
            el.title = err;
            allOk = false;
          } else {
            el.style.borderColor = "";
            data[s.key] = val;
          }
        }
        if (allOk) {
          overlay.remove();
          this._showMeetingReview();
        }
      });

      overlay.querySelector("#rhineMeetingEditBack").addEventListener("click", () => {
        overlay.remove();
        this._showMeetingReview();
      });
    }

    /** Submit the meeting request to /api/agent/meeting-request. */
    async _submitMeetingRequest() {
      const flow = this._meetingFlow;
      if (!flow) return;
      const mt = flow.mt;
      const data = flow.data;

      this.setCaptionAndSpeak(mt.submitting, true, null, "contact");
      this._setStatus(flow.lang === "ar" ? "جارٍ الإرسال..." : "Sending...");

      const payload = {
        fullName: data.fullName || "",
        companyName: data.companyName || "",
        website: data.website || "No Website",
        email: data.email || "",
        telephone: data.telephone || "",
        meetingTopic: data.topic || "General Consultation Enquiry via RHINE AI Assistant",
        preferredDateTime: data.preferredTime || "To be arranged by RHINE team",
        language: flow.lang
      };

      try {
        const headers = { "Content-Type": "application/json" };
        if (this.options.antiForgeryToken) {
          headers[this.options.antiForgeryHeader] = this.options.antiForgeryToken;
        }
        const resp = await fetch("/api/agent/meeting-request", {
          method: "POST",
          headers,
          body: JSON.stringify(payload)
        });

        if (resp.ok) {
          const result = await resp.json();
          if (result && result.success) {
            this._meetingFlow = null;
            this._showMeetingResult(true, mt.successMsg(data.fullName || ""), mt);
            return;
          }
        }
        // Server returned error or non-ok status
        this._showMeetingResult(false, mt.failMsg, mt);
      } catch {
        this._showMeetingResult(false, mt.failMsg, mt);
      }
    }

    /** Display success or failure result with appropriate actions. */
    _showMeetingResult(success, message, mt) {
      const isAr = (mt === (MEETING_TEXT.ar));
      this.setCaptionAndSpeak(message, true, null, success ? "contact" : "fallback");

      if (!success) {
        // Offer retry chip
        const chip = document.createElement("div");
        chip.id = "rhineMeetingRetry";
        chip.className = "rhine-meeting-actions";
        chip.innerHTML = `<button type="button" class="rhine-meeting-chip primary" id="rhineMeetingRetryBtn">${this._escapeHtml(mt.retryBtn)}</button>`;
        this.chatForm.insertAdjacentElement("beforebegin", chip);
        chip.querySelector("#rhineMeetingRetryBtn").addEventListener("click", () => {
          chip.remove();
          this._showMeetingReview();
        });
      } else {
        this._meetingFlow = null;
        this._clearMeetingUI();
        if (this.chatInput) {
          this.chatInput.placeholder = isAr ? "تحدث أو اكتب سؤالك..." : "Speak or type your question...";
        }
      }
      this._setStatus("Active");
    }

    /** Cancel the entire meeting flow. */
    _cancelMeetingFlow() {
      this._meetingFlow = null;
      this._clearMeetingUI();
      const lang = this.options.language;
      const answer = lang === "ar"
        ? "تم إلغاء طلب الاجتماع. إذا أردت المحاولة مرة أخرى في أي وقت، فقط اسألني."
        : "Your meeting request has been cancelled. Feel free to ask me anything else or arrange a meeting any time.";
      this.setCaptionAndSpeak(answer, true, null, "contact");
      if (this.chatInput) {
        this.chatInput.placeholder = lang === "ar" ? "تحدث أو اكتب سؤالك..." : "Speak or type your question...";
      }
    }

    /** Remove persistent meeting offer chips/step UI (not the modal). */
    _clearMeetingUI() {
      ["rhineMeetingOffer", "rhineMeetingStepUI", "rhineMeetingRetry"].forEach(id => {
        const el = this.widgetEl.querySelector(`#${id}`) || document.getElementById(id);
        if (el) el.remove();
      });
    }

    /** Remove only the step UI (e.g. No Website chip). */
    _clearMeetingStepUI() {
      const el = this.widgetEl.querySelector("#rhineMeetingStepUI") || document.getElementById("rhineMeetingStepUI");
      if (el) el.remove();
    }
  }

  global.RhineAvatarWidget = RhineAvatarWidget;
})(typeof window !== "undefined" ? window : this);
