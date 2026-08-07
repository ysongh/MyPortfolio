const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// If a screenshot is missing, drop the <img> so the placeholder underneath shows.
document.querySelectorAll('.thumb img').forEach(img => {
  img.addEventListener('error', () => img.remove());
});

const form = document.getElementById('contact-form');
const btn = document.getElementById('submit-btn');
const btnLabel = btn.querySelector('span');
const status = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  btnLabel.textContent = 'Sending…';
  btn.disabled = true;
  status.textContent = '';

  try {
    const body = new URLSearchParams(new FormData(form)).toString();
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
    if (!res.ok) throw new Error(res.statusText);

    status.textContent = "Message sent — I'll be in touch soon.";
    btnLabel.textContent = 'Sent ✓';
    form.reset();
    setTimeout(() => {
      btnLabel.textContent = 'Send Message';
      btn.disabled = false;
      status.textContent = '';
    }, 4000);
  } catch (err) {
    status.textContent = 'Something went wrong. Please email me directly.';
    btnLabel.textContent = 'Send Message';
    btn.disabled = false;
  }
});
