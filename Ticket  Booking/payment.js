document.addEventListener('DOMContentLoaded', () => {
    // Check if there's a current booking
    const currentBooking = JSON.parse(localStorage.getItem('currentBooking'));
    if (!currentBooking || !currentBooking.seats || currentBooking.seats.length === 0) {
        window.location.href = 'movies.html';
        return;
    }
    
    // Update booking info
    document.getElementById('bookingMovieTitle').textContent = currentBooking.movieTitle;
    document.getElementById('bookingTheater').textContent = currentBooking.theater;
    document.getElementById('bookingDate').textContent = formatDate(currentBooking.date);
    document.getElementById('bookingTime').textContent = currentBooking.time;
    document.getElementById('bookingSeats').textContent = currentBooking.seats.join(', ');
    
    // Update payment info
    document.getElementById('ticketCount').textContent = currentBooking.seats.length;
    document.getElementById('ticketTotal').textContent = (currentBooking.seats.length * 10).toFixed(2);
    document.getElementById('convenienceFee').textContent = '1.50';
    document.getElementById('totalAmount').textContent = currentBooking.totalPrice.toFixed(2);
    document.getElementById('payAmount').textContent = currentBooking.totalPrice.toFixed(2);
    
    // Add event listeners to payment tabs
    const paymentTabs = document.querySelectorAll('.payment-tab');
    paymentTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            paymentTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding tab content
            const tabId = tab.getAttribute('data-tab');
            document.querySelectorAll('.payment-tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`${tabId}Tab`).classList.add('active');
        });
    });
    
    // Add event listener to card payment form
    document.getElementById('cardPaymentForm').addEventListener('submit', processPayment);
    
    // Add event listeners to wallet options
    document.querySelectorAll('.wallet-option').forEach(option => {
        option.addEventListener('click', processPayment);
    });
});

// Function to process payment
function processPayment(e) {
    e.preventDefault();
    
    // In a real application, this would connect to a payment gateway
    // For this demo, we'll just simulate a successful payment
    
    // Get current booking
    const currentBooking = JSON.parse(localStorage.getItem('currentBooking'));
    
    // Generate a random booking ID
    const bookingId = 'SHOW' + Math.floor(Math.random() * 100000);
    
    // Update success modal with booking details
    document.getElementById('successMovieTitle').textContent = currentBooking.movieTitle;
    document.getElementById('successTheater').textContent = currentBooking.theater;
    document.getElementById('successDate').textContent = formatDate(currentBooking.date);
    document.getElementById('successTime').textContent = currentBooking.time;
    document.getElementById('successSeats').textContent = currentBooking.seats.join(', ');
    document.getElementById('bookingId').textContent = bookingId;
    
    // Store booking in user's history
    saveBookingToHistory(currentBooking, bookingId);
    
    // Clear current booking
    localStorage.removeItem('currentBooking');
    
    // Show success modal
    document.getElementById('paymentSuccessModal').style.display = 'block';
}

// Function to save booking to user's history
function saveBookingToHistory(booking, bookingId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    // Get user's booking history
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.email === currentUser.email);
    
    if (userIndex === -1) return;
    
    // Add booking to user's history
    if (!users[userIndex].bookings) {
        users[userIndex].bookings = [];
    }
    
    users[userIndex].bookings.push({
        ...booking,
        bookingId,
        bookingDate: new Date().toISOString()
    });
    
    // Update localStorage
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
}

// Function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}