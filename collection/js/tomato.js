
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

for (let i = 0; i < 60; i++) {
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
    ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();


const storyText = [
  "In the heat of late July, the tomatoes gleamed like secrets.",
  "I remember small hands brushing the vines, the green smell clinging to my skin.",
  "Each red globe was a heartbeat, a promise, a taste of sunlight stored for later.",
  "We’d bite into them like laughter, juice running down our wrists.",
  "The garden never spoke—but it remembered."
];

const storyContainer = document.getElementById('story');
let lineIndex = 0;

function revealLine() {
  if (lineIndex < storyText.length) {
    const line = document.createElement('p');
    line.textContent = storyText[lineIndex];
    line.style.opacity = '0';
    storyContainer.appendChild(line);
    setTimeout(() => {
      line.style.transition = 'opacity 1.5s ease';
      line.style.opacity = '1';
    }, 100);
    lineIndex++;
    setTimeout(revealLine, 3000);
  } else {
    spawnTomatoes();
  }
}

setTimeout(revealLine, 1500);


function spawnTomatoes() {
  for (let i = 0; i < 6; i++) {
    const tomato = document.createElement('div');
    tomato.classList.add('tomato');
    tomato.style.left = `${Math.random() * (window.innerWidth - 60)}px`;
    tomato.style.top = `${Math.random() * (window.innerHeight - 100)}px`;
    document.body.appendChild(tomato);

   
    tomato.addEventListener('click', () => {
      tomato.animate(
        [
          { transform: 'scale(1)' },
          { transform: 'scale(1.4)' },
          { transform: 'scale(1)' }
        ],
        { duration: 600, easing: 'ease-in-out' }
      );
    });

    
    makeDraggable(tomato);
  }
}

function makeDraggable(element) {
  let isDragging = false;
  let offsetX, offsetY;

  element.addEventListener('mousedown', (e) => {
    isDragging = true;
    element.style.animation = 'none'; 
    offsetX = e.clientX - element.offsetLeft;
    offsetY = e.clientY - element.offsetTop;
    element.style.zIndex = 5;
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      element.style.left = `${e.clientX - offsetX}px`;
      element.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      element.style.zIndex = 1;
      
      setTimeout(() => {
        element.style.animation = 'sway 6s ease-in-out infinite alternate';
      }, 200);
    }
  });


  element.addEventListener('touchstart', (e) => {
    isDragging = true;
    element.style.animation = 'none';
    const touch = e.touches[0];
    offsetX = touch.clientX - element.offsetLeft;
    offsetY = touch.clientY - element.offsetTop;
    element.style.zIndex = 5;
  });

  document.addEventListener('touchmove', (e) => {
    if (isDragging) {
      const touch = e.touches[0];
      element.style.left = `${touch.clientX - offsetX}px`;
      element.style.top = `${touch.clientY - offsetY}px`;
    }
  });

  document.addEventListener('touchend', () => {
    if (isDragging) {
      isDragging = false;
      element.style.zIndex = 1;
      setTimeout(() => {
        element.style.animation = 'sway 6s ease-in-out infinite alternate';
      }, 200);
    }
  });
}
