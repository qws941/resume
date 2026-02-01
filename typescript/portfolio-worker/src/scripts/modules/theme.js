const themeToggle = document.querySelector('.theme-toggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');
const html = document.documentElement;

export function initTheme() {
  // Load saved theme or respect system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches;
  const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  html.setAttribute('data-theme', theme);
  updateIcons(theme);

  // Initialize aria-pressed based on theme
  themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');

  // Listen for system theme changes (only if no user preference saved)
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        updateIcons(newTheme);
        themeToggle.setAttribute(
          'aria-pressed',
          newTheme === 'dark' ? 'true' : 'false',
        );
      }
    });

  // Click event
  themeToggle.addEventListener('click', toggleTheme);

  // Keyboard navigation support (Space and Enter keys)
  themeToggle.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggleTheme();
    }
  });
}

function toggleTheme() {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  themeToggle.setAttribute(
    'aria-pressed',
    newTheme === 'dark' ? 'true' : 'false',
  );
  updateIcons(newTheme);
}

function updateIcons(theme) {
  if (theme === 'dark') {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  } else {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  }
}
