const canvas = document.getElementById("tennisCourt");
const ctx = canvas.getContext("2d");

const courtWidth = canvas.width * 0.4;
const courtHeight = canvas.height;
const cnvMargin = 10;
// 600px by 600px

function drawLine(x1, y1, x2, y2, width, color) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.stroke();
}

function drawCourt() {
    let acrossL = (canvas.width - courtWidth) / 2 - cnvMargin
    let acrossR = (canvas.width + courtWidth) / 2 + cnvMargin

    // Draw the outer boundary
    drawLine(acrossL, cnvMargin, acrossR, cnvMargin, 2, "white");  // Top
    drawLine(acrossL, courtHeight - cnvMargin, acrossR, courtHeight - cnvMargin, 2, "white"); // Bottom
    drawLine(acrossL, cnvMargin, acrossL, courtHeight - cnvMargin, 2, "white"); // Left
    drawLine(acrossR, cnvMargin, acrossR, courtHeight - cnvMargin, 2, "white"); // Right

    // Draw the service lines
    drawLine(acrossL, courtHeight / 4, acrossR, courtHeight / 4, 2, "white");
    drawLine(acrossL, (courtHeight / 4) * 3, acrossR, (courtHeight / 4) * 3, 2);

    // Draw the center service line
    drawLine(canvas.width / 2, courtHeight / 4, canvas.width / 2, (courtHeight / 4) * 3, 2);

    // Draw the net
    drawLine(acrossL, courtHeight / 2, acrossR, courtHeight / 2, 2);
    // drawLine(0, courtHeight / 2, canvas.width, courtHeight / 2, 3);
}

drawCourt();

const canvas2 = document.getElementById("courtBack");
const ctx2 = canvas2.getContext("2d");


function drawLine2(x1, y1, x2, y2, width, color) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.stroke();
}

function drawCourt2() {
    let acrossL = (canvas.width - courtWidth) / 2 - (2 * cnvMargin)
    let acrossR = (canvas.width + courtWidth) / 2 + (2 * cnvMargin)

    ctx2.fillStyle = "black"; // Change this to any color
    ctx2.fillRect(acrossL, 0, acrossR - acrossL, courtHeight);

    drawLine2(acrossL, 0, acrossR, 0, 2, "black");  // Top
    drawLine2(acrossL, courtHeight, acrossR, courtHeight, 2, "black"); // Bottom
    drawLine2(acrossL, 0, acrossL, courtHeight, 2, "black"); // Left
    drawLine2(acrossR, 0, acrossR, courtHeight, 2, "black"); // Right
}

drawCourt2();




























// const theta = 45.00; // degrees
// const d = 100.00; // decimeters (dm)
// const h = 50.00; // dm

// const yBottom = 0.00; // dm
// const L = 237.60; // dm
// const W = 82.30; //dm

// function calcY(yBottom, theta, d, x, h, yTop) {
//     let thetaRad = theta * (Math.PI / 180);
//     let z = d - x

//     let y = yBottom - ((Math.tan(thetaRad)*z)/(h+z*Math.tan(thetaRad))) * (yBottom - yTop); 
//     return y;
// }

// const yTopR = calcY(yBottom, theta, d, L, h, -1);

// const yS = calcY(yBottom, theta, d, (5.48*L/23.76), h, yTopR);
// const yN = calcY(yBottom, theta, d, (L/2), h, yTopR);
// const yF = calcY(yBottom, theta, d, (18.28*L/23.76), h, yTopR);


// function drawCourt() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
    
//     // Define court perspective points (600 x 600 canvas)
//     const courtWidth = Math.round(W);
//         // const topWidth = canvas.width * 0.5;
//     const centerY = canvas.height / 2;
//     const centerX = canvas.width / 2;
//         // const bottomY = canvas.height - 150;
//         // const topY = bottomY - height;   

//     // Court Outline
//     drawLine(centerX - bottomWidth / 2, centerY, centerX + bottomWidth / 2, bottomY); 
//         // Bottom line
//     drawLine(centerX - topWidth / 2, topY, centerX + topWidth / 2, topY); 
//         // Top line
//     drawLine(centerX - bottomWidth / 2, bottomY, centerX - topWidth / 2, topY); 
//         // Left side
//     drawLine(centerX + bottomWidth / 2, bottomY, centerX + topWidth / 2, topY); 
//         // Right side

//     // Net
//     // drawLine(centerX - (bottomWidth * 0.4), (topY + bottomY) / 2, centerX + (bottomWidth * 0.4), (topY + bottomY) / 2, 3);
// }




// function drawCourt() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
    
//     // Define court perspective points
//     const bottomWidth = canvas.width * 0.9;
//     const topWidth = canvas.width * 0.5;
//     const height = canvas.height * 0.5;
//         // 300 height
//         // starts at 450 ends at 150
//     const centerX = canvas.width / 2;
//     const bottomY = canvas.height - 150;
//     const topY = bottomY - height;

//     // Court Outline
//     drawLine(centerX - bottomWidth / 2, bottomY, centerX + bottomWidth / 2, bottomY); 
//         // Bottom line
//     drawLine(centerX - topWidth / 2, topY, centerX + topWidth / 2, topY); 
//         // Top line
//     drawLine(centerX - bottomWidth / 2, bottomY, centerX - topWidth / 2, topY); 
//         // Left side
//     drawLine(centerX + bottomWidth / 2, bottomY, centerX + topWidth / 2, topY); 
//         // Right side

//     // Net
//     // drawLine(centerX - (bottomWidth * 0.4), (topY + bottomY) / 2, centerX + (bottomWidth * 0.4), (topY + bottomY) / 2, 3);

//     // Service boxes
//     // drawLine(centerX - (bottomWidth * 0.25), bottomY, centerX - (topWidth * 0.25), topY);
//         // Opp service line
//     // drawLine(centerX + (bottomWidth * 0.25), bottomY, centerX + (topWidth * 0.25), topY);
//         // Player service line
//     drawLine(centerX, bottomY, centerX, topY); 
//         // Center line
//     // drawLine(centerX - (bottomWidth * 0.25), (topY + bottomY) / 2, centerX + (bottomWidth * 0.25), (topY + bottomY) / 2); 
//         // Middle service box line
//     // drawLine(centerX - (bottomWidth * 0.25), (topY + bottomY) / 2, centerX + (bottomWidth * 0.25), (topY + bottomY) / 2); 
// }


// document.querySelector('.search-container input').addEventListener('blur', function () {
//     const navLinks = document.querySelectorAll('.nav-link');
//     const searchContainer = document.querySelector('.search-container');
//     const pops = document.querySelectorAll('.pop');

//     searchContainer.style.display = 'none'; // Hide search container
//     pops.forEach(popper => {
//         popper.style.display = 'none';
//     });

//     navLinks.forEach(link => {
//         link.classList.remove('hidden'); // Show nav links again
//     });
// });



// function getInvertedColor(x, y) {
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');
//     const background = new Image();
//     background.src = './assets/clay-court.avif';

//     background.onload = () => {
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;
//         ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

//         const pixel = ctx.getImageData(x, y, 1, 1).data;
//         const invertedColor = `rgb(${255 - pixel[0]}, ${255 - pixel[1]}, ${255 - pixel[2]})`;

//         document.querySelector('.circle').style.backgroundColor = invertedColor;
//     };
// }

// function updateCircleColor() {
//     const circle = document.querySelector('.circle');
//     const rect = circle.getBoundingClientRect();
//     const centerX = rect.left + rect.width / 2;
//     const centerY = rect.top + rect.height / 2;

//     getInvertedColor(centerX, centerY);
// }

// window.addEventListener('resize', updateCircleColor);
// window.addEventListener('load', updateCircleColor);