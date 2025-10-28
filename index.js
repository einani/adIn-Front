let viewportHeight = window.innerHeight / 2;
let viewportWidth = window.innerWidth;

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
    // document.querySelectorAll(".side-menu").forEach(tabsContainer => {
    //     tabsContainer.querySelector(".tabs-button").click();
    // });
    viewportHeight = window.innerHeight / 2;
    viewportWidth = window.innerWidth;
    document.documentElement.style.setProperty('--vh', `${viewportHeight}px`);
    document.documentElement.style.setProperty('--vw', `${viewportWidth}px`);


    // FOR LOADING DATA
    fetch('data/output.json')
        .then(response => response.json())
        .then(data => {
            // Insert JSON data into HTML elements
            document.getElementById('player-country').textContent = data.country;
            document.getElementById('player-hand').textContent = data.hand;
        })
        .catch(error => console.error('Error loading JSON:', error));
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





// LIVE EVENTS MENU EXPANSION FUNCTION
const liveE = document.querySelector('.live-events');
const liveT = document.querySelector('.l-text');
let liveEx = false;
liveE.addEventListener('click', (e) => {
    if (liveEx) {
        // liveE.style.alignItems = "end";
        liveE.style.height = "80vh";
        liveE.style.width = "20vw";
        // liveT.style.marginLeft = "7vw";
        // liveT.style.marginRight = "8vw"; 
        liveT.style.display = "none"; 
    }
    else {
        // liveE.style.alignItems = "center";
        liveE.style.height = "2.5vw";
        liveE.style.width = "12.5vw";
        // liveT.style.marginLeft = "3.5vw";
        // liveT.style.marginRight = "4.5vw";
        liveT.style.display = "flex";        
    }
    liveEx = !liveEx;
});



// NAVBAR CONTRAST UPDATER AND SIDE MENU VISUAL
const scrollContainer = document.querySelector('.scroll-container');
const box = document.getElementById('colorBox');
const side = document.getElementById('side-menu');
const section = document.getElementById('targetSection');
const sea = document.getElementById('sicon');
const clo = document.getElementById('cicon');

scrollContainer.addEventListener('scroll', () => {
    const containerScrollTop = scrollContainer.scrollTop;
    const containerOffsetTop = section.offsetTop - scrollContainer.offsetTop;
    const sectionHeight = section.offsetHeight;
  
    // Adjust for scrollContainer's relative scroll position
    const scrollY = containerScrollTop + scrollContainer.clientHeight / 2;
  
    if (scrollY >= containerOffsetTop && scrollY <= containerOffsetTop + sectionHeight) {
        const scrollFraction = (scrollY - containerOffsetTop) / (sectionHeight / 2);
  
        const colour = Math.round(255 * scrollFraction);
  
        box.style.backgroundColor = `rgba(${colour}, ${colour}, ${colour}, 0.5)`;
        sea.style.backgroundColor = `rgba(${colour}, ${colour}, ${colour}, 0.5)`;
        clo.style.backgroundColor = `rgba(${colour}, ${colour}, ${colour}, 0.5)`;
    } 
});


// WINDOW HEIGHT CALC
window.addEventListener("resize", () => {
    viewportHeight = window.innerHeight / 2;
    document.documentElement.style.setProperty('--vh', `${viewportHeight}px`);
    viewportWidth = window.innerWidth;
    document.documentElement.style.setProperty('--vw', `${viewportWidth}px`);
});
































