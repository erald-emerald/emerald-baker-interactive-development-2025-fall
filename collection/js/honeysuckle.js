
const lines = [
  "At dusk, the honeysuckle opened its quiet stars.",
  "We pressed our fingers to petals sticky with sweetness.",
  "The air glowed gold — warm, drifting, endless.",
  "Every summer memory hummed under our skin."
];

const lineObjects = [];

function createFloatingLine(text, delay) {
  const line = document.createElement("div");
  line.className = "firefly-line";
  line.innerText = text;

  document.getElementById("floating-lines").appendChild(line);

  
  let x = Math.random() * (window.innerWidth - 500) + 40;
  let y = Math.random() * (window.innerHeight - 200) + 40;

  line.style.left = x + "px";
  line.style.top = y + "px";

  const obj = {
    el: line,
    x,
    y,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3
  };
  lineObjects.push(obj);

  setTimeout(() => line.style.opacity = 1, delay);
}

lines.forEach((l, i) => createFloatingLine(l, i * 1500));



function animateLines() {
  for (let i = 0; i < lineObjects.length; i++) {
    const o = lineObjects[i];

    
    o.x += o.vx;
    o.y += o.vy;

    
    o.vx += (Math.random() - 0.5) * 0.02;
    o.vy += (Math.random() - 0.5) * 0.02;

    
    o.vx = Math.max(-0.35, Math.min(0.35, o.vx));
    o.vy = Math.max(-0.35, Math.min(0.35, o.vy));

    
    o.x = Math.max(40, Math.min(window.innerWidth - 300, o.x));
    o.y = Math.max(40, Math.min(window.innerHeight - 150, o.y));

    
    for (let j = 0; j < lineObjects.length; j++) {
      if (i === j) continue;

      const other = lineObjects[j];
      const dx = o.x - other.x;
      const dy = o.y - other.y;
      const dist = Math.sqrt(dx*dx + dy*dy);

      if (dist < 130) {
        
        o.x += dx * 0.015;
        o.y += dy * 0.015;
      }
    }

    o.el.style.left = o.x + "px";
    o.el.style.top = o.y + "px";
  }

  requestAnimationFrame(animateLines);
}
animateLines();



document.addEventListener("mousemove", (e) => {
  const p = document.createElement("div");
  p.className = "particle";
  document.getElementById("particle-layer").appendChild(p);

  p.style.left = e.pageX + "px";
  p.style.top = e.pageY + "px";

  
  p.animate([
    { transform: "scale(1)", opacity: 0.9 },
    { transform: "scale(0.2)", opacity: 0 }
  ], {
    duration: 600,
    easing: "ease-out"
  });

  setTimeout(() => p.remove(), 600);
});



const canvas = document.getElementById("vineCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let vines = [];

function growVine() {
  const vine = {
    x: Math.random() * canvas.width,
    y: canvas.height,
    segments: [],
    life: 0
  };
  vines.push(vine);
}

function animateVines() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  vines.forEach(v => {
    v.life += 1;

    
    const dx = (Math.random() - 0.5) * 3;
    const dy = -2 - Math.random() * 2;

    v.x += dx;
    v.y += dy;

    v.segments.push({ x: v.x, y: v.y });

    
    ctx.strokeStyle = "#5c7b39";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < v.segments.length - 1; i++) {
      const s = v.segments[i];
      const n = v.segments[i + 1];
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(n.x, n.y);
    }
    ctx.stroke();
  });

  requestAnimationFrame(animateVines);
}

setInterval(growVine, 3000);
animateVines();
