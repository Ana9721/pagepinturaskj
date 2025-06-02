
  src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js">
    

        // Menú hamburguesa
        document.addEventListener("DOMContentLoaded", function() {
            const toggle = document.getElementById("menu-toggle");
            const nav = document.getElementById("nav-menu");
            const links = nav.querySelectorAll("a");
        
            // Abrir/cerrar menú
            toggle.addEventListener("click", function() {
                nav.classList.toggle("active");
                toggle.classList.toggle("active");
            });
        
            // Cerrar menú al hacer clic en enlace
            links.forEach(link => {
                link.addEventListener("click", function() {
                    nav.classList.remove("active");
                    toggle.classList.remove("active");
                });
            });
        
            // Scroll suave
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });
        
           // Filtro de galería
            const filterButtons = document.querySelectorAll('.filter-btn');
            const artItems = document.querySelectorAll('.art-item');
        
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Cambiar botón activo
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
        
                    const filter = button.getAttribute('data-filter');
        
                    // Filtrar obras
                    artItems.forEach(item => {
                        if (filter === 'all' || item.getAttribute('data-category') === filter) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
            });
            // Lightbox
            const lightbox = document.getElementById('artLightbox');
            const lightboxImg = lightbox.querySelector('.lightbox-img');
            const lightboxTitle = lightbox.querySelector('h3');
            const lightboxDesc = lightbox.querySelector('.art-description');
            const lightboxDims = lightbox.querySelector('.art-dimensions');
            const lightboxPrice = lightbox.querySelector('.art-price');
            const closeBtn = lightbox.querySelector('.close-btn');
            const detailButtons = document.querySelectorAll('.ver-detalle');
        
            detailButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    lightboxImg.src = button.getAttribute('data-img');
                    lightboxTitle.textContent = button.getAttribute('data-title');
                    lightboxDesc.textContent = button.getAttribute('data-desc');
                    
                    // Obtener detalles adicionales del padre
                    const parentCard = button.closest('.art-overlay');
                    lightboxDims.textContent = parentCard.querySelector('p').textContent;
                    lightboxPrice.textContent = parentCard.querySelector('.art-price').textContent;
                    
                    lightbox.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                });
            });
        
            closeBtn.addEventListener('click', () => {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        
            // Cerrar lightbox al hacer clic fuera
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    lightbox.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        
            // Animación al hacer scroll
            const animateOnScroll = () => {
                const elements = document.querySelectorAll('.art-card, .artist-image, .artist-bio');
                
                elements.forEach(element => {
                    const elementPosition = element.getBoundingClientRect().top;
                    const screenPosition = window.innerHeight / 1.3;
                    
                    if (elementPosition < screenPosition) {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }
                });
            };
        
            // Estilos iniciales para animación
            document.querySelectorAll('.art-card, .artist-image, .artist-bio').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'all 0.6s ease';
            });
        
            window.addEventListener('scroll', animateOnScroll);
            animateOnScroll(); // Ejecutar al cargar
        
            // Efecto de escritura en el hero
            const heroTitle = document.querySelector('.hero h1');
            const originalText = heroTitle.textContent;
            heroTitle.textContent = '';
        
            let i = 0;
            const typeWriter = () => {
                if (i < originalText.length) {
                    heroTitle.textContent += originalText.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
        
            // Iniciar efecto después de 0.5s
            setTimeout(typeWriter, 500);
        
            // Cambiar header al hacer scroll
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    document.querySelector('header').style.padding = '10px 0';
                    document.querySelector('header').style.boxShadow = '0 2px 15px rgba(0,0,0,0.15)';
                } else {
                    document.querySelector('header').style.padding = '15px 0';
                    document.querySelector('header').style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                }
            });
        });


        

        // Inicialización del Swiper
        document.addEventListener('DOMContentLoaded', function() {
            const artSwiper = new Swiper('.art-swiper', {
                slidesPerView: 'auto',
                centeredSlides: true,
                spaceBetween: 20,
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    640: {
                        slidesPerView: 2,
                        centeredSlides: false,
                    },
                    1024: {
                        slidesPerView: 3,
                        centeredSlides: false,
                    }
                }
            });
            
            // Filtrado de obras (deberás adaptar esta función para que funcione con Swiper)
            const filterButtons = document.querySelectorAll('.filter-btn');
            
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remover clase active de todos los botones
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    // Agregar clase active al botón clickeado
                    button.classList.add('active');
                    
                    const filterValue = button.getAttribute('data-filter');
                    const slides = document.querySelectorAll('.swiper-slide');
                    
                    if (filterValue === 'all') {
                        slides.forEach(slide => {
                            slide.style.display = 'block';
                        });
                    } else {
                        slides.forEach(slide => {
                            if (slide.getAttribute('data-category') === filterValue) {
                                slide.style.display = 'block';
                            } else {
                                slide.style.display = 'none';
                            }
                        });
                    }
                    
                    // Actualizar Swiper después de filtrar
                    setTimeout(() => {
                        artSwiper.update();
                    }, 300);
                });
            });
            
            // Lightbox
            const lightbox = document.getElementById('artLightbox');
            const lightboxImg = lightbox.querySelector('.lightbox-img');
            const lightboxTitle = lightbox.querySelector('h3');
            const lightboxDesc = lightbox.querySelector('.art-description');
            const lightboxDims = lightbox.querySelector('.art-dimensions');
            const lightboxPrice = lightbox.querySelector('.art-price');
            const closeBtn = lightbox.querySelector('.close-btn');
            
            document.querySelectorAll('.ver-detalle').forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    lightboxImg.src = this.getAttribute('data-img');
                    lightboxTitle.textContent = this.getAttribute('data-title');
                    lightboxDesc.textContent = this.getAttribute('data-desc');
                    lightboxDims.textContent = this.parentElement.querySelector('p').textContent;
                    lightboxPrice.textContent = this.parentElement.querySelector('.art-price').textContent;
                    lightbox.style.display = 'flex';
                });
            });
            
            closeBtn.addEventListener('click', () => {
                lightbox.style.display = 'none';
            });
            
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    lightbox.style.display = 'none';
                }
            });
        });
