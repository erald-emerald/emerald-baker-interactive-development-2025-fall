const poemText = document.getElementById('poemText');
let textVisible = false;


document.body.addEventListener('click', (e) => {
  if (e.target.closest('.symbol')) return; 

  textVisible = !textVisible;
  poemText.style.opacity = textVisible ? '1' : '0';
  poemText.style.transform = textVisible
    ? 'translate(-50%, -50%) scale(1)'
    : 'translate(-50%, -50%) scale(0.9)';

  
  const ripple = document.createElement('span');
  ripple.classList.add('ripple');
  ripple.style.left = `${e.clientX}px`;
  ripple.style.top = `${e.clientY}px`;
  document.body.appendChild(ripple);
  setTimeout(() => ripple.remove(), 2000);
});


const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: Math.random() * 0.4 - 0.2,
    dy: Math.random() * 0.4 - 0.2,
    opacity: Math.random() * 0.4 + 0.2,
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();


const bloomColors = {
  tomato: "#f85e4b",
  honeysuckle: "#ffb6c1",
  sunflower: "#ffdf00",
  dandelion: "#f9f871",
  deadnettle: "#c785e2"
};


document.querySelectorAll('.symbol').forEach((symbol) => {
  symbol.addEventListener('click', (e) => {
    e.preventDefault(); 
    const id = symbol.id;
    createBloom(bloomColors[id]);
    
    setTimeout(() => {
      window.location.href = symbol.getAttribute('href');
    }, 800);
  });
});

function createBloom(color) {
  const bloom = document.createElement('div');
  bloom.classList.add('bloom');
  const size = Math.random() * 80 + 40;
  bloom.style.width = `${size}px`;
  bloom.style.height = `${size}px`;
  bloom.style.left = `${Math.random() * (window.innerWidth - size)}px`;
  bloom.style.top = `${Math.random() * (window.innerHeight - size)}px`;
  bloom.style.background = `radial-gradient(circle at center, ${color} 0%, transparent 70%)`;
  bloom.style.boxShadow = `0 0 20px ${color}66`;
  document.body.appendChild(bloom);
}
