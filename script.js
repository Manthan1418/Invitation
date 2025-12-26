// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
    initTypewriter();
    initStars();
    initFloatingElements();
    initCountdown();
    initScrollListener();
    initMontage();
});

// ============ TYPEWRITER EFFECT ============
function initTypewriter() {
    const text = "A CELEBRATION OF JOY & BLESSINGS";
    const element = document.getElementById('typewriter');
    let index = 0;
    
    function type() {
        if (index < text.length) {
            element.innerHTML = text.substring(0, index + 1) + '<span class="typewriter-cursor"></span>';
            index++;
            setTimeout(type, 80);
        } else {
            // Reset after a pause
            setTimeout(() => {
                index = 0;
                type();
            }, 4000);
        }
    }
    type();
}

// ============ STARS BACKGROUND ============
function initStars() {
    const container = document.getElementById('stars-container');
    const starIcons = ['✦', '✧', '★', '·', '✴'];
    const colors = ['#d97706', '#f59e0b', '#fbbf24', '#fcd34d', '#b45309'];
    
    for (let i = 0; i < 15; i++) {
        const star = document.createElement('span');
        star.className = 'star animate-twinkle';
        star.textContent = starIcons[Math.floor(Math.random() * starIcons.length)];
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.fontSize = (Math.random() * 8 + 6) + 'px';
        star.style.color = colors[Math.floor(Math.random() * colors.length)];
        star.style.animationDelay = Math.random() * 2 + 's';
        star.style.animationDuration = (Math.random() * 2 + 1) + 's';
        container.appendChild(star);
    }
}

// ============ FLOATING ELEMENTS ============
function initFloatingElements() {
    const container = document.getElementById('floating-elements');
    const elements = ['✨', '⭐', '💫', '🌟', '✦', '·', '♥'];
    
    setInterval(() => {
        if (document.getElementById('intro-layer').style.opacity === '0') {
            // Create multiple elements at once
            for (let i = 0; i < 2; i++) {
                setTimeout(() => {
                    const el = document.createElement('span');
                    el.className = 'floating-element';
                    el.textContent = elements[Math.floor(Math.random() * elements.length)];
                    el.style.left = Math.random() * 100 + '%';
                    el.style.fontSize = (Math.random() * 14 + 10) + 'px';
                    el.style.animationDuration = (Math.random() * 8 + 8) + 's';
                    el.style.color = '#d97706';
                    container.appendChild(el);
                    
                    // Remove after animation
                    setTimeout(() => el.remove(), 16000);
                }, i * 300);
            }
        }
    }, 1200);
}

// ============ COUNTDOWN TIMER ============
function initCountdown() {
    // Event date: January 7, 2026 at 8:00 PM IST (India Standard Time - UTC+5:30)
    // Using ISO format with timezone offset for IST
    const eventDateIST = '2026-01-07T20:00:00+05:30';
    const targetDate = new Date(eventDateIST).getTime();
    
    function updateCountdown() {
        // Get current time in IST (India/Delhi timezone)
        const now = new Date();
        const nowIST = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
        const nowTimestamp = nowIST.getTime();
        
        // Calculate target in IST
        const targetIST = new Date(new Date(eventDateIST).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
        const targetTimestamp = targetIST.getTime();
        
        const distance = targetTimestamp - nowTimestamp;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        } else {
            document.getElementById('countdown').innerHTML = `
                <div class="text-center">
                    <span class="text-2xl font-bold text-green-500 animate-pulse">🎉 Today is the Day! 🎉</span>
                    <p class="text-sm text-slate-500 mt-2">The celebration starts at 8:00 PM IST</p>
                </div>
            `;
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ============ SCROLL LISTENER ============
function initScrollListener() {
    const mainContent = document.getElementById('main-content');
    const scrollBtn = document.getElementById('scroll-top');
    
    mainContent.addEventListener('scroll', () => {
        if (mainContent.scrollTop > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.pointerEvents = 'auto';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.pointerEvents = 'none';
        }
    });
}

function scrollToTop() {
    document.getElementById('main-content').scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ============ MUSIC CONTROL ============
let musicPlaying = false;
function toggleMusic() {
    const audio = document.getElementById('bg-music');
    const icon = document.getElementById('music-icon');
    
    if (musicPlaying) {
        audio.pause();
        icon.setAttribute('icon', 'lucide:volume-x');
    } else {
        audio.volume = 0.3;
        audio.play().catch(e => console.log('Audio play failed:', e));
        icon.setAttribute('icon', 'lucide:volume-2');
    }
    musicPlaying = !musicPlaying;
}

// ============ OPEN INVITATION ============
function openInvitation() {
    const introLayer = document.getElementById('intro-layer');
    const mainContent = document.getElementById('main-content');
    const container = document.getElementById('particle-container');

    // Start music automatically
    const audio = document.getElementById('bg-music');
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Audio autoplay blocked:', e));
    document.getElementById('music-icon').setAttribute('icon', 'lucide:volume-2');
    musicPlaying = true;

    // 1. Trigger Confetti
    createParticles(container);
    createBurstConfetti();

    // 2. Animate Intro Out with 3D effect
    introLayer.style.transform = 'translateY(-100%) rotateX(30deg) scale(0.8)';
    introLayer.style.opacity = '0';
    introLayer.style.pointerEvents = 'none';

    // 3. Animate Content In
    mainContent.classList.add('reveal-active');

    // Wait a slight moment for the layer to lift before showing content fully
    setTimeout(() => {
        mainContent.style.opacity = '1';
        // Trigger children stagger
        const items = document.querySelectorAll('.stagger-item');
        items.forEach((item, index) => {
            item.classList.add('reveal-active');
        });
    }, 300);
}

// ============ PARTICLE SYSTEM ============
function createParticles(container) {
    const colors = ['#60A5FA', '#93C5FD', '#F472B6', '#FCD34D', '#A78BFA', '#34D399'];
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        p.style.width = Math.random() * 8 + 4 + 'px';
        p.style.height = p.style.width;
        p.style.left = '50%';
        p.style.top = '50%';

        // Random destination
        const tx = (Math.random() - 0.5) * 300 + 'px';
        const ty = (Math.random() - 0.5) * 300 + 'px';
        p.style.setProperty('--tx', tx);
        p.style.setProperty('--ty', ty);

        p.style.animation = `pop 1s cubic-bezier(0.16, 1, 0.3, 1) forwards`;
        container.appendChild(p);
    }
}

// ============ BURST CONFETTI ON OPEN ============
function createBurstConfetti() {
    const colors = ['#60A5FA', '#F472B6', '#FBBF24', '#A78BFA', '#34D399', '#FB7185'];
    const shapes = ['circle', 'square', 'triangle'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            if (shape === 'circle') {
                confetti.style.borderRadius = '50%';
            } else if (shape === 'triangle') {
                confetti.style.width = '0';
                confetti.style.height = '0';
                confetti.style.borderLeft = '5px solid transparent';
                confetti.style.borderRight = '5px solid transparent';
                confetti.style.borderBottom = '10px solid ' + colors[Math.floor(Math.random() * colors.length)];
                confetti.style.backgroundColor = 'transparent';
            }
            
            confetti.style.animation = `confetti-fall ${Math.random() * 2 + 2}s ease-out forwards`;
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 4000);
        }, i * 30);
    }
}

// ============ RSVP TOGGLE ============
let isConfirmed = false;
function toggleRsvp(element) {
    if (isConfirmed) return;
    isConfirmed = true;

    const btn = document.getElementById('rsvp-btn');
    const text = document.getElementById('rsvp-text');
    const arrow = document.getElementById('rsvp-arrow');
    const check = document.getElementById('rsvp-check');
    const card = document.getElementById('rsvp-card');

    // Calculate distance to move
    const containerWidth = element.offsetWidth;
    const btnWidth = btn.offsetWidth;
    const travelDistance = containerWidth - btnWidth - 8;

    // Animate Button
    btn.style.transform = `translateX(${travelDistance}px)`;
    btn.style.backgroundColor = '#22c55e';

    // Animate Fill
    const fill = document.getElementById('rsvp-fill');
    fill.style.transform = 'scaleX(1)';

    // Create celebration confetti
    createRsvpConfetti();

    // Icon Swap Animation
    arrow.style.opacity = '0';
    setTimeout(() => {
        check.style.opacity = '1';
    }, 200);

    // Text Transition
    text.style.opacity = '0';
    setTimeout(() => {
        text.innerText = "🎉 Yay! You're confirmed!";
        text.style.color = "#ffffff";
        text.style.marginLeft = "0";
        text.style.marginRight = "48px";
        text.style.opacity = '1';
    }, 300);
    
    // Add celebration glow
    card.style.boxShadow = '0 0 40px rgba(34, 197, 94, 0.5)';
}

// ============ RSVP CONFETTI ============
function createRsvpConfetti() {
    const container = document.getElementById('rsvp-confetti');
    const colors = ['#22c55e', '#4ade80', '#fbbf24', '#f59e0b', '#d97706'];
    const emojis = ['🎉', '✨', '💫', '⭐', '♥'];
    
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const confetti = document.createElement('span');
            confetti.textContent = Math.random() > 0.5 ? emojis[Math.floor(Math.random() * emojis.length)] : '';
            confetti.style.position = 'absolute';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '50%';
            confetti.style.fontSize = (Math.random() * 12 + 8) + 'px';
            confetti.style.pointerEvents = 'none';
            confetti.style.animation = `confetti-fall ${Math.random() * 1 + 1}s ease-out forwards`;
            container.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 2000);
        }, i * 50);
    }
}
// ============ IMAGE MONTAGE SLIDESHOW ============
let currentSlide = 0;
let montageInterval = null;
let isPaused = false;

function initMontage() {
    const container = document.getElementById('montage-container');
    if (!container) return;
    
    // Start auto-advance
    startMontageInterval();
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        pauseMontage();
    }, { passive: true });
    
    container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        resumeMontage();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
    
    // Click on indicators
    document.querySelectorAll('.montage-indicator').forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });
    
    // Pause on hover
    container.addEventListener('mouseenter', pauseMontage);
    container.addEventListener('mouseleave', resumeMontage);
}

function startMontageInterval() {
    if (montageInterval) clearInterval(montageInterval);
    montageInterval = setInterval(() => {
        if (!isPaused) {
            nextSlide();
        }
    }, 2500); // Change slide every 2.5 seconds
}

function pauseMontage() {
    isPaused = true;
}

function resumeMontage() {
    isPaused = false;
    startMontageInterval();
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.montage-slide');
    const indicators = document.querySelectorAll('.montage-indicator');
    
    if (!slides.length) return;
    
    // Remove active from current slide
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.add('completed');
    
    // Update current slide index
    currentSlide = index;
    
    // Reset indicators if looping back to start
    if (currentSlide === 0) {
        indicators.forEach(ind => ind.classList.remove('completed'));
    }
    
    // Add active to new slide
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.remove('completed');
    indicators[currentSlide].classList.add('active');
    
    // Reset interval
    startMontageInterval();
}

function nextSlide(event) {
    if (event) event.stopPropagation();
    const slides = document.querySelectorAll('.montage-slide');
    const nextIndex = (currentSlide + 1) % slides.length;
    goToSlide(nextIndex);
}

function prevSlide(event) {
    if (event) event.stopPropagation();
    const slides = document.querySelectorAll('.montage-slide');
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(prevIndex);
}