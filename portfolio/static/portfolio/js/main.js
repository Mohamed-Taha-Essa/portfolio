/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle', 'nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollDown = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
    //     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text', {});
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img', { delay: 400 });
sr.reveal('.home__social-icon', { interval: 200 });
sr.reveal('.skills__data, .work__card, .certificate-card, .contact__input', { interval: 200 });

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*==================== WHATSAPP FAB ====================*/
const whatsappFab = document.getElementById('whatsapp-fab');

if (whatsappFab) {
    whatsappFab.addEventListener('click', () => {
        const phoneNumber = '+201092969975';
        const message = 'Hello Taha, I want to contact you.';
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    });
}

/*==================== CERTIFICATES SPLIDE SLIDER (AutoScroll) ====================*/
(function initCertificatesSlider() {
    const sliderElement = document.getElementById('certificate-slider');
    if (!sliderElement) return;

    // Initialize Splide with AutoScroll extension for continuous scrolling
    const splide = new Splide('#certificate-slider', {
        // Core settings
        type: 'loop',           // Infinite loop for seamless scrolling
        perPage: 3,             // Default slides per view
        perMove: 1,             // Move one slide at a time
        gap: '1.5rem',          // Space between slides
        padding: { left: 0, right: 0 },

        // REMOVED: autoplay and interval (replaced by AutoScroll)
        // autoplay: true,
        // interval: 3000,

        // Pause settings (KEPT - work with AutoScroll)
        pauseOnHover: true,     // Pause when user hovers
        pauseOnFocus: true,     // Pause when element is focused

        // Performance optimizations
        speed: 800,             // Smooth transition speed (800ms)
        updateOnMove: true,     // Update active state during transition
        lazyLoad: 'nearby',     // Preload adjacent slides for smooth transitions
        preloadPages: 1,        // Preload 1 page ahead

        // Accessibility
        keyboard: true,         // Enable keyboard navigation
        drag: true,             // Enable mouse/touch drag

        // Arrows and pagination
        arrows: true,           // Show navigation arrows
        pagination: true,       // Show pagination dots

        // Reduced motion support
        reducedMotion: {
            speed: 0,
            rewindSpeed: 0,
            autoplay: false,
        },

        // Responsive breakpoints
        breakpoints: {
            992: {
                perPage: 2,     // 2 slides on tablets
                gap: '1.25rem',
            },
            768: {
                perPage: 1,     // 1 slide on mobile
                gap: '1rem',
                padding: { left: '1rem', right: '1rem' },
            },
        },

        // NEW: AutoScroll configuration for continuous scrolling
        autoScroll: {
            speed: 0.7,         // Slow, smooth continuous scroll (pixels per frame)
            pauseOnHover: true, // Pause scrolling on hover
            pauseOnFocus: true, // Pause scrolling on focus
        },
    });

    // Mount the slider WITH the AutoScroll extension
    splide.mount(window.splide.Extensions);

    // Optional: Add custom event listeners for analytics or debugging
    splide.on('moved', function (newIndex) {
        // Track slide changes if needed
        // console.log('Moved to slide:', newIndex);
    });

    splide.on('lazyload:loaded', function (img) {
        // Track lazy loaded images if needed
        // console.log('Image loaded:', img.src);
    });
})();

