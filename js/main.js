'use strict';

// ===== MOBILE MENU =====
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  nav.classList.toggle('open');
  burger.classList.toggle('active');
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    burger.classList.remove('active');
  });
});

document.addEventListener('click', e => {
  if (!nav.contains(e.target) && !burger.contains(e.target)) {
    nav.classList.remove('open');
    burger.classList.remove('active');
  }
});

// ===== STICKY HEADER =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.style.background = window.scrollY > 40
    ? 'rgba(17,17,17,0.99)'
    : 'rgba(17,17,17,0.97)';
}, { passive: true });

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ===== SCROLL ANIMATIONS =====
const fadeEls = document.querySelectorAll(
  '.arg-card, .service-card, .client-card, .tarif-card, .avis-card, .contact__method'
);
fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => observer.observe(el));

// ===== CONTACT FORM =====
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', e => {
  e.preventDefault();

  const required = form.querySelectorAll('[required]');
  let valid = true;
  required.forEach(field => {
    field.style.borderColor = '';
    if (!field.value.trim()) {
      field.style.borderColor = '#e53e3e';
      valid = false;
    }
  });
  if (!valid) return;

  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Envoi en cours…';

  setTimeout(() => {
    formSuccess.classList.add('show');
    form.querySelectorAll('input, select, textarea').forEach(f => f.value = '');
    btn.disabled = false;
    btn.innerHTML = 'Envoyer ma demande de devis gratuit <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 800);
});

// ===== FLOATING CTA — hide while hero is visible =====
const floatingCta = document.getElementById('floatingCta');
const hero = document.querySelector('.hero');

const heroObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    floatingCta.style.display = entry.isIntersecting ? 'none' : '';
  });
}, { threshold: 0.1 });

if (hero && floatingCta) {
  heroObserver.observe(hero);
}

// ===== PHONE LINK TRACKING (basic click log) =====
document.querySelectorAll('a[href="tel:0652707699"]').forEach(link => {
  link.addEventListener('click', () => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'phone_click', { event_category: 'contact', event_label: 'tel_06_52_70_76_99' });
    }
  });
});
