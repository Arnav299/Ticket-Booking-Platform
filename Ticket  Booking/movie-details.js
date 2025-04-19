document.addEventListener('DOMContentLoaded', () => {
    // Get movie ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = parseInt(urlParams.get('id'));
    
    if (!movieId) {
        window.location.href = 'movies.html';
        return;
    }
    
    // Get movie data from localStorage
    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    const movie = movies.find(m => m.id === movieId);
    
    if (!movie) {
        window.location.href = 'movies.html';
        return;
    }
    
    // Update page with movie details
    document.title = `${movie.title} - ShowTime`;
    document.getElementById('movieTitle').textContent = movie.title;
    document.getElementById('movieGenre').textContent = movie.genre;
    document.getElementById('movieDuration').textContent = movie.duration;
    document.getElementById('movieLanguage').textContent = movie.language;
    document.getElementById('movieRating').innerHTML = getStarRating(movie.rating);
    document.getElementById('movieRatingValue').textContent = `${movie.rating}/5`;
    document.getElementById('movieDescription').textContent = movie.description;
    document.getElementById('movieCast').textContent = movie.cast;
    document.getElementById('moviePoster').src = movie.poster;
    document.getElementById('moviePoster').alt = movie.title;
    
    // Add event listeners to date buttons
    const dateButtons = document.querySelectorAll('.date-btn');
    dateButtons.forEach(button => {
        button.addEventListener('click', () => {
            dateButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
    
    // Add event listeners to time buttons
    const timeButtons = document.querySelectorAll('.time-btn');
    timeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Check if user is logged in
            const currentUser = localStorage.getItem('currentUser');
            if (!currentUser) {
                alert('Please sign in to book tickets');
                document.getElementById('loginModal').style.display = 'block';
                return;
            }
            
            // Store booking details in localStorage
            const booking = {
                movieId: movie.id,
                movieTitle: movie.title,
                theater: button.getAttribute('data-theater'),
                date: document.querySelector('.date-btn.active').getAttribute('data-date'),
                time: button.getAttribute('data-time')
            };
            
            localStorage.setItem('currentBooking', JSON.stringify(booking));
            
            // Redirect to seat selection page
            window.location.href = 'seat-selection.html';
        });
    });
});

// Function to generate star rating HTML
function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '★';
    }
    
    // Add half star if needed
    if (halfStar) {
        starsHTML += '★';
    }
    
    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '☆';
    }
    
    return starsHTML;
}