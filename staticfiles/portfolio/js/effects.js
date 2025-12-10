document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu toggle
const navToggle = document.getElementById("navToggle");
const navMobileRow = document.getElementById("navMobileRow");

if (navToggle && navMobileRow) {
  navToggle.addEventListener("click", () => {
    const open = navMobileRow.style.display === "block";
    navMobileRow.style.display = open ? "none" : "block";
    navToggle.classList.toggle("active", !open);
  });

  navMobileRow.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMobileRow.style.display = "none";
      navToggle.classList.remove("active");
    });
  });
}

// Section reveal animations
const sections = document.querySelectorAll("main section");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("section-visible");
  });
}, { threshold: 0.2 });
sections.forEach((sec) => observer.observe(sec));

// Tilt cards
const tiltElements = document.querySelectorAll(".tilt-3d, .project-card");
tiltElements.forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotateX = ((y - midY) / midY) * -8;
    const rotateY = ((x - midX) / midX) * 8;
    el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  });
  el.addEventListener("mouseleave", () => {
    el.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0)";
  });
});

// Parallax glowing orbs
const orbs = document.querySelectorAll(".parallax-orb");
window.addEventListener("mousemove", (e) => {
  const { innerWidth, innerHeight } = window;
  const xNorm = (e.clientX / innerWidth) - 0.5;
  const yNorm = (e.clientY / innerHeight) - 0.5;
  orbs.forEach((orb) => {
    const speed = parseFloat(orb.dataset.speed || "0.05");
    orb.style.transform =
      `translate(${xNorm * -80 * speed}px, ${yNorm * -80 * speed}px)`;
  });
});

// Particle background
(function initThree() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas || !window.THREE) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60, window.innerWidth / window.innerHeight, 0.1, 1000
  );
  camera.position.z = 50;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const geometry = new THREE.BufferGeometry();
  const count = 1000;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 200;
  }
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    size: 0.5, transparent: true, opacity: 0.8
  });
  const points = new THREE.Points(geometry, material);
  scene.add(points);

  function animate() {
    requestAnimationFrame(animate);
    points.rotation.y += 0.0008;
    renderer.render(scene, camera);
  }
  animate();
})();

// Contact morph interactions (Krum-style)
document.addEventListener("DOMContentLoaded", () => {
  const shell = document.getElementById("contactShell");
  if (!shell) return; // only on contact page

  const openBtn = document.getElementById("openContactForm");
  const closeBtn = document.getElementById("closeContactForm");
  const closeSecondary = document.getElementById("closeContactFormSecondary");
  const backdrop = document.getElementById("contactBackdrop");

  const open = () => shell.classList.add("is-open");
  const close = () => shell.classList.remove("is-open");

  openBtn?.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);
  closeSecondary?.addEventListener("click", close);
  backdrop?.addEventListener("click", close);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
});
