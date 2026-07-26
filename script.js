// ============================================
// Mobile nav toggle
// ============================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is tapped
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ============================================
// Scroll progress bar
// ============================================
const progressBar = document.createElement('div');
progressBar.id = 'scrollProgress';
document.body.appendChild(progressBar);

function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

// ============================================
// Header shadow + shrink on scroll
// ============================================
const siteHeader = document.getElementById('siteHeader');
function updateHeaderState() {
  if (window.scrollY > 12) {
    siteHeader.classList.add('scrolled');
  } else {
    siteHeader.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', updateHeaderState, { passive: true });
updateHeaderState();

// ============================================
// Scroll-triggered reveal animations (staggered within each group)
// ============================================
const revealGroups = new Map();
document.querySelectorAll('.reveal').forEach((el) => {
  const parent = el.parentElement;
  if (!revealGroups.has(parent)) revealGroups.set(parent, []);
  const group = revealGroups.get(parent);
  el.style.transitionDelay = `${Math.min(group.length * 90, 360)}ms`;
  group.push(el);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// ============================================
// Contact form -> opens email client with prefilled message
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cfName').value.trim();
    const email = document.getElementById('cfEmail').value.trim();
    const message = document.getElementById('cfMessage').value.trim();

    const subject = encodeURIComponent(`Message from ${name} — EV Academy website`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);

    window.location.href = `mailto:itsmeena180@gmail.com?subject=${subject}&body=${body}`;
  });
}
