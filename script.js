// Floating hearts animation
function createHeart() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '💕';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heartsContainer.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 7000);
}

// Create hearts continuously
setInterval(createHeart, 300);

// Button functionality
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const mainContainer = document.getElementById('mainContainer');
const successScreen = document.getElementById('successScreen');

// Yes button - show confetti and success screen
yesBtn.addEventListener('click', () => {
    // Hide main container
    mainContainer.style.display = 'none';
    
    // Show success screen
    successScreen.classList.add('show');
    
    // Trigger confetti
    startConfetti();
    
    // Stop confetti after 5 seconds
    setTimeout(stopConfetti, 5000);
});

// No button - moves away continuously on hover, avoiding Yes button area
let currentTranslateX = 0;
let currentTranslateY = 0;

function moveNoButton() {
    // Define safe zones - move the No button to areas away from Yes button
    // Yes button is on the left, so we'll move No button to the right or far away
    const safeZones = [
        { x: 150, y: 0 },      // Right
        { x: 200, y: 50 },     // Right-down
        { x: 200, y: -50 },    // Right-up
        { x: 100, y: 100 },    // Down-right
        { x: 100, y: -100 },   // Up-right
        { x: 0, y: 150 },      // Down
        { x: 0, y: -150 },     // Up
    ];
    
    // Pick a random safe zone
    const randomZone = safeZones[Math.floor(Math.random() * safeZones.length)];
    
    // Add some randomness within the safe zone
    const randomX = randomZone.x + (Math.random() - 0.5) * 50;
    const randomY = randomZone.y + (Math.random() - 0.5) * 50;
    
    // Update current translation
    currentTranslateX = randomX;
    currentTranslateY = randomY;
    
    noBtn.style.position = 'absolute';
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('mousemove', moveNoButton);

// Confetti animation
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confettiPieces = [];
let animationId;

class ConfettiPiece {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.size = Math.random() * 8 + 5;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.color = this.randomColor();
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
    }
    
    randomColor() {
        const colors = ['#ff69b4', '#ff1493', '#ffc0cb', '#ff85c1', '#ffb3d9', '#ff6b9d'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
        
        if (this.y > canvas.height) {
            this.y = -10;
            this.x = Math.random() * canvas.width;
        }
    }
    
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

function startConfetti() {
    // Create confetti pieces
    for (let i = 0; i < 150; i++) {
        confettiPieces.push(new ConfettiPiece());
    }
    animateConfetti();
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    confettiPieces.forEach(piece => {
        piece.update();
        piece.draw();
    });
    
    animationId = requestAnimationFrame(animateConfetti);
}

function stopConfetti() {
    cancelAnimationFrame(animationId);
    confettiPieces = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
