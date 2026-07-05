// Smooth-scroll fallback for browsers without native support, and
// a simple placeholder handler for the quote CTA buttons.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#quote"]').forEach((el) => {
    el.addEventListener('click', () => {
      console.log('Quote CTA clicked - hook this up to a form or booking flow.');
    });
  });

  const quoteForm = document.getElementById('quote-form');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (event) => {
      event.preventDefault();
      alert('Thanks! This is a demo form, so nothing was actually submitted.');
    });
  }

  // Reveal elements as they scroll into view.
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback: show everything immediately.
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // Add a subtle shadow to the header once the page is scrolled.
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
});
