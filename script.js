document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');

  const setNav = (open) => {
    if (!header || !navToggle) return;
    header.classList.toggle('nav-open', open);
    document.body.classList.toggle('nav-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };

  navToggle?.addEventListener('click', () => setNav(!header.classList.contains('nav-open')));
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setNav(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setNav(false);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 980) setNav(false);
  }, { passive: true });

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          instance.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px' });
    reveals.forEach((item) => observer.observe(item));
  } else {
    reveals.forEach((item) => item.classList.add('is-visible'));
  }

  const finder = document.querySelector('#spa-finder');
  if (finder) {
    finder.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(finder);
      const people = data.get('people');
      const space = data.get('space');
      const goal = data.get('goal');
      let slug = 'harbor-5';
      let name = 'Harbor 5';
      let reason = 'Its balanced footprint, five-person seating and efficient daily operation make it the most versatile match.';

      if (people === 'two' || space === 'compact') {
        slug = 'tidewater-2';
        name = 'Tidewater 2';
        reason = 'Its compact footprint and two deep therapy seats create a private retreat without asking for a large site.';
      } else if (people === 'seven' || goal === 'entertain') {
        slug = 'driftline-7';
        name = 'Driftline 7';
        reason = 'Its seven-seat layout, dual pumps and broad therapy coverage suit larger households and frequent entertaining.';
      }

      const result = finder.querySelector('.finder-result');
      result.querySelector('[data-result-name]').textContent = name;
      result.querySelector('[data-result-reason]').textContent = reason;
      result.querySelector('[data-result-link]').href = `${slug}.html`;
      result.querySelector('[data-quote-link]').href = `pricing.html?model=${slug}`;
      result.classList.add('is-visible');
      result.focus();
    });
  }

  const filters = document.querySelectorAll('[data-filter]');
  const filterCards = document.querySelectorAll('[data-categories]');
  filters.forEach((button) => {
    button.addEventListener('click', () => {
      const value = button.dataset.filter;
      filters.forEach((item) => item.classList.toggle('is-active', item === button));
      filters.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
      filterCards.forEach((card) => {
        const categories = card.dataset.categories.split(' ');
        card.hidden = value !== 'all' && !categories.includes(value);
      });
    });
  });

  const form = document.querySelector('#consultation-form');
  if (form) {
    const steps = [...form.querySelectorAll('.form-step')];
    const progress = [...form.querySelectorAll('.form-progress span')];
    let current = 0;

    const params = new URLSearchParams(window.location.search);
    const requestedModel = params.get('model');
    const modelSelect = form.querySelector('[name="model"]');
    if (requestedModel && modelSelect && [...modelSelect.options].some((option) => option.value === requestedModel)) {
      modelSelect.value = requestedModel;
    }

    const showStep = (index) => {
      current = index;
      steps.forEach((step, stepIndex) => step.classList.toggle('is-active', stepIndex === current));
      progress.forEach((item, itemIndex) => item.classList.toggle('is-active', itemIndex <= current));
      steps[current]?.querySelector('legend')?.focus?.();
    };

    form.querySelectorAll('[data-next]').forEach((button) => button.addEventListener('click', () => {
      const inputs = [...steps[current].querySelectorAll('input, select, textarea')];
      if (inputs.every((input) => input.reportValidity())) showStep(Math.min(current + 1, steps.length - 1));
    }));
    form.querySelectorAll('[data-back]').forEach((button) => button.addEventListener('click', () => showStep(Math.max(current - 1, 0))));
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      form.querySelector('.form-progress').hidden = true;
      steps.forEach((step) => step.classList.remove('is-active'));
      const success = form.querySelector('.form-success');
      success.classList.add('is-visible');
      success.focus();
    });
  }

  document.querySelectorAll('[data-year]').forEach((item) => { item.textContent = new Date().getFullYear(); });
});
