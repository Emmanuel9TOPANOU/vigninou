
    const buttons = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll("[data-category]");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const filter = btn.dataset.filter;

            // Reset styles
            buttons.forEach(b => {
                b.classList.remove("bg-blue-600", "text-white");
                b.classList.add("bg-gray-200", "text-gray-700");
            });

            // Activate selected button
            btn.classList.add("bg-blue-600", "text-white");
            btn.classList.remove("bg-gray-200", "text-gray-700");

            // Filter cards
            cards.forEach(card => {
                if (filter === "all" || card.dataset.category === filter) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });



    // Fonction de filtrage réutilisée
    function filterCards(category) {
        const cards = document.querySelectorAll('[data-category]');

        cards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');

            if (cardCategory === category) {
                card.classList.remove('hidden');
                card.style.display = 'block'; 
            } else {
                card.classList.add('hidden');
                card.style.display = 'none'; 
            }
        });
        
        // Défile vers la section des cartes après le filtrage
        const cardSection = document.querySelector('.grid.gap-6');
        if (cardSection) {
            cardSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Fonction principale exécutée au chargement de la page
    document.addEventListener('DOMContentLoaded', () => {
        // 1. Lire les paramètres d'URL (query parameters)
        const urlParams = new URLSearchParams(window.location.search);
        const filterCategory = urlParams.get('filter'); // Récupère la valeur de ?filter=...

        if (filterCategory) {
            // 2. Si un filtre est trouvé, appliquer le filtrage
            filterCards(filterCategory);
        }
        // Si aucun filtre n'est présent (l'utilisateur arrive normalement sur la page), 
        // toutes les cartes sont visibles par défaut (pas besoin de masquer).
    });







  