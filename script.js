const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const scrollSection = document.querySelector('.highlights-section');
const highlightCards = document.querySelectorAll('.reveal-on-scroll');

function updateScrollCards() {
  if (!scrollSection) return;

  const rect = scrollSection.getBoundingClientRect();
  const scrollable = rect.height - window.innerHeight;
  const progress = scrollable > 0 ? clamp(-rect.top / scrollable, 0, 1) : 0;
  const thresholds = [0.12, 0.42, 0.72];

  highlightCards.forEach((card, index) => {
    card.classList.toggle('is-visible', progress >= thresholds[index]);
  });
}

window.addEventListener('scroll', updateScrollCards, { passive: true });
window.addEventListener('resize', updateScrollCards);
updateScrollCards();
