(function () {
  "use strict";

  var PRICING = {
    en: {
      currency: "USD",
      symbol: "$",
      amount: "59",
      stat: "$59/mo",
      month: "$59/month",
      monthLong: "$59 per month",
      planLine: "One simple plan — $59/month with unlimited clients",
      faqCost: "Growth Trainer is free to download on iOS and Android. Growth Premium costs $59 per month and includes unlimited clients, exclusive programs, advanced analytics, personalized coaching tools, and an ad-free experience."
    },
    es: {
      currency: "EUR",
      symbol: "€",
      amount: "49",
      stat: "49 €/mes",
      month: "49 €/mes",
      monthLong: "49 euros al mes",
      planLine: "Un único plan — 49 euros al mes con clientes ilimitados",
      faqCost: "Growth Trainer es gratis para descargar en iOS y Android. Growth Premium cuesta 49 euros al mes e incluye clientes ilimitados, programas exclusivos, analíticas avanzadas, herramientas de coaching personalizadas y una experiencia sin anuncios."
    }
  };

  function getPricingRegion() {
    var params = new URLSearchParams(window.location.search);
    var langParam = params.get("lang");
    if (langParam && langParam.toLowerCase().indexOf("es") === 0) {
      return "es";
    }

    var languages = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || "en"];

    for (var i = 0; i < languages.length; i++) {
      var code = String(languages[i]).toLowerCase();
      if (code.indexOf("es") === 0) {
        return "es";
      }
    }

    return "en";
  }

  function applyPricing() {
    var region = getPricingRegion();
    var pricing = PRICING[region];

    document.querySelectorAll("[data-price-stat]").forEach(function (el) {
      el.textContent = pricing.stat;
    });

    document.querySelectorAll("[data-price-symbol]").forEach(function (el) {
      el.textContent = pricing.symbol;
    });

    document.querySelectorAll("[data-price-amount]").forEach(function (el) {
      el.textContent = pricing.amount;
    });

    document.querySelectorAll("[data-price-plan-line]").forEach(function (el) {
      el.textContent = pricing.planLine;
    });

    document.querySelectorAll("[data-price-faq-cost]").forEach(function (el) {
      el.textContent = pricing.faqCost;
    });

    if (region === "es") {
      document.documentElement.lang = "es";
    }

    var softwareSchema = document.getElementById("schema-software");
    if (softwareSchema) {
      try {
        var softwareData = JSON.parse(softwareSchema.textContent);
        softwareData.offers.price = pricing.amount;
        softwareData.offers.priceCurrency = pricing.currency;
        softwareSchema.textContent = JSON.stringify(softwareData);
      } catch (error) {
        /* ignore invalid schema during local edits */
      }
    }

    var faqSchema = document.getElementById("schema-faq");
    if (faqSchema) {
      try {
        var faqData = JSON.parse(faqSchema.textContent);
        faqData.mainEntity.forEach(function (item) {
          if (item.name === "How much does Growth Trainer cost?") {
            item.acceptedAnswer.text = pricing.faqCost;
          }
        });
        faqSchema.textContent = JSON.stringify(faqData);
      } catch (error) {
        /* ignore invalid schema during local edits */
      }
    }
  }

  applyPricing();

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
})();
