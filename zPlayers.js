
function getMonthNameFromDate(dateString) {
    // "30 December, 2024 - 5 January, 2025"
    const startDatePart = dateString.split(" - ")[1]; // "5 January, 2025"
    const month = startDatePart.split(",")[0].trim().split(" ")[1]; // "5 January" -> "January"
    return month.toLowerCase(); // "january"
}

async function loadMain() {
    document.addEventListener("DOMContentLoaded", () => {
        fetch('data/top150StatFinalizedV2.json')
            .then(response => response.json())
            .then(playerDict => {
                // Get outer keys (e.g., player names)
                const outerKeys = Object.keys(playerDict);
                const plya2 = document.querySelector('.plya');
                
                outerKeys.forEach(playerName => {
                    const div = document.createElement('div');
                    div.className = 'plya-ent';

                    const h1 = document.createElement('h1');
                    h1.textContent = playerName;

                    div.appendChild(h1);
                    // div.style.display = 'none'; // Hide initially

                    div.addEventListener('click', function (e) {
                        window.location.href = `/playersBin.html?id=${playerName}`;
                    });

                    plya2.appendChild(div); // Append to the main container
                });
            }); 
        });
}

async function loadStat() {
    document.addEventListener("DOMContentLoaded", () => {
        // fetch('data/edit2_draws.json')
        fetch('data/update_draws1025.json')
            .then(response2 => response2.json())
            .then(tournDict => {
                // Get outer keys (e.g., player names)
                const outerKeys = Object.keys(tournDict);
                const plya2 = document.querySelector('.ldr-tit');
                const winDict = {};
                
                outerKeys.forEach(tourName => {
                    temtem = tournDict[tourName];
                    temWin = temtem.roundW;

                    if (winDict[temWin]) {
                        winDict[temWin].push(tourName);
                    } else {
                        winDict[temWin] = [tourName];
                    }
                });

                const top5 = Object.entries(winDict) // [key, value] pairs
                    .map(([key, value]) => ({
                        name: key,
                        tournaments: value,
                        count: value.length
                    }))
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 5);

                // console.log(top5);


                for (const [index, player] of top5.entries()) {
                    const brbr = document.createElement('div');
                    brbr.classList.add('tit-inv');

                    const tournamentsHTML = player.tournaments
                        .map(tourn => `<div>${tourn}</div>`)
                        .join('');

                    brbr.innerHTML = `
                        <div class="p-pfo"></div>
                        <div class="p-dd">
                            <div class="nnmm">${player.name}</div>
                            <div class="ttll">
                                <div class="titilate">
                                    Titles: ${player.count}
                                </div>
                                <div class="tgr">
                                    ${tournamentsHTML}
                                </div>
                            </div>
                            <div class="tit-rnk">
                                <div>${index+1}</div>
                            </div>
                        </div>
                    `;

                    plya2.appendChild(brbr);

                    brbr.addEventListener('click', function (e) {
                        window.location.href = `/playersBin.html?id=${player.name}`;
                    });
                }
            }); 
        });
}

function loadTop() {
    document.addEventListener("DOMContentLoaded", () => {
        fetch('data/live92125rnk.json')
            .then(response3 => response3.json())
            .then(datag => {
                const grgr = document.querySelector('.topten');

                for (let i = 0; i < 10; i++) {
                    let pToDis = datag[i];
                    const brbr = document.createElement('div');
                    brbr.classList.add('pp-big');

                    brbr.innerHTML = `
                        <div class="pp-rnk">
                            <div>${pToDis[0]}</div>
                        </div>
                        <div class="pp-inv">
                            <div class="p-pfo"></div>
                            <div class="p-dd">
                                <div class="nnmm">${pToDis[3]}</div>
                                <div class="ttll">
                                    <div>Country: ${pToDis[5]}</div>
                                    <div>Points: ${pToDis[6]}</div>
                                    <div>Age: ${pToDis[4]}</div>
                                    <div>High: ${pToDis[1]}</div>
                                </div>
                            </div>
                        </div>
                    `;

                    grgr.appendChild(brbr);

                    let refId = normalizeToASCII(String(pToDis[3]));

                    brbr.addEventListener('click', function (e) {
                        window.location.href = `/playersBin.html?id=${refId}`;
                    });
                }
            }); 
        });
}



function normalizeToASCII(str) {
  return str
    .normalize("NFD")                   // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, "")    // Remove combining marks
    .replace(/[^a-zA-Z ]/g, "");        // Remove anything that's not a-z, A-Z, or space
}


// async function main() {
//     if (tournamentId) {
//         await fetchInOrder(tournamentId);
//         setUpDraw();
//     }
// }

async function main() {          
    await loadMain();
    await loadStat();
    loadTop();
    setUpMain();
}

main();

function setUpMain() {
    const atoz = document.querySelector('.azdic2');
    const plPic = document.querySelector('.placePic');
    const plya = document.querySelector('.plya');
    const backtoaz = document.querySelector('.bcktoaz');
    const azlet = atoz.querySelectorAll('div');

    azlet.forEach(div => {
        div.addEventListener('click', () => {
            const textlet = div.textContent.trim().toUpperCase();; // Get the text inside the div
            // console.log('Clicked text:', text);

            
            const playerDivs = plya.querySelectorAll('.plya-ent');  
            // console.log(playerDivs);
            // atoz.style.display = "none";
            plPic.style.display = "none";
            plya.style.display = "flex";
            backtoaz.style.display = "flex";

            playerDivs.forEach(playerDiv => {
                const name = playerDiv.querySelector('h1').textContent.trim().toUpperCase();
                if (name.startsWith(textlet)) {
                    playerDiv.style.display = 'flex';
                } else {
                    playerDiv.style.display = 'none';
                }
            });
        });
    });

    backtoaz.addEventListener('click', () => {
        // atoz.style.display = "grid";
        plPic.style.display = "flex";
        plya.style.display = "none";
        backtoaz.style.display = "none";
        playerDivs.forEach(playerDiv => {
            playerDiv.style.display = 'none';
        });
    });
}


// SIDE MENU FUNCTION
const track = document.querySelector('.text-track');
const buttonsT = document.querySelectorAll('.tabs-button');

buttonsT.forEach(buttonT => {
    buttonT.addEventListener('click', () => {
        const index = parseInt(buttonT.dataset.index, 10);
        const translateY = -index * 34; // each item is 100% of viewport
        track.style.transform = `translateY(${translateY}vw)`;
    });
});



// SIDE MENU EXPANSION
const expSide = document.getElementById("open-side-menu");
const sideMenu2 = document.getElementById("side-menu");
const expText = document.querySelectorAll(".label");
const exp2 = document.querySelectorAll(".tabs-button");
const fexp = document.querySelector(".for-exp");
const fwr = document.querySelector(".fin-wrapper");
// const exp3 = document.querySelector(".tabs-side");

const iconLeft = document.querySelector(".open-icon");
const iconRight = document.querySelector(".close-icon");

let isExpanded = false; // Track current state
const marg = (window.innerHeight * 0.025) - 8

expSide.addEventListener("click", () => {
    // console.log("CLICK")
    if (isExpanded) {
        sideMenu2.style.width = "2vw";   // Shrink
        iconLeft.classList.toggle("away");
        iconRight.classList.toggle("away");
        expText.forEach(te => 
            te.style.display = "none"
        );
        exp2.forEach(tex => {
            tex.style.justifyContent = "center";
            tex.style.marginLeft = 0;
        });
        fexp.style.justifyContent = "center";
        fwr.style.marginRight = 0;
        // iconRight.style.justifyContent = "left";
        // iconRight.style.marginLeft = 0;
    } else {
        sideMenu2.style.width = "10vw";  // Expand
        iconLeft.classList.toggle("away");
        iconRight.classList.toggle("away");
        // expText.forEach(te => 
        //     te.style.display = "flex"
        // );
        setTimeout(() => {
            expText.forEach(te => {
                te.style.display = "flex";
            });
        }, 150);
        exp2.forEach(tex => {
            tex.style.justifyContent = "left";
            tex.style.marginLeft = `${marg}px`;
            // tex.style.marginLeft = `0.1vw`;
        });
        fexp.style.justifyContent = "end";
        // fwr.style.marginRight = `${marg}px`;
        fwr.style.marginRight = `0.1vw`;
        // iconLeft.style.justifyContent = "left";
        // iconLeft.style.marginLeft = `${marg}px`;
    }
    isExpanded = !isExpanded; // Flip state
});








// PICTURE CREDITS
const hoverInfo = document.querySelector('.pic-hover-info');
const infoIcon = document.getElementById('pic-credit');

infoIcon.addEventListener('mouseenter', () => {
    hoverInfo.style.display = 'flex';
    hoverInfo.style.justifyContent = 'center';
    hoverInfo.style.alignItems = 'center';
});

infoIcon.addEventListener('mousemove', (e) => {
    hoverInfo.style.left = e.pageX + 10 + 'px';
    hoverInfo.style.top = e.pageY - 40 + 'px';
});

infoIcon.addEventListener('mouseleave', () => {
    hoverInfo.style.display = 'none';
});

















// function parseEndDate(monthStr) {
//     // Examples: "19 - 30 March, 2025" or "25 February - 2 March, 2025"

//     // Get the part after the last hyphen (end date portion)
//     let parts = monthStr.split('-');
//     let endPart = parts[parts.length - 1].trim(); // e.g. "30 March, 2025" or "2 March, 2025"

//     // Fix if it doesn't contain the year (e.g. "2 March, 2025")
//     if (!/\d{4}/.test(endPart)) {
//         // Try to extract the year from the full string
//         let yearMatch = monthStr.match(/\d{4}/);
//         let year = yearMatch ? yearMatch[0] : new Date().getFullYear();
//         endPart += `, ${year}`;
//     }

//     // Parse into Date object
//     let date = new Date(endPart);
//     return isNaN(date) ? null : date;
// }

// function getLast5FinishedTournaments(tournamentDict) {
//     const now = new Date();

//     // Convert to array
//     const tournaments = Object.values(tournamentDict);

//     // Parse end dates
//     const withEndDates = tournaments.map(t => {
//         return {
//             ...t,
//             endDate: parseEndDate(t.month)
//         };
//     }).filter(t => t.endDate && t.endDate < now); // Only past tournaments

//     // Sort by endDate descending
//     withEndDates.sort((a, b) => b.endDate - a.endDate);

//     // Get last 5
//     return withEndDates.slice(0, 5);
// }















