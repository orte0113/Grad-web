// State
let currentLang = 'en';
let currentPage = 'home';
let isTransitioning = false;

// DOM elements
const langToggle = document.getElementById('langToggle');
const pageContent = document.getElementById('pageContent');
const mainPage = document.getElementById('mainPage');
const navButtons = document.querySelectorAll('.nav-btn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateLanguage();
    renderPage('home');
    
    // Language toggle
    langToggle.addEventListener('click', toggleLanguage);
    
    // Navigation buttons
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const page = btn.getAttribute('data-page');
            changePage(page);
        });
    });
});

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'es' : 'en';
    updateLanguage();
}

function updateLanguage() {
    const t = translations[currentLang];
    
    // Update language toggle button
    langToggle.textContent = t.langToggle;
    
    // Update navigation buttons
    document.getElementById('navHome').textContent = t.navHome;
    document.getElementById('navSchedule').textContent = t.navSchedule;
    document.getElementById('navTravel').textContent = t.navTravel;
    document.getElementById('navActivities').textContent = t.navActivities;
    
    // Re-render current page with fade
    mainPage.classList.add('fading-out');
    
    setTimeout(() => {
        renderPage(currentPage);
        mainPage.classList.remove('fading-out');
        mainPage.classList.add('fading-in');
        
        setTimeout(() => {
            mainPage.classList.remove('fading-in');
        }, 400);
    }, 400);
}

function changePage(page) {
    if (page === currentPage || isTransitioning) return;
    
    isTransitioning = true;
    mainPage.classList.add('fading-out');
    
    // Update active nav button
    navButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-page') === page) {
            btn.classList.add('active');
        }
    });
    
    setTimeout(() => {
        currentPage = page;
        renderPage(page);
        mainPage.classList.remove('fading-out');
        mainPage.classList.add('fading-in');
        
        setTimeout(() => {
            mainPage.classList.remove('fading-in');
            isTransitioning = false;
        }, 400);
    }, 400);
}

function renderPage(page) {
    const t = translations[currentLang];
    
    switch(page) {
        case 'home':
            pageContent.innerHTML = renderHomePage(t);
            break;
        case 'schedule':
            pageContent.innerHTML = renderSchedulePage(t);
            break;
        case 'travel':
            pageContent.innerHTML = renderTravelPage(t);
            break;
        case 'activities':
            pageContent.innerHTML = renderActivitiesPage(t);
            break;
    }
}

function renderHomePage(t) {
    return `
        <div class="fern-accent"></div>
        <p class="invitation-text">${t.invitedTo}</p>
        <h1>${t.graduationTitle}</h1>
        <div class="accent-line"></div>
        <p class="date-highlight">${t.mayDates}</p>
        <p class="location">${t.csuLocation}<br/>${t.fortCollins}</p>
    `;
}

function renderSchedulePage(t) {
    return `
        <h2 class="section-title">${t.scheduleTitle}</h2>
        
        <div class="info-block">
            <h3>${t.friday}</h3>
            <p><strong>2:30 PM - 3:30 PM</strong></p>
            <p>${t.ethnicStudies}</p>
            <p class="location">${t.location}: ${t.ceremonyTent}</p>
            <p style="margin-top: 15px"><strong>4:00 PM - 6:00 PM</strong></p>
            <p>${t.dinner}</p>
            <p style="margin-top: 15px"><strong>7:30 PM - 9:30 PM</strong></p>
            <p>${t.computerScience}</p>
            <p class="location">${t.location}: ${t.mobyArena}</p>
        </div>

        <div class="info-block">
            <h3>${t.saturday}</h3>
            <p><strong>10:00 AM - 11:30 AM</strong></p>
            <p>${t.universityWide}</p>
            <p class="location">${t.location}: ${t.canvasStadium}</p>
            <p style="margin-top: 15px; font-style: italic">${t.cookout}</p>
        </div>

        <div class="info-block">
            <h3>${t.whatToWear}</h3>
            <p>${t.attireDesc}</p>
            <p style="margin-top: 10px">${t.weatherNote}</p>
        </div>
    `;
}

function renderTravelPage(t) {
    return `
        <h2 class="section-title">${t.travelTitle}</h2>
        
        <div class="info-block">
            <h3>${t.gettingThere}</h3>
            <p>${t.airportInfo}</p>
            <p style="margin-top: 15px"><strong>${t.flightInfo}</strong></p>
            <ul>
                <li>${t.flightRange}</li>
                <li><strong>${t.important}</strong> ${t.frontierNote}</li>
            </ul>
        </div>

        <div class="info-block">
            <h3>${t.whereToStay}</h3>
            <p>${t.hotelRange}</p>
            
            <p style="margin-top: 20px"><strong>${t.familyAirbnb}</strong></p>
            <p>3523 North Franklin Avenue<br/>Loveland, CO 80538</p>
            <p style="margin-top: 10px; font-style: italic">${t.limitedAvailability}</p>
            
            <p style="margin-top: 20px"><strong>${t.recommendedHotels}</strong></p>
            <p style="font-style: italic; font-size: 0.9em; margin-top: 10px">${t.hotelNote}</p>
        </div>

        <div class="info-block">
            <h3>${t.arrivalDeparture}</h3>
            <p><strong>${t.thursday}</strong></p>
            <p>${t.thursdayDesc}</p>
            <p style="margin-top: 15px"><strong>${t.sunday}</strong></p>
            <p>${t.sundayDesc}</p>
        </div>
    `;
}

function renderActivitiesPage(t) {
    return `
        <h2 class="section-title">${t.activitiesTitle}</h2>
        
        <div class="info-block">
            <h3>${t.localAttractions}</h3>
            <p><strong>${t.flowerGardens}</strong></p>
            <p>${t.gardensDesc}</p>
            
            <p style="margin-top: 20px"><strong>${t.downtown}</strong></p>
            <p>${t.downtownDesc}</p>
        </div>

        <div class="info-block">
            <h3>${t.dayTrips}</h3>
            <p><strong>${t.rmnp}</strong></p>
            <p>${t.rmnpDesc}</p>
            
            <p style="margin-top: 20px"><strong>${t.horsetooth}</strong></p>
            <p>${t.horsetoothDesc}</p>
            
            <p style="margin-top: 20px"><strong>${t.poudreCanyon}</strong></p>
            <p>${t.poudreCanyonDesc}</p>
        </div>

        <div class="info-block">
            <h3>${t.campusTour}</h3>
            <p>${t.campusTourDesc}</p>
        </div>
    `;
}