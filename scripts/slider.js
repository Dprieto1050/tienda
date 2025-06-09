document.addEventListener('DOMContentLoaded', function() {
    const slides = document.getElementById('slides');
    const totalSlides = slides.children.length;
    let index = 0;
    let slideInterval;

    function showSlide(i) {
        index = (i + totalSlides) % totalSlides;
        slides.style.transform = `translateX(-${index * 100}%)`;
    }

    function startSlider() {
        slideInterval = setInterval(() => {
            showSlide(index + 1);
        }, 5000);
    }

    function stopSlider() {
        clearInterval(slideInterval);
    }

    // Botones prev/next
    document.getElementById('next').addEventListener('click', function() {
        stopSlider();
        showSlide(index + 1);
        startSlider();
    });

    document.getElementById('prev').addEventListener('click', function() {
        stopSlider();
        showSlide(index - 1);
        startSlider();
    });

    // Pausar al interactuar
    slides.addEventListener('mouseenter', stopSlider);
    slides.addEventListener('mouseleave', startSlider);

    // Iniciar slider
    showSlide(index);
    startSlider();

    // Ajustar altura en carga y resize
    function adjustSliderHeight() {
        const slider = document.querySelector('.slider');
        const width = slider.offsetWidth;
        // Puedes ajustar esto según tus necesidades
        if (window.innerWidth < 480) {
            slider.style.height = `${width}px`; // 1:1
        } else if (window.innerWidth < 768) {
            slider.style.height = `${width * 0.75}px`; // 4:3
        } else {
            slider.style.height = `${width * 0.5625}px`; // 16:9
        }
    }

    window.addEventListener('load', adjustSliderHeight);
    window.addEventListener('resize', adjustSliderHeight);
});