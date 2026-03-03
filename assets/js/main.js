// === DATA ===
const translations = {
  en: { 
    name: "Stéphane<br/>Leyendecker", title: "Mechanical & 3D Engineer", contact: "CONTACT", permis: "Driver's License", 
    skills: "SKILLS", software: "SOFTWARE", lang: "LANGUAGES", interests: "INTERESTS", interests_list: "DIY, Terrariums", 
    exp_title: "Professional Experience", context: "CONTEXT", skills_acquired: "SKILLS", success: "KEY ACHIEVEMENT", 
    estella_title: "3D Engineer", estella_task1: "Study and dimensioning of Crane elements.", estella_task2: "3D Creation & Plans.", estella_detail: "Work on metal structure of tower cranes.", 
    cap_title: "Study Engineer", cap_task1: "Chassis harness trajectory.", cap_task2: "Factory feedback analysis.", cap_detail: "Routing optimization of electrical harnesses.", 
    segula_title: "Study Engineer", segula_task1: "Electrical components layout.", segula_task2: "Spatial constraints management.", segula_detail: "Focus on layout in constrained spaces.", 
    renault_title: "Apprentice Engineer", patent: "PATENT", renault_task1: "Co-inventor of a patent.", renault_task2: "Standard plan realization.", renault_detail: "Active participation in patented technical innovation.", 
    edu_title: "Education", edu1: "Engineering Degree in Design", edu2: "Web Developer Certification" 
  },
  fr: { 
    name: "Stéphane<br/>Leyendecker", title: "Ingénieur Mécanique & 3D", contact: "CONTACT", permis: "Permis B", 
    skills: "COMPÉTENCES", software: "LOGICIELS & IT", lang: "LANGUES", interests: "CENTRES D'INTÉRÊT", interests_list: "Bricolage, Terrariophilie", 
    exp_title: "Expériences Professionnelles", context: "CONTEXTE", skills_acquired: "COMPÉTENCES", success: "RÉUSSITE CLÉ", 
    estella_title: "Ingénieur 3D", estella_task1: "Étude et dimensionnement d'éléments de Grue.", estella_task2: "Création 3D et Plans.", estella_detail: "Travail sur la structure métallique des grues à tour.", 
    cap_title: "Ingénieur Étude", cap_task1: "Trajectoire de faisceau de châssis.", cap_task2: "Analyse des retours usine.", cap_detail: "Optimisation du routage des faisceaux électriques.", 
    segula_title: "Ingénieur Étude", segula_task1: "Implantation de composants électriques.", segula_task2: "Gestion des contraintes spatiales.", segula_detail: "Focus sur l'implantation de composants.", 
    renault_title: "Apprenti Ingénieur", patent: "BREVET", renault_task1: "Co-inventeur d'un brevet.", renault_task2: "Réalisation de plan standard.", renault_detail: "Participation active à l'innovation technique brevetée.", 
    edu_title: "Formation", edu1: "Diplôme Ingénieur Conception", edu2: "Bac+2 Développeur Web Mobile" 
  }
};

// === STATE ===
let currentLang = 'fr';
let isDark = true;

// === DOM ELEMENTS ===
const langBtn = document.getElementById('lang-toggle');
const langLabel = document.getElementById('lang-label');
const themeBtn = document.getElementById('theme-toggle');
const themeLabel = document.getElementById('theme-label');
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');

// === FUNCTIONS ===
function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if(translations[currentLang][key]) el.innerHTML = translations[currentLang][key];
  });
  document.documentElement.lang = currentLang;
  adjustBackgroundText();
}

function toggleMenu() {
  const isOpen = sidebar.classList.toggle('open');
  overlay.classList.toggle('active');
  menuToggle.setAttribute('aria-expanded', isOpen);
}

function adjustBackgroundText() {
    const bgText = document.getElementById('bg-text');
    const container = document.getElementById('content-wrapper');
    if (window.innerWidth >= 1024 && bgText && container) {
        let calculatedFontSize = container.offsetHeight / ("ENGINEER".length * 1.1);
        bgText.style.fontSize = `${Math.max(calculatedFontSize, 80)}px`;
    }
}

// === EVENT LISTENERS ===
langBtn.addEventListener('click', () => {
  currentLang = currentLang === 'fr' ? 'en' : 'fr';
  langLabel.textContent = currentLang === 'fr' ? 'EN' : 'FR';
  updateContent();
});

themeBtn.addEventListener('click', () => {
  isDark = !isDark;
  themeLabel.textContent = isDark ? "Jour" : "Nuit";
  if(isDark) document.documentElement.removeAttribute('data-theme');
  else document.documentElement.setAttribute('data-theme', 'light');
});

menuToggle.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

// === INIT ===
updateContent();

// === VISUALS (Intersection Observer) ===
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal-item').forEach(el => revealObserver.observe(el));

// === INTERACTIONS (Mouse Move) ===
const cards = document.querySelectorAll('.exp-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
});

window.addEventListener('resize', adjustBackgroundText);
