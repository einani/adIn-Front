import * as THREE from 'https://esm.sh/three@0.153.0';


let sceneInitialized = false;
let numMat = 0;
let newData = null;
let zones = [];

// A place to store all arcs grouped by zone
let zoneArcs = {};
let selectedZones = new Set(); // Keeps track of zones the user has clicked


globalThis.pidDataType0 = {"forehand": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0}, 
                    "backhand": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "forehandVolley": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "backhandVolley": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "forehandDrop": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "backhandDrop": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "forehandSlice": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "backhandSlice": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "smash": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "trick": {"in": 0, "shank": 0}};
globalThis.pidDataType1 = {"forehand": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0}, 
                    "backhand": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "forehandVolley": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "backhandVolley": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "forehandDrop": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "backhandDrop": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "forehandSlice": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "backhandSlice": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "smash": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "trick": {"in": 0, "shank": 0}};
globalThis.pidDataType2 = {"forehand": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0}, 
                    "backhand": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "forehandVolley": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "backhandVolley": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "forehandDrop": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "backhandDrop": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "forehandSlice": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "backhandSlice": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "smash": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "trick": {"in": 0, "shank": 0}};
globalThis.pidDataType3 = {"forehand": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0}, 
                    "backhand": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "forehandVolley": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "backhandVolley": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "forehandDrop": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "backhandDrop": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "forehandSlice": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "backhandSlice": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "smash": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "trick": {"in": 0, "shank": 0}};
globalThis.pidDataType4 = {"forehand": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0}, 
                    "backhand": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "forehandVolley": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "backhandVolley": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "forehandDrop": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "backhandDrop": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "forehandSlice": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "backhandSlice": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "smash": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "trick": {"in": 0, "shank": 0}};
globalThis.pidDataType5 = {"forehand": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0}, 
                    "backhand": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "forehandVolley": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "backhandVolley": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "forehandDrop": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "backhandDrop": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "forehandSlice": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "backhandSlice": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "smash": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                    "trick": {"in": 0, "shank": 0}};


const contDiv = document.getElementById('shot-chart2');

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


const tableCells = {
    backhand: document.getElementById('bh-st'),
    backhandDrop: document.getElementById('bh-dr'),
    backhandSlice: document.getElementById('bh-sl'),
    backhandVolley: document.getElementById('bh-vo'),
    forehand: document.getElementById('fh-st'),
    forehandDrop: document.getElementById('fh-dr'),
    forehandSlice: document.getElementById('fh-sl'),
    forehandVolley: document.getElementById('fh-vo'),
    smash: document.getElementById('sm-st'),
    trick: document.getElementById('tr-st')
};

const tableCells2 = {
    backhand: document.getElementById('bh'),
    forehand: document.getElementById('fh'),
    smash: document.getElementById('sm'),
    trick: document.getElementById('tr')
};

const directions = {
    cross: 'cr',
    middle: 'mi',
    dtl: 'dt',
    insideOut: 'io',
    insideIn: 'ii',
    shank: 'sh'
};

const trickDirections = {
    in: 'in',   // special key → id suffix 'in'
    shank: 'sh' // same as others
};

function updateTable(newData) {
    // for (const key in newData) {
    //     if (tableCells[key]) {
    //         let total = 0;
    //         for (const key2 in newData[key]) {
    //             total += newData[key][key2];
    //         }
    //         tableCells[key].textContent = total;
    //     }
    // }

    // --- Step 1: Update totals for each shot type ---
    for (const key in newData) {
        if (tableCells[key]) {
            let total = 0;

            // Choose which direction map to use
            const dirMap = (key === 'trick') ? trickDirections : directions;

            for (const dir in newData[key]) {
                const value = newData[key][dir];
                total += value;

                if (dirMap[dir]) {
                    const dirSuffix = dirMap[dir];
                    const dirId = tableCells[key].id + '-' + dirSuffix;
                    const dirElement = document.getElementById(dirId);
                    if (dirElement) dirElement.textContent = value;
                }
            }

            // Fill total for main shot type cell
            tableCells[key].textContent = total;
        }
    }

    const groupings = {
        backhand: ['backhand', 'backhandDrop', 'backhandSlice', 'backhandVolley'],
        forehand: ['forehand', 'forehandDrop', 'forehandSlice', 'forehandVolley'],
        smash: ['smash'],
        trick: ['trick']
    };

    for (const key in tableCells2) {
        let groupTotal = 0;
        const group = groupings[key];

        for (const subKey of group) {
            const cell = tableCells[subKey];
            if (cell && !isNaN(parseFloat(cell.textContent))) {
                groupTotal += parseFloat(cell.textContent);
            }
        }

        tableCells2[key].textContent = groupTotal;
    }

    // --- Step 3: Compute grand total of all totals ---
    let grandTotal = 0;
    for (const key in tableCells) {
        const val = parseFloat(tableCells[key].textContent);
        if (!isNaN(val)) grandTotal += val;
    }

    // --- Step 4: Convert all displayed values to percentages ---
    if (grandTotal > 0) {
        // Update main shot cells
        for (const key in tableCells) {
            const cell = tableCells[key];
            const val = parseFloat(cell.textContent);
            if (!isNaN(val)) {
                cell.textContent = ((val / grandTotal) * 100).toFixed(1) + '%';
            }
        }

        // Update group cells
        for (const key in tableCells2) {
            const cell = tableCells2[key];
            const val = parseFloat(cell.textContent);
            if (!isNaN(val)) {
                cell.textContent = ((val / grandTotal) * 100).toFixed(1) + '%';
            }
        }

        // Update directional subcells too (optional)
        for (const key in newData) {
            const dirMap = (key === 'trick') ? trickDirections : directions;
            for (const dir in newData[key]) {
                if (dirMap[dir]) {
                    const dirSuffix = dirMap[dir];
                    const dirId = tableCells[key].id + '-' + dirSuffix;
                    const dirElement = document.getElementById(dirId);
                    const val = newData[key][dir];
                    if (dirElement && !isNaN(val)) {
                        dirElement.textContent = ((val / grandTotal) * 100).toFixed(1) + '%';
                    }
                }
            }
        }
    }
}

function toggleZone(zoneName) {
    if (selectedZones.has(zoneName)) {
        selectedZones.delete(zoneName);
    } else {
        selectedZones.add(zoneName);
    }
    // console.log(selectedZones);
    updateArcVisibility();
}

function updateArcVisibility() {
    // First, hide all arcs
    for (const zone in zoneArcs) {
        for (const arc of zoneArcs[zone]) {
            arc.visible = false;
        }
    }

    if (selectedZones.size == 0) {
        for (const zone in zoneArcs) {
            for (const arc of zoneArcs[zone]) {
                arc.visible = true;
            }
        }
    }

    // Show only arcs in selected zones
    for (const zone of selectedZones) {
        if (!zoneArcs[zone]) continue;
        for (const arc of zoneArcs[zone]) {
            arc.visible = true;
        }
    }
}



function initScene(width, height, weightList, weightList2) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredMesh = null;

    const contDiv = document.getElementById('shot-chart2');
    
    const scene = new THREE.Scene();
    // scene.background = new THREE.Color(0x181818); // black background


    const cameraHeight = 20; // height above court
    const orbitRadius = 20;  // distance from court center (behind baseline)
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    // camera.aspect = width / height;
    // camera.updateProjectionMatrix();
    camera.up.set(0, 1, 0); 
    camera.position.set(0, -orbitRadius, cameraHeight);
    camera.lookAt(0, 0, 0);


    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    contDiv.appendChild(renderer.domElement);

    function onMouseMove(event) {
        const rect = renderer.domElement.getBoundingClientRect();

        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(interactiveObjects);

        if (intersects.length > 0) {
            const mesh = intersects[0].object;

            // Only apply hover effect if not clicked
            if (hoveredMesh !== mesh) {
                // Restore previous hovered mesh (if it exists and is not clicked)
                if (hoveredMesh && !hoveredMesh.userData.isClicked) {
                    hoveredMesh.material.color.set(hoveredMesh.userData.originalColor);
                    hoveredMesh.material.transparent = true;
                    hoveredMesh.material.opacity = 0;
                }

                // Don't override color if it's clicked
                if (!mesh.userData.isClicked) {
                    if (!mesh.userData.originalColor) {
                        mesh.userData.originalColor = mesh.material.color.getHex();
                    }

                    mesh.material.color.set(0x00ff00); // yellow for hover
                    mesh.material.transparent = true;
                    mesh.material.opacity = 0.2;
                }

                hoveredMesh = mesh;
            }

            document.body.style.cursor = 'pointer';
        } else {
            // Only reset hover effect if it's not clicked
            if (hoveredMesh && !hoveredMesh.userData.isClicked) {
                hoveredMesh.material.color.set(hoveredMesh.userData.originalColor);
                hoveredMesh.material.transparent = true;
                hoveredMesh.material.opacity = 0;
                hoveredMesh = null;
            }

            document.body.style.cursor = 'default';
        }
    }

    function onMouseClick(event) {
        const rect = renderer.domElement.getBoundingClientRect();

        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(interactiveObjects);

        if (intersects.length > 0) {
            const clickedMesh = intersects[0].object;

            if (!clickedMesh.userData.originalColor) {
                clickedMesh.userData.originalColor = clickedMesh.material.color.getHex();
            }

            // Toggle clicked state
            if (clickedMesh.userData.isClicked) {
                // Revert to original color and transparency
                clickedMesh.material.color.set(clickedMesh.userData.originalColor);
                clickedMesh.material.transparent = true;
                clickedMesh.material.opacity = 0;
                clickedMesh.userData.isClicked = false;

                const index = zones.indexOf(clickedMesh.name);
                if (index !== -1) {
                    zones.splice(index, 1);
                }
                newData = calcStat(zones);
                updateTable(newData);
                toggleZone(clickedMesh.name);
            } else {
                // Mark as clicked
                clickedMesh.material.color.set(0x00ff00); // red
                clickedMesh.material.transparent = true;
                clickedMesh.material.opacity = 0.5;
                clickedMesh.userData.isClicked = true;

                if (!zones.includes(clickedMesh.name)) {
                    zones.push(clickedMesh.name);
                }
                newData = calcStat(zones);
                updateTable(newData);
                toggleZone(clickedMesh.name);
            }

            console.log('Clicked:', clickedMesh.name || clickedMesh, 'Clicked:', clickedMesh.userData.isClicked);
        }
    }

    
    renderer.domElement.addEventListener('mousemove', onMouseMove, false);
    renderer.domElement.addEventListener('click', onMouseClick, false);



    const courtLength = 23.77;
    const doublesWidth = 10.97;
    const singlesWidth = 8.23;
    const serviceBoxDepth = 6.4;
    const lineThickness = 0.05;
    const courtColor = 0x333333;
    const lineColor = 0xffffff;
    const lineZ = 0.001;  // Slight offset to avoid z-fighting

    // 1. Court surface (XY plane, Z-up)
    const courtGeometry = new THREE.PlaneGeometry(doublesWidth, courtLength);
    const courtMaterial = new THREE.MeshBasicMaterial({ color: courtColor });
    const court = new THREE.Mesh(courtGeometry, courtMaterial);
    scene.add(court);
    // No rotation needed: lies on XY plane by default

    // 2. Function to add lines on court (as thin white rectangles)
    function addCourtLine(x, y, width, height) {
        const geometry = new THREE.PlaneGeometry(width, height);
        const material = new THREE.MeshBasicMaterial({ color: lineColor, side: THREE.DoubleSide });
        const line = new THREE.Mesh(geometry, material);
        line.position.set(x, y, lineZ);
        scene.add(line);
    }

    // 3. Add court lines (relative to court center at (0,0))
    const halfCourt = courtLength / 2;
    const halfWidth = doublesWidth / 2;
    const singlesHalfWidth = singlesWidth / 2;
    const basetoServe = (courtLength / 2) - serviceBoxDepth;

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

    
    const interactiveObjects = [];
    function addCourtBox(x, y, width, height, color, name) {
        const geometry = new THREE.PlaneGeometry(width, height);
        const material = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide });
        const line = new THREE.Mesh(geometry, material);
        line.name = name;
        line.position.set(x, y, lineZ);
        line.material.transparent = true;
        line.material.opacity = 0;
        scene.add(line);
        interactiveObjects.push(line);
    }

    // addCourtBox(0, halfCourt / 2, doublesWidth, halfCourt, 0xff0000);
    
    // CLOSE BASELINE BOXES
    addCourtBox(0, -(serviceBoxDepth + (basetoServe/2)), doublesWidth / 3, basetoServe, 0x00ff00, "zone4");                          // zone4
    addCourtBox(-doublesWidth / 3, -(serviceBoxDepth + (basetoServe/2)), doublesWidth / 3, basetoServe, 0x00ff00, "zone3");          // zone3
    addCourtBox(doublesWidth / 3, -(serviceBoxDepth + (basetoServe/2)), doublesWidth / 3, basetoServe, 0x00ff00, "zone5");           // zone5

    // CLOSE SERVICE LINE BOXES
    addCourtBox(0, -serviceBoxDepth / 2, doublesWidth / 3, serviceBoxDepth, 0x00ff00, "zone1");                                      // zone1
    addCourtBox(-doublesWidth / 3, -serviceBoxDepth / 2, doublesWidth / 3, serviceBoxDepth, 0x00ff00, "zone0");                      // zone0
    addCourtBox(doublesWidth / 3, -serviceBoxDepth / 2, doublesWidth / 3, serviceBoxDepth, 0x00ff00, "zone2");                       // zone2

    // FAR SERVICE LINE BOXES
    addCourtBox(0, serviceBoxDepth / 2, doublesWidth / 3, serviceBoxDepth, 0x00ff00, "zone11");                                      // zone11
    addCourtBox(-doublesWidth / 3, serviceBoxDepth / 2, doublesWidth / 3, serviceBoxDepth, 0x00ff00, "zone12");                      // zone10
    addCourtBox(doublesWidth / 3, serviceBoxDepth / 2, doublesWidth / 3, serviceBoxDepth, 0x00ff00, "zone10");                       // zone12

    // FAR BASELINE BOXES
    addCourtBox(0, (serviceBoxDepth + (basetoServe/2)), doublesWidth / 3, basetoServe, 0x00ff00, "zone14");                          // zone14
    addCourtBox(-doublesWidth / 3, (serviceBoxDepth + (basetoServe/2)), doublesWidth / 3, basetoServe, 0x00ff00, "zone15");          // zone13
    addCourtBox(doublesWidth / 3, (serviceBoxDepth + (basetoServe/2)), doublesWidth / 3, basetoServe, 0x00ff00, "zone13");           // zone15

    // Net line (optional visual)
    const geometry = new THREE.PlaneGeometry(doublesWidth, 2.14); // width x height in local space
    const material = new THREE.MeshBasicMaterial({ color: 0x555555, side: THREE.DoubleSide });
    const line = new THREE.Mesh(geometry, material);
    line.rotation.x = Math.PI / 2;
    line.position.set(0, 0, 0);
    scene.add(line);

    function addArc(x1, y1, x2, y2, z1, z2, arcHeight, opac) {
        const start = new THREE.Vector3(x1, y1, z1); // Starting point (e.g. racket contact)
        const end = new THREE.Vector3(x2, y2, z2);   // Ending point (e.g. bounce or landing)

        // Midpoint with extra height (arc peak)
        const mid = new THREE.Vector3(
            (x1 + x2) / 2,
            (y1 + y2) / 2,
            Math.max(z1, z2) + arcHeight // customize this height
        );

        // Create a smooth curve through start → mid → end
        const curve = new THREE.CatmullRomCurve3([start, mid, end]);

        // Generate points along the curve
        const points = curve.getPoints(50);

        // Create a line geometry from the points
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        // const material = new THREE.LineBasicMaterial({ color: 0x888888, transparent: true, opacity: opac });
        const material = new THREE.LineBasicMaterial({ color: 0x1bd883, transparent: true, opacity: opac });
        const arcLine = new THREE.Line(geometry, material);

        scene.add(arcLine);
        return arcLine;
    }

    const minVal = Math.min(...weightList);
    const maxVal = Math.max(...weightList);

    const normalized = weightList.map(val => {
        // Normalize to 0–1
        const scaled = (val - minVal) / (maxVal - minVal);

        // Scale to range 0.2–1.0
        const adjusted = 0.2 + (scaled * 0.8); // 0.8 is the range (1.0 - 0.2)

        // Round to nearest 0.01
        return Math.round(adjusted * 100) / 100;
    });

    // const normalized2 = weightList.map(val => {
    //     // Normalize to 0–1
    //     const scaled = (val - minVal) / (maxVal - minVal);

    //     // Round to nearest 0.01
    //     return Math.round(scaled * 100) / 100;
    // });

    // A wrapper function that both adds the arc and stores it by zone
    function addArcToZone(zoneI1, zoneI2, x1, y1, x2, y2, z1, z2, width, normalizedVal) {
        const arc = addArc(x1, y1, x2, y2, z1, z2, width, normalizedVal);

        if (!zoneArcs[zoneI1]) {
            zoneArcs[zoneI1] = [];
        }
        if (!zoneArcs[zoneI2]) {
            zoneArcs[zoneI2] = [];
        }
        zoneArcs[zoneI1].push(arc);
        zoneArcs[zoneI2].push(arc);
    }


    addArcToZone("zone4", "zone15", 0                 + 0.0, -(serviceBoxDepth + (basetoServe/2)) + 0.0, -doublesWidth / 3 + 0.0, (serviceBoxDepth + (basetoServe/2)) + 0.0, lineZ, lineZ, 2 + 0.0, normalized[29]);
    addArcToZone("zone4", "zone14", 0                 + 0.0, -(serviceBoxDepth + (basetoServe/2)) + 0.0, 0                 + 0.0, (serviceBoxDepth + (basetoServe/2)) + 0.0, lineZ, lineZ, 2 + 0.0, normalized[28]);
    addArcToZone("zone4", "zone13", 0                 + 0.0, -(serviceBoxDepth + (basetoServe/2)) + 0.0, doublesWidth / 3  + 0.0, (serviceBoxDepth + (basetoServe/2)) + 0.0, lineZ, lineZ, 2 + 0.0, normalized[27]);
    addArcToZone("zone5", "zone15", doublesWidth / 3  + 0.0, -(serviceBoxDepth + (basetoServe/2)) + 0.0, -doublesWidth / 3 + 0.0, (serviceBoxDepth + (basetoServe/2)) + 0.0, lineZ, lineZ, 2 + 0.0, normalized[35]);
    addArcToZone("zone5", "zone14", doublesWidth / 3  + 0.0, -(serviceBoxDepth + (basetoServe/2)) + 0.0, 0                 + 0.0, (serviceBoxDepth + (basetoServe/2)) + 0.0, lineZ, lineZ, 2 + 0.0, normalized[34]);
    addArcToZone("zone5", "zone13", doublesWidth / 3  + 0.0, -(serviceBoxDepth + (basetoServe/2)) + 0.0, doublesWidth / 3  + 0.0, (serviceBoxDepth + (basetoServe/2)) + 0.0, lineZ, lineZ, 2 + 0.0, normalized[33]);
    addArcToZone("zone3", "zone14", -doublesWidth / 3 + 0.0, -(serviceBoxDepth + (basetoServe/2)) + 0.0, 0                 + 0.0, (serviceBoxDepth + (basetoServe/2)) + 0.0, lineZ, lineZ, 2 + 0.0, normalized[22]);
    addArcToZone("zone3", "zone15", -doublesWidth / 3 + 0.0, -(serviceBoxDepth + (basetoServe/2)) + 0.0, -doublesWidth / 3 + 0.0, (serviceBoxDepth + (basetoServe/2)) + 0.0, lineZ, lineZ, 2 + 0.0, normalized[23]);
    addArcToZone("zone3", "zone13", -doublesWidth / 3 + 0.0, -(serviceBoxDepth + (basetoServe/2)) + 0.0, doublesWidth / 3  + 0.0, (serviceBoxDepth + (basetoServe/2)) + 0.0, lineZ, lineZ, 2 + 0.0, normalized[21]);

    addArcToZone("zone4", "zone12", 0                 + 0.0, -(serviceBoxDepth + (basetoServe/2)) + 0.0, -doublesWidth / 3 + 0.0, (serviceBoxDepth/2) + 0.0, lineZ, lineZ, 2 + 0.0, normalized[26]);
    addArcToZone("zone4", "zone11", 0                 + 0.0, -(serviceBoxDepth + (basetoServe/2)) + 0.0, 0                 + 0.0, (serviceBoxDepth/2) + 0.0, lineZ, lineZ, 2 + 0.0, normalized[25]);
    addArcToZone("zone4", "zone10", 0                 + 0.0, -(serviceBoxDepth + (basetoServe/2)) + 0.0, doublesWidth / 3  + 0.0, (serviceBoxDepth/2) + 0.0, lineZ, lineZ, 2 + 0.0, normalized[24]);
    addArcToZone("zone5", "zone12", doublesWidth / 3  + 0.0, -(serviceBoxDepth + (basetoServe/2)) + 0.0, -doublesWidth / 3 + 0.0, (serviceBoxDepth/2) + 0.0, lineZ, lineZ, 2 + 0.0, normalized[32]);
    addArcToZone("zone5", "zone11", doublesWidth / 3  + 0.0, -(serviceBoxDepth + (basetoServe/2)) + 0.0, 0                 + 0.0, (serviceBoxDepth/2) + 0.0, lineZ, lineZ, 2 + 0.0, normalized[31]);
    addArcToZone("zone5", "zone10", doublesWidth / 3  + 0.0, -(serviceBoxDepth + (basetoServe/2)) + 0.0, doublesWidth / 3  + 0.0, (serviceBoxDepth/2) + 0.0, lineZ, lineZ, 2 + 0.0, normalized[30]);
    addArcToZone("zone3", "zone11", -doublesWidth / 3 + 0.0, -(serviceBoxDepth + (basetoServe/2)) + 0.0, 0                 + 0.0, (serviceBoxDepth/2) + 0.0, lineZ, lineZ, 2 + 0.0, normalized[19]);
    addArcToZone("zone3", "zone12", -doublesWidth / 3 + 0.0, -(serviceBoxDepth + (basetoServe/2)) + 0.0, -doublesWidth / 3 + 0.0, (serviceBoxDepth/2) + 0.0, lineZ, lineZ, 2 + 0.0, normalized[20]);
    addArcToZone("zone3", "zone10", -doublesWidth / 3 + 0.0, -(serviceBoxDepth + (basetoServe/2)) + 0.0, doublesWidth / 3  + 0.0, (serviceBoxDepth/2) + 0.0, lineZ, lineZ, 2 + 0.0, normalized[18]);

    addArcToZone("zone1", "zone12", 0                 + 0.0, -(serviceBoxDepth /2) + 0.0, -doublesWidth / 3 + 0.0, (serviceBoxDepth/2) + 0.0, lineZ, lineZ, 2 + 0.0, normalized[8]);
    addArcToZone("zone1", "zone11", 0                 + 0.0, -(serviceBoxDepth /2) + 0.0, 0                 + 0.0, (serviceBoxDepth/2) + 0.0, lineZ, lineZ, 2 + 0.0, normalized[7]);
    addArcToZone("zone1", "zone10", 0                 + 0.0, -(serviceBoxDepth /2) + 0.0, doublesWidth / 3  + 0.0, (serviceBoxDepth/2) + 0.0, lineZ, lineZ, 2 + 0.0, normalized[6]);
    addArcToZone("zone2", "zone12", doublesWidth / 3  + 0.0, -(serviceBoxDepth /2) + 0.0, -doublesWidth / 3 + 0.0, (serviceBoxDepth/2) + 0.0, lineZ, lineZ, 2 + 0.0, normalized[14]);
    addArcToZone("zone2", "zone11", doublesWidth / 3  + 0.0, -(serviceBoxDepth /2) + 0.0, 0                 + 0.0, (serviceBoxDepth/2) + 0.0, lineZ, lineZ, 2 + 0.0, normalized[13]);
    addArcToZone("zone2", "zone10", doublesWidth / 3  + 0.0, -(serviceBoxDepth /2) + 0.0, doublesWidth / 3  + 0.0, (serviceBoxDepth/2) + 0.0, lineZ, lineZ, 2 + 0.0, normalized[12]);
    addArcToZone("zone0", "zone11", -doublesWidth / 3 + 0.0, -(serviceBoxDepth /2) + 0.0, 0                 + 0.0, (serviceBoxDepth/2) + 0.0, lineZ, lineZ, 2 + 0.0, normalized[1]);
    addArcToZone("zone0", "zone12", -doublesWidth / 3 + 0.0, -(serviceBoxDepth /2) + 0.0, -doublesWidth / 3 + 0.0, (serviceBoxDepth/2) + 0.0, lineZ, lineZ, 2 + 0.0, normalized[2]);
    addArcToZone("zone0", "zone10", -doublesWidth / 3 + 0.0, -(serviceBoxDepth /2) + 0.0, doublesWidth / 3  + 0.0, (serviceBoxDepth/2) + 0.0, lineZ, lineZ, 2 + 0.0, normalized[0]);

    addArcToZone("zone1", "zone15", 0                 + 0.0, -(serviceBoxDepth /2) + 0.0, -doublesWidth / 3 + 0.0, (serviceBoxDepth + (basetoServe/2)) + 0.0, lineZ, lineZ, 2 + 0.0, normalized[11]);
    addArcToZone("zone1", "zone14", 0                 + 0.0, -(serviceBoxDepth /2) + 0.0, 0                 + 0.0, (serviceBoxDepth + (basetoServe/2)) + 0.0, lineZ, lineZ, 2 + 0.0, normalized[10]);
    addArcToZone("zone1", "zone13", 0                 + 0.0, -(serviceBoxDepth /2) + 0.0, doublesWidth / 3  + 0.0, (serviceBoxDepth + (basetoServe/2)) + 0.0, lineZ, lineZ, 2 + 0.0, normalized[9]);
    addArcToZone("zone2", "zone15", doublesWidth / 3  + 0.0, -(serviceBoxDepth /2) + 0.0, -doublesWidth / 3 + 0.0, (serviceBoxDepth + (basetoServe/2)) + 0.0, lineZ, lineZ, 2 + 0.0, normalized[17]);
    addArcToZone("zone2", "zone14", doublesWidth / 3  + 0.0, -(serviceBoxDepth /2) + 0.0, 0                 + 0.0, (serviceBoxDepth + (basetoServe/2)) + 0.0, lineZ, lineZ, 2 + 0.0, normalized[16]);
    addArcToZone("zone2", "zone13", doublesWidth / 3  + 0.0, -(serviceBoxDepth /2) + 0.0, doublesWidth / 3  + 0.0, (serviceBoxDepth + (basetoServe/2)) + 0.0, lineZ, lineZ, 2 + 0.0, normalized[15]);
    addArcToZone("zone0", "zone14", -doublesWidth / 3 + 0.0, -(serviceBoxDepth /2) + 0.0, 0                 + 0.0, (serviceBoxDepth + (basetoServe/2)) + 0.0, lineZ, lineZ, 2 + 0.0, normalized[4]);
    addArcToZone("zone0", "zone15", -doublesWidth / 3 + 0.0, -(serviceBoxDepth /2) + 0.0, -doublesWidth / 3 + 0.0, (serviceBoxDepth + (basetoServe/2)) + 0.0, lineZ, lineZ, 2 + 0.0, normalized[5]);
    addArcToZone("zone0", "zone13", -doublesWidth / 3 + 0.0, -(serviceBoxDepth /2) + 0.0, doublesWidth / 3  + 0.0, (serviceBoxDepth + (basetoServe/2)) + 0.0, lineZ, lineZ, 2 + 0.0, normalized[3]);

    console.log(zoneArcs);


    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        const newWidth = contDiv.clientWidth;
        const newHeight = contDiv.clientHeight;

        renderer.setSize(newWidth, newHeight);
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
    });
}


function calcStat(zones) {
    const pidDataType00 = {"forehand": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0}, 
                            "backhand": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                            "forehandVolley": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                            "backhandVolley": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                            "forehandDrop": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                            "backhandDrop": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                            "forehandSlice": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                            "backhandSlice": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                            "smash": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
                            "trick": {"in": 0, "shank": 0}};
    
    if (zones.length == 0) {
        let zonesT = ["zone0", "zone1", "zone2", "zone3", "zone4", "zone5"];
        // let pidList = zonesT.map(z => "pidDataType" + z.slice(-1));
        let pidList = [];

        for (const z of zonesT) {
            const num = z.slice(-1); // get trailing digits
            const variableName = "pidDataType" + num;
            // console.log(variableName);

            // Access the variable dynamically
            const zoneData = globalThis[variableName];

            // console.log(zoneData);
            if (zoneData) pidList.push(zoneData);
        }
        for (const zoneData of pidList) {
            // console.log(zoneData);
            for (const shotType in zoneData) {
                const shotData = zoneData[shotType];
                if (!pidDataType00[shotType]) continue;

                for (const direction in shotData) {
                    if (pidDataType00[shotType][direction] !== undefined) {
                        pidDataType00[shotType][direction] += shotData[direction];
                    }
                }
            }
        }
    } else {
        let pidList = [];
        for (const z of zones) {
            if (/zone\d{2,}/.test(z)) continue;
            const num = z.slice(-1); // get trailing digits
            const variableName = "pidDataType" + num;

            // Access the variable dynamically
            const zoneData = globalThis[variableName];

            if (zoneData) pidList.push(zoneData);
        }
        for (const zoneData of pidList) {
            // Skip zones with two digits after "zone"
            // if (/zone\d{2,}/.test(zoneData.zone)) continue;
            // if (/zone\d{2,}/.test(zoneData)) continue;
            // pidList.push("pidDataType" + zoneData.slice(-1));
            // let pidList = zonesT.map(z => "pidDataType" + z.slice(-1));

            for (const shotType in zoneData) {
                const shotData = zoneData[shotType];
                if (!pidDataType00[shotType]) continue;

                for (const direction in shotData) {
                    if (pidDataType00[shotType][direction] !== undefined) {
                        pidDataType00[shotType][direction] += shotData[direction];
                    }
                }
            }
        }
    }

    return pidDataType00;
}



// SHOT CHART TABLES AND DATA LOAD

document.addEventListener("DOMContentLoaded", async () => {
    const urlParams2 = new URLSearchParams(window.location.search);
    const pageId = urlParams2.get('id'); // The page ID to filter by

    // Base URL and file pattern
    const baseUrl = 'https://raw.githubusercontent.com/einani/adIn-data/main/data/';
    const baseName = '24and25Charting1025split';
    const maxFiles = 30; // Adjust if you might have more splits

    // Function to fetch and combine all split JSON files
    async function fetchAllSplitFiles() {
        const combinedData = {};

        for (let i = 0; i < maxFiles; i++) {
            const fileUrl = `${baseUrl}${baseName}${i}.json`;
            try {
                const response = await fetch(fileUrl);
                if (!response.ok) continue; // Skip missing files
                const data = await response.json();

                // Merge objects
                Object.assign(combinedData, data);
            } catch (err) {
                console.error(`Error fetching ${fileUrl}:`, err);
            }
        }
        return combinedData;
    }

    try {
        const data = await fetchAllSplitFiles();

        // Filter keys containing the page ID
        const relevantEntries = Object.entries(data).filter(
            ([key, _]) => key.includes(pageId)
        );

        const pidDataType = {
            "zone0": { "o": {}, "vs": {} },
            "zone1": { "o": {}, "vs": {} },
            "zone2": { "o": {}, "vs": {} },
            "zone3": { "o": {}, "vs": {} },
            "zone4": { "o": {}, "vs": {} },
            "zone5": { "o": {}, "vs": {} }
        };

        const shotTypes = [
            "Serve", "Backhand", "Forehand", "Backhand Slice", "Forehand Slice",
            "Backhand Volley", "Forehand Volley", "Backhand Drop", "Forehand Drop",
            "Trick Shot", "Smash"
        ];


        // [0, 1, 2, 3, 4, 5, shank]
        // Populate each zone
        for (const zoneKey2 in pidDataType) {
            ["o", "vs"].forEach(section => {
                shotTypes.forEach(shot => {
                    pidDataType[zoneKey2][section][shot] = [0, 0, 0, 0, 0, 0, 0];
                });
            });
        }

        const pidData = {
            "zone0": { "o": {}, "vs": {} },
            "zone1": { "o": {}, "vs": {} },
            "zone2": { "o": {}, "vs": {} },
            "zone3": { "o": {}, "vs": {} },
            "zone4": { "o": {}, "vs": {} },
            "zone5": { "o": {}, "vs": {} },
            "zone10": { "o": {}, "vs": {} },
            "zone11": { "o": {}, "vs": {} },
            "zone12": { "o": {}, "vs": {} },
            "zone13": { "o": {}, "vs": {} },
            "zone14": { "o": {}, "vs": {} },
            "zone15": { "o": {}, "vs": {} },
            "shank": {"o": {}, "vs": {} }
        };

        // [W, UE, FE, RALLY]
        // Populate each zone
        for (const zoneKey in pidData) {
            ["o", "vs"].forEach(section => {
                shotTypes.forEach(shot => {
                    pidData[zoneKey][section][shot] = [0, 0, 0, 0];
                });
            });
        }

        console.log(pidData);
        // [0 to 0, 0 to 1, 0 to 2, etc.]
        const weightList = [0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 
                            0, 0, 0, 0, 0, 0, 
                            0, 0, 0, 0, 0, 0, 
                            0, 0, 0, 0, 0, 0, 
                            0, 0, 0, 0, 0, 0];
        const weightList2 = [0, 0, 0, 0, 0, 0, 
                            0, 0, 0, 0, 0, 0, 
                            0, 0, 0, 0, 0, 0, 
                            0, 0, 0, 0, 0, 0, 
                            0, 0, 0, 0, 0, 0, 
                            0, 0, 0, 0, 0, 0];
        // ADD THE SHANKS KEY TO THE DICT, remembber to account for this in the parsing


        // // Process the matching entries
        // relevantEntries.forEach(([key, value]) => {
        //     value.forEach() {

        //     }
        //     console.log(`Key: ${key}, Value: ${value}`);
        //     // Do something with value (e.g., update the DOM)
        // });
        // for (const [key, value] of Object.entries(relevantEntries)) {
        relevantEntries.forEach(([key, value]) => {
            // console.log(`Key: ${key}`);
            // key = key;
            numMat += 1;
            for (const sublist of value) {
                // const serverCheck = sublist[0];
                // console.log(`  Check value: ${serverCheck}`);

                // console.log(sublist[0]);
                if (sublist[0].includes(pageId)) {
                    // Iterate over each inner list (skipping index 0)
                    for (let i = 1; i < sublist.length; i++) {
                        const innerList = sublist[i];
                        // console.log(innerList);

                        if (innerList[3] == 88) {
                            // Shot coming from nowhere
                            continue;
                        }
                        if (innerList[2] == 88) {
                            // Shot type unknown
                            innerList[2] = 9;
                        }
                        if (innerList[2] == 0) {
                            // Serve
                            continue;
                        } else if (innerList[1] == 10) {
                            // Null for Faults
                            continue;
                        } else {
                            if (i % 2 == 0) {
                                // vs
                                let temp1 = pidData["zone1" + innerList[3]];
                                let temp2 = pidData["zone" + innerList[4]];    
                                if (innerList[4] == 88) {
                                    // Shank
                                    temp2 = pidData["shank"];
                                } else {
                                    weightList2[innerList[3] * 6 + innerList[4]] += 1;
                                }
                                if (!temp1) {
                                    console.error(`Missing pidData entry for: ${innerList[3]}`);
                                    continue;
                                }
                                if (!temp2) {
                                    console.error(`Missing pidData entry for: ${innerList[4]}`);
                                    continue;
                                }
                                let tempo1 = temp1["vs"];
                                let tempo2 = temp2["vs"];
                                let tyty1 = innerList[2];
                                let tempor1 = tempo1[shotTypes[tyty1]];
                                let tempor2 = tempo2[shotTypes[tyty1]];
                                tempor1[innerList[0] - 2] += 1;
                                tempor2[innerList[0] - 2] += 1;
                                // tempora1 = tempora1 + 1;
                                // tempora2 = tempora2 + 1; 
                            } else {
                                // o
                                let temp3 = pidData["zone" + innerList[3]];
                                let temp4 = pidData["zone1" + innerList[4]];
                                if (innerList[4] == 88) {
                                    // Shank
                                    temp4 = pidData["shank"];
                                } else {
                                    weightList[innerList[3] * 6 + innerList[4]] += 1;
                                }
                                if (!temp3) {
                                    console.error(`Missing pidData entry for: ${innerList[3]}`);
                                    continue;
                                }
                                if (!temp4) {
                                    console.error(`Missing pidData entry for: ${innerList[4]}`);
                                    continue;
                                }
                                let tempo3 = temp3["o"];
                                let tempo4 = temp4["o"];
                                let tyty2 = innerList[2];
                                let tempor3 = tempo3[shotTypes[tyty2]];
                                let tempor4 = tempo4[shotTypes[tyty2]];
                                tempor3[innerList[0] - 2] += 1;
                                tempor4[innerList[0] - 2] += 1;
                                // tempora3 = tempora3 + 1;
                                // tempora4 = tempora4 + 1;
                                let ttemp = pidDataType["zone" + innerList[3]];
                                if (!ttemp) {
                                    console.error(`Missing pidDataType entry for ${innerList[3]}`);
                                    continue;
                                }
                                let ttempo = ttemp["o"];
                                let ttempor = ttempo[shotTypes[innerList[2]]];
                                if (innerList[4] == 88) {
                                    ttempor[6] += 1;
                                } else {
                                    ttempor[innerList[4]] += 1;
                                }
                            }
                        }
                    }
                } else {
                    // Iterate over each inner list (skipping index 0)
                    for (let i = 1; i < sublist.length; i++) {
                        const innerList = sublist[i];

                        if (innerList[3] == 88) {
                            // Shot coming from nowhere
                            continue;
                        }
                        if (innerList[2] == 88) {
                            // Shot type unknown
                            innerList[2] = 9;
                        }
                        if (innerList[2] == 0) {
                            // Serve
                            continue;
                        } else if (innerList[1] == 10) {
                            // Null for Faults
                            continue;
                        } else {
                            if (i % 2 == 1) {
                                // vs
                                let temp1 = pidData["zone1" + innerList[3]];
                                let temp2 = pidData["zone" + innerList[4]];    
                                if (innerList[4] == 88) {
                                    // Shank
                                    temp2 = pidData["shank"];
                                } else {
                                    weightList2[innerList[3] * 6 + innerList[4]] += 1;
                                }
                                if (!temp1) {
                                    console.error(`Missing pidData entry for: ${innerList[3]}`);
                                    continue;
                                }
                                if (!temp2) {
                                    console.error(`Missing pidData entry for: ${innerList[4]}`);
                                    continue;
                                }
                                let tempo1 = temp1["vs"];
                                let tempo2 = temp2["vs"];
                                let tyty1 = innerList[2];
                                let tempor1 = tempo1[shotTypes[tyty1]];
                                let tempor2 = tempo2[shotTypes[tyty1]];
                                tempor1[innerList[0] - 2] += 1;
                                tempor2[innerList[0] - 2] += 1;
                                // tempora1 = tempora1 + 1;
                                // tempora2 = tempora2 + 1; 
                            } else {
                                // o
                                let temp3 = pidData["zone" + innerList[3]];
                                let temp4 = pidData["zone1" + innerList[4]];
                                if (innerList[4] == 88) {
                                    // Shank
                                    temp4 = pidData["shank"];
                                } else {
                                    weightList[innerList[3] * 6 + innerList[4]] += 1;
                                }
                                if (!temp3) {
                                    console.error(`Missing pidData entry for: ${innerList[3]}`);
                                    continue;
                                }
                                if (!temp4) {
                                    console.error(`Missing pidData entry for: ${innerList[4]}`);
                                    continue;
                                }
                                let tempo3 = temp3["o"];
                                let tempo4 = temp4["o"];
                                let tyty2 = innerList[2];
                                let tempor3 = tempo3[shotTypes[tyty2]];
                                let tempor4 = tempo4[shotTypes[tyty2]];
                                tempor3[innerList[0] - 2] += 1;
                                tempor4[innerList[0] - 2] += 1;
                                // tempora3 = tempora3 + 1;
                                // tempora4 = tempora4 + 1;
                                let ttemp = pidDataType["zone" + innerList[3]];
                                if (!ttemp) {
                                    console.error(`Missing pidDataType entry for ${innerList[3]}`);
                                    continue;
                                }
                                let ttempo = ttemp["o"];
                                let ttempor = ttempo[shotTypes[innerList[2]]];
                                if (innerList[4] == 88) {
                                    ttempor[6] += 1;
                                } else {
                                    ttempor[innerList[4]] += 1;
                                }
                            }
                        }
                    }
                }
            }
        // }
        });

        const matnum = document.getElementById('nmat');
        matnum.textContent = `Matches Charted: ${numMat}`;

        // console.log(pidData);
        // console.log(weightList);
        // console.log(pidDataType);

        // const pidDataType0 = {"forehand": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0}, 
        //                     "backhand": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "forehandVolley": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "backhandVolley": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "forehandDrop": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "backhandDrop": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "forehandSlice": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "backhandSlice": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "smash": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "trick": {"in": 0, "shank": 0}};
        // const pidDataType1 = {"forehand": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0}, 
        //                     "backhand": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "forehandVolley": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "backhandVolley": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "forehandDrop": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "backhandDrop": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "forehandSlice": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "backhandSlice": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "smash": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "trick": {"in": 0, "shank": 0}};
        // const pidDataType2 = {"forehand": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0}, 
        //                     "backhand": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "forehandVolley": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "backhandVolley": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "forehandDrop": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "backhandDrop": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "forehandSlice": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "backhandSlice": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "smash": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "trick": {"in": 0, "shank": 0}};
        // const pidDataType3 = {"forehand": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0}, 
        //                     "backhand": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "forehandVolley": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "backhandVolley": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "forehandDrop": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "backhandDrop": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "forehandSlice": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "backhandSlice": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "smash": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "trick": {"in": 0, "shank": 0}};
        // const pidDataType4 = {"forehand": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0}, 
        //                     "backhand": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "forehandVolley": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "backhandVolley": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "forehandDrop": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "backhandDrop": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "forehandSlice": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "backhandSlice": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "smash": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "trick": {"in": 0, "shank": 0}};
        // const pidDataType5 = {"forehand": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0}, 
        //                     "backhand": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "forehandVolley": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "backhandVolley": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "forehandDrop": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "backhandDrop": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "forehandSlice": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "backhandSlice": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "smash": {"cross": 0, "insideIn": 0, "middle": 0, "dtl": 0, "insideOut": 0, "shank": 0},
        //                     "trick": {"in": 0, "shank": 0}};


        fetch('https://raw.githubusercontent.com/einani/adIn-data/main/data/update_stats1025.json')
            .then(response => response.json())
            .then(datac => {
                if (playerId in datac) {
                    const playerData = datac[playerId];
                    const hand = playerData["hand"];

                    for (let key in pidDataType) {
                        const temp = pidDataType[key];
                        const tempy = temp["o"];
                        if (hand == "Left") {
                            if (key == "zone0") {
                                pidDataType0["forehand"]["cross"] = pidDataType0["forehand"]["cross"] + tempy["Forehand"][3] + tempy["Forehand"][0];
                                // pidDataType0["forehand"]["insideIn"] = pidDataType0["forehand"]["insideIn"] + tempy["Forehand"][3] + tempy["Forehand"][0];
                                pidDataType0["forehand"]["middle"] = pidDataType0["forehand"]["middle"] + tempy["Forehand"][4] + tempy["Forehand"][1];
                                pidDataType0["forehand"]["dtl"] = pidDataType0["forehand"]["dtl"] + tempy["Forehand"][5] + tempy["Forehand"][2];
                                // pidDataType0["forehand"]["insideOut"] = pidDataType0["forehand"]["insideOut"] + tempy["Forehand"][3] + tempy["Forehand"][0];
                                pidDataType0["forehand"]["shank"] = tempy["Forehand"][6];

                                // pidDataType0["backhand"]["cross"] = pidDataType0["backhand"]["cross"] + tempy["Backhand"][3] + tempy["Backhand"][0];
                                pidDataType0["backhand"]["insideIn"] = pidDataType0["backhand"]["insideIn"] + tempy["Backhand"][5] + tempy["Backhand"][2];
                                pidDataType0["backhand"]["middle"] = pidDataType0["backhand"]["middle"] + tempy["Backhand"][4] + tempy["Backhand"][1];
                                // pidDataType0["backhand"]["dtl"] = pidDataType0["backhand"]["dtl"] + tempy["Backhand"][5] + tempy["Backhand"][2];
                                pidDataType0["backhand"]["insideOut"] = pidDataType0["backhand"]["insideOut"] + tempy["Backhand"][3] + tempy["Backhand"][0];
                                pidDataType0["backhand"]["shank"] = tempy["Backhand"][6];
                                
                                pidDataType0["forehandSlice"]["cross"] = pidDataType0["forehandSlice"]["cross"] + tempy["Forehand Slice"][3] + tempy["Forehand Slice"][0];
                                // pidDataType0["forehandSlice"]["insideIn"] = pidDataType0["forehandSlice"]["insideIn"] + tempy["Forehand Slice"][3] + tempy["Forehand Slice"][0];
                                pidDataType0["forehandSlice"]["middle"] = pidDataType0["forehandSlice"]["middle"] + tempy["Forehand Slice"][4] + tempy["Forehand Slice"][1];
                                pidDataType0["forehandSlice"]["dtl"] = pidDataType0["forehandSlice"]["dtl"] + tempy["Forehand Slice"][5] + tempy["Forehand Slice"][2];
                                // pidDataType0["forehandSlice"]["insideOut"] = pidDataType0["forehandSlice"]["insideOut"] + tempy["Forehand Slice"][3] + tempy["Forehand Slice"][0];
                                pidDataType0["forehandSlice"]["shank"] = tempy["Forehand Slice"][6];

                                // pidDataType0["backhandSlice"]["cross"] = pidDataType0["backhandSlice"]["cross"] + tempy["Backhand Slice"][3] + tempy["Backhand Slice"][0];
                                pidDataType0["backhandSlice"]["insideIn"] = pidDataType0["backhandSlice"]["insideIn"] + tempy["Backhand Slice"][5] + tempy["Backhand Slice"][2];
                                pidDataType0["backhandSlice"]["middle"] = pidDataType0["backhandSlice"]["middle"] + tempy["Backhand Slice"][4] + tempy["Backhand Slice"][1];
                                // pidDataType0["backhandSlice"]["dtl"] = pidDataType0["backhandSlice"]["dtl"] + tempy["Backhand Slice"][5] + tempy["Backhand Slice"][2];
                                pidDataType0["backhandSlice"]["insideOut"] = pidDataType0["backhandSlice"]["insideOut"] + tempy["Backhand Slice"][3] + tempy["Backhand Slice"][0];
                                pidDataType0["backhandSlice"]["shank"] = tempy["Backhand Slice"][6];
                                
                                pidDataType0["forehandDrop"]["cross"] = pidDataType0["forehandDrop"]["cross"] + tempy["Forehand Drop"][3] + tempy["Forehand Drop"][0];
                                // pidDataType0["forehandDrop"]["insideIn"] = pidDataType0["forehandDrop"]["insideIn"] + tempy["Forehand Drop"][3] + tempy["Forehand Drop"][0];
                                pidDataType0["forehandDrop"]["middle"] = pidDataType0["forehandDrop"]["middle"] + tempy["Forehand Drop"][4] + tempy["Forehand Drop"][1];
                                pidDataType0["forehandDrop"]["dtl"] = pidDataType0["forehandDrop"]["dtl"] + tempy["Forehand Drop"][5] + tempy["Forehand Drop"][2];
                                // pidDataType0["forehandDrop"]["insideOut"] = pidDataType0["forehandDrop"]["insideOut"] + tempy["Forehand Drop"][3] + tempy["Forehand Drop"][0];
                                pidDataType0["forehandDrop"]["shank"] = tempy["Forehand Drop"][6];

                                // pidDataType0["backhandDrop"]["cross"] = pidDataType0["backhandDrop"]["cross"] + tempy["Backhand Drop"][3] + tempy["Backhand Drop"][0];
                                pidDataType0["backhandDrop"]["insideIn"] = pidDataType0["backhandDrop"]["insideIn"] + tempy["Backhand Drop"][5] + tempy["Backhand Drop"][2];
                                pidDataType0["backhandDrop"]["middle"] = pidDataType0["backhandDrop"]["middle"] + tempy["Backhand Drop"][4] + tempy["Backhand Drop"][1];
                                // pidDataType0["backhandDrop"]["dtl"] = pidDataType0["backhandDrop"]["dtl"] + tempy["Backhand Drop"][5] + tempy["Backhand Drop"][2];
                                pidDataType0["backhandDrop"]["insideOut"] = pidDataType0["backhandDrop"]["insideOut"] + tempy["Backhand Drop"][3] + tempy["Backhand Drop"][0];
                                pidDataType0["backhandDrop"]["shank"] = tempy["Backhand Drop"][6];
                                
                                pidDataType0["forehandVolley"]["cross"] = pidDataType0["forehandVolley"]["cross"] + tempy["Forehand Volley"][3] + tempy["Forehand Volley"][0];
                                // pidDataType0["forehandVolley"]["insideIn"] = pidDataType0["forehandVolley"]["insideIn"] + tempy["Forehand Volley"][3] + tempy["Forehand Volley"][0];
                                pidDataType0["forehandVolley"]["middle"] = pidDataType0["forehandVolley"]["middle"] + tempy["Forehand Volley"][4] + tempy["Forehand Volley"][1];
                                pidDataType0["forehandVolley"]["dtl"] = pidDataType0["forehandVolley"]["dtl"] + tempy["Forehand Volley"][5] + tempy["Forehand Volley"][2];
                                // pidDataType0["forehandVolley"]["insideOut"] = pidDataType0["forehandVolley"]["insideOut"] + tempy["Forehand Volley"][3] + tempy["Forehand Volley"][0];
                                pidDataType0["forehandVolley"]["shank"] = tempy["Forehand Volley"][6];

                                // pidDataType0["backhandVolley"]["cross"] = pidDataType0["backhandVolley"]["cross"] + tempy["Backhand Volley"][3] + tempy["Backhand Volley"][0];
                                pidDataType0["backhandVolley"]["insideIn"] = pidDataType0["backhandVolley"]["insideIn"] + tempy["Backhand Volley"][5] + tempy["Backhand Volley"][2];
                                pidDataType0["backhandVolley"]["middle"] = pidDataType0["backhandVolley"]["middle"] + tempy["Backhand Volley"][4] + tempy["Backhand Volley"][1];
                                // pidDataType0["backhandVolley"]["dtl"] = pidDataType0["backhandVolley"]["dtl"] + tempy["Backhand Volley"][5] + tempy["Backhand Volley"][2];
                                pidDataType0["backhandVolley"]["insideOut"] = pidDataType0["backhandVolley"]["insideOut"] + tempy["Backhand Volley"][3] + tempy["Backhand Volley"][0];
                                pidDataType0["backhandVolley"]["shank"] = tempy["Backhand Volley"][6];

                                pidDataType0["smash"]["cross"] = pidDataType0["smash"]["cross"] + tempy["Smash"][3] + tempy["Smash"][0];
                                // pidDataType0["smash"]["insideIn"] = pidDataType0["smash"]["insideIn"] + tempy["Smash"][3] + tempy["Smash"][0];
                                pidDataType0["smash"]["middle"] = pidDataType0["smash"]["middle"] + tempy["Smash"][4] + tempy["Smash"][1];
                                pidDataType0["smash"]["dtl"] = pidDataType0["smash"]["dtl"] + tempy["Smash"][5] + tempy["Smash"][2];
                                // pidDataType0["smash"]["insideOut"] = pidDataType0["smash"]["insideOut"] + tempy["Smash"][3] + tempy["Smash"][0];
                                pidDataType0["smash"]["shank"] = tempy["Smash"][6];

                                pidDataType0["trick"]["in"] = pidDataType0["trick"]["in"] + tempy["Trick Shot"][5] + tempy["Trick Shot"][4] + tempy["Trick Shot"][3] + tempy["Trick Shot"][2] + tempy["Trick Shot"][1] + tempy["Trick Shot"][0];
                                pidDataType0["trick"]["shank"] = tempy["Trick Shot"][6];
                            }
                            if (key == "zone1") {
                                pidDataType1["forehand"]["cross"] = pidDataType1["forehand"]["cross"] + tempy["Forehand"][3] + tempy["Forehand"][0];
                                // pidDataType1["forehand"]["insideIn"] = pidDataType1["forehand"]["insideIn"] + tempy["Forehand"][3] + tempy["Forehand"][0];
                                pidDataType1["forehand"]["middle"] = pidDataType1["forehand"]["middle"] + tempy["Forehand"][4] + tempy["Forehand"][1];
                                // pidDataType1["forehand"]["dtl"] = pidDataType1["forehand"]["dtl"] + tempy["Forehand"][5] + tempy["Forehand"][2];
                                pidDataType1["forehand"]["insideOut"] = pidDataType1["forehand"]["insideOut"] + tempy["Forehand"][3] + tempy["Forehand"][0];
                                pidDataType1["forehand"]["shank"] = tempy["Forehand"][6];

                                pidDataType1["backhand"]["cross"] = pidDataType1["backhand"]["cross"] + tempy["Backhand"][3] + tempy["Backhand"][0];
                                // pidDataType1["backhand"]["insideIn"] = pidDataType1["backhand"]["insideIn"] + tempy["Backhand"][5] + tempy["Backhand"][2];
                                pidDataType1["backhand"]["middle"] = pidDataType1["backhand"]["middle"] + tempy["Backhand"][4] + tempy["Backhand"][1];
                                // pidDataType1["backhand"]["dtl"] = pidDataType1["backhand"]["dtl"] + tempy["Backhand"][5] + tempy["Backhand"][2];
                                pidDataType1["backhand"]["insideOut"] = pidDataType1["backhand"]["insideOut"] + tempy["Backhand"][3] + tempy["Backhand"][0];
                                pidDataType1["backhand"]["shank"] = tempy["Backhand"][6];
                                
                                pidDataType1["forehandSlice"]["cross"] = pidDataType1["forehandSlice"]["cross"] + tempy["Forehand Slice"][3] + tempy["Forehand Slice"][0];
                                // pidDataType1["forehandSlice"]["insideIn"] = pidDataType1["forehandSlice"]["insideIn"] + tempy["Forehand Slice"][3] + tempy["Forehand Slice"][0];
                                pidDataType1["forehandSlice"]["middle"] = pidDataType1["forehandSlice"]["middle"] + tempy["Forehand Slice"][4] + tempy["Forehand Slice"][1];
                                // pidDataType1["forehandSlice"]["dtl"] = pidDataType1["forehandSlice"]["dtl"] + tempy["Forehand Slice"][5] + tempy["Forehand Slice"][2];
                                pidDataType1["forehandSlice"]["insideOut"] = pidDataType1["forehandSlice"]["insideOut"] + tempy["Forehand Slice"][3] + tempy["Forehand Slice"][0];
                                pidDataType1["forehandSlice"]["shank"] = tempy["Forehand Slice"][6];

                                pidDataType1["backhandSlice"]["cross"] = pidDataType1["backhandSlice"]["cross"] + tempy["Backhand Slice"][3] + tempy["Backhand Slice"][0];
                                // pidDataType1["backhandSlice"]["insideIn"] = pidDataType1["backhandSlice"]["insideIn"] + tempy["Backhand Slice"][5] + tempy["Backhand Slice"][2];
                                pidDataType1["backhandSlice"]["middle"] = pidDataType1["backhandSlice"]["middle"] + tempy["Backhand Slice"][4] + tempy["Backhand Slice"][1];
                                // pidDataType1["backhandSlice"]["dtl"] = pidDataType1["backhandSlice"]["dtl"] + tempy["Backhand Slice"][5] + tempy["Backhand Slice"][2];
                                pidDataType1["backhandSlice"]["insideOut"] = pidDataType1["backhandSlice"]["insideOut"] + tempy["Backhand Slice"][3] + tempy["Backhand Slice"][0];
                                pidDataType1["backhandSlice"]["shank"] = tempy["Backhand Slice"][6];
                                
                                pidDataType1["forehandDrop"]["cross"] = pidDataType1["forehandDrop"]["cross"] + tempy["Forehand Drop"][3] + tempy["Forehand Drop"][0];
                                // pidDataType1["forehandDrop"]["insideIn"] = pidDataType1["forehandDrop"]["insideIn"] + tempy["Forehand Drop"][3] + tempy["Forehand Drop"][0];
                                pidDataType1["forehandDrop"]["middle"] = pidDataType1["forehandDrop"]["middle"] + tempy["Forehand Drop"][4] + tempy["Forehand Drop"][1];
                                // pidDataType1["forehandDrop"]["dtl"] = pidDataType1["forehandDrop"]["dtl"] + tempy["Forehand Drop"][5] + tempy["Forehand Drop"][2];
                                pidDataType1["forehandDrop"]["insideOut"] = pidDataType1["forehandDrop"]["insideOut"] + tempy["Forehand Drop"][3] + tempy["Forehand Drop"][0];
                                pidDataType1["forehandDrop"]["shank"] = tempy["Forehand Drop"][6];

                                pidDataType1["backhandDrop"]["cross"] = pidDataType1["backhandDrop"]["cross"] + tempy["Backhand Drop"][3] + tempy["Backhand Drop"][0];
                                // pidDataType1["backhandDrop"]["insideIn"] = pidDataType1["backhandDrop"]["insideIn"] + tempy["Backhand Drop"][5] + tempy["Backhand Drop"][2];
                                pidDataType1["backhandDrop"]["middle"] = pidDataType1["backhandDrop"]["middle"] + tempy["Backhand Drop"][4] + tempy["Backhand Drop"][1];
                                // pidDataType1["backhandDrop"]["dtl"] = pidDataType1["backhandDrop"]["dtl"] + tempy["Backhand Drop"][5] + tempy["Backhand Drop"][2];
                                pidDataType1["backhandDrop"]["insideOut"] = pidDataType1["backhandDrop"]["insideOut"] + tempy["Backhand Drop"][3] + tempy["Backhand Drop"][0];
                                pidDataType1["backhandDrop"]["shank"] = tempy["Backhand Drop"][6];
                                
                                pidDataType1["forehandVolley"]["cross"] = pidDataType1["forehandVolley"]["cross"] + tempy["Forehand Volley"][3] + tempy["Forehand Volley"][0];
                                // pidDataType1["forehandVolley"]["insideIn"] = pidDataType1["forehandVolley"]["insideIn"] + tempy["Forehand Volley"][3] + tempy["Forehand Volley"][0];
                                pidDataType1["forehandVolley"]["middle"] = pidDataType1["forehandVolley"]["middle"] + tempy["Forehand Volley"][4] + tempy["Forehand Volley"][1];
                                // pidDataType1["forehandVolley"]["dtl"] = pidDataType1["forehandVolley"]["dtl"] + tempy["Forehand Volley"][5] + tempy["Forehand Volley"][2];
                                pidDataType1["forehandVolley"]["insideOut"] = pidDataType1["forehandVolley"]["insideOut"] + tempy["Forehand Volley"][3] + tempy["Forehand Volley"][0];
                                pidDataType1["forehandVolley"]["shank"] = tempy["Forehand Volley"][6];

                                pidDataType1["backhandVolley"]["cross"] = pidDataType1["backhandVolley"]["cross"] + tempy["Backhand Volley"][3] + tempy["Backhand Volley"][0];
                                // pidDataType1["backhandVolley"]["insideIn"] = pidDataType1["backhandVolley"]["insideIn"] + tempy["Backhand Volley"][5] + tempy["Backhand Volley"][2];
                                pidDataType1["backhandVolley"]["middle"] = pidDataType1["backhandVolley"]["middle"] + tempy["Backhand Volley"][4] + tempy["Backhand Volley"][1];
                                // pidDataType1["backhandVolley"]["dtl"] = pidDataType1["backhandVolley"]["dtl"] + tempy["Backhand Volley"][5] + tempy["Backhand Volley"][2];
                                pidDataType1["backhandVolley"]["insideOut"] = pidDataType1["backhandVolley"]["insideOut"] + tempy["Backhand Volley"][3] + tempy["Backhand Volley"][0];
                                pidDataType1["backhandVolley"]["shank"] = tempy["Backhand Volley"][6];

                                pidDataType1["smash"]["cross"] = pidDataType1["smash"]["cross"] + tempy["Smash"][3] + tempy["Smash"][0];
                                // pidDataType1["smash"]["insideIn"] = pidDataType1["smash"]["insideIn"] + tempy["Smash"][3] + tempy["Smash"][0];
                                pidDataType1["smash"]["middle"] = pidDataType1["smash"]["middle"] + tempy["Smash"][4] + tempy["Smash"][1];
                                // pidDataType1["smash"]["dtl"] = pidDataType1["smash"]["dtl"] + tempy["Smash"][5] + tempy["Smash"][2];
                                pidDataType1["smash"]["insideOut"] = pidDataType1["smash"]["insideOut"] + tempy["Smash"][3] + tempy["Smash"][0];
                                pidDataType1["smash"]["shank"] = tempy["Smash"][6];

                                pidDataType1["trick"]["in"] = pidDataType1["trick"]["in"] + tempy["Trick Shot"][5] + tempy["Trick Shot"][4] + tempy["Trick Shot"][3] + tempy["Trick Shot"][2] + tempy["Trick Shot"][1] + tempy["Trick Shot"][0];
                                pidDataType1["trick"]["shank"] = tempy["Trick Shot"][6];
                            }
                            if (key == "zone2") {
                                // pidDataType2["forehand"]["cross"] = pidDataType2["forehand"]["cross"] + tempy["Forehand"][3] + tempy["Forehand"][0];
                                pidDataType2["forehand"]["insideIn"] = pidDataType2["forehand"]["insideIn"] + tempy["Forehand"][3] + tempy["Forehand"][0];
                                pidDataType2["forehand"]["middle"] = pidDataType2["forehand"]["middle"] + tempy["Forehand"][4] + tempy["Forehand"][1];
                                // pidDataType2["forehand"]["dtl"] = pidDataType2["forehand"]["dtl"] + tempy["Forehand"][5] + tempy["Forehand"][2];
                                pidDataType2["forehand"]["insideOut"] = pidDataType2["forehand"]["insideOut"] + tempy["Forehand"][3] + tempy["Forehand"][0];
                                pidDataType2["forehand"]["shank"] = tempy["Forehand"][6];

                                pidDataType2["backhand"]["cross"] = pidDataType2["backhand"]["cross"] + tempy["Backhand"][3] + tempy["Backhand"][0];
                                // pidDataType2["backhand"]["insideIn"] = pidDataType2["backhand"]["insideIn"] + tempy["Backhand"][5] + tempy["Backhand"][2];
                                pidDataType2["backhand"]["middle"] = pidDataType2["backhand"]["middle"] + tempy["Backhand"][4] + tempy["Backhand"][1];
                                pidDataType2["backhand"]["dtl"] = pidDataType2["backhand"]["dtl"] + tempy["Backhand"][5] + tempy["Backhand"][2];
                                // pidDataType2["backhand"]["insideOut"] = pidDataType2["backhand"]["insideOut"] + tempy["Backhand"][3] + tempy["Backhand"][0];
                                pidDataType2["backhand"]["shank"] = tempy["Backhand"][6];
                                
                                // pidDataType2["forehandSlice"]["cross"] = pidDataType2["forehandSlice"]["cross"] + tempy["Forehand Slice"][3] + tempy["Forehand Slice"][0];
                                pidDataType2["forehandSlice"]["insideIn"] = pidDataType2["forehandSlice"]["insideIn"] + tempy["Forehand Slice"][3] + tempy["Forehand Slice"][0];
                                pidDataType2["forehandSlice"]["middle"] = pidDataType2["forehandSlice"]["middle"] + tempy["Forehand Slice"][4] + tempy["Forehand Slice"][1];
                                // pidDataType2["forehandSlice"]["dtl"] = pidDataType2["forehandSlice"]["dtl"] + tempy["Forehand Slice"][5] + tempy["Forehand Slice"][2];
                                pidDataType2["forehandSlice"]["insideOut"] = pidDataType2["forehandSlice"]["insideOut"] + tempy["Forehand Slice"][3] + tempy["Forehand Slice"][0];
                                pidDataType2["forehandSlice"]["shank"] = tempy["Forehand Slice"][6];

                                pidDataType2["backhandSlice"]["cross"] = pidDataType2["backhandSlice"]["cross"] + tempy["Backhand Slice"][3] + tempy["Backhand Slice"][0];
                                // pidDataType2["backhandSlice"]["insideIn"] = pidDataType2["backhandSlice"]["insideIn"] + tempy["Backhand Slice"][5] + tempy["Backhand Slice"][2];
                                pidDataType2["backhandSlice"]["middle"] = pidDataType2["backhandSlice"]["middle"] + tempy["Backhand Slice"][4] + tempy["Backhand Slice"][1];
                                pidDataType2["backhandSlice"]["dtl"] = pidDataType2["backhandSlice"]["dtl"] + tempy["Backhand Slice"][5] + tempy["Backhand Slice"][2];
                                // pidDataType2["backhandSlice"]["insideOut"] = pidDataType2["backhandSlice"]["insideOut"] + tempy["Backhand Slice"][3] + tempy["Backhand Slice"][0];
                                pidDataType2["backhandSlice"]["shank"] = tempy["Backhand Slice"][6];
                                
                                // pidDataType2["forehandDrop"]["cross"] = pidDataType2["forehandDrop"]["cross"] + tempy["Forehand Drop"][3] + tempy["Forehand Drop"][0];
                                pidDataType2["forehandDrop"]["insideIn"] = pidDataType2["forehandDrop"]["insideIn"] + tempy["Forehand Drop"][3] + tempy["Forehand Drop"][0];
                                pidDataType2["forehandDrop"]["middle"] = pidDataType2["forehandDrop"]["middle"] + tempy["Forehand Drop"][4] + tempy["Forehand Drop"][1];
                                // pidDataType2["forehandDrop"]["dtl"] = pidDataType2["forehandDrop"]["dtl"] + tempy["Forehand Drop"][5] + tempy["Forehand Drop"][2];
                                pidDataType2["forehandDrop"]["insideOut"] = pidDataType2["forehandDrop"]["insideOut"] + tempy["Forehand Drop"][3] + tempy["Forehand Drop"][0];
                                pidDataType2["forehandDrop"]["shank"] = tempy["Forehand Drop"][6];

                                pidDataType2["backhandDrop"]["cross"] = pidDataType2["backhandDrop"]["cross"] + tempy["Backhand Drop"][3] + tempy["Backhand Drop"][0];
                                // pidDataType2["backhandDrop"]["insideIn"] = pidDataType2["backhandDrop"]["insideIn"] + tempy["Backhand Drop"][5] + tempy["Backhand Drop"][2];
                                pidDataType2["backhandDrop"]["middle"] = pidDataType2["backhandDrop"]["middle"] + tempy["Backhand Drop"][4] + tempy["Backhand Drop"][1];
                                pidDataType2["backhandDrop"]["dtl"] = pidDataType2["backhandDrop"]["dtl"] + tempy["Backhand Drop"][5] + tempy["Backhand Drop"][2];
                                // pidDataType2["backhandDrop"]["insideOut"] = pidDataType2["backhandDrop"]["insideOut"] + tempy["Backhand Drop"][3] + tempy["Backhand Drop"][0];
                                pidDataType2["backhandDrop"]["shank"] = tempy["Backhand Drop"][6];
                                
                                // pidDataType2["forehandVolley"]["cross"] = pidDataType2["forehandVolley"]["cross"] + tempy["Forehand Volley"][3] + tempy["Forehand Volley"][0];
                                pidDataType2["forehandVolley"]["insideIn"] = pidDataType2["forehandVolley"]["insideIn"] + tempy["Forehand Volley"][3] + tempy["Forehand Volley"][0];
                                pidDataType2["forehandVolley"]["middle"] = pidDataType2["forehandVolley"]["middle"] + tempy["Forehand Volley"][4] + tempy["Forehand Volley"][1];
                                // pidDataType2["forehandVolley"]["dtl"] = pidDataType2["forehandVolley"]["dtl"] + tempy["Forehand Volley"][5] + tempy["Forehand Volley"][2];
                                pidDataType2["forehandVolley"]["insideOut"] = pidDataType2["forehandVolley"]["insideOut"] + tempy["Forehand Volley"][3] + tempy["Forehand Volley"][0];
                                pidDataType2["forehandVolley"]["shank"] = tempy["Forehand Volley"][6];

                                pidDataType2["backhandVolley"]["cross"] = pidDataType2["backhandVolley"]["cross"] + tempy["Backhand Volley"][3] + tempy["Backhand Volley"][0];
                                // pidDataType2["backhandVolley"]["insideIn"] = pidDataType2["backhandVolley"]["insideIn"] + tempy["Backhand Volley"][5] + tempy["Backhand Volley"][2];
                                pidDataType2["backhandVolley"]["middle"] = pidDataType2["backhandVolley"]["middle"] + tempy["Backhand Volley"][4] + tempy["Backhand Volley"][1];
                                pidDataType2["backhandVolley"]["dtl"] = pidDataType2["backhandVolley"]["dtl"] + tempy["Backhand Volley"][5] + tempy["Backhand Volley"][2];
                                // pidDataType2["backhandVolley"]["insideOut"] = pidDataType2["backhandVolley"]["insideOut"] + tempy["Backhand Volley"][3] + tempy["Backhand Volley"][0];
                                pidDataType2["backhandVolley"]["shank"] = tempy["Backhand Volley"][6];

                                // pidDataType2["smash"]["cross"] = pidDataType2["smash"]["cross"] + tempy["Smash"][3] + tempy["Smash"][0];
                                pidDataType2["smash"]["insideIn"] = pidDataType2["smash"]["insideIn"] + tempy["Smash"][3] + tempy["Smash"][0];
                                pidDataType2["smash"]["middle"] = pidDataType2["smash"]["middle"] + tempy["Smash"][4] + tempy["Smash"][1];
                                // pidDataType2["smash"]["dtl"] = pidDataType2["smash"]["dtl"] + tempy["Smash"][5] + tempy["Smash"][2];
                                pidDataType2["smash"]["insideOut"] = pidDataType2["smash"]["insideOut"] + tempy["Smash"][3] + tempy["Smash"][0];
                                pidDataType2["smash"]["shank"] = tempy["Smash"][6];

                                pidDataType2["trick"]["in"] = pidDataType2["trick"]["in"] + tempy["Trick Shot"][5] + tempy["Trick Shot"][4] + tempy["Trick Shot"][3] + tempy["Trick Shot"][2] + tempy["Trick Shot"][1] + tempy["Trick Shot"][0];
                                pidDataType2["trick"]["shank"] = tempy["Trick Shot"][6];
                            }
                            if (key == "zone3") {
                                pidDataType3["forehand"]["cross"] = pidDataType3["forehand"]["cross"] + tempy["Forehand"][3] + tempy["Forehand"][0];
                                // pidDataType3["forehand"]["insideIn"] = pidDataType3["forehand"]["insideIn"] + tempy["Forehand"][3] + tempy["Forehand"][0];
                                pidDataType3["forehand"]["middle"] = pidDataType3["forehand"]["middle"] + tempy["Forehand"][4] + tempy["Forehand"][1];
                                pidDataType3["forehand"]["dtl"] = pidDataType3["forehand"]["dtl"] + tempy["Forehand"][5] + tempy["Forehand"][2];
                                // pidDataType3["forehand"]["insideOut"] = pidDataType3["forehand"]["insideOut"] + tempy["Forehand"][3] + tempy["Forehand"][0];
                                pidDataType3["forehand"]["shank"] = tempy["Forehand"][6];

                                // pidDataType3["backhand"]["cross"] = pidDataType3["backhand"]["cross"] + tempy["Backhand"][3] + tempy["Backhand"][0];
                                pidDataType3["backhand"]["insideIn"] = pidDataType3["backhand"]["insideIn"] + tempy["Backhand"][5] + tempy["Backhand"][2];
                                pidDataType3["backhand"]["middle"] = pidDataType3["backhand"]["middle"] + tempy["Backhand"][4] + tempy["Backhand"][1];
                                // pidDataType3["backhand"]["dtl"] = pidDataType3["backhand"]["dtl"] + tempy["Backhand"][5] + tempy["Backhand"][2];
                                pidDataType3["backhand"]["insideOut"] = pidDataType3["backhand"]["insideOut"] + tempy["Backhand"][3] + tempy["Backhand"][0];
                                pidDataType3["backhand"]["shank"] = tempy["Backhand"][6];
                                
                                pidDataType3["forehandSlice"]["cross"] = pidDataType3["forehandSlice"]["cross"] + tempy["Forehand Slice"][3] + tempy["Forehand Slice"][0];
                                // pidDataType3["forehandSlice"]["insideIn"] = pidDataType3["forehandSlice"]["insideIn"] + tempy["Forehand Slice"][3] + tempy["Forehand Slice"][0];
                                pidDataType3["forehandSlice"]["middle"] = pidDataType3["forehandSlice"]["middle"] + tempy["Forehand Slice"][4] + tempy["Forehand Slice"][1];
                                pidDataType3["forehandSlice"]["dtl"] = pidDataType3["forehandSlice"]["dtl"] + tempy["Forehand Slice"][5] + tempy["Forehand Slice"][2];
                                // pidDataType3["forehandSlice"]["insideOut"] = pidDataType3["forehandSlice"]["insideOut"] + tempy["Forehand Slice"][3] + tempy["Forehand Slice"][0];
                                pidDataType3["forehandSlice"]["shank"] = tempy["Forehand Slice"][6];

                                // pidDataType3["backhandSlice"]["cross"] = pidDataType3["backhandSlice"]["cross"] + tempy["Backhand Slice"][3] + tempy["Backhand Slice"][0];
                                pidDataType3["backhandSlice"]["insideIn"] = pidDataType3["backhandSlice"]["insideIn"] + tempy["Backhand Slice"][5] + tempy["Backhand Slice"][2];
                                pidDataType3["backhandSlice"]["middle"] = pidDataType3["backhandSlice"]["middle"] + tempy["Backhand Slice"][4] + tempy["Backhand Slice"][1];
                                // pidDataType3["backhandSlice"]["dtl"] = pidDataType3["backhandSlice"]["dtl"] + tempy["Backhand Slice"][5] + tempy["Backhand Slice"][2];
                                pidDataType3["backhandSlice"]["insideOut"] = pidDataType3["backhandSlice"]["insideOut"] + tempy["Backhand Slice"][3] + tempy["Backhand Slice"][0];
                                pidDataType3["backhandSlice"]["shank"] = tempy["Backhand Slice"][6];
                                
                                pidDataType3["forehandDrop"]["cross"] = pidDataType3["forehandDrop"]["cross"] + tempy["Forehand Drop"][3] + tempy["Forehand Drop"][0];
                                // pidDataType3["forehandDrop"]["insideIn"] = pidDataType3["forehandDrop"]["insideIn"] + tempy["Forehand Drop"][3] + tempy["Forehand Drop"][0];
                                pidDataType3["forehandDrop"]["middle"] = pidDataType3["forehandDrop"]["middle"] + tempy["Forehand Drop"][4] + tempy["Forehand Drop"][1];
                                pidDataType3["forehandDrop"]["dtl"] = pidDataType3["forehandDrop"]["dtl"] + tempy["Forehand Drop"][5] + tempy["Forehand Drop"][2];
                                // pidDataType3["forehandDrop"]["insideOut"] = pidDataType3["forehandDrop"]["insideOut"] + tempy["Forehand Drop"][3] + tempy["Forehand Drop"][0];
                                pidDataType3["forehandDrop"]["shank"] = tempy["Forehand Drop"][6];

                                // pidDataType3["backhandDrop"]["cross"] = pidDataType3["backhandDrop"]["cross"] + tempy["Backhand Drop"][3] + tempy["Backhand Drop"][0];
                                pidDataType3["backhandDrop"]["insideIn"] = pidDataType3["backhandDrop"]["insideIn"] + tempy["Backhand Drop"][5] + tempy["Backhand Drop"][2];
                                pidDataType3["backhandDrop"]["middle"] = pidDataType3["backhandDrop"]["middle"] + tempy["Backhand Drop"][4] + tempy["Backhand Drop"][1];
                                // pidDataType3["backhandDrop"]["dtl"] = pidDataType3["backhandDrop"]["dtl"] + tempy["Backhand Drop"][5] + tempy["Backhand Drop"][2];
                                pidDataType3["backhandDrop"]["insideOut"] = pidDataType3["backhandDrop"]["insideOut"] + tempy["Backhand Drop"][3] + tempy["Backhand Drop"][0];
                                pidDataType3["backhandDrop"]["shank"] = tempy["Backhand Drop"][6];
                                
                                pidDataType3["forehandVolley"]["cross"] = pidDataType3["forehandVolley"]["cross"] + tempy["Forehand Volley"][3] + tempy["Forehand Volley"][0];
                                // pidDataType3["forehandVolley"]["insideIn"] = pidDataType3["forehandVolley"]["insideIn"] + tempy["Forehand Volley"][3] + tempy["Forehand Volley"][0];
                                pidDataType3["forehandVolley"]["middle"] = pidDataType3["forehandVolley"]["middle"] + tempy["Forehand Volley"][4] + tempy["Forehand Volley"][1];
                                pidDataType3["forehandVolley"]["dtl"] = pidDataType3["forehandVolley"]["dtl"] + tempy["Forehand Volley"][5] + tempy["Forehand Volley"][2];
                                // pidDataType3["forehandVolley"]["insideOut"] = pidDataType3["forehandVolley"]["insideOut"] + tempy["Forehand Volley"][3] + tempy["Forehand Volley"][0];
                                pidDataType3["forehandVolley"]["shank"] = tempy["Forehand Volley"][6];

                                // pidDataType3["backhandVolley"]["cross"] = pidDataType3["backhandVolley"]["cross"] + tempy["Backhand Volley"][3] + tempy["Backhand Volley"][0];
                                pidDataType3["backhandVolley"]["insideIn"] = pidDataType3["backhandVolley"]["insideIn"] + tempy["Backhand Volley"][5] + tempy["Backhand Volley"][2];
                                pidDataType3["backhandVolley"]["middle"] = pidDataType3["backhandVolley"]["middle"] + tempy["Backhand Volley"][4] + tempy["Backhand Volley"][1];
                                // pidDataType3["backhandVolley"]["dtl"] = pidDataType3["backhandVolley"]["dtl"] + tempy["Backhand Volley"][5] + tempy["Backhand Volley"][2];
                                pidDataType3["backhandVolley"]["insideOut"] = pidDataType3["backhandVolley"]["insideOut"] + tempy["Backhand Volley"][3] + tempy["Backhand Volley"][0];
                                pidDataType3["backhandVolley"]["shank"] = tempy["Backhand Volley"][6];

                                pidDataType3["smash"]["cross"] = pidDataType3["smash"]["cross"] + tempy["Smash"][3] + tempy["Smash"][0];
                                // pidDataType3["smash"]["insideIn"] = pidDataType3["smash"]["insideIn"] + tempy["Smash"][3] + tempy["Smash"][0];
                                pidDataType3["smash"]["middle"] = pidDataType3["smash"]["middle"] + tempy["Smash"][4] + tempy["Smash"][1];
                                pidDataType3["smash"]["dtl"] = pidDataType3["smash"]["dtl"] + tempy["Smash"][5] + tempy["Smash"][2];
                                // pidDataType3["smash"]["insideOut"] = pidDataType3["smash"]["insideOut"] + tempy["Smash"][3] + tempy["Smash"][0];
                                pidDataType3["smash"]["shank"] = tempy["Smash"][6];

                                pidDataType3["trick"]["in"] = pidDataType3["trick"]["in"] + tempy["Trick Shot"][5] + tempy["Trick Shot"][4] + tempy["Trick Shot"][3] + tempy["Trick Shot"][2] + tempy["Trick Shot"][1] + tempy["Trick Shot"][0];
                                pidDataType3["trick"]["shank"] = tempy["Trick Shot"][6];
                            }    
                            if (key == "zone4") {
                                pidDataType4["forehand"]["cross"] = pidDataType4["forehand"]["cross"] + tempy["Forehand"][3] + tempy["Forehand"][0];
                                // pidDataType4["forehand"]["insideIn"] = pidDataType4["forehand"]["insideIn"] + tempy["Forehand"][3] + tempy["Forehand"][0];
                                pidDataType4["forehand"]["middle"] = pidDataType4["forehand"]["middle"] + tempy["Forehand"][4] + tempy["Forehand"][1];
                                // pidDataType4["forehand"]["dtl"] = pidDataType4["forehand"]["dtl"] + tempy["Forehand"][5] + tempy["Forehand"][2];
                                pidDataType4["forehand"]["insideOut"] = pidDataType4["forehand"]["insideOut"] + tempy["Forehand"][3] + tempy["Forehand"][0];
                                pidDataType4["forehand"]["shank"] = tempy["Forehand"][6];

                                pidDataType4["backhand"]["cross"] = pidDataType4["backhand"]["cross"] + tempy["Backhand"][3] + tempy["Backhand"][0];
                                // pidDataType4["backhand"]["insideIn"] = pidDataType4["backhand"]["insideIn"] + tempy["Backhand"][5] + tempy["Backhand"][2];
                                pidDataType4["backhand"]["middle"] = pidDataType4["backhand"]["middle"] + tempy["Backhand"][4] + tempy["Backhand"][1];
                                // pidDataType4["backhand"]["dtl"] = pidDataType4["backhand"]["dtl"] + tempy["Backhand"][5] + tempy["Backhand"][2];
                                pidDataType4["backhand"]["insideOut"] = pidDataType4["backhand"]["insideOut"] + tempy["Backhand"][3] + tempy["Backhand"][0];
                                pidDataType4["backhand"]["shank"] = tempy["Backhand"][6];
                                
                                pidDataType4["forehandSlice"]["cross"] = pidDataType4["forehandSlice"]["cross"] + tempy["Forehand Slice"][3] + tempy["Forehand Slice"][0];
                                // pidDataType4["forehandSlice"]["insideIn"] = pidDataType4["forehandSlice"]["insideIn"] + tempy["Forehand Slice"][3] + tempy["Forehand Slice"][0];
                                pidDataType4["forehandSlice"]["middle"] = pidDataType4["forehandSlice"]["middle"] + tempy["Forehand Slice"][4] + tempy["Forehand Slice"][1];
                                // pidDataType4["forehandSlice"]["dtl"] = pidDataType4["forehandSlice"]["dtl"] + tempy["Forehand Slice"][5] + tempy["Forehand Slice"][2];
                                pidDataType4["forehandSlice"]["insideOut"] = pidDataType4["forehandSlice"]["insideOut"] + tempy["Forehand Slice"][3] + tempy["Forehand Slice"][0];
                                pidDataType4["forehandSlice"]["shank"] = tempy["Forehand Slice"][6];

                                pidDataType4["backhandSlice"]["cross"] = pidDataType4["backhandSlice"]["cross"] + tempy["Backhand Slice"][3] + tempy["Backhand Slice"][0];
                                // pidDataType4["backhandSlice"]["insideIn"] = pidDataType4["backhandSlice"]["insideIn"] + tempy["Backhand Slice"][5] + tempy["Backhand Slice"][2];
                                pidDataType4["backhandSlice"]["middle"] = pidDataType4["backhandSlice"]["middle"] + tempy["Backhand Slice"][4] + tempy["Backhand Slice"][1];
                                // pidDataType4["backhandSlice"]["dtl"] = pidDataType4["backhandSlice"]["dtl"] + tempy["Backhand Slice"][5] + tempy["Backhand Slice"][2];
                                pidDataType4["backhandSlice"]["insideOut"] = pidDataType4["backhandSlice"]["insideOut"] + tempy["Backhand Slice"][3] + tempy["Backhand Slice"][0];
                                pidDataType4["backhandSlice"]["shank"] = tempy["Backhand Slice"][6];
                                
                                pidDataType4["forehandDrop"]["cross"] = pidDataType4["forehandDrop"]["cross"] + tempy["Forehand Drop"][3] + tempy["Forehand Drop"][0];
                                // pidDataType4["forehandDrop"]["insideIn"] = pidDataType4["forehandDrop"]["insideIn"] + tempy["Forehand Drop"][3] + tempy["Forehand Drop"][0];
                                pidDataType4["forehandDrop"]["middle"] = pidDataType4["forehandDrop"]["middle"] + tempy["Forehand Drop"][4] + tempy["Forehand Drop"][1];
                                // pidDataType4["forehandDrop"]["dtl"] = pidDataType4["forehandDrop"]["dtl"] + tempy["Forehand Drop"][5] + tempy["Forehand Drop"][2];
                                pidDataType4["forehandDrop"]["insideOut"] = pidDataType4["forehandDrop"]["insideOut"] + tempy["Forehand Drop"][3] + tempy["Forehand Drop"][0];
                                pidDataType4["forehandDrop"]["shank"] = tempy["Forehand Drop"][6];

                                pidDataType4["backhandDrop"]["cross"] = pidDataType4["backhandDrop"]["cross"] + tempy["Backhand Drop"][3] + tempy["Backhand Drop"][0];
                                // pidDataType4["backhandDrop"]["insideIn"] = pidDataType4["backhandDrop"]["insideIn"] + tempy["Backhand Drop"][5] + tempy["Backhand Drop"][2];
                                pidDataType4["backhandDrop"]["middle"] = pidDataType4["backhandDrop"]["middle"] + tempy["Backhand Drop"][4] + tempy["Backhand Drop"][1];
                                // pidDataType4["backhandDrop"]["dtl"] = pidDataType4["backhandDrop"]["dtl"] + tempy["Backhand Drop"][5] + tempy["Backhand Drop"][2];
                                pidDataType4["backhandDrop"]["insideOut"] = pidDataType4["backhandDrop"]["insideOut"] + tempy["Backhand Drop"][3] + tempy["Backhand Drop"][0];
                                pidDataType4["backhandDrop"]["shank"] = tempy["Backhand Drop"][6];
                                
                                pidDataType4["forehandVolley"]["cross"] = pidDataType4["forehandVolley"]["cross"] + tempy["Forehand Volley"][3] + tempy["Forehand Volley"][0];
                                // pidDataType4["forehandVolley"]["insideIn"] = pidDataType4["forehandVolley"]["insideIn"] + tempy["Forehand Volley"][3] + tempy["Forehand Volley"][0];
                                pidDataType4["forehandVolley"]["middle"] = pidDataType4["forehandVolley"]["middle"] + tempy["Forehand Volley"][4] + tempy["Forehand Volley"][1];
                                // pidDataType4["forehandVolley"]["dtl"] = pidDataType4["forehandVolley"]["dtl"] + tempy["Forehand Volley"][5] + tempy["Forehand Volley"][2];
                                pidDataType4["forehandVolley"]["insideOut"] = pidDataType4["forehandVolley"]["insideOut"] + tempy["Forehand Volley"][3] + tempy["Forehand Volley"][0];
                                pidDataType4["forehandVolley"]["shank"] = tempy["Forehand Volley"][6];

                                pidDataType4["backhandVolley"]["cross"] = pidDataType4["backhandVolley"]["cross"] + tempy["Backhand Volley"][3] + tempy["Backhand Volley"][0];
                                // pidDataType4["backhandVolley"]["insideIn"] = pidDataType4["backhandVolley"]["insideIn"] + tempy["Backhand Volley"][5] + tempy["Backhand Volley"][2];
                                pidDataType4["backhandVolley"]["middle"] = pidDataType4["backhandVolley"]["middle"] + tempy["Backhand Volley"][4] + tempy["Backhand Volley"][1];
                                // pidDataType4["backhandVolley"]["dtl"] = pidDataType4["backhandVolley"]["dtl"] + tempy["Backhand Volley"][5] + tempy["Backhand Volley"][2];
                                pidDataType4["backhandVolley"]["insideOut"] = pidDataType4["backhandVolley"]["insideOut"] + tempy["Backhand Volley"][3] + tempy["Backhand Volley"][0];
                                pidDataType4["backhandVolley"]["shank"] = tempy["Backhand Volley"][6];

                                pidDataType4["smash"]["cross"] = pidDataType4["smash"]["cross"] + tempy["Smash"][3] + tempy["Smash"][0];
                                // pidDataType4["smash"]["insideIn"] = pidDataType4["smash"]["insideIn"] + tempy["Smash"][3] + tempy["Smash"][0];
                                pidDataType4["smash"]["middle"] = pidDataType4["smash"]["middle"] + tempy["Smash"][4] + tempy["Smash"][1];
                                // pidDataType4["smash"]["dtl"] = pidDataType4["smash"]["dtl"] + tempy["Smash"][5] + tempy["Smash"][2];
                                pidDataType4["smash"]["insideOut"] = pidDataType4["smash"]["insideOut"] + tempy["Smash"][3] + tempy["Smash"][0];
                                pidDataType4["smash"]["shank"] = tempy["Smash"][6];

                                pidDataType4["trick"]["in"] = pidDataType4["trick"]["in"] + tempy["Trick Shot"][5] + tempy["Trick Shot"][4] + tempy["Trick Shot"][3] + tempy["Trick Shot"][2] + tempy["Trick Shot"][1] + tempy["Trick Shot"][0];
                                pidDataType4["trick"]["shank"] = tempy["Trick Shot"][6];
                            }
                            if (key == "zone5") {
                                // pidDataType5["forehand"]["cross"] = pidDataType5["forehand"]["cross"] + tempy["Forehand"][3] + tempy["Forehand"][0];
                                pidDataType5["forehand"]["insideIn"] = pidDataType5["forehand"]["insideIn"] + tempy["Forehand"][3] + tempy["Forehand"][0];
                                pidDataType5["forehand"]["middle"] = pidDataType5["forehand"]["middle"] + tempy["Forehand"][4] + tempy["Forehand"][1];
                                // pidDataType5["forehand"]["dtl"] = pidDataType5["forehand"]["dtl"] + tempy["Forehand"][5] + tempy["Forehand"][2];
                                pidDataType5["forehand"]["insideOut"] = pidDataType5["forehand"]["insideOut"] + tempy["Forehand"][3] + tempy["Forehand"][0];
                                pidDataType5["forehand"]["shank"] = tempy["Forehand"][6];

                                pidDataType5["backhand"]["cross"] = pidDataType5["backhand"]["cross"] + tempy["Backhand"][3] + tempy["Backhand"][0];
                                // pidDataType5["backhand"]["insideIn"] = pidDataType5["backhand"]["insideIn"] + tempy["Backhand"][5] + tempy["Backhand"][2];
                                pidDataType5["backhand"]["middle"] = pidDataType5["backhand"]["middle"] + tempy["Backhand"][4] + tempy["Backhand"][1];
                                pidDataType5["backhand"]["dtl"] = pidDataType5["backhand"]["dtl"] + tempy["Backhand"][5] + tempy["Backhand"][2];
                                // pidDataType5["backhand"]["insideOut"] = pidDataType5["backhand"]["insideOut"] + tempy["Backhand"][3] + tempy["Backhand"][0];
                                pidDataType5["backhand"]["shank"] = tempy["Backhand"][6];
                                
                                // pidDataType5["forehandSlice"]["cross"] = pidDataType5["forehandSlice"]["cross"] + tempy["Forehand Slice"][3] + tempy["Forehand Slice"][0];
                                pidDataType5["forehandSlice"]["insideIn"] = pidDataType5["forehandSlice"]["insideIn"] + tempy["Forehand Slice"][3] + tempy["Forehand Slice"][0];
                                pidDataType5["forehandSlice"]["middle"] = pidDataType5["forehandSlice"]["middle"] + tempy["Forehand Slice"][4] + tempy["Forehand Slice"][1];
                                // pidDataType5["forehandSlice"]["dtl"] = pidDataType5["forehandSlice"]["dtl"] + tempy["Forehand Slice"][5] + tempy["Forehand Slice"][2];
                                pidDataType5["forehandSlice"]["insideOut"] = pidDataType5["forehandSlice"]["insideOut"] + tempy["Forehand Slice"][3] + tempy["Forehand Slice"][0];
                                pidDataType5["forehandSlice"]["shank"] = tempy["Forehand Slice"][6];

                                pidDataType5["backhandSlice"]["cross"] = pidDataType5["backhandSlice"]["cross"] + tempy["Backhand Slice"][3] + tempy["Backhand Slice"][0];
                                // pidDataType5["backhandSlice"]["insideIn"] = pidDataType5["backhandSlice"]["insideIn"] + tempy["Backhand Slice"][5] + tempy["Backhand Slice"][2];
                                pidDataType5["backhandSlice"]["middle"] = pidDataType5["backhandSlice"]["middle"] + tempy["Backhand Slice"][4] + tempy["Backhand Slice"][1];
                                pidDataType5["backhandSlice"]["dtl"] = pidDataType5["backhandSlice"]["dtl"] + tempy["Backhand Slice"][5] + tempy["Backhand Slice"][2];
                                // pidDataType5["backhandSlice"]["insideOut"] = pidDataType5["backhandSlice"]["insideOut"] + tempy["Backhand Slice"][3] + tempy["Backhand Slice"][0];
                                pidDataType5["backhandSlice"]["shank"] = tempy["Backhand Slice"][6];
                                
                                // pidDataType5["forehandDrop"]["cross"] = pidDataType5["forehandDrop"]["cross"] + tempy["Forehand Drop"][3] + tempy["Forehand Drop"][0];
                                pidDataType5["forehandDrop"]["insideIn"] = pidDataType5["forehandDrop"]["insideIn"] + tempy["Forehand Drop"][3] + tempy["Forehand Drop"][0];
                                pidDataType5["forehandDrop"]["middle"] = pidDataType5["forehandDrop"]["middle"] + tempy["Forehand Drop"][4] + tempy["Forehand Drop"][1];
                                // pidDataType5["forehandDrop"]["dtl"] = pidDataType5["forehandDrop"]["dtl"] + tempy["Forehand Drop"][5] + tempy["Forehand Drop"][2];
                                pidDataType5["forehandDrop"]["insideOut"] = pidDataType5["forehandDrop"]["insideOut"] + tempy["Forehand Drop"][3] + tempy["Forehand Drop"][0];
                                pidDataType5["forehandDrop"]["shank"] = tempy["Forehand Drop"][6];

                                pidDataType5["backhandDrop"]["cross"] = pidDataType5["backhandDrop"]["cross"] + tempy["Backhand Drop"][3] + tempy["Backhand Drop"][0];
                                // pidDataType5["backhandDrop"]["insideIn"] = pidDataType5["backhandDrop"]["insideIn"] + tempy["Backhand Drop"][5] + tempy["Backhand Drop"][2];
                                pidDataType5["backhandDrop"]["middle"] = pidDataType5["backhandDrop"]["middle"] + tempy["Backhand Drop"][4] + tempy["Backhand Drop"][1];
                                pidDataType5["backhandDrop"]["dtl"] = pidDataType5["backhandDrop"]["dtl"] + tempy["Backhand Drop"][5] + tempy["Backhand Drop"][2];
                                // pidDataType5["backhandDrop"]["insideOut"] = pidDataType5["backhandDrop"]["insideOut"] + tempy["Backhand Drop"][3] + tempy["Backhand Drop"][0];
                                pidDataType5["backhandDrop"]["shank"] = tempy["Backhand Drop"][6];
                                
                                // pidDataType5["forehandVolley"]["cross"] = pidDataType5["forehandVolley"]["cross"] + tempy["Forehand Volley"][3] + tempy["Forehand Volley"][0];
                                pidDataType5["forehandVolley"]["insideIn"] = pidDataType5["forehandVolley"]["insideIn"] + tempy["Forehand Volley"][3] + tempy["Forehand Volley"][0];
                                pidDataType5["forehandVolley"]["middle"] = pidDataType5["forehandVolley"]["middle"] + tempy["Forehand Volley"][4] + tempy["Forehand Volley"][1];
                                // pidDataType5["forehandVolley"]["dtl"] = pidDataType5["forehandVolley"]["dtl"] + tempy["Forehand Volley"][5] + tempy["Forehand Volley"][2];
                                pidDataType5["forehandVolley"]["insideOut"] = pidDataType5["forehandVolley"]["insideOut"] + tempy["Forehand Volley"][3] + tempy["Forehand Volley"][0];
                                pidDataType5["forehandVolley"]["shank"] = tempy["Forehand Volley"][6];

                                pidDataType5["backhandVolley"]["cross"] = pidDataType5["backhandVolley"]["cross"] + tempy["Backhand Volley"][3] + tempy["Backhand Volley"][0];
                                // pidDataType5["backhandVolley"]["insideIn"] = pidDataType5["backhandVolley"]["insideIn"] + tempy["Backhand Volley"][5] + tempy["Backhand Volley"][2];
                                pidDataType5["backhandVolley"]["middle"] = pidDataType5["backhandVolley"]["middle"] + tempy["Backhand Volley"][4] + tempy["Backhand Volley"][1];
                                pidDataType5["backhandVolley"]["dtl"] = pidDataType5["backhandVolley"]["dtl"] + tempy["Backhand Volley"][5] + tempy["Backhand Volley"][2];
                                // pidDataType5["backhandVolley"]["insideOut"] = pidDataType5["backhandVolley"]["insideOut"] + tempy["Backhand Volley"][3] + tempy["Backhand Volley"][0];
                                pidDataType5["backhandVolley"]["shank"] = tempy["Backhand Volley"][6];

                                // pidDataType5["smash"]["cross"] = pidDataType5["smash"]["cross"] + tempy["Smash"][3] + tempy["Smash"][0];
                                pidDataType5["smash"]["insideIn"] = pidDataType5["smash"]["insideIn"] + tempy["Smash"][3] + tempy["Smash"][0];
                                pidDataType5["smash"]["middle"] = pidDataType5["smash"]["middle"] + tempy["Smash"][4] + tempy["Smash"][1];
                                // pidDataType5["smash"]["dtl"] = pidDataType5["smash"]["dtl"] + tempy["Smash"][5] + tempy["Smash"][2];
                                pidDataType5["smash"]["insideOut"] = pidDataType5["smash"]["insideOut"] + tempy["Smash"][3] + tempy["Smash"][0];
                                pidDataType5["smash"]["shank"] = tempy["Smash"][6];

                                pidDataType5["trick"]["in"] = pidDataType5["trick"]["in"] + tempy["Trick Shot"][5] + tempy["Trick Shot"][4] + tempy["Trick Shot"][3] + tempy["Trick Shot"][2] + tempy["Trick Shot"][1] + tempy["Trick Shot"][0];
                                pidDataType5["trick"]["shank"] = tempy["Trick Shot"][6];
                            }
                        } else {
                            if (key == "zone0") {
                                pidDataType0["backhand"]["cross"] = pidDataType0["backhand"]["cross"] + tempy["Backhand"][3] + tempy["Backhand"][0];
                                // pidDataType0["forehand"]["insideIn"] = pidDataType0["forehand"]["insideIn"] + tempy["Forehand"][3] + tempy["Forehand"][0];
                                pidDataType0["backhand"]["middle"] = pidDataType0["backhand"]["middle"] + tempy["Backhand"][4] + tempy["Backhand"][1];
                                pidDataType0["backhand"]["dtl"] = pidDataType0["backhand"]["dtl"] + tempy["Backhand"][5] + tempy["Backhand"][2];
                                // pidDataType0["forehand"]["insideOut"] = pidDataType0["forehand"]["insideOut"] + tempy["Forehand"][3] + tempy["Forehand"][0];
                                pidDataType0["backhand"]["shank"] = tempy["Backhand"][6];

                                // pidDataType0["backhand"]["cross"] = pidDataType0["backhand"]["cross"] + tempy["Backhand"][3] + tempy["Backhand"][0];
                                pidDataType0["forehand"]["insideIn"] = pidDataType0["forehand"]["insideIn"] + tempy["Forehand"][5] + tempy["Forehand"][2];
                                pidDataType0["forehand"]["middle"] = pidDataType0["forehand"]["middle"] + tempy["Forehand"][4] + tempy["Forehand"][1];
                                // pidDataType0["backhand"]["dtl"] = pidDataType0["backhand"]["dtl"] + tempy["Backhand"][5] + tempy["Backhand"][2];
                                pidDataType0["forehand"]["insideOut"] = pidDataType0["forehand"]["insideOut"] + tempy["Forehand"][3] + tempy["Forehand"][0];
                                pidDataType0["forehand"]["shank"] = tempy["Forehand"][6];
                                
                                pidDataType0["backhandSlice"]["cross"] = pidDataType0["backhandSlice"]["cross"] + tempy["Backhand Slice"][3] + tempy["Backhand Slice"][0];
                                // pidDataType0["backhandSlice"]["insideIn"] = pidDataType0["backhandSlice"]["insideIn"] + tempy["Forehand Slice"][3] + tempy["Forehand Slice"][0];
                                pidDataType0["backhandSlice"]["middle"] = pidDataType0["backhandSlice"]["middle"] + tempy["Backhand Slice"][4] + tempy["Backhand Slice"][1];
                                pidDataType0["backhandSlice"]["dtl"] = pidDataType0["backhandSlice"]["dtl"] + tempy["Backhand Slice"][5] + tempy["Backhand Slice"][2];
                                // pidDataType0["backhandSlice"]["insideOut"] = pidDataType0["backhandSlice"]["insideOut"] + tempy["Forehand Slice"][3] + tempy["Forehand Slice"][0];
                                pidDataType0["backhandSlice"]["shank"] = tempy["Backhand Slice"][6];

                                // pidDataType0["backhandSlice"]["cross"] = pidDataType0["backhandSlice"]["cross"] + tempy["Backhand Slice"][3] + tempy["Backhand Slice"][0];
                                pidDataType0["forehandSlice"]["insideIn"] = pidDataType0["forehandSlice"]["insideIn"] + tempy["Forehand Slice"][5] + tempy["Forehand Slice"][2];
                                pidDataType0["forehandSlice"]["middle"] = pidDataType0["forehandSlice"]["middle"] + tempy["Forehand Slice"][4] + tempy["Forehand Slice"][1];
                                // pidDataType0["backhandSlice"]["dtl"] = pidDataType0["backhandSlice"]["dtl"] + tempy["Backhand Slice"][5] + tempy["Backhand Slice"][2];
                                pidDataType0["forehandSlice"]["insideOut"] = pidDataType0["forehandSlice"]["insideOut"] + tempy["Forehand Slice"][3] + tempy["Forehand Slice"][0];
                                pidDataType0["forehandSlice"]["shank"] = tempy["Forehand Slice"][6];
                                
                                pidDataType0["backhandDrop"]["cross"] = pidDataType0["backhandDrop"]["cross"] + tempy["Backhand Drop"][3] + tempy["Backhand Drop"][0];
                                // pidDataType0["forehandDrop"]["insideIn"] = pidDataType0["forehandDrop"]["insideIn"] + tempy["Forehand Drop"][3] + tempy["Forehand Drop"][0];
                                pidDataType0["backhandDrop"]["middle"] = pidDataType0["backhandDrop"]["middle"] + tempy["Backhand Drop"][4] + tempy["Backhand Drop"][1];
                                pidDataType0["backhandDrop"]["dtl"] = pidDataType0["backhandDrop"]["dtl"] + tempy["Backhand Drop"][5] + tempy["Backhand Drop"][2];
                                // pidDataType0["forehandDrop"]["insideOut"] = pidDataType0["forehandDrop"]["insideOut"] + tempy["Forehand Drop"][3] + tempy["Forehand Drop"][0];
                                pidDataType0["backhandDrop"]["shank"] = tempy["Backhand Drop"][6];

                                // pidDataType0["backhandDrop"]["cross"] = pidDataType0["backhandDrop"]["cross"] + tempy["Backhand Drop"][3] + tempy["Backhand Drop"][0];
                                pidDataType0["forehandDrop"]["insideIn"] = pidDataType0["forehandDrop"]["insideIn"] + tempy["Forehand Drop"][5] + tempy["Forehand Drop"][2];
                                pidDataType0["forehandDrop"]["middle"] = pidDataType0["forehandDrop"]["middle"] + tempy["Forehand Drop"][4] + tempy["Forehand Drop"][1];
                                // pidDataType0["backhandDrop"]["dtl"] = pidDataType0["backhandDrop"]["dtl"] + tempy["Backhand Drop"][5] + tempy["Backhand Drop"][2];
                                pidDataType0["forehandDrop"]["insideOut"] = pidDataType0["forehandDrop"]["insideOut"] + tempy["Forehand Drop"][3] + tempy["Forehand Drop"][0];
                                pidDataType0["forehandDrop"]["shank"] = tempy["Forehand Drop"][6];
                                
                                pidDataType0["backhandVolley"]["cross"] = pidDataType0["backhandVolley"]["cross"] + tempy["Backhand Volley"][3] + tempy["Backhand Volley"][0];
                                // pidDataType0["forehandVolley"]["insideIn"] = pidDataType0["forehandVolley"]["insideIn"] + tempy["Forehand Volley"][3] + tempy["Forehand Volley"][0];
                                pidDataType0["backhandVolley"]["middle"] = pidDataType0["backhandVolley"]["middle"] + tempy["Backhand Volley"][4] + tempy["Backhand Volley"][1];
                                pidDataType0["backhandVolley"]["dtl"] = pidDataType0["backhandVolley"]["dtl"] + tempy["Backhand Volley"][5] + tempy["Backhand Volley"][2];
                                // pidDataType0["forehandVolley"]["insideOut"] = pidDataType0["forehandVolley"]["insideOut"] + tempy["Forehand Volley"][3] + tempy["Forehand Volley"][0];
                                pidDataType0["backhandVolley"]["shank"] = tempy["Backhand Volley"][6];

                                // pidDataType0["backhandVolley"]["cross"] = pidDataType0["backhandVolley"]["cross"] + tempy["Backhand Volley"][3] + tempy["Backhand Volley"][0];
                                pidDataType0["forehandVolley"]["insideIn"] = pidDataType0["forehandVolley"]["insideIn"] + tempy["Forehand Volley"][5] + tempy["Forehand Volley"][2];
                                pidDataType0["forehandVolley"]["middle"] = pidDataType0["forehandVolley"]["middle"] + tempy["Forehand Volley"][4] + tempy["Forehand Volley"][1];
                                // pidDataType0["backhandVolley"]["dtl"] = pidDataType0["backhandVolley"]["dtl"] + tempy["Backhand Volley"][5] + tempy["Backhand Volley"][2];
                                pidDataType0["forehandVolley"]["insideOut"] = pidDataType0["forehandVolley"]["insideOut"] + tempy["Forehand Volley"][3] + tempy["Forehand Volley"][0];
                                pidDataType0["forehandVolley"]["shank"] = tempy["Forehand Volley"][6];

                                // pidDataType0["smash"]["cross"] = pidDataType0["smash"]["cross"] + tempy["Smash"][3] + tempy["Smash"][0];
                                pidDataType0["smash"]["insideIn"] = pidDataType0["smash"]["insideIn"] + tempy["Smash"][5] + tempy["Smash"][2];
                                pidDataType0["smash"]["middle"] = pidDataType0["smash"]["middle"] + tempy["Smash"][4] + tempy["Smash"][1];
                                // pidDataType0["smash"]["dtl"] = pidDataType0["smash"]["dtl"] + tempy["Smash"][5] + tempy["Smash"][2];
                                pidDataType0["smash"]["insideOut"] = pidDataType0["smash"]["insideOut"] + tempy["Smash"][3] + tempy["Smash"][0];
                                pidDataType0["smash"]["shank"] = tempy["Smash"][6];

                                pidDataType0["trick"]["in"] = pidDataType0["trick"]["in"] + tempy["Trick Shot"][5] + tempy["Trick Shot"][4] + tempy["Trick Shot"][3] + tempy["Trick Shot"][2] + tempy["Trick Shot"][1] + tempy["Trick Shot"][0];
                                pidDataType0["trick"]["shank"] = tempy["Trick Shot"][6];
                            }
                            if (key == "zone1") {
                                pidDataType1["backhand"]["cross"] = pidDataType1["backhand"]["cross"] + tempy["Backhand"][3] + tempy["Backhand"][0];
                                // pidDataType1["forehand"]["insideIn"] = pidDataType1["forehand"]["insideIn"] + tempy["Forehand"][3] + tempy["Forehand"][0];
                                pidDataType1["backhand"]["middle"] = pidDataType1["backhand"]["middle"] + tempy["Backhand"][4] + tempy["Backhand"][1];
                                // pidDataType1["forehand"]["dtl"] = pidDataType1["forehand"]["dtl"] + tempy["Forehand"][5] + tempy["Forehand"][2];
                                pidDataType1["backhand"]["insideOut"] = pidDataType1["backhand"]["insideOut"] + tempy["Backhand"][3] + tempy["Backhand"][0];
                                pidDataType1["backhand"]["shank"] = tempy["Backhand"][6];

                                pidDataType1["forehand"]["cross"] = pidDataType1["forehand"]["cross"] + tempy["Forehand"][3] + tempy["Forehand"][0];
                                // pidDataType1["backhand"]["insideIn"] = pidDataType1["backhand"]["insideIn"] + tempy["Backhand"][5] + tempy["Backhand"][2];
                                pidDataType1["forehand"]["middle"] = pidDataType1["forehand"]["middle"] + tempy["Forehand"][4] + tempy["Forehand"][1];
                                // pidDataType1["backhand"]["dtl"] = pidDataType1["backhand"]["dtl"] + tempy["Backhand"][5] + tempy["Backhand"][2];
                                pidDataType1["forehand"]["insideOut"] = pidDataType1["forehand"]["insideOut"] + tempy["Forehand"][3] + tempy["Forehand"][0];
                                pidDataType1["forehand"]["shank"] = tempy["Forehand"][6];
                                
                                pidDataType1["backhandSlice"]["cross"] = pidDataType1["backhandSlice"]["cross"] + tempy["Backhand Slice"][3] + tempy["Backhand Slice"][0];
                                // pidDataType1["forehandSlice"]["insideIn"] = pidDataType1["forehandSlice"]["insideIn"] + tempy["Forehand Slice"][3] + tempy["Forehand Slice"][0];
                                pidDataType1["backhandSlice"]["middle"] = pidDataType1["backhandSlice"]["middle"] + tempy["Backhand Slice"][4] + tempy["Backhand Slice"][1];
                                // pidDataType1["forehandSlice"]["dtl"] = pidDataType1["forehandSlice"]["dtl"] + tempy["Forehand Slice"][5] + tempy["Forehand Slice"][2];
                                pidDataType1["backhandSlice"]["insideOut"] = pidDataType1["backhandSlice"]["insideOut"] + tempy["Backhand Slice"][3] + tempy["Backhand Slice"][0];
                                pidDataType1["backhandSlice"]["shank"] = tempy["Backhand Slice"][6];

                                pidDataType1["forehandSlice"]["cross"] = pidDataType1["forehandSlice"]["cross"] + tempy["Forehand Slice"][3] + tempy["Forehand Slice"][0];
                                // pidDataType1["backhandSlice"]["insideIn"] = pidDataType1["backhandSlice"]["insideIn"] + tempy["Backhand Slice"][5] + tempy["Backhand Slice"][2];
                                pidDataType1["forehandSlice"]["middle"] = pidDataType1["forehandSlice"]["middle"] + tempy["Forehand Slice"][4] + tempy["Forehand Slice"][1];
                                // pidDataType1["backhandSlice"]["dtl"] = pidDataType1["backhandSlice"]["dtl"] + tempy["Backhand Slice"][5] + tempy["Backhand Slice"][2];
                                pidDataType1["forehandSlice"]["insideOut"] = pidDataType1["forehandSlice"]["insideOut"] + tempy["Forehand Slice"][3] + tempy["Forehand Slice"][0];
                                pidDataType1["forehandSlice"]["shank"] = tempy["Forehand Slice"][6];
                                
                                pidDataType1["backhandDrop"]["cross"] = pidDataType1["backhandDrop"]["cross"] + tempy["Backhand Drop"][3] + tempy["Backhand Drop"][0];
                                // pidDataType1["forehandDrop"]["insideIn"] = pidDataType1["forehandDrop"]["insideIn"] + tempy["Forehand Drop"][3] + tempy["Forehand Drop"][0];
                                pidDataType1["backhandDrop"]["middle"] = pidDataType1["backhandDrop"]["middle"] + tempy["Backhand Drop"][4] + tempy["Backhand Drop"][1];
                                // pidDataType1["forehandDrop"]["dtl"] = pidDataType1["forehandDrop"]["dtl"] + tempy["Forehand Drop"][5] + tempy["Forehand Drop"][2];
                                pidDataType1["backhandDrop"]["insideOut"] = pidDataType1["backhandDrop"]["insideOut"] + tempy["Backhand Drop"][3] + tempy["Backhand Drop"][0];
                                pidDataType1["backhandDrop"]["shank"] = tempy["Backhand Drop"][6];

                                pidDataType1["forehandDrop"]["cross"] = pidDataType1["forehandDrop"]["cross"] + tempy["Forehand Drop"][3] + tempy["Forehand Drop"][0];
                                // pidDataType1["backhandDrop"]["insideIn"] = pidDataType1["backhandDrop"]["insideIn"] + tempy["Backhand Drop"][5] + tempy["Backhand Drop"][2];
                                pidDataType1["forehandDrop"]["middle"] = pidDataType1["forehandDrop"]["middle"] + tempy["Forehand Drop"][4] + tempy["Forehand Drop"][1];
                                // pidDataType1["backhandDrop"]["dtl"] = pidDataType1["backhandDrop"]["dtl"] + tempy["Backhand Drop"][5] + tempy["Backhand Drop"][2];
                                pidDataType1["forehandDrop"]["insideOut"] = pidDataType1["forehandDrop"]["insideOut"] + tempy["Forehand Drop"][3] + tempy["Forehand Drop"][0];
                                pidDataType1["forehandDrop"]["shank"] = tempy["Forehand Drop"][6];
                                
                                pidDataType1["backhandVolley"]["cross"] = pidDataType1["backhandVolley"]["cross"] + tempy["Backhand Volley"][3] + tempy["Backhand Volley"][0];
                                // pidDataType1["forehandVolley"]["insideIn"] = pidDataType1["forehandVolley"]["insideIn"] + tempy["Forehand Volley"][3] + tempy["Forehand Volley"][0];
                                pidDataType1["backhandVolley"]["middle"] = pidDataType1["backhandVolley"]["middle"] + tempy["Backhand Volley"][4] + tempy["Backhand Volley"][1];
                                // pidDataType1["forehandVolley"]["dtl"] = pidDataType1["forehandVolley"]["dtl"] + tempy["Forehand Volley"][5] + tempy["Forehand Volley"][2];
                                pidDataType1["backhandVolley"]["insideOut"] = pidDataType1["backhandVolley"]["insideOut"] + tempy["Backhand Volley"][3] + tempy["Backhand Volley"][0];
                                pidDataType1["backhandVolley"]["shank"] = tempy["Backhand Volley"][6];

                                pidDataType1["forehandVolley"]["cross"] = pidDataType1["forehandVolley"]["cross"] + tempy["Forehand Volley"][3] + tempy["Forehand Volley"][0];
                                // pidDataType1["backhandVolley"]["insideIn"] = pidDataType1["backhandVolley"]["insideIn"] + tempy["Backhand Volley"][5] + tempy["Backhand Volley"][2];
                                pidDataType1["forehandVolley"]["middle"] = pidDataType1["forehandVolley"]["middle"] + tempy["Forehand Volley"][4] + tempy["Forehand Volley"][1];
                                // pidDataType1["backhandVolley"]["dtl"] = pidDataType1["backhandVolley"]["dtl"] + tempy["Backhand Volley"][5] + tempy["Backhand Volley"][2];
                                pidDataType1["forehandVolley"]["insideOut"] = pidDataType1["forehandVolley"]["insideOut"] + tempy["Forehand Volley"][3] + tempy["Forehand Volley"][0];
                                pidDataType1["forehandVolley"]["shank"] = tempy["Forehand Volley"][6];

                                pidDataType1["smash"]["cross"] = pidDataType1["smash"]["cross"] + tempy["Smash"][3] + tempy["Smash"][0];
                                // pidDataType1["smash"]["insideIn"] = pidDataType1["smash"]["insideIn"] + tempy["Smash"][3] + tempy["Smash"][0];
                                pidDataType1["smash"]["middle"] = pidDataType1["smash"]["middle"] + tempy["Smash"][4] + tempy["Smash"][1];
                                // pidDataType1["smash"]["dtl"] = pidDataType1["smash"]["dtl"] + tempy["Smash"][5] + tempy["Smash"][2];
                                pidDataType1["smash"]["insideOut"] = pidDataType1["smash"]["insideOut"] + tempy["Smash"][3] + tempy["Smash"][0];
                                pidDataType1["smash"]["shank"] = tempy["Smash"][6];

                                pidDataType1["trick"]["in"] = pidDataType1["trick"]["in"] + tempy["Trick Shot"][5] + tempy["Trick Shot"][4] + tempy["Trick Shot"][3] + tempy["Trick Shot"][2] + tempy["Trick Shot"][1] + tempy["Trick Shot"][0];
                                pidDataType1["trick"]["shank"] = tempy["Trick Shot"][6];
                            }
                            if (key == "zone2") {
                                // pidDataType2["forehand"]["cross"] = pidDataType2["forehand"]["cross"] + tempy["Forehand"][3] + tempy["Forehand"][0];
                                pidDataType2["backhand"]["insideIn"] = pidDataType2["backhand"]["insideIn"] + tempy["Backhand"][3] + tempy["Backhand"][0];
                                pidDataType2["backhand"]["middle"] = pidDataType2["backhand"]["middle"] + tempy["Backhand"][4] + tempy["Backhand"][1];
                                // pidDataType2["forehand"]["dtl"] = pidDataType2["forehand"]["dtl"] + tempy["Forehand"][5] + tempy["Forehand"][2];
                                pidDataType2["backhand"]["insideOut"] = pidDataType2["backhand"]["insideOut"] + tempy["Backhand"][3] + tempy["Backhand"][0];
                                pidDataType2["backhand"]["shank"] = tempy["Backhand"][6];

                                pidDataType2["forehand"]["cross"] = pidDataType2["forehand"]["cross"] + tempy["Forehand"][3] + tempy["Forehand"][0];
                                // pidDataType2["backhand"]["insideIn"] = pidDataType2["backhand"]["insideIn"] + tempy["Backhand"][5] + tempy["Backhand"][2];
                                pidDataType2["forehand"]["middle"] = pidDataType2["forehand"]["middle"] + tempy["Forehand"][4] + tempy["Forehand"][1];
                                pidDataType2["forehand"]["dtl"] = pidDataType2["forehand"]["dtl"] + tempy["Forehand"][5] + tempy["Forehand"][2];
                                // pidDataType2["backhand"]["insideOut"] = pidDataType2["backhand"]["insideOut"] + tempy["Backhand"][3] + tempy["Backhand"][0];
                                pidDataType2["forehand"]["shank"] = tempy["Forehand"][6];
                                
                                // pidDataType2["forehandSlice"]["cross"] = pidDataType2["forehandSlice"]["cross"] + tempy["Forehand Slice"][3] + tempy["Forehand Slice"][0];
                                pidDataType2["backhandSlice"]["insideIn"] = pidDataType2["backhandSlice"]["insideIn"] + tempy["Backhand Slice"][3] + tempy["Backhand Slice"][0];
                                pidDataType2["backhandSlice"]["middle"] = pidDataType2["backhandSlice"]["middle"] + tempy["Backhand Slice"][4] + tempy["Backhand Slice"][1];
                                // pidDataType2["forehandSlice"]["dtl"] = pidDataType2["forehandSlice"]["dtl"] + tempy["Forehand Slice"][5] + tempy["Forehand Slice"][2];
                                pidDataType2["backhandSlice"]["insideOut"] = pidDataType2["backhandSlice"]["insideOut"] + tempy["Backhand Slice"][3] + tempy["Backhand Slice"][0];
                                pidDataType2["backhandSlice"]["shank"] = tempy["Backhand Slice"][6];

                                pidDataType2["forehandSlice"]["cross"] = pidDataType2["forehandSlice"]["cross"] + tempy["Forehand Slice"][3] + tempy["Forehand Slice"][0];
                                // pidDataType2["backhandSlice"]["insideIn"] = pidDataType2["backhandSlice"]["insideIn"] + tempy["Backhand Slice"][5] + tempy["Backhand Slice"][2];
                                pidDataType2["forehandSlice"]["middle"] = pidDataType2["forehandSlice"]["middle"] + tempy["Forehand Slice"][4] + tempy["Forehand Slice"][1];
                                pidDataType2["forehandSlice"]["dtl"] = pidDataType2["forehandSlice"]["dtl"] + tempy["Forehand Slice"][5] + tempy["Forehand Slice"][2];
                                // pidDataType2["backhandSlice"]["insideOut"] = pidDataType2["backhandSlice"]["insideOut"] + tempy["Backhand Slice"][3] + tempy["Backhand Slice"][0];
                                pidDataType2["forehandSlice"]["shank"] = tempy["Forehand Slice"][6];
                                
                                // pidDataType2["forehandDrop"]["cross"] = pidDataType2["forehandDrop"]["cross"] + tempy["Forehand Drop"][3] + tempy["Forehand Drop"][0];
                                pidDataType2["backhandDrop"]["insideIn"] = pidDataType2["backhandDrop"]["insideIn"] + tempy["Backhand Drop"][3] + tempy["Backhand Drop"][0];
                                pidDataType2["backhandDrop"]["middle"] = pidDataType2["backhandDrop"]["middle"] + tempy["Backhand Drop"][4] + tempy["Backhand Drop"][1];
                                // pidDataType2["forehandDrop"]["dtl"] = pidDataType2["forehandDrop"]["dtl"] + tempy["Forehand Drop"][5] + tempy["Forehand Drop"][2];
                                pidDataType2["backhandDrop"]["insideOut"] = pidDataType2["backhandDrop"]["insideOut"] + tempy["Backhand Drop"][3] + tempy["Backhand Drop"][0];
                                pidDataType2["backhandDrop"]["shank"] = tempy["Backhand Drop"][6];

                                pidDataType2["forehandDrop"]["cross"] = pidDataType2["forehandDrop"]["cross"] + tempy["Forehand Drop"][3] + tempy["Forehand Drop"][0];
                                // pidDataType2["backhandDrop"]["insideIn"] = pidDataType2["backhandDrop"]["insideIn"] + tempy["Backhand Drop"][5] + tempy["Backhand Drop"][2];
                                pidDataType2["forehandDrop"]["middle"] = pidDataType2["forehandDrop"]["middle"] + tempy["Forehand Drop"][4] + tempy["Forehand Drop"][1];
                                pidDataType2["forehandDrop"]["dtl"] = pidDataType2["forehandDrop"]["dtl"] + tempy["Forehand Drop"][5] + tempy["Forehand Drop"][2];
                                // pidDataType2["backhandDrop"]["insideOut"] = pidDataType2["backhandDrop"]["insideOut"] + tempy["Backhand Drop"][3] + tempy["Backhand Drop"][0];
                                pidDataType2["forehandDrop"]["shank"] = tempy["Forehand Drop"][6];
                                
                                // pidDataType2["forehandVolley"]["cross"] = pidDataType2["forehandVolley"]["cross"] + tempy["Forehand Volley"][3] + tempy["Forehand Volley"][0];
                                pidDataType2["backhandVolley"]["insideIn"] = pidDataType2["backhandVolley"]["insideIn"] + tempy["Backhand Volley"][3] + tempy["Backhand Volley"][0];
                                pidDataType2["backhandVolley"]["middle"] = pidDataType2["backhandVolley"]["middle"] + tempy["Backhand Volley"][4] + tempy["Backhand Volley"][1];
                                // pidDataType2["forehandVolley"]["dtl"] = pidDataType2["forehandVolley"]["dtl"] + tempy["Forehand Volley"][5] + tempy["Forehand Volley"][2];
                                pidDataType2["backhandVolley"]["insideOut"] = pidDataType2["backhandVolley"]["insideOut"] + tempy["Backhand Volley"][3] + tempy["Backhand Volley"][0];
                                pidDataType2["backhandVolley"]["shank"] = tempy["Backhand Volley"][6];

                                pidDataType2["forehandVolley"]["cross"] = pidDataType2["forehandVolley"]["cross"] + tempy["Forehand Volley"][3] + tempy["Forehand Volley"][0];
                                // pidDataType2["backhandVolley"]["insideIn"] = pidDataType2["backhandVolley"]["insideIn"] + tempy["Backhand Volley"][5] + tempy["Backhand Volley"][2];
                                pidDataType2["forehandVolley"]["middle"] = pidDataType2["forehandVolley"]["middle"] + tempy["Forehand Volley"][4] + tempy["Forehand Volley"][1];
                                pidDataType2["forehandVolley"]["dtl"] = pidDataType2["forehandVolley"]["dtl"] + tempy["Forehand Volley"][5] + tempy["Forehand Volley"][2];
                                // pidDataType2["backhandVolley"]["insideOut"] = pidDataType2["backhandVolley"]["insideOut"] + tempy["Backhand Volley"][3] + tempy["Backhand Volley"][0];
                                pidDataType2["forehandVolley"]["shank"] = tempy["Forehand Volley"][6];

                                pidDataType2["smash"]["cross"] = pidDataType2["smash"]["cross"] + tempy["Smash"][3] + tempy["Smash"][0];
                                // pidDataType2["smash"]["insideIn"] = pidDataType2["smash"]["insideIn"] + tempy["Smash"][3] + tempy["Smash"][0];
                                pidDataType2["smash"]["middle"] = pidDataType2["smash"]["middle"] + tempy["Smash"][4] + tempy["Smash"][1];
                                pidDataType2["smash"]["dtl"] = pidDataType2["smash"]["dtl"] + tempy["Smash"][5] + tempy["Smash"][2];
                                // pidDataType2["smash"]["insideOut"] = pidDataType2["smash"]["insideOut"] + tempy["Smash"][3] + tempy["Smash"][0];
                                pidDataType2["smash"]["shank"] = tempy["Smash"][6];

                                pidDataType2["trick"]["in"] = pidDataType2["trick"]["in"] + tempy["Trick Shot"][5] + tempy["Trick Shot"][4] + tempy["Trick Shot"][3] + tempy["Trick Shot"][2] + tempy["Trick Shot"][1] + tempy["Trick Shot"][0];
                                pidDataType2["trick"]["shank"] = tempy["Trick Shot"][6];
                            }
                            if (key == "zone3") {
                                pidDataType3["backhand"]["cross"] = pidDataType3["backhand"]["cross"] + tempy["Backhand"][3] + tempy["Backhand"][0];
                                // pidDataType3["forehand"]["insideIn"] = pidDataType3["forehand"]["insideIn"] + tempy["Forehand"][3] + tempy["Forehand"][0];
                                pidDataType3["backhand"]["middle"] = pidDataType3["backhand"]["middle"] + tempy["Backhand"][4] + tempy["Backhand"][1];
                                pidDataType3["backhand"]["dtl"] = pidDataType3["backhand"]["dtl"] + tempy["Backhand"][5] + tempy["Backhand"][2];
                                // pidDataType3["forehand"]["insideOut"] = pidDataType3["forehand"]["insideOut"] + tempy["Forehand"][3] + tempy["Forehand"][0];
                                pidDataType3["backhand"]["shank"] = tempy["Backhand"][6];

                                // pidDataType3["backhand"]["cross"] = pidDataType3["backhand"]["cross"] + tempy["Backhand"][3] + tempy["Backhand"][0];
                                pidDataType3["forehand"]["insideIn"] = pidDataType3["forehand"]["insideIn"] + tempy["Forehand"][5] + tempy["Forehand"][2];
                                pidDataType3["forehand"]["middle"] = pidDataType3["forehand"]["middle"] + tempy["Forehand"][4] + tempy["Forehand"][1];
                                // pidDataType3["backhand"]["dtl"] = pidDataType3["backhand"]["dtl"] + tempy["Backhand"][5] + tempy["Backhand"][2];
                                pidDataType3["forehand"]["insideOut"] = pidDataType3["forehand"]["insideOut"] + tempy["Forehand"][3] + tempy["Forehand"][0];
                                pidDataType3["forehand"]["shank"] = tempy["Forehand"][6];
                                
                                pidDataType3["backhandSlice"]["cross"] = pidDataType3["backhandSlice"]["cross"] + tempy["Backhand Slice"][3] + tempy["Backhand Slice"][0];
                                // pidDataType3["backhandSlice"]["insideIn"] = pidDataType3["backhandSlice"]["insideIn"] + tempy["Forehand Slice"][3] + tempy["Forehand Slice"][0];
                                pidDataType3["backhandSlice"]["middle"] = pidDataType3["backhandSlice"]["middle"] + tempy["Backhand Slice"][4] + tempy["Backhand Slice"][1];
                                pidDataType3["backhandSlice"]["dtl"] = pidDataType3["backhandSlice"]["dtl"] + tempy["Backhand Slice"][5] + tempy["Backhand Slice"][2];
                                // pidDataType3["backhandSlice"]["insideOut"] = pidDataType3["backhandSlice"]["insideOut"] + tempy["Forehand Slice"][3] + tempy["Forehand Slice"][0];
                                pidDataType3["backhandSlice"]["shank"] = tempy["Backhand Slice"][6];

                                // pidDataType3["backhandSlice"]["cross"] = pidDataType3["backhandSlice"]["cross"] + tempy["Backhand Slice"][3] + tempy["Backhand Slice"][0];
                                pidDataType3["forehandSlice"]["insideIn"] = pidDataType3["forehandSlice"]["insideIn"] + tempy["Forehand Slice"][5] + tempy["Forehand Slice"][2];
                                pidDataType3["forehandSlice"]["middle"] = pidDataType3["forehandSlice"]["middle"] + tempy["Forehand Slice"][4] + tempy["Forehand Slice"][1];
                                // pidDataType3["backhandSlice"]["dtl"] = pidDataType3["backhandSlice"]["dtl"] + tempy["Backhand Slice"][5] + tempy["Backhand Slice"][2];
                                pidDataType3["forehandSlice"]["insideOut"] = pidDataType3["forehandSlice"]["insideOut"] + tempy["Forehand Slice"][3] + tempy["Forehand Slice"][0];
                                pidDataType3["forehandSlice"]["shank"] = tempy["Forehand Slice"][6];
                                
                                pidDataType3["backhandDrop"]["cross"] = pidDataType3["backhandDrop"]["cross"] + tempy["Backhand Drop"][3] + tempy["Backhand Drop"][0];
                                // pidDataType3["forehandDrop"]["insideIn"] = pidDataType3["forehandDrop"]["insideIn"] + tempy["Forehand Drop"][3] + tempy["Forehand Drop"][0];
                                pidDataType3["backhandDrop"]["middle"] = pidDataType3["backhandDrop"]["middle"] + tempy["Backhand Drop"][4] + tempy["Backhand Drop"][1];
                                pidDataType3["backhandDrop"]["dtl"] = pidDataType3["backhandDrop"]["dtl"] + tempy["Backhand Drop"][5] + tempy["Backhand Drop"][2];
                                // pidDataType3["forehandDrop"]["insideOut"] = pidDataType3["forehandDrop"]["insideOut"] + tempy["Forehand Drop"][3] + tempy["Forehand Drop"][0];
                                pidDataType3["backhandDrop"]["shank"] = tempy["Backhand Drop"][6];

                                // pidDataType3["backhandDrop"]["cross"] = pidDataType3["backhandDrop"]["cross"] + tempy["Backhand Drop"][3] + tempy["Backhand Drop"][0];
                                pidDataType3["forehandDrop"]["insideIn"] = pidDataType3["forehandDrop"]["insideIn"] + tempy["Forehand Drop"][5] + tempy["Forehand Drop"][2];
                                pidDataType3["forehandDrop"]["middle"] = pidDataType3["forehandDrop"]["middle"] + tempy["Forehand Drop"][4] + tempy["Forehand Drop"][1];
                                // pidDataType3["backhandDrop"]["dtl"] = pidDataType3["backhandDrop"]["dtl"] + tempy["Backhand Drop"][5] + tempy["Backhand Drop"][2];
                                pidDataType3["forehandDrop"]["insideOut"] = pidDataType3["forehandDrop"]["insideOut"] + tempy["Forehand Drop"][3] + tempy["Forehand Drop"][0];
                                pidDataType3["forehandDrop"]["shank"] = tempy["Forehand Drop"][6];
                                
                                pidDataType3["backhandVolley"]["cross"] = pidDataType3["backhandVolley"]["cross"] + tempy["Backhand Volley"][3] + tempy["Backhand Volley"][0];
                                // pidDataType3["forehandVolley"]["insideIn"] = pidDataType3["forehandVolley"]["insideIn"] + tempy["Forehand Volley"][3] + tempy["Forehand Volley"][0];
                                pidDataType3["backhandVolley"]["middle"] = pidDataType3["backhandVolley"]["middle"] + tempy["Backhand Volley"][4] + tempy["Backhand Volley"][1];
                                pidDataType3["backhandVolley"]["dtl"] = pidDataType3["backhandVolley"]["dtl"] + tempy["Backhand Volley"][5] + tempy["Backhand Volley"][2];
                                // pidDataType3["forehandVolley"]["insideOut"] = pidDataType3["forehandVolley"]["insideOut"] + tempy["Forehand Volley"][3] + tempy["Forehand Volley"][0];
                                pidDataType3["backhandVolley"]["shank"] = tempy["Backhand Volley"][6];

                                // pidDataType3["backhandVolley"]["cross"] = pidDataType3["backhandVolley"]["cross"] + tempy["Backhand Volley"][3] + tempy["Backhand Volley"][0];
                                pidDataType3["forehandVolley"]["insideIn"] = pidDataType3["forehandVolley"]["insideIn"] + tempy["Forehand Volley"][5] + tempy["Forehand Volley"][2];
                                pidDataType3["forehandVolley"]["middle"] = pidDataType3["forehandVolley"]["middle"] + tempy["Forehand Volley"][4] + tempy["Forehand Volley"][1];
                                // pidDataType3["backhandVolley"]["dtl"] = pidDataType3["backhandVolley"]["dtl"] + tempy["Backhand Volley"][5] + tempy["Backhand Volley"][2];
                                pidDataType3["forehandVolley"]["insideOut"] = pidDataType3["forehandVolley"]["insideOut"] + tempy["Forehand Volley"][3] + tempy["Forehand Volley"][0];
                                pidDataType3["forehandVolley"]["shank"] = tempy["Forehand Volley"][6];

                                // pidDataType3["smash"]["cross"] = pidDataType3["smash"]["cross"] + tempy["Smash"][3] + tempy["Smash"][0];
                                pidDataType3["smash"]["insideIn"] = pidDataType3["smash"]["insideIn"] + tempy["Smash"][5] + tempy["Smash"][2];
                                pidDataType3["smash"]["middle"] = pidDataType3["smash"]["middle"] + tempy["Smash"][4] + tempy["Smash"][1];
                                // pidDataType3["smash"]["dtl"] = pidDataType3["smash"]["dtl"] + tempy["Smash"][5] + tempy["Smash"][2];
                                pidDataType3["smash"]["insideOut"] = pidDataType3["smash"]["insideOut"] + tempy["Smash"][3] + tempy["Smash"][0];
                                pidDataType3["smash"]["shank"] = tempy["Smash"][6];

                                pidDataType3["trick"]["in"] = pidDataType3["trick"]["in"] + tempy["Trick Shot"][5] + tempy["Trick Shot"][4] + tempy["Trick Shot"][3] + tempy["Trick Shot"][2] + tempy["Trick Shot"][1] + tempy["Trick Shot"][0];
                                pidDataType3["trick"]["shank"] = tempy["Trick Shot"][6];
                            }
                            if (key == "zone4") {
                                pidDataType4["backhand"]["cross"] = pidDataType4["backhand"]["cross"] + tempy["Backhand"][3] + tempy["Backhand"][0];
                                // pidDataType4["forehand"]["insideIn"] = pidDataType4["forehand"]["insideIn"] + tempy["Forehand"][3] + tempy["Forehand"][0];
                                pidDataType4["backhand"]["middle"] = pidDataType4["backhand"]["middle"] + tempy["Backhand"][4] + tempy["Backhand"][1];
                                // pidDataType4["forehand"]["dtl"] = pidDataType4["forehand"]["dtl"] + tempy["Forehand"][5] + tempy["Forehand"][2];
                                pidDataType4["backhand"]["insideOut"] = pidDataType4["backhand"]["insideOut"] + tempy["Backhand"][3] + tempy["Backhand"][0];
                                pidDataType4["backhand"]["shank"] = tempy["Backhand"][6];

                                pidDataType4["forehand"]["cross"] = pidDataType4["forehand"]["cross"] + tempy["Forehand"][3] + tempy["Forehand"][0];
                                // pidDataType4["backhand"]["insideIn"] = pidDataType4["backhand"]["insideIn"] + tempy["Backhand"][5] + tempy["Backhand"][2];
                                pidDataType4["forehand"]["middle"] = pidDataType4["forehand"]["middle"] + tempy["Forehand"][4] + tempy["Forehand"][1];
                                // pidDataType4["backhand"]["dtl"] = pidDataType4["backhand"]["dtl"] + tempy["Backhand"][5] + tempy["Backhand"][2];
                                pidDataType4["forehand"]["insideOut"] = pidDataType4["forehand"]["insideOut"] + tempy["Forehand"][3] + tempy["Forehand"][0];
                                pidDataType4["forehand"]["shank"] = tempy["Forehand"][6];
                                
                                pidDataType4["backhandSlice"]["cross"] = pidDataType4["backhandSlice"]["cross"] + tempy["Backhand Slice"][3] + tempy["Backhand Slice"][0];
                                // pidDataType4["forehandSlice"]["insideIn"] = pidDataType4["forehandSlice"]["insideIn"] + tempy["Forehand Slice"][3] + tempy["Forehand Slice"][0];
                                pidDataType4["backhandSlice"]["middle"] = pidDataType4["backhandSlice"]["middle"] + tempy["Backhand Slice"][4] + tempy["Backhand Slice"][1];
                                // pidDataType4["forehandSlice"]["dtl"] = pidDataType4["forehandSlice"]["dtl"] + tempy["Forehand Slice"][5] + tempy["Forehand Slice"][2];
                                pidDataType4["backhandSlice"]["insideOut"] = pidDataType4["backhandSlice"]["insideOut"] + tempy["Backhand Slice"][3] + tempy["Backhand Slice"][0];
                                pidDataType4["backhandSlice"]["shank"] = tempy["Backhand Slice"][6];

                                pidDataType4["forehandSlice"]["cross"] = pidDataType4["forehandSlice"]["cross"] + tempy["Forehand Slice"][3] + tempy["Forehand Slice"][0];
                                // pidDataType4["backhandSlice"]["insideIn"] = pidDataType4["backhandSlice"]["insideIn"] + tempy["Backhand Slice"][5] + tempy["Backhand Slice"][2];
                                pidDataType4["forehandSlice"]["middle"] = pidDataType4["forehandSlice"]["middle"] + tempy["Forehand Slice"][4] + tempy["Forehand Slice"][1];
                                // pidDataType4["backhandSlice"]["dtl"] = pidDataType4["backhandSlice"]["dtl"] + tempy["Backhand Slice"][5] + tempy["Backhand Slice"][2];
                                pidDataType4["forehandSlice"]["insideOut"] = pidDataType4["forehandSlice"]["insideOut"] + tempy["Forehand Slice"][3] + tempy["Forehand Slice"][0];
                                pidDataType4["forehandSlice"]["shank"] = tempy["Forehand Slice"][6];
                                
                                pidDataType4["backhandDrop"]["cross"] = pidDataType4["backhandDrop"]["cross"] + tempy["Backhand Drop"][3] + tempy["Backhand Drop"][0];
                                // pidDataType4["forehandDrop"]["insideIn"] = pidDataType4["forehandDrop"]["insideIn"] + tempy["Forehand Drop"][3] + tempy["Forehand Drop"][0];
                                pidDataType4["backhandDrop"]["middle"] = pidDataType4["backhandDrop"]["middle"] + tempy["Backhand Drop"][4] + tempy["Backhand Drop"][1];
                                // pidDataType4["forehandDrop"]["dtl"] = pidDataType4["forehandDrop"]["dtl"] + tempy["Forehand Drop"][5] + tempy["Forehand Drop"][2];
                                pidDataType4["backhandDrop"]["insideOut"] = pidDataType4["backhandDrop"]["insideOut"] + tempy["Backhand Drop"][3] + tempy["Backhand Drop"][0];
                                pidDataType4["backhandDrop"]["shank"] = tempy["Backhand Drop"][6];

                                pidDataType4["forehandDrop"]["cross"] = pidDataType4["forehandDrop"]["cross"] + tempy["Forehand Drop"][3] + tempy["Forehand Drop"][0];
                                // pidDataType4["backhandDrop"]["insideIn"] = pidDataType4["backhandDrop"]["insideIn"] + tempy["Backhand Drop"][5] + tempy["Backhand Drop"][2];
                                pidDataType4["forehandDrop"]["middle"] = pidDataType4["forehandDrop"]["middle"] + tempy["Forehand Drop"][4] + tempy["Forehand Drop"][1];
                                // pidDataType4["backhandDrop"]["dtl"] = pidDataType4["backhandDrop"]["dtl"] + tempy["Backhand Drop"][5] + tempy["Backhand Drop"][2];
                                pidDataType4["forehandDrop"]["insideOut"] = pidDataType4["forehandDrop"]["insideOut"] + tempy["Forehand Drop"][3] + tempy["Forehand Drop"][0];
                                pidDataType4["forehandDrop"]["shank"] = tempy["Forehand Drop"][6];
                                
                                pidDataType4["backhandVolley"]["cross"] = pidDataType4["backhandVolley"]["cross"] + tempy["Backhand Volley"][3] + tempy["Backhand Volley"][0];
                                // pidDataType4["forehandVolley"]["insideIn"] = pidDataType4["forehandVolley"]["insideIn"] + tempy["Forehand Volley"][3] + tempy["Forehand Volley"][0];
                                pidDataType4["backhandVolley"]["middle"] = pidDataType4["backhandVolley"]["middle"] + tempy["Backhand Volley"][4] + tempy["Backhand Volley"][1];
                                // pidDataType4["forehandVolley"]["dtl"] = pidDataType4["forehandVolley"]["dtl"] + tempy["Forehand Volley"][5] + tempy["Forehand Volley"][2];
                                pidDataType4["backhandVolley"]["insideOut"] = pidDataType4["backhandVolley"]["insideOut"] + tempy["Backhand Volley"][3] + tempy["Backhand Volley"][0];
                                pidDataType4["backhandVolley"]["shank"] = tempy["Backhand Volley"][6];

                                pidDataType4["forehandVolley"]["cross"] = pidDataType4["forehandVolley"]["cross"] + tempy["Forehand Volley"][3] + tempy["Forehand Volley"][0];
                                // pidDataType4["backhandVolley"]["insideIn"] = pidDataType4["backhandVolley"]["insideIn"] + tempy["Backhand Volley"][5] + tempy["Backhand Volley"][2];
                                pidDataType4["forehandVolley"]["middle"] = pidDataType4["forehandVolley"]["middle"] + tempy["Forehand Volley"][4] + tempy["Forehand Volley"][1];
                                // pidDataType4["backhandVolley"]["dtl"] = pidDataType4["backhandVolley"]["dtl"] + tempy["Backhand Volley"][5] + tempy["Backhand Volley"][2];
                                pidDataType4["forehandVolley"]["insideOut"] = pidDataType4["forehandVolley"]["insideOut"] + tempy["Forehand Volley"][3] + tempy["Forehand Volley"][0];
                                pidDataType4["forehandVolley"]["shank"] = tempy["Forehand Volley"][6];

                                pidDataType4["smash"]["cross"] = pidDataType4["smash"]["cross"] + tempy["Smash"][3] + tempy["Smash"][0];
                                // pidDataType4["smash"]["insideIn"] = pidDataType4["smash"]["insideIn"] + tempy["Smash"][3] + tempy["Smash"][0];
                                pidDataType4["smash"]["middle"] = pidDataType4["smash"]["middle"] + tempy["Smash"][4] + tempy["Smash"][1];
                                // pidDataType4["smash"]["dtl"] = pidDataType4["smash"]["dtl"] + tempy["Smash"][5] + tempy["Smash"][2];
                                pidDataType4["smash"]["insideOut"] = pidDataType4["smash"]["insideOut"] + tempy["Smash"][3] + tempy["Smash"][0];
                                pidDataType4["smash"]["shank"] = tempy["Smash"][6];

                                pidDataType4["trick"]["in"] = pidDataType4["trick"]["in"] + tempy["Trick Shot"][5] + tempy["Trick Shot"][4] + tempy["Trick Shot"][3] + tempy["Trick Shot"][2] + tempy["Trick Shot"][1] + tempy["Trick Shot"][0];
                                pidDataType4["trick"]["shank"] = tempy["Trick Shot"][6];
                            }
                            if (key == "zone5") {
                                // pidDataType5["forehand"]["cross"] = pidDataType5["forehand"]["cross"] + tempy["Forehand"][3] + tempy["Forehand"][0];
                                pidDataType5["backhand"]["insideIn"] = pidDataType5["backhand"]["insideIn"] + tempy["Backhand"][3] + tempy["Backhand"][0];
                                pidDataType5["backhand"]["middle"] = pidDataType5["backhand"]["middle"] + tempy["Backhand"][4] + tempy["Backhand"][1];
                                // pidDataType5["forehand"]["dtl"] = pidDataType5["forehand"]["dtl"] + tempy["Forehand"][5] + tempy["Forehand"][2];
                                pidDataType5["backhand"]["insideOut"] = pidDataType5["backhand"]["insideOut"] + tempy["Backhand"][3] + tempy["Backhand"][0];
                                pidDataType5["backhand"]["shank"] = tempy["Backhand"][6];

                                pidDataType5["forehand"]["cross"] = pidDataType5["forehand"]["cross"] + tempy["Forehand"][3] + tempy["Forehand"][0];
                                // pidDataType5["backhand"]["insideIn"] = pidDataType5["backhand"]["insideIn"] + tempy["Backhand"][5] + tempy["Backhand"][2];
                                pidDataType5["forehand"]["middle"] = pidDataType5["forehand"]["middle"] + tempy["Forehand"][4] + tempy["Forehand"][1];
                                pidDataType5["forehand"]["dtl"] = pidDataType5["forehand"]["dtl"] + tempy["Forehand"][5] + tempy["Forehand"][2];
                                // pidDataType5["backhand"]["insideOut"] = pidDataType5["backhand"]["insideOut"] + tempy["Backhand"][3] + tempy["Backhand"][0];
                                pidDataType5["forehand"]["shank"] = tempy["Forehand"][6];
                                
                                // pidDataType5["forehandSlice"]["cross"] = pidDataType5["forehandSlice"]["cross"] + tempy["Forehand Slice"][3] + tempy["Forehand Slice"][0];
                                pidDataType5["backhandSlice"]["insideIn"] = pidDataType5["backhandSlice"]["insideIn"] + tempy["Backhand Slice"][3] + tempy["Backhand Slice"][0];
                                pidDataType5["backhandSlice"]["middle"] = pidDataType5["backhandSlice"]["middle"] + tempy["Backhand Slice"][4] + tempy["Backhand Slice"][1];
                                // pidDataType5["forehandSlice"]["dtl"] = pidDataType5["forehandSlice"]["dtl"] + tempy["Forehand Slice"][5] + tempy["Forehand Slice"][2];
                                pidDataType5["backhandSlice"]["insideOut"] = pidDataType5["backhandSlice"]["insideOut"] + tempy["Backhand Slice"][3] + tempy["Backhand Slice"][0];
                                pidDataType5["backhandSlice"]["shank"] = tempy["Backhand Slice"][6];

                                pidDataType5["forehandSlice"]["cross"] = pidDataType5["forehandSlice"]["cross"] + tempy["Forehand Slice"][3] + tempy["Forehand Slice"][0];
                                // pidDataType5["backhandSlice"]["insideIn"] = pidDataType5["backhandSlice"]["insideIn"] + tempy["Backhand Slice"][5] + tempy["Backhand Slice"][2];
                                pidDataType5["forehandSlice"]["middle"] = pidDataType5["forehandSlice"]["middle"] + tempy["Forehand Slice"][4] + tempy["Forehand Slice"][1];
                                pidDataType5["forehandSlice"]["dtl"] = pidDataType5["forehandSlice"]["dtl"] + tempy["Forehand Slice"][5] + tempy["Forehand Slice"][2];
                                // pidDataType5["backhandSlice"]["insideOut"] = pidDataType5["backhandSlice"]["insideOut"] + tempy["Backhand Slice"][3] + tempy["Backhand Slice"][0];
                                pidDataType5["forehandSlice"]["shank"] = tempy["Forehand Slice"][6];
                                
                                // pidDataType5["forehandDrop"]["cross"] = pidDataType5["forehandDrop"]["cross"] + tempy["Forehand Drop"][3] + tempy["Forehand Drop"][0];
                                pidDataType5["backhandDrop"]["insideIn"] = pidDataType5["backhandDrop"]["insideIn"] + tempy["Backhand Drop"][3] + tempy["Backhand Drop"][0];
                                pidDataType5["backhandDrop"]["middle"] = pidDataType5["backhandDrop"]["middle"] + tempy["Backhand Drop"][4] + tempy["Backhand Drop"][1];
                                // pidDataType5["forehandDrop"]["dtl"] = pidDataType5["forehandDrop"]["dtl"] + tempy["Forehand Drop"][5] + tempy["Forehand Drop"][2];
                                pidDataType5["backhandDrop"]["insideOut"] = pidDataType5["backhandDrop"]["insideOut"] + tempy["Backhand Drop"][3] + tempy["Backhand Drop"][0];
                                pidDataType5["backhandDrop"]["shank"] = tempy["Backhand Drop"][6];

                                pidDataType5["forehandDrop"]["cross"] = pidDataType5["forehandDrop"]["cross"] + tempy["Forehand Drop"][3] + tempy["Forehand Drop"][0];
                                // pidDataType5["backhandDrop"]["insideIn"] = pidDataType5["backhandDrop"]["insideIn"] + tempy["Backhand Drop"][5] + tempy["Backhand Drop"][2];
                                pidDataType5["forehandDrop"]["middle"] = pidDataType5["forehandDrop"]["middle"] + tempy["Forehand Drop"][4] + tempy["Forehand Drop"][1];
                                pidDataType5["forehandDrop"]["dtl"] = pidDataType5["forehandDrop"]["dtl"] + tempy["Forehand Drop"][5] + tempy["Forehand Drop"][2];
                                // pidDataType5["backhandDrop"]["insideOut"] = pidDataType5["backhandDrop"]["insideOut"] + tempy["Backhand Drop"][3] + tempy["Backhand Drop"][0];
                                pidDataType5["forehandDrop"]["shank"] = tempy["Forehand Drop"][6];
                                
                                // pidDataType5["forehandVolley"]["cross"] = pidDataType5["forehandVolley"]["cross"] + tempy["Forehand Volley"][3] + tempy["Forehand Volley"][0];
                                pidDataType5["backhandVolley"]["insideIn"] = pidDataType5["backhandVolley"]["insideIn"] + tempy["Backhand Volley"][3] + tempy["Backhand Volley"][0];
                                pidDataType5["backhandVolley"]["middle"] = pidDataType5["backhandVolley"]["middle"] + tempy["Backhand Volley"][4] + tempy["Backhand Volley"][1];
                                // pidDataType5["forehandVolley"]["dtl"] = pidDataType5["forehandVolley"]["dtl"] + tempy["Forehand Volley"][5] + tempy["Forehand Volley"][2];
                                pidDataType5["backhandVolley"]["insideOut"] = pidDataType5["backhandVolley"]["insideOut"] + tempy["Backhand Volley"][3] + tempy["Backhand Volley"][0];
                                pidDataType5["backhandVolley"]["shank"] = tempy["Backhand Volley"][6];

                                pidDataType5["forehandVolley"]["cross"] = pidDataType5["forehandVolley"]["cross"] + tempy["Forehand Volley"][3] + tempy["Forehand Volley"][0];
                                // pidDataType5["backhandVolley"]["insideIn"] = pidDataType5["backhandVolley"]["insideIn"] + tempy["Backhand Volley"][5] + tempy["Backhand Volley"][2];
                                pidDataType5["forehandVolley"]["middle"] = pidDataType5["forehandVolley"]["middle"] + tempy["Forehand Volley"][4] + tempy["Forehand Volley"][1];
                                pidDataType5["forehandVolley"]["dtl"] = pidDataType5["forehandVolley"]["dtl"] + tempy["Forehand Volley"][5] + tempy["Forehand Volley"][2];
                                // pidDataType5["backhandVolley"]["insideOut"] = pidDataType5["backhandVolley"]["insideOut"] + tempy["Backhand Volley"][3] + tempy["Backhand Volley"][0];
                                pidDataType5["forehandVolley"]["shank"] = tempy["Forehand Volley"][6];

                                pidDataType5["smash"]["cross"] = pidDataType5["smash"]["cross"] + tempy["Smash"][3] + tempy["Smash"][0];
                                // pidDataType5["smash"]["insideIn"] = pidDataType5["smash"]["insideIn"] + tempy["Smash"][3] + tempy["Smash"][0];
                                pidDataType5["smash"]["middle"] = pidDataType5["smash"]["middle"] + tempy["Smash"][4] + tempy["Smash"][1];
                                pidDataType5["smash"]["dtl"] = pidDataType5["smash"]["dtl"] + tempy["Smash"][5] + tempy["Smash"][2];
                                // pidDataType5["smash"]["insideOut"] = pidDataType5["smash"]["insideOut"] + tempy["Smash"][3] + tempy["Smash"][0];
                                pidDataType5["smash"]["shank"] = tempy["Smash"][6];

                                pidDataType5["trick"]["in"] = pidDataType5["trick"]["in"] + tempy["Trick Shot"][5] + tempy["Trick Shot"][4] + tempy["Trick Shot"][3] + tempy["Trick Shot"][2] + tempy["Trick Shot"][1] + tempy["Trick Shot"][0];
                                pidDataType5["trick"]["shank"] = tempy["Trick Shot"][6];
                            }
                        }
                    }

                    newData = calcStat(zones);
                    updateTable(newData);
                    console.log(newData);
                }
            });

        const minVal = Math.min(...weightList);
        const maxVal = Math.max(...weightList);

        const normalized2 = weightList.map(val => {
            // Normalize to 0–1
            const scaled = (val - minVal) / (maxVal - minVal);

            // Round to nearest 0.01
            return Math.round(scaled * 100) / 100;
        });
        
        const court = document.getElementById('court');
        const rows = court.querySelectorAll('tr');

        // Zone mappings for layout (top to bottom)
        const topZones = [
            [15, 14, 13],
            [12, 11, 10]
        ];

        const bottomZones = [
            [0, 1, 2],
            [3, 4, 5]
        ];

        // Helper: sum array slice
        function sumRange(arr, start, end) {
            return arr.slice(start, end + 1).reduce((a, b) => a + b, 0);
        }

        // Compute zone heat
        function getZoneValue(zone) {
            if (zone <= 5) {
                // bottom zone rule
                const start = 6 * zone;
                const end = start + 5;
                return sumRange(normalized2, start, end);
            } else if (zone >= 10 && zone <= 15) {
                // top zone rule
                let sum = 0;
                for (let i = 0; i < normalized2.length; i++) {
                    if ((i - (zone - 10)) % 6 === 0) {
                        sum += normalized2[i];
                    }
                }
                return sum;
            }
            return 0;
        }

        // Normalize color intensity
        function heatColor(value, maxValue) {
            const ratio = value / maxValue;
            const g = Math.round(155 + 100 * ratio);
            return `rgb(27, ${g}, 130)`; // red→green scale
        }

        // Fill top zones
        topZones.forEach((rowZones, r) => {
            const cells = rows[r].querySelectorAll('td');
            rowZones.forEach((zone, c) => {
                const val = getZoneValue(zone);
                cells[c].dataset.zone = zone;
                cells[c].dataset.value = val;
            });
        });

        // Fill bottom zones
        bottomZones.forEach((rowZones, r) => {
            const cells = rows[r + 2].querySelectorAll('td');
            rowZones.forEach((zone, c) => {
                const val = getZoneValue(zone);
                cells[c].dataset.zone = zone;
                cells[c].dataset.value = val;
            });
        });

            // Find max value for scaling
        const allValues = Array.from(court.querySelectorAll('td')).map(td => parseFloat(td.dataset.value));
        const maxVal1 = Math.max(...allValues);

            // Apply colors
        court.querySelectorAll('td').forEach(td => {
            const val = parseFloat(td.dataset.value);
            td.style.backgroundColor = heatColor(val, maxVal1);
            td.title = `Zone ${td.dataset.zone}: ${val.toFixed(2)}`;
        });


        const observer = new ResizeObserver(entries => {
            for (const entry of entries) {
                const width = entry.contentRect.width;
                const height = entry.contentRect.height;

                if (width > 0 && height > 0 && !sceneInitialized) {
                    sceneInitialized = true;
                    observer.disconnect(); // No longer need to observe
                    initScene(width, height, weightList, weightList2); // pass sizes
                }
            }
        });

        observer.observe(contDiv);

    } catch (err) {
        console.error("Error loading JSON:", err);
    }
});


// 5 4 3 
// 2 1 0
// 0 1 2
// 3 4 5

// 3-3, 3-4, 3-5, 4-3, 4-4, 4-5, 5-3, 5-4, 5-5 

// RIGHT: fh - inside-out (3/4 to 3), inside-in (3 to 5), middle (3/4/5 to 4), cross (4/5 to 5), down the line (5 to 3)
// LEFT:  fh - inside-out (4/5 to 5), inside-in (5 to 3), middle (3/4/5 to 4), cross (3/4 to 3), down the line (3 to 5)

// window.addEventListener('resize', () => {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// });



















































// import * as THREE from 'https://esm.sh/three@0.153.0';
// import { OrbitControls } from 'https://esm.sh/three@0.153.0/examples/jsm/controls/OrbitControls.js';



// // ✅ Scene setup
// const scene = new THREE.Scene();
// scene.background = new THREE.Color(0x181818); // black background

// // const cameraHeight = 10; // height above court
// const orbitRadius = 20;  // distance from court center (behind baseline)
// const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
// camera.up.set(0, 1, 0); 
// // camera.position.set(-orbitRadius, -orbitRadius, cameraHeight); // top-down
// // camera.position.set(0, -orbitRadius, cameraHeight);
// // camera.lookAt(0, 0, 0);

// // ✅ Renderer
// const renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // ✅ Controls
// // const controls = new OrbitControls(camera, renderer.domElement);
// // controls.enablePan = false;
// // controls.enableZoom = false;
// // controls.maxAzimuthAngle = Math.PI / 2;
// // controls.minAzimuthAngle = Math.PI / 2;

// // Constants (all in meters)
// const courtLength = 23.77;
// const doublesWidth = 10.97;
// const singlesWidth = 8.23;
// const serviceBoxDepth = 6.4;
// const lineThickness = 0.05;
// const courtColor = 0x333333;
// const lineColor = 0xffffff;
// const lineZ = 0.001;  // Slight offset to avoid z-fighting

// // 1. 🎾 Court surface (XY plane, Z-up)
// const courtGeometry = new THREE.PlaneGeometry(doublesWidth, courtLength);
// const courtMaterial = new THREE.MeshBasicMaterial({ color: courtColor });
// const court = new THREE.Mesh(courtGeometry, courtMaterial);
// scene.add(court);
// // No rotation needed: lies on XY plane by default

// // 2. ➕ Function to add lines on court (as thin white rectangles)
// function addCourtLine(x, y, width, height) {
//     const geometry = new THREE.PlaneGeometry(width, height);
//     const material = new THREE.MeshBasicMaterial({ color: lineColor, side: THREE.DoubleSide });
//     const line = new THREE.Mesh(geometry, material);
//     line.position.set(x, y, lineZ);
//     scene.add(line);
// }

// // 3. ➕ Add court lines (relative to court center at (0,0))
// const halfCourt = courtLength / 2;
// const halfWidth = doublesWidth / 2;
// const singlesHalfWidth = singlesWidth / 2;

// // Baselines (top & bottom)
// addCourtLine(0, halfCourt, doublesWidth, lineThickness);
// addCourtLine(0, -halfCourt, doublesWidth, lineThickness);

// // Sidelines (doubles)
// addCourtLine(halfWidth, 0, lineThickness, courtLength);
// addCourtLine(-halfWidth, 0, lineThickness, courtLength);

// // Singles Sidelines
// addCourtLine(singlesHalfWidth, 0, lineThickness, courtLength);
// addCourtLine(-singlesHalfWidth, 0, lineThickness, courtLength);

// // Center service line (parallel to width)
// addCourtLine(0, 0, doublesWidth, lineThickness);

// // Service boxes (horizontal lines)
// addCourtLine(0, serviceBoxDepth, singlesWidth, lineThickness);   // Near service line
// addCourtLine(0, -serviceBoxDepth, singlesWidth, lineThickness);  // Far service line

// // Center line (vertical line down center between service boxes)
// addCourtLine(0, 0, lineThickness, serviceBoxDepth * 2);

// // Net line (optional visual)
// // addCourtLine(0, 0, doublesWidth, lineThickness);  // Net overlaps center, same as center service

// const axesHelper = new THREE.AxesHelper(5); // size 5 units
// scene.add(axesHelper);

// let angle = 0;

// function animate() {
//     requestAnimationFrame(animate);

//     // angle += 0.01;
//     angle = 0;

//     const y = Math.cos(angle) * -orbitRadius;
//     const x = Math.sin(angle) * -orbitRadius;

//     // Update camera position
//     // camera.position.set(x, -orbitRadius + y, 20);
//     camera.position.set(x, y, 15);

//     camera.up.set(0, 1, 0);

//     // Look at origin
//     camera.lookAt(0, 0, 0);

//     renderer.render(scene, camera);
// }

// animate();


// // ✅ Render loop
// // function animate() {
// //     requestAnimationFrame(animate);
// //     controls.update();

// //     camera.lookAt(0, 0, 0);
// //     renderer.render(scene, camera);
// //     // console.log(camera.position.x, camera.position.y, camera.position.z);
// // }
// // animate();

// // ✅ Resize handling
// window.addEventListener('resize', () => {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// });









// 

