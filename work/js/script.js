const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.project-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('is-active'));
    button.classList.add('is-active');
    const activeFilter = button.dataset.filter;

    cards.forEach((card) => {
      const match = activeFilter === 'all' || card.dataset.filter === activeFilter;
      card.classList.toggle('is-hidden', !match);
    });
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
