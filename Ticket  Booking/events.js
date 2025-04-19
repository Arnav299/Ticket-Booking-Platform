document.addEventListener('DOMContentLoaded', () => {
    // Initialize event filters
    const genreFilter = document.getElementById('genreFilter');
    const dateFilter = document.getElementById('dateFilter');
    const applyFiltersBtn = document.getElementById('applyFilters');
    
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', filterEvents);
    }
    
    // Function to filter events
    function filterEvents() {
        const selectedGenre = genreFilter.value;
        const selectedDate = dateFilter.value;
        
        const eventCards = document.querySelectorAll('.movie-card');
        
        eventCards.forEach(card => {
            const genre = card.getAttribute('data-genre');
            let showCard = true;
            
            // Apply genre filter
            if (selectedGenre && genre !== selectedGenre) {
                showCard = false;
            }
            
            // Apply date filter (in a real app, this would be more sophisticated)
            // For this demo, we'll just simulate date filtering
            if (selectedDate) {
                const today = new Date();
                const tomorrow = new Date(today);
                tomorrow.setDate(tomorrow.getDate() + 1);
                
                // This is just a simulation - in a real app, you'd compare actual dates
                if (selectedDate === 'today' && card.id !== 'e1') {
                    showCard = false;
                } else if (selectedDate === 'tomorrow' && card.id !== 'e2') {
                    showCard = false;
                } else if (selectedDate === 'weekend' && !['e3', 'e4'].includes(card.id)) {
                    showCard = false;
                } else if (selectedDate === 'week' && !['e1', 'e2', 'e3', 'e4'].includes(card.id)) {
                    showCard = false;
                }
            }
            
            // Show or hide card
            if (showCard) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
});