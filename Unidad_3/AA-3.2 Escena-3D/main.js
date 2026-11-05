import * as THREE from 'three';

// 1. CREAR LA ESCENA
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x020617);

// 2. CONFIGURAR LA CAMARA
const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 24, 34);
camera.lookAt(0, 0, 0);

// 3. CREAR EL RENDERIZADOR
const canvasElement = document.querySelector('#mi-canvas');

const renderer = new THREE.WebGLRenderer({
    canvas: canvasElement,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// 4. CREAR EL SOL
const sunGeometry = new THREE.SphereGeometry(1.8, 32, 32);

const sunMaterial = new THREE.MeshBasicMaterial({
    color: 0xffcc00
});

const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// 5. CREAR LAS ESTRELLAS
const starGeometry = new THREE.BufferGeometry();
const starPositions = [];

for (let i = 0; i < 700; i++) {
    starPositions.push(
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 200
    );
}

starGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(starPositions, 3)
);

const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.15
});

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// 6. FUNCION PARA CREAR LAS ORBITAS
function createOrbit(distance) {

    const orbitGeometry = new THREE.TorusGeometry(
        distance,
        0.025,
        8,
        100
    );

    const orbitMaterial = new THREE.MeshBasicMaterial({
        color: 0x475569
    });

    const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);

    orbit.rotation.x = Math.PI / 2;

    scene.add(orbit);
}

// 7. DATOS DE LOS PLANETAS
const planets = [
    { name: 'Mercurio', size: 0.25, distance: 3.5, color: 0xaaaaaa, speed: 0.020 },
    { name: 'Venus', size: 0.38, distance: 5, color: 0xffaa55, speed: 0.015 },
    { name: 'Tierra', size: 0.42, distance: 6.8, color: 0x2266ff, speed: 0.012 },
    { name: 'Marte', size: 0.32, distance: 8.5, color: 0xff4422, speed: 0.010 },
    { name: 'Jupiter', size: 0.95, distance: 12, color: 0xd69b65, speed: 0.007 },
    { name: 'Saturno', size: 0.78, distance: 15.5, color: 0xe5d09a, speed: 0.005 },
    { name: 'Urano', size: 0.60, distance: 18.5, color: 0x55dddd, speed: 0.004 },
    { name: 'Neptuno', size: 0.58, distance: 21, color: 0x3355ff, speed: 0.003 }
];

// 8. CREAR LOS PLANETAS Y SUS ORBITAS
const planetObjects = [];

planets.forEach((data) => {

    // Crear orbita
    createOrbit(data.distance);

    // Crear grupo para el movimiento orbital
    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);

    // Crear geometria del planeta
    const geometry = new THREE.SphereGeometry(
        data.size,
        32,
        32
    );

    // Crear material
    const material = new THREE.MeshBasicMaterial({
        color: data.color
    });

    // Crear planeta
    const planet = new THREE.Mesh(geometry, material);

    planet.position.x = data.distance;

    orbitGroup.add(planet);

    // Anillo de Saturno
    if (data.name === 'Saturno') {

        const ringGeometry = new THREE.TorusGeometry(
            data.size * 1.5,
            0.12,
            8,
            60
        );

        const ringMaterial = new THREE.MeshBasicMaterial({
            color: 0xd8bd85
        });

        const ring = new THREE.Mesh(ringGeometry, ringMaterial);

        ring.rotation.x = Math.PI / 2;
        planet.add(ring);
    }

    planetObjects.push({
        group: orbitGroup,
        mesh: planet,
        speed: data.speed
    });

});

// 9. ANIMACION DEL SISTEMA SOLAR
function animate() {

    requestAnimationFrame(animate);

    // Girar el Sol
    sun.rotation.y += 0.003;

    // Girar los planetas alrededor del Sol
    planetObjects.forEach((item) => {

        item.group.rotation.y += item.speed;

        // Rotacion propia del planeta
        item.mesh.rotation.y += 0.01;

    });

    // Dibujar la escena
    renderer.render(scene, camera);
}

// INICIAR ANIMACION
animate();

// 10. AJUSTAR LA VENTANA
window.addEventListener('resize', () => {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

});
