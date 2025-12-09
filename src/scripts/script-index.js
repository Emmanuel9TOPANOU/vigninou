document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Logique d'activation du lien de navigation actif ---
    const currentPage = window.location.pathname.split("/").pop() || "index.html"; // Ajout de "index.html" comme défaut
    const links = document.querySelectorAll(".nav-link");

    links.forEach(link => {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.remove("text-gray-700");
            link.classList.add("text-blue-400", "font-semibold");
        }
    });


    // --- 2. Logique du bouton "Scroll To Top" ---
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const scrollThreshold = 300; 

    function toggleScrollToTopButton() {
        if (!scrollToTopBtn) return; 
        if (window.scrollY > scrollThreshold) {
            scrollToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
            scrollToTopBtn.classList.add('opacity-100');
        } else {
            scrollToTopBtn.classList.remove('opacity-100');
            scrollToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        }
    }
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
             window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        window.addEventListener('scroll', toggleScrollToTopButton);
        toggleScrollToTopButton();
    }


    // --- 3. Logique du "Sticky Header" ---
    const infoBar = document.getElementById('header-info-bar');
    const navbar = document.getElementById('main-navbar');
    
    if (infoBar && navbar) {
        // La hauteur de la barre d'info doit être calculée après le chargement du DOM
        let infoBarHeight = infoBar.offsetHeight; 
        let lastScrollTop = 0; 
        const scrollThreshold = 100; 
        
        // S'assurer que la hauteur est mise à jour en cas de redimensionnement
        window.addEventListener('resize', () => {
            infoBarHeight = infoBar.offsetHeight;
        });

        window.addEventListener('scroll', function() {
            let currentScroll = window.scrollY || document.documentElement.scrollTop;

            if (currentScroll > infoBarHeight) {
                // SCROLL VERS LE BAS ou au-delà de la barre d'info
                navbar.classList.add('fixed', 'top-0', 'z-40', 'shadow-lg'); 
                
                if (currentScroll > lastScrollTop && currentScroll > scrollThreshold) {
                    // Scroll Down: Cacher la barre d'info
                    infoBar.style.transform = `translateY(-${infoBarHeight}px)`;
                    infoBar.style.opacity = '0';
                } else {
                    // Scroll Up: Montrer la barre d'info
                    infoBar.style.transform = 'translateY(0)';
                    infoBar.style.opacity = '1';
                }
            } else {
                // EN HAUT DE PAGE
                navbar.classList.remove('fixed', 'top-0', 'z-40', 'shadow-lg');
                infoBar.style.transform = 'translateY(0)';
                infoBar.style.opacity = '1';
            }

            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        });
    }


    // --- 4. Logique de la SIDEBAR (Menu Burger) ---
    const openButton = document.getElementById('mobile-menu-button');
    const closeButton = document.getElementById('close-sidebar-button');
    const sidebar = document.getElementById('mobile-sidebar');
    const overlay = document.getElementById('sidebar-overlay'); // Assurez-vous d'avoir ajouté l'Overlay en HTML

    // Fonction pour ouvrir la sidebar
    function openSidebar() {
        sidebar.classList.remove('translate-x-full'); 
        if (overlay) overlay.classList.remove('hidden'); 
        openButton.setAttribute('aria-expanded', 'true');
    }

    // Fonction pour fermer la sidebar
    function closeSidebar() {
        sidebar.classList.add('translate-x-full'); 
        if (overlay) overlay.classList.add('hidden');
        openButton.setAttribute('aria-expanded', 'false');
    }

    // Écouteurs d'événements
    if (openButton && sidebar) {
        openButton.addEventListener('click', openSidebar);
    }

    if (closeButton && sidebar) {
        closeButton.addEventListener('click', closeSidebar);
    }
    
    // Fermer si l'utilisateur clique sur l'overlay (très important pour l'UX mobile)
    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }
    
    // Fermer si l'utilisateur clique sur un lien de la sidebar
    if (sidebar) {
        const sidebarLinks = sidebar.querySelectorAll('a');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', closeSidebar);
        });
    }


    // --- 5. Logique du Carousel (Témoignages) ---
    const track = document.getElementById('carousel-track');
    const btnLeft = document.getElementById('btn-left');
    const btnRight = document.getElementById('btn-right');
    const items = document.querySelectorAll('.carousel-item');

    if (track && btnLeft && btnRight && items.length > 0) {
        let currentIndex = 0;

        const getItemsPerView = () => {
            if (window.innerWidth >= 1024) return 3;
            if (window.innerWidth >= 768) return 2;
            return 1;
        };

        const updateCarousel = () => {
            const itemsPerView = getItemsPerView();
            // Utiliser la largeur du conteneur parent du item si possible pour la fiabilité
            const containerWidth = track.parentElement.offsetWidth;
            const itemWidth = containerWidth / itemsPerView; 
            
            // Appliquer la transformation en fonction de l'index et de la largeur de l'élément affiché
            track.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
            track.style.display = 'grid'; // S'assurer que le grid est maintenu
            track.style.gridTemplateColumns = `repeat(${items.length}, 1fr)`; // S'assurer que tous les items sont en place

            btnLeft.disabled = currentIndex === 0;
            btnRight.disabled = currentIndex >= items.length - itemsPerView;
        };

        btnRight.addEventListener('click', () => {
            const itemsPerView = getItemsPerView();
            if (currentIndex < items.length - itemsPerView) {
                currentIndex++;
                updateCarousel();
            }
        });

        btnLeft.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        window.addEventListener('resize', () => {
            // Remettre à l'index 0 au redimensionnement pour éviter les débordements
            currentIndex = 0; 
            updateCarousel();
        });

        updateCarousel(); // Appel initial
    }

    // --- 6. Initialisation AOS (Animation on Scroll) ---
    AOS.init();
});