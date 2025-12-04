// ======================
//  DUST PARTICLES
// ======================
const canvas = document.getElementById("dustCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 90; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 0.5,
    speedX: (Math.random() - 0.5) * 0.15,
    speedY: (Math.random() - 0.5) * 0.15,
    alpha: Math.random() * 0.5 + 0.2
  });
}

function animateDust() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    ctx.fillStyle = `rgba(255, 210, 120, ${p.alpha})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(animateDust);
}
animateDust();


// ======================
//  FADE-IN POEM LINES
// ======================
const lines = document.querySelectorAll("#poem p");
lines.forEach((line, i) => {
  setTimeout(() => {
    line.style.opacity = 1;
  }, i * 1800 + 2000);
});


// ======================
//  AMBIENT AUDIO
// ======================
const crickets = document.getElementById("crickets");
const hum = document.getElementById("nightHum");

function startAudio() {
  crickets.volume = 0.45;
  hum.volume = 0.35;
  crickets.play();
  hum.play();
}

document.body.addEventListener("click", startAudio, { once: true });
document.body.addEventListener("touchstart", startAudio, { once: true });
