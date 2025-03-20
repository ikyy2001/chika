document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav items
            navItems.forEach(navItem => navItem.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Hide all pages
            pages.forEach(page => page.classList.remove('active'));
            
            // Show corresponding page
            const pageId = this.getAttribute('data-page');
            document.getElementById(pageId).classList.add('active');
            
            // Create a burst of hearts
            for (let i = 0; i < 10; i++) {
                setTimeout(createHeart, i * 50);
            }
        });
    });
    
    // Floating hearts animation
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        // Random position
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = Math.random() * 100 + 'vh';
        
        // Random size
        const size = Math.random() * 20 + 10;
        heart.style.width = size + 'px';
        heart.style.height = size + 'px';
        
        // Animation
        heart.style.animation = `floatUp ${Math.random() * 5 + 3}s linear`;
        
        document.querySelector('.hearts-container').appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => {
            heart.remove();
        }, 8000);
    }
    
    // Create hearts periodically
    setInterval(createHeart, 300);
    
    // Show photos with animation
    const photos = document.querySelectorAll('.photo');
    function checkPhotos() {
        photos.forEach((photo, index) => {
            const photoPosition = photo.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (photoPosition < screenPosition) {
                setTimeout(() => {
                    photo.style.opacity = '1';
                    photo.style.transform = 'translateY(0)';
                }, 100 * index);
            }
        });
    }
    
    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    function checkTimeline() {
        timelineItems.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (itemPosition < screenPosition) {
                item.classList.add('visible');
            }
        });
    }
    
    // Special message button
    const messageBtn = document.getElementById('showMessage');
    const specialMessage = document.getElementById('specialMessage');
    
    messageBtn.addEventListener('click', function() {
        specialMessage.style.display = 'block';
        setTimeout(() => {
            specialMessage.style.opacity = '1';
            specialMessage.style.transform = 'scale(1)';
        }, 10);
        
        // Create a burst of hearts
        for (let i = 0; i < 20; i++) {
            setTimeout(createHeart, i * 50);
        }
        
        messageBtn.textContent = 'Pesan Telah Dibuka ❤️';
        messageBtn.disabled = true;
    });
    
    // Gift box animation
    const giftBox = document.querySelector('.gift-box');
    giftBox.addEventListener('click', function() {
        this.classList.toggle('open');
        
        // Create a burst of hearts
        for (let i = 0; i < 20; i++) {
            setTimeout(createHeart, i * 50);
        }
    });
    
    // Countdown timer - Fixed code
    function updateCountdown() {
        // Set the date we're counting down to (next Valentine's Day or anniversary)
        const countdownDate = new Date("Feb 14, 2026 00:00:00").getTime();
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
    }
    
    // Fix for the message form - Check if exists first
    const messageForm = document.querySelector('.message-form');
    if (messageForm) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            const formElements = this.elements;
            for (let i = 0; i < formElements.length; i++) {
                formElements[i].disabled = true;
            }
            
            this.innerHTML = '<div class="love-quote">Pesan cintamu telah terkirim! ❤️</div>';
            
            // Create a burst of hearts
            for (let i = 0; i < 20; i++) {
                setTimeout(createHeart, i * 50);
            }
        });
    }
    
    // Event listeners for scroll animations
    window.addEventListener('scroll', checkPhotos);
    window.addEventListener('scroll', checkTimeline);
    
    // Initialize - Make sure these run properly
    checkPhotos();
    checkTimeline();
    updateCountdown();
    
    // Run the countdown every second
    setInterval(updateCountdown, 1000);
});