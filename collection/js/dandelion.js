/* ──────────────────────────────────────────
   Canvas Particle Sky (Abstract Glow Particles)
────────────────────────────────────────── */

const canvas = document.getElementById("sky");
const ctx = canvas.getContext("2d");
let particles = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// create particle field
for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 3 + 1,
    dx: (Math.random() - 0.5) * 0.3,
    dy: (Math.random() - 0.5) * 0.3,
    opacity: Math.random() * 0.5 + 0.3
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
    ctx.shadowBlur = 15;
    ctx.shadowColor = "white";
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    // wrap around
    if (p.x > canvas.width) p.x = 0;
    if (p.x < 0) p.x = canvas.width;
    if (p.y > canvas.height) p.y = 0;
    if (p.y < 0) p.y = canvas.height;
  });

  requestAnimationFrame(drawParticles);
}
drawParticles();

/* ──────────────────────────────────────────
   Story Reveal, Line-by-Line in Floating Bubbles
────────────────────────────────────────── */

const storyText = [
  "When I was small, I believed wishes rode the wind.",
  "I’d pick the roundest dandelions, close my eyes, and breathe.",
  "Each seed spun away—tiny stars escaping the earth.",
  "They never came back, but I hoped they found someone new. Maybe hope is passed on like that-quietly, breath by breath",
  
];

let storyBox = document.getElementById("story");
let index = 0;

function reveal() {
  if (index < storyText.length) {
    let p = document.createElement("p");
    p.textContent = storyText[index];
    p.style.opacity = 0;
    storyBox.appendChild(p);

    setTimeout(() => {
      p.style.transition = "opacity 2.5s ease";
      p.style.opacity = 1;
    }, 50);

    index++;
    setTimeout(reveal, 3500);
  }
}
setTimeout(reveal, 2000);

/* ──────────────────────────────────────────
   Dandelion Blow Interaction: WORD-SEEDS
────────────────────────────────────────── */

const words = [
  "wish", "hope", "dream", "breathe", "wonder",
  "soft", "float", "light", "believe", "drift"
];

const dandelion = document.querySelector(".dandelion");

dandelion.addEventListener("click", () => {
  for (let i = 0; i < 15; i++) {
    let w = document.createElement("div");
    w.classList.add("word-seed");
    w.textContent = words[Math.floor(Math.random() * words.length)];

    w.style.left = "50%";
    w.style.bottom = "180px";

    document.body.appendChild(w);

    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * 250 + 50;

    setTimeout(() => {
      w.style.transition = "all 6s ease-out";
      w.style.transform = `translate(${Math.cos(angle) * dist}px, ${
        -Math.sin(angle) * dist
      }px)`;
      w.style.opacity = 0;
    }, 20);

    setTimeout(() => w.remove(), 6500);
  }
});

// ======================
//  AMBIENT AUDIO
// ======================
const birds = document.getElementById("birds");


function startAudio() {
  birds.volume = 0.45;
  birds.play();
}

document.body.addEventListener("click", startAudio, { once: true });