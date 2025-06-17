/**
 * @file Script principal para interatividade da landing page.
 * @description Organiza e inicializa todos os módulos interativos da página,
 * como sliders, tabs, carrosséis e animações de scroll.
 */

// Aguarda o carregamento completo do DOM para executar os scripts com segurança.
document.addEventListener('DOMContentLoaded', () => {

    /**
     * Função principal que inicializa todos os módulos da página.
     */
    function main() {
        initAOS();
        initFeatureTabs();
        initTestimonialSlider();
        initCasesCarousel();
        initScrollFadeIn();
    }



    /**
     * Inicializa a biblioteca AOS (Animate On Scroll) para animações de entrada.
     */
    function initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 750,
                once: true,
                offset: 50
            });
        }
    }

    /**
     * Gerencia a lógica das abas (tabs) da seção de funcionalidades.
     * Troca o conteúdo visível com base no botão clicado.
     */
    function initFeatureTabs() {
        const menuItems = document.querySelectorAll('.feature-menu-item');
        if (!menuItems.length) return; // Encerra se não encontrar os elementos

        const featurePanes = document.querySelectorAll('.feature-pane');

        menuItems.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault();

                const targetId = item.dataset.target;
                const targetPane = document.getElementById(targetId);

                // Alterna a classe 'active' nos botões do menu
                menuItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                // Alterna a classe 'active' nos painéis de conteúdo
                featurePanes.forEach(pane => pane.classList.remove('active'));
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    }

    /**
     * Inicializa e controla o slider de depoimentos.
     * Inclui navegação por setas e pontos (dots).
     */
    function initTestimonialSlider() {
        const track = document.getElementById('testimonial-track');
        if (!track) return; // Encerra se o slider não existir na página

        const slides = Array.from(track.children);
        const slideCount = slides.length;
        const prevButton = document.getElementById('prev-testimonial');
        const nextButton = document.getElementById('next-testimonial');
        const dotsContainer = document.getElementById('testimonial-dots');
        let currentIndex = 0;

        // Função para mover o slider para um slide específico
        const goToSlide = (index) => {
            // Lógica para navegação em loop (volta para o início/fim)
            if (index < 0) index = slideCount - 1;
            else if (index >= slideCount) index = 0;

            track.style.transform = `translateX(-${index * 100}%)`;
            currentIndex = index;
            updateUI();
        };

        // Função para atualizar os indicadores visuais (pontos)
        const updateUI = () => {
            const dots = dotsContainer.querySelectorAll('.testimonial-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        };

        // Cria os pontos de navegação dinamicamente
        for (let i = 0; i < slideCount; i++) {
            const dot = document.createElement('button');
            dot.classList.add('testimonial-dot', 'w-3', 'h-3', 'bg-gray-300', 'rounded-full', 'transition-colors');
            dot.setAttribute('aria-label', `Ir para o depoimento ${i + 1}`);
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }

        // Adiciona os eventos de clique nas setas de navegação
        prevButton.addEventListener('click', () => goToSlide(currentIndex - 1));
        nextButton.addEventListener('click', () => goToSlide(currentIndex + 1));

        // Inicializa o slider no primeiro slide
        goToSlide(0);
    }

    /**
     * Inicializa o carrossel de cases de sucesso com navegação por botões.
     */
    function initCasesCarousel() {
        const carousel = document.getElementById('carousel-cases');
        if (!carousel) return; // Encerra se o carrossel não existir

        const btnLeft = document.getElementById('btn-left');
        const btnRight = document.getElementById('btn-right');
        const scrollAmount = 300; // Valor de rolagem em pixels

        btnLeft.addEventListener('click', () => {
            carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        btnRight.addEventListener('click', () => {
            carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }

    /**
     * Controla a animação de fade-in de uma seção quando ela se torna visível na tela.
     * Usa Intersection Observer para melhor performance.
     */
    function initScrollFadeIn() {
        const section = document.querySelector('.onboard-section');
        if (!section) return;

        const observerOptions = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.1 // Ativa quando 10% do elemento está visível
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    // Opcional: para de observar o elemento após a animação para economizar recursos
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        observer.observe(section);
    }

    // Inicia a execução de todos os módulos
    main();
});

  $(document).ready(function () {
      $('.image-wrapper').on('mouseenter', function () {
        $(this).find('.overlay').css('background', 'rgba(0, 123, 255, 0.2)');
      }).on('mouseleave', function () {
        $(this).find('.overlay').css('background', 'rgba(0, 0, 0, 0.15)');
      });
    });


