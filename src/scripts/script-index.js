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

        window.addEventListener('scroll', function () {
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

    
    const track = document.getElementById("carousel-track");
    const items = document.querySelectorAll(".carousel-item");
    const btnLeft = document.getElementById("btn-left");
    const btnRight = document.getElementById("btn-right");

    let index = 0;

    function updateCarousel() {
        // En mode MD et plus grand, le conteneur carrousel (w-2/3) doit être translaté en fonction de la largeur de l'élément (w-1/2)
        // La largeur de l'élément carousel-item est de 50% du conteneur parent (w-2/3) + le padding/marge de 16px.
        if (window.innerWidth >= 768) {
            // Sur un écran MD, chaque élément fait environ 50% de la largeur du conteneur (w-2/3)
            // itemWidth = (largeur de la carte blanche) + (marge/padding)
            const parentWidth = track.parentElement.offsetWidth;
            // items[0].offsetWidth prend en compte la largeur de l'item (w-1/2 du parent) + le padding p-2
            const itemWidth = items[0].offsetWidth + 16; 
            track.style.transform = `translateX(-${index * itemWidth}px)`;
        } else {
            // Sur mobile (full width), l'élément fait 100% de la largeur du conteneur
            const itemWidth = items[0].offsetWidth + 16;
            track.style.transform = `translateX(-${index * itemWidth}px)`;
        }
        
        // La logique d'index doit également être ajustée si vous passez à un carrousel qui affiche plusieurs éléments à la fois sur MD
        // Pour l'instant, je garde la logique d'incrémentation simple.
    }

    btnRight.addEventListener("click", () => {
        // Logique pour éviter que l'index ne dépasse le nombre d'éléments disponibles pour le défilement
        const maxIndex = items.length - (window.innerWidth >= 768 ? 1 : 1); // Laisser le dernier élément visible à droite (si 3 cartes, maxIndex = 3 - 2 = 1)

        if (index < maxIndex) index++;
        updateCarousel();
    });

    btnLeft.addEventListener("click", () => {
        if (index > 0) index--;
        updateCarousel();
    });

    // Initialisation et ajustement en cas de redimensionnement
    window.addEventListener("resize", updateCarousel);
    updateCarousel(); // Appel initial pour positionner correctement

   

    // --- 6. Initialisation AOS (Animation on Scroll) ---
    AOS.init();
});


