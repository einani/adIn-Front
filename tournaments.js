// <span class="tournament-type ${data.typeClass}">${data.type}</span>
function createTournamentCard(data, data2) {
    const className = data.atype.toLowerCase().replace(/\s+/g, '-');  // "ATP 250" → "atp-250"
    const card = document.createElement("div");
    card.className = "tournament-card";

    card.innerHTML = `
        <div class="card-top">
            <h3 id="${data.id}" class="tournament-link">${data.nay}</h3>
            <span class="expand-icon"></span>
        </div>
        <div class="tournament-i">
            <span class="tournament-type ${className}">${data.atype}</span>
            <div class="tournament-dates">${data.adate}</div>
            <div class="tournament-location">${data.Location}</div>
            <div class="surface">${data.Surface}</div>
        </div>
        <div class="tournament-details">
            <p><strong>Venue:</strong> ${data.Venue}</p>
            <p><strong>Prize Money:</strong> ${data["Prize money"]}</p>
            <p><strong>Draw Size:</strong> ${data.Draw}</p>
            <p><strong>Current Champion:</strong> ${data2.roundW}</p>
        </div>
    `;

    return card;
}

function getMonthNameFromDate(dateString) {
    // "30 December, 2024 - 5 January, 2025"
    const startDatePart = dateString.split(" - ")[1]; // "5 January, 2025"
    const month = startDatePart.split(",")[0].trim().split(" ")[1]; // "5 January" -> "January"
    return month.toLowerCase(); // "january"
}


// async function loadTournamentData(tournamentId) {
//   const currentYear = 2025; // hard-coded
//   const lastYear = 2024; // hard-coded
//   let usedYear = currentYear;

//   // Helper to fetch and parse JSON safely
//   async function fetchJson(url) {
//     try {
//       const response = await fetch(url);
//       if (!response.ok) throw new Error(`HTTP ${response.status}`);
//       return await response.json();
//     } catch (err) {
//       console.error(`Failed to load ${url}:`, err);
//       return null;
//     }
//   }

//   // Try current year draws first
//   let drawsData = await fetchJson(`data/draws_${currentYear}.json`);
//   let tournamentData = drawsData?.[tournamentId];

//   // If not found, fallback to previous year
//   if (!tournamentData) {
//     console.warn(`Tournament ${tournamentId} not found for ${currentYear}, trying ${lastYear}`);
//     drawsData = await fetchJson(`data/draws_${lastYear}.json`);
//     tournamentData = drawsData?.[tournamentId];
//     usedYear = lastYear;
//   }

//   if (!tournamentData) {
//     console.error(`Tournament ${tournamentId} not found in any draws file`);
//     return;
//   }

//   // Display tournament
//   displayTournament(tournamentId, tournamentData);

//   // Fetch scores file from the same year as draws
//   const scoresData = await fetchJson(`data/scores_${usedYear}.json`);
//   if (scoresData && tournamentId in scoresData) {
//     populateScores(scoresData[tournamentId]);
//   } else {
//     console.warn(`No scores found for ${tournamentId} (${usedYear})`);
//   }
// }


async function loadEverything() {
    document.addEventListener("DOMContentLoaded", async () => {
        try {
            const response = await fetch('data/try3_normalized.json');
            const tournamentDict = await response.json();
            const datafResponse = await fetch('data/update_draws1025.json');
            const dataf = await datafResponse.json();
            const datagResponse = await fetch('data/incomplete_draws2024.json');
            const datag = await datagResponse.json();

            const tournaments = Object.values(tournamentDict);

            for (const tournament of tournaments) {
                const month = getMonthNameFromDate(tournament.adate);
                const container = document.getElementById(`${month}`);

                const plya2 = document.querySelector('.plya');
                const div = document.createElement('div');
                div.className = 'plya-ent';

                const h1 = document.createElement('h1');
                h1.textContent = tournament.id;

                div.appendChild(h1);
                // div.style.display = 'none'; // Hide initially

                div.addEventListener('click', function (e) {
                    window.location.href = `/zTournament.html?id=${tournament.id}`;
                });

                plya2.appendChild(div); // Append to the main container
        
                if (container) {
                    const tournN = tournament.id;
                    const drawD = dataf[tournN] || datag[tournN];
                    const card = createTournamentCard(tournament, drawD);
                    container.appendChild(card);
                } else {
                    console.warn(`No container found for month: ${month}`);
                }
            }

            // Run this only after all cards are added
            expWork();

            document.querySelectorAll('.tournament-link').forEach(h3 => {
                h3.addEventListener('click', function (e) {
                    const tournamentId = this.id;
                    window.location.href = `/zTournament.html?id=${tournamentId}`;
                });
            });

            clickCaroSel();
            setUpMain();

        } catch (error) {
            console.error('Error fetching or processing data:', error);
        }
    });
}



function expWork() {
    const tournamentCards = document.querySelectorAll('.tournament-card');

    if (tournamentCards.length > 0) {
        tournamentCards.forEach(card => {
            card.addEventListener('click', function() {
                this.classList.toggle('activeTour');
            });
        });
    }
}

function updateCaroSel() {
    const caruCon = document.querySelector('.carousel-mon');
    const caruSel = caruCon.querySelectorAll('div');

    if (caruSel.length > 0) {
        caruSel.forEach(sel => {
            let selPos = sel.classList[0];
            let lastChars = selPos.slice(-2);
            let posInd = parseInt(lastChars, 10);
            if (currentSection == posInd) {
                sel.style.backgroundColor = "rgb(27, 216, 130)";
                sel.style.opacity = 1;
            } else {
                sel.style.backgroundColor = "transparent";
                sel.style.opacity = 0.5;
            }
        });
    }
}

function clickCaroSel() {
    const caruCon = document.querySelector('.carousel-mon');
    const caruSel = caruCon.querySelectorAll('div');

    if (caruSel.length > 0) {
        caruSel.forEach(sel => {
            sel.addEventListener('click', function() {
                let selPos = sel.classList[0];
                let lastChars = selPos.slice(-2);
                let posInd = parseInt(lastChars, 10);
                currentSection = posInd;
                updateView();
                updateCaroSel();
            });
        });
    }
}



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


// MONTH SELECTION IN TOURNAMENT CALENDAR
let currentSection = 0;
const content = document.getElementById('allMonths');
const totalSections = 12;

function updateView() {
    content.style.transform = `translateX(-${currentSection * 60}vw)`;
}

function next() {
    if (currentSection < totalSections - 1) {
        currentSection++;
        updateView();
        updateCaroSel();
    }
}

function prev() {
    if (currentSection > 0) {
        currentSection--;
        updateView();
        updateCaroSel();
    }
}


// CALENDAR TOGGLE BUTTON
const months = document.querySelectorAll('.cal-item');
const calendar = document.querySelector('.calendar-dis');
const calsubpage = document.querySelector('.month-dis');

months.forEach(month => {
    month.addEventListener('click', function() {
        calendar.style.display = "none";
        calsubpage.style.display = "flex";
        let secondClass = month.classList[1];
        let lastChar = secondClass.slice(-2); // get last character
        let moInd = parseInt(lastChar, 10);
        currentSection = moInd;
        updateView();
        updateCaroSel();
    });
});

const backB = document.querySelector('.back-to-cal');
backB.addEventListener('click', function() {
    calendar.style.display = "flex";
    calsubpage.style.display = "none";
});


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






loadEverything();