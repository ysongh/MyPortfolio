const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const form = document.getElementById('contact-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  const status = document.getElementById('form-status');
  btn.textContent = 'Sending…';
  btn.disabled = true;
  setTimeout(() => {
    status.textContent = "Message sent! I'll be in touch soon.";
    btn.textContent = 'Sent ✓';
    form.reset();
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      status.textContent = '';
    }, 4000);
  }, 1200);
});
