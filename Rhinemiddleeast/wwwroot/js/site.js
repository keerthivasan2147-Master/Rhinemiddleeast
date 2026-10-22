/**
 * RHINE MIDDLE EAST FZE - Core Interactive Controller
 * Replicates the exact smooth menu navigation, hash routing, and keyboard transitions
 * from RHINE_FULL_WEBSITE_REVIEW_ZOOM_OUT_ALL_RUN.html without page reload.
 */

(function () {
    'use strict';

    const order = ['home', 'about', 'how', 'agentfactory', 'industries', 'ourwork', 'insights', 'contact'];

    const RhineApp = {
        init: function () {
            this.bindNavigation();
            this.bindKeyboardShortcuts();
            this.bindSidenav();
            this.handleInitialHash();
            const savedLang = localStorage.getItem('rhine_lang');
            const browserIsAr = (typeof navigator !== 'undefined' && navigator.languages)
                ? Array.from(navigator.languages).some(l => l.toLowerCase().startsWith('ar'))
                : (typeof navigator !== 'undefined' && navigator.language && navigator.language.toLowerCase().startsWith('ar'));

            if (savedLang === 'AR' || (!savedLang && browserIsAr)) {
                this.switchLang('AR');
            } else if (savedLang === 'EN') {
                this.switchLang('EN');
            }
        },

        /**
         * Smooth page transition without reloading the entire page
         */
        go: function (id) {
            if (!id) id = 'home';
            const pages = document.querySelectorAll('.page');
            const navs = document.querySelectorAll('.center-nav .nav-item-btn, .nav-item-btn, .nav-link, .sidenav-link');

            let found = false;
            pages.forEach(p => {
                const isActive = p.id === id;
                p.classList.toggle('active', isActive);
                if (isActive) found = true;
            });

            if (!found && pages.length > 0) {
                id = 'home';
                pages.forEach(p => p.classList.toggle('active', p.id === 'home'));
            }

            navs.forEach(n => {
                n.classList.toggle('active', n.getAttribute('data-go') === id);
            });

            // Update URL hash cleanly without page reload
            if (history.pushState) {
                history.pushState(null, '', id === 'home' ? window.location.pathname : '#' + id);
            } else {
                window.location.hash = id === 'home' ? '' : id;
            }
        },

        /**
         * Bind click handlers to all navigation elements with data-go
         */
        bindNavigation: function () {
            const self = this;
            document.querySelectorAll('[data-go]').forEach(el => {
                el.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = this.getAttribute('data-go');
                    self.go(target);
                });
            });

            window.addEventListener('hashchange', () => {
                const hash = (window.location.hash || '#home').replace('#', '');
                this.go(hash);
            });
        },

        /**
         * ArrowLeft / ArrowRight keyboard navigation between pages
         */
        bindKeyboardShortcuts: function () {
            const self = this;
            document.addEventListener('keydown', function (e) {
                // Ignore key shortcuts if modal is open or user is typing in form
                if (document.body.classList.contains('modal-open') || ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
                    return;
                }

                const currentEl = document.querySelector('.page.active');
                const currentId = currentEl ? currentEl.id : 'home';
                let i = order.indexOf(currentId);
                if (i === -1) i = 0;

                if (e.key === 'ArrowRight' && i < order.length - 1) {
                    self.go(order[i + 1]);
                } else if (e.key === 'ArrowLeft' && i > 0) {
                    self.go(order[i - 1]);
                }
            });
        },

        /**
         * Handle Initial Deep Link or Hash
         */
        handleInitialHash: function () {
            const initial = (window.location.hash || '#home').replace('#', '');
            if (document.getElementById(initial)) {
                this.go(initial);
            } else {
                this.go('home');
            }
        },

        /**
         * Sidenav Drawer handlers for Tablet & Mobile
         */
        bindSidenav: function () {
            const toggleBtn = document.getElementById('sidenavToggleBtn');
            const closeBtn = document.getElementById('sidenavCloseBtn');
            const overlay = document.getElementById('sidenavOverlay');

            if (toggleBtn) {
                toggleBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggleSidenav();
                });
            }

            if (closeBtn) {
                closeBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.closeSidenav();
                });
            }

            if (overlay) {
                overlay.addEventListener('click', () => {
                    this.closeSidenav();
                });
            }

            // Close sidenav whenever a link inside it is clicked
            document.querySelectorAll('#rhineSidenav [data-go]').forEach(btn => {
                btn.addEventListener('click', () => {
                    this.closeSidenav();
                });
            });

            // Close on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeSidenav();
                }
            });
        },

        openSidenav: function () {
            const drawer = document.getElementById('rhineSidenav');
            const overlay = document.getElementById('sidenavOverlay');
            const toggleBtn = document.getElementById('sidenavToggleBtn');

            if (drawer) {
                drawer.classList.add('active');
                drawer.setAttribute('aria-hidden', 'false');
            }
            if (overlay) {
                overlay.classList.add('active');
                overlay.setAttribute('aria-hidden', 'false');
            }
            if (toggleBtn) {
                toggleBtn.classList.add('is-active');
                toggleBtn.setAttribute('aria-expanded', 'true');
            }
            document.body.classList.add('sidenav-open');
        },

        closeSidenav: function () {
            const drawer = document.getElementById('rhineSidenav');
            const overlay = document.getElementById('sidenavOverlay');
            const toggleBtn = document.getElementById('sidenavToggleBtn');

            if (drawer) {
                drawer.classList.remove('active');
                drawer.setAttribute('aria-hidden', 'true');
            }
            if (overlay) {
                overlay.classList.remove('active');
                overlay.setAttribute('aria-hidden', 'true');
            }
            if (toggleBtn) {
                toggleBtn.classList.remove('is-active');
                toggleBtn.setAttribute('aria-expanded', 'false');
            }
            document.body.classList.remove('sidenav-open');
        },

        toggleSidenav: function () {
            const drawer = document.getElementById('rhineSidenav');
            if (drawer && drawer.classList.contains('active')) {
                this.closeSidenav();
            } else {
                this.openSidenav();
            }
        },

        translations: {
        EN: {
            nav: {
                home: 'Home',
                how: 'How It Works',
                agentfactory: 'Agent Factory',
                about: 'About Us',
                industries: 'Industries',
                ourwork: 'Our Work',
                insights: 'Insights',
                contact: 'Contact',
                getInTouch: 'Contact Us →'
            },
            home: {
                eyebrow: 'INTELLIGENT WORKFORCES FOR A REAL WORLD',
                title: 'People and AI.<br />Working for <span class="hero-gold-text">What\'s Next.</span>',
                desc: 'RHINE designs industry-specific operating platforms where human talent and governed AI agents work together as one coordinated workforce.',
                cta: 'Build Your Company &rarr;',
                ctaSecondary: 'Transform Your Company',
                tagline: '<span class="landing-tagline-bar"></span><span class="tagline-row">SAME PEOPLE.</span><span class="tagline-row">BIGGER POSSIBILITIES.</span>'
            },
            agentfactory: {
                eyebrow: 'AGENT FACTORY',
                title: 'Where Intelligent<br />Agents Are <span class="agentfactory-headline-gold">Built.</span>',
                desc: 'From defining business roles to preparing real deployment, RHINE transforms operational needs into high-quality AI agents through a governed multi-stage production process.',
                ctaPrimary: 'Talk to RHINE &rarr;',
                ctaSecondary: 'Back to Home',
                s1Title: 'DEFINE', s1_1: 'ROLES', s1_2: 'GOALS', s1_3: 'KNOWLEDGE',
                s2Title: 'BUILD', s2_1: 'TOOLS', s2_2: 'SKILLS', s2_3: 'CAPABILITIES',
                s3Title: 'CHALLENGE', s3_1: 'TEST', s3_2: 'RED TEAM', s3_3: 'STRESS',
                s4Title: 'VALIDATE', s4_1: 'QUALITY', s4_2: 'SAFETY', s4_3: 'PERFORMANCE',
                s5Title: 'PREPARE', s5_1: 'DEPLOY', s5_2: 'MONITOR', s5_3: 'SCALE'
            },
            about: {
                eyebrow: 'ABOUT RHINE',
                title: 'The Global<br />Agent Factory',
                subhead: 'HUMAN EXPERTISE. AI AGENTS. REAL BUSINESS OUTCOMES.',
                desc: 'RHINE designs and builds intelligent workforces for real businesses. We combine human expertise, AI agents, professional intelligence and governed execution to help organizations move from ideas to operating capability.',
                cta: 'Configure Your Workforce',
                f1Title: 'A BLENDED WORKFORCE',
                f1Desc: 'Human talent and AI agents, working together.',
                f2Title: 'BUILT FOR REAL WORK',
                f2Desc: 'Agents designed around real roles and real workflows.',
                f3Title: 'FROM IDEA TO IMPACT',
                f3Desc: 'Structured, governed execution you can rely on.',
                tagline: 'BUILT FOR WHAT\'S NEXT'
            },
            how: {
                eyebrow1: 'A CLEAR PROCESS.',
                eyebrow2: 'A STRONGER TOMORROW.',
                title: 'Your Business<br />Journey to<br /><span class="how-headline-gold">What\'s Next.</span>',
                desc: 'From idea to real impact &mdash; RHINE combines human expertise and AI agents in a structured process to design, build and deploy intelligent workforces for your business.',
                cta: 'Start Your Journey',
                b1Title: 'Human + AI Workforces',
                b1Desc: 'Flexible by design',
                b2Title: 'Industry Focused',
                b2Desc: 'Built for real operations',
                b3Title: 'Governed & Trusted',
                b3Desc: 'Secure. Compliant. Responsible.',
                b4Title: 'Real Business Value',
                b4Desc: 'More than technology'
            },
            industries: {
                eyebrow: 'INDUSTRIES',
                title: 'DIFFERENT<br />INDUSTRIES.<br />A SMARTER<br />WAY FORWARD.',
                desc: 'Industry-specific AI agents<br />to solve real challenges<br />and create measurable value.',
                cta: 'Explore Industries',
                tagline: 'PEOPLE + AGENTS + A SMARTER TOMORROW'
            },
            ourwork: {
                eyebrow: 'OUR WORK',
                title: 'Real Challenges.<br /><span class="ourwork-headline-gold">Practical Solutions.</span>',
                desc: 'We partner with businesses across industries<br />to turn complex challenges into measurable<br />results &mdash; creating value for people, operations<br />and communities.',
                cta: 'Explore Our Work',
                tagline: 'PEOPLE. SOLUTIONS. A BRIGHTER TOMORROW.'
            },
            insights: {
                eyebrow: 'INSIGHTS',
                title: 'Thinking Beyond<br /><span class="insights-headline-gold">Today\'s AI.</span>',
                desc: 'Research, perspectives and ideas on AI Agents,<br />Agent Mentality, human–agent collaboration<br />and the systems shaping the future of work.',
                cta: 'Explore Insights',
                tagline: 'IDEAS. PERSPECTIVES. PROGRESS.',
                c1Title: 'Articles <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>',
                c1Desc: 'In-depth analysis and expert views on AI, agents and the future of work.',
                c2Title: 'Perspectives <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>',
                c2Desc: 'Ideas, opinions and practical insights from real experience.',
                c3Title: 'Interviews <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>',
                c3Desc: 'Conversations with leaders, innovators and practitioners.',
                c4Title: 'Trends <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>',
                c4Desc: 'Key developments shaping the next generation of work.'
            },
            contact: {
                eyebrow: 'CONTACT US',
                title: 'Let\'s Build<br /><span class="contact-gold-line">What\'s Next.</span>',
                desc: 'We\'re here to discuss new ideas,<br />partnerships and opportunities.',
                tagline: 'PEOPLE. IDEAS. AGENTS. A STRONGER TOMORROW.'
            },
            modal: {
                wfEyebrow: 'RHINE INTELLIGENT OPERATING PLATFORM',
                wfTitle: 'Build Your Company &mdash; AI Workforce Architect',
                wfDesc: 'Configure industry-specific workforce platforms where human talent and governed AI agents work together as one coordinated enterprise.',
                c1Title: 'Sovereign Wealth & Banking',
                c1Desc: 'Due diligence, risk modeling & DIFC/ADGM compliance',
                c2Title: 'Energy & Infrastructure',
                c2Desc: 'Asset telemetry, SCADA safety & predictive maintenance',
                c3Title: 'Government & Smart Cities',
                c3Desc: 'Citizen concierge, licensing & digital government',
                c4Title: 'Logistics & JAFZA Freezone',
                c4Desc: 'Port clearance, cargo routing & customs tariff automation',
                sliderLabel: 'Current Enterprise Knowledge Workforce: <strong id="wfHeadcount" class="text-white">{val}</strong> professionals',
                bpTitle: 'Architecture Blueprint',
                bpCloudBadge: 'GCC SOVEREIGN CLOUD READY',
                bpAgents: 'Dedicated AI Agents',
                bpGain: 'Projected Gain',
                bpTime: 'Deployment Window',
                close: 'Close',
                generate: 'Generate Custom Blueprint &rarr;'
            }
        },
        AR: {
            nav: {
                home: 'الرئيسية',
                how: 'كيف نعمل',
                agentfactory: 'مصنع الوكلاء',
                about: 'نبذة عنا',
                industries: 'القطاعات',
                ourwork: 'أعمالنا',
                insights: 'الرؤى والأفكار',
                contact: 'اتصل بنا',
                getInTouch: 'تواصل معنا &larr;'
            },
            home: {
                eyebrow: 'قوى عاملة ذكية لعالم حقيقي',
                title: 'كوادر بشرية وذكاء اصطناعي<br />يعملان لصناعة<br /><span class="hero-gold-text">المستقبل.</span>',
                desc: 'تصمم راين منصات تشغيل متخصصة لكل قطاع حيث تعمل الكفاءات البشرية ووكلاء الذكاء الاصطناعي معاً كقوة عاملة متكاملة ومحكومة.',
                cta: 'ابدأ بناء شركتك &larr;',
                ctaSecondary: 'حوّل شركتك',
                tagline: '<span class="landing-tagline-bar"></span><span class="tagline-row">نفس الكفاءات.</span><span class="tagline-row">آفاق أوسع.</span>'
            },
            agentfactory: {
                eyebrow: 'مصنع الوكلاء',
                title: 'حيث يُبنى<br />وكلاء <span class="agentfactory-headline-gold">المستقبل.</span>',
                desc: 'من تحديد الأدوار التشغيلية إلى الجاهزية للنشر الفعلي، تحول راين متطلبات أعمالك إلى وكلاء ذكاء اصطناعي فائقين عبر مراحل إنتاج محكومة.',
                ctaPrimary: 'تحدث مع راين',
                ctaSecondary: 'العودة للرئيسية',
                s1Title: 'تحديد', s1_1: 'الأدوار', s1_2: 'الأهداف', s1_3: 'المعرفة',
                s2Title: 'بناء', s2_1: 'الأدوات', s2_2: 'المهارات', s2_3: 'القدرات',
                s3Title: 'تحدي', s3_1: 'الاختبار', s3_2: 'الفريق الأحمر', s3_3: 'الإجهاد',
                s4Title: 'تحقق', s4_1: 'الجودة', s4_2: 'الأمان', s4_3: 'الأداء',
                s5Title: 'جاهزية', s5_1: 'النشر', s5_2: 'المراقبة', s5_3: 'التوسع'
            },
            about: {
                eyebrow: 'عن راين',
                title: 'مصنع الوكلاء<br />الذكي العالمي',
                subhead: 'خبرات بشرية. وكلاء ذكاء اصطناعي. نتائج أعمال حقيقية.',
                desc: 'تصمم راين وتبني قوى عاملة ذكية لمؤسسات الأعمال الواقعية. نجمع بين الخبرة البشرية ووكلاء الذكاء الاصطناعي والمعرفة المهنية والتنفيذ الخاضع للحوكمة لمساعدة المؤسسات على الانتقال من الأفكار إلى القدرة التشغيلية المباشرة.',
                cta: 'صمم قوة عملك الذكية',
                f1Title: 'قوى عاملة متكاملة',
                f1Desc: 'كفاءات بشرية ووكلاء ذكاء اصطناعي، يعملون معاً بتناغم.',
                f2Title: 'مصممة لمهام حقيقية',
                f2Desc: 'وكلاء تم تطويرهم وفق أدوار تشغيلية ومسارات عمل فعلية.',
                f3Title: 'من الفكرة إلى الأثر',
                f3Desc: 'تنفيذ منظم ومحكوم يمكنك الاعتماد عليه دائماً.',
                tagline: 'صُمم لما هو قادم'
            },
            how: {
                eyebrow1: 'منهجية واضحة.',
                eyebrow2: 'نحو غدٍ أكثر قوة.',
                title: 'رحلة أعمالك<br />نحو آفاق<br /><span class="how-headline-gold">المستقبل.</span>',
                desc: 'من الفكرة إلى الأثر الواقعي &mdash; تجمع راين بين الخبرات البشرية والذكاء الاصطناعي وفق مسار منظم لتصميم وبناء وتشغيل قوى عاملة ذكية لأعمالك.',
                cta: 'ابدأ رحلتك الآن',
                b1Title: 'قوى بشرية وذكية',
                b1Desc: 'مرونة تشغيلية فائقة',
                b2Title: 'تركيز قطاعي متخصص',
                b2Desc: 'مصمم للعمليات الواقعية',
                b3Title: 'حوكمة وموثوقية',
                b3Desc: 'أمان. امتثال. مسؤولية.',
                b4Title: 'قيمة أعمال حقيقية',
                b4Desc: 'أبعد من مجرد تقنية'
            },
            industries: {
                eyebrow: 'القطاعات',
                title: 'قطاعات متنوعة.<br />مسار أذكى<br />نحو المستقبل.',
                desc: 'وكلاء ذكاء اصطناعي مخصصون<br />لمواجهة التحديات<br />وتحقيق قيمة قابلة للقياس.',
                cta: 'استكشف القطاعات',
                tagline: 'كفاءات + وكلاء ذكاء + غدٍ أكثر تطوراً'
            },
            ourwork: {
                eyebrow: 'أعمالنا',
                title: 'تحديات حقيقية.<br /><span class="ourwork-headline-gold">حلول عملية.</span>',
                desc: 'نتعاون مع كبرى الشركات عبر مختلف القطاعات<br />لتحويل التحديات المعقدة إلى نتائج ملموسة &mdash;<br />لخلق قيمة مستدامة للأفراد والعمليات والمجتمعات.',
                cta: 'استعرض أعمالنا',
                tagline: 'الإنسان. الحلول. مستقبل أكثر إشراقاً.'
            },
            insights: {
                eyebrow: 'الرؤى والأفكار',
                title: 'رؤى تتجاوز<br /><span class="insights-headline-gold">حاضر الذكاء الاصطناعي.</span>',
                desc: 'أبحاث ووجهات نظر متقدمة حول وكلاء الذكاء الاصطناعي،<br />وتكامل الإنسان مع الآلة والأنظمة التي تعيد رسم مستقبل العمل.',
                cta: 'استكشف الرؤى',
                tagline: 'أفكار. رؤى. تقدم مستمر.',
                c1Title: 'المقالات <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>',
                c1Desc: 'تحليلات معمقة وآراء خبراء حول الذكاء الاصطناعي والوكلاء ومستقبل العمل.',
                c2Title: 'وجهات نظر <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>',
                c2Desc: 'أفكار ورؤى عملية مستمدة من التجارب والخبرات الفعلية.',
                c3Title: 'حوارات <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>',
                c3Desc: 'لقاءات حصرية مع قادة الابتكار ورواد الصناعة.',
                c4Title: 'الاتجاهات <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>',
                c4Desc: 'أبرز التحولات التي تعيد رسم ملامح الجيل القادم من بيئات العمل.'
            },
            contact: {
                eyebrow: 'اتصل بنا',
                title: 'معاً نصنع<br /><span class="contact-gold-line">آفاق المستقبل.</span>',
                desc: 'نحن هنا لمناقشة الأفكار الجديدة،<br />والشراكات والفرص الواعدة.',
                tagline: 'كفاءات. أفكار. وكلاء. غدٍ أكثر قوة.'
            },
            modal: {
                wfEyebrow: 'منصة راين التشغيلية الذكية',
                wfTitle: 'ابدأ بناء شركتك &mdash; مهندس القوى العاملة الذكية',
                wfDesc: 'صمم منصات قوى عاملة متخصصة لكل قطاع، حيث تعمل الكفاءات البشرية ووكلاء الذكاء الاصطناعي معاً كمنظومة مؤسسية موحدة.',
                c1Title: 'الصناديق السيادية والمصارف',
                c1Desc: 'التدقيق، نمذجة المخاطر والامتثال لـ DIFC/ADGM',
                c2Title: 'الطاقة والبنية التحتية',
                c2Desc: 'القياس عن بُعد، سلامة SCADA والصيانة التنبؤية',
                c3Title: 'الجهات الحكومية والمدن الذكية',
                c3Desc: 'خدمات المتعاملين، التراخيص والحكومة الرقمية',
                c4Title: 'اللوجستيات ومنطقة جافزا',
                c4Desc: 'التخليص الجمركي، توجيه الشحنات وأتمتة التعرفة',
                sliderLabel: 'حجم الكوادر المعرفية الحالية في المؤسسة: <strong id="wfHeadcount" class="text-white">{val}</strong> موظف متخصص',
                bpTitle: 'المخطط الهيكلي المقترح',
                bpCloudBadge: 'مهيأ للسحابة السيادية الخليجية',
                bpAgents: 'وكلاء ذكاء اصطناعي مخصصون',
                bpGain: 'العائد الإنتاجي المتوقع',
                bpTime: 'الإطار الزمني للتشغيل',
                close: 'إغلاق',
                generate: 'إصدار المخطط المخصص &larr;'
            }
        }
        },

        /**
         * Language switcher with full text translation for EN & AR
         */
        switchLang: function (lang) {
            if (!lang) lang = 'EN';
            const isAr = lang === 'AR';
            const dict = isAr ? this.translations.AR : this.translations.EN;

            // 1. Update Language Selector dropdown and Sidenav buttons
            document.querySelectorAll('.lang-txt').forEach(el => el.innerText = lang);
            document.querySelectorAll('.sidenav-lang-btnVALIDATE').forEach(btn => {
                const text = btn.innerText;
                const match = isAr ? text.includes('العربية') : text.includes('English');
                btn.classList.toggle('active', match);
            });
            document.querySelectorAll('.lang-menu-dropdown .dropdown-item').forEach(item => {
                const text = item.innerText;
                const match = isAr ? text.includes('العربية') : text.includes('English');
                item.classList.toggle('active', match);
            });

            // 2. Set Document Language and Direction
            document.documentElement.setAttribute('lang', isAr ? 'ar' : 'en');
            document.documentElement.setAttribute('dir', isAr ? 'rtl' : 'ltr');
            try { localStorage.setItem('rhine_lang', lang); } catch (e) { }

            // Sync AI Agent language
            if (window.rhineAvatar && typeof window.rhineAvatar.setLanguage === 'function') {
                window.rhineAvatar.setLanguage(isAr ? 'ar' : 'en');
            }

            // 3. Navigation Links (Header & Sidenav)
            const navKeys = ['home', 'how', 'agentfactory', 'about', 'industries', 'ourwork', 'insights', 'contact'];
            navKeys.forEach(k => {
                document.querySelectorAll(`.center-nav [data-go="${k}"]`).forEach(el => el.innerText = dict.nav[k]);
                document.querySelectorAll(`#rhineSidenav [data-go="${k}"] .sidenav-link-text`).forEach(el => el.innerText = dict.nav[k]);
            });

            document.querySelectorAll('.header-right-actions .btn-gold-action').forEach(el => el.innerText = dict.nav.contact);
            document.querySelectorAll('.sidenav-footer .btn-gold-action span').forEach(el => el.innerHTML = dict.nav.getInTouch);
            document.querySelectorAll('.sidenav-lang-label').forEach(el => el.innerText = isAr ? 'اللغة:' : 'Language:');
            const reviewTag = document.querySelector('#reviewTag span:last-child');
            if (reviewTag) reviewTag.innerText = isAr ? 'راين — مراجعة المنصة' : 'RHINE — Website Review';

            // Helpers
            const setHtml = (sel, html) => { document.querySelectorAll(sel).forEach(el => el.innerHTML = html); };
            const setText = (sel, txt) => { document.querySelectorAll(sel).forEach(el => el.innerText = txt); };

            // 4. Home Section
            setText('#home .landing-eyebrow', dict.home.eyebrow);
            setHtml('#home .landing-main-title', dict.home.title);
            setText('#home .landing-desc-text', dict.home.desc);
            setHtml('#home .btn-gold-hero span', dict.home.cta);
            setText('#home .btn-secondary-hero span', dict.home.ctaSecondary);
            setHtml('#home .landing-bottom-tagline', dict.home.tagline);

            // 4b. Agent Factory Section
            if (dict.agentfactory) {
                setText('#agentfactory .agentfactory-eyebrow-text', dict.agentfactory.eyebrow);
                setHtml('#agentfactory .agentfactory-headline', dict.agentfactory.title);
                setText('#agentfactory .agentfactory-desc', dict.agentfactory.desc);
                setText('#agentfactory .agentfactory-btn-primary span', dict.agentfactory.ctaPrimary);
                setText('#agentfactory .agentfactory-btn-secondary span', dict.agentfactory.ctaSecondary);

                // Translate all 5 pipeline cards by index to avoid :nth-of-type sibling issues
                const stageCards = document.querySelectorAll('#agentfactory .af-stage-card');
                if (stageCards.length >= 5) {
                    const stages = [
                        { title: dict.agentfactory.s1Title, items: [dict.agentfactory.s1_1, dict.agentfactory.s1_2, dict.agentfactory.s1_3] },
                        { title: dict.agentfactory.s2Title, items: [dict.agentfactory.s2_1, dict.agentfactory.s2_2, dict.agentfactory.s2_3] },
                        { title: dict.agentfactory.s3Title, items: [dict.agentfactory.s3_1, dict.agentfactory.s3_2, dict.agentfactory.s3_3] },
                        { title: dict.agentfactory.s4Title, items: [dict.agentfactory.s4_1, dict.agentfactory.s4_2, dict.agentfactory.s4_3] },
                        { title: dict.agentfactory.s5Title, items: [dict.agentfactory.s5_1, dict.agentfactory.s5_2, dict.agentfactory.s5_3] }
                    ];
                    stages.forEach((st, idx) => {
                        const card = stageCards[idx];
                        if (card) {
                            const titleEl = card.querySelector('.af-card-title');
                            if (titleEl) titleEl.innerText = st.title;
                            const lis = card.querySelectorAll('.af-card-list li');
                            st.items.forEach((itemText, lIdx) => {
                                if (lis[lIdx]) lis[lIdx].innerText = itemText;
                            });
                        }
                    });
                }
            }

            // 5. About Section
            setText('#about .about-eyebrow-text', dict.about.eyebrow);
            setHtml('#about .about-headline', dict.about.title);
            setText('#about .about-subheadline', dict.about.subhead);
            setText('#about .about-desc', dict.about.desc);
            setText('#about .about-cta-btn span', dict.about.cta);
            setText('#about .about-feature-item:nth-child(1) h4', dict.about.f1Title);
            setText('#about .about-feature-item:nth-child(1) p', dict.about.f1Desc);
            setText('#about .about-feature-item:nth-child(2) h4', dict.about.f2Title);
            setText('#about .about-feature-item:nth-child(2) p', dict.about.f2Desc);
            setText('#about .about-feature-item:nth-child(3) h4', dict.about.f3Title);
            setText('#about .about-feature-item:nth-child(3) p', dict.about.f3Desc);
            setText('#about .about-tagline-text', dict.about.tagline);

            // 6. How It Works Section
            setText('#how .how-eyebrow span:first-child', dict.how.eyebrow1);
            setText('#how .how-eyebrow span:last-child', dict.how.eyebrow2);
            setHtml('#how .how-headline', dict.how.title);
            setHtml('#how .how-desc', dict.how.desc);
            setText('#how .how-cta-btn span', dict.how.cta);
            setText('#how .how-badge-item:nth-child(1) strong', dict.how.b1Title);
            setText('#how .how-badge-item:nth-child(1) span', dict.how.b1Desc);
            setText('#how .how-badge-item:nth-child(2) strong', dict.how.b2Title);
            setText('#how .how-badge-item:nth-child(2) span', dict.how.b2Desc);
            setText('#how .how-badge-item:nth-child(3) strong', dict.how.b3Title);
            setText('#how .how-badge-item:nth-child(3) span', dict.how.b3Desc);
            setText('#how .how-badge-item:nth-child(4) strong', dict.how.b4Title);
            setText('#how .how-badge-item:nth-child(4) span', dict.how.b4Desc);

            // 7. Industries Section
            setText('#industries .industries-eyebrow span', dict.industries.eyebrow);
            setHtml('#industries .industries-headline', dict.industries.title);
            setHtml('#industries .industries-desc', dict.industries.desc);
            setText('#industries .industries-cta-btn span', dict.industries.cta);
            setText('#industries .industries-tagline-text', dict.industries.tagline);

            // 8. Our Work Section
            setText('#ourwork .ourwork-eyebrow-text', dict.ourwork.eyebrow);
            setHtml('#ourwork .ourwork-headline', dict.ourwork.title);
            setHtml('#ourwork .ourwork-desc', dict.ourwork.desc);
            setText('#ourwork .ourwork-cta-btn span', dict.ourwork.cta);
            setText('#ourwork .ourwork-tagline-text', dict.ourwork.tagline);

            // 9. Insights Section
            setText('#insights .insights-eyebrow-text', dict.insights.eyebrow);
            setHtml('#insights .insights-headline', dict.insights.title);
            setHtml('#insights .insights-desc', dict.insights.desc);
            setText('#insights .insights-cta-btn span', dict.insights.cta);
            setText('#insights .insights-tagline-text', dict.insights.tagline);
            setHtml('#insights .insights-card:nth-child(1) .insights-card-title', dict.insights.c1Title);
            setText('#insights .insights-card:nth-child(1) .insights-card-desc', dict.insights.c1Desc);
            setHtml('#insights .insights-card:nth-child(2) .insights-card-title', dict.insights.c2Title);
            setText('#insights .insights-card:nth-child(2) .insights-card-desc', dict.insights.c2Desc);
            setHtml('#insights .insights-card:nth-child(3) .insights-card-title', dict.insights.c3Title);
            setText('#insights .insights-card:nth-child(3) .insights-card-desc', dict.insights.c3Desc);
            setHtml('#insights .insights-card:nth-child(4) .insights-card-title', dict.insights.c4Title);
            setText('#insights .insights-card:nth-child(4) .insights-card-desc', dict.insights.c4Desc);

            // 10. Contact Section
            setText('#contact .contact-eyebrow-label', dict.contact.eyebrow);
            setHtml('#contact .contact-main-headline', dict.contact.title);
            setHtml('#contact .contact-subline', dict.contact.desc);
            setText('#contact .contact-tagline-words', dict.contact.tagline);

            // 11. Workforce Modal
            setText('#workforceModal .dialog-eyebrow', dict.modal.wfEyebrow);
            setHtml('#workforceModal .dialog-title', dict.modal.wfTitle);
            setText('#workforceModal .modal-body > p', dict.modal.wfDesc);
            setText('#workforceModal .col-md-6:nth-child(1) .choice-box strong', dict.modal.c1Title);
            setText('#workforceModal .col-md-6:nth-child(1) .choice-box span', dict.modal.c1Desc);
            setText('#workforceModal .col-md-6:nth-child(2) .choice-box strong', dict.modal.c2Title);
            setText('#workforceModal .col-md-6:nth-child(2) .choice-box span', dict.modal.c2Desc);
            setText('#workforceModal .col-md-6:nth-child(3) .choice-box strong', dict.modal.c3Title);
            setText('#workforceModal .col-md-6:nth-child(3) .choice-box span', dict.modal.c3Desc);
            setText('#workforceModal .col-md-6:nth-child(4) .choice-box strong', dict.modal.c4Title);
            setText('#workforceModal .col-md-6:nth-child(4) .choice-box span', dict.modal.c4Desc);
            const val = document.getElementById('wfSlider')?.value || '350';
            setHtml('#workforceModal .form-label', dict.modal.sliderLabel.replace('{val}', val));
            setText('#workforceModal #bpTitle', dict.modal.bpTitle);
            setText('#workforceModal .badge.bg-warning', dict.modal.bpCloudBadge);
            setText('#workforceModal .col-4:nth-child(1) .small', dict.modal.bpAgents);
            setText('#workforceModal .col-4:nth-child(2) .small', dict.modal.bpGain);
            setText('#workforceModal .col-4:nth-child(3) .small', dict.modal.bpTime);
            setText('#workforceModal .btn-outline-secondary', dict.modal.close);
            setHtml('#workforceModal .btn-gold-action', dict.modal.generate);

            // 12. Quick Contact Modal
            setText('#inquiryModal .dialog-title', dict.contact.title.replace('<br />', ' '));
            setText('#btnQuickSubmit span', isAr ? 'إرسال الموجز السري &larr;' : 'Submit Confidential Brief &rarr;');
        },

        /**
         * Open Workforce Wizard (now navigates to Agent Factory)
         */
        openWorkforceWizard: function () {
            this.go('agentfactory');
        },

        /**
         * Open Inquiry Modal (now navigates to Contact)
         */
        openInquiryModal: function () {
            this.go('contact');
        },

        /**
         * Generate Blueprint AJAX
         */
        generateBlueprint: function () {
            const industry = document.querySelector('input[name="bIndustry"]:checked')?.value || 'Banking & Sovereign Wealth';
            const headcount = parseInt(document.getElementById('wfSlider')?.value || '350', 10);

            fetch('/Home/GenerateWorkforcePlan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify({
                    Industry: industry,
                    CurrentHeadcount: headcount
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success && data.plan) {
                    const plan = data.plan;
                    const out = document.getElementById('blueprintOutput');
                    document.getElementById('bpTitle').innerText = plan.recommendedSwarmArchitecture;
                    document.getElementById('bpAgents').innerText = plan.estimatedAIAgents;
                    document.getElementById('bpGain').innerText = plan.projectedProductivityGain;
                    document.getElementById('bpTime').innerText = plan.estimatedTimeline;
                    out.classList.remove('d-none');
                }
            })
            .catch(err => console.error(err));
        },

        /**
         * Submit Quick Contact via AJAX without reloading page
         */
        submitQuickContact: function (event) {
            event.preventDefault();
            const alertBox = document.getElementById('quickFormAlert');
            const submitBtn = document.getElementById('btnQuickSubmit');
            const token = document.querySelector('input[name="__RequestVerificationToken"]')?.value || '';

            const payload = {
                FullName: document.getElementById('qName').value.trim(),
                Email: document.getElementById('qEmail').value.trim(),
                Company: document.getElementById('qCompany').value.trim(),
                Industry: 'Middle East Advisory',
                Message: document.getElementById('qMessage').value.trim()
            };

            submitBtn.disabled = true;
            submitBtn.innerText = 'Transmitting...';
            alertBox.className = 'alert d-none';

            fetch('/Home/SubmitContact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'RequestVerificationToken': token,
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify(payload)
            })
            .then(res => res.json())
            .then(data => {
                submitBtn.disabled = false;
                submitBtn.innerText = 'Submit Confidential Brief →';
                if (data.success) {
                    alertBox.className = 'alert alert-success d-block py-2 px-3 small';
                    alertBox.innerHTML = `<strong>Inquiry Received!</strong><br/>${data.message}<br/><span class="small opacity-75">Ref: ${data.referenceId}</span>`;
                    document.getElementById('quickContactForm').reset();
                } else {
                    alertBox.className = 'alert alert-danger d-block py-2 px-3 small';
                    alertBox.innerText = data.message || 'Submission error. Please check form fields.';
                }
            })
            .catch(err => {
                submitBtn.disabled = false;
                submitBtn.innerText = 'Submit Confidential Brief →';
                alertBox.className = 'alert alert-danger d-block py-2 px-3 small';
                alertBox.innerText = 'Transmission error. Please email info@rhineme.com directly.';
            });
        }
    };

    window.rhineApp = RhineApp;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => RhineApp.init());
    } else {
        RhineApp.init();
    }
})();
