// Extract the tournament ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const tournamentId = urlParams.get('id');

// if (tournamentId) {
//     // Fetch tournament data from the JSON file
//     // fetchTournamentData(tournamentId);
//     fetchInOrder(tournamentId);
//     setUpDraw();
//     setUpMap();
// }

async function main() {
    if (tournamentId) {
        await fetchInOrder(tournamentId);
        setUpDraw();
    }
}

main();





async function fetchInOrder(tournamentId) {
    try {
        // First fetch: try3_normalized.json
        const response1 = await fetch('data/try3_normalized.json');
        const datab = await response1.json();

        if (tournamentId in datab) {
            const tournamentDatab = datab[tournamentId];
            createFeaturedTournament(tournamentDatab);

            const drawString = tournamentDatab.Draw;
            const drawSize = drawString.match(/(\d+)\s*S/);

            if (drawSize) {
                const singlesDraw = Number(drawSize[1]);
                const forDr = 2 ** Math.ceil(Math.log2(singlesDraw));
                createTournWrapper(forDr);
            } else {
                console.error("No match found in draw string.");
            }
        } else {
            console.error('Featured tournament not found in try3_normalized.json');
        }

        // Second fetch: edit2_draws.json
        const response2 = await fetch('data/update_draws1025.json');
        const data = await response2.json();
        const response12 = await fetch('data/incomplete_draws2024.json');
        const data1 = await response12.json();

        if (tournamentId in data) {
            const tournamentData = data[tournamentId];
            displayTournament(tournamentId, tournamentData);

            // Third fetch (only if second succeeds): geneva_scores.json
            const response3 = await fetch('data/update_scores1025.json');
            const scoresDataRaw = await response3.json();
            if (tournamentId in scoresDataRaw) {
                const scoresData = scoresDataRaw[tournamentId];
                populateScores(scoresData);
            }

        } else if (tournamentId in data1) {
            const tournamentData = data1[tournamentId];
            displayTournament(tournamentId, tournamentData);

            // Third fetch (only if second succeeds): geneva_scores.json
            const response3 = await fetch('data/incomplete_scores2024.json');
            const scoresDataRaw = await response3.json();
            const scoresData = scoresDataRaw[tournamentId];
            populateScores(scoresData);

        } else {
            console.error('Tournament not found in edit2_draws.json');
        }


        const response3 = await fetch('data/top150Stat.json');
        const dataj = await response3.json();
        const seenPlayers = new Set();

        for (const [key, value] of Object.entries(dataj)) {
            const params = new URLSearchParams(key.split('?')[1]); // get the query string part
            const player = params.get('p');
            if (player && !seenPlayers.has(player)) {
                seenPlayers.add(player); // mark as seen
                buildPageP3(dataj, player); // call once per unique player
            }
        }


        sortMatches();

    } catch (error) {
        console.error('Error in tournament data flow:', error);
    }
}




function populateScores(scoresData) {    
    const carusu = document.querySelector('.b-caru');
    const a1 = document.querySelector('.pd0');
    const b1 = document.querySelector('.pd1');
    const b2 = document.querySelector('.pd2');
    const b3 = document.querySelector('.pd3');
    const b4 = document.querySelector('.pd4');
    const b5 = document.querySelector('.pd5');
    const b6 = document.querySelector('.pd6');
    const b7 = document.querySelector('.pd7');
    const b8 = document.querySelector('.pd8');
    const a2 = document.querySelector('.pd00');
    const a3 = document.querySelector('.pd01');
    const a4 = document.querySelector('.pd000');
    const a5 = document.querySelector('.pd001');
    const a6 = document.querySelector('.pd002');
    const a7 = document.querySelector('.pd003');

    if (b8) {
        // R1
        const round1 = b1.querySelector('.r1');
        const matches1 = round1.querySelectorAll('.match');

        matches1.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round128_scores'];

            scoreDivs[0].textContent = matchScores[index*2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
        });

        const round2 = b2.querySelector('.r1');
        const matches2 = round2.querySelectorAll('.match');

        matches2.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round128_scores'];

            scoreDivs[0].textContent = matchScores[index*2+16].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+17].join(' ');
        });

        const round3 = b3.querySelector('.r1');
        const matches3 = round3.querySelectorAll('.match');

        matches3.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round128_scores'];

            scoreDivs[0].textContent = matchScores[index*2+32].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+33].join(' ');
        });

        const round4 = b4.querySelector('.r1');
        const matches4 = round4.querySelectorAll('.match');

        matches4.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round128_scores'];

            scoreDivs[0].textContent = matchScores[index*2+48].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+49].join(' ');
        });

        const round5 = b5.querySelector('.r1');
        const matches5 = round5.querySelectorAll('.match');

        matches5.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round128_scores'];

            scoreDivs[0].textContent = matchScores[index*2+64].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+65].join(' ');
        });

        const round6 = b6.querySelector('.r1');
        const matches6 = round6.querySelectorAll('.match');

        matches6.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round128_scores'];

            scoreDivs[0].textContent = matchScores[index*2+80].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+81].join(' ');
        });

        const round7 = b7.querySelector('.r1');
        const matches7 = round7.querySelectorAll('.match');

        matches7.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round128_scores'];

            scoreDivs[0].textContent = matchScores[index*2+96].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+97].join(' ');
        });

        const round8 = b8.querySelector('.r1');
        const matches8 = round8.querySelectorAll('.match');

        matches8.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round128_scores'];

            scoreDivs[0].textContent = matchScores[index*2+112].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+113].join(' ');
        });


        // R2
        const round12 = b1.querySelector('.r2');
        const matches12 = round12.querySelectorAll('.match');

        matches12.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round64_scores'];

            scoreDivs[0].textContent = matchScores[index*2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
        });

        const round22 = b2.querySelector('.r2');
        const matches22 = round22.querySelectorAll('.match');

        matches22.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round64_scores'];

            scoreDivs[0].textContent = matchScores[index*2+8].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+9].join(' ');
        });

        const round32 = b3.querySelector('.r2');
        const matches32 = round32.querySelectorAll('.match');

        matches32.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round64_scores'];

            scoreDivs[0].textContent = matchScores[index*2+16].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+17].join(' ');
        });

        const round42 = b4.querySelector('.r2');
        const matches42 = round42.querySelectorAll('.match');

        matches42.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round64_scores'];

            scoreDivs[0].textContent = matchScores[index*2+24].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+25].join(' ');
        });

        const round52 = b5.querySelector('.r2');
        const matches52 = round52.querySelectorAll('.match');

        matches52.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round64_scores'];

            scoreDivs[0].textContent = matchScores[index*2+32].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+33].join(' ');
        });

        const round62 = b6.querySelector('.r2');
        const matches62 = round62.querySelectorAll('.match');

        matches62.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round64_scores'];

            scoreDivs[0].textContent = matchScores[index*2+40].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+41].join(' ');
        });

        const round72 = b7.querySelector('.r2');
        const matches72 = round72.querySelectorAll('.match');

        matches72.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round64_scores'];

            scoreDivs[0].textContent = matchScores[index*2+48].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+49].join(' ');
        });

        const round82 = b8.querySelector('.r2');
        const matches82 = round82.querySelectorAll('.match');

        matches82.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round64_scores'];

            scoreDivs[0].textContent = matchScores[index*2+56].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+57].join(' ');
        });

        const round92 = a4.querySelector('.r2');
        const matches92 = round92.querySelectorAll('.match');

        matches92.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round64_scores'];

            scoreDivs[0].textContent = matchScores[index*2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
        });

        const round102 = a5.querySelector('.r2');
        const matches102 = round102.querySelectorAll('.match');

        matches102.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round64_scores'];

            scoreDivs[0].textContent = matchScores[index*2+16].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+17].join(' ');
        });

        const round112 = a6.querySelector('.r2');
        const matches112 = round112.querySelectorAll('.match');

        matches112.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round64_scores'];

            scoreDivs[0].textContent = matchScores[index*2+32].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+33].join(' ');
        });

        const round122 = a7.querySelector('.r2');
        const matches122 = round122.querySelectorAll('.match');

        matches122.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round64_scores'];

            scoreDivs[0].textContent = matchScores[index*2+48].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+49].join(' ');
        });


        // R3
        const round13 = b1.querySelector('.r3');
        const matches13 = round13.querySelectorAll('.match');

        matches13.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round32_scores'];

            scoreDivs[0].textContent = matchScores[index*2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
        });

        const round23 = b2.querySelector('.r3');
        const matches23 = round23.querySelectorAll('.match');

        matches23.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round32_scores'];

            scoreDivs[0].textContent = matchScores[index*2+4].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+5].join(' ');
        });

        const round33 = b3.querySelector('.r3');
        const matches33 = round33.querySelectorAll('.match');

        matches33.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round32_scores'];

            scoreDivs[0].textContent = matchScores[index*2+8].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+9].join(' ');
        });

        const round43 = b4.querySelector('.r3');
        const matches43 = round43.querySelectorAll('.match');

        matches43.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round32_scores'];

            scoreDivs[0].textContent = matchScores[index*2+12].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+13].join(' ');
        });

        const round53 = b5.querySelector('.r3');
        const matches53 = round53.querySelectorAll('.match');

        matches53.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round32_scores'];

            scoreDivs[0].textContent = matchScores[index*2+16].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+17].join(' ');
        });

        const round63 = b6.querySelector('.r3');
        const matches63 = round63.querySelectorAll('.match');

        matches63.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round32_scores'];

            scoreDivs[0].textContent = matchScores[index*2+20].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+21].join(' ');
        });

        const round73 = b7.querySelector('.r3');
        const matches73 = round73.querySelectorAll('.match');

        matches73.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round32_scores'];

            scoreDivs[0].textContent = matchScores[index*2+24].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+25].join(' ');
        });

        const round83 = b8.querySelector('.r3');
        const matches83 = round83.querySelectorAll('.match');

        matches83.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round32_scores'];

            scoreDivs[0].textContent = matchScores[index*2+28].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+29].join(' ');
        });

        const round93 = a4.querySelector('.r3');
        const matches93 = round93.querySelectorAll('.match');

        matches93.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round32_scores'];

            scoreDivs[0].textContent = matchScores[index*2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
        });

        const round103 = a5.querySelector('.r3');
        const matches103 = round103.querySelectorAll('.match');

        matches103.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round32_scores'];

            scoreDivs[0].textContent = matchScores[index*2+8].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+9].join(' ');
        });

        const round113 = a6.querySelector('.r3');
        const matches113 = round113.querySelectorAll('.match');

        matches113.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round32_scores'];

            scoreDivs[0].textContent = matchScores[index*2+16].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+17].join(' ');
        });

        const round123 = a7.querySelector('.r3');
        const matches123 = round123.querySelectorAll('.match');

        matches123.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round32_scores'];

            scoreDivs[0].textContent = matchScores[index*2+24].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+25].join(' ');
        });

        const round133 = a2.querySelector('.r3');
        const matches133 = round133.querySelectorAll('.match');

        matches133.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round32_scores'];

            scoreDivs[0].textContent = matchScores[index*2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
        });

        const round143 = a3.querySelector('.r3');
        const matches143 = round143.querySelectorAll('.match');

        matches143.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round32_scores'];

            scoreDivs[0].textContent = matchScores[index*2+16].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+17].join(' ');
        });


        // R4
        const round14 = b1.querySelector('.r4');
        const matches14 = round14.querySelectorAll('.match');

        matches14.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round16_scores'];

            scoreDivs[0].textContent = matchScores[index*2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
        });

        const round24 = b2.querySelector('.r4');
        const matches24 = round24.querySelectorAll('.match');

        matches24.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round16_scores'];

            scoreDivs[0].textContent = matchScores[index*2+2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+3].join(' ');
        });

        const round34 = b3.querySelector('.r4');
        const matches34 = round34.querySelectorAll('.match');

        matches34.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round16_scores'];

            scoreDivs[0].textContent = matchScores[index*2+4].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+5].join(' ');
        });

        const round44 = b4.querySelector('.r4');
        const matches44 = round44.querySelectorAll('.match');

        matches44.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round16_scores'];

            scoreDivs[0].textContent = matchScores[index*2+6].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+7].join(' ');
        });

        const round54 = b5.querySelector('.r4');
        const matches54 = round54.querySelectorAll('.match');

        matches54.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round16_scores'];

            scoreDivs[0].textContent = matchScores[index*2+8].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+9].join(' ');
        });

        const round64 = b6.querySelector('.r4');
        const matches64 = round64.querySelectorAll('.match');

        matches64.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round16_scores'];

            scoreDivs[0].textContent = matchScores[index*2+10].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+11].join(' ');
        });

        const round74 = b7.querySelector('.r4');
        const matches74 = round74.querySelectorAll('.match');

        matches74.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round16_scores'];

            scoreDivs[0].textContent = matchScores[index*2+12].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+13].join(' ');
        });

        const round84 = b8.querySelector('.r4');
        const matches84 = round84.querySelectorAll('.match');

        matches84.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round16_scores'];

            scoreDivs[0].textContent = matchScores[index*2+14].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+15].join(' ');
        });

        const round94 = a4.querySelector('.r4');
        const matches94 = round94.querySelectorAll('.match');

        matches94.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round16_scores'];

            scoreDivs[0].textContent = matchScores[index*2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
        });

        const round104 = a5.querySelector('.r4');
        const matches104 = round104.querySelectorAll('.match');

        matches104.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round16_scores'];

            scoreDivs[0].textContent = matchScores[index*2+4].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+5].join(' ');
        });

        const round114 = a6.querySelector('.r4');
        const matches114 = round114.querySelectorAll('.match');

        matches114.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round16_scores'];

            scoreDivs[0].textContent = matchScores[index*2+8].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+9].join(' ');
        });

        const round124 = a7.querySelector('.r4');
        const matches124 = round124.querySelectorAll('.match');

        matches124.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round16_scores'];

            scoreDivs[0].textContent = matchScores[index*2+12].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+13].join(' ');
        });

        const round134 = a2.querySelector('.r4');
        const matches134 = round134.querySelectorAll('.match');

        matches134.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round16_scores'];

            scoreDivs[0].textContent = matchScores[index*2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
        });

        const round144 = a3.querySelector('.r4');
        const matches144 = round144.querySelectorAll('.match');

        matches144.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round16_scores'];

            scoreDivs[0].textContent = matchScores[index*2+8].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+9].join(' ');
        });

        const round154 = a1.querySelector('.r4');
        const matches154 = round154.querySelectorAll('.match');

        matches154.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round16_scores'];

            scoreDivs[0].textContent = matchScores[index*2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
        });


        // R5
        const round95 = a4.querySelector('.r5');
        const matches95 = round95.querySelectorAll('.match');

        matches95.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['roundQF_scores'];

            scoreDivs[0].textContent = matchScores[index*2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
        });

        const round105 = a5.querySelector('.r5');
        const matches105 = round105.querySelectorAll('.match');

        matches105.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['roundQF_scores'];

            scoreDivs[0].textContent = matchScores[index*2+2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+3].join(' ');
        });

        const round115 = a6.querySelector('.r5');
        const matches115 = round115.querySelectorAll('.match');

        matches115.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['roundQF_scores'];

            scoreDivs[0].textContent = matchScores[index*2+4].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+5].join(' ');
        });

        const round125 = a7.querySelector('.r5');
        const matches125 = round125.querySelectorAll('.match');

        matches125.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['roundQF_scores'];

            scoreDivs[0].textContent = matchScores[index*2+6].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+7].join(' ');
        });

        const round135 = a2.querySelector('.r5');
        const matches135 = round135.querySelectorAll('.match');

        matches135.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['roundQF_scores'];

            scoreDivs[0].textContent = matchScores[index*2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
        });

        const round145 = a3.querySelector('.r5');
        const matches145 = round145.querySelectorAll('.match');

        matches145.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['roundQF_scores'];

            scoreDivs[0].textContent = matchScores[index*2+4].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+5].join(' ');
        });

        const round155 = a1.querySelector('.r5');
        const matches155 = round155.querySelectorAll('.match');

        matches155.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['roundQF_scores'];

            scoreDivs[0].textContent = matchScores[index*2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
        });


        // R6
        const round136 = a2.querySelector('.r6');
        const matches136 = round136.querySelectorAll('.match');

        matches136.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['roundSF_scores'];

            scoreDivs[0].textContent = matchScores[index*2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
        });

        const round146 = a3.querySelector('.r6');
        const matches146 = round146.querySelectorAll('.match');

        matches146.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['roundSF_scores'];

            scoreDivs[0].textContent = matchScores[index*2+2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+3].join(' ');
        });

        const round156 = a1.querySelector('.r6');
        const matches156 = round156.querySelectorAll('.match');

        matches156.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['roundSF_scores'];

            scoreDivs[0].textContent = matchScores[index*2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
        });


        // R7
        const round157 = a1.querySelector('.r7');
        const matches157 = round157.querySelectorAll('.match');

        matches157.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['roundF_scores'];

            scoreDivs[0].textContent = matchScores[index*2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
        });
    } else if (b4) {
        // R1
        const round1 = b1.querySelector('.r1');
        const matches1 = round1.querySelectorAll('.match');

        matches1.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round64_scores'];

            scoreDivs[0].textContent = matchScores[index*2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
        });

        const round2 = b2.querySelector('.r1');
        const matches2 = round2.querySelectorAll('.match');

        matches2.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round64_scores'];

            scoreDivs[0].textContent = matchScores[index*2+16].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+17].join(' ');
        });

        const round3 = b3.querySelector('.r1');
        const matches3 = round3.querySelectorAll('.match');

        matches3.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round64_scores'];

            scoreDivs[0].textContent = matchScores[index*2+32].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+33].join(' ');
        });

        const round4 = b4.querySelector('.r1');
        const matches4 = round4.querySelectorAll('.match');

        matches4.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round64_scores'];

            scoreDivs[0].textContent = matchScores[index*2+48].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+49].join(' ');
        });


        // R2
        const round11 = b1.querySelector('.r2');
        const matches11 = round11.querySelectorAll('.match');

        matches11.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round32_scores'];

            scoreDivs[0].textContent = matchScores[index*2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
        });

        const round21 = b2.querySelector('.r2');
        const matches21 = round21.querySelectorAll('.match');

        matches21.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round32_scores'];

            scoreDivs[0].textContent = matchScores[index*2+8].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+9].join(' ');
        });

        const round31 = b3.querySelector('.r2');
        const matches31 = round31.querySelectorAll('.match');

        matches31.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round32_scores'];

            scoreDivs[0].textContent = matchScores[index*2+16].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+17].join(' ');
        });

        const round41 = b4.querySelector('.r2');
        const matches41 = round41.querySelectorAll('.match');

        matches41.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round32_scores'];

            scoreDivs[0].textContent = matchScores[index*2+24].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+25].join(' ');
        });

        const round51 = a2.querySelector('.r2');
        const matches51 = round51.querySelectorAll('.match');

        matches51.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round32_scores'];

            scoreDivs[0].textContent = matchScores[index*2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
        });

        const round61 = a3.querySelector('.r2');
        const matches61 = round61.querySelectorAll('.match');

        matches61.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round32_scores'];

            scoreDivs[0].textContent = matchScores[index*2+16].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+17].join(' ');
        });


        // R3
        const round13 = b1.querySelector('.r3');
        const matches13 = round13.querySelectorAll('.match');

        matches13.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round16_scores'];

            scoreDivs[0].textContent = matchScores[index*2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
        });

        const round23 = b2.querySelector('.r3');
        const matches23 = round23.querySelectorAll('.match');

        matches23.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round16_scores'];

            scoreDivs[0].textContent = matchScores[index*2+4].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+5].join(' ');
        });

        const round33 = b3.querySelector('.r3');
        const matches33 = round33.querySelectorAll('.match');

        matches33.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round16_scores'];

            scoreDivs[0].textContent = matchScores[index*2+8].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+9].join(' ');
        });

        const round43 = b4.querySelector('.r3');
        const matches43 = round43.querySelectorAll('.match');

        matches43.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round16_scores'];

            scoreDivs[0].textContent = matchScores[index*2+12].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+13].join(' ');
        });

        const round53 = a2.querySelector('.r3');
        const matches53 = round53.querySelectorAll('.match');

        matches53.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round16_scores'];

            scoreDivs[0].textContent = matchScores[index*2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
        });

        const round63 = a3.querySelector('.r3');
        const matches63 = round63.querySelectorAll('.match');

        matches63.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round16_scores'];

            scoreDivs[0].textContent = matchScores[index*2+8].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+9].join(' ');
        });

        const round73 = a1.querySelector('.r3');
        const matches73 = round73.querySelectorAll('.match');

        matches73.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round16_scores'];

            scoreDivs[0].textContent = matchScores[index*2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
        });


        // R4
        const round14 = b1.querySelector('.r4');
        const matches14 = round14.querySelectorAll('.match');

        matches14.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['roundQF_scores'];

            scoreDivs[0].textContent = matchScores[index*2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
        });

        const round24 = b2.querySelector('.r4');
        const matches24 = round24.querySelectorAll('.match');

        matches24.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['roundQF_scores'];

            scoreDivs[0].textContent = matchScores[index*2+2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+3].join(' ');
        });

        const round34 = b3.querySelector('.r4');
        const matches34 = round34.querySelectorAll('.match');

        matches34.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['roundQF_scores'];

            scoreDivs[0].textContent = matchScores[index*2+4].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+5].join(' ');
        });

        const round44 = b4.querySelector('.r4');
        const matches44 = round44.querySelectorAll('.match');

        matches44.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['roundQF_scores'];

            scoreDivs[0].textContent = matchScores[index*2+6].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+7].join(' ');
        });

        const round54 = a2.querySelector('.r4');
        const matches54 = round54.querySelectorAll('.match');

        matches54.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['roundQF_scores'];

            scoreDivs[0].textContent = matchScores[index*2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
        });

        const round64 = a3.querySelector('.r4');
        const matches64 = round64.querySelectorAll('.match');

        matches64.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['roundQF_scores'];

            scoreDivs[0].textContent = matchScores[index*2+4].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+5].join(' ');
        });

        const round74 = a1.querySelector('.r4');
        const matches74 = round74.querySelectorAll('.match');

        matches74.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['roundQF_scores'];

            scoreDivs[0].textContent = matchScores[index*2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
        });


        // R5
        const round55 = a2.querySelector('.r5');
        const matches55 = round55.querySelectorAll('.match');

        matches55.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['roundSF_scores'];

            scoreDivs[0].textContent = matchScores[index*2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
        });

        const round65 = a3.querySelector('.r5');
        const matches65 = round65.querySelectorAll('.match');

        matches65.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['roundSF_scores'];

            scoreDivs[0].textContent = matchScores[index*2+2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+3].join(' ');
        });

        const round75 = a1.querySelector('.r5');
        const matches75 = round75.querySelectorAll('.match');

        matches75.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['roundSF_scores'];

            scoreDivs[0].textContent = matchScores[index*2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
        });


        // R6
        const round76 = a1.querySelector('.r6');
        const matches76 = round76.querySelectorAll('.match');

        matches76.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['roundF_scores'];

            scoreDivs[0].textContent = matchScores[index*2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
        });
    } else if (b2) {
        // R1
        const round1 = b1.querySelector('.r1');
        const matches1 = round1.querySelectorAll('.match');

        matches1.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round32_scores'];

            scoreDivs[0].textContent = matchScores[index*2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
        });

        const round2 = b2.querySelector('.r1');
        const matches2 = round2.querySelectorAll('.match');

        matches2.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round32_scores'];

            scoreDivs[0].textContent = matchScores[index*2+16].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+17].join(' ');
        });


        // R2
        const round21 = b1.querySelector('.r2');
        const matches21 = round21.querySelectorAll('.match');

        matches21.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round16_scores'];

            scoreDivs[0].textContent = matchScores[index*2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
        });

        const round22 = b2.querySelector('.r2');
        const matches22 = round22.querySelectorAll('.match');

        matches22.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round16_scores'];

            scoreDivs[0].textContent = matchScores[index*2+8].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+9].join(' ');
        });

        const round23 = a1.querySelector('.r2');
        const matches23 = round23.querySelectorAll('.match');

        matches23.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['round16_scores'];

            scoreDivs[0].textContent = matchScores[index*2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
        });


        // R3
        const round31 = b1.querySelector('.r3');
        const matches31 = round31.querySelectorAll('.match');

        matches31.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['roundQF_scores'];

            scoreDivs[0].textContent = matchScores[index*2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
        });

        const round32 = b2.querySelector('.r3');
        const matches32 = round32.querySelectorAll('.match');

        matches32.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['roundQF_scores'];

            scoreDivs[0].textContent = matchScores[index*2+4].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+5].join(' ');
        });

        const round33 = a1.querySelector('.r3');
        const matches33 = round33.querySelectorAll('.match');

        matches33.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['roundQF_scores'];

            scoreDivs[0].textContent = matchScores[index*2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
        });


        // R3
        const round41 = b1.querySelector('.r4');
        const matches41 = round41.querySelectorAll('.match');

        matches41.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['roundSF_scores'];

            scoreDivs[0].textContent = matchScores[index*2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
        });

        const round42 = b2.querySelector('.r4');
        const matches42 = round42.querySelectorAll('.match');

        matches42.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['roundSF_scores'];

            scoreDivs[0].textContent = matchScores[index*2+2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+3].join(' ');
        });

        const round43 = a1.querySelector('.r4');
        const matches43 = round43.querySelectorAll('.match');

        matches43.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['roundSF_scores'];

            scoreDivs[0].textContent = matchScores[index*2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
        });


        // R5
        const round53 = a1.querySelector('.r5');
        const matches53 = round53.querySelectorAll('.match');

        matches53.forEach((matchDiv, index) => {
            const scoreDivs = matchDiv.querySelectorAll('.draw-score');
            const matchScores = scoresData['roundF_scores'];

            scoreDivs[0].textContent = matchScores[index*2].join(' ');
            scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
        });
    } else {
        console.log("Score Error");
    }
}


// function populateScores(scoresData) {
//     // First querySelector all pdXs
//     // Check for pd8, pd4, pd2 with if statements
//     // Hard code all pdXs in each situation
//     // for only pd2 check:
//     // pd1 should have half the r1, r2, r3, r4 data
//     // pd2 should have the other half
//     // pd0 should have all the r2, r3, r4, r5 data
//     // 
//     // The Code should be segmented by round of scores pulled and then each segment should have the scoreDivs variable multiplied for each pdX that needs that round



//     const round1 = document.querySelector('.r1');
//     const matches1 = round1.querySelectorAll('.match');

//     matches1.forEach((matchDiv, index) => {
//         const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//         // const matchScores = scoresData[index];  // matchScores = [player1Scores, player2Scores]
//         const matchScores = scoresData['round32_scores'];

//         scoreDivs[0].textContent = matchScores[index*2].join(' ');
//         scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
//     });

//     const round2 = document.querySelector('.r2');
//     const matches2 = round2.querySelectorAll('.match');

//     matches2.forEach((matchDiv, index) => {
//         const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//         // const matchScores = scoresData[index];  // matchScores = [player1Scores, player2Scores]
//         const matchScores = scoresData['round16_scores'];

//         scoreDivs[0].textContent = matchScores[index*2].join(' ');
//         scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
//     });

//     const round3 = document.querySelector('.r3');
//     const matches3 = round3.querySelectorAll('.match');

//     matches3.forEach((matchDiv, index) => {
//         const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//         // const matchScores = scoresData[index];  // matchScores = [player1Scores, player2Scores]
//         const matchScores = scoresData['roundQF_scores'];

//         scoreDivs[0].textContent = matchScores[index*2].join(' ');
//         scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
//     });

//     const round4 = document.querySelector('.r4');
//     const matches4 = round4.querySelectorAll('.match');

//     matches4.forEach((matchDiv, index) => {
//         const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//         // const matchScores = scoresData[index];  // matchScores = [player1Scores, player2Scores]
//         const matchScores = scoresData['roundSF_scores'];

//         scoreDivs[0].textContent = matchScores[index*2].join(' ');
//         scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
//     });

//     const round5 = document.querySelector('.r5');
//     const matches5 = round5.querySelectorAll('.match');

//     matches5.forEach((matchDiv, index) => {
//         const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//         // const matchScores = scoresData[index];  // matchScores = [player1Scores, player2Scores]
//         const matchScores = scoresData['roundF_scores'];

//         scoreDivs[0].textContent = matchScores[index*2].join(' ');
//         scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
//     });

//     // const round6 = document.querySelector('.r6');
//     // const matches6 = round5.querySelectorAll('.match');

//     // matches5.forEach((matchDiv, index) => {
//     //     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     //     // const matchScores = scoresData[index];  // matchScores = [player1Scores, player2Scores]
//     //     const matchScores = scoresData['roundF_scores'];

//     //     scoreDivs[0].textContent = matchScores[index*2].join(' ');
//     //     scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
//     // });

//     // const round7 = document.querySelector('.r7');
//     // const matches7 = round5.querySelectorAll('.match');

//     // matches5.forEach((matchDiv, index) => {
//     //     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     //     // const matchScores = scoresData[index];  // matchScores = [player1Scores, player2Scores]
//     //     const matchScores = scoresData['roundF_scores'];

//     //     scoreDivs[0].textContent = matchScores[index*2].join(' ');
//     //     scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
//     // });
// }

function createTournWrapper(data) {
    const hList = ["Round of 128", "Round of 64", "Round of 32", "Round of 16", "Quarterfinals", "Semifinals", "Final"]
    const headers = document.querySelector('.b-head');
    const carus = document.querySelector('.b-caru');
    const dmap = document.querySelector('.draw-map');
    headers.innerHTML = '';
    carus.innerHTML = '';
    dmap.innerHTML - '';
    for (let i = (7 - Math.log2(data)); i < 7; i++) {
        const rDiv = document.createElement('div');
        rDiv.classList.add('round');

        rDiv.innerHTML = `
            <h3>${hList[i]}</h3>
        `;

        headers.appendChild(rDiv); 
    }
    const blankR = document.createElement('div');
    blankR.classList.add('round');
    blankR.innerHTML = `
        <h3></h3>
    `;
    headers.appendChild(blankR);

    if (Math.log2(data) == 5) {
        const bDiv = document.createElement('div');
        bDiv.classList.add('bracket');
        bDiv.classList.add('pd0');

        bDiv.innerHTML = `
            <div class="round">
                <div class="r2">

                </div>
            </div>

            <div class="round">
                <div class="r3">

                </div>
            </div>

            <div class="round">
                <div class="r4">

                </div>
            </div>

            <div class="round">
                <div class="r5">

                </div>
            </div>

            <div class="round">
                <div class="r6">
                
                </div>
            </div>
        `;
        carus.appendChild(bDiv);

        const b1Div = document.createElement('div');
        b1Div.classList.add('bracket');
        b1Div.classList.add('pd1');

        b1Div.innerHTML = `
            <div class="round">
                <div class="r1">
                
                </div>
            </div>

            <div class="round">
                <div class="r2">

                </div>
            </div>

            <div class="round">
                <div class="r3">

                </div>
            </div>

            <div class="round">
                <div class="r4">

                </div>
            </div>

            <div class="round">
                <div class="r5">

                </div>
            </div>
        `;
        carus.appendChild(b1Div);

        const b2Div = document.createElement('div');
        b2Div.classList.add('bracket');
        b2Div.classList.add('pd2');

        b2Div.innerHTML = `
            <div class="round">
                <div class="r1">
                
                </div>
            </div>

            <div class="round">
                <div class="r2">

                </div>
            </div>

            <div class="round">
                <div class="r3">

                </div>
            </div>

            <div class="round">
                <div class="r4">

                </div>
            </div>

            <div class="round">
                <div class="r5">

                </div>
            </div>
        `;
        carus.appendChild(b2Div);

        const mg = document.createElement('div');
        mg.classList.add('map-grid');
        mg.innerHTML = `
            <div class="one-map cello"></div>
            <div class="two-map cello"></div>
            <div class="map16 cello"></div>
        `;
        dmap.appendChild(mg);

        mg.style.display = "grid";
        mg.style.gridTemplateColumns = "repeat(5, 1fr)";
        mg.style.gridTemplateRows = "repeat(2, 1fr)";
        mg.style.width = "12.5vw";
        mg.style.height = "10vw";

        mg.querySelector('.one-map').style.gridColumn = "1";
        mg.querySelector('.one-map').style.gridRow = "1";

        mg.querySelector('.two-map').style.gridColumn = "1";
        mg.querySelector('.two-map').style.gridRow = "2";

        mg.querySelector('.map16').style.gridColumn = "2 / span 4";
        mg.querySelector('.map16').style.gridRow = "1 / span 2";
        // console.log(carus);
    } else if (Math.log2(data) == 6) {
        const bDiv = document.createElement('div');
        bDiv.classList.add('bracket');
        bDiv.classList.add('pd0');

        bDiv.innerHTML = `
            <div class="round">
                <div class="r3">

                </div>
            </div>

            <div class="round">
                <div class="r4">

                </div>
            </div>

            <div class="round">
                <div class="r5">

                </div>
            </div>

            <div class="round">
                <div class="r6">
                
                </div>
            </div>

            <div class="round">
                <div class="r7">

                </div>
            </div>
        `;
        carus.appendChild(bDiv);

        const b01Div = document.createElement('div');
        b01Div.classList.add('bracket');
        b01Div.classList.add('pd00');

        b01Div.innerHTML = `
            <div class="round">
                <div class="r2">

                </div>
            </div>

            <div class="round">
                <div class="r3">

                </div>
            </div>

            <div class="round">
                <div class="r4">

                </div>
            </div>

            <div class="round">
                <div class="r5">

                </div>
            </div>

            <div class="round">
                <div class="r6">
                
                </div>
            </div>
        `;
        carus.appendChild(b01Div);

        const b02Div = document.createElement('div');
        b02Div.classList.add('bracket');
        b02Div.classList.add('pd01');

        b02Div.innerHTML = `
            <div class="round">
                <div class="r2">

                </div>
            </div>

            <div class="round">
                <div class="r3">

                </div>
            </div>

            <div class="round">
                <div class="r4">

                </div>
            </div>

            <div class="round">
                <div class="r5">

                </div>
            </div>

            <div class="round">
                <div class="r6">
                
                </div>
            </div>
        `;
        carus.appendChild(b02Div);

        const b1Div = document.createElement('div');
        b1Div.classList.add('bracket');
        b1Div.classList.add('pd1');

        b1Div.innerHTML = `
            <div class="round">
                <div class="r1">
                
                </div>
            </div>

            <div class="round">
                <div class="r2">

                </div>
            </div>

            <div class="round">
                <div class="r3">

                </div>
            </div>

            <div class="round">
                <div class="r4">

                </div>
            </div>

            <div class="round">
                <div class="r5">

                </div>
            </div>
        `;
        carus.appendChild(b1Div);

        const b2Div = document.createElement('div');
        b2Div.classList.add('bracket');
        b2Div.classList.add('pd2');

        b2Div.innerHTML = `
            <div class="round">
                <div class="r1">
                
                </div>
            </div>

            <div class="round">
                <div class="r2">

                </div>
            </div>

            <div class="round">
                <div class="r3">

                </div>
            </div>

            <div class="round">
                <div class="r4">

                </div>
            </div>

            <div class="round">
                <div class="r5">

                </div>
            </div>
        `;
        carus.appendChild(b2Div);

        const b3Div = document.createElement('div');
        b3Div.classList.add('bracket');
        b3Div.classList.add('pd3');

        b3Div.innerHTML = `
            <div class="round">
                <div class="r1">
                
                </div>
            </div>

            <div class="round">
                <div class="r2">

                </div>
            </div>

            <div class="round">
                <div class="r3">

                </div>
            </div>

            <div class="round">
                <div class="r4">

                </div>
            </div>

            <div class="round">
                <div class="r5">

                </div>
            </div>
        `;
        carus.appendChild(b3Div);

        const b4Div = document.createElement('div');
        b4Div.classList.add('bracket');
        b4Div.classList.add('pd4');

        b4Div.innerHTML = `
            <div class="round">
                <div class="r1">
                
                </div>
            </div>

            <div class="round">
                <div class="r2">

                </div>
            </div>

            <div class="round">
                <div class="r3">

                </div>
            </div>

            <div class="round">
                <div class="r4">

                </div>
            </div>

            <div class="round">
                <div class="r5">

                </div>
            </div>
        `;
        carus.appendChild(b4Div);

        const mg = document.createElement('div');
        mg.classList.add('map-grid');
        mg.innerHTML = `
            <div class="one-map cello"></div>
            <div class="two-map cello"></div>
            <div class="thr-map cello"></div>
            <div class="fou-map cello"></div>
            <div class="one1-map cello"></div>
            <div class="two2-map cello"></div>
            <div class="map16 cello"></div>
        `;
        dmap.appendChild(mg);

        mg.style.display = "grid";
        mg.style.gridTemplateColumns = "repeat(6, 1fr)";
        mg.style.gridTemplateRows = "repeat(4, 1fr)";
        mg.style.width = "12.5vw";
        mg.style.height = "10vw";

        mg.querySelector('.one-map').style.gridColumn = "1";
        mg.querySelector('.one-map').style.gridRow = "1";

        mg.querySelector('.two-map').style.gridColumn = "1";
        mg.querySelector('.two-map').style.gridRow = "2";

        mg.querySelector('.thr-map').style.gridColumn = "1";
        mg.querySelector('.thr-map').style.gridRow = "3";

        mg.querySelector('.fou-map').style.gridColumn = "1";
        mg.querySelector('.fou-map').style.gridRow = "4";

        mg.querySelector('.one1-map').style.gridColumn = "2";
        mg.querySelector('.one1-map').style.gridRow = "1 / span 2";

        mg.querySelector('.two2-map').style.gridColumn = "2";
        mg.querySelector('.two2-map').style.gridRow = "3 / span 2";

        mg.querySelector('.map16').style.gridColumn = "3 / span 4";
        mg.querySelector('.map16').style.gridRow = "1 / span 4";
    } else {
        const bDiv = document.createElement('div');
        bDiv.classList.add('bracket');
        bDiv.classList.add('pd0');
        bDiv.innerHTML = `
            <div class="round">
                <div class="r4">

                </div>
            </div>

            <div class="round">
                <div class="r5">

                </div>
            </div>

            <div class="round">
                <div class="r6">
                
                </div>
            </div>

            <div class="round">
                <div class="r7">

                </div>
            </div>

            <div class="round">
                <div class="r8">

                </div>
            </div>
        `;
        carus.appendChild(bDiv);


        const b001Div = document.createElement('div');
        b001Div.classList.add('bracket');
        b001Div.classList.add('pd00');
        b001Div.innerHTML = `
            <div class="round">
                <div class="r3">

                </div>
            </div>

            <div class="round">
                <div class="r4">

                </div>
            </div>

            <div class="round">
                <div class="r5">

                </div>
            </div>

            <div class="round">
                <div class="r6">
                
                </div>
            </div>

            <div class="round">
                <div class="r7">

                </div>
            </div>
        `;
        carus.appendChild(b001Div);

        const b002Div = document.createElement('div');
        b002Div.classList.add('bracket');
        b002Div.classList.add('pd01');
        b002Div.innerHTML = `
            <div class="round">
                <div class="r3">

                </div>
            </div>

            <div class="round">
                <div class="r4">

                </div>
            </div>

            <div class="round">
                <div class="r5">

                </div>
            </div>

            <div class="round">
                <div class="r6">
                
                </div>
            </div>

            <div class="round">
                <div class="r7">

                </div>
            </div>
        `;
        carus.appendChild(b002Div);


        const b01Div = document.createElement('div');
        b01Div.classList.add('bracket');
        b01Div.classList.add('pd000');
        b01Div.innerHTML = `
            <div class="round">
                <div class="r2">

                </div>
            </div>

            <div class="round">
                <div class="r3">

                </div>
            </div>

            <div class="round">
                <div class="r4">

                </div>
            </div>

            <div class="round">
                <div class="r5">

                </div>
            </div>

            <div class="round">
                <div class="r6">
                
                </div>
            </div>
        `;
        carus.appendChild(b01Div);

        const b02Div = document.createElement('div');
        b02Div.classList.add('bracket');
        b02Div.classList.add('pd001');
        b02Div.innerHTML = `
            <div class="round">
                <div class="r2">

                </div>
            </div>

            <div class="round">
                <div class="r3">

                </div>
            </div>

            <div class="round">
                <div class="r4">

                </div>
            </div>

            <div class="round">
                <div class="r5">

                </div>
            </div>

            <div class="round">
                <div class="r6">
                
                </div>
            </div>
        `;
        carus.appendChild(b02Div);
        
        const b03Div = document.createElement('div');
        b03Div.classList.add('bracket');
        b03Div.classList.add('pd002');
        b03Div.innerHTML = `
            <div class="round">
                <div class="r2">

                </div>
            </div>

            <div class="round">
                <div class="r3">

                </div>
            </div>

            <div class="round">
                <div class="r4">

                </div>
            </div>

            <div class="round">
                <div class="r5">

                </div>
            </div>

            <div class="round">
                <div class="r6">
                
                </div>
            </div>
        `;
        carus.appendChild(b03Div);

        const b04Div = document.createElement('div');
        b04Div.classList.add('bracket');
        b04Div.classList.add('pd003');
        b04Div.innerHTML = `
            <div class="round">
                <div class="r2">

                </div>
            </div>

            <div class="round">
                <div class="r3">

                </div>
            </div>

            <div class="round">
                <div class="r4">

                </div>
            </div>

            <div class="round">
                <div class="r5">

                </div>
            </div>

            <div class="round">
                <div class="r6">
                
                </div>
            </div>
        `;
        carus.appendChild(b04Div);


        const b1Div = document.createElement('div');
        b1Div.classList.add('bracket');
        b1Div.classList.add('pd1');
        b1Div.innerHTML = `
            <div class="round">
                <div class="r1">
                
                </div>
            </div>

            <div class="round">
                <div class="r2">

                </div>
            </div>

            <div class="round">
                <div class="r3">

                </div>
            </div>

            <div class="round">
                <div class="r4">

                </div>
            </div>

            <div class="round">
                <div class="r5">

                </div>
            </div>
        `;
        carus.appendChild(b1Div);

        const b2Div = document.createElement('div');
        b2Div.classList.add('bracket');
        b2Div.classList.add('pd2');
        b2Div.innerHTML = `
            <div class="round">
                <div class="r1">
                
                </div>
            </div>

            <div class="round">
                <div class="r2">

                </div>
            </div>

            <div class="round">
                <div class="r3">

                </div>
            </div>

            <div class="round">
                <div class="r4">

                </div>
            </div>

            <div class="round">
                <div class="r5">

                </div>
            </div>
        `;
        carus.appendChild(b2Div);

        const b3Div = document.createElement('div');
        b3Div.classList.add('bracket');
        b3Div.classList.add('pd3');
        b3Div.innerHTML = `
            <div class="round">
                <div class="r1">
                
                </div>
            </div>

            <div class="round">
                <div class="r2">

                </div>
            </div>

            <div class="round">
                <div class="r3">

                </div>
            </div>

            <div class="round">
                <div class="r4">

                </div>
            </div>

            <div class="round">
                <div class="r5">

                </div>
            </div>
        `;
        carus.appendChild(b3Div);

        const b4Div = document.createElement('div');
        b4Div.classList.add('bracket');
        b4Div.classList.add('pd4');
        b4Div.innerHTML = `
            <div class="round">
                <div class="r1">
                
                </div>
            </div>

            <div class="round">
                <div class="r2">

                </div>
            </div>

            <div class="round">
                <div class="r3">

                </div>
            </div>

            <div class="round">
                <div class="r4">

                </div>
            </div>

            <div class="round">
                <div class="r5">

                </div>
            </div>
        `;
        carus.appendChild(b4Div);

        const b5Div = document.createElement('div');
        b5Div.classList.add('bracket');
        b5Div.classList.add('pd5');
        b5Div.innerHTML = `
            <div class="round">
                <div class="r1">
                
                </div>
            </div>

            <div class="round">
                <div class="r2">

                </div>
            </div>

            <div class="round">
                <div class="r3">

                </div>
            </div>

            <div class="round">
                <div class="r4">

                </div>
            </div>

            <div class="round">
                <div class="r5">

                </div>
            </div>
        `;
        carus.appendChild(b5Div);

        const b6Div = document.createElement('div');
        b6Div.classList.add('bracket');
        b6Div.classList.add('pd6');
        b6Div.innerHTML = `
            <div class="round">
                <div class="r1">
                
                </div>
            </div>

            <div class="round">
                <div class="r2">

                </div>
            </div>

            <div class="round">
                <div class="r3">

                </div>
            </div>

            <div class="round">
                <div class="r4">

                </div>
            </div>

            <div class="round">
                <div class="r5">

                </div>
            </div>
        `;
        carus.appendChild(b6Div);

        const b7Div = document.createElement('div');
        b7Div.classList.add('bracket');
        b7Div.classList.add('pd7');
        b7Div.innerHTML = `
            <div class="round">
                <div class="r1">
                
                </div>
            </div>

            <div class="round">
                <div class="r2">

                </div>
            </div>

            <div class="round">
                <div class="r3">

                </div>
            </div>

            <div class="round">
                <div class="r4">

                </div>
            </div>

            <div class="round">
                <div class="r5">

                </div>
            </div>
        `;
        carus.appendChild(b7Div);

        const b8Div = document.createElement('div');
        b8Div.classList.add('bracket');
        b8Div.classList.add('pd8');
        b8Div.innerHTML = `
            <div class="round">
                <div class="r1">
                
                </div>
            </div>

            <div class="round">
                <div class="r2">

                </div>
            </div>

            <div class="round">
                <div class="r3">

                </div>
            </div>

            <div class="round">
                <div class="r4">

                </div>
            </div>

            <div class="round">
                <div class="r5">

                </div>
            </div>
        `;
        carus.appendChild(b8Div);

        const mg = document.createElement('div');
        mg.classList.add('map-grid');
        mg.innerHTML = `
            <div class="one-map cello"></div>
            <div class="two-map cello"></div>
            <div class="thr-map cello"></div>
            <div class="fou-map cello"></div>
            <div class="fiv-map cello"></div>
            <div class="six-map cello"></div>
            <div class="sev-map cello"></div>
            <div class="eig-map cello"></div>
            <div class="one1-map cello"></div>
            <div class="two2-map cello"></div>
            <div class="thr3-map cello"></div>
            <div class="fou4-map cello"></div>
            <div class="one11-map cello"></div>
            <div class="two22-map cello"></div>
            <div class="map16 cello"></div>
        `;
        dmap.appendChild(mg);

        mg.style.display = "grid";
        mg.style.gridTemplateColumns = "repeat(7, 1fr)";
        mg.style.gridTemplateRows = "repeat(8, 1fr)";
        mg.style.width = "12.5vw";
        mg.style.height = "10vw";

        mg.querySelector('.one-map').style.gridColumn = "1";
        mg.querySelector('.one-map').style.gridRow = "1";

        mg.querySelector('.two-map').style.gridColumn = "1";
        mg.querySelector('.two-map').style.gridRow = "2";

        mg.querySelector('.thr-map').style.gridColumn = "1";
        mg.querySelector('.thr-map').style.gridRow = "3";

        mg.querySelector('.fou-map').style.gridColumn = "1";
        mg.querySelector('.fou-map').style.gridRow = "4";

        mg.querySelector('.fiv-map').style.gridColumn = "1";
        mg.querySelector('.fiv-map').style.gridRow = "5";

        mg.querySelector('.six-map').style.gridColumn = "1";
        mg.querySelector('.six-map').style.gridRow = "6";

        mg.querySelector('.sev-map').style.gridColumn = "1";
        mg.querySelector('.sev-map').style.gridRow = "7";

        mg.querySelector('.eig-map').style.gridColumn = "1";
        mg.querySelector('.eig-map').style.gridRow = "8";

        mg.querySelector('.one1-map').style.gridColumn = "2";
        mg.querySelector('.one1-map').style.gridRow = "1 / span 2";

        mg.querySelector('.two2-map').style.gridColumn = "2";
        mg.querySelector('.two2-map').style.gridRow = "3 / span 2";

        mg.querySelector('.thr3-map').style.gridColumn = "2";
        mg.querySelector('.thr3-map').style.gridRow = "5 / span 2";

        mg.querySelector('.fou4-map').style.gridColumn = "2";
        mg.querySelector('.fou4-map').style.gridRow = "7 / span 2";

        mg.querySelector('.one11-map').style.gridColumn = "3";
        mg.querySelector('.one11-map').style.gridRow = "1 / span 4";

        mg.querySelector('.two22-map').style.gridColumn = "3";
        mg.querySelector('.two22-map').style.gridRow = "5 / span 4";

        mg.querySelector('.map16').style.gridColumn = "4 / span 4";
        mg.querySelector('.map16').style.gridRow = "1 / span 8";
    }
}

function displayTournament(name, data) {
    // ALL PDx CLASSES SHOULD BE SELECTED AT THE TOP
    // IF (PDx) STATEMENTS RETURN NULL IF IT DOESN'T EXIST AND THAT IS FALSEY
    // CHECK FOR PD8, THEN PD4, THEN PD2, OTHERWISE ERROR
    // UNDER PD2 CLAUSE, CURRENT CODE RUNS
    // COPY PASTE CURRENT CODE INTO OTHER TWO CLAUSES AND UPDATE AS YOU DID WITH DIV GENERATION
    // NO NEED FOR DRAW SIZE INFO 

    const carusu = document.querySelector('.b-caru');
    const a1 = document.querySelector('.pd0');
    const b1 = document.querySelector('.pd1');
    const b2 = document.querySelector('.pd2');
    const b3 = document.querySelector('.pd3');
    const b4 = document.querySelector('.pd4');
    const b5 = document.querySelector('.pd5');
    const b6 = document.querySelector('.pd6');
    const b7 = document.querySelector('.pd7');
    const b8 = document.querySelector('.pd8');
    const a2 = document.querySelector('.pd00');
    const a3 = document.querySelector('.pd01');
    const a4 = document.querySelector('.pd000');
    const a5 = document.querySelector('.pd001');
    const a6 = document.querySelector('.pd002');
    const a7 = document.querySelector('.pd003');

    // document.getElementById('tournament-name').textContent = name;


    if (b8) {
        const players128 = data.round128;
        const roundLista128 = b1.querySelector('.r1');
        const roundListb128 = b2.querySelector('.r1');
        const roundListc128 = b3.querySelector('.r1');
        const roundListd128 = b4.querySelector('.r1');
        const roundListe128 = b5.querySelector('.r1');
        const roundListf128 = b6.querySelector('.r1');
        const roundListg128 = b7.querySelector('.r1');
        const roundListh128 = b8.querySelector('.r1');
        roundLista128.innerHTML = '';
        roundListb128.innerHTML = '';
        roundListc128.innerHTML = '';
        roundListd128.innerHTML = '';
        roundListe128.innerHTML = '';
        roundListf128.innerHTML = '';
        roundListg128.innerHTML = '';
        roundListh128.innerHTML = '';

        for (let i = 0; i < players128.length; i += 2) {
            const player1 = players128[i];
            const player2 = players128[i + 1];

            const matchDiv = document.createElement('div');
            matchDiv.classList.add('match');

            matchDiv.innerHTML = `
                <div class="match-ins">
                    <span class="draw-player">${player1}</span>
                    <span class="draw-player">${player2}</span>
                </div>
                <div class="match-score">
                    <span class="draw-score">6 7</span>
                    <span class="draw-score">3 5</span>
                </div>
            `;

            if (i < (players128.length / 8)) {
                roundLista128.appendChild(matchDiv);
            } else if (i < (players128.length / 4)) {
                roundListb128.appendChild(matchDiv);
            } else if (i < ((players128.length / 8) * 3)) {
                roundListc128.appendChild(matchDiv);
            } else if (i < (players128.length / 2)) {
                roundListd128.appendChild(matchDiv);
            } else if (i < ((players128.length / 8) * 5)) {
                roundListe128.appendChild(matchDiv);
            } else if (i < ((players128.length / 4) * 3)) {
                roundListf128.appendChild(matchDiv);
            } else if (i < ((players128.length / 8) * 7)) {
                roundListg128.appendChild(matchDiv);
            } else {
                roundListh128.appendChild(matchDiv);
            }
        }

        const players64 = data.round64;
        const roundList0a64 = a4.querySelector('.r2');
        const roundList0b64 = a5.querySelector('.r2');
        const roundList0c64 = a6.querySelector('.r2');
        const roundList0d64 = a7.querySelector('.r2');
        roundList0a64.innerHTML = '';
        roundList0b64.innerHTML = '';
        roundList0c64.innerHTML = '';
        roundList0d64.innerHTML = '';
        const roundLista64 = b1.querySelector('.r2');
        const roundListb64 = b2.querySelector('.r2');
        const roundListc64 = b3.querySelector('.r2');
        const roundListd64 = b4.querySelector('.r2');
        const roundListe64 = b5.querySelector('.r2');
        const roundListf64 = b6.querySelector('.r2');
        const roundListg64 = b7.querySelector('.r2');
        const roundListh64 = b8.querySelector('.r2');
        roundLista64.innerHTML = '';
        roundListb64.innerHTML = '';
        roundListc64.innerHTML = '';
        roundListd64.innerHTML = '';
        roundListe64.innerHTML = '';
        roundListf64.innerHTML = '';
        roundListg64.innerHTML = '';
        roundListh64.innerHTML = '';

        for (let i = 0; i < players64.length; i += 2) {
            const player1 = players64[i];
            const player2 = players64[i + 1];

            const matchDiv = document.createElement('div');
            matchDiv.classList.add('match');

            matchDiv.innerHTML = `
                <div class="match-ins">
                    <span class="draw-player">${player1}</span>
                    <span class="draw-player">${player2}</span>
                </div>
                <div class="match-score">
                    <span class="draw-score">6 7</span>
                    <span class="draw-score">3 5</span>
                </div>
            `;

            if (i < (players64.length / 8)) {
                roundLista64.appendChild(matchDiv);
                roundList0a64.appendChild(matchDiv.cloneNode(true));
            } else if (i < (players64.length / 4)) {
                roundListb64.appendChild(matchDiv);
                roundList0a64.appendChild(matchDiv.cloneNode(true));
            } else if (i < ((players64.length / 8) * 3)) {
                roundListc64.appendChild(matchDiv);
                roundList0b64.appendChild(matchDiv.cloneNode(true));
            } else if (i < (players64.length / 2)) {
                roundListd64.appendChild(matchDiv);
                roundList0b64.appendChild(matchDiv.cloneNode(true));
            } else if (i < ((players64.length / 8) * 5)) {
                roundListe64.appendChild(matchDiv);
                roundList0c64.appendChild(matchDiv.cloneNode(true));
            } else if (i < ((players64.length / 4) * 3)) {
                roundListf64.appendChild(matchDiv);
                roundList0c64.appendChild(matchDiv.cloneNode(true));
            } else if (i < ((players64.length / 8) * 7)) {
                roundListg64.appendChild(matchDiv);
                roundList0d64.appendChild(matchDiv.cloneNode(true));
            } else {
                roundListh64.appendChild(matchDiv);
                roundList0d64.appendChild(matchDiv.cloneNode(true));
            }
        }

        const players32 = data.round32;
        const roundList00a32 = a2.querySelector('.r3');
        const roundList00b32 = a3.querySelector('.r3');
        roundList00a32.innerHTML = '';
        roundList00b32.innerHTML = '';
        const roundList0a32 = a4.querySelector('.r3');
        const roundList0b32 = a5.querySelector('.r3');
        const roundList0c32 = a6.querySelector('.r3');
        const roundList0d32 = a7.querySelector('.r3');
        roundList0a32.innerHTML = '';
        roundList0b32.innerHTML = '';
        roundList0c32.innerHTML = '';
        roundList0d32.innerHTML = '';
        const roundLista32 = b1.querySelector('.r3');
        const roundListb32 = b2.querySelector('.r3');
        const roundListc32 = b3.querySelector('.r3');
        const roundListd32 = b4.querySelector('.r3');
        const roundListe32 = b5.querySelector('.r3');
        const roundListf32 = b6.querySelector('.r3');
        const roundListg32 = b7.querySelector('.r3');
        const roundListh32 = b8.querySelector('.r3');
        roundLista32.innerHTML = '';
        roundListb32.innerHTML = '';
        roundListc32.innerHTML = '';
        roundListd32.innerHTML = '';
        roundListe32.innerHTML = '';
        roundListf32.innerHTML = '';
        roundListg32.innerHTML = '';
        roundListh32.innerHTML = '';


        for (let i = 0; i < players32.length; i += 2) {
            const player1 = players32[i];
            const player2 = players32[i + 1];

            const matchDiv = document.createElement('div');
            matchDiv.classList.add('match');

            matchDiv.innerHTML = `
                <div class="match-ins">
                    <span class="draw-player">${player1}</span>
                    <span class="draw-player">${player2}</span>
                </div>
                <div class="match-score">
                    <span class="draw-score">6 7</span>
                    <span class="draw-score">3 5</span>
                </div>
            `;

            // if (i < (players32.length / 4)) {
            //     roundLista32.appendChild(matchDiv);
            //     roundList0a32.appendChild(matchDiv.cloneNode(true));
            // } else if (i < (players32.length / 2)) {
            //     roundListb32.appendChild(matchDiv);
            //     roundList0a32.appendChild(matchDiv.cloneNode(true));
            // } else if (i < ((players32.length / 4) * 3)) {
            //     roundListc32.appendChild(matchDiv);
            //     roundList0b32.appendChild(matchDiv.cloneNode(true));
            // } else {
            //     roundListd32.appendChild(matchDiv);
            //     roundList0b32.appendChild(matchDiv.cloneNode(true));
            // }

            if (i < (players32.length / 8)) {
                roundLista32.appendChild(matchDiv);
                roundList0a32.appendChild(matchDiv.cloneNode(true));
                roundList00a32.appendChild(matchDiv.cloneNode(true));
            } else if (i < (players32.length / 4)) {
                roundListb32.appendChild(matchDiv);
                roundList0a32.appendChild(matchDiv.cloneNode(true));
                roundList00a32.appendChild(matchDiv.cloneNode(true));
            } else if (i < ((players32.length / 8) * 3)) {
                roundListc32.appendChild(matchDiv);
                roundList0b32.appendChild(matchDiv.cloneNode(true));
                roundList00a32.appendChild(matchDiv.cloneNode(true));
            } else if (i < (players32.length / 2)) {
                roundListd32.appendChild(matchDiv);
                roundList0b32.appendChild(matchDiv.cloneNode(true));
                roundList00a32.appendChild(matchDiv.cloneNode(true));
            } else if (i < ((players32.length / 8) * 5)) {
                roundListe32.appendChild(matchDiv);
                roundList0c32.appendChild(matchDiv.cloneNode(true));
                roundList00b32.appendChild(matchDiv.cloneNode(true));
            } else if (i < ((players32.length / 4) * 3)) {
                roundListf32.appendChild(matchDiv);
                roundList0c32.appendChild(matchDiv.cloneNode(true));
                roundList00b32.appendChild(matchDiv.cloneNode(true));
            } else if (i < ((players32.length / 8) * 7)) {
                roundListg32.appendChild(matchDiv);
                roundList0d32.appendChild(matchDiv.cloneNode(true));
                roundList00b32.appendChild(matchDiv.cloneNode(true));
            } else {
                roundListh32.appendChild(matchDiv);
                roundList0d32.appendChild(matchDiv.cloneNode(true));
                roundList00b32.appendChild(matchDiv.cloneNode(true));
            }
        }

        const players16 = data.round16;
        const roundList000a16 = a1.querySelector('.r4');
        roundList000a16.innerHTML = '';
        const roundList00a16 = a2.querySelector('.r4');
        const roundList00b16 = a3.querySelector('.r4');
        roundList00a16.innerHTML = '';
        roundList00b16.innerHTML = '';
        const roundList0a16 = a4.querySelector('.r4');
        const roundList0b16 = a5.querySelector('.r4');
        const roundList0c16 = a6.querySelector('.r4');
        const roundList0d16 = a7.querySelector('.r4');
        roundList0a16.innerHTML = '';
        roundList0b16.innerHTML = '';
        roundList0c16.innerHTML = '';
        roundList0d16.innerHTML = '';
        const roundLista16 = b1.querySelector('.r4');
        const roundListb16 = b2.querySelector('.r4');
        const roundListc16 = b3.querySelector('.r4');
        const roundListd16 = b4.querySelector('.r4');
        const roundListe16 = b5.querySelector('.r4');
        const roundListf16 = b6.querySelector('.r4');
        const roundListg16 = b7.querySelector('.r4');
        const roundListh16 = b8.querySelector('.r4');
        roundLista16.innerHTML = '';
        roundListb16.innerHTML = '';
        roundListc16.innerHTML = '';
        roundListd16.innerHTML = '';
        roundListe16.innerHTML = '';
        roundListf16.innerHTML = '';
        roundListg16.innerHTML = '';
        roundListh16.innerHTML = '';


        for (let i = 0; i < players16.length; i += 2) {
            const player1 = players16[i];
            const player2 = players16[i + 1];

            const matchDiv = document.createElement('div');
            matchDiv.classList.add('match');

            matchDiv.innerHTML = `
                <div class="match-ins">
                    <span class="draw-player">${player1}</span>
                    <span class="draw-player">${player2}</span>
                </div>
                <div class="match-score">
                    <span class="draw-score">6 7</span>
                    <span class="draw-score">3 5</span>
                </div>
            `;

            if (i < (players16.length / 8)) {
                roundLista16.appendChild(matchDiv);
                roundList0a16.appendChild(matchDiv.cloneNode(true));
                roundList00a16.appendChild(matchDiv.cloneNode(true));
                roundList000a16.appendChild(matchDiv.cloneNode(true));
            } else if (i < (players16.length / 4)) {
                roundListb16.appendChild(matchDiv);
                roundList0a16.appendChild(matchDiv.cloneNode(true));
                roundList00a16.appendChild(matchDiv.cloneNode(true));
                roundList000a16.appendChild(matchDiv.cloneNode(true));
            } else if (i < ((players16.length / 8) * 3)) {
                roundListc16.appendChild(matchDiv);
                roundList0b16.appendChild(matchDiv.cloneNode(true));
                roundList00a16.appendChild(matchDiv.cloneNode(true));
                roundList000a16.appendChild(matchDiv.cloneNode(true));
            } else if (i < (players16.length / 2)) {
                roundListd16.appendChild(matchDiv);
                roundList0b16.appendChild(matchDiv.cloneNode(true));
                roundList00a16.appendChild(matchDiv.cloneNode(true));
                roundList000a16.appendChild(matchDiv.cloneNode(true));
            } else if (i < ((players16.length / 8) * 5)) {
                roundListe16.appendChild(matchDiv);
                roundList0c16.appendChild(matchDiv.cloneNode(true));
                roundList00b16.appendChild(matchDiv.cloneNode(true));
                roundList000a16.appendChild(matchDiv.cloneNode(true));
            } else if (i < ((players16.length / 4) * 3)) {
                roundListf16.appendChild(matchDiv);
                roundList0c16.appendChild(matchDiv.cloneNode(true));
                roundList00b16.appendChild(matchDiv.cloneNode(true));
                roundList000a16.appendChild(matchDiv.cloneNode(true));
            } else if (i < ((players16.length / 8) * 7)) {
                roundListg16.appendChild(matchDiv);
                roundList0d16.appendChild(matchDiv.cloneNode(true));
                roundList00b16.appendChild(matchDiv.cloneNode(true));
                roundList000a16.appendChild(matchDiv.cloneNode(true));
            } else {
                roundListh16.appendChild(matchDiv);
                roundList0d16.appendChild(matchDiv.cloneNode(true));
                roundList00b16.appendChild(matchDiv.cloneNode(true));
                roundList000a16.appendChild(matchDiv.cloneNode(true));
            }
        }
        
        const playersQF = data.roundQF;
        const roundList000aQF = a1.querySelector('.r5');
        roundList000aQF.innerHTML = '';
        const roundList00aQF = a2.querySelector('.r5');
        const roundList00bQF = a3.querySelector('.r5');
        roundList00aQF.innerHTML = '';
        roundList00bQF.innerHTML = '';
        const roundList0aQF = a4.querySelector('.r5');
        const roundList0bQF = a5.querySelector('.r5');
        const roundList0cQF = a6.querySelector('.r5');
        const roundList0dQF = a7.querySelector('.r5');
        roundList0aQF.innerHTML = '';
        roundList0bQF.innerHTML = '';
        roundList0cQF.innerHTML = '';
        roundList0dQF.innerHTML = '';

        for (let i = 0; i < playersQF.length; i += 2) {
            const player1 = playersQF[i];
            const player2 = playersQF[i + 1];

            const matchDiv = document.createElement('div');
            matchDiv.classList.add('match');

            matchDiv.innerHTML = `
                <div class="match-ins">
                    <span class="draw-player">${player1}</span>
                    <span class="draw-player">${player2}</span>
                </div>
                <div class="match-score">
                    <span class="draw-score">6 7</span>
                    <span class="draw-score">3 5</span>
                </div>
            `;

            if (i < (playersQF.length / 4)) {
                roundList0aQF.appendChild(matchDiv);
                roundList00aQF.appendChild(matchDiv.cloneNode(true));
                roundList000aQF.appendChild(matchDiv.cloneNode(true));
            } else if (i < (playersQF.length / 2)) {
                roundList0bQF.appendChild(matchDiv);
                roundList00aQF.appendChild(matchDiv.cloneNode(true));
                roundList000aQF.appendChild(matchDiv.cloneNode(true));
            } else if (i < ((playersQF.length / 4) * 3)) {
                roundList0cQF.appendChild(matchDiv);
                roundList00bQF.appendChild(matchDiv.cloneNode(true));
                roundList000aQF.appendChild(matchDiv.cloneNode(true));
            } else {
                roundList0dQF.appendChild(matchDiv);
                roundList00bQF.appendChild(matchDiv.cloneNode(true));
                roundList000aQF.appendChild(matchDiv.cloneNode(true));
            }
        }

        const playersSF = data.roundSF;
        const roundList000aSF = a1.querySelector('.r6');
        roundList000aSF.innerHTML = '';
        const roundList00aSF = a2.querySelector('.r6');
        const roundList00bSF = a3.querySelector('.r6');
        roundList00aSF.innerHTML = '';
        roundList00bSF.innerHTML = '';
        
        for (let i = 0; i < playersSF.length; i += 2) {
            const player1 = playersSF[i];
            const player2 = playersSF[i + 1];

            const matchDiv = document.createElement('div');
            matchDiv.classList.add('match');

            matchDiv.innerHTML = `
                <div class="match-ins">
                    <span class="draw-player">${player1}</span>
                    <span class="draw-player">${player2}</span>
                </div>
                <div class="match-score">
                    <span class="draw-score">6 7</span>
                    <span class="draw-score">3 5</span>
                </div>
            `;

            if (i < (playersSF.length / 2)) {
                roundList00aSF.appendChild(matchDiv);
                roundList000aSF.appendChild(matchDiv.cloneNode(true));
            } else {
                roundList00bSF.appendChild(matchDiv);
                roundList000aSF.appendChild(matchDiv.cloneNode(true));
            }
            // roundListSF.appendChild(matchDiv);
        }

        const playersF = data.roundF;
        const roundListaF = a1.querySelector('.r7');
        roundListaF.innerHTML = '';

        for (let i = 0; i < playersF.length; i += 2) {
            const player1 = playersF[i];
            const player2 = playersF[i + 1];

            const matchDiv = document.createElement('div');
            matchDiv.classList.add('match');

            matchDiv.innerHTML = `
                <div class="match-ins">
                    <span class="draw-player">${player1}</span>
                    <span class="draw-player">${player2}</span>
                </div>
                <div class="match-score">
                    <span class="draw-score">6 7</span>
                    <span class="draw-score">3 5</span>
                </div>
            `;

            roundListaF.appendChild(matchDiv);
        }
    } else if (b4) {
        const players64 = data.round64;
        const roundLista64 = b1.querySelector('.r1');
        const roundListb64 = b2.querySelector('.r1');
        const roundListc64 = b3.querySelector('.r1');
        const roundListd64 = b4.querySelector('.r1');
        roundLista64.innerHTML = '';
        roundListb64.innerHTML = '';
        roundListc64.innerHTML = '';
        roundListd64.innerHTML = '';

        for (let i = 0; i < players64.length; i += 2) {
            const player1 = players64[i];
            const player2 = players64[i + 1];

            const matchDiv = document.createElement('div');
            matchDiv.classList.add('match');

            matchDiv.innerHTML = `
                <div class="match-ins">
                    <span class="draw-player">${player1}</span>
                    <span class="draw-player">${player2}</span>
                </div>
                <div class="match-score">
                    <span class="draw-score">6 7</span>
                    <span class="draw-score">3 5</span>
                </div>
            `;

            if (i < (players64.length / 4)) {
                roundLista64.appendChild(matchDiv);
            } else if (i < (players64.length / 2)) {
                roundListb64.appendChild(matchDiv);
            } else if (i < ((players64.length / 4) * 3)) {
                roundListc64.appendChild(matchDiv);
            } else {
                roundListd64.appendChild(matchDiv);
            }
        }

        const players32 = data.round32;
        const roundLista32 = b1.querySelector('.r2');
        const roundListb32 = b2.querySelector('.r2');
        const roundListc32 = b3.querySelector('.r2');
        const roundListd32 = b4.querySelector('.r2');
        roundLista32.innerHTML = '';
        roundListb32.innerHTML = '';
        roundListc32.innerHTML = '';
        roundListd32.innerHTML = '';
        const roundList0a32 = a2.querySelector('.r2');
        roundList0a32.innerHTML = '';
        const roundList0b32 = a3.querySelector('.r2');
        roundList0b32.innerHTML = '';


        for (let i = 0; i < players32.length; i += 2) {
            const player1 = players32[i];
            const player2 = players32[i + 1];

            const matchDiv = document.createElement('div');
            matchDiv.classList.add('match');

            matchDiv.innerHTML = `
                <div class="match-ins">
                    <span class="draw-player">${player1}</span>
                    <span class="draw-player">${player2}</span>
                </div>
                <div class="match-score">
                    <span class="draw-score">6 7</span>
                    <span class="draw-score">3 5</span>
                </div>
            `;

            if (i < (players32.length / 4)) {
                roundLista32.appendChild(matchDiv);
                roundList0a32.appendChild(matchDiv.cloneNode(true));
            } else if (i < (players32.length / 2)) {
                roundListb32.appendChild(matchDiv);
                roundList0a32.appendChild(matchDiv.cloneNode(true));
            } else if (i < ((players32.length / 4) * 3)) {
                roundListc32.appendChild(matchDiv);
                roundList0b32.appendChild(matchDiv.cloneNode(true));
            } else {
                roundListd32.appendChild(matchDiv);
                roundList0b32.appendChild(matchDiv.cloneNode(true));
            }
        }

        const players16 = data.round16;
        const roundLista16 = b1.querySelector('.r3');
        const roundListb16 = b2.querySelector('.r3');
        const roundListc16 = b3.querySelector('.r3');
        const roundListd16 = b4.querySelector('.r3');
        roundLista16.innerHTML = '';
        roundListb16.innerHTML = '';
        roundListc16.innerHTML = '';
        roundListd16.innerHTML = '';
        const roundList0a16 = a2.querySelector('.r3');
        roundList0a16.innerHTML = '';
        const roundList0b16 = a3.querySelector('.r3');
        roundList0b16.innerHTML = '';
        const roundList16 = a1.querySelector('.r3');
        roundList16.innerHTML = '';

        for (let i = 0; i < players16.length; i += 2) {
            const player1 = players16[i];
            const player2 = players16[i + 1];

            const matchDiv = document.createElement('div');
            matchDiv.classList.add('match');

            matchDiv.innerHTML = `
                <div class="match-ins">
                    <span class="draw-player">${player1}</span>
                    <span class="draw-player">${player2}</span>
                </div>
                <div class="match-score">
                    <span class="draw-score">6 7</span>
                    <span class="draw-score">3 5</span>
                </div>
            `;

            if (i < (players16.length / 4)) {
                roundLista16.appendChild(matchDiv);
                roundList0a16.appendChild(matchDiv.cloneNode(true));
                roundList16.appendChild(matchDiv.cloneNode(true));
            } else if (i < (players16.length / 2)) {
                roundListb16.appendChild(matchDiv);
                roundList0a16.appendChild(matchDiv.cloneNode(true));
                roundList16.appendChild(matchDiv.cloneNode(true));
            } else if (i < ((players16.length / 4) * 3)) {
                roundListc16.appendChild(matchDiv);
                roundList0b16.appendChild(matchDiv.cloneNode(true));
                roundList16.appendChild(matchDiv.cloneNode(true));
            } else {
                roundListd16.appendChild(matchDiv);
                roundList0b16.appendChild(matchDiv.cloneNode(true));
                roundList16.appendChild(matchDiv.cloneNode(true));
            }
        }
        
        const playersQF = data.roundQF;
        const roundListaQF = b1.querySelector('.r4');
        const roundListbQF = b2.querySelector('.r4');
        const roundListcQF = b3.querySelector('.r4');
        const roundListdQF = b4.querySelector('.r4');
        roundListaQF.innerHTML = '';
        roundListbQF.innerHTML = '';
        roundListcQF.innerHTML = '';
        roundListdQF.innerHTML = '';
        const roundList0aQF = a2.querySelector('.r4');
        roundList0aQF.innerHTML = '';
        const roundList0bQF = a3.querySelector('.r4');
        roundList0bQF.innerHTML = '';
        const roundListQF = a1.querySelector('.r4');
        roundListQF.innerHTML = '';

        for (let i = 0; i < playersQF.length; i += 2) {
            const player1 = playersQF[i];
            const player2 = playersQF[i + 1];

            const matchDiv = document.createElement('div');
            matchDiv.classList.add('match');

            matchDiv.innerHTML = `
                <div class="match-ins">
                    <span class="draw-player">${player1}</span>
                    <span class="draw-player">${player2}</span>
                </div>
                <div class="match-score">
                    <span class="draw-score">6 7</span>
                    <span class="draw-score">3 5</span>
                </div>
            `;

            if (i < (playersQF.length / 4)) {
                roundListaQF.appendChild(matchDiv);
                roundList0aQF.appendChild(matchDiv.cloneNode(true));
                roundListQF.appendChild(matchDiv.cloneNode(true));
            } else if (i < (playersQF.length / 2)) {
                roundListbQF.appendChild(matchDiv);
                roundList0aQF.appendChild(matchDiv.cloneNode(true));
                roundListQF.appendChild(matchDiv.cloneNode(true));
            } else if (i < ((playersQF.length / 4) * 3)) {
                roundListcQF.appendChild(matchDiv);
                roundList0bQF.appendChild(matchDiv.cloneNode(true));
                roundListQF.appendChild(matchDiv.cloneNode(true));
            } else {
                roundListdQF.appendChild(matchDiv);
                roundList0bQF.appendChild(matchDiv.cloneNode(true));
                roundListQF.appendChild(matchDiv.cloneNode(true));
            }
        }

        const playersSF = data.roundSF;
        const roundList0aSF = a2.querySelector('.r5');
        roundList0aSF.innerHTML = '';
        const roundList0bSF = a3.querySelector('.r5');
        roundList0bSF.innerHTML = '';
        const roundListSF = a1.querySelector('.r5');
        roundListSF.innerHTML = '';

        for (let i = 0; i < playersSF.length; i += 2) {
            const player1 = playersSF[i];
            const player2 = playersSF[i + 1];

            const matchDiv = document.createElement('div');
            matchDiv.classList.add('match');

            matchDiv.innerHTML = `
                <div class="match-ins">
                    <span class="draw-player">${player1}</span>
                    <span class="draw-player">${player2}</span>
                </div>
                <div class="match-score">
                    <span class="draw-score">6 7</span>
                    <span class="draw-score">3 5</span>
                </div>
            `;

            if (i < (playersSF.length / 2)) {
                roundList0aSF.appendChild(matchDiv);
                roundListSF.appendChild(matchDiv.cloneNode(true));
            } else {
                roundList0bSF.appendChild(matchDiv);
                roundListSF.appendChild(matchDiv.cloneNode(true));
            }
            // roundListSF.appendChild(matchDiv);
        }

        const playersF = data.roundF;
        const roundListaF = a1.querySelector('.r6');
        roundListaF.innerHTML = '';

        for (let i = 0; i < playersF.length; i += 2) {
            const player1 = playersF[i];
            const player2 = playersF[i + 1];

            const matchDiv = document.createElement('div');
            matchDiv.classList.add('match');

            matchDiv.innerHTML = `
                <div class="match-ins">
                    <span class="draw-player">${player1}</span>
                    <span class="draw-player">${player2}</span>
                </div>
                <div class="match-score">
                    <span class="draw-score">6 7</span>
                    <span class="draw-score">3 5</span>
                </div>
            `;

            roundListaF.appendChild(matchDiv);
        }

    } else if (b2) {
        // Example: list players from round16
        const players32 = data.round32;
        // const roundList32 = document.querySelector('.r3');
        const roundLista32 = b1.querySelector('.r1');
        const roundListb32 = b2.querySelector('.r1');
        // const roundList32 = a1.querySelector('.r1');
        // roundList32.innerHTML = '';
        roundLista32.innerHTML = '';
        roundListb32.innerHTML = '';

        for (let i = 0; i < players32.length; i += 2) {
            const player1 = players32[i];
            const player2 = players32[i + 1];

            const matchDiv = document.createElement('div');
            matchDiv.classList.add('match');

            matchDiv.innerHTML = `
                <div class="match-ins">
                    <span class="draw-player">${player1}</span>
                    <span class="draw-player">${player2}</span>
                </div>
                <div class="match-score">
                    <span class="draw-score">6 7</span>
                    <span class="draw-score">3 5</span>
                </div>
            `;

            if (i < (players32.length / 2)) {
                roundLista32.appendChild(matchDiv);
            } else {
                roundListb32.appendChild(matchDiv);
            }
            // roundList32.appendChild(matchDiv);
        }

        // Example: list players from round16
        const players16 = data.round16;
        // const roundList16 = document.querySelector('.r4');
        const roundLista16 = b1.querySelector('.r2');
        roundLista16.innerHTML = '';
        const roundListb16 = b2.querySelector('.r2');
        roundListb16.innerHTML = '';
        const roundList16 = a1.querySelector('.r2');
        roundList16.innerHTML = '';

        for (let i = 0; i < players16.length; i += 2) {
            const player1 = players16[i];
            const player2 = players16[i + 1];

            const matchDiv = document.createElement('div');
            matchDiv.classList.add('match');

            matchDiv.innerHTML = `
                <div class="match-ins">
                    <span class="draw-player">${player1}</span>
                    <span class="draw-player">${player2}</span>
                </div>
                <div class="match-score">
                    <span class="draw-score">6 7</span>
                    <span class="draw-score">3 5</span>
                </div>
            `;

            if (i < (players16.length / 2)) {
                roundLista16.appendChild(matchDiv);
                roundList16.appendChild(matchDiv.cloneNode(true));
            } else {
                roundListb16.appendChild(matchDiv);
                roundList16.appendChild(matchDiv.cloneNode(true));
            }
            // roundList16.appendChild(matchDiv);
        }

        const playersQF = data.roundQF;
        // const roundListQF = document.querySelector('.r5');
        const roundListaQF = b1.querySelector('.r3');
        roundListaQF.innerHTML = '';
        const roundListbQF = b2.querySelector('.r3');
        roundListbQF.innerHTML = '';
        const roundListQF = a1.querySelector('.r3');
        roundListQF.innerHTML = '';

        for (let i = 0; i < playersQF.length; i += 2) {
            const player1 = playersQF[i];
            const player2 = playersQF[i + 1];

            const matchDiv = document.createElement('div');
            matchDiv.classList.add('match');

            matchDiv.innerHTML = `
                <div class="match-ins">
                    <span class="draw-player">${player1}</span>
                    <span class="draw-player">${player2}</span>
                </div>
                <div class="match-score">
                    <span class="draw-score">6 7</span>
                    <span class="draw-score">3 5</span>
                </div>
            `;

            if (i < (playersQF.length / 2)) {
                roundListaQF.appendChild(matchDiv);
                roundListQF.appendChild(matchDiv.cloneNode(true));
            } else {
                roundListbQF.appendChild(matchDiv);
                roundListQF.appendChild(matchDiv.cloneNode(true));
            }
            // roundListQF.appendChild(matchDiv);
        }

        const playersSF = data.roundSF;
        // const roundListSF = document.querySelector('.r6');
        const roundListaSF = b1.querySelector('.r4');
        roundListaSF.innerHTML = '';
        const roundListbSF = b2.querySelector('.r4');
        roundListbSF.innerHTML = '';
        const roundListSF = a1.querySelector('.r4');
        roundListSF.innerHTML = '';

        for (let i = 0; i < playersSF.length; i += 2) {
            const player1 = playersSF[i];
            const player2 = playersSF[i + 1];

            const matchDiv = document.createElement('div');
            matchDiv.classList.add('match');

            matchDiv.innerHTML = `
                <div class="match-ins">
                    <span class="draw-player">${player1}</span>
                    <span class="draw-player">${player2}</span>
                </div>
                <div class="match-score">
                    <span class="draw-score">6 7</span>
                    <span class="draw-score">3 5</span>
                </div>
            `;

            if (i < (playersSF.length / 2)) {
                roundListaSF.appendChild(matchDiv);
                roundListSF.appendChild(matchDiv.cloneNode(true));
            } else {
                roundListbSF.appendChild(matchDiv);
                roundListSF.appendChild(matchDiv.cloneNode(true));
            }
            // roundListSF.appendChild(matchDiv);
        }

        const playersF = data.roundF;
        // const roundListF = document.querySelector('.r7');
        // const roundListF = b1.querySelector('.r5');
        // roundListF.innerHTML = '';
        const roundListaF = a1.querySelector('.r5');
        roundListaF.innerHTML = '';

        for (let i = 0; i < playersF.length; i += 2) {
            const player1 = playersF[i];
            const player2 = playersF[i + 1];

            const matchDiv = document.createElement('div');
            matchDiv.classList.add('match');

            matchDiv.innerHTML = `
                <div class="match-ins">
                    <span class="draw-player">${player1}</span>
                    <span class="draw-player">${player2}</span>
                </div>
                <div class="match-score">
                    <span class="draw-score">6 7</span>
                    <span class="draw-score">3 5</span>
                </div>
            `;

            roundListaF.appendChild(matchDiv);
            // roundListF.appendChild(matchDiv);
            // roundListaF.appendChild(matchDiv.cloneNode(true));
        }
    } else {
        console.log("error in Display Tournament")
    }
}

function createFeaturedTournament(data) {
    const toutou = document.querySelector('.table-name');
    const titi = toutou.querySelector('h3');
    titi.textContent = `${tournamentId}`;

    const toutou2 = document.querySelector('.table-name2');
    const titi2 = toutou2.querySelector('h3');
    titi2.textContent = `${tournamentId}`;

    const className = data.atype.toLowerCase().replace(/\s+/g, '-');  // "ATP 250" → "atp-250"
    const tournFea = document.querySelector('.featured-details');
    tournFea.innerHTML = `
        <h3 id="tournament-name"> ${data.nay}</h3>
        <p class="tournament-type ${className}"> ${data.atype}</p>
        <p><strong>Dates:</strong> ${data.adate}</p>
        <p><strong>Location:</strong> ${data.Location}</p>
        <p><strong>Surface:</strong> ${data.Surface}</p>
        <p><strong>Prize Money:</strong> ${data["Prize money"]}</p>

        <div class="stat-grid">
            <div class="stat-item">
                <div class="stat-title">Defending Champion</div>
                <div class="stat-value">Jannik Sinner</div>
            </div>
            <div class="stat-item">
                <div class="stat-title">Venue</div>
                <div class="stat-value">${data.Venue}</div>
            </div>
            <div class="stat-item">
                <div class="stat-title">First Held</div>
                <div class="stat-value">1985</div>
            </div>
            <div class="stat-item">
                <div class="stat-title">Draw Size</div>
                <div class="stat-value">${data.Draw}</div>
            </div>
        </div>
    `;
    // return tournFea;
}




function setUpDraw() {
    const carou = document.querySelector('.b-caru')
    const scrollContainer2 = document.querySelector('.bracket.bh1');
    
    const scrollContainer3 = document.querySelector('.bracket.pd1');
    const scrollContainer4 = document.querySelector('.bracket.pd2');
    const scrollContainer5 = document.querySelector('.bracket.pd0');

    const scrollContainer6 = document.querySelector('.bracket.pd3');
    const scrollContainer7 = document.querySelector('.bracket.pd4');
    const scrollContainer8 = document.querySelector('.bracket.pd00');
    const scrollContainer9 = document.querySelector('.bracket.pd01');

    const scrollContainer10 = document.querySelector('.bracket.pd5');
    const scrollContainer11 = document.querySelector('.bracket.pd6');
    const scrollContainer12 = document.querySelector('.bracket.pd7');
    const scrollContainer13 = document.querySelector('.bracket.pd8');
    const scrollContainer14 = document.querySelector('.bracket.pd000');
    const scrollContainer15 = document.querySelector('.bracket.pd001');
    const scrollContainer16 = document.querySelector('.bracket.pd002');
    const scrollContainer17 = document.querySelector('.bracket.pd003');

    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    const roundWidth = document.querySelector('.bracket.pd1 .round')?.offsetWidth || '15.2vw'; // adjust fallback as needed
    // const roundWidth = '15.2vw';
    const visibleRounds = 5;
    let maxSk = 0;
    let maxYK = 0;
    if (scrollContainer13) {
        maxSk = 3;
        maxYK = 7;
    } else if (scrollContainer7) {
        maxSk = 2;
        maxYK = 3;
    } else if (scrollContainer4) {
        maxSk = 1;
        maxYK = 1;
    } else {
        console.log("draw button error")
    }
    // let onDefaultScreen = 0;
    let onX = 0;
    let onY = 0;
    updateHighlight(onX, onY);

    nextBtn.addEventListener('click', () => {
        if (onX < maxSk) {
            onX = onX + 1;
            // console.log(onX);
            
            if (scrollContainer13) {
                // NEW
                scrollContainer3.scrollBy({ left: roundWidth, behavior: 'smooth' });
                scrollContainer4.scrollBy({ left: roundWidth, behavior: 'smooth' });
                scrollContainer5.scrollBy({ left: roundWidth, behavior: 'smooth' });
                scrollContainer6.scrollBy({ left: roundWidth, behavior: 'smooth' });
                scrollContainer7.scrollBy({ left: roundWidth, behavior: 'smooth' });
                scrollContainer8.scrollBy({ left: roundWidth, behavior: 'smooth' });
                scrollContainer9.scrollBy({ left: roundWidth, behavior: 'smooth' });
                // End of NEW
                scrollContainer10.scrollBy({ left: roundWidth, behavior: 'smooth' });
                scrollContainer11.scrollBy({ left: roundWidth, behavior: 'smooth' });
                scrollContainer12.scrollBy({ left: roundWidth, behavior: 'smooth' });
                scrollContainer13.scrollBy({ left: roundWidth, behavior: 'smooth' });
                scrollContainer14.scrollBy({ left: roundWidth, behavior: 'smooth' });
                scrollContainer15.scrollBy({ left: roundWidth, behavior: 'smooth' });
                scrollContainer16.scrollBy({ left: roundWidth, behavior: 'smooth' });
                scrollContainer17.scrollBy({ left: roundWidth, behavior: 'smooth' });
                scrollContainer2.style.transform = `translateX(${-15.2 * onX}vw)`;
            } else if (scrollContainer7) {
                // NEW
                scrollContainer3.scrollBy({ left: roundWidth, behavior: 'smooth' });
                scrollContainer4.scrollBy({ left: roundWidth, behavior: 'smooth' });
                scrollContainer5.scrollBy({ left: roundWidth, behavior: 'smooth' });
                // End of NEW
                scrollContainer6.scrollBy({ left: roundWidth, behavior: 'smooth' });
                scrollContainer7.scrollBy({ left: roundWidth, behavior: 'smooth' });
                scrollContainer8.scrollBy({ left: roundWidth, behavior: 'smooth' });
                scrollContainer9.scrollBy({ left: roundWidth, behavior: 'smooth' });
                scrollContainer2.style.transform = `translateX(${-15.2 * onX}vw)`;
            } else {
                scrollContainer2.scrollBy({ left: roundWidth, behavior: 'smooth' });
                scrollContainer3.scrollBy({ left: roundWidth, behavior: 'smooth' });
                scrollContainer4.scrollBy({ left: roundWidth, behavior: 'smooth' });
                scrollContainer5.scrollBy({ left: roundWidth, behavior: 'smooth' });
                scrollContainer2.style.transform = `translateX(${-15.2 * onX}vw)`;
            }

            if (scrollContainer13) {
                if (onX > 2) {
                    scrollContainer5.style.display = "flex";
                    scrollContainer8.style.display = "none";
                    scrollContainer9.style.display = "none";

                    scrollContainer3.style.display = "none";
                    scrollContainer4.style.display = "none";
                    scrollContainer6.style.display = "none";
                    scrollContainer7.style.display = "none";
                    scrollContainer10.style.display = "none";
                    scrollContainer11.style.display = "none";
                    scrollContainer12.style.display = "none";
                    scrollContainer13.style.display = "none";

                    scrollContainer14.style.display = "none";
                    scrollContainer15.style.display = "none";
                    scrollContainer16.style.display = "none";
                    scrollContainer17.style.display = "none";
                    carou.style.transform = `translateY(${0}vw)`;
                    onY = 0;
                } else if (onX > 1) {
                    scrollContainer5.style.display = "none";
                    scrollContainer8.style.display = "flex";
                    scrollContainer9.style.display = "flex";

                    scrollContainer3.style.display = "none";
                    scrollContainer4.style.display = "none";
                    scrollContainer6.style.display = "none";
                    scrollContainer7.style.display = "none";
                    scrollContainer10.style.display = "none";
                    scrollContainer11.style.display = "none";
                    scrollContainer12.style.display = "none";
                    scrollContainer13.style.display = "none";

                    scrollContainer14.style.display = "none";
                    scrollContainer15.style.display = "none";
                    scrollContainer16.style.display = "none";
                    scrollContainer17.style.display = "none";
                    carou.style.transform = `translateY(${(Math.floor(onY/2))*-26}vw)`;
                    onY = Math.floor(onY/2);
                } else if (onX > 0) {
                    scrollContainer5.style.display = "none";
                    scrollContainer8.style.display = "none";
                    scrollContainer9.style.display = "none";

                    scrollContainer3.style.display = "none";
                    scrollContainer4.style.display = "none";
                    scrollContainer6.style.display = "none";
                    scrollContainer7.style.display = "none";
                    scrollContainer10.style.display = "none";
                    scrollContainer11.style.display = "none";
                    scrollContainer12.style.display = "none";
                    scrollContainer13.style.display = "none";

                    scrollContainer14.style.display = "flex";
                    scrollContainer15.style.display = "flex";
                    scrollContainer16.style.display = "flex";
                    scrollContainer17.style.display = "flex";
                    carou.style.transform = `translateY(${(Math.floor(onY/2))*-26}vw)`;
                    onY = Math.floor(onY/2);
                } else {
                    scrollContainer5.style.display = "none";
                    scrollContainer8.style.display = "none";
                    scrollContainer9.style.display = "none";

                    scrollContainer3.style.display = "flex";
                    scrollContainer4.style.display = "flex";
                    scrollContainer6.style.display = "flex";
                    scrollContainer7.style.display = "flex";
                    scrollContainer10.style.display = "flex";
                    scrollContainer11.style.display = "flex";
                    scrollContainer12.style.display = "flex";
                    scrollContainer13.style.display = "flex";
                    
                    scrollContainer14.style.display = "none";
                    scrollContainer15.style.display = "none";
                    scrollContainer16.style.display = "none";
                    scrollContainer17.style.display = "none";
                    carou.style.transform = `translateY(${(Math.floor(onY/2))*-26}vw)`;
                    onY = Math.floor(onY/2);
                }
            } else if (scrollContainer7) {
                if (onX > 1) {
                    scrollContainer5.style.display = "flex";
                    scrollContainer8.style.display = "none";
                    scrollContainer9.style.display = "none";

                    scrollContainer3.style.display = "none";
                    scrollContainer4.style.display = "none";
                    scrollContainer6.style.display = "none";
                    scrollContainer7.style.display = "none";
                    carou.style.transform = `translateY(${0}vw)`;
                    onY = 0;
                } else if (onX > 0) {
                    scrollContainer5.style.display = "none";
                    scrollContainer8.style.display = "flex";
                    scrollContainer9.style.display = "flex";

                    scrollContainer3.style.display = "none";
                    scrollContainer4.style.display = "none";
                    scrollContainer6.style.display = "none";
                    scrollContainer7.style.display = "none";
                    carou.style.transform = `translateY(${(Math.floor(onY/2))*-26}vw)`;
                    onY = Math.floor(onY/2);
                } else {
                    scrollContainer5.style.display = "none";
                    scrollContainer8.style.display = "none";
                    scrollContainer9.style.display = "none";

                    scrollContainer3.style.display = "flex";
                    scrollContainer4.style.display = "flex";
                    scrollContainer6.style.display = "flex";
                    scrollContainer7.style.display = "flex";
                    carou.style.transform = `translateY(${(Math.floor(onY/2))*-26}vw)`;
                    onY = Math.floor(onY/2);
                }
            } else {
                if (onX > 0) {
                    scrollContainer3.style.display = "none";
                    scrollContainer4.style.display = "none";
                    scrollContainer5.style.display = "flex";
                    carou.style.transform = `translateY(${(Math.floor(onY/2))*-26}vw)`;
                    onY = Math.floor(onY/2);
                    // maxYK = 0;
                    // console.log(Math.floor(onY/2));
                } else {
                    scrollContainer3.style.display = "flex";
                    scrollContainer4.style.display = "flex";
                    scrollContainer5.style.display = "none";
                    // carou.style.transform = `translateY(${(Math.floor(onY/2))*-26}vw)`;
                    // onY = Math.floor(onY/2);
                    // maxYK = 0;
                }
            }
            updateHighlight(onX, onY);
        }
        // console.log(onDefaultScreen);
    });

    prevBtn.addEventListener('click', () => {
        if (onX > 0) {
            onX = onX - 1;
            // console.log(onX);

            if (scrollContainer13) {
                scrollContainer3.scrollBy({ left: -roundWidth, behavior: 'smooth' });
                scrollContainer4.scrollBy({ left: -roundWidth, behavior: 'smooth' });
                scrollContainer5.scrollBy({ left: -roundWidth, behavior: 'smooth' });
                scrollContainer6.scrollBy({ left: -roundWidth, behavior: 'smooth' });
                scrollContainer7.scrollBy({ left: -roundWidth, behavior: 'smooth' });
                scrollContainer8.scrollBy({ left: -roundWidth, behavior: 'smooth' });
                scrollContainer9.scrollBy({ left: -roundWidth, behavior: 'smooth' });
                scrollContainer10.scrollBy({ left: -roundWidth, behavior: 'smooth' });
                scrollContainer11.scrollBy({ left: -roundWidth, behavior: 'smooth' });
                scrollContainer12.scrollBy({ left: -roundWidth, behavior: 'smooth' });
                scrollContainer13.scrollBy({ left: -roundWidth, behavior: 'smooth' });
                scrollContainer14.scrollBy({ left: -roundWidth, behavior: 'smooth' });
                scrollContainer15.scrollBy({ left: -roundWidth, behavior: 'smooth' });
                scrollContainer16.scrollBy({ left: -roundWidth, behavior: 'smooth' });
                scrollContainer17.scrollBy({ left: -roundWidth, behavior: 'smooth' });
                scrollContainer2.style.transform = `translateX(${-15.2 * onX}vw)`;
            } else if (scrollContainer7) {
                scrollContainer3.scrollBy({ left: -roundWidth, behavior: 'smooth' });
                scrollContainer4.scrollBy({ left: -roundWidth, behavior: 'smooth' });
                scrollContainer5.scrollBy({ left: -roundWidth, behavior: 'smooth' });
                scrollContainer6.scrollBy({ left: -roundWidth, behavior: 'smooth' });
                scrollContainer7.scrollBy({ left: -roundWidth, behavior: 'smooth' });
                scrollContainer8.scrollBy({ left: -roundWidth, behavior: 'smooth' });
                scrollContainer9.scrollBy({ left: -roundWidth, behavior: 'smooth' });
                scrollContainer2.style.transform = `translateX(${-15.2 * onX}vw)`;
            } else {
                scrollContainer2.scrollBy({ left: -roundWidth, behavior: 'smooth' });
                scrollContainer3.scrollBy({ left: -roundWidth, behavior: 'smooth' });
                scrollContainer4.scrollBy({ left: -roundWidth, behavior: 'smooth' });
                scrollContainer5.scrollBy({ left: -roundWidth, behavior: 'smooth' });  
                scrollContainer2.style.transform = `translateX(${-15.2 * onX}vw)`;  
            }
        
        
            if (scrollContainer13) {
                if (onX > 2) {
                    scrollContainer5.style.display = "flex";
                    scrollContainer8.style.display = "none";
                    scrollContainer9.style.display = "none";

                    scrollContainer3.style.display = "none";
                    scrollContainer4.style.display = "none";
                    scrollContainer6.style.display = "none";
                    scrollContainer7.style.display = "none";
                    scrollContainer10.style.display = "none";
                    scrollContainer11.style.display = "none";
                    scrollContainer12.style.display = "none";
                    scrollContainer13.style.display = "none";

                    scrollContainer14.style.display = "none";
                    scrollContainer15.style.display = "none";
                    scrollContainer16.style.display = "none";
                    scrollContainer17.style.display = "none";
                    
                    carou.style.transform = `translateY(${(onY * 2)*-26}vw)`;
                    onY = onY * 2;
                } else if (onX > 1) {
                    scrollContainer5.style.display = "none";
                    scrollContainer8.style.display = "flex";
                    scrollContainer9.style.display = "flex";

                    scrollContainer3.style.display = "none";
                    scrollContainer4.style.display = "none";
                    scrollContainer6.style.display = "none";
                    scrollContainer7.style.display = "none";
                    scrollContainer10.style.display = "none";
                    scrollContainer11.style.display = "none";
                    scrollContainer12.style.display = "none";
                    scrollContainer13.style.display = "none";

                    scrollContainer14.style.display = "none";
                    scrollContainer15.style.display = "none";
                    scrollContainer16.style.display = "none";
                    scrollContainer17.style.display = "none";
                    carou.style.transform = `translateY(${(onY * 2)*-26}vw)`;
                    onY = onY * 2;
                } else if (onX > 0) {
                    scrollContainer5.style.display = "none";
                    scrollContainer8.style.display = "none";
                    scrollContainer9.style.display = "none";

                    scrollContainer3.style.display = "none";
                    scrollContainer4.style.display = "none";
                    scrollContainer6.style.display = "none";
                    scrollContainer7.style.display = "none";
                    scrollContainer10.style.display = "none";
                    scrollContainer11.style.display = "none";
                    scrollContainer12.style.display = "none";
                    scrollContainer13.style.display = "none";

                    scrollContainer14.style.display = "flex";
                    scrollContainer15.style.display = "flex";
                    scrollContainer16.style.display = "flex";
                    scrollContainer17.style.display = "flex";
                    carou.style.transform = `translateY(${(onY * 2)*-26}vw)`;
                    onY = onY * 2;
                } else {
                    scrollContainer5.style.display = "none";
                    scrollContainer8.style.display = "none";
                    scrollContainer9.style.display = "none";

                    scrollContainer3.style.display = "flex";
                    scrollContainer4.style.display = "flex";
                    scrollContainer6.style.display = "flex";
                    scrollContainer7.style.display = "flex";
                    scrollContainer10.style.display = "flex";
                    scrollContainer11.style.display = "flex";
                    scrollContainer12.style.display = "flex";
                    scrollContainer13.style.display = "flex";
                    
                    scrollContainer14.style.display = "none";
                    scrollContainer15.style.display = "none";
                    scrollContainer16.style.display = "none";
                    scrollContainer17.style.display = "none";
                    
                    carou.style.transform = `translateY(${(onY * 2)*-26}vw)`;
                    onY = onY * 2;
                }
            } else if (scrollContainer7) {
                if (onX > 1) {
                    scrollContainer5.style.display = "flex";
                    scrollContainer8.style.display = "none";
                    scrollContainer9.style.display = "none";

                    scrollContainer3.style.display = "none";
                    scrollContainer4.style.display = "none";
                    scrollContainer6.style.display = "none";
                    scrollContainer7.style.display = "none";
                    carou.style.transform = `translateY(${(onY * 2)*-26}vw)`;
                    onY = onY * 2;

                    // carou.style.transform = `translateY(0vw)`;
                } else if (onX > 0) {
                    scrollContainer5.style.display = "none";
                    scrollContainer8.style.display = "flex";
                    scrollContainer9.style.display = "flex";

                    scrollContainer3.style.display = "none";
                    scrollContainer4.style.display = "none";
                    scrollContainer6.style.display = "none";
                    scrollContainer7.style.display = "none";
                    carou.style.transform = `translateY(${(onY * 2)*-26}vw)`;
                    onY = onY * 2;

                    // carou.style.transform = `translateY(0vw)`;
                } else {
                    scrollContainer5.style.display = "none";
                    scrollContainer8.style.display = "none";
                    scrollContainer9.style.display = "none";

                    scrollContainer3.style.display = "flex";
                    scrollContainer4.style.display = "flex";
                    scrollContainer6.style.display = "flex";
                    scrollContainer7.style.display = "flex";
                    carou.style.transform = `translateY(${(onY * 2)*-26}vw)`;
                    onY = onY * 2;
                }
            } else {
                if (onX > 0) {
                    scrollContainer3.style.display = "none";
                    scrollContainer4.style.display = "none";
                    scrollContainer5.style.display = "flex";
                    carou.style.transform = `translateY(${(onY * 2)*-26}vw)`;
                    onY = onY * 2;
                    // maxYK = 1;
                } else {
                    scrollContainer3.style.display = "flex";
                    scrollContainer4.style.display = "flex";
                    scrollContainer5.style.display = "none";
                    carou.style.transform = `translateY(${(onY * 2)*-26}vw)`;
                    onY = onY * 2;
                    // maxYK = 1;
                }
            }
            updateHighlight(onX, onY);
        }
        // console.log(onDefaultScreen);
    });
    
    const onem = document.querySelector('.one-map');
    const twom = document.querySelector('.two-map');
    const thrm = document.querySelector('.thr-map');
    const foum = document.querySelector('.fou-map');
    const fivm = document.querySelector('.fiv-map');
    const sixm = document.querySelector('.six-map');
    const sevm = document.querySelector('.sev-map');
    const eigm = document.querySelector('.eig-map');
    const one1m = document.querySelector('.one1-map');
    const two2m = document.querySelector('.two2-map');
    const thr3m = document.querySelector('.thr3-map');
    const fou4m = document.querySelector('.fou4-map');
    const one11m = document.querySelector('.one11-map');
    const two22m = document.querySelector('.two22-map');
    // const mapm = document.querySelector('.map16');

    if (scrollContainer13) {
        onem.addEventListener('click', function() {
            scrollContainer2.style.transform = `translateX(${0}vw)`;
            scrollContainer3.style.transform = `translateX(${0}vw)`;
            scrollContainer4.style.transform = `translateX(${0}vw)`;
            scrollContainer5.style.transform = `translateX(${0}vw)`;
            scrollContainer6.style.transform = `translateX(${0}vw)`;
            scrollContainer7.style.transform = `translateX(${0}vw)`;
            scrollContainer8.style.transform = `translateX(${0}vw)`;
            scrollContainer9.style.transform = `translateX(${0}vw)`;
            scrollContainer10.style.transform = `translateX(${0}vw)`;
            scrollContainer11.style.transform = `translateX(${0}vw)`;
            scrollContainer12.style.transform = `translateX(${0}vw)`;
            scrollContainer13.style.transform = `translateX(${0}vw)`;
            scrollContainer14.style.transform = `translateX(${0}vw)`;
            scrollContainer15.style.transform = `translateX(${0}vw)`;
            scrollContainer16.style.transform = `translateX(${0}vw)`;
            scrollContainer17.style.transform = `translateX(${0}vw)`;

            scrollContainer3.style.display = "flex";
            scrollContainer4.style.display = "flex";
            scrollContainer6.style.display = "flex";
            scrollContainer7.style.display = "flex";
            scrollContainer10.style.display = "flex";
            scrollContainer11.style.display = "flex";
            scrollContainer12.style.display = "flex";
            scrollContainer13.style.display = "flex";
            scrollContainer5.style.display = "none";
            scrollContainer8.style.display = "none";
            scrollContainer9.style.display = "none";
            scrollContainer14.style.display = "none";
            scrollContainer15.style.display = "none";
            scrollContainer16.style.display = "none";
            scrollContainer17.style.display = "none";
            onX = 0;
            carou.style.transform = `translateY(0vw)`;
            onY = 0;
            updateHighlight(onX, onY);
        });
        twom.addEventListener('click', function() {
            scrollContainer2.style.transform = `translateX(${0}vw)`;
            scrollContainer3.style.transform = `translateX(${0}vw)`;
            scrollContainer4.style.transform = `translateX(${0}vw)`;
            scrollContainer5.style.transform = `translateX(${0}vw)`;
            scrollContainer6.style.transform = `translateX(${0}vw)`;
            scrollContainer7.style.transform = `translateX(${0}vw)`;
            scrollContainer8.style.transform = `translateX(${0}vw)`;
            scrollContainer9.style.transform = `translateX(${0}vw)`;
            scrollContainer10.style.transform = `translateX(${0}vw)`;
            scrollContainer11.style.transform = `translateX(${0}vw)`;
            scrollContainer12.style.transform = `translateX(${0}vw)`;
            scrollContainer13.style.transform = `translateX(${0}vw)`;
            scrollContainer14.style.transform = `translateX(${0}vw)`;
            scrollContainer15.style.transform = `translateX(${0}vw)`;
            scrollContainer16.style.transform = `translateX(${0}vw)`;
            scrollContainer17.style.transform = `translateX(${0}vw)`;

            scrollContainer3.style.display = "flex";
            scrollContainer4.style.display = "flex";
            scrollContainer6.style.display = "flex";
            scrollContainer7.style.display = "flex";
            scrollContainer10.style.display = "flex";
            scrollContainer11.style.display = "flex";
            scrollContainer12.style.display = "flex";
            scrollContainer13.style.display = "flex";
            scrollContainer5.style.display = "none";
            scrollContainer8.style.display = "none";
            scrollContainer9.style.display = "none";
            scrollContainer14.style.display = "none";
            scrollContainer15.style.display = "none";
            scrollContainer16.style.display = "none";
            scrollContainer17.style.display = "none";
            onX = 0;
            carou.style.transform = `translateY(-26vw)`;
            onY = 1;
            updateHighlight(onX, onY);
        });
        thrm.addEventListener('click', function() {
            scrollContainer2.style.transform = `translateX(${0}vw)`;
            scrollContainer3.style.transform = `translateX(${0}vw)`;
            scrollContainer4.style.transform = `translateX(${0}vw)`;
            scrollContainer5.style.transform = `translateX(${0}vw)`;
            scrollContainer6.style.transform = `translateX(${0}vw)`;
            scrollContainer7.style.transform = `translateX(${0}vw)`;
            scrollContainer8.style.transform = `translateX(${0}vw)`;
            scrollContainer9.style.transform = `translateX(${0}vw)`;
            scrollContainer10.style.transform = `translateX(${0}vw)`;
            scrollContainer11.style.transform = `translateX(${0}vw)`;
            scrollContainer12.style.transform = `translateX(${0}vw)`;
            scrollContainer13.style.transform = `translateX(${0}vw)`;
            scrollContainer14.style.transform = `translateX(${0}vw)`;
            scrollContainer15.style.transform = `translateX(${0}vw)`;
            scrollContainer16.style.transform = `translateX(${0}vw)`;
            scrollContainer17.style.transform = `translateX(${0}vw)`;

            scrollContainer3.style.display = "flex";
            scrollContainer4.style.display = "flex";
            scrollContainer6.style.display = "flex";
            scrollContainer7.style.display = "flex";
            scrollContainer10.style.display = "flex";
            scrollContainer11.style.display = "flex";
            scrollContainer12.style.display = "flex";
            scrollContainer13.style.display = "flex";
            scrollContainer5.style.display = "none";
            scrollContainer8.style.display = "none";
            scrollContainer9.style.display = "none";
            scrollContainer14.style.display = "none";
            scrollContainer15.style.display = "none";
            scrollContainer16.style.display = "none";
            scrollContainer17.style.display = "none";
            onX = 0;
            carou.style.transform = `translateY(-52vw)`;
            onY = 2;
            updateHighlight(onX, onY);
        });
        foum.addEventListener('click', function() {
            scrollContainer2.style.transform = `translateX(${0}vw)`;
            scrollContainer3.style.transform = `translateX(${0}vw)`;
            scrollContainer4.style.transform = `translateX(${0}vw)`;
            scrollContainer5.style.transform = `translateX(${0}vw)`;
            scrollContainer6.style.transform = `translateX(${0}vw)`;
            scrollContainer7.style.transform = `translateX(${0}vw)`;
            scrollContainer8.style.transform = `translateX(${0}vw)`;
            scrollContainer9.style.transform = `translateX(${0}vw)`;
            scrollContainer10.style.transform = `translateX(${0}vw)`;
            scrollContainer11.style.transform = `translateX(${0}vw)`;
            scrollContainer12.style.transform = `translateX(${0}vw)`;
            scrollContainer13.style.transform = `translateX(${0}vw)`;
            scrollContainer14.style.transform = `translateX(${0}vw)`;
            scrollContainer15.style.transform = `translateX(${0}vw)`;
            scrollContainer16.style.transform = `translateX(${0}vw)`;
            scrollContainer17.style.transform = `translateX(${0}vw)`;

            scrollContainer3.style.display = "flex";
            scrollContainer4.style.display = "flex";
            scrollContainer6.style.display = "flex";
            scrollContainer7.style.display = "flex";
            scrollContainer10.style.display = "flex";
            scrollContainer11.style.display = "flex";
            scrollContainer12.style.display = "flex";
            scrollContainer13.style.display = "flex";
            scrollContainer5.style.display = "none";
            scrollContainer8.style.display = "none";
            scrollContainer9.style.display = "none";
            scrollContainer14.style.display = "none";
            scrollContainer15.style.display = "none";
            scrollContainer16.style.display = "none";
            scrollContainer17.style.display = "none";
            onX = 0;
            carou.style.transform = `translateY(-78vw)`;
            onY = 3;
            updateHighlight(onX, onY);
        });
        fivm.addEventListener('click', function() {
            scrollContainer2.style.transform = `translateX(${0}vw)`;
            scrollContainer3.style.transform = `translateX(${0}vw)`;
            scrollContainer4.style.transform = `translateX(${0}vw)`;
            scrollContainer5.style.transform = `translateX(${0}vw)`;
            scrollContainer6.style.transform = `translateX(${0}vw)`;
            scrollContainer7.style.transform = `translateX(${0}vw)`;
            scrollContainer8.style.transform = `translateX(${0}vw)`;
            scrollContainer9.style.transform = `translateX(${0}vw)`;
            scrollContainer10.style.transform = `translateX(${0}vw)`;
            scrollContainer11.style.transform = `translateX(${0}vw)`;
            scrollContainer12.style.transform = `translateX(${0}vw)`;
            scrollContainer13.style.transform = `translateX(${0}vw)`;
            scrollContainer14.style.transform = `translateX(${0}vw)`;
            scrollContainer15.style.transform = `translateX(${0}vw)`;
            scrollContainer16.style.transform = `translateX(${0}vw)`;
            scrollContainer17.style.transform = `translateX(${0}vw)`;

            scrollContainer3.style.display = "flex";
            scrollContainer4.style.display = "flex";
            scrollContainer6.style.display = "flex";
            scrollContainer7.style.display = "flex";
            scrollContainer10.style.display = "flex";
            scrollContainer11.style.display = "flex";
            scrollContainer12.style.display = "flex";
            scrollContainer13.style.display = "flex";
            scrollContainer5.style.display = "none";
            scrollContainer8.style.display = "none";
            scrollContainer9.style.display = "none";
            scrollContainer14.style.display = "none";
            scrollContainer15.style.display = "none";
            scrollContainer16.style.display = "none";
            scrollContainer17.style.display = "none";
            onX = 0;
            carou.style.transform = `translateY(-104vw)`;
            onY = 4;
            updateHighlight(onX, onY);
        });
        sixm.addEventListener('click', function() {
            scrollContainer2.style.transform = `translateX(${0}vw)`;
            scrollContainer3.style.transform = `translateX(${0}vw)`;
            scrollContainer4.style.transform = `translateX(${0}vw)`;
            scrollContainer5.style.transform = `translateX(${0}vw)`;
            scrollContainer6.style.transform = `translateX(${0}vw)`;
            scrollContainer7.style.transform = `translateX(${0}vw)`;
            scrollContainer8.style.transform = `translateX(${0}vw)`;
            scrollContainer9.style.transform = `translateX(${0}vw)`;
            scrollContainer10.style.transform = `translateX(${0}vw)`;
            scrollContainer11.style.transform = `translateX(${0}vw)`;
            scrollContainer12.style.transform = `translateX(${0}vw)`;
            scrollContainer13.style.transform = `translateX(${0}vw)`;
            scrollContainer14.style.transform = `translateX(${0}vw)`;
            scrollContainer15.style.transform = `translateX(${0}vw)`;
            scrollContainer16.style.transform = `translateX(${0}vw)`;
            scrollContainer17.style.transform = `translateX(${0}vw)`;

            scrollContainer3.style.display = "flex";
            scrollContainer4.style.display = "flex";
            scrollContainer6.style.display = "flex";
            scrollContainer7.style.display = "flex";
            scrollContainer10.style.display = "flex";
            scrollContainer11.style.display = "flex";
            scrollContainer12.style.display = "flex";
            scrollContainer13.style.display = "flex";
            scrollContainer5.style.display = "none";
            scrollContainer8.style.display = "none";
            scrollContainer9.style.display = "none";
            scrollContainer14.style.display = "none";
            scrollContainer15.style.display = "none";
            scrollContainer16.style.display = "none";
            scrollContainer17.style.display = "none";
            onX = 0;
            carou.style.transform = `translateY(-130vw)`;
            onY = 5;
            updateHighlight(onX, onY);
        });
        sevm.addEventListener('click', function() {
            scrollContainer2.style.transform = `translateX(${0}vw)`;
            scrollContainer3.style.transform = `translateX(${0}vw)`;
            scrollContainer4.style.transform = `translateX(${0}vw)`;
            scrollContainer5.style.transform = `translateX(${0}vw)`;
            scrollContainer6.style.transform = `translateX(${0}vw)`;
            scrollContainer7.style.transform = `translateX(${0}vw)`;
            scrollContainer8.style.transform = `translateX(${0}vw)`;
            scrollContainer9.style.transform = `translateX(${0}vw)`;
            scrollContainer10.style.transform = `translateX(${0}vw)`;
            scrollContainer11.style.transform = `translateX(${0}vw)`;
            scrollContainer12.style.transform = `translateX(${0}vw)`;
            scrollContainer13.style.transform = `translateX(${0}vw)`;
            scrollContainer14.style.transform = `translateX(${0}vw)`;
            scrollContainer15.style.transform = `translateX(${0}vw)`;
            scrollContainer16.style.transform = `translateX(${0}vw)`;
            scrollContainer17.style.transform = `translateX(${0}vw)`;

            scrollContainer3.style.display = "flex";
            scrollContainer4.style.display = "flex";
            scrollContainer6.style.display = "flex";
            scrollContainer7.style.display = "flex";
            scrollContainer10.style.display = "flex";
            scrollContainer11.style.display = "flex";
            scrollContainer12.style.display = "flex";
            scrollContainer13.style.display = "flex";
            scrollContainer5.style.display = "none";
            scrollContainer8.style.display = "none";
            scrollContainer9.style.display = "none";
            scrollContainer14.style.display = "none";
            scrollContainer15.style.display = "none";
            scrollContainer16.style.display = "none";
            scrollContainer17.style.display = "none";
            onX = 0;
            carou.style.transform = `translateY(-156vw)`;
            onY = 6;
            updateHighlight(onX, onY);
        });
        eigm.addEventListener('click', function() {
            scrollContainer2.style.transform = `translateX(${0}vw)`;
            scrollContainer3.style.transform = `translateX(${0}vw)`;
            scrollContainer4.style.transform = `translateX(${0}vw)`;
            scrollContainer5.style.transform = `translateX(${0}vw)`;
            scrollContainer6.style.transform = `translateX(${0}vw)`;
            scrollContainer7.style.transform = `translateX(${0}vw)`;
            scrollContainer8.style.transform = `translateX(${0}vw)`;
            scrollContainer9.style.transform = `translateX(${0}vw)`;
            scrollContainer10.style.transform = `translateX(${0}vw)`;
            scrollContainer11.style.transform = `translateX(${0}vw)`;
            scrollContainer12.style.transform = `translateX(${0}vw)`;
            scrollContainer13.style.transform = `translateX(${0}vw)`;
            scrollContainer14.style.transform = `translateX(${0}vw)`;
            scrollContainer15.style.transform = `translateX(${0}vw)`;
            scrollContainer16.style.transform = `translateX(${0}vw)`;
            scrollContainer17.style.transform = `translateX(${0}vw)`;

            scrollContainer3.style.display = "flex";
            scrollContainer4.style.display = "flex";
            scrollContainer6.style.display = "flex";
            scrollContainer7.style.display = "flex";
            scrollContainer10.style.display = "flex";
            scrollContainer11.style.display = "flex";
            scrollContainer12.style.display = "flex";
            scrollContainer13.style.display = "flex";
            scrollContainer5.style.display = "none";
            scrollContainer8.style.display = "none";
            scrollContainer9.style.display = "none";
            scrollContainer14.style.display = "none";
            scrollContainer15.style.display = "none";
            scrollContainer16.style.display = "none";
            scrollContainer17.style.display = "none";
            onX = 0;
            carou.style.transform = `translateY(-182vw)`;
            onY = 7;
            updateHighlight(onX, onY);
        });
        one1m.addEventListener('click', function() {
            scrollContainer2.style.transform = `translateX(${-15.2}vw)`;

            scrollContainer3.style.display = "none";
            scrollContainer4.style.display = "none";
            scrollContainer6.style.display = "none";
            scrollContainer7.style.display = "none";
            scrollContainer10.style.display = "none";
            scrollContainer11.style.display = "none";
            scrollContainer12.style.display = "none";
            scrollContainer13.style.display = "none";
            scrollContainer5.style.display = "none";
            scrollContainer8.style.display = "none";
            scrollContainer9.style.display = "none";
            scrollContainer14.style.display = "flex";
            scrollContainer15.style.display = "flex";
            scrollContainer16.style.display = "flex";
            scrollContainer17.style.display = "flex";
            onX = 1;
            carou.style.transform = `translateY(0vw)`;
            onY = 0;
            updateHighlight(onX, onY);
        });
        two2m.addEventListener('click', function() {
            scrollContainer2.style.transform = `translateX(${-15.2}vw)`;

            scrollContainer3.style.display = "none";
            scrollContainer4.style.display = "none";
            scrollContainer6.style.display = "none";
            scrollContainer7.style.display = "none";
            scrollContainer10.style.display = "none";
            scrollContainer11.style.display = "none";
            scrollContainer12.style.display = "none";
            scrollContainer13.style.display = "none";
            scrollContainer5.style.display = "none";
            scrollContainer8.style.display = "none";
            scrollContainer9.style.display = "none";
            scrollContainer14.style.display = "flex";
            scrollContainer15.style.display = "flex";
            scrollContainer16.style.display = "flex";
            scrollContainer17.style.display = "flex";
            onX = 1;
            carou.style.transform = `translateY(-26vw)`;
            onY = 1;
            updateHighlight(onX, onY);
        });
        thr3m.addEventListener('click', function() {
            scrollContainer2.style.transform = `translateX(${-15.2}vw)`;

            scrollContainer3.style.display = "none";
            scrollContainer4.style.display = "none";
            scrollContainer6.style.display = "none";
            scrollContainer7.style.display = "none";
            scrollContainer10.style.display = "none";
            scrollContainer11.style.display = "none";
            scrollContainer12.style.display = "none";
            scrollContainer13.style.display = "none";
            scrollContainer5.style.display = "none";
            scrollContainer8.style.display = "none";
            scrollContainer9.style.display = "none";
            scrollContainer14.style.display = "flex";
            scrollContainer15.style.display = "flex";
            scrollContainer16.style.display = "flex";
            scrollContainer17.style.display = "flex";
            onX = 1;
            carou.style.transform = `translateY(-52vw)`;
            onY = 2;
            updateHighlight(onX, onY);
        });
        fou4m.addEventListener('click', function() {
            scrollContainer2.style.transform = `translateX(${-15.2}vw)`;

            scrollContainer3.style.display = "none";
            scrollContainer4.style.display = "none";
            scrollContainer6.style.display = "none";
            scrollContainer7.style.display = "none";
            scrollContainer10.style.display = "none";
            scrollContainer11.style.display = "none";
            scrollContainer12.style.display = "none";
            scrollContainer13.style.display = "none";
            scrollContainer5.style.display = "none";
            scrollContainer8.style.display = "none";
            scrollContainer9.style.display = "none";
            scrollContainer14.style.display = "flex";
            scrollContainer15.style.display = "flex";
            scrollContainer16.style.display = "flex";
            scrollContainer17.style.display = "flex";
            onX = 1;
            carou.style.transform = `translateY(-78vw)`;
            onY = 3;
            updateHighlight(onX, onY);
        });
        one11m.addEventListener('click', function() {
            scrollContainer2.style.transform = `translateX(${-30.4}vw)`;

            scrollContainer3.style.display = "none";
            scrollContainer4.style.display = "none";
            scrollContainer6.style.display = "none";
            scrollContainer7.style.display = "none";
            scrollContainer10.style.display = "none";
            scrollContainer11.style.display = "none";
            scrollContainer12.style.display = "none";
            scrollContainer13.style.display = "none";
            scrollContainer5.style.display = "none";
            scrollContainer8.style.display = "flex";
            scrollContainer9.style.display = "flex";
            scrollContainer14.style.display = "none";
            scrollContainer15.style.display = "none";
            scrollContainer16.style.display = "none";
            scrollContainer17.style.display = "none";
            onX = 2;
            carou.style.transform = `translateY(0vw)`;
            onY = 0;
            updateHighlight(onX, onY);
        });
        two22m.addEventListener('click', function() {
            scrollContainer2.style.transform = `translateX(${-30.4}vw)`;

            scrollContainer3.style.display = "none";
            scrollContainer4.style.display = "none";
            scrollContainer6.style.display = "none";
            scrollContainer7.style.display = "none";
            scrollContainer10.style.display = "none";
            scrollContainer11.style.display = "none";
            scrollContainer12.style.display = "none";
            scrollContainer13.style.display = "none";
            scrollContainer5.style.display = "none";
            scrollContainer8.style.display = "flex";
            scrollContainer9.style.display = "flex";
            scrollContainer14.style.display = "none";
            scrollContainer15.style.display = "none";
            scrollContainer16.style.display = "none";
            scrollContainer17.style.display = "none";
            onX = 2;
            carou.style.transform = `translateY(-26vw)`;
            onY = 1;
            updateHighlight(onX, onY);
        });
    } else if (scrollContainer7) {
        onem.addEventListener('click', function() {
            // scrollContainer2.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer3.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer4.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer5.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer6.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer7.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer8.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer9.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            scrollContainer2.style.transform = `translateX(${0}vw)`;
            scrollContainer3.style.transform = `translateX(${0}vw)`;
            scrollContainer4.style.transform = `translateX(${0}vw)`;
            scrollContainer5.style.transform = `translateX(${0}vw)`;
            scrollContainer6.style.transform = `translateX(${0}vw)`;
            scrollContainer7.style.transform = `translateX(${0}vw)`;
            scrollContainer8.style.transform = `translateX(${0}vw)`;
            scrollContainer9.style.transform = `translateX(${0}vw)`;

            scrollContainer3.style.display = "flex";
            scrollContainer4.style.display = "flex";
            scrollContainer6.style.display = "flex";
            scrollContainer7.style.display = "flex";
            scrollContainer5.style.display = "none";
            scrollContainer8.style.display = "none";
            scrollContainer9.style.display = "none";
            onX = 0;
            carou.style.transform = `translateY(0vw)`;
            onY = 0;
            updateHighlight(onX, onY);
            // if (onY > 0) {
            //     carou.style.transform = `translateY(0vw)`;
            //     onY = 0;
            // }
        });
        twom.addEventListener('click', function() {
            // scrollContainer2.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer3.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer4.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer5.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer6.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer7.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer8.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer9.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            scrollContainer2.style.transform = `translateX(${0}vw)`;
            scrollContainer3.style.transform = `translateX(${0}vw)`;
            scrollContainer4.style.transform = `translateX(${0}vw)`;
            scrollContainer5.style.transform = `translateX(${0}vw)`;
            scrollContainer6.style.transform = `translateX(${0}vw)`;
            scrollContainer7.style.transform = `translateX(${0}vw)`;
            scrollContainer8.style.transform = `translateX(${0}vw)`;
            scrollContainer9.style.transform = `translateX(${0}vw)`;

            scrollContainer3.style.display = "flex";
            scrollContainer4.style.display = "flex";
            scrollContainer6.style.display = "flex";
            scrollContainer7.style.display = "flex";
            scrollContainer5.style.display = "none";
            scrollContainer8.style.display = "none";
            scrollContainer9.style.display = "none";
            onX = 0;
            carou.style.transform = `translateY(-26vw)`;
            onY = 1;
            updateHighlight(onX, onY);
            // if (onY < maxYK) {
            //     carou.style.transform = `translateY(${-26}vw)`;
            //     onY = 1;
            // }
        });
        thrm.addEventListener('click', function() {
            // scrollContainer2.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer3.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer4.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer5.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer6.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer7.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer8.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer9.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            scrollContainer2.style.transform = `translateX(${0}vw)`;
            scrollContainer3.style.transform = `translateX(${0}vw)`;
            scrollContainer4.style.transform = `translateX(${0}vw)`;
            scrollContainer5.style.transform = `translateX(${0}vw)`;
            scrollContainer6.style.transform = `translateX(${0}vw)`;
            scrollContainer7.style.transform = `translateX(${0}vw)`;
            scrollContainer8.style.transform = `translateX(${0}vw)`;
            scrollContainer9.style.transform = `translateX(${0}vw)`;

            scrollContainer3.style.display = "flex";
            scrollContainer4.style.display = "flex";
            scrollContainer6.style.display = "flex";
            scrollContainer7.style.display = "flex";
            scrollContainer5.style.display = "none";
            scrollContainer8.style.display = "none";
            scrollContainer9.style.display = "none";
            onX = 0;
            carou.style.transform = `translateY(-52vw)`;
            onY = 2;
            updateHighlight(onX, onY);
            // if (onY > 0) {
            //     carou.style.transform = `translateY(${-52}vw)`;
            //     onY = 2;
            // }
        });
        foum.addEventListener('click', function() {
            // scrollContainer2.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer3.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer4.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer5.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer6.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer7.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer8.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer9.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            scrollContainer2.style.transform = `translateX(${0}vw)`;
            scrollContainer3.style.transform = `translateX(${0}vw)`;
            scrollContainer4.style.transform = `translateX(${0}vw)`;
            scrollContainer5.style.transform = `translateX(${0}vw)`;
            scrollContainer6.style.transform = `translateX(${0}vw)`;
            scrollContainer7.style.transform = `translateX(${0}vw)`;
            scrollContainer8.style.transform = `translateX(${0}vw)`;
            scrollContainer9.style.transform = `translateX(${0}vw)`;

            scrollContainer3.style.display = "flex";
            scrollContainer4.style.display = "flex";
            scrollContainer6.style.display = "flex";
            scrollContainer7.style.display = "flex";
            scrollContainer5.style.display = "none";
            scrollContainer8.style.display = "none";
            scrollContainer9.style.display = "none";
            onX = 0;
            carou.style.transform = `translateY(-78vw)`;
            onY = 3;
            updateHighlight(onX, onY);
            // if (onY < maxYK) {
            //     carou.style.transform = `translateY(${-78}vw)`;
            //     onY = 3;
            // }
        });
        one1m.addEventListener('click', function() {
            // scrollContainer2.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer3.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer4.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer5.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer6.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer7.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer8.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer9.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            scrollContainer2.style.transform = `translateX(${-15.2}vw)`;
            // scrollContainer3.style.transform = `translateX(${-15.2}vw)`;
            // scrollContainer4.style.transform = `translateX(${-15.2}vw)`;
            // scrollContainer5.style.transform = `translateX(${-15.2}vw)`;
            // scrollContainer6.style.transform = `translateX(${-15.2}vw)`;
            // scrollContainer7.style.transform = `translateX(${-15.2}vw)`;
            // scrollContainer8.style.transform = `translateX(${-15.2}vw)`;
            // scrollContainer9.style.transform = `translateX(${-15.2}vw)`;

            scrollContainer3.style.display = "none";
            scrollContainer4.style.display = "none";
            scrollContainer6.style.display = "none";
            scrollContainer7.style.display = "none";
            scrollContainer5.style.display = "none";
            scrollContainer8.style.display = "flex";
            scrollContainer9.style.display = "flex";
            onX = 1;
            carou.style.transform = `translateY(0vw)`;
            onY = 0;
            updateHighlight(onX, onY);
            // if (onY < maxYK) {
            //     carou.style.transform = `translateY(${-0}vw)`;
            //     onY = 0;
            // }
        });
        two2m.addEventListener('click', function() {
            // scrollContainer2.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer3.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer4.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer5.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer6.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer7.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer8.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            // scrollContainer9.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            scrollContainer2.style.transform = `translateX(${-15.2}vw)`;
            // scrollContainer3.style.transform = `translateX(${-15.2}vw)`;
            // scrollContainer4.style.transform = `translateX(${-15.2}vw)`;
            // scrollContainer5.style.transform = `translateX(${-15.2}vw)`;
            // scrollContainer6.style.transform = `translateX(${-15.2}vw)`;
            // scrollContainer7.style.transform = `translateX(${-15.2}vw)`;
            // scrollContainer8.style.transform = `translateX(${-15.2}vw)`;
            // scrollContainer9.style.transform = `translateX(${-15.2}vw)`;

            scrollContainer3.style.display = "none";
            scrollContainer4.style.display = "none";
            scrollContainer6.style.display = "none";
            scrollContainer7.style.display = "none";
            scrollContainer5.style.display = "none";
            scrollContainer8.style.display = "flex";
            scrollContainer9.style.display = "flex";
            onX = 1;
            carou.style.transform = `translateY(-26vw)`;
            onY = 1;
            updateHighlight(onX, onY);
            // if (onY < maxYK) {
            //     carou.style.transform = `translateY(${-26}vw)`;
            //     onY = 1;
            // }
        });
    } else {
        onem.addEventListener('click', function() {
            scrollContainer2.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            scrollContainer3.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            scrollContainer4.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            scrollContainer5.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            scrollContainer3.style.display = "flex";
            scrollContainer4.style.display = "flex";
            scrollContainer5.style.display = "none";
            onX = 0;
            if (onY > 0) {
                carou.style.transform = `translateY(0vw)`;
                onY = 0;
            }
            updateHighlight(onX, onY);
        });
        twom.addEventListener('click', function() {
            scrollContainer2.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            scrollContainer3.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            scrollContainer4.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            scrollContainer5.scrollBy({ left: -roundWidth, behavior: 'smooth' });
            scrollContainer3.style.display = "flex";
            scrollContainer4.style.display = "flex";
            scrollContainer5.style.display = "none";
            onX = 0;
            if (onY < maxYK) {
                carou.style.transform = `translateY(${-26}vw)`;
                onY = 1;
            }
            updateHighlight(onX, onY);
        });
    }
}




function updateHighlight(onX, onY) {
    const gridContainer = document.querySelector('.map-grid');
    document.querySelectorAll('.cello.active').forEach(cello =>
        cello.classList.remove('active')
    );

    if (onX == 0) {
        if (onY == 0) {
            document.querySelector('.one-map').classList.add('active');
        } else if (onY == 1) {
            document.querySelector('.two-map').classList.add('active');
        } else if (onY == 2) {
            document.querySelector('.thr-map').classList.add('active');
        } else if (onY == 3) {
            document.querySelector('.fou-map').classList.add('active');
        } else if (onY == 4) {
            document.querySelector('.fiv-map').classList.add('active');
        } else if (onY == 5) {
            document.querySelector('.six-map').classList.add('active');
        } else if (onY == 6) {
            document.querySelector('.sev-map').classList.add('active');
        } else if (onY == 7) {
            document.querySelector('.eig-map').classList.add('active');
        } else {
            console.log("highlight error");
        }
    } else if (onX == 1) {
        sizeNot32 = document.querySelector('.one1-map');
        if (sizeNot32) {
            if (onY == 0) {
                document.querySelector('.one1-map').classList.add('active');
            } else if (onY == 1) {
                document.querySelector('.two2-map').classList.add('active');
            } else if (onY == 2) {
                document.querySelector('.thr3-map').classList.add('active');
            } else if (onY == 3) {
                document.querySelector('.fou4-map').classList.add('active');
            } else {
                console.log("highlight error");
            }
        } else {
            document.querySelector('.map16').classList.add('active');
        }
    } else if (onX == 2) {
        sizeNot64 = document.querySelector('.one11-map');
        if (sizeNot64) {
            if (onY == 0) {
                document.querySelector('.one11-map').classList.add('active');
            } else if (onY == 1) {
                document.querySelector('.two22-map').classList.add('active');
            } else {
                console.log("highlight error");
            }
        } else {
            document.querySelector('.map16').classList.add('active');
        }
    } else if (onX == 3) {
        if (onY == 0) {
            document.querySelector('.map16').classList.add('active');
        } else {
            console.log("highlight error");
        }
    } else {
        console.log("highlight error x");
    }
}




function buildPageP3(data, name) {
    const nameKey = name.replace(/\s+/g, '');

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

    const totStats = data[srvKey + "w1"];
    const servStats = data[srvKey];
    const retStats = data[retKey];
    const allMat = document.querySelector('.all-matmat');
    const allSta = document.querySelector('.all-stasta');
    
    for (let i = 0; i < servStats.length; i++) {
        let matDic1 = servStats[i];
        if (matDic1.result3 == 1) {
            if (normalize(matDic1.tname).includes(normalize(tournamentId))) {
                const match = document.createElement('tr');

                match.innerHTML = `
                    <td>${matDic1.roundN}</td>
                    <td>${name}</td>
                    <td>${matDic1.oppName}</td>
                    <td>${matDic1.score}</td>
                    <td>${matDic1.time3}</td>
                `;

                allMat.appendChild(match);
            }
        }
    }


    const tourStats = {"bpsvd": 0, "bpfac": 0, "bpgen": 0, "bpcnv": 0, "match": 0, "sets": 0, "df": 0, "ace": 0, "tp": 0, "sp": 0, "sp1": 0};
    let playedTour = 0;
    for (let i = 0; i < servStats.length; i++) {
        let matDic1 = servStats[i];
        let matDic2 = retStats[i];
        let matDic3 = totStats[i+1];
        if (normalize(matDic1.tname).includes(normalize(tournamentId))) {
            const [bpsvdVal, bpfacVal] = matDic1.bpsvd.split("/").map(val => parseInt(val, 10));
            tourStats["bpsvd"] += bpsvdVal;
            tourStats["bpfac"] += bpfacVal;
            tourStats["match"] += 1;
            playedTour = 1;
        }
        if (normalize(matDic2.tname).includes(normalize(tournamentId))) {
            const [bpcnvVal, bpgenVal] = matDic2.bpcnv.split("/").map(val => parseInt(val, 10));
            tourStats["bpcnv"] += bpcnvVal;
            tourStats["bpgen"] += bpgenVal;
            tourStats["sets"] += countDashes(matDic2.score);
            playedTour = 1;
        }
        if (normalize(matDic3.tname).includes(normalize(tournamentId))) {
            tourStats["tp"] += parseInt(matDic3.tp, 10);
            tourStats["ace"] += parseInt(matDic3.ace, 10);
            tourStats["df"] += parseInt(matDic3.df, 10);
            tourStats["sp"] += parseInt(matDic3.sp, 10);
            tourStats["sp1"] += parseInt(matDic3.sp1, 10);
            playedTour = 1;
        }
    }

    if (playedTour == 1) {
        const sta = document.createElement('tr');

        sta.innerHTML = `
            <td>${name}</td>
            <td>${tourStats.match}</td>
            <td>${tourStats.ace}</td>
            <td>${tourStats.df}</td>
            <td>${tourStats.bpsvd}/${tourStats.bpfac}</td>
            <td>${tourStats.bpcnv}/${tourStats.bpgen}</td>
            <td>${tourStats.tp}</td>
            <td>${tourStats.sp}</td>
            <td>${parseFloat((tourStats.sp1 * 100) / tourStats.sp).toFixed(1)}</td>
            <td>${parseFloat((tourStats.ace * 100) / tourStats.sp).toFixed(1)}</td>
            <td>${parseFloat((tourStats.df * 100) / tourStats.sp).toFixed(1)}</td>
            <td>${tourStats.sets}</td>
        `;

        allSta.appendChild(sta);
        playedTour = 0;
    }
}








function sortMatches() {
    const sortOrder = ["F", "SF", "QF", "R16", "R32", "R64", "R128"];
    const tbody = document.querySelector(".all-matmat");

    // Convert rows to array
    const rows = Array.from(tbody.querySelectorAll("tr"));

    // Sort rows by first column (round)
    rows.sort((a, b) => {
        const roundA = a.children[0].textContent.trim();
        const roundB = b.children[0].textContent.trim();

        const indexA = sortOrder.indexOf(roundA);
        const indexB = sortOrder.indexOf(roundB);

        // If not found in sortOrder, send to end
        const safeIndexA = indexA === -1 ? Infinity : indexA;
        const safeIndexB = indexB === -1 ? Infinity : indexB;

        return safeIndexA - safeIndexB;
    });

    // Clear and re-append sorted rows
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
}

function countDashes(str) {
    return str.split("-").length - 1;
}

function normalize(str) {
    return str.toLowerCase().replace(/\s+/g, '');
}



// SIDE MENU FUNCTION
const track = document.querySelector('.text-track');
const buttonsT = document.querySelectorAll('.tabs-button');

buttonsT.forEach(buttonT => {
    buttonT.addEventListener('click', () => {
        const index = parseInt(buttonT.dataset.index, 10);
        document.querySelector('.draw-map').style.display = 'flex';
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
































// // R1
// const round1 = b1.querySelector('.r1');
// const matches1 = round1.querySelectorAll('.match');

// matches1.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round128_scores'];

//     scoreDivs[0].textContent = matchScores[index*2].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
// });

// const round2 = b2.querySelector('.r1');
// const matches2 = round2.querySelectorAll('.match');

// matches2.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round128_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+16].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+17].join(' ');
// });

// const round3 = b3.querySelector('.r1');
// const matches3 = round3.querySelectorAll('.match');

// matches3.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round128_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+32].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+33].join(' ');
// });

// const round4 = b4.querySelector('.r1');
// const matches4 = round4.querySelectorAll('.match');

// matches4.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round128_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+48].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+49].join(' ');
// });

// const round5 = b5.querySelector('.r1');
// const matches5 = round5.querySelectorAll('.match');

// matches5.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round128_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+64].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+65].join(' ');
// });

// const round6 = b6.querySelector('.r1');
// const matches6 = round6.querySelectorAll('.match');

// matches6.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round128_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+80].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+81].join(' ');
// });

// const round7 = b7.querySelector('.r1');
// const matches7 = round7.querySelectorAll('.match');

// matches7.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round128_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+96].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+97].join(' ');
// });

// const round8 = b8.querySelector('.r1');
// const matches8 = round8.querySelectorAll('.match');

// matches8.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round128_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+112].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+113].join(' ');
// });


// // R2
// const round12 = b1.querySelector('.r2');
// const matches12 = round12.querySelectorAll('.match');

// matches12.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round64_scores'];

//     scoreDivs[0].textContent = matchScores[index*2].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
// });

// const round22 = b2.querySelector('.r2');
// const matches22 = round22.querySelectorAll('.match');

// matches22.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round64_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+8].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+9].join(' ');
// });

// const round32 = b3.querySelector('.r2');
// const matches32 = round32.querySelectorAll('.match');

// matches32.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round64_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+16].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+17].join(' ');
// });

// const round42 = b4.querySelector('.r2');
// const matches42 = round42.querySelectorAll('.match');

// matches42.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round64_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+24].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+25].join(' ');
// });

// const round52 = b5.querySelector('.r2');
// const matches52 = round52.querySelectorAll('.match');

// matches52.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round64_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+32].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+33].join(' ');
// });

// const round62 = b6.querySelector('.r2');
// const matches62 = round62.querySelectorAll('.match');

// matches62.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round64_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+40].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+41].join(' ');
// });

// const round72 = b7.querySelector('.r2');
// const matches72 = round72.querySelectorAll('.match');

// matches72.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round64_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+48].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+49].join(' ');
// });

// const round82 = b8.querySelector('.r2');
// const matches82 = round82.querySelectorAll('.match');

// matches82.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round64_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+56].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+57].join(' ');
// });

// const round92 = a4.querySelector('.r2');
// const matches92 = round92.querySelectorAll('.match');

// matches92.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round64_scores'];

//     scoreDivs[0].textContent = matchScores[index*2].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
// });

// const round102 = a5.querySelector('.r2');
// const matches102 = round102.querySelectorAll('.match');

// matches102.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round64_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+16].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+17].join(' ');
// });

// const round112 = a6.querySelector('.r2');
// const matches112 = round112.querySelectorAll('.match');

// matches112.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round64_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+32].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+33].join(' ');
// });

// const round122 = a7.querySelector('.r2');
// const matches122 = round122.querySelectorAll('.match');

// matches122.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round64_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+48].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+49].join(' ');
// });


// // R3
// const round13 = b1.querySelector('.r3');
// const matches13 = round13.querySelectorAll('.match');

// matches13.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round32_scores'];

//     scoreDivs[0].textContent = matchScores[index*2].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
// });

// const round23 = b2.querySelector('.r3');
// const matches23 = round23.querySelectorAll('.match');

// matches23.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round32_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+4].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+5].join(' ');
// });

// const round33 = b3.querySelector('.r3');
// const matches33 = round33.querySelectorAll('.match');

// matches33.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round32_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+8].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+9].join(' ');
// });

// const round43 = b4.querySelector('.r3');
// const matches43 = round43.querySelectorAll('.match');

// matches43.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round32_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+12].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+13].join(' ');
// });

// const round53 = b5.querySelector('.r3');
// const matches53 = round53.querySelectorAll('.match');

// matches53.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round32_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+16].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+17].join(' ');
// });

// const round63 = b6.querySelector('.r3');
// const matches63 = round63.querySelectorAll('.match');

// matches63.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round32_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+20].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+21].join(' ');
// });

// const round73 = b7.querySelector('.r3');
// const matches73 = round73.querySelectorAll('.match');

// matches73.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round32_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+24].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+25].join(' ');
// });

// const round83 = b8.querySelector('.r3');
// const matches83 = round83.querySelectorAll('.match');

// matches83.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round32_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+28].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+29].join(' ');
// });

// const round93 = a4.querySelector('.r3');
// const matches93 = round93.querySelectorAll('.match');

// matches93.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round32_scores'];

//     scoreDivs[0].textContent = matchScores[index*2].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
// });

// const round103 = a5.querySelector('.r3');
// const matches103 = round103.querySelectorAll('.match');

// matches103.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round32_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+8].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+9].join(' ');
// });

// const round113 = a6.querySelector('.r3');
// const matches113 = round113.querySelectorAll('.match');

// matches113.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round32_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+16].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+17].join(' ');
// });

// const round123 = a7.querySelector('.r3');
// const matches123 = round123.querySelectorAll('.match');

// matches123.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round32_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+24].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+25].join(' ');
// });

// const round133 = a2.querySelector('.r3');
// const matches133 = round133.querySelectorAll('.match');

// matches133.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round32_scores'];

//     scoreDivs[0].textContent = matchScores[index*2].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
// });

// const round143 = a3.querySelector('.r3');
// const matches143 = round143.querySelectorAll('.match');

// matches143.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round32_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+16].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+17].join(' ');
// });


// // R4
// const round14 = b1.querySelector('.r4');
// const matches14 = round14.querySelectorAll('.match');

// matches14.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round16_scores'];

//     scoreDivs[0].textContent = matchScores[index*2].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
// });

// const round24 = b2.querySelector('.r4');
// const matches24 = round24.querySelectorAll('.match');

// matches24.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round16_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+2].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+3].join(' ');
// });

// const round34 = b3.querySelector('.r4');
// const matches34 = round34.querySelectorAll('.match');

// matches34.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round16_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+4].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+5].join(' ');
// });

// const round44 = b4.querySelector('.r4');
// const matches44 = round44.querySelectorAll('.match');

// matches44.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round16_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+6].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+7].join(' ');
// });

// const round54 = b5.querySelector('.r4');
// const matches54 = round54.querySelectorAll('.match');

// matches54.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round16_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+8].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+9].join(' ');
// });

// const round64 = b6.querySelector('.r4');
// const matches64 = round64.querySelectorAll('.match');

// matches64.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round16_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+10].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+11].join(' ');
// });

// const round74 = b7.querySelector('.r4');
// const matches74 = round74.querySelectorAll('.match');

// matches74.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round16_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+12].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+13].join(' ');
// });

// const round84 = b8.querySelector('.r4');
// const matches84 = round84.querySelectorAll('.match');

// matches84.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round16_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+14].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+15].join(' ');
// });

// const round94 = a4.querySelector('.r4');
// const matches94 = round94.querySelectorAll('.match');

// matches94.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round16_scores'];

//     scoreDivs[0].textContent = matchScores[index*2].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
// });

// const round104 = a5.querySelector('.r4');
// const matches104 = round104.querySelectorAll('.match');

// matches104.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round16_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+4].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+5].join(' ');
// });

// const round114 = a6.querySelector('.r4');
// const matches114 = round114.querySelectorAll('.match');

// matches114.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round16_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+8].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+9].join(' ');
// });

// const round124 = a7.querySelector('.r4');
// const matches124 = round124.querySelectorAll('.match');

// matches124.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round16_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+12].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+13].join(' ');
// });

// const round134 = a2.querySelector('.r4');
// const matches134 = round134.querySelectorAll('.match');

// matches134.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round16_scores'];

//     scoreDivs[0].textContent = matchScores[index*2].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
// });

// const round144 = a3.querySelector('.r4');
// const matches144 = round144.querySelectorAll('.match');

// matches144.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round16_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+8].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+9].join(' ');
// });

// const round154 = a1.querySelector('.r4');
// const matches154 = round154.querySelectorAll('.match');

// matches154.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['round16_scores'];

//     scoreDivs[0].textContent = matchScores[index*2].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
// });


// // R5
// const round95 = a4.querySelector('.r5');
// const matches95 = round95.querySelectorAll('.match');

// matches95.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['roundQF_scores'];

//     scoreDivs[0].textContent = matchScores[index*2].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
// });

// const round105 = a5.querySelector('.r5');
// const matches105 = round105.querySelectorAll('.match');

// matches105.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['roundQF_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+2].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+3].join(' ');
// });

// const round115 = a6.querySelector('.r5');
// const matches115 = round115.querySelectorAll('.match');

// matches115.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['roundQF_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+4].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+5].join(' ');
// });

// const round125 = a7.querySelector('.r5');
// const matches125 = round125.querySelectorAll('.match');

// matches125.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['roundQF_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+6].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+7].join(' ');
// });

// const round135 = a2.querySelector('.r5');
// const matches135 = round135.querySelectorAll('.match');

// matches135.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['roundQF_scores'];

//     scoreDivs[0].textContent = matchScores[index*2].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
// });

// const round145 = a3.querySelector('.r5');
// const matches145 = round145.querySelectorAll('.match');

// matches145.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['roundQF_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+4].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+5].join(' ');
// });

// const round155 = a1.querySelector('.r5');
// const matches155 = round155.querySelectorAll('.match');

// matches155.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['roundQF_scores'];

//     scoreDivs[0].textContent = matchScores[index*2].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
// });


// // R6
// const round136 = a2.querySelector('.r6');
// const matches136 = round136.querySelectorAll('.match');

// matches136.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['roundSF_scores'];

//     scoreDivs[0].textContent = matchScores[index*2].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
// });

// const round146 = a3.querySelector('.r6');
// const matches146 = round146.querySelectorAll('.match');

// matches146.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['roundSF_scores'];

//     scoreDivs[0].textContent = matchScores[index*2+2].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+3].join(' ');
// });

// const round156 = a1.querySelector('.r6');
// const matches156 = round156.querySelectorAll('.match');

// matches156.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['roundSF_scores'];

//     scoreDivs[0].textContent = matchScores[index*2].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
// });


// // R7
// const round157 = a1.querySelector('.r7');
// const matches157 = round157.querySelectorAll('.match');

// matches157.forEach((matchDiv, index) => {
//     const scoreDivs = matchDiv.querySelectorAll('.draw-score');
//     const matchScores = scoresData['roundF_scores'];

//     scoreDivs[0].textContent = matchScores[index*2].join(' ');
//     scoreDivs[1].textContent = matchScores[index*2+1].join(' ');
// });











// function setUpMap() {
//     // MAP FOR DRAW FUNCTION
//     const topHalf = document.querySelector('.top-map');
//     const botHalf = document.querySelector('.bot-map');
//     const toptop = document.querySelector('.pd1');
//     const botbot = document.querySelector('.pd2');
//     const caru = document.querySelector('.b-caru')
//     topHalf.addEventListener('click', function() {
//         // toptop.style.display = "flex";
//         // botbot.style.display = "flex";
//         caru.style.transform = `translateY(0vw)`;
//     });
//     botHalf.addEventListener('click', function() {
//         // toptop.style.display = "none";
//         // botbot.style.display = "flex";
//         caru.style.transform = `translateY(${-26}vw)`;
//     });
// }







