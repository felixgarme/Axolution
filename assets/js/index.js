document.addEventListener("DOMContentLoaded", () => {

    // 1. Cargar la navbar dinámicamente
    fetch("/views/components/navbar.html")
        .then(res => res.text())
        .then(data => {
            const navbarContainer = document.getElementById("navbar-component");
            if (!navbarContainer) {
                console.warn("⚠️ No se encontró #navbar-component en index.html");
                return;
            }

            navbarContainer.innerHTML = data;

            // --- Ahora sí, los elementos existen ---
            const navbar = document.getElementById('navbar');
            const mobileMenu = document.querySelector('.mobile-menu');
            const navLinks = document.querySelector('.nav-links');

            if (navbar && mobileMenu && navLinks) {
                // Fondo dinámico en scroll
                window.addEventListener('scroll', () => {
                    if (window.scrollY > 50) {
                        navbar.style.background = 'rgba(28, 28, 28, 0.95)';
                    } else {
                        navbar.style.background = 'rgba(28, 28, 28, 0.9)';
                    }
                });

                // Toggle menú móvil
                mobileMenu.addEventListener('click', () => {
                    const isOpen = navLinks.style.display === 'flex';
                    navLinks.style.display = isOpen ? 'none' : 'flex';

                    if (!isOpen) {
                        navLinks.style.flexDirection = 'column';
                        navLinks.style.position = 'absolute';
                        navLinks.style.top = '100%';
                        navLinks.style.left = '0';
                        navLinks.style.width = '100%';
                        navLinks.style.background = 'rgba(28, 28, 28, 0.95)';
                        navLinks.style.padding = '1rem 0';
                        navLinks.style.backdropFilter = 'blur(10px)';
                    }
                });
            } else {
                console.warn("⚠️ No se encontró navbar o mobile-menu dentro de navbar.html");
            }
        })
        .catch(err => console.error("Error cargando navbar:", err));

    // 2. Smooth scrolling para anchors internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 3. Animaciones con IntersectionObserver
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });

    // 4. Parallax en elementos flotantes
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-element');
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.5;
            element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

});
