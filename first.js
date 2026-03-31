
/* ---- Custom Cursor ---- */
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;
let trailTimer = null;
let trailIndex = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  dot.style.left  = mouseX + 'px';
  dot.style.top   = mouseY + 'px';

  // Spawn trail particles occasionally
  if (!trailTimer) {
    trailTimer = setTimeout(() => {
      spawnTrail(mouseX, mouseY);
      trailTimer = null;
    }, 60);
  }
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

function spawnTrail(x, y) {
  const p = document.createElement('div');
  p.className = 'trail-particle';
  p.style.left = x + 'px';
  p.style.top  = y + 'px';
  document.body.appendChild(p);
  setTimeout(() => p.remove(), 600);
}

// Hover expand cursor on interactive elements
document.querySelectorAll('a, button, .btn, .skill-card, .project-card, .contact-item, .social-btn, .highlight-item, .form-input, .form-textarea, .form-submit').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

/* ---- Magnetic Effect on buttons ---- */
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = (e.clientX - cx) * 0.3;
    const dy   = (e.clientY - cy) * 0.3;
    btn.style.transform = `translate(${dx}px, ${dy}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

/* ---- Sticky Navbar ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  document.getElementById('back-top').classList.toggle('visible', window.scrollY > 400);
});

/* ---- Mobile Nav ---- */
const hamburger  = document.getElementById('hamburger');
const mobileNav  = document.getElementById('mobile-nav');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});
function closeMobileNav() {
  hamburger.classList.remove('open');
  mobileNav.classList.remove('open');
}

/* ---- Typing Animation ---- */
const phrases = [
  'Web Developer',
  'Student & Learner',
  'UI Enthusiast',
  'Python Programmer',
  'SEO Explorer',
];
let pi = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function typeLoop() {
  const current = phrases[pi];
  if (!deleting) {
    typedEl.textContent = current.substring(0, ci + 1);
    ci++;
    if (ci === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.substring(0, ci - 1);
    ci--;
    if (ci === 0) {
      deleting = false;
      pi = (pi + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, deleting ? 60 : 100);
}
typeLoop();

/* ---- Scroll Reveal ---- */
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay) || 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObs.observe(el));

/* ---- Skill Bar Animation ---- */
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.skill-bar-fill');
      fills.forEach(fill => {
        fill.style.width = fill.dataset.width + '%';
      });
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-card').forEach(card => barObs.observe(card));

/* ---- Parallax Orbs on mouse ---- */
document.addEventListener('mousemove', e => {
  const xRatio = (e.clientX / window.innerWidth  - 0.5) * 2;
  const yRatio = (e.clientY / window.innerHeight - 0.5) * 2;
  document.querySelectorAll('.orb').forEach((orb, i) => {
    const factor = (i + 1) * 12;
    orb.style.transform = `translate(${xRatio * factor}px, ${yRatio * factor}px)`;
  });
});

/* ---- Contact Form ---- */
document.getElementById('form-submit-btn').addEventListener('click', () => {
  const fn = document.getElementById('f-firstname').value.trim();
  const em = document.getElementById('f-email').value.trim();
  const ms = document.getElementById('f-message').value.trim();

  if (!fn || !em || !ms) {
    alert('Please fill in your name, email, and message.');
    return;
  }

  // Simulate submission
  const btn = document.getElementById('form-submit-btn');
  btn.textContent = 'Sending...';
  btn.style.opacity = '0.7';

  setTimeout(() => {
    btn.style.display = 'none';
    document.getElementById('form-success').style.display = 'block';
  }, 1400);
});

/* ---- Smooth scroll for internal links ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});
