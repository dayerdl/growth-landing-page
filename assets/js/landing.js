(function () {
  "use strict";

  var I18n = window.GrowthI18n;
  if (!I18n) return;

  var currentLang = "en";

  function setUrlLang(lang) {
    try {
      var url = new URL(window.location.href);
      url.searchParams.set("lang", lang);
      window.history.replaceState({}, "", url.pathname + url.search + url.hash);
    } catch (e) {
      /* ignore */
    }
  }

  function applyMeta(lang) {
    document.documentElement.lang = lang;
    document.title = I18n.t(lang, "meta.title");

    setMeta('meta[name="description"]', "content", I18n.t(lang, "meta.description"));
    setMeta('meta[name="keywords"]', "content", I18n.t(lang, "meta.keywords"));
    setMeta('meta[property="og:title"]', "content", I18n.t(lang, "meta.title"));
    setMeta('meta[property="og:description"]', "content", I18n.t(lang, "meta.ogDescription"));
    setMeta('meta[property="og:locale"]', "content", lang === "es" ? "es_ES" : "en_US");
    setMeta('meta[name="twitter:title"]', "content", I18n.t(lang, "meta.title"));
    setMeta('meta[name="twitter:description"]', "content", I18n.t(lang, "meta.ogDescription"));

    var canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute("href", "https://growthtrainer.fit/?lang=" + lang);
    }
  }

  function setMeta(selector, attr, value) {
    var el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  }

  function applyText(lang) {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var html = el.getAttribute("data-i18n-html") === "true";
      var value = I18n.t(lang, key);
      if (html) {
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      el.setAttribute("aria-label", I18n.t(lang, el.getAttribute("data-i18n-aria")));
    });

    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      var pairs = el.getAttribute("data-i18n-attr").split(",");
      pairs.forEach(function (pair) {
        var parts = pair.split(":");
        if (parts.length === 2) {
          el.setAttribute(parts[0].trim(), I18n.t(lang, parts[1].trim()));
        }
      });
    });
  }

  function applyPricing(lang) {
    var pricing = I18n.getPricing(lang);

    document.querySelectorAll("[data-price-stat]").forEach(function (el) {
      el.textContent = pricing.stat;
    });
    document.querySelectorAll("[data-price-symbol]").forEach(function (el) {
      el.textContent = pricing.symbol;
    });
    document.querySelectorAll("[data-price-amount]").forEach(function (el) {
      el.textContent = pricing.amount;
    });
    document.querySelectorAll("[data-price-period]").forEach(function (el) {
      el.textContent = pricing.period;
    });
    document.querySelectorAll("[data-price-plan-line]").forEach(function (el) {
      el.textContent = pricing.planLine;
    });
    document.querySelectorAll("[data-price-faq-cost]").forEach(function (el) {
      el.textContent = pricing.faqCost;
    });
  }

  function applySchemas(lang) {
    var pricing = I18n.getPricing(lang);

    var orgSchema = document.getElementById("schema-org");
    if (orgSchema) {
      try {
        var org = JSON.parse(orgSchema.textContent);
        org.description = I18n.t(lang, "schema.orgDesc");
        orgSchema.textContent = JSON.stringify(org);
      } catch (e) { /* ignore */ }
    }

    var softwareSchema = document.getElementById("schema-software");
    if (softwareSchema) {
      try {
        var software = JSON.parse(softwareSchema.textContent);
        software.description = I18n.t(lang, "schema.appDesc");
        software.offers.price = pricing.amount;
        software.offers.priceCurrency = pricing.currency;
        software.offers.description = I18n.t(lang, "schema.offerDesc");
        software.inLanguage = lang;
        softwareSchema.textContent = JSON.stringify(software);
      } catch (e) { /* ignore */ }
    }

    var faqSchema = document.getElementById("schema-faq");
    if (faqSchema) {
      try {
        var faqItems = I18n.getFaqSchema(lang);
        var faq = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "inLanguage": lang,
          "mainEntity": faqItems.map(function (item) {
            return {
              "@type": "Question",
              "name": item.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a
              }
            };
          })
        };
        faqSchema.textContent = JSON.stringify(faq);
      } catch (e) { /* ignore */ }
    }
  }

  function updateSwitcher(lang) {
    document.querySelectorAll("[data-lang-option]").forEach(function (btn) {
      var active = btn.getAttribute("data-lang-option") === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function applyLocale(lang, options) {
    options = options || {};
    currentLang = lang;
    applyMeta(lang);
    applyText(lang);
    applyPricing(lang);
    applySchemas(lang);
    updateSwitcher(lang);

    if (options.persist !== false) {
      I18n.setStoredLang(lang);
    }
    if (options.updateUrl !== false) {
      setUrlLang(lang);
    }

    document.documentElement.setAttribute("data-locale", lang);
  }

  function initLanguageSwitcher() {
    document.querySelectorAll("[data-lang-option]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var lang = btn.getAttribute("data-lang-option");
        if (lang && lang !== currentLang) {
          applyLocale(lang, { persist: true, updateUrl: true });
        }
      });
    });
  }

  function initHeader() {
    var header = document.querySelector(".site-header");
    var toggle = document.querySelector(".menu-toggle");
    var nav = document.querySelector(".nav-links");

    if (header) {
      window.addEventListener("scroll", function () {
        header.classList.toggle("scrolled", window.scrollY > 40);
      }, { passive: true });
    }

    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open);
      });

      nav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          nav.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  function initReveal() {
    if ("IntersectionObserver" in window) {
      var isMobile = window.matchMedia("(max-width: 640px)").matches;
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: isMobile ? 0.05 : 0.12,
        rootMargin: isMobile ? "0px 0px 0px 0px" : "0px 0px -40px 0px"
      });

      document.querySelectorAll(".reveal").forEach(function (el) {
        observer.observe(el);
      });
    } else {
      document.querySelectorAll(".reveal").forEach(function (el) {
        el.classList.add("visible");
      });
    }
  }

  function boot() {
    var hasExplicitPreference = !!(I18n.getUrlLang() || I18n.getStoredLang());
    var initial = I18n.resolveLocale();
    applyLocale(initial, { persist: hasExplicitPreference, updateUrl: true });

    initLanguageSwitcher();
    initHeader();
    initReveal();

    // Refine with country on first visit (no saved preference / URL override)
    if (!hasExplicitPreference) {
      I18n.detectCountry().then(function (country) {
        if (!country) return;
        var geoLang = I18n.getCountryLang(country);
        if (geoLang && geoLang !== currentLang && !I18n.getStoredLang() && !I18n.getUrlLang()) {
          applyLocale(geoLang, { persist: false, updateUrl: true });
        }
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
