document.addEventListener('DOMContentLoaded', () => {
    // Check if there's a current booking
    const currentBooking = JSON.parse(localStorage.getItem('currentBooking'));
    if (!currentBooking) {
        window.location.href = 'movies.html';
        return;
    }
    
    // Update booking info
    document.getElementById('bookingMovieTitle').textContent = currentBooking.movieTitle;
    document.getElementById('bookingTheater').textContent = currentBooking.theater;
    document.getElementById('bookingDate').textContent = formatDate(currentBooking.date);
    document.getElementById('bookingTime').textContent = currentBooking.time;
    
    // Generate seat map
    generateSeatMap();
    
    // Add event listener to proceed button
    document.getElementById('proceedToPayment').addEventListener('click', () => {
        // Store selected seats in booking
        currentBooking.seats = selectedSeats;
        currentBooking.totalPrice = calculateTotal();
        localStorage.setItem('currentBooking', JSON.stringify(currentBooking));
        
        // Redirect to payment page
        window.location.href = 'payment.html';
    });
});

// Variables to track selected seats
let selectedSeats = [];
const ticketPrice = 10;
const convenienceFee = 1.50;

// Function to generate seat map
function generateSeatMap() {
    const seatMap = document.getElementById('seatMap');
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    
    // Generate random occupied seats
    const occupiedSeats = generateRandomOccupiedSeats(rows.length, 10);
    
    // Create seats
    for (let i = 0; i < rows.length; i++) {
        for (let j = 1; j <= 10; j++) {
            const seatId = `${rows[i]}${j}`;
            const seatElement = document.createElement('div');
            seatElement.className = 'seat';
            seatElement.textContent = seatId;
            
            // Check if seat is occupied
            if (occupiedSeats.includes(seatId)) {
                seatElement.classList.add('occupied');
            } else {
                seatElement.classList.add('available');
                
                // Add click event to available seats
                seatElement.addEventListener('click', () => {
                    toggleSeatSelection(seatElement, seatId);
                });
            }
            
            seatMap.appendChild(seatElement);
        }
    }
}

// Function to toggle seat selection
function toggleSeatSelection(seatElement, seatId) {
    if (seatElement.classList.contains('selected')) {
        // Deselect seat
        seatElement.classList.remove('selected');
        seatElement.classList.add('available');
        selectedSeats = selectedSeats.filter(id => id !== seatId);
    } else {
        // Select seat
        seatElement.classList.remove('available');
        seatElement.classList.add('selected');
        selectedSeats.push(seatId);
    }
    
    // Update selection summary
    updateSelectionSummary();
}

// Function to update selection summary
function updateSelectionSummary() {
    const selectedSeatsText = document.getElementById('selectedSeatsText');
    const seatCount = document.getElementById('seatCount');
    const seatCountPrice = document.getElementById('seatCountPrice');
    const totalPrice = document.getElementById('totalPrice');
    const proceedButton = document.getElementById('proceedToPayment');
    
    if (selectedSeats.length > 0) {
        selectedSeatsText.textContent = selectedSeats.join(', ');
        seatCount.textContent = selectedSeats.length;
        seatCountPrice.textContent = selectedSeats.length;
        totalPrice.textContent = calculateTotal().toFixed(2);
        proceedButton.disabled = false;
    } else {
        selectedSeatsText.textContent = 'None';
        seatCount.textContent = '0';
        seatCountPrice.textContent = '0';
        totalPrice.textContent = '0.00';
        proceedButton.disabled = true;
    }
}

// Function to calculate total price
function calculateTotal() {
    return (selectedSeats.length * ticketPrice) + convenienceFee;
}

// Function to generate random occupied seats
function generateRandomOccupiedSeats(rows, cols) {
    const rowLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const occupiedSeats = [];
    const occupiedCount = Math.floor(Math.random() * (rows * cols * 0.3)); // Occupy up to 30% of seats
    
    for (let i = 0; i < occupiedCount; i++) {
        const row = rowLetters[Math.floor(Math.random() * rows)];
        const col = Math.floor(Math.random() * cols) + 1;
        const seatId = `${row}${col}`;
        
        if (!occupiedSeats.includes(seatId)) {
            occupiedSeats.push(seatId);
        }
    }
    
    return occupiedSeats;
}

// Function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}