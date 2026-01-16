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

/*==================== CERTIFICATES CONTINUOUS MARQUEE ====================*/
(function initCertificatesMarquee() {
    const slider = document.querySelector('.certificates__slider');
    if (!slider) return;

    const track = slider.querySelector('.certificates__track');
    if (!track) return;

    const originalSlides = Array.from(track.children);
    if (originalSlides.length === 0) return;

    const updateAnimation = () => {
        // Clear existing clones to recalculate
        const currentSlides = Array.from(track.children);
        currentSlides.forEach(slide => {
            if (slide.getAttribute('aria-hidden') === 'true') {
                track.removeChild(slide);
            }
        });

        // Calculate the width of the original set
        // We use the offset of what would be the first clone
        // To get this, we temporarily add one clone
        const tempClone = originalSlides[0].cloneNode(true);
        track.appendChild(tempClone);
        const originalSetWidth = tempClone.offsetLeft - originalSlides[0].offsetLeft;
        track.removeChild(tempClone);

        const viewportWidth = slider.offsetWidth;

        // Clone the slides enough times to fill the viewport plus one extra set
        // This ensures that when we reset to 0, there's always content visible
        const clonesNeeded = Math.ceil(viewportWidth / originalSetWidth) + 1;

        for (let i = 0; i < clonesNeeded; i++) {
            originalSlides.forEach(slide => {
                const clone = slide.cloneNode(true);
                clone.setAttribute('aria-hidden', 'true');
                track.appendChild(clone);
            });
        }

        // Set a consistent speed (e.g., 50 pixels per second)
        const speed = 50;
        const duration = originalSetWidth / speed;

        track.style.animation = 'none';
        track.offsetHeight; // Trigger reflow

        track.style.setProperty('--marquee-distance', `-${originalSetWidth}px`);
        track.style.animation = `marquee ${duration}s linear infinite`;
    };

    // Wait for images to load to get accurate widths
    const images = track.querySelectorAll('img');
    let loadedCount = 0;
    const onImageLoad = () => {
        loadedCount++;
        if (loadedCount === images.length) {
            updateAnimation();
        }
    };

    if (images.length === 0) {
        updateAnimation();
    } else {
        images.forEach(img => {
            if (img.complete) {
                onImageLoad();
            } else {
                img.addEventListener('load', onImageLoad);
                img.addEventListener('error', onImageLoad); // Handle broken images too
            }
        });
    }

    // Update on resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateAnimation, 200);
    });

    // Pause on hover/focus
    slider.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
    });
    slider.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
    });
    slider.addEventListener('focusin', () => {
        track.style.animationPlayState = 'paused';
    });
    slider.addEventListener('focusout', () => {
        track.style.animationPlayState = 'running';
    });
})();

