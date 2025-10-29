
// // Example: list players from round16
// const players32 = data.round32;
// // const roundList32 = document.querySelector('.r3');
// const roundLista32 = b1.querySelector('.r1');
// const roundListb32 = b2.querySelector('.r1');
// // const roundList32 = a1.querySelector('.r1');
// // roundList32.innerHTML = '';
// roundLista32.innerHTML = '';
// roundListb32.innerHTML = '';
// <div class="r-ply"></div> 

// for (let i = 0; i < data.length; i++) {
function rankPopulate (data) {
    rankDiv = document.querySelector('.r-ply');
    
    for (let i = 0; i < 200; i++) {
        const rankData = data[i];

        const matchDiv = document.createElement('div');
        // matchDiv.classList.add('match');

        matchDiv.innerHTML = `
            <div class="player-card p-card">
                <div class="rankLabel">${rankData[0]}</div>
                <div class="detailsCol rankSec">
                    <div class="ch">${rankData[1]}</div>
                    <div class="change-label">${rankData[2]}</div>
                </div>
                <div class="playerInfo">
                    <div class="infoCol">
                        <div class="nameCol">${rankData[3]}</div>
                        <div class="ageCol">${rankData[4]}</div>
                        <div class="natCol">${rankData[5]}</div>
                    </div>
                    <div class="r-data">
                        <div class="detailsCol pointSec">
                            <div class="r-point">${rankData[6]}</div>
                            <div class="r-tourn r-tourn-text">${rankData[8]}</div>
                            <div class="r-max">${rankData[9]}</div>
                        </div>
                        <div class="detailsCol xtraSec">
                            <div class="r-count">0</div>
                        </div>
                    </div>
                </div>
                <div class="expWrapper">
                    <span class="expandIcon"></span>
                </div>
            </div>
            <div class="player-details">
                <p><strong>Nationality:</strong>${rankData[5]}</p>
                <p><strong>Age:</strong>${rankData[4]}</p>
                <p><strong>Coach:</strong>COACH</p>
                <p><strong>Titles:</strong>TITLES</p>
                <p><strong>Last 5 Matches:</strong>XXXXX</p>
            </div>
        `;

        rankDiv.appendChild(matchDiv);
    }
}

function cardExp () {
    document.querySelectorAll('.p-card').forEach((card, i) => {
        card.addEventListener('click', () => {
            card.classList.toggle('activePlayer');
            console.log("clicked me");
            const next = card.nextElementSibling;
            if (next && next.classList.contains('player-details')) {
            next.style.display = next.style.display === 'flex' ? 'none' : 'flex';
            }
        });
    });
}


document.addEventListener("DOMContentLoaded", () => {
    fetch('https://raw.githubusercontent.com/einani/adIn-data/main/data/update_rank1025.json')
        .then(response => response.json())
        .then(data => {
            rankPopulate(data);
        })
        .then(() => cardExp())
        .catch(error => {
            console.error('Error fetching ranking data:', error);
        });
});































