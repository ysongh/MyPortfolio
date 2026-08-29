const reveals = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => observer.observe(el));
} else {
  // No observer support — show everything rather than leaving the page blank.
  reveals.forEach(el => el.classList.add('visible'));
}

// If a screenshot is missing, drop the <img> so the placeholder underneath shows.
document.querySelectorAll('.pthumb img').forEach(img => {
  img.addEventListener('error', () => img.remove());
});

const form = document.getElementById('contact-form');
const btn = document.getElementById('submit-btn');
const statusEl = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  btn.textContent = 'Sending…';
  btn.disabled = true;
  statusEl.textContent = '';

  try {
    const body = new URLSearchParams(new FormData(form)).toString();
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
    if (!res.ok) throw new Error(res.statusText);

    statusEl.textContent = "Message sent — I'll be in touch soon.";
    btn.textContent = 'Sent';
    form.reset();
    setTimeout(() => {
      btn.textContent = 'Send';
      btn.disabled = false;
      statusEl.textContent = '';
    }, 4000);
  } catch (err) {
    statusEl.textContent = 'Something went wrong. Please email me directly.';
    btn.textContent = 'Send';
    btn.disabled = false;
  }
});
