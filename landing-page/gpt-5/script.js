(() => {
  const body = document.body;
  const YEAR = document.getElementById('year');
  const themeToggle = document.getElementById('themeToggle');
  const form = document.getElementById('waitlist');

  // Year in footer
  if (YEAR) YEAR.textContent = new Date().getFullYear();

  // Theme
  const saved = localStorage.getItem('theme');
  if (saved === 'light') body.classList.add('theme-light');
  themeToggle?.addEventListener('click', () => {
    const isLight = body.classList.toggle('theme-light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  // Waitlist form -> mailto
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email')?.value?.trim();
    const about = document.getElementById('about')?.value?.trim() || '';
    const to = 'team@example.com';
    const subject = encodeURIComponent('Community AI — Early Access');
    const body = encodeURIComponent(`My email: ${email}\nCommunity: ${about}\n`);
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });
})();

