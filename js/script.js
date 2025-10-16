// Interactive Farm Features

// Horse interaction system
let petCount = 0;
let moodLevel = 70;
let energyLevel = 85;

const petButton = document.getElementById('petButton');
const horseMood = document.getElementById('horseMood');
const petCountDisplay = document.getElementById('petCount');
const moodBar = document.getElementById('moodBar');
const energyBar = document.getElementById('energyBar');
const horseArt = document.getElementById('horseArt');
const mascotContainer = document.getElementById('mascotContainer');

// Mood states
const moods = {
    ecstatic: { text: 'Ecstatic!', threshold: 90, color: '#4a6b4a' },
    happy: { text: 'Happy', threshold: 70, color: '#6B8E6B' },
    content: { text: 'Content', threshold: 50, color: '#8B9D6B' },
    lonely: { text: 'Lonely', threshold: 30, color: '#9B8B5B' },
    sad: { text: 'Sad', threshold: 0, color: '#8B7355' }
};

// Pet the horse
petButton.addEventListener('click', () => {
    petCount++;
    petCountDisplay.textContent = petCount;
    
    // Increase mood
    moodLevel = Math.min(100, moodLevel + 10);
    energyLevel = Math.max(0, energyLevel - 3);
    
    updateStats();
    animateHorse();
    
    // Add celebratory effect
    createSparkles();
    
    // Vibrate if supported
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
});

// Update mood and energy bars
function updateStats() {
    moodBar.style.width = moodLevel + '%';
    energyBar.style.width = energyLevel + '%';
    
    // Update mood text
    let currentMood = moods.sad;
    for (let mood in moods) {
        if (moodLevel >= moods[mood].threshold) {
            currentMood = moods[mood];
            break;
        }
    }
    
    horseMood.textContent = currentMood.text;
    horseMood.style.background = currentMood.color;
    
    // Check if energy is low
    if (energyLevel < 30) {
        petButton.textContent = 'Let Applejack Rest';
        petButton.style.opacity = '0.6';
        petButton.disabled = true;
        
        setTimeout(() => {
            petButton.textContent = 'Pet Applejack';
            petButton.style.opacity = '1';
            petButton.disabled = false;
            energyLevel = Math.min(100, energyLevel + 20);
            updateStats();
        }, 3000);
    }
}

// Animate the horse
function animateHorse() {
    horseArt.style.transform = 'scale(1.05)';
    setTimeout(() => {
        horseArt.style.transform = 'scale(1)';
    }, 200);
}

// Create sparkle effect
function createSparkles() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: radial-gradient(circle, #FFD700, #FFA500);
                border-radius: 50%;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: sparkle-fade 1s ease-out forwards;
                box-shadow: 0 0 10px #FFD700;
            `;
            mascotContainer.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1000);
        }, i * 100);
    }
}

// Add sparkle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle-fade {
        0% {
            opacity: 1;
            transform: translateY(0) scale(0);
        }
        50% {
            opacity: 1;
            transform: translateY(-20px) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-40px) scale(0);
        }
    }
`;
document.head.appendChild(style);

// Passive mood decay
setInterval(() => {
    if (moodLevel > 0) {
        moodLevel = Math.max(0, moodLevel - 1);
        updateStats();
    }
}, 10000); // Decay every 10 seconds

// Energy regeneration when not petting
setInterval(() => {
    if (energyLevel < 100 && !petButton.disabled) {
        energyLevel = Math.min(100, energyLevel + 2);
        updateStats();
    }
}, 5000); // Regenerate every 5 seconds

// Add hover effects to links
const cropLinks = document.querySelectorAll('.crop-link');
cropLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.03)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add parallax effect to barn
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const barn = document.querySelector('.barn-header');
    const scrolled = window.scrollY;
    
    if (barn) {
        barn.style.transform = `translateY(${scrolled * 0.3}px)`;
        barn.style.opacity = Math.max(0.3, 1 - scrolled / 400);
    }
    
    lastScrollY = scrolled;
});

// Add interactive card effects
const interactiveCards = document.querySelectorAll('.interactive-card');
interactiveCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-8px)
            scale(1.03)
        `;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
});

// Weather vane random rotation
const weatherVane = document.querySelector('.vane-arrow');
setInterval(() => {
    if (weatherVane) {
        const randomRotation = Math.random() * 360;
        weatherVane.style.transition = 'transform 2s ease-in-out';
        weatherVane.style.transform = `translateX(-50%) rotate(${randomRotation}deg)`;
    }
}, 8000);

// Initialize
updateStats();

// Add entrance animation
window.addEventListener('load', () => {
    const sections = document.querySelectorAll('.farm-section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.6s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

console.log('🌾 Welcome to Harvest Haven! Applejack is ready for pets! 🐴');