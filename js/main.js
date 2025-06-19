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


 const openBtn = document.getElementById("openVideo");
const closeBtn = document.getElementById("closeVideo");
const lightbox = document.getElementById("videoLightbox");
const iframe = document.getElementById("videoIframe");

const videoUrlBase = "https://www.youtube.com/embed/_-OkIOClkiE?si=HRQl8KU139pygAMQ";

openBtn.addEventListener("click", () => {
  lightbox.style.display = "flex";
  iframe.src = videoUrlBase + "&autoplay=1";
  document.body.style.overflow = "hidden"; // trava o fundo
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
  iframe.src = "";
  document.body.style.overflow = "auto"; // libera o fundo
});



 if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    }

    // Função para alternar entre light e dark mode
    function toggleTheme() {
        const html = document.documentElement;
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    }

        $(document).ready(function(){
        $('.press-carousel').slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            centerMode: true,
            variableWidth: true,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: false
        });
    });



    function protegerSectionPrecos() {
    const section = document.getElementById('precos');

    // Remove classes herdadas se existirem
    section.classList.remove('dark:bg-gray-900', 'dark', 'bg-gray-800');
    
    // Garante o fundo branco e textos escuros
    section.style.backgroundColor = '#ffffff'; // ou use uma classe
    section.querySelectorAll('*').forEach(el => {
      el.style.color = '';
      if (el.classList.contains('dark:text-white') || el.classList.contains('dark:text-gray-200')) {
        el.classList.remove('dark:text-white', 'dark:text-gray-200');
        el.classList.add('text-gray-800');
      }
    });
  }

  // Executa no carregamento
  document.addEventListener('DOMContentLoaded', () => {
    protegerSectionPrecos();
  });

  // Reexecuta sempre que o tema for trocado
  function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    html.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');

    // Protege a seção após a mudança de tema
    protegerSectionPrecos();

    // Se usar AOS
    if (typeof AOS !== 'undefined') AOS.refresh();
  }