function openInvitation() {
    const introLayer = document.getElementById('intro-layer');
    const mainContent = document.getElementById('main-content');
    const container = document.getElementById('particle-container');

    // 1. Trigger Confetti
    createParticles(container);

    // 2. Animate Intro Out
    introLayer.style.transform = 'translateY(-100%) scale(0.9)';
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

// Particle System for "Pop" effect
function createParticles(container) {
    const colors = ['#60A5FA', '#93C5FD', '#F472B6', '#FCD34D'];
    for (let i = 0; i < 20; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        p.style.width = Math.random() * 6 + 4 + 'px';
        p.style.height = p.style.width;
        p.style.left = '50%';
        p.style.top = '50%';

        // Random destination
        const tx = (Math.random() - 0.5) * 200 + 'px';
        const ty = (Math.random() - 0.5) * 200 + 'px';
        p.style.setProperty('--tx', tx);
        p.style.setProperty('--ty', ty);

        p.style.animation = `pop 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards`;
        container.appendChild(p);
    }
}

// RSVP Toggle Logic
let isConfirmed = false;
function toggleRsvp(element) {
    if (isConfirmed) return;
    isConfirmed = true;

    const btn = document.getElementById('rsvp-btn');
    const text = document.getElementById('rsvp-text');
    const arrow = document.getElementById('rsvp-arrow');
    const check = document.getElementById('rsvp-check');

    // Move button to right
    btn.style.transform = 'translateX(calc(100% + 200px))'; // Move far right logic simplified for css calc
    // Actually, let's just use flex logic or specific pixels. 
    // Since tailwind w-full is used, let's calc based on parent width approx 
    // Better approach: toggle classes
    btn.style.left = 'auto';
    btn.style.right = '4px';
    btn.style.backgroundColor = '#22c55e'; // Green

    arrow.style.opacity = '0';
    setTimeout(() => {
        check.style.opacity = '1';
    }, 200);

    text.style.opacity = '0';
    setTimeout(() => {
        text.innerText = "Yay! You're confirmed.";
        text.style.color = "#ffffff";
        text.style.marginLeft = "0";
        text.style.marginRight = "48px"; // space for button
        text.style.opacity = '1';
    }, 300);
}
