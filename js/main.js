// Inicializa a biblioteca de animação (Animate On Scroll)
AOS.init({ 
    duration: 750, 
    once: true, 
    offset: 50 
});

// Lógica para a seção de funcionalidades (Tabs)
const featureButtons = document.querySelectorAll('.feature-button');
const featureContents = document.querySelectorAll('.feature-content');
featureButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.dataset.target;
        featureButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        featureContents.forEach(content => {
            if(content.classList.contains('active')) {
               content.classList.remove('active');
            }
            if (content.id === targetId) {
               // Adiciona um pequeno delay para a animação de fade-in funcionar na troca
               setTimeout(() => content.classList.add('active'), 50);
            }
        });
    });
});

// Lógica para o slider de depoimentos
const track = document.getElementById('testimonial-track');
if (track) {
    const slides = Array.from(track.children);
    const slideCount = slides.length;
    const prevButton = document.getElementById('prev-testimonial');
    const nextButton = document.getElementById('next-testimonial');
    const dotsContainer = document.getElementById('testimonial-dots');
    let currentIndex = 0;

    for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('button');
        dot.classList.add('testimonial-dot', 'w-3', 'h-3', 'bg-gray-300', 'rounded-full', 'transition-colors');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    const dots = Array.from(dotsContainer.children);

    const goToSlide = (index) => {
        if (index < 0) index = slideCount - 1;
        else if (index >= slideCount) index = 0;
        
        track.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;
        updateUI();
    };

    const updateUI = () => {
        dots.forEach((dot, index) => dot.classList.toggle('active', index === currentIndex));
    };

    prevButton.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextButton.addEventListener('click', () => goToSlide(currentIndex + 1));
    
    goToSlide(0);
}
