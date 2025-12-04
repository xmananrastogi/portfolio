// Matrix Rain Effect (Background)
const canvas = document.getElementById('particleCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);

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

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ----------------------------------------------------
// SCROLL REVEAL ANIMATION
// ----------------------------------------------------
// Target key structural elements for the reveal
const revealElements = document.querySelectorAll('.glass-panel, .section-title, .about-text');

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  const elementVisible = 100; // Pixel buffer before revealing

  revealElements.forEach((reveal) => {
    const elementTop = reveal.getBoundingClientRect().top;
    if (elementTop < windowHeight - elementVisible) {
      reveal.classList.add('active');
      reveal.classList.add('reveal'); // Ensure base CSS class is attached
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
// Trigger once on load to show elements already in view
window.addEventListener('load', revealOnScroll);

// Typing animation for hero subtitle (Original Feature)
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
    this.start();
  }
  start() { this.type(); }
  type() {
    const currentText = this.texts[this.textIndex];
    if (!this.isDeleting) {
      this.element.textContent = currentText.substring(0, this.charIndex + 1);
      this.charIndex++;
      if (this.charIndex === currentText.length) {
        this.isDeleting = true; setTimeout(() => this.type(), this.delay); return;
      }
    } else {
      this.element.textContent = currentText.substring(0, this.charIndex - 1);
      this.charIndex--;
      if (this.charIndex === 0) {
        this.isDeleting = false; this.textIndex = (this.textIndex + 1) % this.texts.length;
      }
    }
    const speed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;
    setTimeout(() => this.type(), speed);
  }
}

const typingElement = document.querySelector('.typing-text');
if (typingElement) {
  const texts = ['ECE & Biomedical Engineer', 'Full-Stack Developer', 'Problem Solver', 'Innovation Enthusiast'];
  new TypeWriter(typingElement, texts);
}
