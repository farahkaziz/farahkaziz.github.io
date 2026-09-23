(() => {
  'use strict';

  const menuToggle = document.querySelector('.menu-toggle');
  const siteMenu = document.querySelector('.site-menu');
  const navigationLinks = [...document.querySelectorAll('.site-menu a')];
  const backToTop = document.querySelector('.back-to-top');
  const sections = [...document.querySelectorAll('main section[id]')];
  const themeToggle = document.querySelector('.theme-toggle');
  const themeIcon = themeToggle?.querySelector('.theme-icon');
  const storedTheme = localStorage.getItem('theme');

  const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    const isDark = theme === 'dark';
    themeToggle?.setAttribute('aria-pressed', String(isDark));
    themeToggle?.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    themeToggle?.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    if (themeIcon) themeIcon.innerHTML = isDark ? '&#9728;' : '&#9790;';
  };

  const initialTheme = storedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(initialTheme);

  themeToggle?.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', nextTheme);
    applyTheme(nextTheme);
  });

  const closeMenu = () => {
    siteMenu.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
  };

  menuToggle?.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
    siteMenu.classList.toggle('is-open', !isOpen);
  });

  navigationLinks.forEach((link) => link.addEventListener('click', closeMenu));

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const updateNavigation = () => {
    const scrollPosition = window.scrollY + 140;
    let activeId = '';
    sections.forEach((section) => {
      if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) activeId = section.id;
    });
    navigationLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`));
    backToTop.classList.toggle('visible', window.scrollY > 500);
  };
  window.addEventListener('scroll', updateNavigation, { passive: true });
  updateNavigation();

  const form = document.querySelector('.contact-form');
  const submitButton = form?.querySelector('button[type="submit"]');
  const fields = {
    name: { input: document.querySelector('#name'), error: document.querySelector('#name-error'), message: 'Please enter your name.' },
    email: { input: document.querySelector('#email'), error: document.querySelector('#email-error'), message: 'Please enter a valid email address.' },
    message: { input: document.querySelector('#message'), error: document.querySelector('#message-error'), message: 'Please enter a message.' }
  };

  const validateField = (fieldName) => {
    const field = fields[fieldName];
    const value = field.input.value.trim();
    const isEmail = fieldName === 'email';
    const valid = value && (!isEmail || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
    field.input.parentElement.classList.toggle('invalid', !valid);
    field.input.setAttribute('aria-invalid', String(!valid));
    field.error.textContent = valid ? '' : field.message;
    return Boolean(valid);
  };

  Object.keys(fields).forEach((fieldName) => fields[fieldName].input.addEventListener('blur', () => validateField(fieldName)));
  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const isValid = Object.keys(fields).every(validateField);
    const status = form.querySelector('.form-status');
    if (!isValid) {
      status.textContent = 'Please check the highlighted fields.';
      return;
    }

    submitButton.disabled = true;
    submitButton.setAttribute('aria-busy', 'true');
    submitButton.textContent = 'Sending...';
    status.textContent = '';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error('Form submission failed');

      form.reset();
      Object.values(fields).forEach(({ input, error }) => {
        input.removeAttribute('aria-invalid');
        input.parentElement.classList.remove('invalid');
        error.textContent = '';
      });
      status.textContent = 'Message sent successfully.';
    } catch (error) {
      status.textContent = 'Something went wrong. Please try again.';
    } finally {
      submitButton.disabled = false;
      submitButton.removeAttribute('aria-busy');
      submitButton.innerHTML = 'Send message <span aria-hidden="true">&#8599;</span>';
    }
  });

  document.addEventListener('contextmenu', (event) => event.preventDefault());
  document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && ['i', 'j'].includes(key)) || (event.ctrlKey && key === 'u')) event.preventDefault();
  });
})();
