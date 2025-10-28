// import * as THREE from 'https://esm.sh/three@0.153.0';


// let sceneInitialized = false;

// const contDiv = document.getElementById('shot-chart2');

// const observer = new ResizeObserver(entries => {
//     for (const entry of entries) {
//         const width = entry.contentRect.width;
//         const height = entry.contentRect.height;

//         if (width > 0 && height > 0 && !sceneInitialized) {
//             sceneInitialized = true;
//             observer.disconnect(); // No longer need to observe
//             initScene(width, height); // pass sizes
//         }
//     }
// });

// observer.observe(contDiv);



// function initScene(width, height) {
//     const raycaster = new THREE.Raycaster();
//     const mouse = new THREE.Vector2();
//     let hoveredMesh = null;

//     const contDiv = document.getElementById('shot-chart2');
    
//     const scene = new THREE.Scene();
//     // scene.background = new THREE.Color(0x181818); // black background


//     const cameraHeight = 20; // height above court
//     const orbitRadius = 20;  // distance from court center (behind baseline)
//     const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
//     // camera.aspect = width / height;
//     // camera.updateProjectionMatrix();
//     camera.up.set(0, 1, 0); 
//     camera.position.set(0, -orbitRadius, cameraHeight);
//     camera.lookAt(0, 0, 0);


//     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     renderer.setSize(width, height);
//     contDiv.appendChild(renderer.domElement);

//     function onMouseMove(event) {
//         const rect = renderer.domElement.getBoundingClientRect();

//         mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
//         mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

//         raycaster.setFromCamera(mouse, camera);
//         const intersects = raycaster.intersectObjects(interactiveObjects);

//         if (intersects.length > 0) {
//             const mesh = intersects[0].object;

//             // Only apply hover effect if not clicked
//             if (hoveredMesh !== mesh) {
//                 // Restore previous hovered mesh (if it exists and is not clicked)
//                 if (hoveredMesh && !hoveredMesh.userData.isClicked) {
//                     hoveredMesh.material.color.set(hoveredMesh.userData.originalColor);
//                     hoveredMesh.material.transparent = true;
//                     hoveredMesh.material.opacity = 0;
//                 }

//                 // Don't override color if it's clicked
//                 if (!mesh.userData.isClicked) {
//                     if (!mesh.userData.originalColor) {
//                         mesh.userData.originalColor = mesh.material.color.getHex();
//                     }

//                     mesh.material.color.set(0x00ff00); // yellow for hover
//                     mesh.material.transparent = true;
//                     mesh.material.opacity = 0.2;
//                 }

//                 hoveredMesh = mesh;
//             }

//             document.body.style.cursor = 'pointer';
//         } else {
//             // Only reset hover effect if it's not clicked
//             if (hoveredMesh && !hoveredMesh.userData.isClicked) {
//                 hoveredMesh.material.color.set(hoveredMesh.userData.originalColor);
//                 hoveredMesh.material.transparent = true;
//                 hoveredMesh.material.opacity = 0;
//                 hoveredMesh = null;
//             }

//             document.body.style.cursor = 'default';
//         }
//     }

//     function onMouseClick(event) {
//         const rect = renderer.domElement.getBoundingClientRect();

//         mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
//         mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

//         raycaster.setFromCamera(mouse, camera);
//         const intersects = raycaster.intersectObjects(interactiveObjects);

//         if (intersects.length > 0) {
//             const clickedMesh = intersects[0].object;

//             if (!clickedMesh.userData.originalColor) {
//                 clickedMesh.userData.originalColor = clickedMesh.material.color.getHex();
//             }

//             // Toggle clicked state
//             if (clickedMesh.userData.isClicked) {
//                 // Revert to original color and transparency
//                 clickedMesh.material.color.set(clickedMesh.userData.originalColor);
//                 clickedMesh.material.transparent = true;
//                 clickedMesh.material.opacity = 0;
//                 clickedMesh.userData.isClicked = false;
//             } else {
//                 // Mark as clicked
//                 clickedMesh.material.color.set(0x00ff00); // red
//                 clickedMesh.material.transparent = true;
//                 clickedMesh.material.opacity = 0.5;
//                 clickedMesh.userData.isClicked = true;
//             }

//             console.log('Clicked:', clickedMesh.name || clickedMesh, 'Clicked:', clickedMesh.userData.isClicked);
//         }
//     }

    
//     renderer.domElement.addEventListener('mousemove', onMouseMove, false);
//     renderer.domElement.addEventListener('click', onMouseClick, false);



//     const courtLength = 23.77;
//     const doublesWidth = 10.97;
//     const singlesWidth = 8.23;
//     const serviceBoxDepth = 6.4;
//     const lineThickness = 0.05;
//     const courtColor = 0x333333;
//     const lineColor = 0xffffff;
//     const lineZ = 0.001;  // Slight offset to avoid z-fighting

//     // 1. Court surface (XY plane, Z-up)
//     const courtGeometry = new THREE.PlaneGeometry(doublesWidth, courtLength);
//     const courtMaterial = new THREE.MeshBasicMaterial({ color: courtColor });
//     const court = new THREE.Mesh(courtGeometry, courtMaterial);
//     scene.add(court);
//     // No rotation needed: lies on XY plane by default

//     // 2. Function to add lines on court (as thin white rectangles)
//     function addCourtLine(x, y, width, height) {
//         const geometry = new THREE.PlaneGeometry(width, height);
//         const material = new THREE.MeshBasicMaterial({ color: lineColor, side: THREE.DoubleSide });
//         const line = new THREE.Mesh(geometry, material);
//         line.position.set(x, y, lineZ);
//         scene.add(line);
//     }

//     // 3. Add court lines (relative to court center at (0,0))
//     const halfCourt = courtLength / 2;
//     const halfWidth = doublesWidth / 2;
//     const singlesHalfWidth = singlesWidth / 2;
//     const basetoServe = (courtLength / 2) - serviceBoxDepth;

//     // Baselines (top & bottom)
//     addCourtLine(0, halfCourt, doublesWidth, lineThickness);
//     addCourtLine(0, -halfCourt, doublesWidth, lineThickness);

//     // Sidelines (doubles)
//     addCourtLine(halfWidth, 0, lineThickness, courtLength);
//     addCourtLine(-halfWidth, 0, lineThickness, courtLength);

//     // Singles Sidelines
//     addCourtLine(singlesHalfWidth, 0, lineThickness, courtLength);
//     addCourtLine(-singlesHalfWidth, 0, lineThickness, courtLength);

//     // Center service line (parallel to width)
//     addCourtLine(0, 0, doublesWidth, lineThickness);

//     // Service boxes (horizontal lines)
//     addCourtLine(0, serviceBoxDepth, singlesWidth, lineThickness);   // Near service line
//     addCourtLine(0, -serviceBoxDepth, singlesWidth, lineThickness);  // Far service line

//     // Center line (vertical line down center between service boxes)
//     addCourtLine(0, 0, lineThickness, serviceBoxDepth * 2);

    
//     const interactiveObjects = [];
//     function addCourtBox(x, y, width, height, color) {
//         const geometry = new THREE.PlaneGeometry(width, height);
//         const material = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide });
//         const line = new THREE.Mesh(geometry, material);
//         line.position.set(x, y, lineZ);
//         line.material.transparent = true;
//         line.material.opacity = 0;
//         scene.add(line);
//         interactiveObjects.push(line);
//     }

//     // addCourtBox(0, halfCourt / 2, doublesWidth, halfCourt, 0xff0000);
    
//     // CLOSE BASELINE BOXES
//     addCourtBox(0, -(serviceBoxDepth + (basetoServe/2)), doublesWidth / 3, basetoServe, 0x00ff00);
//     addCourtBox(-doublesWidth / 3, -(serviceBoxDepth + (basetoServe/2)), doublesWidth / 3, basetoServe, 0x00ff00);
//     addCourtBox(doublesWidth / 3, -(serviceBoxDepth + (basetoServe/2)), doublesWidth / 3, basetoServe, 0x00ff00);

//     // CLOSE SERVICE LINE BOXES
//     addCourtBox(0, -serviceBoxDepth / 2, doublesWidth / 3, serviceBoxDepth, 0x00ff00);
//     addCourtBox(-doublesWidth / 3, -serviceBoxDepth / 2, doublesWidth / 3, serviceBoxDepth, 0x00ff00);
//     addCourtBox(doublesWidth / 3, -serviceBoxDepth / 2, doublesWidth / 3, serviceBoxDepth, 0x00ff00);

//     // FAR SERVICE LINE BOXES
//     addCourtBox(0, serviceBoxDepth / 2, doublesWidth / 3, serviceBoxDepth, 0x00ff00);
//     addCourtBox(-doublesWidth / 3, serviceBoxDepth / 2, doublesWidth / 3, serviceBoxDepth, 0x00ff00);
//     addCourtBox(doublesWidth / 3, serviceBoxDepth / 2, doublesWidth / 3, serviceBoxDepth, 0x00ff00);

//     // FAR BASELINE BOXES
//     addCourtBox(0, (serviceBoxDepth + (basetoServe/2)), doublesWidth / 3, basetoServe, 0x00ff00);
//     addCourtBox(-doublesWidth / 3, (serviceBoxDepth + (basetoServe/2)), doublesWidth / 3, basetoServe, 0x00ff00);
//     addCourtBox(doublesWidth / 3, (serviceBoxDepth + (basetoServe/2)), doublesWidth / 3, basetoServe, 0x00ff00);

//     // Net line (optional visual)
//     const geometry = new THREE.PlaneGeometry(doublesWidth, 2.14); // width x height in local space
//     const material = new THREE.MeshBasicMaterial({ color: 0x555555, side: THREE.DoubleSide });
//     const line = new THREE.Mesh(geometry, material);
//     line.rotation.x = Math.PI / 2;
//     line.position.set(0, 0, 0);
//     scene.add(line);

//     function addArc(x1, y1, x2, y2, z1, z2, arcHeight, opac) {
//         const start = new THREE.Vector3(x1, y1, z1); // Starting point (e.g. racket contact)
//         const end = new THREE.Vector3(x2, y2, z2);   // Ending point (e.g. bounce or landing)

//         // Midpoint with extra height (arc peak)
//         const mid = new THREE.Vector3(
//             (x1 + x2) / 2,
//             (y1 + y2) / 2,
//             Math.max(z1, z2) + arcHeight // customize this height
//         );

//         // Create a smooth curve through start → mid → end
//         const curve = new THREE.CatmullRomCurve3([start, mid, end]);

//         // Generate points along the curve
//         const points = curve.getPoints(50);

//         // Create a line geometry from the points
//         const geometry = new THREE.BufferGeometry().setFromPoints(points);
//         const material = new THREE.LineBasicMaterial({ color: 0x888888, transparent: true, opacity: opac });
//         const arcLine = new THREE.Line(geometry, material);

//         scene.add(arcLine);
//     }

//     addArc(-doublesWidth / 3, -(serviceBoxDepth + (basetoServe/2)), 0, (serviceBoxDepth + (basetoServe/2)), lineZ, lineZ, 2, 0.4);
//     addArc(doublesWidth / 3, -(serviceBoxDepth + (basetoServe/2)), -doublesWidth / 3, (serviceBoxDepth + (basetoServe/2)), lineZ, lineZ, 2, 0.8);



//     function animate() {
//         requestAnimationFrame(animate);


//         renderer.render(scene, camera);
//     }

//     animate();

//     window.addEventListener('resize', () => {
//         const newWidth = contDiv.clientWidth;
//         const newHeight = contDiv.clientHeight;

//         renderer.setSize(newWidth, newHeight);
//         camera.aspect = newWidth / newHeight;
//         camera.updateProjectionMatrix();
//     });
// }




// window.addEventListener('resize', () => {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// });



















































import * as THREE from 'https://esm.sh/three@0.153.0';



// ✅ Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x181818); // black background

// const cameraHeight = 10; // height above court
const orbitRadius = 20;  // distance from court center (behind baseline)
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
camera.up.set(0, 1, 0); 
// camera.position.set(-orbitRadius, -orbitRadius, cameraHeight); // top-down
// camera.position.set(0, -orbitRadius, cameraHeight);
// camera.lookAt(0, 0, 0);

// ✅ Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ✅ Controls
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enablePan = false;
// controls.enableZoom = false;
// controls.maxAzimuthAngle = Math.PI / 2;
// controls.minAzimuthAngle = Math.PI / 2;

// Constants (all in meters)
const courtLength = 23.77;
const doublesWidth = 10.97;
const singlesWidth = 8.23;
const serviceBoxDepth = 6.4;
const lineThickness = 0.05;
const courtColor = 0x333333;
const lineColor = 0xffffff;
const lineZ = 0.001;  // Slight offset to avoid z-fighting

// 1. 🎾 Court surface (XY plane, Z-up)
const courtGeometry = new THREE.PlaneGeometry(doublesWidth, courtLength);
const courtMaterial = new THREE.MeshBasicMaterial({ color: courtColor });
const court = new THREE.Mesh(courtGeometry, courtMaterial);
scene.add(court);
// No rotation needed: lies on XY plane by default

// 2. ➕ Function to add lines on court (as thin white rectangles)
function addCourtLine(x, y, width, height) {
    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshBasicMaterial({ color: lineColor, side: THREE.DoubleSide });
    const line = new THREE.Mesh(geometry, material);
    line.position.set(x, y, lineZ);
    scene.add(line);
}

// 3. ➕ Add court lines (relative to court center at (0,0))
const halfCourt = courtLength / 2;
const halfWidth = doublesWidth / 2;
const singlesHalfWidth = singlesWidth / 2;

// Baselines (top & bottom)
addCourtLine(0, halfCourt, doublesWidth, lineThickness);
addCourtLine(0, -halfCourt, doublesWidth, lineThickness);

// Sidelines (doubles)
addCourtLine(halfWidth, 0, lineThickness, courtLength);
addCourtLine(-halfWidth, 0, lineThickness, courtLength);

// Singles Sidelines
addCourtLine(singlesHalfWidth, 0, lineThickness, courtLength);
addCourtLine(-singlesHalfWidth, 0, lineThickness, courtLength);

// Center service line (parallel to width)
addCourtLine(0, 0, doublesWidth, lineThickness);

// Service boxes (horizontal lines)
addCourtLine(0, serviceBoxDepth, singlesWidth, lineThickness);   // Near service line
addCourtLine(0, -serviceBoxDepth, singlesWidth, lineThickness);  // Far service line

// Center line (vertical line down center between service boxes)
addCourtLine(0, 0, lineThickness, serviceBoxDepth * 2);

// Net line (optional visual)
// addCourtLine(0, 0, doublesWidth, lineThickness);  // Net overlaps center, same as center service

const axesHelper = new THREE.AxesHelper(5); // size 5 units
scene.add(axesHelper);

let angle = 0;

function animate() {
    requestAnimationFrame(animate);

    // angle += 0.01;
    angle = 0;

    const y = Math.cos(angle) * -orbitRadius;
    const x = Math.sin(angle) * -orbitRadius;

    // Update camera position
    // camera.position.set(x, -orbitRadius + y, 20);
    camera.position.set(x, y, 15);

    camera.up.set(0, 1, 0);

    // Look at origin
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
}

animate();


// ✅ Render loop
// function animate() {
//     requestAnimationFrame(animate);
//     controls.update();

//     camera.lookAt(0, 0, 0);
//     renderer.render(scene, camera);
//     // console.log(camera.position.x, camera.position.y, camera.position.z);
// }
// animate();

// ✅ Resize handling
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
