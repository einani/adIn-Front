// let viewportHeight = window.innerHeight / 2;
// let viewportWidth = window.innerWidth;


// HIGHLIGHTING THE CURRENT TAB
document.addEventListener("DOMContentLoaded", function () {
    let currentPage = window.location.pathname.split("/").pop(); // Get the current file name
    let links = document.querySelectorAll(".tab");

    links.forEach(link => {
        if (link.getAttribute("onclick").includes(currentPage)) {
            link.classList.add("active"); // Add 'active' class to the matching link
        }
    });

    // setupTabs();
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

    // fetch('data/top150StatFinalizedV2.json')
    fetch('https://raw.githubusercontent.com/einani/adIn-data/main/data/update_stats1025.json')
        .then(response => response.json())
        .then(datac => {
            Object.keys(datac).forEach(playerId => {
                const playerData = datac[playerId];
                buildPage(playerData, playerId);               
            });

            sortTableByColumn(1, "desc", table0, headers0);
            sortTableByColumn(1, "desc", table1, headers1);
            sortTableByColumn(1, "desc", table2, headers2);
            sortTableByColumn(1, "desc", table3, headers3);

            sortTableByColumn(1, "desc", table00, headers00);
            sortTableByColumn(1, "desc", table10, headers10);
            sortTableByColumn(1, "desc", table20, headers20);
            sortTableByColumn(1, "desc", table30, headers30);

            sortTableByColumn(1, "desc", table000, headers000);
            sortTableByColumn(1, "desc", table100, headers100);
            sortTableByColumn(1, "desc", table200, headers200);
            sortTableByColumn(1, "desc", table300, headers300);

            sortTableByColumn(1, "desc", table1000, headers1000);
            sortTableByColumn(1, "desc", table2000, headers2000);

            
            loadAndProcessStats();

            // if (playerId in datac) {
            //     const playerData = datac[playerId];
            //     buildPage(playerData, playerId);
                // fetch('data/top150bio.json')
                //     .then(response => response.json())
                //     .then(datad => {
                //         if (playerId in datad) {
                //             const playerBio = datad[playerId];
                //             buildPageP2(playerBio);
                //             // console.log(playerData);
                //             fetch('data/top150Stat.json')
                //                 .then(response => response.json())
                //                 .then(datae => {
                //                     buildPageP3(datae);
                //                     // console.log(playerData);
                //                 })
                //                 .catch(error => console.error('Error loading player bio JSON:', error));
                //         }
                //     })
                //     .catch(error => console.error('Error loading player bio JSON:', error));
                // console.log(playerData);
            // }
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





function buildPage(data, playerId) {
    // const statsMain = document.getElementById("ldrb-table");
    const ldrbMain = document.querySelector('.ace-table');
    const ldrbSml1 = document.querySelector('.ace1-table');
    const ldrbSml2 = document.querySelector('.ace2-table');
    const ldrbSml3 = document.querySelector('.ace3-table');
    const ldrbStat = ldrbMain.querySelector('tbody');
    const ldrbStat1 = ldrbSml1.querySelector('tbody');
    const ldrbStat2 = ldrbSml2.querySelector('tbody');
    const ldrbStat3 = ldrbSml3.querySelector('tbody');
    const ldrbRow = document.createElement('tr');
    const ldrbRow1 = document.createElement('tr');
    const ldrbRow2 = document.createElement('tr');
    const ldrbRow3 = document.createElement('tr');
    const srvVret = parseFloat((((data.spw / data.srvPnts) / (data.rpw / data.retPnts)) * 100).toFixed(1));
    const servebot = parseFloat(((1 - (((data.srv2w / data.srv2pnts) + (data.ret2w / data.ret2nd))/2)) * 100).toFixed(1));
    const servebot2 = parseFloat(((((data.vsA / data.retPnts) + (data.aces / data.srvPnts))/2) * 100).toFixed(1));
    const srvReliable = parseFloat(((data.bpfac / data.spw) * 100).toFixed(1));
    const firstW = parseFloat(((data.srv1w / data.srv1pnts) * 100).toFixed(1));
    const secW = parseFloat(((data.srv2w / data.srv2pnts) * 100).toFixed(1));
    const srv1v2 = parseFloat((firstW - secW).toFixed(1));

    const srvw = parseFloat(((data.spw / data.srvPnts) * 100).toFixed(1));
    const aceP = parseFloat(((data.aces / data.srvPnts) * 100).toFixed(1));
    const dfP = parseFloat(((data.dfs / data.srvPnts) * 100).toFixed(1));
    const firstP = parseFloat(((data.srv1pnts / data.srvPnts) * 100).toFixed(1));
    ldrbRow.innerHTML = `
        <td><span>${playerId}</span></td>
        <td>${srvVret}</td>
        <td>${servebot}</td>
        <td>${servebot2}</td>
        <td>${srvReliable}</td>
        <td>${srv1v2}</td>
        <td>${aceP}</td>
        <td>${dfP}</td>
        <td>${firstP}</td>
        <td>${firstW}</td>
        <td>${secW}</td>
        <td>${srvw}</td>
        <td>${parseFloat((aceP / dfP).toFixed(1))}</td>
        <td>${parseFloat(((data.aces / data.srv1pnts) * 100).toFixed(1))}</td>
    `;

    ldrbStat.appendChild(ldrbRow);

    ldrbRow1.innerHTML = `
        <td><span>${playerId}</span></td>
        <td>${srv1v2}</td>
        <td>${firstW}</td>
        <td>${secW}</td>
        <td>${firstP}</td>
    `;

    ldrbStat1.appendChild(ldrbRow1);

    ldrbRow2.innerHTML = `
        <td><span>${playerId}</span></td>
        <td>${servebot}</td>
        <td>${servebot2}</td>
        <td>${srvReliable}</td>
        <td>${aceP}</td>
    `;

    ldrbStat2.appendChild(ldrbRow2);

    ldrbRow3.innerHTML = `
        <td><span>${playerId}</span></td>
        <td>${srvVret}</td>
        <td>${srvw}</td>
        <td>${parseFloat((aceP / dfP).toFixed(1))}</td>
        <td>${parseFloat(((data.aces / data.srv1pnts) * 100).toFixed(1))}</td>
    `;

    ldrbStat3.appendChild(ldrbRow3);

    const ldrbMain10 = document.querySelector('.ret-table');
    const ldrbSml11 = document.querySelector('.ret1-table');
    const ldrbSml12 = document.querySelector('.ret2-table');
    const ldrbSml13 = document.querySelector('.ret3-table');
    const ldrbStat10 = ldrbMain10.querySelector('tbody');
    const ldrbStat11 = ldrbSml11.querySelector('tbody');
    const ldrbStat12 = ldrbSml12.querySelector('tbody');
    const ldrbStat13 = ldrbSml13.querySelector('tbody');
    const ldrbRow10 = document.createElement('tr');
    const ldrbRow11 = document.createElement('tr');
    const ldrbRow12 = document.createElement('tr');
    const ldrbRow13 = document.createElement('tr');
    const retFocus = parseFloat(((data.bpgen / data.rpw) * 100).toFixed(1));
    const retReliable = parseFloat(((data.vsA / data.ret1st) * 100).toFixed(1));
    const srvPressure = parseFloat(((data.ret2nd / data.retPnts) * 100).toFixed(1));
    const retGamble = parseFloat(((data.rpw / (data.retPnts - data.vsA)) * 100).toFixed(1));
    const vsA = parseFloat(((data.vsA / data.retPnts) * 100).toFixed(1));
    const ret1w = parseFloat(((data.ret1w / data.ret1st) * 100).toFixed(1));
    const ret2w = parseFloat(((data.ret2w / data.ret2nd) * 100).toFixed(1));
    const wRet = parseFloat(((data.rpw / data.retPnts) * 100).toFixed(1));

    ldrbRow10.innerHTML = `
        <td><span>${playerId}</span></td>
        <td>${retFocus}</td>
        <td>${retReliable}</td>
        <td>${srvPressure}</td>
        <td>${retGamble}</td>
        <td>${vsA}</td>
        <td>${ret1w}</td>
        <td>${ret2w}</td>
        <td>${wRet}</td>
        <td>${parseFloat((data.bpgen / data.tSets).toFixed(1))}</td>
        <td>${parseFloat((data.bpcnv / data.tSets).toFixed(1))}</td>
        <td>${parseFloat(((data.bpcnv / data.bpgen) * 100).toFixed(1))}</td>
    `;

    ldrbStat10.appendChild(ldrbRow10);

    ldrbRow11.innerHTML = `
        <td><span>${playerId}</span></td>
        <td>${retFocus}</td>
        <td>${parseFloat((data.bpgen / data.tSets).toFixed(1))}</td>
        <td>${parseFloat((data.bpcnv / data.tSets).toFixed(1))}</td>
        <td>${parseFloat(((data.bpcnv / data.bpgen) * 100).toFixed(1))}</td>
    `;

    ldrbStat11.appendChild(ldrbRow11);

    ldrbRow12.innerHTML = `
        <td><span>${playerId}</span></td>
        <td>${retReliable}</td>
        <td>${retGamble}</td>
        <td>${vsA}</td>
        <td>${wRet}</td>
    `;

    ldrbStat12.appendChild(ldrbRow12);

    ldrbRow13.innerHTML = `
        <td><span>${playerId}</span></td>
        <td>${srvPressure}</td>
        <td>${ret1w}</td>
        <td>${ret2w}</td>
        <td>${wRet}</td>
    `;

    ldrbStat13.appendChild(ldrbRow13);


    const ldrbMain20 = document.querySelector('.ral-table');
    const ldrbSml21 = document.querySelector('.ral1-table');
    const ldrbSml22 = document.querySelector('.ral2-table');
    const ldrbSml23 = document.querySelector('.ral3-table');
    const ldrbStat20 = ldrbMain20.querySelector('tbody');
    const ldrbStat21 = ldrbSml21.querySelector('tbody');
    const ldrbStat22 = ldrbSml22.querySelector('tbody');
    const ldrbStat23 = ldrbSml23.querySelector('tbody');
    const ldrbRow20 = document.createElement('tr');
    const ldrbRow21 = document.createElement('tr');
    const ldrbRow22 = document.createElement('tr');
    const ldrbRow23 = document.createElement('tr');
    const effectiveness1 = parseFloat((((data.bpgen / data.bpfac) / (data.retPnts / data.srvPnts)) * 100).toFixed(1));
    const effectiveness2 = parseFloat((((data.bpcnv / data.bpsvd) / (data.retPnts / data.srvPnts)) * 100).toFixed(1));
    const nonAceSrv = parseFloat((((data.spw - data.aces) / (data.srvPnts - data.aces - data.dfs)) * 100).toFixed(1));
    const nonAceRet1 = parseFloat((((data.ret1w - data.vsA) / (data.retPnts - data.vsA)) * 100).toFixed(1));
    const pntsPset = parseFloat((data.totPnts / data.tSets).toFixed(1));
    const pntsPgame = parseFloat((data.totPnts / (data["Games Won"] + data["Games Won"])).toFixed(1));
    const vsFree = parseFloat((((data.vsA + data.dfs) / data.totPnts) * 100).toFixed(1));
    const pntDist = parseFloat((data.srvPnts / data.retPnts).toFixed(1));
    const bpDif = parseFloat(((data.bpcnv + data.bpsvd - data.bpfac) / data.tSets).toFixed(1));
    const chanceDif = parseFloat(((data.bpgen - data.bpfac) / data.tSets).toFixed(1));
    const gamePset = parseFloat(((data["Games Won"] + data["Games Won"]) / data.tSets).toFixed(1));
    const setPmat = parseFloat((data.tSets / data.match).toFixed(1));

    ldrbRow20.innerHTML = `
        <td><span>${playerId}</span></td>
        <td>${effectiveness1}</td>
        <td>${effectiveness2}</td>
        <td>${nonAceSrv}</td>
        <td>${nonAceRet1}</td>
        <td>${vsFree}</td>
        <td>${bpDif}</td>
        <td>${chanceDif}</td>
        <td>${pntDist}</td>
        <td>${pntsPset}</td>
        <td>${pntsPgame}</td>
        <td>${gamePset}</td>
        <td>${setPmat}</td>
    `;

    ldrbStat20.appendChild(ldrbRow20);

    ldrbRow21.innerHTML = `
        <td><span>${playerId}</span></td>
        <td>${effectiveness1}</td>
        <td>${effectiveness2}</td>
        <td>${vsFree}</td>
        <td>${pntDist}</td>
    `;

    ldrbStat21.appendChild(ldrbRow21);

    ldrbRow22.innerHTML = `
        <td><span>${playerId}</span></td>
        <td>${nonAceSrv}</td>
        <td>${nonAceRet1}</td>
        <td>${bpDif}</td>
        <td>${chanceDif}</td>
    `;

    ldrbStat22.appendChild(ldrbRow22);

    ldrbRow23.innerHTML = `
        <td><span>${playerId}</span></td>
        <td>${pntsPset}</td>
        <td>${pntsPgame}</td>
        <td>${gamePset}</td>
        <td>${setPmat}</td>
    `;

    ldrbStat23.appendChild(ldrbRow23);


    const ldrbMain30 = document.querySelector('.mat1-table');
    const ldrbMain31 = document.querySelector('.mat2-table');
    const ldrbStat30 = ldrbMain30.querySelector('tbody');
    const ldrbStat31 = ldrbMain31.querySelector('tbody');
    const ldrbRow30 = document.createElement('tr');
    const ldrbRow31 = document.createElement('tr');

    ldrbRow30.innerHTML = `
        <td><span>${playerId}</span></td>
        <td>${parseFloat(((data.tpw / data.totPnts) * 100).toFixed(1))}</td>
        <td>${parseFloat(((data.aces / data.srvPnts) * 100).toFixed(1))}</td>
        <td>${parseFloat(((data.dfs / data.srvPnts) * 100).toFixed(1))}</td>
        <td>${parseFloat(((data.srv1pnts / data.srvPnts) * 100).toFixed(1))}</td>
        <td>${parseFloat(((data.srv1w / data.srv1pnts) * 100).toFixed(1))}</td>
        <td>${parseFloat(((data.srv2w / data.srv2pnts) * 100).toFixed(1))}</td>
        <td>${parseFloat(((data.bpfac / data.tSets)).toFixed(1))}</td>
        <td>${parseFloat((((data.bpfac - data.bpsvd) / data.tSets)).toFixed(1))}</td>
        <td>${parseFloat(((data.bpgen / data.tSets)).toFixed(1))}</td>
        <td>${parseFloat(((data.bpcnv / data.tSets)).toFixed(1))}</td>
        <td>${parseFloat(((data.spw / data.srvPnts) * 100).toFixed(1))}</td>
        <td>${parseFloat(((data.rpw / data.retPnts) * 100).toFixed(1))}</td>
        <td>${parseFloat(((data.ret1w / data.ret1st) * 100).toFixed(1))}</td>
        <td>${parseFloat(((data.ret2w / data.ret2nd) * 100).toFixed(1))}</td>
        <td>${parseFloat(((data.aces / data.tSets)).toFixed(1))}</td>
        <td>${parseFloat(((data.dfs / data.tSets)).toFixed(1))}</td>
    `;

    ldrbStat30.appendChild(ldrbRow30);

    ldrbRow31.innerHTML = `
        <td><span>${playerId}</span></td>
        <td>${data.match}</td>
        <td>${data.win}</td>
        <td>${data.loss}</td>
        <td>${parseFloat(((data.win / data.match) * 100).toFixed(1))}</td>
        <td>${data["Sets Won"]}</td>
        <td>${data["Sets Lost"]}</td>
        <td>${parseFloat(((data["Sets Won"] / (data["Sets Won"] + data["Sets Lost"])) * 100).toFixed(1))}</td>
        <td>${data["Games Won"]}</td>
        <td>${data["Games Lost"]}</td>
        <td>${parseFloat(((data["Games Won"] / (data["Games Won"] + data["Games Lost"])) * 100).toFixed(1))}</td>
        <td>${data["TB Won"]}</td>
        <td>${data["TB Lost"]}</td>
        <td>${parseFloat(((data["TB Won"] / (data["TB Won"] + data["TB Lost"])) * 100).toFixed(1))}</td>
        <td>${data.trnts}</td>
    `;

    ldrbStat31.appendChild(ldrbRow31);

}


function buildPageP2(name, data) {  
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


    const ldrbMaini1 = document.querySelector('.high1-table');
    const ldrbMaini2 = document.querySelector('.high2-table');
    const ldrbStati1 = ldrbMaini1.querySelector('tbody');
    const ldrbStati2 = ldrbMaini2.querySelector('tbody');
    const ldrbRowii1 = document.createElement('tr');
    const ldrbRowii2 = document.createElement('tr');

    ldrbRowii1.innerHTML = `
        <td><span>${name}</span></td>
        <td>${data}</td>
    `;
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



// Helper function to extract team name from URL (`p=` query param)
function extractTeamName(url) {
    const match = url.match(/[?&]p=([^&]+)/);
    return match ? decodeURIComponent(match[1]) : null;
}

function normalizeTeamName(name) {
    return name.toLowerCase().replace(/\s+/g, '');
}



// Main async function
async function loadAndProcessStats() {
    try {
        // Step 1: Load both JSON files
        const [dataRes, teamRes] = await Promise.all([
            fetch('https://raw.githubusercontent.com/einani/adIn-data/main/data/top150Stat1025.json'),
            fetch('https://raw.githubusercontent.com/einani/adIn-data/main/data/update_stats1025.json')
        ]);

        if (!dataRes.ok || !teamRes.ok) {
            throw new Error('Failed to fetch data or team list.');
        }

        const [data, validTeamsObj] = await Promise.all([
            dataRes.json(),
            teamRes.json()
        ]);

        const normalizedTeamMap = {};
        for (const teamName of Object.keys(validTeamsObj)) {
            const normalized = normalizeTeamName(teamName);
            normalizedTeamMap[normalized] = teamName;
        }

        const statBuckets = {};

        for (const urlKey in data) {
            const rawTeamName = extractTeamName(urlKey);
            if (!rawTeamName) continue;

            const normalized = normalizeTeamName(rawTeamName);
            const originalTeamName = normalizedTeamMap[normalized];

            if (!originalTeamName) {
                console.warn(`Skipping unknown player from URL: ${urlKey}`);
                continue;
            }

            const entries = data[urlKey];
            for (const entry of entries) {
                // Calculate adjusted serve efficiency if all inputs exist
                if (entry.hasOwnProperty('1stIn') && entry.hasOwnProperty('1stWin') && entry.hasOwnProperty('2ndWin')) {
                    const firstIn = parseFloat(entry['1stIn']);
                    const firstWin = parseFloat(entry['1stWin']);
                    const secondWin = parseFloat(entry['2ndWin']);

                    // Ensure all components are valid numbers
                    if (!isNaN(firstIn) && !isNaN(firstWin) && !isNaN(secondWin)) {
                        const adjServeEff = (((firstIn * firstWin) / 100 + ((100 - firstIn) * secondWin) / 100).toFixed(1));

                        if (!statBuckets['wSrv']) statBuckets['wSrv'] = [];
                        statBuckets['wSrv'].push({
                            value: adjServeEff,
                            team: originalTeamName
                        });
                    }
                }

                for (const stat in entry) {
                    const value = entry[stat];

                    if (stat === 'bpcnv') {
                        const parts = typeof value === 'string' ? value.split('/') : [];
                        const made = parseFloat(parts[0]);
                        const total = parseFloat(parts[1]);

                        // Store as two separate stats: e.g., "bpcnv_made" and "bpcnv_total"
                        const madeKey = `bpcnv`;
                        const totalKey = `bpgen`;

                        if (!statBuckets[madeKey]) statBuckets[madeKey] = [];
                        if (!statBuckets[totalKey]) statBuckets[totalKey] = [];

                        statBuckets[madeKey].push({
                            value: isNaN(made) ? -1000.0 : made,
                            team: originalTeamName
                        });

                        statBuckets[totalKey].push({
                            value: isNaN(total) ? -1000.0 : total,
                            team: originalTeamName
                        });
                    } else if (stat === 'bpsvd') {
                        const parts = typeof value === 'string' ? value.split('/') : [];
                        const made = parseFloat(parts[0]);
                        const total = parseFloat(parts[1]);

                        // Store as two separate stats: e.g., "bpcnv_made" and "bpcnv_total"
                        const madeKey = `bpsvd`;
                        const totalKey = `bpfac`;

                        if (!statBuckets[madeKey]) statBuckets[madeKey] = [];
                        if (!statBuckets[totalKey]) statBuckets[totalKey] = [];

                        statBuckets[madeKey].push({
                            value: isNaN(made) ? -1000.0 : made,
                            team: originalTeamName
                        });

                        statBuckets[totalKey].push({
                            value: isNaN(total) ? -1000.0 : total,
                            team: originalTeamName
                        });
                    } else {
                        // Default case: push as-is
                        if (!statBuckets[stat]) statBuckets[stat] = [];
                        statBuckets[stat].push({
                            value: value,
                            team: originalTeamName
                        });
                    }
                }
            }
        }

        // Step 3: Sort each stat and get top 15
        const globalTopStats = {};

        for (const stat in statBuckets) {
            // Map all values to floats, using -1000.0 as fallback for non-numeric entries
            const converted = statBuckets[stat].map(item => {
                const floatVal = parseFloat(item.value);
                return {
                    value: isNaN(floatVal) ? -1000.0 : floatVal,
                    team: item.team
                };
            });

            const converted2 = statBuckets[stat].map(item => {
                const floatVal = parseFloat(item.value);
                return {
                    value: isNaN(floatVal) ? -1000.0 : 100 - floatVal,
                    team: item.team
                };
            });

            // Sort and take top 10
            globalTopStats[stat] = converted
                .sort((a, b) => b.value - a.value)
                .slice(0, 10);

            if (stat === '1stIn') {
                globalTopStats['1stOut'] = converted2.sort((a, b) => b.value - a.value).slice(0, 10); // bottom 10
            }

            if (stat === 'rpw') {
                globalTopStats['rpl'] = converted2.sort((a, b) => b.value - a.value).slice(0, 10); // bottom 10
            }
        }



        // Step 4: Display in the browser
        // document.getElementById('output').textContent = JSON.stringify(globalTopStats, null, 2);
        console.log(globalTopStats);

        const ldrbMaini1 = document.querySelector('.high1-table');
        const ldrbMaini2 = document.querySelector('.high2-table');
        const ldrbStati1 = ldrbMaini1.querySelector('tbody');
        const ldrbStati2 = ldrbMaini2.querySelector('tbody');
        const ldrbMaini3 = document.querySelector('.high3-table');
        const ldrbMaini4 = document.querySelector('.high4-table');
        const ldrbStati3 = ldrbMaini3.querySelector('tbody');
        const ldrbStati4 = ldrbMaini4.querySelector('tbody');
        const ldrbMaini5 = document.querySelector('.high5-table');
        const ldrbMaini6 = document.querySelector('.high6-table');
        const ldrbStati5 = ldrbMaini5.querySelector('tbody');
        const ldrbStati6 = ldrbMaini6.querySelector('tbody');
        const ldrbMaini7 = document.querySelector('.high7-table');
        const ldrbMaini8 = document.querySelector('.high8-table');
        const ldrbStati7 = ldrbMaini7.querySelector('tbody');
        const ldrbStati8 = ldrbMaini8.querySelector('tbody');
        const ldrbMaini9 = document.querySelector('.high9-table');
        const ldrbMaini10 = document.querySelector('.high10-table');
        const ldrbStati9 = ldrbMaini9.querySelector('tbody');
        const ldrbStati10 = ldrbMaini10.querySelector('tbody');
        const ldrbMaini11 = document.querySelector('.high11-table');
        const ldrbMaini12 = document.querySelector('.high12-table');
        const ldrbStati11 = ldrbMaini11.querySelector('tbody');
        const ldrbStati12 = ldrbMaini12.querySelector('tbody');
        const ldrbMaini13 = document.querySelector('.high13-table');
        const ldrbMaini14 = document.querySelector('.high14-table');
        const ldrbStati13 = ldrbMaini13.querySelector('tbody');
        const ldrbStati14 = ldrbMaini14.querySelector('tbody');
        const ldrbMaini15 = document.querySelector('.high15-table');
        const ldrbMaini16 = document.querySelector('.high16-table');
        const ldrbStati15 = ldrbMaini15.querySelector('tbody');
        const ldrbStati16 = ldrbMaini16.querySelector('tbody');
        const ldrbMaini17 = document.querySelector('.high17-table');
        const ldrbMaini18 = document.querySelector('.high18-table');
        const ldrbStati17 = ldrbMaini17.querySelector('tbody');
        const ldrbStati18 = ldrbMaini18.querySelector('tbody');

        const da0 = globalTopStats.tpw;
        for (i = 0; i < da0.length; i++) {
            const da00 = da0[i];
            const ldrbRowii1 = document.createElement('tr');
            ldrbRowii1.innerHTML = `
                <td><span>${da00.team}</span></td>
                <td>${da00.value}</td>
            `;
            ldrbStati1.appendChild(ldrbRowii1);
        }

        const da1 = globalTopStats["A%"];
        for (i = 0; i < da1.length; i++) {
            const da01 = da1[i];
            const ldrbRowii1 = document.createElement('tr');
            ldrbRowii1.innerHTML = `
                <td><span>${da01.team}</span></td>
                <td>${da01.value}</td>
            `;
            ldrbStati2.appendChild(ldrbRowii1);
        }

        const da2 = globalTopStats["DF%"];
        for (i = 0; i < da2.length; i++) {
            const da02 = da2[i];
            const ldrbRowii1 = document.createElement('tr');
            ldrbRowii1.innerHTML = `
                <td><span>${da02.team}</span></td>
                <td>${da02.value}</td>
            `;
            ldrbStati3.appendChild(ldrbRowii1);
        }

        const da3 = globalTopStats["1stIn"];
        for (i = 0; i < da3.length; i++) {
            const da03 = da3[i];
            const ldrbRowii1 = document.createElement('tr');
            ldrbRowii1.innerHTML = `
                <td><span>${da03.team}</span></td>
                <td>${da03.value}</td>
            `;
            ldrbStati4.appendChild(ldrbRowii1);
        }

        const da4 = globalTopStats.ace;
        for (i = 0; i < da4.length; i++) {
            const da04 = da4[i];
            const ldrbRowii1 = document.createElement('tr');
            ldrbRowii1.innerHTML = `
                <td><span>${da04.team}</span></td>
                <td>${da04.value}</td>
            `;
            ldrbStati5.appendChild(ldrbRowii1);
        }

        const da5 = globalTopStats.df;
        for (i = 0; i < da5.length; i++) {
            const da05 = da5[i];
            const ldrbRowii1 = document.createElement('tr');
            ldrbRowii1.innerHTML = `
                <td><span>${da05.team}</span></td>
                <td>${da05.value}</td>
            `;
            ldrbStati6.appendChild(ldrbRowii1);
        }

        const da6 = globalTopStats.bpfac;
        for (i = 0; i < da6.length; i++) {
            const da06 = da6[i];
            const ldrbRowii1 = document.createElement('tr');
            ldrbRowii1.innerHTML = `
                <td><span>${da06.team}</span></td>
                <td>${da06.value}</td>
            `;
            ldrbStati7.appendChild(ldrbRowii1);
        }

        const da7 = globalTopStats.bpsvd;
        for (i = 0; i < da7.length; i++) {
            const da07 = da7[i];
            const ldrbRowii1 = document.createElement('tr');
            ldrbRowii1.innerHTML = `
                <td><span>${da07.team}</span></td>
                <td>${da07.value}</td>
            `;
            ldrbStati8.appendChild(ldrbRowii1);
        }

        const da8 = globalTopStats.bpgen;
        for (i = 0; i < da8.length; i++) {
            const da08 = da8[i];
            const ldrbRowii1 = document.createElement('tr');
            ldrbRowii1.innerHTML = `
                <td><span>${da08.team}</span></td>
                <td>${da08.value}</td>
            `;
            ldrbStati9.appendChild(ldrbRowii1);
        }

        const da9 = globalTopStats.bpcnv;
        for (i = 0; i < da9.length; i++) {
            const da09 = da9[i];
            const ldrbRowii1 = document.createElement('tr');
            ldrbRowii1.innerHTML = `
                <td><span>${da09.team}</span></td>
                <td>${da09.value}</td>
            `;
            ldrbStati10.appendChild(ldrbRowii1);
        }
        
        const da10 = globalTopStats.wSrv;
        for (i = 0; i < da10.length; i++) {
            const da010 = da10[i];
            const ldrbRowii1 = document.createElement('tr');
            ldrbRowii1.innerHTML = `
                <td><span>${da010.team}</span></td>
                <td>${da010.value}</td>
            `;
            ldrbStati11.appendChild(ldrbRowii1);
        }
        
        const da11 = globalTopStats.rpw;
        for (i = 0; i < da11.length; i++) {
            const da011 = da11[i];
            const ldrbRowii1 = document.createElement('tr');
            ldrbRowii1.innerHTML = `
                <td><span>${da011.team}</span></td>
                <td>${da011.value}</td>
            `;
            ldrbStati12.appendChild(ldrbRowii1);
        }

        const da12 = globalTopStats.v1st;
        for (i = 0; i < da12.length; i++) {
            const da012 = da12[i];
            const ldrbRowii1 = document.createElement('tr');
            ldrbRowii1.innerHTML = `
                <td><span>${da012.team}</span></td>
                <td>${da012.value}</td>
            `;
            ldrbStati13.appendChild(ldrbRowii1);
        }

        const da13 = globalTopStats.v2nd;
        for (i = 0; i < da13.length; i++) {
            const da013 = da13[i];
            const ldrbRowii1 = document.createElement('tr');
            ldrbRowii1.innerHTML = `
                <td><span>${da013.team}</span></td>
                <td>${da013.value}</td>
            `;
            ldrbStati14.appendChild(ldrbRowii1);
        }

        const da14 = globalTopStats["1stOut"];
        for (i = 0; i < da14.length; i++) {
            const da014 = da14[i];
            const ldrbRowii1 = document.createElement('tr');
            ldrbRowii1.innerHTML = `
                <td><span>${da014.team}</span></td>
                <td>${da014.value}</td>
            `;
            ldrbStati15.appendChild(ldrbRowii1);
        }

        const da15 = globalTopStats.rpl;
        for (i = 0; i < da15.length; i++) {
            const da015 = da15[i];
            const ldrbRowii1 = document.createElement('tr');
            ldrbRowii1.innerHTML = `
                <td><span>${da015.team}</span></td>
                <td>${da015.value}</td>
            `;
            ldrbStati16.appendChild(ldrbRowii1);
        }

        const da16 = globalTopStats.va;
        for (i = 0; i < da16.length; i++) {
            const da016 = da16[i];
            const ldrbRowii1 = document.createElement('tr');
            ldrbRowii1.innerHTML = `
                <td><span>${da016.team}</span></td>
                <td>${da016.value}</td>
            `;
            ldrbStati17.appendChild(ldrbRowii1);
        }

        const da17 = globalTopStats["vA%"];
        for (i = 0; i < da17.length; i++) {
            const da017 = da17[i];
            const ldrbRowii1 = document.createElement('tr');
            ldrbRowii1.innerHTML = `
                <td><span>${da017.team}</span></td>
                <td>${da017.value}</td>
            `;
            ldrbStati18.appendChild(ldrbRowii1);
        }

    } catch (err) {
        console.error('Error:', err);
        // document.getElementById('output').textContent = 'An error occurred while loading data.';
    }
}









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
// const hoverInfo = document.querySelector('.pic-hover-info');
// const infoIcon = document.getElementById('pic-credit');

// infoIcon.addEventListener('mouseenter', () => {
//     hoverInfo.style.display = 'flex';
//     hoverInfo.style.justifyContent = 'center';
//     hoverInfo.style.alignItems = 'center';
// });

// infoIcon.addEventListener('mousemove', (e) => {
//     hoverInfo.style.left = e.pageX + 10 + 'px';
//     hoverInfo.style.top = e.pageY - 40 + 'px';
// });

// infoIcon.addEventListener('mouseleave', () => {
//     hoverInfo.style.display = 'none';
// });


const table0 = document.querySelector('.ace-table');
const headers0 = table0.querySelectorAll("th");
const table1 = document.querySelector('.ace1-table');
const headers1 = table1.querySelectorAll("th");
const table2 = document.querySelector('.ace2-table');
const headers2 = table2.querySelectorAll("th");
const table3 = document.querySelector('.ace3-table');
const headers3 = table3.querySelectorAll("th");

const table00 = document.querySelector('.ret-table');
const headers00 = table00.querySelectorAll("th");
const table10 = document.querySelector('.ret1-table');
const headers10 = table10.querySelectorAll("th");
const table20 = document.querySelector('.ret2-table');
const headers20 = table20.querySelectorAll("th");
const table30 = document.querySelector('.ret3-table');
const headers30 = table30.querySelectorAll("th");

const table000 = document.querySelector('.ral-table');
const headers000 = table000.querySelectorAll("th");
const table100 = document.querySelector('.ral1-table');
const headers100 = table100.querySelectorAll("th");
const table200 = document.querySelector('.ral2-table');
const headers200 = table200.querySelectorAll("th");
const table300 = document.querySelector('.ral3-table');
const headers300 = table300.querySelectorAll("th");

const table1000 = document.querySelector('.mat1-table');
const headers1000 = table1000.querySelectorAll("th");
const table2000 = document.querySelector('.mat2-table');
const headers2000 = table2000.querySelectorAll("th");

let sortDirection = {}; // To remember sort direction per column

function sortTableByColumn(columnIndex, direction, table, headers) {
    const tbody = table.querySelector("tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));

    sortDirection[columnIndex] = direction;

    rows.sort((a, b) => {
        const aText = a.children[columnIndex].textContent.trim();
        const bText = b.children[columnIndex].textContent.trim();

        const aVal = isNaN(aText) ? aText : parseFloat(aText);
        const bVal = isNaN(bText) ? bText : parseFloat(bText);

        if (aVal < bVal) return direction === "asc" ? -1 : 1;
        if (aVal > bVal) return direction === "asc" ? 1 : -1;
        return 0;
    });

    // Re-append sorted rows
    rows.forEach(row => tbody.appendChild(row));

    // Update header opacity
    headers.forEach((th, idx) => {
        th.style.opacity = idx === columnIndex ? "0.9" : "0.65";
    });
}

// Attach click handlers for interactive sorting
headers0.forEach((th, columnIndex) => {
    th.style.opacity = "0.65"; // Set initial default opacity

    th.addEventListener("click", () => {
        const direction = sortDirection[columnIndex] === "asc" ? "desc" : "asc";
        sortTableByColumn(columnIndex, direction, table0, headers0);
    });
});

headers1.forEach((th, columnIndex) => {
    th.style.opacity = "0.65"; // Set initial default opacity

    th.addEventListener("click", () => {
        const direction = sortDirection[columnIndex] === "asc" ? "desc" : "asc";
        sortTableByColumn(columnIndex, direction, table1, headers1);
    });
});

headers2.forEach((th, columnIndex) => {
    th.style.opacity = "0.65"; // Set initial default opacity

    th.addEventListener("click", () => {
        const direction = sortDirection[columnIndex] === "asc" ? "desc" : "asc";
        sortTableByColumn(columnIndex, direction, table2, headers2);
    });
});

headers3.forEach((th, columnIndex) => {
    th.style.opacity = "0.65"; // Set initial default opacity

    th.addEventListener("click", () => {
        const direction = sortDirection[columnIndex] === "asc" ? "desc" : "asc";
        sortTableByColumn(columnIndex, direction, table3, headers3);
    });
});

headers00.forEach((th, columnIndex) => {
    th.style.opacity = "0.65"; // Set initial default opacity

    th.addEventListener("click", () => {
        const direction = sortDirection[columnIndex] === "asc" ? "desc" : "asc";
        sortTableByColumn(columnIndex, direction, table00, headers00);
    });
});

headers10.forEach((th, columnIndex) => {
    th.style.opacity = "0.65"; // Set initial default opacity

    th.addEventListener("click", () => {
        const direction = sortDirection[columnIndex] === "asc" ? "desc" : "asc";
        sortTableByColumn(columnIndex, direction, table10, headers10);
    });
});

headers20.forEach((th, columnIndex) => {
    th.style.opacity = "0.65"; // Set initial default opacity

    th.addEventListener("click", () => {
        const direction = sortDirection[columnIndex] === "asc" ? "desc" : "asc";
        sortTableByColumn(columnIndex, direction, table20, headers20);
    });
});

headers30.forEach((th, columnIndex) => {
    th.style.opacity = "0.65"; // Set initial default opacity

    th.addEventListener("click", () => {
        const direction = sortDirection[columnIndex] === "asc" ? "desc" : "asc";
        sortTableByColumn(columnIndex, direction, table30, headers30);
    });
});

headers000.forEach((th, columnIndex) => {
    th.style.opacity = "0.65"; // Set initial default opacity

    th.addEventListener("click", () => {
        const direction = sortDirection[columnIndex] === "asc" ? "desc" : "asc";
        sortTableByColumn(columnIndex, direction, table000, headers000);
    });
});

headers100.forEach((th, columnIndex) => {
    th.style.opacity = "0.65"; // Set initial default opacity

    th.addEventListener("click", () => {
        const direction = sortDirection[columnIndex] === "asc" ? "desc" : "asc";
        sortTableByColumn(columnIndex, direction, table100, headers100);
    });
});

headers200.forEach((th, columnIndex) => {
    th.style.opacity = "0.65"; // Set initial default opacity

    th.addEventListener("click", () => {
        const direction = sortDirection[columnIndex] === "asc" ? "desc" : "asc";
        sortTableByColumn(columnIndex, direction, table200, headers200);
    });
});

headers300.forEach((th, columnIndex) => {
    th.style.opacity = "0.65"; // Set initial default opacity

    th.addEventListener("click", () => {
        const direction = sortDirection[columnIndex] === "asc" ? "desc" : "asc";
        sortTableByColumn(columnIndex, direction, table300, headers300);
    });
});

headers1000.forEach((th, columnIndex) => {
    th.style.opacity = "0.65"; // Set initial default opacity

    th.addEventListener("click", () => {
        const direction = sortDirection[columnIndex] === "asc" ? "desc" : "asc";
        sortTableByColumn(columnIndex, direction, table1000, headers1000);
    });
});

headers2000.forEach((th, columnIndex) => {
    th.style.opacity = "0.65"; // Set initial default opacity

    th.addEventListener("click", () => {
        const direction = sortDirection[columnIndex] === "asc" ? "desc" : "asc";
        sortTableByColumn(columnIndex, direction, table2000, headers2000);
    });
});




// FULL SCREEN AND MINIMIZER FOR TABLES
const smallLdrb = document.querySelectorAll('.ldrb-inv');
const bigLdrb = document.querySelectorAll('.ldrb-full');
const fullScreen = document.querySelectorAll('.full');
fullScreen.forEach((ic, index) => {
    ic.addEventListener("click", () => {
        smallLdrb.forEach((ld, ind) => {
            ld.style.display = "none";
        });
        bigLdrb.forEach((ld, ind) => {
            ld.style.display = "flex";
        });
    });
});

const minScreen = document.querySelectorAll('.mini');
minScreen.forEach((ic, index) => {
    ic.addEventListener("click", () => {
        smallLdrb.forEach((ld, ind) => {
            ld.style.display = "flex";
        });
        bigLdrb.forEach((ld, ind) => {
            ld.style.display = "none";
        });
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





const ldrbView = document.querySelector('.ldrb-tab');
let lefrigind = 0;
const leftBut = document.getElementById('data-left');
const rightBut = document.getElementById('data-right');
leftBut.addEventListener("click", () => {
    if (lefrigind > 0) {
        lefrigind = lefrigind - 1;
    } else {
        lefrigind = lefrigind;
    }
    ldrbView.style.transform = `translateX(${-80 * lefrigind}vw)`;
});
rightBut.addEventListener("click", () => {
    if (lefrigind < 2) {
        lefrigind = lefrigind + 1;
    } else {
        lefrigind = lefrigind;
    }
    ldrbView.style.transform = `translateX(${-80 * lefrigind}vw)`;
});

const ldrbView2 = document.querySelector('.ldrb-cls');
let lefrigind2 = 0;
const leftBut2 = document.getElementById('data-lef');
const rightBut2 = document.getElementById('data-righ');
leftBut2.addEventListener("click", () => {
    if (lefrigind2 > 0) {
        lefrigind2 = lefrigind2 - 1;
    } else {
        lefrigind2 = lefrigind2;
    }
    ldrbView2.style.transform = `translateX(${-80 * lefrigind2}vw)`;
});
rightBut2.addEventListener("click", () => {
    if (lefrigind2 < 1) {
        lefrigind2 = lefrigind2 + 1;
    } else {
        lefrigind2 = lefrigind2;
    }
    ldrbView2.style.transform = `translateX(${-80 * lefrigind2}vw)`;
});

const ldrbView3 = document.querySelector('.ldrb-high');
let lefrigind3 = 0;
const leftBut3 = document.getElementById('data-le');
const rightBut3 = document.getElementById('data-ri');
leftBut3.addEventListener("click", () => {
    if (lefrigind3 > 0) {
        lefrigind3 = lefrigind3 - 1;
    } else {
        lefrigind3 = lefrigind3;
    }
    ldrbView3.style.transform = `translateX(${-80 * lefrigind3}vw)`;
});
rightBut3.addEventListener("click", () => {
    if (lefrigind3 < 2) {
        lefrigind3 = lefrigind3 + 1;
    } else {
        lefrigind3 = lefrigind3;
    }
    ldrbView3.style.transform = `translateX(${-80 * lefrigind3}vw)`;
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
// const toggle = document.getElementById("seasonToggle");
// toggle.addEventListener("click", (e) => {
//     if (e.target.tagName === 'SPAN') {
//     toggle.querySelectorAll("span").forEach(s => s.classList.remove("table-active"));
//     e.target.classList.add("table-active");
//     const type = e.target.getAttribute("data-type");
//     console.log("Switched to:", type); // Placeholder for data update
//     }
// });

// document.getElementById("surfaceSelect").addEventListener("change", (e) => {
//     const surface = e.target.value;
//     console.log("Surface selected:", surface); // Placeholder for data filtering
// });



// COLLAPSE PLAYER PIC FUNCTION
// const colPic = document.getElementById("togtog");
// const playPic = document.getElementById("togDis");
// const colIcon = document.getElementById("close-pic");
// const opeIcon = document.getElementById("open-pic");
// let picCol = false; // Track current state

// colPic.addEventListener("click", (e) => {
//     if (picCol) {
//         playPic.style.display = "none";
//         colIcon.style.display = "none";
//         opeIcon.style.display = "flex";
//     }
//     else {
//         playPic.style.display = "flex";
//         colIcon.style.display = "flex";
//         opeIcon.style.display = "none";
//     }
//     picCol = !picCol; // Flip state
// });







