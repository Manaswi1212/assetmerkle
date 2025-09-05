// Bitcoin rain effect (performance tuned)
const bitcoinRain = document.querySelector('.bitcoin-rain');
let rainIntervalId;

function createBitcoin() {
  const img = document.createElement('img');
  img.src = 'images/bitcoin.png';
  img.classList.add('rain-bitcoin');
  img.style.left = Math.random() * 100 + 'vw';
  img.style.animationDuration = 4 + Math.random() * 3 + 's';
  img.style.width = 16 + Math.random() * 20 + 'px';
  bitcoinRain.appendChild(img);
  setTimeout(() => img.remove(), 8000);
}

function startRain() {
  if (!rainIntervalId) {
    rainIntervalId = setInterval(createBitcoin, 600); // reduced density
  }
}
function stopRain() {
  clearInterval(rainIntervalId);
  rainIntervalId = null;
}

// Pause on tab blur and reduced motion
document.addEventListener('visibilitychange', () => {
  if (document.hidden) stopRain(); else startRain();
});
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) stopRain(); else startRain();

// Style for rain in JS-created elements
const style = document.createElement('style');
style.innerHTML = `
  .rain-bitcoin {
    position: fixed;
    top: -50px;
    animation: fall linear forwards;
    will-change: transform;
  }
  @keyframes fall { to { transform: translateY(100vh); } }
`;
document.head.appendChild(style);

// IntersectionObserver reveal animations
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }
}, { threshold: 0.15 });
revealEls.forEach(el => observer.observe(el));

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('primary-navigation');
if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Parallax effect (subtle)
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const stars = document.querySelector('.parallax-stars');
  const grid = document.querySelector('.parallax-grid');
  if (stars) stars.style.transform = `translateY(${y * 0.15}px)`;
  if (grid) grid.style.transform = `translateY(${y * 0.05}px)`;
});

// Count-up stats
function animateCount(el) {
  const target = Number(el.dataset.count || '0');
  const duration = 1200;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(progress * target).toString();
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const countEls = document.querySelectorAll('.count');
const countObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCount(e.target);
      countObs.unobserve(e.target);
    }
  });
}, { threshold: 0.6 });
countEls.forEach(el => countObs.observe(el));

// CTA form message (fake submission)
const ctaForm = document.querySelector('.cta-form');
if (ctaForm) {
  ctaForm.addEventListener('submit', () => {
    const msg = ctaForm.querySelector('.form-msg');
    if (msg) msg.textContent = 'Thanks! We will reach out shortly.';
  });
}
