
/* ==========================================
   JHON MARK N. ADELAN — PORTFOLIO
   Premium Portfolio Interactions
========================================== */

"use strict";

/* ==========================================
   EMAILJS CONFIGURATION
========================================== */

// Replace these placeholders with your EmailJS
// public key, service ID, and template ID.
//
// Never put a private API key or server secret here.

const EMAILJS_CONFIG = {
  publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
  serviceId: "YOUR_EMAILJS_SERVICE_ID",
  templateId: "YOUR_EMAILJS_TEMPLATE_ID"
};

/* ==========================================
   DOM ELEMENTS
========================================== */

const html = document.documentElement;

const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const backToTop = document.getElementById("backToTop");
const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");

const currentYear = document.getElementById("currentYear");

const navItems = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");
const revealElements = document.querySelectorAll(".reveal");

/* ==========================================
   MOTION PREFERENCES
========================================== */

const reducedMotionQuery = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

function getScrollBehavior() {
  return reducedMotionQuery.matches ? "instant" : "smooth";
}

/* ==========================================
   DARK / LIGHT THEME
========================================== */

const THEME_STORAGE_KEY = "jm-portfolio-theme";

function setTheme(theme) {
  const selectedTheme = theme === "light" ? "light" : "dark";

  html.dataset.theme = selectedTheme;

  try {
    localStorage.setItem(THEME_STORAGE_KEY, selectedTheme);
  } catch (error) {
    // Theme still works if storage is unavailable.
  }

  if (!themeToggle) return;

  const isDark = selectedTheme === "dark";

  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );

  themeToggle.setAttribute(
    "title",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );

  themeToggle.setAttribute("aria-pressed", String(!isDark));

  const themeIcon = themeToggle.querySelector(".theme-icon");

  if (themeIcon) {
    themeIcon.textContent = isDark ? "☼" : "☾";
  }
}

function initializeTheme() {
  let savedTheme = null;

  try {
    savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  } catch (error) {
    // Use default theme when storage is unavailable.
  }

  setTheme(savedTheme === "light" ? "light" : "dark");
}

initializeTheme();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme =
      html.dataset.theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);
  });
}

/* ==========================================
   MOBILE NAVIGATION
========================================== */

function setMobileMenu(open) {
  if (!menuToggle || !navLinks) return;

  navLinks.classList.toggle("open", open);

  menuToggle.setAttribute("aria-expanded", String(open));

  menuToggle.setAttribute(
    "aria-label",
    open ? "Close navigation menu" : "Open navigation menu"
  );
}

function closeMobileMenu(restoreFocus = false) {
  if (!navLinks || !navLinks.classList.contains("open")) {
    return;
  }

  setMobileMenu(false);

  if (restoreFocus && menuToggle) {
    menuToggle.focus();
  }
}

if (menuToggle && navLinks) {
  menuToggle.setAttribute("aria-expanded", "false");

  menuToggle.addEventListener("click", () => {
    const shouldOpen = !navLinks.classList.contains("open");

    setMobileMenu(shouldOpen);
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeMobileMenu(true);
    }
  });

  document.addEventListener("click", event => {
    if (!navLinks.classList.contains("open")) return;

    const clickedInsideMenu = navLinks.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      closeMobileMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) {
      closeMobileMenu();
    }
  });
}

/* ==========================================
   SCROLL REVEAL ANIMATIONS
========================================== */

function revealAllElements() {
  revealElements.forEach(element => {
    element.classList.add("visible");
  });
}

if (
  "IntersectionObserver" in window &&
  !reducedMotionQuery.matches
) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -20px 0px"
    }
  );

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  const handleMotionChange = event => {
    if (event.matches) {
      revealObserver.disconnect();
      revealAllElements();
    }
  };

  if (reducedMotionQuery.addEventListener) {
    reducedMotionQuery.addEventListener(
      "change",
      handleMotionChange
    );
  } else if (reducedMotionQuery.addListener) {
    reducedMotionQuery.addListener(handleMotionChange);
  }
} else {
  revealAllElements();
}

/* ==========================================
   ACTIVE NAVIGATION HIGHLIGHT
========================================== */

function updateActiveNavigation() {
  if (!sections.length || !navItems.length) return;

  const headerOffset = 150;
  const scrollPosition = window.scrollY + headerOffset;

  let currentSection = sections[0].id;

  sections.forEach(section => {
    if (section.offsetTop <= scrollPosition) {
      currentSection = section.id;
    }
  });

  navItems.forEach(link => {
    const target = link.getAttribute("href");
    const isActive = target === `#${currentSection}`;

    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

/* ==========================================
   BACK TO TOP
========================================== */

function updateBackToTop() {
  if (!backToTop) return;

  const shouldShow = window.scrollY > 500;

  backToTop.classList.toggle("visible", shouldShow);

  backToTop.setAttribute(
    "aria-hidden",
    String(!shouldShow)
  );

  backToTop.tabIndex = shouldShow ? 0 : -1;
}

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: getScrollBehavior()
    });
  });
}

/* ==========================================
   OPTIMIZED SCROLL HANDLING
========================================== */

let scrollUpdateScheduled = false;

function handleScroll() {
  if (scrollUpdateScheduled) return;

  scrollUpdateScheduled = true;

  requestAnimationFrame(() => {
    updateActiveNavigation();
    updateBackToTop();

    scrollUpdateScheduled = false;
  });
}

window.addEventListener("scroll", handleScroll, {
  passive: true
});

window.addEventListener("resize", handleScroll);

window.addEventListener("load", () => {
  updateActiveNavigation();
  updateBackToTop();
});

updateActiveNavigation();
updateBackToTop();

/* ==========================================
   FOOTER YEAR
========================================== */

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

/* ==========================================
   CONTACT FORM FEEDBACK
========================================== */

function showFeedback(message, isError = false) {
  if (!formFeedback) return;

  formFeedback.textContent = message;
  formFeedback.classList.toggle("error", isError);

  formFeedback.setAttribute(
    "role",
    isError ? "alert" : "status"
  );

  formFeedback.setAttribute("aria-live", "polite");
}

/* ==========================================
   EMAILJS VALIDATION
========================================== */

function isEmailJSConfigured() {
  const values = Object.values(EMAILJS_CONFIG);

  return values.every(value => {
    return (
      typeof value === "string" &&
      value.trim().length > 0 &&
      !value.startsWith("YOUR_")
    );
  });
}

/* ==========================================
   CONTACT FORM SUBMISSION
========================================== */

if (contactForm) {
  let isSubmitting = false;

  contactForm.addEventListener("submit", async event => {
    event.preventDefault();

    if (isSubmitting) return;

    showFeedback("");

    if (!contactForm.reportValidity()) {
      return;
    }

    if (!isEmailJSConfigured()) {
      showFeedback(
        "The contact form is not connected yet. Please email me directly using the address shown here.",
        true
      );
      return;
    }

    if (
      typeof window.emailjs === "undefined" ||
      typeof window.emailjs.sendForm !== "function"
    ) {
      showFeedback(
        "The email service is currently unavailable. Please try again later or email me directly.",
        true
      );
      return;
    }

    const submitButton = contactForm.querySelector(
      'button[type="submit"]'
    );

    const originalButtonHTML = submitButton
      ? submitButton.innerHTML
      : "";

    isSubmitting = true;

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
      submitButton.setAttribute("aria-busy", "true");
    }

    try {
      window.emailjs.init({
        publicKey: EMAILJS_CONFIG.publicKey
      });

      await window.emailjs.sendForm(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        contactForm
      );

      contactForm.reset();

      showFeedback(
        "Your message was sent successfully. Thank you for reaching out!"
      );
    } catch (error) {
      console.error("EmailJS submission failed:", error);

      showFeedback(
        "Message could not be sent. Please try again or email me directly.",
        true
      );
    } finally {
      isSubmitting = false;

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonHTML;
        submitButton.removeAttribute("aria-busy");
      }
    }
  });
}

/* ==========================================
   END OF PORTFOLIO SCRIPT
========================================== */
