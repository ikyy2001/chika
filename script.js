let currentSlide = 1;
const totalSlides = 7;
let isMusicPlaying = false;
let confettiInterval;
let heartInterval;
let musicAttempted = false;

// Initialize when document is loaded
document.addEventListener("DOMContentLoaded", function() {
    updateProgressBar();
    createBubbles();
    createHearts();
    
    // Add animation to final heart
    setTimeout(() => {
        document.getElementById('final-heart').classList.add('active');
    }, 500);
    
    // Initialize music player with proper event listeners
    const musicBtn = document.querySelector('.music-player');
    const musicIcon = document.getElementById('music-icon');
    const bgMusic = document.getElementById('bgMusic');
    
    // Add message for user to know they can click for music
    musicIcon.classList.add('fa-music');
    musicBtn.title = "Klik untuk memainkan musik";
    
    // Listen for user interaction to enable music
    musicBtn.addEventListener('click', function() {
        toggleMusic();
    });
    
    // Add error event listener
    bgMusic.addEventListener('error', function(e) {
        console.error('Audio error:', e);
        alert('Musik tidak dapat dimainkan. File mungkin tidak ditemukan atau format tidak didukung.');
        musicIcon.classList.remove('fa-volume-up');
        musicIcon.classList.add('fa-music-slash');
    });
});

// Create floating hearts
function createHearts() {
    heartInterval = setInterval(() => {
        const heart = document.createElement('div');
        heart.className = Math.random() > 0.7 ? 'heart' : 'heart mini';
        
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = Math.random() * 100 + 'vh';
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        heart.style.animation = `float ${Math.random() * 5 + 3}s linear forwards`;
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 8000);
    }, 300);
}

// Create bubbles
function createBubbles() {
    const bubblesContainer = document.getElementById('bubbles-container');
    
    for (let i = 0; i < 20; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        const size = Math.random() * 60 + 20;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.opacity = Math.random() * 0.3 + 0.1;
        bubble.style.animationDuration = `${Math.random() * 10 + 10}s`;
        bubble.style.animationDelay = `${Math.random() * 5}s`;
        
        bubblesContainer.appendChild(bubble);
    }
}

// Function to navigate to next slide
function nextSlide() {
    changeSlide(currentSlide + 1);
}

// Go to specific slide
function goToSlide(slideNumber) {
    changeSlide(slideNumber);
}

// Change slide with animations
function changeSlide(newSlide) {
    if (newSlide <= totalSlides && newSlide >= 1) {
        document.getElementById(`slide${currentSlide}`).classList.remove('active');
        currentSlide = newSlide;
        
        // Update active nav dot
        document.querySelectorAll('.nav-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index + 1 === currentSlide);
        });
        
        document.getElementById(`slide${currentSlide}`).classList.add('active');
        updateProgressBar();
        
        // Special actions for specific slides
        if (currentSlide === 4) {
            document.getElementById('final-heart').classList.add('active');
        }
    }
}

// Update progress bar
function updateProgressBar() {
    const progress = ((currentSlide - 1) / 4) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
}

// Move the No button away from cursor
function moveNoButton() {
    const noBtn = document.getElementById('noBtn');
    const x = Math.random() * (window.innerWidth - 200);
    const y = Math.random() * (window.innerHeight - 100);
    
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    noBtn.classList.add('animate__animated', 'animate__headShake');
    
    setTimeout(() => {
        noBtn.classList.remove('animate__animated', 'animate__headShake');
    }, 500);
}

// Yes button clicked
function yesClicked() {
    document.getElementById('slide5').classList.remove('active');
    document.getElementById('slide6').classList.add('active');
    createConfetti();
}

// No button clicked
function noClicked() {
    document.getElementById('slide5').classList.remove('active');
    document.getElementById('slide7').classList.add('active');
}

// Create confetti animation
function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    const colors = ['#ff5c8d', '#ffc2d1', '#ff85a2', '#ff3366', '#ffffff'];
    
    confettiInterval = setInterval(() => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        const size = Math.random() * 10 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = color;
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = '-20px';
        confetti.style.opacity = '1';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        const animationDuration = Math.random() * 3 + 2;
        confetti.style.animation = `float ${animationDuration}s linear forwards`;
        
        confettiContainer.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, animationDuration * 1000);
    }, 100);
}

// Improved Toggle background music
function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const musicIcon = document.getElementById('music-icon');
    
    if (isMusicPlaying) {
        // If music is playing, pause it
        music.pause();
        musicIcon.classList.remove('fa-volume-up');
        musicIcon.classList.add('fa-music');
        isMusicPlaying = false;
    } else {
        // If music is not playing, try to play it
        const playPromise = music.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Autoplay started successfully
                musicIcon.classList.remove('fa-music');
                musicIcon.classList.add('fa-volume-up');
                isMusicPlaying = true;
            }).catch(error => {
                // Autoplay was prevented
                console.error("Music autoplay prevented:", error);
                
                if (!musicAttempted) {
                    // First attempt, show message to user
                    alert("Harap klik tombol musik lagi untuk memainkan musik. Browser mungkin memerlukan interaksi pengguna.");
                    musicAttempted = true;
                }
                
                isMusicPlaying = false;
            });
        }
    }
}

// Redirect to WhatsApp
function redirectToWhatsApp(isYes) {
    // You can customize the message based on the response
    const message = isYes 
        ? 'Halo! Aku senang bisa lebih dekat denganmu ❤️'
        : 'Halo! Terima kasih sudah tetap mau berteman denganku 😊';
    
    // Replace the phone number with your actual number
    const phoneNumber = '6288289907355'; // Format: country code without + and then number
    
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank'); 
}

// Handle keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight' || event.key === ' ') {
        nextSlide();
    } else if (event.key === 'ArrowLeft') {
        goToSlide(currentSlide - 1);
    }
});