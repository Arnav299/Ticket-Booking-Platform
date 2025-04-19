// DOM Elements
const userSection = document.getElementById('userSection');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const showRegisterLink = document.getElementById('showRegister');
const showLoginLink = document.getElementById('showLogin');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const closeButtons = document.querySelectorAll('.close');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

// Initialize user state
let isLoggedIn = false;
let currentUser = null;

// Check if user is logged in from localStorage
function checkLoginStatus() {
    const user = localStorage.getItem('currentUser');
    if (user) {
        currentUser = JSON.parse(user);
        isLoggedIn = true;
        userSection.textContent = currentUser.name;
    }
}

// Event Listeners
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

if (userSection) {
    userSection.addEventListener('click', (e) => {
        e.preventDefault();
        if (isLoggedIn) {
            // Show user menu or profile
            if (confirm('Do you want to log out?')) {
                logout();
            }
        } else {
            // Show login modal
            loginModal.style.display = 'block';
        }
    });
}

if (showRegisterLink) {
    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'none';
        registerModal.style.display = 'block';
    });
}

if (showLoginLink) {
    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerModal.style.display = 'none';
        loginModal.style.display = 'block';
    });
}

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        loginModal.style.display = 'none';
        registerModal.style.display = 'none';
        if (document.getElementById('paymentSuccessModal')) {
            document.getElementById('paymentSuccessModal').style.display = 'none';
        }
    });
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
    if (e.target === registerModal) {
        registerModal.style.display = 'none';
    }
    if (document.getElementById('paymentSuccessModal') && e.target === document.getElementById('paymentSuccessModal')) {
        document.getElementById('paymentSuccessModal').style.display = 'none';
    }
});

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Check if user exists in localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            login(user);
            loginModal.style.display = 'none';
        } else {
            alert('Invalid email or password');
        }
    });
}

if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        // Check if user already exists
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some(u => u.email === email)) {
            alert('User with this email already exists');
            return;
        }
        
        // Add new user
        const newUser = { name, email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Log in the new user
        login(newUser);
        registerModal.style.display = 'none';
    });
}

// Login function
function login(user) {
    currentUser = user;
    isLoggedIn = true;
    localStorage.setItem('currentUser', JSON.stringify(user));
    userSection.textContent = user.name;
}

// Logout function
function logout() {
    currentUser = null;
    isLoggedIn = false;
    localStorage.removeItem('currentUser');
    userSection.textContent = 'Sign In';
}

// Initialize movie data if not exists
function initializeMovieData() {
    if (!localStorage.getItem('movies')) {
        const movies = [
            {
                id: 1,
                title: 'Interstellar',
                genre: 'Sci-Fi/Adventure',
                language: 'English',
                duration: '2h 49m',
                rating: 4.0,
                description: 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.',
                cast: 'Matthew McConaughey, Anne Hathaway, Jessica Chastain',
                poster: 'https://via.placeholder.com/300x450'
            },
            {
                id: 2,
                title: 'The Dark Knight',
                genre: 'Action/Drama',
                language: 'English',
                duration: '2h 32m',
                rating: 4.9,
                description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
                cast: 'Christian Bale, Heath Ledger, Aaron Eckhart',
                poster: 'https://via.placeholder.com/300x450'
            },
            {
                id: 3,
                title: 'Inception',
                genre: 'Sci-Fi/Action',
                language: 'English',
                duration: '2h 28m',
                rating: 4.2,
                description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
                cast: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page',
                poster: 'https://via.placeholder.com/300x450'
            },
            {
                id: 4,
                title: 'Dune',
                genre: 'Sci-Fi/Adventure',
                language: 'English',
                duration: '2h 35m',
                rating: 4.1,
                description: 'Feature adaptation of Frank Herbert\'s science fiction novel, about the son of a noble family entrusted with the protection of the most valuable asset and most vital element in the galaxy.',
                cast: 'Timothée Chalamet, Rebecca Ferguson, Zendaya',
                poster: 'https://via.placeholder.com/300x450'
            },
            {
                id: 5,
                title: 'The Hangover',
                genre: 'Comedy',
                language: 'English',
                duration: '1h 40m',
                rating: 4.0,
                description: 'Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing. They make their way around the city in order to find their friend before his wedding.',
                cast: 'Zach Galifianakis, Bradley Cooper, Justin Bartha',
                poster: 'https://via.placeholder.com/300x450'
            },
            {
                id: 6,
                title: 'The Shawshank Redemption',
                genre: 'Drama',
                language: 'English',
                duration: '2h 22m',
                rating: 4.8,
                description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
                cast: 'Tim Robbins, Morgan Freeman, Bob Gunton',
                poster: 'https://via.placeholder.com/300x450'
            },
            {
                id: 7,
                title: 'Pathaan',
                genre: 'Action/Thriller',
                language: 'Hindi',
                duration: '2h 26m',
                rating: 4.0,
                description: 'An Indian spy takes on the leader of a group of mercenaries who have nefarious plans to target his homeland.',
                cast: 'Shah Rukh Khan, Deepika Padukone, John Abraham',
                poster: 'https://via.placeholder.com/300x450'
            },
            {
                id: 8,
                title: 'La Familia Perfecta',
                genre: 'Comedy',
                language: 'Spanish',
                duration: '1h 49m',
                rating: 3.5,
                description: 'A controlling mother faces her worst nightmare when her son announces his engagement to a woman from a family she considers lower class.',
                cast: 'Belén Rueda, José Coronado, Gonzalo de Castro',
                poster: 'https://via.placeholder.com/300x450'
            }
        ];
        
        localStorage.setItem('movies', JSON.stringify(movies));
    }
}

// Initialize event data if not exists
function initializeEventData() {
    if (!localStorage.getItem('events')) {
        const events = [
            {
                id: 'e1',
                title: 'Rock Concert',
                genre: 'Music',
                date: '2023-07-25',
                time: '8:00 PM',
                venue: 'City Arena',
                description: 'Experience the ultimate rock concert with performances by top bands.',
                poster: 'https://via.placeholder.com/300x450'
            },
            {
                id: 'e2',
                title: 'Comedy Night',
                genre: 'Stand-up Comedy',
                date: '2023-07-28',
                time: '7:30 PM',
                venue: 'Laugh Factory',
                description: 'A night of laughter with the best stand-up comedians in town.',
                poster: 'https://via.placeholder.com/300x450'
            }
        ];
        
        localStorage.setItem('events', JSON.stringify(events));
    }
}

// Initialize data
window.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
    initializeMovieData();
    initializeEventData();
});