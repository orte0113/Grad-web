// State - with localStorage for persistence
let currentLang = localStorage.getItem('graduationLang') || 'en';
let currentPage = localStorage.getItem('graduationPage') || 'home';
let isTransitioning = false;

// DOM elements
const langToggle = document.getElementById('langToggle');
const pageContent = document.getElementById('pageContent');
const mainPage = document.getElementById('mainPage');
const navButtons = document.querySelectorAll('.nav-btn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Show welcome animation on first visit
    createWelcomeAnimation();
    
    updateLanguage();
    renderPage(currentPage);
    
    // Set active nav button for current page
    navButtons.forEach(btn => {
        if (btn.getAttribute('data-page') === currentPage) {
            btn.classList.add('active');
        }
    });
    
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
    localStorage.setItem('graduationLang', currentLang);
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
    
    // Update disclaimer text
    const disclaimerText = document.getElementById('disclaimerText');
    const phoneNumber = document.getElementById('phoneNumber');
    const emailLink = document.getElementById('emailLink');
    
    if (disclaimerText) disclaimerText.textContent = t.disclaimerText;
    if (phoneNumber) phoneNumber.textContent = t.phoneNumber;
    if (emailLink) emailLink.textContent = t.email;
    
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
        localStorage.setItem('graduationPage', page);
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
            <p style="margin-top: 15px; font-style: italic; font-size: 0.95em;">${t.transportationNote}</p>
            <p style="margin-top: 15px"><strong>${t.flightInfo}</strong></p>
            <ul>
                <li>${t.flightRange}</li>
                <li><strong>${t.important}</strong> ${t.frontierNote}</li>
            </ul>
            <p style="margin-top: 20px"><strong>${t.carRentals}</strong></p>
            <p>${t.carRentalInfo} <a href="${t.carRentalLink}" target="_blank" style="color: #d4af37; text-decoration: underline;">${t.viewCarRentals}</a></p>
        </div>

        <div class="info-block">
            <h3>${t.whereToStay}</h3>
            <p>${t.hotelRange}</p>
            
            <p style="margin-top: 20px"><strong>${t.familyAirbnb}</strong></p>
            <p>3523 North Franklin Avenue<br/>Loveland, CO 80538</p>
            <p style="margin-top: 10px; font-style: italic">${t.limitedAvailability}</p>
            
            <p style="margin-top: 20px"><strong>${t.recommendedHotels}</strong></p>
            <div style="margin-top: 10px;">
                <div style="margin-bottom: 15px;">
                    <strong>${t.hiltonHotel}</strong><br/>
                    <a href="${t.hiltonLink}" target="_blank" style="color: #2d5016; text-decoration: underline;">${t.viewBooking}</a>
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>${t.remingtonHotel}</strong><br/>
                    <a href="${t.remingtonLink}" target="_blank" style="color: #2d5016; text-decoration: underline;">${t.viewBooking}</a>
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>${t.flatsHotel}</strong><br/>
                    <a href="${t.flatsLink}" target="_blank" style="color: #2d5016; text-decoration: underline;">${t.viewBooking}</a>
                </div>
            </div>
            <p style="font-style: italic; font-size: 0.9em; margin-top: 15px; color: #2d5016;">${t.airbnbNote}</p>
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
            <p style="margin-top: 8px;"><a href="${t.rmnpLink}" target="_blank" style="color: #d4af37; text-decoration: underline;">${t.officialWebsite}</a></p>
            
            <p style="margin-top: 20px"><strong>${t.horsetooth}</strong></p>
            <p>${t.horsetoothDesc}</p>
            <p style="margin-top: 8px;"><a href="${t.horsetoothLink}" target="_blank" style="color: #d4af37; text-decoration: underline;">${t.viewMap}</a></p>
            
            <p style="margin-top: 20px"><strong>${t.poudreCanyon}</strong></p>
            <p>${t.poudreCanyonDesc}</p>
        </div>

        <div class="info-block">
            <h3>${t.campusTour}</h3>
            <p>${t.campusTourDesc}</p>
        </div>
    `;
}

// Welcome Animation Functions
function createWelcomeAnimation() {
    // Check if animation has already been shown this session
    const hasSeenAnimation = sessionStorage.getItem('hasSeenGradAnimation');
    
    if (hasSeenAnimation) {
        return; // Skip animation if already seen
    }
    
    // Create animation container
    const animationDiv = document.createElement('div');
    animationDiv.className = 'welcome-animation';
    animationDiv.innerHTML = `
        <svg class="grad-cap" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
            <!-- Cap board (top flat part) -->
            <rect class="cap-board" x="20" y="45" width="80" height="5" rx="1"/>
            <!-- Cap top (3D effect) -->
            <path class="cap-top" d="M 60 40 L 100 45 L 100 50 L 20 50 L 20 45 Z"/>
            <!-- Cap base -->
            <ellipse class="cap-top" cx="60" cy="55" rx="25" ry="8"/>
            <!-- Button on top -->
            <circle class="cap-button" cx="60" cy="47" r="3"/>
            <!-- Tassel -->
            <path class="cap-tassel" d="M 60 47 Q 65 55 70 65" stroke-linecap="round"/>
            <circle class="cap-button" cx="70" cy="65" r="4"/>
        </svg>
    `;
    
    document.body.appendChild(animationDiv);
    
    // Create confetti
    createConfetti(animationDiv);
    
    // Remove animation after it completes
    setTimeout(() => {
        animationDiv.classList.add('hidden');
        sessionStorage.setItem('hasSeenGradAnimation', 'true');
        setTimeout(() => {
            animationDiv.remove();
        }, 1000);
    }, 5000);
}

function createConfetti(container) {
    const colors = ['gold', 'green'];
    const shapes = ['circle', 'square', 'rectangle'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = `confetti ${colors[Math.floor(Math.random() * colors.length)]} ${shapes[Math.floor(Math.random() * shapes.length)]}`;
        
        // Random position
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = Math.random() * -100 + 'px';
        
        // Random animation duration and delay
        const duration = 2 + Math.random() * 3;
        const delay = Math.random() * 2;
        confetti.style.animationDuration = duration + 's';
        confetti.style.animationDelay = delay + 's';
        
        container.appendChild(confetti);
    }
}
