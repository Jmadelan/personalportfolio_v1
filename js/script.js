/* Jhon Mark N. Adelan — Portfolio interactions */
"use strict";

// EmailJS setup: create a service and email template at https://www.emailjs.com/
// Replace these values with your own EmailJS public configuration.
// The public key is intended for browser use. Never put a private key or server secret here.
const EMAILJS_CONFIG = {
  publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
  serviceId: "YOUR_EMAILJS_SERVICE_ID",
  templateId: "YOUR_EMAILJS_TEMPLATE_ID"
};

const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const backToTop = document.getElementById("backToTop");
const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");

function setTheme(theme) {
  html.dataset.theme = theme;
  localStorage.setItem("jm-portfolio-theme", theme);
  const isDark = theme === "dark";
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  themeToggle.querySelector(".theme-icon").textContent = isDark ? "☼" : "☾";
}

const savedTheme = localStorage.getItem("jm-portfolio-theme");
setTheme(savedTheme === "light" ? "light" : "dark");

themeToggle.addEventListener("click", () => {
  setTheme(html.dataset.theme === "dark" ? "light" : "dark");
});

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(item => revealObserver.observe(item));

const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-link");
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach(section => sectionObserver.observe(section));

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 500);
}, { passive: true });
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

document.getElementById("currentYear").textContent = new Date().getFullYear();

function showFeedback(message, isError = false) {
  formFeedback.textContent = message;
  formFeedback.classList.toggle("error", isError);
}

contactForm.addEventListener("submit", async event => {
  event.preventDefault();
  showFeedback("");

  if (!contactForm.reportValidity()) return;

  const configReady = Object.values(EMAILJS_CONFIG).every(value =>
    value && !value.startsWith("YOUR_")
  );

  if (!configReady || typeof emailjs === "undefined") {
    showFeedback("Contact form is not connected yet. Please email me directly using the address shown here.", true);
    return;
  }

  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.innerHTML;
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  try {
    emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
    await emailjs.sendForm(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, contactForm);
    contactForm.reset();
    showFeedback("Your message was sent successfully. Thank you for reaching out!");
  } catch (error) {
    console.error("EmailJS submission failed:", error);
    showFeedback("Message could not be sent. Please try again or email me directly.", true);
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = originalButtonText;
  }
});
