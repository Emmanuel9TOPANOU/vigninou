function filterCards(category) {
    // 1. Récupère toutes les cartes de la page
    const cards = document.querySelectorAll('[data-category]');

    // 2. Vérifie s'il y a des cartes à filtrer
    if (cards.length === 0) {
        console.log("Aucune carte trouvée pour le filtrage.");
        // Si vous voulez aussi défiler vers le haut de la zone, activez cette ligne :
        // window.scrollTo(0, 0); 
        return;
    }

    // 3. Parcourt et filtre les cartes
    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (cardCategory === category) {
            // Affiche la carte correspondante
            card.classList.remove('hidden');
            card.style.display = 'block'; 
        } else {
            // Masque les autres cartes
            card.classList.add('hidden');
            card.style.display = 'none'; 
        }
    });

    // 4. Défile jusqu'à la section des cartes pour montrer immédiatement le résultat
    const cardSection = document.querySelector('.grid.gap-6');
    if (cardSection) {
        cardSection.scrollIntoView({ behavior: 'smooth' });
    }
}