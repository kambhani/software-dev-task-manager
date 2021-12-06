// Taken from https://tailwindcss.com/docs/dark-mode
// Sets application theme if it is found in local storage or user has previously set the theme
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}