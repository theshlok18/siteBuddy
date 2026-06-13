/* ============================================
   SITEBUDDY – Premium Agency JS
   ============================================ */

'use strict';

const WA_NUMBER = '917709163223';
const WA_NUMBER_2 = '919270180492';

/* ============================================
   LOADING SCREEN
   ============================================ */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
    document.body.style.overflow = '';
  }, 1900);
});
document.body.style.overflow = 'hidden';

/* ============================================
   CUSTOM CURSOR
   ============================================ */
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursor-trail');

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursor) {
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  }
});

function animateTrail() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  if (trail) {
    trail.style.left = trailX + 'px';
    trail.style.top = trailY + 'px';
  }
  requestAnimationFrame(animateTrail);
}
animateTrail();

document.querySelectorAll('a, button, .service-card, .portfolio-card, .faq-question').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor && cursor.classList.add('hover');
    trail && trail.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor && cursor.classList.remove('hover');
    trail && trail.classList.remove('hover');
  });
});

/* ============================================
   PARTICLES CANVAS
   ============================================ */
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animFrameId;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.4 + 0.05;
    this.color = Math.random() > 0.5 ? '108,99,255' : '0,212,255';
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 18000));
  for (let i = 0; i < count; i++) particles.push(new Particle());
}
initParticles();
window.addEventListener('resize', initParticles);

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  // Draw connections
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(108,99,255,${0.06 * (1 - dist / 100)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ============================================
   NAVBAR
   ============================================ */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

hamburger && hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger && hamburger.classList.remove('open');
    navLinks && navLinks.classList.remove('open');
  });
});

/* ============================================
   SCROLL REVEAL
   ============================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, parseInt(delay));
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ============================================
   ANIMATED COUNTERS
   ============================================ */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '+';
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = prefix + Math.floor(current) + suffix;
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      entry.target.dataset.animated = 'true';
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));

/* ============================================
   FAQ ACCORDION
   ============================================ */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-answer').classList.remove('open');
    });

    // Open clicked if it was closed
    if (!isOpen) {
      item.classList.add('open');
      answer.classList.add('open');
    }
  });
});

/* ============================================
   3D CARD MOUSE EFFECT
   ============================================ */
document.querySelectorAll('.service-card, .pricing-card, .portfolio-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ============================================
   HERO 3D TILT ON MOUSE MOVE
   ============================================ */
const heroSection = document.getElementById('hero');
const mockup3d = document.querySelector('.mockup-3d');

heroSection && heroSection.addEventListener('mousemove', (e) => {
  if (!mockup3d) return;
  const rect = heroSection.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  mockup3d.style.transform = `perspective(1000px) rotateY(${-8 + x * 6}deg) rotateX(${4 + y * -4}deg)`;
});
heroSection && heroSection.addEventListener('mouseleave', () => {
  if (!mockup3d) return;
  mockup3d.style.transform = `perspective(1000px) rotateY(-8deg) rotateX(4deg)`;
});

/* ============================================
   BACK TO TOP
   ============================================ */
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop && backToTop.classList.add('visible');
  } else {
    backToTop && backToTop.classList.remove('visible');
  }
});

backToTop && backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================
   WHATSAPP SYSTEM
   ============================================ */

function buildWhatsAppMessage(name, business, phone, email, message, plan) {
  let text = `Hello SiteBuddy! 👋\n\n`;
  text += `I want a website for my business.\n\n`;
  if (plan) text += `📦 *Package Interest:* ${plan}\n\n`;
  text += `*My Details:*\n`;
  text += `👤 Name: ${name || 'Not provided'}\n`;
  text += `🏢 Business Name: ${business || 'Not provided'}\n`;
  text += `📞 Phone Number: ${phone || 'Not provided'}\n`;
  text += `📧 Email: ${email || 'Not provided'}\n`;
  if (message) text += `\n💬 Requirements: ${message}\n`;
  text += `\nPlease contact me. Thank you!`;
  return encodeURIComponent(text);
}

function openWhatsApp(plan) {
  const name = document.getElementById('name')?.value.trim() || '';
  const business = document.getElementById('business')?.value.trim() || '';
  const phone = document.getElementById('phone')?.value.trim() || '';
  const email = document.getElementById('email')?.value.trim() || '';
  const message = document.getElementById('message')?.value.trim() || '';

  const encodedMsg = buildWhatsAppMessage(name, business, phone, email, message, plan);
  const url1 = `https://wa.me/${WA_NUMBER}?text=${encodedMsg}`;
  const url2 = `https://wa.me/${WA_NUMBER_2}?text=${encodedMsg}`;

  showSuccess(() => {
    window.open(url1, '_blank');
    setTimeout(() => window.open(url2, '_blank'), 800);
  });
}

function submitForm() {
  const name = document.getElementById('name')?.value.trim();
  const business = document.getElementById('business')?.value.trim();
  const phone = document.getElementById('phone')?.value.trim();

  if (!name) { flashField('name', 'Please enter your name'); return; }
  if (!business) { flashField('business', 'Please enter your business name'); return; }
  if (!phone) { flashField('phone', 'Please enter your phone number'); return; }

  const email = document.getElementById('email')?.value.trim() || '';
  const message = document.getElementById('message')?.value.trim() || '';
  const encodedMsg = buildWhatsAppMessage(name, business, phone, email, message, '');
  const url1 = `https://wa.me/${WA_NUMBER}?text=${encodedMsg}`;
  const url2 = `https://wa.me/${WA_NUMBER_2}?text=${encodedMsg}`;

  showSuccess(() => {
    window.open(url1, '_blank');
    setTimeout(() => window.open(url2, '_blank'), 800);
  });
}

function flashField(id, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.borderColor = '#f87171';
  el.placeholder = msg;
  el.focus();
  setTimeout(() => {
    el.style.borderColor = '';
  }, 2000);
}

function showSuccess(callback) {
  const overlay = document.getElementById('success-overlay');
  if (!overlay) { callback && callback(); return; }
  overlay.classList.add('show');
  setTimeout(() => {
    overlay.classList.remove('show');
    callback && callback();
  }, 1600);
}

// Close overlay on click
document.getElementById('success-overlay')?.addEventListener('click', () => {
  document.getElementById('success-overlay').classList.remove('show');
});

/* ============================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ============================================
   ACTIVE NAV LINK ON SCROLL
   ============================================ */
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--white)';
    }
  });
});

/* ============================================
   FLOATING BADGE PARALLAX
   ============================================ */
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.querySelectorAll('.hero-orb-1').forEach(el => {
    el.style.transform = `translate(0, ${scrollY * 0.15}px)`;
  });
  document.querySelectorAll('.hero-orb-2').forEach(el => {
    el.style.transform = `translate(0, ${scrollY * -0.1}px)`;
  });
});

/* ============================================
   INIT
   ============================================ */
window.openWhatsApp = openWhatsApp;
window.submitForm = submitForm;

console.log('%cSiteBuddy 🚀', 'font-size:24px;font-weight:bold;color:#6C63FF;');
console.log('%cYour Digital Growth Partner', 'color:#00D4FF;');
