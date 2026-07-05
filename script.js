// Smooth-scroll fallback for browsers without native support, and
// a simple placeholder handler for the quote CTA buttons.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#quote"]').forEach((el) => {
    el.addEventListener('click', () => {
      console.log('Quote CTA clicked - hook this up to a form or booking flow.');
    });
  });
});
