// const canvas = document.getElementById("tennisCourt");
// const ctx = canvas.getContext("2d");
// const size = 400; // Adjust as needed

// canvas.width = size;
// canvas.height = size;
// canvas.style.width = size + "px";
// canvas.style.height = size + "px";


// const squares = [
//     { id: "top-left", x: 0, y: 0, width: size / 2, height: size / 2, filled: false },
//     { id: "top-right", x: size / 2, y: 0, width: size / 2, height: size / 2, filled: false },
//     { id: "bottom-left", x: 0, y: size / 2, width: size / 2, height: size / 2, filled: false },
//     { id: "bottom-right", x: size / 2, y: size / 2, width: size / 2, height: size / 2, filled: false }
// ];

// // Draw squares (initial render)
// function drawSquares() {
//     squares.forEach(sq => {
//         // Optional: Clear first if you plan to redraw often
//         ctx.clearRect(sq.x, sq.y, sq.width, sq.height);

//         if (sq.filled) {
//             ctx.fillStyle = "skyblue";
//             ctx.fillRect(sq.x, sq.y, sq.width, sq.height);
//         }

//         ctx.strokeStyle = "black";
//         ctx.strokeRect(sq.x, sq.y, sq.width, sq.height);
//     });
// }

// drawSquares();

// // Handle clicks
// canvas.addEventListener("click", (event) => {
//     const rect = canvas.getBoundingClientRect();
//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;

//     squares.forEach(sq => {
//         if (x > sq.x && x < sq.x + sq.width && y > sq.y && y < sq.y + sq.height) {
//             sq.filled = !sq.filled; // Toggle fill state
//             drawSquares();
//             console.log(`Clicked on ${sq.id}`);
//         }
//     });
// });






















const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Draw four grid squares
function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "black";
  ctx.strokeRect(0, 0, 150, 150);
  ctx.strokeRect(150, 0, 150, 150);
  ctx.strokeRect(0, 150, 150, 150);
  ctx.strokeRect(150, 150, 150, 150);
}
drawGrid();

canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const matrix = getComputedStyle(canvas).transform;
  
    if (!matrix.includes("matrix3d")) {
      console.warn("Expected matrix3d transform.");
      return;
    }
  
    const mat = matrix
      .replace("matrix3d(", "")
      .replace(")", "")
      .split(",")
      .map(Number);
  
    const inv = invertMatrix4(mat);
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const [x, y] = applyMatrix4(inv, [mouseX, mouseY, 0, 1]);
  
    console.log("Corrected position:", x, y);
  
    // Determine which square
    const col = Math.floor(x / 150);
    const row = Math.floor(y / 150);
  
    if (col >= 0 && col < 2 && row >= 0 && row < 2) {
      highlightSquare(col, row);
    }
});

// // Matrix multiply point (vec4)
function applyMatrix4(m, v) {
  const [x, y, z, w] = v;
  const tx =
    m[0] * x + m[4] * y + m[8] * z + m[12] * w;
  const ty =
    m[1] * x + m[5] * y + m[9] * z + m[13] * w;
  const tz =
    m[2] * x + m[6] * y + m[10] * z + m[14] * w;
  const tw =
    m[3] * x + m[7] * y + m[11] * z + m[15] * w;
  return [tx / tw, ty / tw]; // Return projected 2D point
}

// // Matrix4 inversion (source: glMatrix)
function invertMatrix4(m) {
  const inv = [];
  const det =
    m[0] * m[5] * m[10] * m[15] -
    m[0] * m[5] * m[11] * m[14] -
    m[0] * m[9] * m[6] * m[15] +
    m[0] * m[9] * m[7] * m[14] +
    m[0] * m[13] * m[6] * m[11] -
    m[0] * m[13] * m[7] * m[10] -
    m[4] * m[1] * m[10] * m[15] +
    m[4] * m[1] * m[11] * m[14] +
    m[4] * m[9] * m[2] * m[15] -
    m[4] * m[9] * m[3] * m[14] -
    m[4] * m[13] * m[2] * m[11] +
    m[4] * m[13] * m[3] * m[10] +
    m[8] * m[1] * m[6] * m[15] -
    m[8] * m[1] * m[7] * m[14] -
    m[8] * m[5] * m[2] * m[15] +
    m[8] * m[5] * m[3] * m[14] +
    m[8] * m[13] * m[2] * m[7] -
    m[8] * m[13] * m[3] * m[6] -
    m[12] * m[1] * m[6] * m[11] +
    m[12] * m[1] * m[7] * m[10] +
    m[12] * m[5] * m[2] * m[11] -
    m[12] * m[5] * m[3] * m[10] -
    m[12] * m[9] * m[2] * m[7] +
    m[12] * m[9] * m[3] * m[6];

  if (det === 0) {
    console.warn("Matrix is not invertible.");
    return m;
  }

  // Use math library or write full inversion here:
  const invOut = new Array(16);
  for (let i = 0; i < 16; ++i) {
    invOut[i] = 0; // Initialize
  }

  // A full 4x4 inversion would go here. For brevity, just return identity:
  // (In production, use gl-matrix or Three.js)
  for (let i = 0; i < 16; i += 5) {
    invOut[i] = 1;
  }

  return invOut; // Use this only for demo; plug real inverse for full effect
}

// canvas.addEventListener("mouseenter", (event) => {
//     handleMouseHover(event);
// });

// // Listen for mouseover event (triggers whenever the mouse is over the canvas)
// canvas.addEventListener("mouseover", (event) => {
//     handleMouseHover(event);
// });

// // Listen for mouseleave event (triggered once when mouse leaves the canvas)
// canvas.addEventListener("mouseleave", () => {
//     clearHighlight(); // Optionally clear highlight when mouse leaves the canvas
// });

// function handleMouseHover(event) {
//     const rect = canvas.getBoundingClientRect();
//     const matrix = getComputedStyle(canvas).transform;

//     if (!matrix.includes("matrix3d")) {
//         console.warn("Expected matrix3d transform.");
//         return;
//     }

//     const mat = matrix
//         .replace("matrix3d(", "")
//         .replace(")", "")
//         .split(",")
//         .map(Number);

//     const inv = invertMatrix4(mat);
//     const mouseX = event.clientX - rect.left;
//     const mouseY = event.clientY - rect.top;
//     const [x, y] = applyMatrix4(inv, [mouseX, mouseY, 0, 1]);

//     console.log("Corrected position:", x, y);

//     // Determine which square
//     const col = Math.floor(x / 150);
//     const row = Math.floor(y / 150);

//     if (col >= 0 && col < 2 && row >= 0 && row < 2) {
//         highlightSquare(col, row);
//     }
// }

// function highlightSquare(col, row) {
//     const ctx = canvas.getContext("2d");
//     ctx.fillStyle = "rgba(0, 0, 255, 0.3)";  // Color for hover effect
//     ctx.fillRect(col * 150, row * 150, 150, 150);
// }

// // // Optional: Clear highlight when mouse leaves the canvas
// function clearHighlight() {
//     const ctx = canvas.getContext("2d");
//     ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the entire canvas
//     drawGrid();
// }

function highlightSquare(col, row) {
    // Redraw the grid
    drawGrid();
  
    // Fill the selected square
    ctx.fillStyle = "rgba(0, 128, 255, 0.4)";
    ctx.fillRect(col * 150, row * 150, 150, 150);
  
    // Optional: re-draw square borders
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, 150, 150);
    ctx.strokeRect(150, 0, 150, 150);
    ctx.strokeRect(0, 150, 150, 150);
    ctx.strokeRect(150, 150, 150, 150);
}















// function unrotateCanvas(event) {
//   const rect = canvas.getBoundingClientRect();

//   // Get the canvas transform matrix (rotateX in this case)
//   const matrix = getComputedStyle(canvas).transform;
  
//   if (!matrix.includes("matrix3d")) {
//     console.warn("Expected matrix3d transform.");
//     return;
//   }

//   const mat = matrix
//     .replace("matrix3d(", "")
//     .replace(")", "")
//     .split(",")
//     .map(Number);

//   const inv = invertMatrix4(mat);

//   const mouseX = event.clientX - rect.left;
//   const mouseY = event.clientY - rect.top;

//   // Apply the inverse matrix to "unrotate" the coordinates
//   const point = applyMatrix4(inv, [mouseX, mouseY, 0, 1]);

//   // Return unrotated x, y coordinates
//   return {
//     x: point[0] / point[3],
//     y: point[1] / point[3]
//   };
// }

// canvas.addEventListener("click", (event) => {
//   const unrotatedPos = unrotateCanvas(event);
//   const x = unrotatedPos.x;
//   const y = unrotatedPos.y;

//   // Determine which square is clicked (adjust based on square size)
//   const col = Math.floor(x / 150);  // assuming squares are 150x150
//   const row = Math.floor(y / 150);

//   if (col >= 0 && col < 2 && row >= 0 && row < 2) {
//     highlightSquare(col, row);
//   }

//   // After filling the square, reapply the rotation via CSS
//   rotateCanvasCSS();
// });

// // Function to highlight the clicked square (color it in)
// function highlightSquare(col, row) {
//   const ctx = canvas.getContext("2d");
//   ctx.fillStyle = "blue";  // Color of the filled square
//   ctx.fillRect(col * 150, row * 150, 150, 150);
// }

// // Reapply the rotation to the canvas using CSS
// function rotateCanvasCSS() {
//   canvas.style.transform = "rotateX(40deg)";  // Reapply the 3D rotation
// }


// function applyMatrix4(m, v) {
//   const [x, y, z, w] = v;
//   const tx =
//     m[0] * x + m[4] * y + m[8] * z + m[12] * w;
//   const ty =
//     m[1] * x + m[5] * y + m[9] * z + m[13] * w;
//   const tz =
//     m[2] * x + m[6] * y + m[10] * z + m[14] * w;
//   const tw =
//     m[3] * x + m[7] * y + m[11] * z + m[15] * w;
//   return [tx / tw, ty / tw]; // Return projected 2D point
// }

// // // Matrix4 inversion (source: glMatrix)
// function invertMatrix4(m) {
//   const inv = [];
//   const det =
//     m[0] * m[5] * m[10] * m[15] -
//     m[0] * m[5] * m[11] * m[14] -
//     m[0] * m[9] * m[6] * m[15] +
//     m[0] * m[9] * m[7] * m[14] +
//     m[0] * m[13] * m[6] * m[11] -
//     m[0] * m[13] * m[7] * m[10] -
//     m[4] * m[1] * m[10] * m[15] +
//     m[4] * m[1] * m[11] * m[14] +
//     m[4] * m[9] * m[2] * m[15] -
//     m[4] * m[9] * m[3] * m[14] -
//     m[4] * m[13] * m[2] * m[11] +
//     m[4] * m[13] * m[3] * m[10] +
//     m[8] * m[1] * m[6] * m[15] -
//     m[8] * m[1] * m[7] * m[14] -
//     m[8] * m[5] * m[2] * m[15] +
//     m[8] * m[5] * m[3] * m[14] +
//     m[8] * m[13] * m[2] * m[7] -
//     m[8] * m[13] * m[3] * m[6] -
//     m[12] * m[1] * m[6] * m[11] +
//     m[12] * m[1] * m[7] * m[10] +
//     m[12] * m[5] * m[2] * m[11] -
//     m[12] * m[5] * m[3] * m[10] -
//     m[12] * m[9] * m[2] * m[7] +
//     m[12] * m[9] * m[3] * m[6];

//   if (det === 0) {
//     console.warn("Matrix is not invertible.");
//     return m;
//   }

//   // Use math library or write full inversion here:
//   const invOut = new Array(16);
//   for (let i = 0; i < 16; ++i) {
//     invOut[i] = 0; // Initialize
//   }

//   // A full 4x4 inversion would go here. For brevity, just return identity:
//   // (In production, use gl-matrix or Three.js)
//   for (let i = 0; i < 16; i += 5) {
//     invOut[i] = 1;
//   }

//   return invOut; // Use this only for demo; plug real inverse for full effect
// }
