/**
 * Domain layer: locale detection, pricing, and translations.
 * Independent from presentation — any UI can consume these APIs.
 */
(function (global) {
  "use strict";

  var STORAGE_KEY = "gt_lang";
  var SUPPORTED = ["en", "es"];

  var SPANISH_COUNTRIES = {
    ES: 1, MX: 1, AR: 1, CO: 1, CL: 1, PE: 1, VE: 1, EC: 1, GT: 1,
    CU: 1, BO: 1, DO: 1, HN: 1, PY: 1, SV: 1, NI: 1, CR: 1, PA: 1,
    UY: 1, PR: 1, GQ: 1, AND: 1
  };

  var SPANISH_TIMEZONES = {
    "Europe/Madrid": 1,
    "Europe/Andorra": 1,
    "Atlantic/Canary": 1,
    "Africa/Ceuta": 1,
    "America/Mexico_City": 1,
    "America/Cancun": 1,
    "America/Merida": 1,
    "America/Monterrey": 1,
    "America/Tijuana": 1,
    "America/Hermosillo": 1,
    "America/Chihuahua": 1,
    "America/Mazatlan": 1,
    "America/Bahia_Banderas": 1,
    "America/Bogota": 1,
    "America/Argentina/Buenos_Aires": 1,
    "America/Argentina/Cordoba": 1,
    "America/Argentina/Mendoza": 1,
    "America/Argentina/Salta": 1,
    "America/Santiago": 1,
    "America/Punta_Arenas": 1,
    "Pacific/Easter": 1,
    "America/Lima": 1,
    "America/Guayaquil": 1,
    "America/Caracas": 1,
    "America/La_Paz": 1,
    "America/Asuncion": 1,
    "America/Montevideo": 1,
    "America/Havana": 1,
    "America/Santo_Domingo": 1,
    "America/Puerto_Rico": 1,
    "America/Panama": 1,
    "America/Costa_Rica": 1,
    "America/El_Salvador": 1,
    "America/Guatemala": 1,
    "America/Tegucigalpa": 1,
    "America/Managua": 1
  };

  var PRICING = {
    en: {
      currency: "USD",
      symbol: "$",
      amount: "59",
      period: "/ month",
      stat: "$59/mo",
      planLine: "One simple plan — $59/month with unlimited clients",
      faqCost: "Growth Trainer is free to download on iOS and Android. Growth Premium costs $59 per month and includes unlimited clients, exclusive programs, advanced analytics, personalized trainer tools, and an ad-free experience."
    },
    es: {
      currency: "EUR",
      symbol: "€",
      amount: "49",
      period: "/ mes",
      stat: "49 €/mes",
      planLine: "Un único plan — 49 euros al mes con clientes ilimitados",
      faqCost: "Growth Trainer es gratis para descargar en iOS y Android. Growth Premium cuesta 49 euros al mes e incluye clientes ilimitados, programas exclusivos, analíticas avanzadas, herramientas para entrenadores y una experiencia sin anuncios."
    }
  };

  var TRANSLATIONS = {
    en: {
      "meta.title": "Growth Trainer — The App for Personal Trainers",
      "meta.description": "Growth Trainer is the all-in-one app for personal trainers. Set custom training and nutrition plans for your clients, manage them in one place, track progress with 500+ exercises, and grow your personal training business.",
      "meta.ogDescription": "Set custom training and nutrition plans for your clients, manage them, and track progress — all in one app built for personal trainers.",
      "meta.keywords": "personal trainer app, personal training software, workout plan builder for trainers, nutrition plan builder, client management for personal trainers",

      "nav.features": "Features",
      "nav.pricing": "Pricing",
      "nav.contact": "Contact",
      "nav.how": "How it works",
      "nav.faq": "FAQ",
      "nav.email": "Email us",
      "nav.menu": "Toggle navigation",
      "nav.home": "Growth Trainer home",
      "nav.lang": "Language",

      "hero.badge": "Built for personal trainers",
      "hero.title": "The app for<br><span class=\"gradient\">personal trainers.</span>",
      "hero.sub": "Set training and nutrition plans for your clients, manage every program, and track every rep — built for personal trainers, not for people training themselves.",
      "hero.emailCta": "Email us",
      "hero.emailNote": "Tell us about your personal training business and we'll help you get set up. We reply within 24 hours.",
      "hero.orDownload": "Or download the app",
      "hero.statExercises": "Exercises",
      "hero.statPlatforms": "Platforms",
      "hero.statClients": "Unlimited clients",
      "hero.statsLabel": "App highlights",
      "hero.appStore": "Download Growth Trainer on the App Store",
      "hero.playStore": "Download Growth Trainer on Google Play",

      "features.label": "Features",
      "features.title": "Everything a personal trainer needs",
      "features.desc": "From training and nutrition plans to progress analytics — Growth Trainer gives personal trainers the tools to run complete programs for every client.",
      "features.f1.title": "500+ exercise library",
      "features.f1.desc": "Every exercise includes GIF animations and detailed video demos. We obsess over biomechanics so your clients move safely and effectively.",
      "features.f2.title": "Muscle group targeting",
      "features.f2.desc": "Build programs by selecting specific muscle groups. Create split routines, full-body sessions, or targeted rehab plans in minutes.",
      "features.f3.title": "Training & nutrition plans",
      "features.f3.desc": "Assign personalized workout and nutrition plans to each client. Manage their training and diet guidance from one place — no extra tools needed.",
      "features.f4.title": "Progress tracking",
      "features.f4.desc": "Calendar views, progress graphs, personal records, sleep tracking, and muscle usage analytics — see exactly how your clients are improving.",

      "showcase.label": "Why Growth Trainer",
      "showcase.title": "Your personal training business, supercharged",
      "showcase.desc": "Stop juggling spreadsheets and messaging apps. Growth Trainer centralizes training, nutrition, client management, and progress tracking for personal trainers in one app.",
      "showcase.li1": "Set personalized training and nutrition plans for every client",
      "showcase.li2": "Create unlimited custom workout plans",
      "showcase.li3": "Progressive overload tracking with automatic record detection",
      "showcase.li4": "Detailed exercise videos focused on proper form and biomechanics",

      "pricing.label": "Pricing",
      "pricing.title": "One plan. Unlimited clients.",
      "pricing.desc": "Everything you need to run your personal training business — no tiers, no limits on clients.",
      "pricing.badge": "Growth Premium",
      "pricing.tagline": "Unlimited clients included",
      "pricing.f1": "Training & nutrition plans for every client",
      "pricing.f2": "500+ exercises with video demos",
      "pricing.f3": "Custom workout programs for every client",
      "pricing.f4": "Progress tracking & advanced analytics",
      "pricing.f5": "Exclusive programs & trainer tools",
      "pricing.f6": "Ad-free experience",
      "pricing.email": "Email us to get started",
      "pricing.download": "Download the app",
      "pricing.note": "Questions about pricing or onboarding? Write us at",

      "how.label": "How it works",
      "how.title": "Up and running in 3 steps",
      "how.desc": "Get started in minutes — no complicated setup required.",
      "how.s1.title": "Download & sign up",
      "how.s1.desc": "Get Growth Trainer free on iOS or Android. Create your trainer account in seconds.",
      "how.s2.title": "Set training & nutrition",
      "how.s2.desc": "Assign personalized workout and nutrition plans to each client. Pick from 500+ exercises and tailor diet guidance to their goals.",
      "how.s3.title": "Track & grow",
      "how.s3.desc": "Monitor client progress with analytics, celebrate PRs, and scale your personal training business with confidence.",

      "faq.label": "FAQ",
      "faq.title": "Frequently asked questions",
      "faq.desc": "Everything you need to know about Growth Trainer.",
      "faq.q1": "What is Growth Trainer?",
      "faq.a1": "Growth Trainer is a mobile app designed specifically for personal trainers. It lets you set custom training and nutrition plans for your clients, manage them, and track their fitness progress — all from your phone.",
      "faq.q2": "Who is Growth Trainer for?",
      "faq.a2": "Growth Trainer is built for personal trainers. If you train clients 1:1 or in small groups, you can assign programs, manage nutrition, and track progress from one app. It is not a consumer workout tracker.",
      "faq.q3": "How many exercises does Growth Trainer include?",
      "faq.a3": "Growth Trainer includes a library of over 500 exercises, each with GIF animations and detailed video demonstrations focused on proper biomechanics.",
      "faq.q4": "Can I set nutrition and training plans for my clients?",
      "faq.a4": "Yes. Growth Trainer lets you assign personalized training and nutrition plans to each client, so you can manage their workouts and diet guidance from a single app.",
      "faq.q5": "How much does Growth Trainer cost?",
      "faq.q6": "What platforms is Growth Trainer available on?",
      "faq.a6": "Growth Trainer is available on both iOS (App Store) and Android (Google Play). Download links are available at the top and bottom of this page.",

      "contact.label": "Contact",
      "contact.title": "Let's talk about your personal training business",
      "contact.desc": "Have questions about Growth Trainer or Growth Premium? Send us an email and we'll get back to you shortly.",

      "cta.title": "Ready to grow as a personal trainer?",
      "cta.desc": "Join personal trainers who use Growth Trainer to deliver better programs and track real client results.",
      "cta.email": "Email us",

      "footer.desc": "The all-in-one app for personal trainers. Set training and nutrition plans, manage clients, and track progress.",
      "footer.legal": "Legal",
      "footer.terms": "Terms & Conditions",
      "footer.privacy": "Privacy Policy",
      "footer.contact": "Contact us",
      "footer.connect": "Connect",
      "footer.rights": "© 2026 Growth Trainer. All rights reserved.",
      "footer.tagline": "Made for personal trainers who care about results.",

      "schema.orgDesc": "Growth Trainer is the all-in-one mobile app for personal trainers to set training and nutrition plans, manage clients, and track fitness progress.",
      "schema.appDesc": "The all-in-one app for personal trainers. Set custom training and nutrition plans, create workout programs with 500+ exercises, manage clients, and track progress with advanced analytics.",
      "schema.offerDesc": "Growth Premium — unlimited clients, all features included"
    },

    es: {
      "meta.title": "Growth Trainer — La app para entrenadores personales",
      "meta.description": "Growth Trainer es la app todo-en-uno para entrenadores personales. Asigna planes de entrenamiento y nutrición a tus clientes, gestiona su progreso con más de 500 ejercicios y haz crecer tu negocio de entrenamiento personal.",
      "meta.ogDescription": "Asigna planes de entrenamiento y nutrición a tus clientes, gestiona su progreso y haz seguimiento — todo en una app hecha para entrenadores personales.",
      "meta.keywords": "app entrenador personal, software de entrenamiento personal, creador de planes de entrenamiento, planes de nutrición, gestión de clientes para entrenadores personales",

      "nav.features": "Funciones",
      "nav.pricing": "Precios",
      "nav.contact": "Contacto",
      "nav.how": "Cómo funciona",
      "nav.faq": "FAQ",
      "nav.email": "Escríbenos",
      "nav.menu": "Abrir menú",
      "nav.home": "Inicio Growth Trainer",
      "nav.lang": "Idioma",

      "hero.badge": "Hecha para entrenadores personales",
      "hero.title": "La app para<br><span class=\"gradient\">entrenadores personales.</span>",
      "hero.sub": "Asigna planes de entrenamiento y nutrición a tus clientes, gestiona cada programa y sigue cada repetición — hecha para entrenadores personales, no para quien entrena por su cuenta.",
      "hero.emailCta": "Escríbenos",
      "hero.emailNote": "Cuéntanos sobre tu negocio de entrenamiento personal y te ayudamos a empezar. Respondemos en menos de 24 horas.",
      "hero.orDownload": "O descarga la app",
      "hero.statExercises": "Ejercicios",
      "hero.statPlatforms": "Plataformas",
      "hero.statClients": "Clientes ilimitados",
      "hero.statsLabel": "Destacados de la app",
      "hero.appStore": "Descargar Growth Trainer en App Store",
      "hero.playStore": "Descargar Growth Trainer en Google Play",

      "features.label": "Funciones",
      "features.title": "Todo lo que un entrenador personal necesita",
      "features.desc": "Desde planes de entrenamiento y nutrición hasta analíticas de progreso — Growth Trainer da a los entrenadores personales las herramientas para dirigir programas completos con cada cliente.",
      "features.f1.title": "Biblioteca de +500 ejercicios",
      "features.f1.desc": "Cada ejercicio incluye animaciones GIF y demos en vídeo. Nos obsesionamos con la biomecánica para que tus clientes se muevan con seguridad y eficacia.",
      "features.f2.title": "Selección por grupo muscular",
      "features.f2.desc": "Crea programas eligiendo grupos musculares concretos. Rutinas split, full-body o planes de rehabilitación en minutos.",
      "features.f3.title": "Planes de entrenamiento y nutrición",
      "features.f3.desc": "Asigna planes personalizados de entrenamiento y nutrición a cada cliente. Gestiona su dieta y workouts desde un solo sitio.",
      "features.f4.title": "Seguimiento del progreso",
      "features.f4.desc": "Calendario, gráficos de progreso, marcas personales, sueño y analítica muscular — ve exactamente cómo mejoran tus clientes.",

      "showcase.label": "Por qué Growth Trainer",
      "showcase.title": "Tu negocio de entrenamiento personal, potenciado",
      "showcase.desc": "Deja de combinar hojas de cálculo y apps de mensajería. Growth Trainer centraliza entrenamiento, nutrición, gestión de clientes y seguimiento para entrenadores personales en una sola app.",
      "showcase.li1": "Planes personalizados de entrenamiento y nutrición para cada cliente",
      "showcase.li2": "Crea planes de entrenamiento ilimitados",
      "showcase.li3": "Seguimiento de sobrecarga progresiva con detección automática de récords",
      "showcase.li4": "Vídeos de ejercicios centrados en la técnica y la biomecánica",

      "pricing.label": "Precios",
      "pricing.title": "Un solo plan. Clientes ilimitados.",
      "pricing.desc": "Todo lo que necesitas para tu negocio de entrenamiento personal — sin niveles ni límites de clientes.",
      "pricing.badge": "Growth Premium",
      "pricing.tagline": "Clientes ilimitados incluidos",
      "pricing.f1": "Planes de entrenamiento y nutrición para cada cliente",
      "pricing.f2": "+500 ejercicios con demos en vídeo",
      "pricing.f3": "Programas de entrenamiento personalizados",
      "pricing.f4": "Seguimiento y analíticas avanzadas",
      "pricing.f5": "Programas exclusivos y herramientas para entrenadores",
      "pricing.f6": "Sin anuncios",
      "pricing.email": "Escríbenos para empezar",
      "pricing.download": "Descargar la app",
      "pricing.note": "¿Dudas sobre precios o onboarding? Escríbenos a",

      "how.label": "Cómo funciona",
      "how.title": "Listo en 3 pasos",
      "how.desc": "Empieza en minutos — sin configuraciones complicadas.",
      "how.s1.title": "Descarga y regístrate",
      "how.s1.desc": "Consigue Growth Trainer gratis en iOS o Android. Crea tu cuenta de entrenador en segundos.",
      "how.s2.title": "Asigna entrenamiento y nutrición",
      "how.s2.desc": "Asigna planes personalizados a cada cliente. Elige entre +500 ejercicios y adapta la nutrición a sus objetivos.",
      "how.s3.title": "Sigue y crece",
      "how.s3.desc": "Monitoriza el progreso con analíticas, celebra PRs y escala tu negocio de entrenamiento personal con confianza.",

      "faq.label": "FAQ",
      "faq.title": "Preguntas frecuentes",
      "faq.desc": "Todo lo que necesitas saber sobre Growth Trainer.",
      "faq.q1": "¿Qué es Growth Trainer?",
      "faq.a1": "Growth Trainer es una app móvil diseñada específicamente para entrenadores personales. Te permite asignar planes de entrenamiento y nutrición a tus clientes, gestionarlos y seguir su progreso — todo desde el móvil.",
      "faq.q2": "¿Para quién es Growth Trainer?",
      "faq.a2": "Growth Trainer está hecha para entrenadores personales. Si entrenas clientes 1:1 o en grupos pequeños, puedes asignar programas, gestionar la nutrición y seguir el progreso desde una sola app. No es un tracker de entrenamiento para el usuario final.",
      "faq.q3": "¿Cuántos ejercicios incluye Growth Trainer?",
      "faq.a3": "Growth Trainer incluye una biblioteca de más de 500 ejercicios, cada uno con animaciones GIF y demos en vídeo centradas en la biomecánica correcta.",
      "faq.q4": "¿Puedo asignar planes de nutrición y entrenamiento?",
      "faq.a4": "Sí. Growth Trainer te permite asignar planes personalizados de entrenamiento y nutrición a cada cliente, para gestionar workouts y dieta desde una sola app.",
      "faq.q5": "¿Cuánto cuesta Growth Trainer?",
      "faq.q6": "¿En qué plataformas está disponible?",
      "faq.a6": "Growth Trainer está disponible en iOS (App Store) y Android (Google Play). Los enlaces de descarga están arriba y abajo en esta página.",

      "contact.label": "Contacto",
      "contact.title": "Hablemos de tu negocio de entrenamiento personal",
      "contact.desc": "¿Tienes preguntas sobre Growth Trainer o Growth Premium? Escríbenos un email y te responderemos pronto.",

      "cta.title": "¿Listo para crecer como entrenador personal?",
      "cta.desc": "Únete a entrenadores personales que usan Growth Trainer para ofrecer mejores programas y resultados reales con sus clientes.",
      "cta.email": "Escríbenos",

      "footer.desc": "La app todo-en-uno para entrenadores personales. Asigna planes de entrenamiento y nutrición, gestiona clientes y sigue su progreso.",
      "footer.legal": "Legal",
      "footer.terms": "Términos y condiciones",
      "footer.privacy": "Política de privacidad",
      "footer.contact": "Contáctanos",
      "footer.connect": "Conecta",
      "footer.rights": "© 2026 Growth Trainer. Todos los derechos reservados.",
      "footer.tagline": "Hecha para entrenadores personales que cuidan los resultados.",

      "schema.orgDesc": "Growth Trainer es la app móvil todo-en-uno para que entrenadores personales asignen planes de entrenamiento y nutrición, gestionen clientes y sigan el progreso.",
      "schema.appDesc": "La app todo-en-uno para entrenadores personales. Asigna planes de entrenamiento y nutrición, crea programas con +500 ejercicios, gestiona clientes y sigue el progreso con analíticas avanzadas.",
      "schema.offerDesc": "Growth Premium — clientes ilimitados, todas las funciones incluidas"
    }
  };

  function normalizeLang(value) {
    if (!value) return null;
    var code = String(value).toLowerCase().split("-")[0];
    return SUPPORTED.indexOf(code) !== -1 ? code : null;
  }

  function getStoredLang() {
    try {
      return normalizeLang(localStorage.getItem(STORAGE_KEY));
    } catch (e) {
      return null;
    }
  }

  function setStoredLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* ignore quota / private mode */
    }
  }

  function getUrlLang() {
    try {
      return normalizeLang(new URLSearchParams(window.location.search).get("lang"));
    } catch (e) {
      return null;
    }
  }

  function getBrowserLang() {
    var languages = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || "en"];

    for (var i = 0; i < languages.length; i++) {
      var lang = normalizeLang(languages[i]);
      if (lang) return lang;
    }
    return null;
  }

  function getTimezoneLang() {
    try {
      var tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz && SPANISH_TIMEZONES[tz]) return "es";
    } catch (e) {
      /* ignore */
    }
    return null;
  }

  function getCountryLang(countryCode) {
    if (!countryCode) return null;
    return SPANISH_COUNTRIES[String(countryCode).toUpperCase()] ? "es" : "en";
  }

  /**
   * Resolve locale preference order:
   * URL > saved preference > country > timezone > browser > en
   */
  function resolveLocale(options) {
    options = options || {};
    return (
      getUrlLang() ||
      getStoredLang() ||
      getCountryLang(options.country) ||
      getTimezoneLang() ||
      getBrowserLang() ||
      "en"
    );
  }

  function t(lang, key) {
    var dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
    return dict[key] != null ? dict[key] : (TRANSLATIONS.en[key] || key);
  }

  function getPricing(lang) {
    return PRICING[lang] || PRICING.en;
  }

  function getFaqSchema(lang) {
    var pricing = getPricing(lang);
    return [
      { q: t(lang, "faq.q1"), a: t(lang, "faq.a1") },
      { q: t(lang, "faq.q2"), a: t(lang, "faq.a2") },
      { q: t(lang, "faq.q3"), a: t(lang, "faq.a3") },
      { q: t(lang, "faq.q4"), a: t(lang, "faq.a4") },
      { q: t(lang, "faq.q5"), a: pricing.faqCost },
      { q: t(lang, "faq.q6"), a: t(lang, "faq.a6") }
    ];
  }

  /**
   * Best-effort country lookup for first visit (no saved preference).
   * Uses a lightweight public endpoint; falls back silently on failure.
   */
  function detectCountry() {
    var controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    var timer = setTimeout(function () {
      if (controller) controller.abort();
    }, 2500);

    return fetch("https://ipapi.co/json/", controller ? { signal: controller.signal } : undefined)
      .then(function (res) {
        clearTimeout(timer);
        if (!res.ok) throw new Error("geo failed");
        return res.json();
      })
      .then(function (data) {
        return data && data.country_code ? String(data.country_code).toUpperCase() : null;
      })
      .catch(function () {
        clearTimeout(timer);
        return null;
      });
  }

  global.GrowthI18n = {
    SUPPORTED: SUPPORTED,
    STORAGE_KEY: STORAGE_KEY,
    resolveLocale: resolveLocale,
    getStoredLang: getStoredLang,
    setStoredLang: setStoredLang,
    getUrlLang: getUrlLang,
    getBrowserLang: getBrowserLang,
    getTimezoneLang: getTimezoneLang,
    getCountryLang: getCountryLang,
    detectCountry: detectCountry,
    t: t,
    getPricing: getPricing,
    getFaqSchema: getFaqSchema,
    translations: TRANSLATIONS
  };
})(typeof window !== "undefined" ? window : globalThis);
