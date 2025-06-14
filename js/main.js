// Inicializa a biblioteca de animação (Animate On Scroll)
AOS.init({ 
    duration: 750, 
    once: true, 
    offset: 50 
});

// Tabs - Seção de funcionalidades
const featureButtons = document.querySelectorAll('.feature-button');
const featureContents = document.querySelectorAll('.feature-content');

featureButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.dataset.target;

        featureButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        featureContents.forEach(content => {
            content.classList.remove('active');
        });

        setTimeout(() => {
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        }, 50);
    });
});

// Slider de depoimentos
const track = document.getElementById('testimonial-track');
if (track) {
    const slides = Array.from(track.children);
    const slideCount = slides.length;
    const prevButton = document.getElementById('prev-testimonial');
    const nextButton = document.getElementById('next-testimonial');
    const dotsContainer = document.getElementById('testimonial-dots');
    let currentIndex = 0;

    const createDots = () => {
        for (let i = 0; i < slideCount; i++) {
            const dot = document.createElement('button');
            dot.classList.add('testimonial-dot', 'w-3', 'h-3', 'bg-gray-300', 'rounded-full', 'transition-colors');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    };

    const updateUI = () => {
        dotsContainer.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    };

    const goToSlide = (index) => {
        if (index < 0) index = slideCount - 1;
        else if (index >= slideCount) index = 0;

        track.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;
        updateUI();
    };

    createDots();
    prevButton.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextButton.addEventListener('click', () => goToSlide(currentIndex + 1));
    goToSlide(0);
}

// Carrossel de Cases - Arrastar com o mouse (usando jQuery)
 window.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('carousel-cases');
    const btnLeft = document.getElementById('btn-left');
    const btnRight = document.getElementById('btn-right');

    const scrollAmount = 300;

    btnLeft.addEventListener('click', () => {
      carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    btnRight.addEventListener('click', () => {
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  });

  // Animação de fade-in ao aparecer
  document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('.onboard-section');
    section.style.opacity = 0;
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 1s ease, transform 1s ease';

    function checkVisibility() {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        section.classList.add('fade-in');
        section.style.opacity = 1;
        section.style.transform = 'translateY(0)';
        window.removeEventListener('scroll', checkVisibility);
      }
    }

    window.addEventListener('scroll', checkVisibility);
    checkVisibility();
  });