// 1. Initialize Lucide Icons
lucide.createIcons();

// 2. Custom Cursor Movement
const dot = document.getElementById('cursor-dot');
const outline = document.getElementById('cursor-outline');

window.addEventListener('mousemove', (e) => {
    dot.style.opacity = outline.style.opacity = "1";
    dot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
    
    // Smooth delay for outline
    outline.animate({ 
        transform: `translate(${e.clientX - 22}px, ${e.clientY - 22}px)` 
    }, { duration: 500, fill: "forwards" });
});

// 3. Snowfall Animation (Canvas)
const canvas = document.getElementById('snow-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() { 
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight; 
}
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedY = Math.random() * 0.7 + 0.2;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.opacity = Math.random() * 0.4 + 0.1;
    }
    update() { 
        this.y += this.speedY; 
        this.x += this.speedX; 
        if (this.y > canvas.height) this.y = -5; 
    }
    draw() { 
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`; 
        ctx.beginPath(); 
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); 
        ctx.fill(); 
    }
}

// Generate 80 snow particles
for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
}

function animate() { 
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    particles.forEach(p => { p.update(); p.draw(); }); 
    requestAnimationFrame(animate); 
}
animate();

// 4. Scroll Reveal (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { 
        if (entry.isIntersecting) {
            entry.target.classList.add('active'); 
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 5. Global Loading Page Transition
function navigateWithLoader(url) {
    const loader = document.getElementById('global-loader');
    loader.classList.add('active');
    
    // Smooth transition delay
    setTimeout(() => {
        window.location.href = url;
    }, 1500);
}
