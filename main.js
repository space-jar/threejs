import * as THREE from 'three';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add a cube to the scene
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;

// Variables to handle dragging
let isDragging = false;
let previousMousePosition = {
    x: 0,
    y: 0
};
const ROTATION_SPEED = 0.3;

// Mouse down event
document.addEventListener('mousedown', (event) => {
    isDragging = true;
});

// Mouse move event
document.addEventListener('mousemove', (event) => {
    if (isDragging) {
        const deltaMove = {
            x: event.offsetX - previousMousePosition.x,
            y: event.offsetY - previousMousePosition.y
        };

        const deltaRotationQuaternion = new THREE.Quaternion()
            .setFromEuler(new THREE.Euler(
                toRadians(deltaMove.y * ROTATION_SPEED),
                toRadians(deltaMove.x * ROTATION_SPEED),
                0,
                'XYZ'
            ));

        cube.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube.quaternion);

        previousMousePosition = {
            x: event.offsetX,
            y: event.offsetY
        };
    }
});

// Mouse up event
document.addEventListener('mouseup', () => {
    isDragging = false;
});

// Helper function to convert degrees to radians
function toRadians(angle) {
    return angle * (Math.PI / 180);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();