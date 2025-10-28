let viewportHeight = window.innerHeight / 2;
let viewportWidth = window.innerWidth;

const gs2000 = [2000, 1300, 800, 400, 200, 100, 50, 10];
const m1000_128 = [1000, 650, 400, 200, 100, 50, 30, 10];
const m1000_64 = [1000, 650, 400, 200, 100, 50, 10];
const a500_32 = [500, 330, 200, 100, 50, 25];
const a500_64 = [500, 330, 200, 100, 50, 25, 10];
const a250_32 = [250, 165, 100, 50, 25, 13];
const a250_64 = [250, 165, 100, 50, 25, 13, 0];

const gs = ["Wimbledon", "US Open", "Roland Garros", "Australian Open"];
const m128 = ["Rome Masters", "Madrid Masters", "Miami Masters", "Indian Wells Masters", "Cincinnati Masters", "Canada Masters", "Shanghai Masters"];
const m64 = ["Monte Carlo Masters", "Paris Masters"];
const f64 = ["Washington"];
const f32 = ["Dallas", "Rotterdam", "Doha", "Rio de Janeiro", "Dubai", "Acapulco", "Barcelona", "Munich", "Hamburg", "Queen's Club", "Halle", "Tokyo", "Beijing", "Vienna", "Basel"];
const t64 = ["Winston-Salem"];
const t32 = ["Brisbane", "Hong Kong", "Adelaide", "Auckland", "Montpellier", "Marseille", "Delray Beach", "Buenos Aires", "Santiago", "Houston", "Marrakech", "Bucharest", 
    "Geneva", "Stuttgart", "s Hertogenbosch", "Mallorca", "Eastbourne", "Los Cabos", "Gstaad", "Bastad", "Umag", "Kitzbuhel", "Chengdu", "Hangzhou", "Almaty", "Antwerp", 
    "Stockholm", "Metz", "Athens"];



const urlParams = new URLSearchParams(window.location.search);
const playerId = urlParams.get('id');


// HIGHLIGHTING THE CURRENT TAB
document.addEventListener("DOMContentLoaded", function () {
    let currentPage = window.location.pathname.split("/").pop(); // Get the current file name
    let links = document.querySelectorAll(".tab");

    links.forEach(link => {
        if (link.getAttribute("onclick").includes(currentPage)) {
            link.classList.add("active"); // Add 'active' class to the matching link
        }
    });

    setupTabs();
    document.querySelectorAll(".side-menu").forEach(tabsContainer => {
        tabsContainer.querySelector(".tabs-button").click();
    });
    viewportHeight = window.innerHeight / 2; 
    viewportWidth = window.innerWidth;
    document.documentElement.style.setProperty('--vh', `${viewportHeight}px`);
    document.documentElement.style.setProperty('--vw', `${viewportWidth}px`);


    // FOR LOADING DATA
    // fetch('data/output.json')
    //     .then(response => response.json())
    //     .then(data => {
    //         // Insert JSON data into HTML elements
    //         document.getElementById('player-country').textContent = data.country;
    //         document.getElementById('player-hand').textContent = data.hand;
    //     })
    //     .catch(error => console.error('Error loading JSON:', error));

    fetch('data/top150StatFinalizedV2.json')
        .then(response => response.json())
        .then(datac => {
            if (playerId in datac) {
                const playerData = datac[playerId];
                buildPage(playerData);
                fetch('data/top150bio.json')
                    .then(response => response.json())
                    .then(datad => {
                        if (playerId in datad) {
                            const playerBio = datad[playerId];
                            buildPageP2(playerBio);
                            // console.log(playerData);
                            fetch('data/top150Stat.json')
                                .then(response => response.json())
                                .then(datae => {
                                    buildPageP3(datae);
                                    // console.log(playerData);
                                })
                                .catch(error => console.error('Error loading player bio JSON:', error));
                        }
                    })
                    .catch(error => console.error('Error loading player bio JSON:', error));
                // console.log(playerData);
            }
        })
        .catch(error => console.error('Error loading player JSON:', error));
});



function calculateAgeFromDOB(dobNumber) {
    // 1. Convert dobNumber (e.g. 19870522.0) to string and remove decimal part
    const dobStr = dobNumber.toString().split('.')[0];  // "19870522"

    // 2. Extract year, month, day as integers
    const year = parseInt(dobStr.slice(0, 4));
    const month = parseInt(dobStr.slice(4, 6)) - 1;  // JS months are 0-based!
    const day = parseInt(dobStr.slice(6, 8));

    // 3. Create a UTC date for the DOB
    const dobDate = new Date(Date.UTC(year, month, day));

    // 4. Get current date in UTC
    const now = new Date();
    const nowUTC = new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate()
    ));

    // 5. Calculate age
    let age = nowUTC.getUTCFullYear() - dobDate.getUTCFullYear();

    // 6. Adjust if birthday hasn’t happened yet this year (compare months and days)
    if (
        nowUTC.getUTCMonth() < dobDate.getUTCMonth() ||
        (nowUTC.getUTCMonth() === dobDate.getUTCMonth() && nowUTC.getUTCDate() < dobDate.getUTCDate())
    ) {
        age--;
    }

    return age;
}

function getRoundIndex(roundName) {
    // if (!roundName || typeof roundName !== "string") return -1;

    // const normalized = roundName.trim().toLowerCase();

    const mapping = {
        // "winner": 0,
        // "final": 1,
        "F": 1,
        "SF": 2,
        "QF": 3,
        "R16": 4,
        "R32": 5,
        "R64": 6,
        "R128": 7
        // "runner-up": 1,
        // "semifinal": 2,
        // "quarterfinal": 3,
        // "round of 16": 4,
        // "r16": 4,
        // "round of 32": 5,
        // "r32": 5,
        // "round of 64": 6,
        // "r64": 6,
        // "round of 128": 7,
        // "r128": 7
    };

    return mapping[roundName] ?? -1;
}

function getPoints(tournamentName, roundIndex) {
    // Normalize name to avoid case issues
    const name = tournamentName.trim();

    // Determine the points array based on the tournament
    let pointsArray = null;

    if (gs.includes(name)) {
        pointsArray = gs2000;
    } else if (m128.includes(name)) {
        pointsArray = m1000_128;
    } else if (m64.includes(name)) {
        pointsArray = m1000_64;
    } else if (f64.includes(name)) {
        pointsArray = a500_64;
    } else if (f32.includes(name)) {
        pointsArray = a500_32;
    } else if (t64.includes(name)) {
        pointsArray = a250_64;
    } else if (t32.includes(name)) {
        pointsArray = a250_32;
    } else {
        // Tournament not found
        return 0;
    }

    // Return points based on roundIndex, or 0 if index is out of range
    return pointsArray[roundIndex] ?? 0;
}





function buildPage(data) {
    const nameTag = document.querySelector('.name');
    const parts = playerId.split(" ");
    const firstName = parts[0];
    const lastName = parts.slice(1).join(" ");
    nameTag.innerHTML = `
        <div class="name-flair">
            <p>${firstName}</p>
        </div>
        <div class="name-flair">
            <p>${lastName}</p>
        </div>
        <div class="name2">
            <p>${firstName}</p>
        </div>
        <div class="name2">
            <p>${lastName}</p>
        </div>
    `;

    const ovwSide = document.querySelector('.overview-bottom');
    ovwSide.innerHTML = `
        <div id="nat" class="bubble">
            <h1>USA</h1>
            <h6>Country</h6>
        </div>
        <div id="age" class="bubble">
            <h1>22.1</h1>
            <h6>Age</h6>
        </div>
        <div id="hand" class="bubble">
            <h1>${data.hand}</h1>
            <h6>Hand</D></h6>
        </div>
        <div id="bh" class="bubble">
            <h1>${data.bh}</h1>
            <h6>Backhand</D></h6>
        </div>
        <div id="height" class="bubble">
            <h1>191cm</h1>
            <h6>Height</D></h6>
        </div>
    `;

    const statsMain = document.getElementById("statsMain");
    const pntsW = parseFloat(((data.tpw / data.totPnts) * 100).toFixed(1));
    const aceP = parseFloat(((data.aces / data.srvPnts) * 100).toFixed(1));
    const dfP = parseFloat(((data.dfs / data.srvPnts) * 100).toFixed(1));
    const firstP = parseFloat(((data.srv1pnts / data.srvPnts) * 100).toFixed(1));
    const firstW = parseFloat(((data.srv1w / data.srv1pnts) * 100).toFixed(1));
    const secW = parseFloat(((data.srv2w / data.srv2pnts) * 100).toFixed(1));
    statsMain.innerHTML = `
        <thead>
            <tr class="top-head">
                <th colspan="3"></th>
                <th colspan="1"></th>
                <th colspan="9">SERVING</th>
                <th colspan="1"></th>
                <th colspan="6">RETURN</th>
            </tr>
            <tr class="bot-head">
                <th>Type</th>
                <th>W/L</th>
                <th>Pnts W</th>
                <th></th>
                <th>Ace</th>
                <th>DF</th>
                <th>1st In</th>
                <th>1st W</th>
                <th>2nd W</th>
                <th>BPF</th>
                <th>BPS</th>
                <th>SrvP W</th>
                <th>SrvP</th>
                <th></th>
                <th>RetP</th>
                <th>RetP W</th>
                <th>1Ret W</th>
                <th>2Ret W</th>
                <th>BPGen</th>
                <th>BPCon</th>
            </tr>
        </thead>
        <tr class="data-row">
            <td>pPnt</td>
            <td>${data.win}-${data.loss}</td>
            <td>${pntsW}%</td>
            <td></td>
            <td>${aceP}%</td>
            <td>${dfP}%</td>
            <td>${firstP}%</td>
            <td>${firstW}%</td>
            <td>${secW}%</td>
            <td>${parseFloat(((data.bpfac / data.srvPnts) * 100).toFixed(1))}%</td>
            <td>${parseFloat(((data.bpsvd / data.bpfac) * 100).toFixed(1))}%</td>
            <td>${parseFloat(((data.spw / data.srvPnts) * 100).toFixed(1))}%</td>
            <td>${parseFloat(((data.srvPnts / data.totPnts) * 100).toFixed(1))}%</td>
            <td></td>
            <td>${parseFloat(((data.retPnts / data.totPnts) * 100).toFixed(1))}%</td>
            <td>${parseFloat(((data.rpw / data.retPnts) * 100).toFixed(1))}%</td>
            <td>${parseFloat(((data.ret1w / data.ret1st) * 100).toFixed(1))}%</td>
            <td>${parseFloat(((data.ret2w / data.ret2nd) * 100).toFixed(1))}%</td>
            <td>${parseFloat(((data.bpgen / data.retPnts) * 100).toFixed(1))}%</td>
            <td>${parseFloat(((data.bpcnv / data.bpgen) * 100).toFixed(1))}%</td>
        </tr>
        <tr class="data-row">
            <td>pSet</td>
            <td>${data.win}-${data.loss}</td>
            <td>${parseFloat(((data.tpw / data.tSets)).toFixed(1))}</td>
            <td></td>
            <td>${parseFloat(((data.aces / data.tSets)).toFixed(1))}</td>
            <td>${parseFloat(((data.dfs / data.tSets)).toFixed(1))}</td>
            <td>${parseFloat(((data.srv1pnts / data.tSets)).toFixed(1))}</td>
            <td>${parseFloat(((data.srv1w / data.tSets)).toFixed(1))}</td>
            <td>${parseFloat(((data.srv2w / data.tSets)).toFixed(1))}</td>
            <td>${parseFloat(((data.bpfac / data.tSets)).toFixed(1))}</td>
            <td>${parseFloat(((data.bpsvd / data.tSets)).toFixed(1))}</td>
            <td>${parseFloat(((data.spw / data.tSets)).toFixed(1))}</td>
            <td>${parseFloat(((data.srvPnts / data.tSets)).toFixed(1))}</td>
            <td></td>
            <td>${parseFloat(((data.retPnts / data.tSets)).toFixed(1))}</td>
            <td>${parseFloat(((data.rpw / data.tSets)).toFixed(1))}</td>
            <td>${parseFloat(((data.ret1w / data.tSets)).toFixed(1))}</td>
            <td>${parseFloat(((data.ret2w / data.tSets)).toFixed(1))}</td>
            <td>${parseFloat(((data.bpgen / data.tSets)).toFixed(1))}</td>
            <td>${parseFloat(((data.bpcnv / data.tSets)).toFixed(1))}</td>
        </tr>
        <tr class="data-row">
            <td>pMat</td>
            <td>${data.win}-${data.loss}</td>
            <td>${parseFloat(((data.tpw / data.match)).toFixed(1))}</td>
            <td></td>
            <td>${parseFloat(((data.aces / data.match)).toFixed(1))}</td>
            <td>${parseFloat(((data.dfs / data.match)).toFixed(1))}</td>
            <td>${parseFloat(((data.srv1pnts / data.match)).toFixed(1))}</td>
            <td>${parseFloat(((data.srv1w / data.match)).toFixed(1))}</td>
            <td>${parseFloat(((data.srv2w / data.match)).toFixed(1))}</td>
            <td>${parseFloat(((data.bpfac / data.match)).toFixed(1))}</td>
            <td>${parseFloat(((data.bpsvd / data.match)).toFixed(1))}</td>
            <td>${parseFloat(((data.spw / data.match)).toFixed(1))}</td>
            <td>${parseFloat(((data.srvPnts / data.match)).toFixed(1))}</td>
            <td></td>
            <td>${parseFloat(((data.retPnts / data.match)).toFixed(1))}</td>
            <td>${parseFloat(((data.rpw / data.match)).toFixed(1))}</td>
            <td>${parseFloat(((data.ret1w / data.match)).toFixed(1))}</td>
            <td>${parseFloat(((data.ret2w / data.match)).toFixed(1))}</td>
            <td>${parseFloat(((data.bpgen / data.match)).toFixed(1))}</td>
            <td>${parseFloat(((data.bpcnv / data.match)).toFixed(1))}</td>
        </tr>
        <tr class="data-row">
            <td>Tot</td>
            <td>${data.win}-${data.loss}</td>
            <td>${data.tpw}</td>
            <td></td>
            <td>${data.aces}</td>
            <td>${data.dfs}</td>
            <td>${data.srv1pnts}</td>
            <td>${data.srv1w}</td>
            <td>${data.srv2w}</td>
            <td>${data.bpfac}</td>
            <td>${data.bpsvd}</td>
            <td>${data.spw}</td>
            <td>${data.srvPnts}</td>
            <td></td>
            <td>${data.retPnts}</td>
            <td>${data.rpw}</td>
            <td>${data.ret1w}</td>
            <td>${data.ret2w}</td>
            <td>${data.bpgen}</td>
            <td>${data.bpcnv}</td>
        </tr>
    `;

    const seasHis = document.querySelector(".season-history");
    seasHis.innerHTML = `
        <thead>
            <tr>
                <th>Year</th>
                <th>M</th>
                <th>Win</th>
                <th>Loss</th>
                <th>Win%</th>
                <th>Set-W/L</th>
                <th>Set%</th>
                <th>Game-W/L</th>
                <th>Game%</th>
                <th>TB-W/L</th>
                <th>TB%</th>
                <th>Tourn</th>
                <th>Best</th>
            </tr>
        </thead>
        <tbody>
            <tr class="sel-yr">
                <td>2025</td>
                <td>${data.match}</td>
                <td>${data.win}</td>
                <td>${data.loss}</td>
                <td>${parseFloat(((data.win / data.match) * 100).toFixed(1))}%</td>
                <td>${data["Sets Won"]}-${data["Sets Lost"]}</td>
                <td>${parseFloat(((data["Sets Won"] / data.tSets) * 100).toFixed(1))}%</td>
                <td>${data["Games Won"]}-${data["Games Lost"]}</td>
                <td>${parseFloat(((data["Games Won"] / (data["Games Lost"] + data["Games Won"])) * 100).toFixed(1))}%</td>
                <td>${data["TB Won"]}-${data["TB Lost"]}</td>
                <td>${parseFloat(((data["TB Won"] / (data["TB Lost"] + data["TB Won"])) * 100).toFixed(1))}%</td>
                <td>${data.trnts}</td>
                <td>R1C14</td>
            </tr>
        </tbody>
    `;
    const seasMat = document.querySelector(".season-matches");
    seasMat.innerHTML = `
        <thead>
            <tr>
                <th>Date</th>
                <th>Event</th>
                <th>Surf.</th>
                <th>Round</th>
                <th>Opp</th>
                <th>Result</th>
                <th>Score</th>
                <th>TPW</th>
                <th>RPW</th>
                <th>BPSVD</th>
                <th>BPCNV</th>
                <th>DR</th>
                <th>Time</th>
            </tr>
        </thead>
        <tbody class="all-matmat">
        </tbody>
    `;
    const years = seasHis.querySelector('.sel-yr');
    const sznMat = document.querySelector('.szn-mat');
    years.addEventListener('click', function () {
        seasHis.style.display = "none";
        // seasMat.style.display = "table";
        sznMat.style.display = "flex";
    });
    const hmhm = document.getElementById('ck-to-hm');
    hmhm.addEventListener('click', function () {
        seasHis.style.display = "table";
        // seasMat.style.display = "table";
        sznMat.style.display = "none";
    });
}


function buildPageP2(data) {  
    const ovwSide = document.querySelector('.overview-bottom');
    const nat = ovwSide.querySelector('#nat');
    const age = ovwSide.querySelector('#age');
    const height = ovwSide.querySelector('#height');

    const natTag = nat.querySelector('h1');
    const ageTag = age.querySelector('h1');
    const heiTag = height.querySelector('h1');

    const agenum = calculateAgeFromDOB(data.dob);
    natTag.textContent = `${data.ioc}`;
    ageTag.textContent = `${agenum}`;
    heiTag.textContent = `${parseInt(data.height)}`; 
}


function buildPageP3(data) {
    const nameKey = playerId.replace(/\s+/g, '');

    // Example: playerDataDict is your main object
    const matchingKeys = Object.keys(data).filter(key => {
        return (
            key.includes(nameKey) &&          // Must contain the player's name
            !key.endsWith("w1")               // Must NOT end with 'w1'
        );
    });

    let srvKey = null;
    let retKey = null;

    matchingKeys.forEach(key => {
        if (key.endsWith("r1")) {
            retKey = key;
        } else {
            srvKey = key;
        }
    });

    const servStats = data[srvKey];
    const retrStats = data[retKey];
    const allMat = document.querySelector('.all-matmat');
    
    for (let i = 0; i < servStats.length; i++) {
        let matDic1 = servStats[i];
        let matDic2 = retrStats[i];
        const match = document.createElement('tr');

        match.innerHTML = `
            <td>${matDic1.date}</td>
            <td>${matDic1.tname}</td>
            <td>${matDic1.surface}</td>
            <td>${matDic1.roundN}</td>
            <td>${matDic1.oppName}</td>
            <td>${matDic1.result3}</td>
            <td>${matDic1.score}</td>
            <td>${matDic2.tpw}</td>
            <td>${matDic2.rpw}</td>
            <td>${matDic1.bpsvd}</td>
            <td>${matDic2.bpcnv}</td>
            <td>${matDic1.dr2}</td>
            <td>${matDic1.time3}</td>
        `;

        allMat.appendChild(match);
    }

    const rnkDiv = document.querySelector('.all-rnkrnk');
    for (let i = 0; i < servStats.length; i++) {
        let cur = servStats[i];
        if (cur.roundN == "F") {
            if (cur.result3 == 1) {
                let popo = getPoints(cur.tname, 0);
                const tRes = document.createElement('tr');
                tRes.innerHTML = `
                    <td>${cur.date}</td>    
                    <td>${cur.tname}</td>
                    <td>W</td>
                    <td>${popo}</td>
                `;
                rnkDiv.appendChild(tRes);
            } else {
                let popo = getPoints(cur.tname, 1);
                const tRes = document.createElement('tr');
                tRes.innerHTML = `
                    <td>${cur.date}</td>
                    <td>${cur.tname}</td>
                    <td>F</td>
                    <td>${popo}</td>
                `;
                rnkDiv.appendChild(tRes);
            }
        } else if (cur.result3 == 0) {
            let roro = getRoundIndex(cur.roundN);
            let popo = getPoints(cur.tname, roro);
            const tRes = document.createElement('tr');
            tRes.innerHTML = `
                <td>${cur.date}</td>
                <td>${cur.tname}</td>
                <td>${cur.roundN}</td>
                <td>${popo}</td>
            `;
            rnkDiv.appendChild(tRes);
        }
    }
}






// TABLE SHOT CHART MECHANICS
// Level 1: Toggle Backhand / Forehand
document.querySelectorAll('.group-header').forEach(header => {
    header.addEventListener('click', () => {
        const group = header.dataset.group;
        const isActive = header.classList.toggle('active');
        document.querySelectorAll(`.group-item[data-group="${group}"]`).forEach(row => {
            row.style.display = isActive ? 'table-row' : 'none';
            // also collapse sub-items when main collapses
            if (!isActive) {
                row.classList.remove('active');
                const subgroup = row.dataset.subgroup;
                document.querySelectorAll(`.sub-item[data-subgroup="${subgroup}"][data-parent="${group}"]`)
                    .forEach(sub => sub.style.display = 'none');
            }
        });
    });
});

// Level 2: Toggle sub-items (zones)
document.querySelectorAll('.group-item').forEach(item => {
    item.addEventListener('click', () => {
        const subgroup = item.dataset.subgroup;
        const parent = item.dataset.group;
        const isActive = item.classList.toggle('active');
        document.querySelectorAll(`.sub-item[data-subgroup="${subgroup}"][data-parent="${parent}"]`)
            .forEach(sub => {
                sub.style.display = isActive ? 'table-row' : 'none';
            });
    });
});




// SEARCH BAR MECHANICS
document.querySelector('.search').addEventListener('click', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const searchContainer = document.querySelector('.search-container');
    const searchInput = document.querySelector('.search-container input');
    const pops = document.querySelectorAll('.pop');

    navLinks.forEach(link => {
        link.classList.add('hidden');
    });
    pops.forEach(popper => {
        popper.style.display = 'flex';
        // popper.style.marginLeft = '5vw';
        // popper.style.marginRight = '5vw';
    });
    searchContainer.style.display = 'flex';
    searchInput.focus(); // auto-focus on input when opened
});

document.querySelector('.close').addEventListener('click', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const searchContainer = document.querySelector('.search-container');
    const pops = document.querySelectorAll('.pop');

    searchContainer.style.display = 'none'; // Hide search container
    pops.forEach(popper => {
        popper.style.display = 'none';
    });

    navLinks.forEach(link => {
        link.classList.remove('hidden'); // Show nav links again
    });
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



const searchItems = [
];

// URLs to your JSON files
const tournamentsJsonUrl = 'data/try3_normalized.json'; // assumed to be an array
const playersJsonUrl = 'data/top150StatFinalizedV2.json';         // assumed to be an object with keys

Promise.all([
    fetch(tournamentsJsonUrl).then(res => res.json()),
    fetch(playersJsonUrl).then(res => res.json())
    ]).then(([tournaments, players]) => {
    // 🎾 1. Add tournament entries
    
    const tournaments2 = Object.values(tournaments);
    for (const tournament of tournaments2) {
    // tournaments2.forEach(tournament => {
        searchItems.push({
        title: `Tournament: ${tournament.id}`,
        url: `/zTournament.html?id=${tournament.id}`
        });
    // });
    }

    // 🎾 2. Add player entries from dict keys
    Object.keys(players).forEach(playerKey => {
        searchItems.push({
        title: `Player: ${playerKey}`,
        url: `/playersBin.html?id=${playerKey}`
        });
    });

    // ✅ Now you can use `searchItems` in your Fuse.js setup or other search logic
    console.log("Search index loaded:", searchItems);

    // (Re-)initialize Fuse.js or your search system here if needed
});


const input = document.getElementById('search-input');
const suggestions = document.getElementById('search-suggestions');

input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    suggestions.innerHTML = '';

    if (!query) return;

    const matches = searchItems.filter(item =>
    item.title.toLowerCase().includes(query)
    );

    matches.slice(0, 5).forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.title;
    li.onclick = () => {
        window.location.href = item.url;
    };
    suggestions.appendChild(li);
    });
});

// Optional: Press Enter to go to the first match
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
    const query = input.value.trim().toLowerCase();
    const match = searchItems.find(item =>
        item.title.toLowerCase().includes(query)
    );
    if (match) {
        window.location.href = match.url;
    }
    }
});

// Optional: Hide suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !suggestions.contains(e.target)) {
    suggestions.innerHTML = '';
    }
});



// // NAVBAR CONTRAST UPDATER AND SIDE MENU VISUAL
// const scrollContainer = document.querySelector('.scroll-container');
// const box = document.getElementById('colorBox');
// const side = document.getElementById('side-menu');
// const section = document.getElementById('targetSection');
// const sea = document.getElementById('sicon');
// const clo = document.getElementById('cicon');

// const tempElem = document.querySelector('.player-section'); 
// const showAt = tempElem.getBoundingClientRect().top + (scrollContainer.clientHeight / 4);
// const sideMenu = document.getElementById('side-menu');
// const sent = document.querySelector('.side-menu-sentinel'); 
// // const content

// scrollContainer.addEventListener('scroll', () => {
//     const containerScrollTop = scrollContainer.scrollTop;
//     const containerOffsetTop = section.offsetTop - scrollContainer.offsetTop;
//     const sectionHeight = section.offsetHeight;
  
//     // Adjust for scrollContainer's relative scroll position
//     const scrollY = containerScrollTop + scrollContainer.clientHeight / 2;
  
//     if (scrollY >= containerOffsetTop && scrollY <= containerOffsetTop + sectionHeight) {
//         const scrollFraction = (scrollY - containerOffsetTop) / (sectionHeight / 2);
  
//         const colour = Math.round(255 * scrollFraction);
  
//         side.style.backgroundColor = `rgba(${colour}, ${colour}, ${colour}, 0.5)`;
//         box.style.backgroundColor = `rgba(${colour}, ${colour}, ${colour}, 0.5)`;
//         sea.style.backgroundColor = `rgba(${colour}, ${colour}, ${colour}, 0.5)`;
//         clo.style.backgroundColor = `rgba(${colour}, ${colour}, ${colour}, 0.5)`;
//     }

//     const menuRect = sent.getBoundingClientRect();
//     const containerRect = scrollContainer.getBoundingClientRect();
//     // const contentRect = content.getBoundingClientRect();

//     const stickyOffset = viewportHeight / 2; // px from top
//     // const stickyOffset = viewportHeight / 10;
//     // const stickyOffset = 200; // px from top


//     if (menuRect.top <= containerRect.top + stickyOffset) {
//         // Fix menu
//         sideMenu.classList.add('fixed');
//     } else {
//         // Unfix menu
//         sideMenu.classList.remove('fixed');
//     }

//     // OPTIONAL: Stop fixing if bottom of content is above sticky limit
//     // if (contentRect.bottom <= stickyOffset + 50) {
//     //     sideMenu.classList.remove('fixed');
//     // }
    
// });


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
        expText.forEach(te => 
            te.style.display = "flex"
        );
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


const playerPhoto = document.querySelector(".left-side-player");

// SIDE MENU FUNCTION (run in top eventListener)
function setupTabs () {
    const secsec = document.querySelector('.section-text');
    document.querySelectorAll(".tabs-button").forEach(li => {
        li.addEventListener("click", () => {
            secsec.style.transform = "translateY(-24.5vw)";
            // secsec.style.transform = "translateY(-12vw)";
            setTimeout(() => {
                secsec.style.transform = "translateY(0vw)";
            // }, 1000);    

                const sideBar = li.parentElement;
                const tabContainer = document.querySelector(".section-text");
                const tabName = li.dataset.forTab;
                const tabToActivate = tabContainer.querySelector(`.text-col2[data-tab="${tabName}"]`);
                
                sideBar.querySelectorAll(".tabs-button").forEach(li => {
                    li.classList.remove("tab-menu-active");
                });

                tabContainer.querySelectorAll(".text-col2").forEach(tab => {
                    tab.classList.remove("tab-text-active");
                });

                li.classList.add("tab-menu-active");
                tabToActivate.classList.add("tab-text-active");
            }, 1000);
        });
    });  
}

// WINDOW HEIGHT CALC
window.addEventListener("resize", () => {
    viewportHeight = window.innerHeight / 2;
    document.documentElement.style.setProperty('--vh', `${viewportHeight}px`);
    viewportWidth = window.innerWidth;
    document.documentElement.style.setProperty('--vw', `${viewportWidth}px`);
});


// TABLE TOGGLE FUNCTION
const toggle = document.getElementById("seasonToggle");
toggle.addEventListener("click", (e) => {
    if (e.target.tagName === 'SPAN') {
    toggle.querySelectorAll("span").forEach(s => s.classList.remove("table-active"));
    e.target.classList.add("table-active");
    const type = e.target.getAttribute("data-type");
    console.log("Switched to:", type); // Placeholder for data update
    }
});

document.getElementById("surfaceSelect").addEventListener("change", (e) => {
    const surface = e.target.value;
    console.log("Surface selected:", surface); // Placeholder for data filtering
});



// COLLAPSE PLAYER PIC FUNCTION
const colPic = document.getElementById("togtog");
const playPic = document.getElementById("togDis");
const colIcon = document.getElementById("close-pic");
const opeIcon = document.getElementById("open-pic");
let picCol = false; // Track current state

colPic.addEventListener("click", (e) => {
    if (picCol) {
        playPic.style.display = "none";
        colIcon.style.display = "none";
        opeIcon.style.display = "flex";
    }
    else {
        playPic.style.display = "flex";
        colIcon.style.display = "flex";
        opeIcon.style.display = "none";
    }
    picCol = !picCol; // Flip state
});






// // SIDE MENU EXPANSION
// const expSide = document.getElementById("open-side-menu");
// const sideMenu2 = document.getElementById("side-menu");
// const expText = document.querySelectorAll(".label");
// const exp2 = document.querySelectorAll(".tabs-button");
// const fexp = document.querySelector(".for-exp");
// const fwr = document.querySelector(".fin-wrapper");
// // const exp3 = document.querySelector(".tabs-side");

// const iconLeft = document.querySelector(".open-icon");
// const iconRight = document.querySelector(".close-icon");

// let isExpanded = false; // Track current state
// const marg = (window.innerHeight * 0.025) - 8

// expSide.addEventListener("click", () => {
//     console.log("CLICK")
//     if (isExpanded) {
//         sideMenu2.style.width = "5vh";   // Shrink
//         iconLeft.classList.toggle("away");
//         iconRight.classList.toggle("away");
//         expText.forEach(te => 
//             te.style.display = "none"
//         );
//         exp2.forEach(tex => {
//             tex.style.justifyContent = "center";
//             tex.style.marginLeft = 0;
//         });
//         fexp.style.justifyContent = "center";
//         fwr.style.marginRight = 0;
//         // iconRight.style.justifyContent = "left";
//         // iconRight.style.marginLeft = 0;
//     } else {
//         sideMenu2.style.width = "15vh";  // Expand
//         iconLeft.classList.toggle("away");
//         iconRight.classList.toggle("away");
//         expText.forEach(te => 
//             te.style.display = "flex"
//         );
//         exp2.forEach(tex => {
//             tex.style.justifyContent = "left";
//             tex.style.marginLeft = `${marg}px`;
//         });
//         fexp.style.justifyContent = "end";
//         fwr.style.marginRight = `${marg}px`;
//         // iconLeft.style.justifyContent = "left";
//         // iconLeft.style.marginLeft = `${marg}px`;
//     }
//     isExpanded = !isExpanded; // Flip state
// });


// SCROLL DOWN BUTTON
// document.getElementById("scroll-button").addEventListener("click", function () {
//     document.getElementById("targetSection").scrollIntoView({ behavior: "smooth" });
// });









































// TITLE SIZE
// function fitTitleToScreen() {
//     const title = document.getElementById('full-width-title');
//     const containerWidth = window.innerWidth;
    
//     // Start with a large font-size guess
//     let fontSize = 100;
//     title.style.fontSize = fontSize + 'px';
//     title.style.letterSpacing = 'normal';

//     // Shrink until it fits
//     while (title.offsetWidth > containerWidth && fontSize > 0) {
//         fontSize -= 1;
//         title.style.fontSize = fontSize + 'px';
//     }
// }

// // Run on load and resize
// window.addEventListener('load', fitTitleToScreen);
// window.addEventListener('resize', fitTitleToScreen);




























// SCROLL BAR MECHANICS
// const content = document.querySelector('.content');
// const thumb = document.querySelector('.thumb');
// const scrollbar = document.querySelector('.scrollbar');

// function updateThumbHeight() {
//     const containerHeight = content.clientHeight;
//     const contentHeight = content.scrollHeight;
//     const thumbHeight = (containerHeight / contentHeight) * containerHeight;
//     // thumb.style.height = `${thumbHeight}px`;
//     thumb.style.height = `50px`;
// }

// function syncThumbPosition() {
//     const scrollTop = content.scrollTop;
//     const containerHeight = content.clientHeight;
//     const contentHeight = content.scrollHeight;
//     const thumbTop = (scrollTop / contentHeight) * containerHeight;
//     thumb.style.top = `${thumbTop}px`;
// }

// content.addEventListener('scroll', syncThumbPosition);
// window.addEventListener('resize', updateThumbHeight);
// window.addEventListener('load', () => {
//     updateThumbHeight();
//     syncThumbPosition();
// });

// // Drag to scroll
// let isDragging = false;
// let startY;
// let startTop;

// thumb.addEventListener('mousedown', (e) => {
//     isDragging = true;
//     startY = e.clientY;
//     startTop = parseInt(window.getComputedStyle(thumb).top);
//     document.body.style.userSelect = 'none';
// });

// document.addEventListener('mousemove', (e) => {
//     if (!isDragging) return;
//     const deltaY = e.clientY - startY;
//     const newTop = startTop + deltaY;
//     const containerHeight = content.clientHeight;
//     const contentHeight = content.scrollHeight;
//     const maxTop = containerHeight - thumb.offsetHeight;

//     const scrollRatio = newTop / containerHeight;
//     content.scrollTop = scrollRatio * contentHeight;
// });

// document.addEventListener('mouseup', () => {
//     isDragging = false;
//     document.body.style.userSelect = '';
// });















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



















document.querySelectorAll('.tab-toggle').forEach(button => {
    button.addEventListener('click', () => {
        const table = button.nextElementSibling;
        const isHidden = table.style.display === 'none';
        table.style.display = isHidden ? 'table' : 'none';
        button.innerHTML = button.innerHTML.replace(isHidden ? '▶' : '▼', isHidden ? '▼' : '▶');
    });
    // Start collapsed (optional)
    button.nextElementSibling.style.display = 'none';
    button.innerHTML = button.innerHTML.replace('▼', '▶');
});
