/* La animación funciona sin compilación: abrí index.html o publicalo como sitio estático. */
const openButton = document.querySelector('#open-gift');
const replayButton = document.querySelector('#replay');
const intro = document.querySelector('#intro');
const surprise = document.querySelector('#surprise');
const field = document.querySelector('#flower-field');
const messages = [...document.querySelectorAll('.message')];
const canvas = document.querySelector('#fireworks');

let showTimer;
let fireworks;

function makeFlowers() {
  field.replaceChildren();
  const total = window.innerWidth < 540 ? 7 : 13;
  for (let i = 0; i < total; i += 1) {
    const flower = document.createElement('div');
    flower.className = 'flower';
    flower.style.setProperty('--height', `${130 + Math.random() * 150}px`);
    flower.style.setProperty('--delay', `${.2 + i * .12}s`);
    flower.innerHTML = `<div class="stem"></div><span class="leaf"></span><span class="leaf right"></span><div class="bloom">${'<span class="petal"></span>'.repeat(8)}<span class="center"></span></div>`;
    field.append(flower);
  }
}

function hearts() {
  const heart = document.createElement('span');
  heart.className = 'heart'; heart.textContent = '♥';
  heart.style.left = `${8 + Math.random() * 84}vw`;
  heart.style.bottom = `${5 + Math.random() * 18}vh`;
  heart.style.setProperty('--size', `${10 + Math.random() * 14}px`);
  heart.style.setProperty('--duration', `${4 + Math.random() * 3}s`);
  heart.style.setProperty('--drift', `${-50 + Math.random() * 100}px`);
  document.body.append(heart);
  setTimeout(() => heart.remove(), 7200);
}

function showMessages(index = 0) {
  messages.forEach((message, i) => message.classList.toggle('active', i === index));
  if (index < messages.length - 1) {
    showTimer = setTimeout(() => showMessages(index + 1), index === 2 ? 4100 : 3000);
  } else {
    replayButton.classList.add('show');
  }
}

function begin() {
  clearTimeout(showTimer); replayButton.classList.remove('show');
  intro.classList.add('is-hidden'); surprise.classList.add('is-visible'); surprise.setAttribute('aria-hidden', 'false');
  makeFlowers(); showMessages();
  if (fireworks) fireworks.start();
  for (let i = 0; i < 8; i += 1) setTimeout(hearts, i * 850 + 700);
}

openButton.addEventListener('click', begin);
replayButton.addEventListener('click', () => { makeFlowers(); showMessages(); replayButton.classList.remove('show'); });

function createFireworks() {
  if (!window.THREE) return null;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  let particles = [];
  let running = false;
  function resize() { renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); renderer.setSize(innerWidth, innerHeight, false); }
  function burst() {
    const count = 100, coords = new Float32Array(count * 3), colors = new Float32Array(count * 3);
    const center = { x: (Math.random() * 1.5 - .75), y: (Math.random() * .95 - .1) };
    const color = new THREE.Color().setHSL(.11 + Math.random() * .06, .78, .65);
    for (let i = 0; i < count; i++) { coords[i * 3] = center.x; coords[i * 3 + 1] = center.y; colors.set([color.r, color.g, color.b], i * 3); }
    const geometry = new THREE.BufferGeometry(); geometry.setAttribute('position', new THREE.BufferAttribute(coords, 3)); geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const points = new THREE.Points(geometry, new THREE.PointsMaterial({ size: .011, vertexColors: true, transparent: true, opacity: .95, blending: THREE.AdditiveBlending }));
    scene.add(points); particles.push({ points, velocity: Array.from({ length: count }, () => ({ x: (Math.random()-.5)*.008, y: (Math.random()-.5)*.008, z: 0 })), life: 1 });
  }
  function tick() {
    if (!running) return;
    particles = particles.filter(group => { const p = group.points.geometry.attributes.position; group.life -= .012; group.velocity.forEach((v, i) => { p.array[i*3] += v.x; p.array[i*3+1] += v.y; v.y -= .00007; }); p.needsUpdate = true; group.points.material.opacity = Math.max(0, group.life); if (group.life <= 0) { scene.remove(group.points); group.points.geometry.dispose(); group.points.material.dispose(); return false; } return true; });
    renderer.render(scene, camera); requestAnimationFrame(tick);
  }
  resize(); addEventListener('resize', resize);
  return { start() { if (running) return; running = true; burst(); setInterval(() => running && burst(), 1900); tick(); } };
}
fireworks = createFireworks();
