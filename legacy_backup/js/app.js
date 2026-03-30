// MATRIX RAIN BACKGROUND
const canvas = document.getElementById('particleCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
  const fontSize = 14;
  let drops = [];

  function initDrops() {
    const columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
  }
  initDrops();

  function drawMatrix() {
    ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00FF94';
    ctx.font = `${fontSize}px monospace`;
    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(drawMatrix, 50);

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      resizeCanvas();
      initDrops();
    }, 200);
  });
}

// ===================================
// MOBILE NAV TOGGLE
// ===================================
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.mobile-menu-close');
  const mobileLinks = document.querySelectorAll('.mobile-menu a');

  if (!toggle || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on backdrop tap
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMenu();
  });
}

initMobileNav();

// ===================================
// ACTIVE NAV LINK ON SCROLL
// ===================================
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  sections.forEach(section => observer.observe(section));
}

initActiveNav();

// ===================================
// SCROLL REVEAL
// ===================================
const revealElements = document.querySelectorAll('.glass-panel, .section-title, .about-text');

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  revealElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 80) {
      el.classList.add('reveal', 'active');
    }
  });
};

window.addEventListener('scroll', revealOnScroll, { passive: true });
window.addEventListener('load', revealOnScroll);

// ===================================
// TYPEWRITER EFFECT
// ===================================
class TypeWriter {
  constructor(element, texts, typingSpeed = 100, deletingSpeed = 50, delay = 2000) {
    this.element = element;
    this.texts = texts;
    this.typingSpeed = typingSpeed;
    this.deletingSpeed = deletingSpeed;
    this.delay = delay;
    this.textIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.type();
  }

  type() {
    const currentText = this.texts[this.textIndex];
    if (!this.isDeleting) {
      this.element.textContent = currentText.substring(0, this.charIndex + 1);
      this.charIndex++;
      if (this.charIndex === currentText.length) {
        this.isDeleting = true;
        setTimeout(() => this.type(), this.delay);
        return;
      }
    } else {
      this.element.textContent = currentText.substring(0, this.charIndex - 1);
      this.charIndex--;
      if (this.charIndex === 0) {
        this.isDeleting = false;
        this.textIndex = (this.textIndex + 1) % this.texts.length;
      }
    }
    setTimeout(() => this.type(), this.isDeleting ? this.deletingSpeed : this.typingSpeed);
  }
}

const typingElement = document.querySelector('.typing-text');
if (typingElement) {
  new TypeWriter(typingElement, [
    'ECE & Biomedical Engineer',
    'Full-Stack Developer',
    'Problem Solver',
    'Innovation Enthusiast'
  ]);
}

// ===================================
// CONTACT FORM — prevent default & show feedback
// ===================================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        btn.textContent = '✓ Message Sent!';
        contactForm.reset();
      } else {
        throw new Error();
      }
    } catch {
      btn.textContent = '✗ Failed — try email';
    }

    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
    }, 3500);
  });
}
