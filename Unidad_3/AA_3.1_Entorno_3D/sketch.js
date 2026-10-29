import * as THREE from 'three';

// ESCENA
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

// CÁMARA
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 7;

// WEBGL
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// GRUPO DEL SEMÁFORO
const semaforo = new THREE.Group();
scene.add(semaforo);

// 1. CAJA DEL SEMÁFORO
const geometry = new THREE.BoxGeometry(1.5, 4, 2);
const material = new THREE.MeshStandardMaterial({
  color: 0x000000,
  roughness: 0.5,
  metalness: 0.2
});

const caja = new THREE.Mesh(geometry, material);
semaforo.add(caja);

// 2. ESFERA ROJA
const geometry2 = new THREE.SphereGeometry(0.45, 32, 32);

const materialRojo = new THREE.MeshStandardMaterial({
  color: 0xff0000,
  roughness: 0.3,
  emissive: 0x550000
});

const esferaRoja = new THREE.Mesh(geometry2, materialRojo);
esferaRoja.position.set(0, 1.2, 1.05);
semaforo.add(esferaRoja);

// 3. ESFERA AMARILLA
const materialAmarillo = new THREE.MeshStandardMaterial({
  color: 0xffff00,
  roughness: 0.3,
  emissive: 0x555500
});

const esferaAmarilla = new THREE.Mesh(geometry2, materialAmarillo);
esferaAmarilla.position.set(0, 0, 1.05);
semaforo.add(esferaAmarilla);

// 4. ESFERA VERDE
const materialVerde = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  roughness: 0.3,
  emissive: 0x005500
});

const esferaVerde = new THREE.Mesh(geometry2, materialVerde);
esferaVerde.position.set(0, -1.2, 1.05);
semaforo.add(esferaVerde);

// ILUMINACIÓN
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// ANIMACIÓN
function animate() {
  requestAnimationFrame(animate);

  // Girar todo el semáforo junto
  semaforo.rotation.y += 0.03;

  renderer.render(scene, camera);
}

animate();

// RESPONSIVIDAD
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
