/**
 * @file Main application logic for the portfolio.
 * @description This file handles all client-side interactivity, including theme switching,
 * custom cursor effects, animations, and form submissions. It is written in vanilla ES6+ JavaScript
 * and organized into modules for clarity and maintainability.
 */

document.addEventListener('DOMContentLoaded', () => {

    /**
     * ------------------------------------------------------------------
     * APP INITIALIZATION
     * ------------------------------------------------------------------
     * Initializes all modules and fades in the body once loaded.
     */
    const init = () => {
        themeModule.init();
        cursorModule.init();
        scrollRevealModule.init();
        navHighlightModule.init();
        typewriterModule.init();
        contactFormModule.init();
        easterEggModule.init();

        // Fade in the page to prevent flash of unstyled content
        document.body.classList.add('loaded');
    };

    /**
     * ------------------------------------------------------------------
     * THEME MODULE
     * ------------------------------------------------------------------
     * Handles light/dark mode toggling and persistence.
     */
    const themeModule = (() => {
        const themeToggle = document.querySelector('.theme-toggle');
        const html = document.documentElement;

        const applyTheme = (theme) => {
            html.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        };

        const init = () => {
            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

            if (savedTheme) {
                applyTheme(savedTheme);
            } else {
                applyTheme(prefersDark ? 'dark' : 'light');
            }

            themeToggle.addEventListener('click', () => {
                const currentTheme = html.getAttribute('data-theme');
                applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
            });
        };

        return { init };
    })();

    /**
     * ------------------------------------------------------------------
     * CURSOR MODULE
     * ------------------------------------------------------------------
     * Manages the custom cursor and its hover states.
     */
    const cursorModule = (() => {
        const cursor = document.querySelector('.cursor');
        const interactiveElements = document.querySelectorAll('a, button, .footer__easter-egg');

        const onMouseMove = (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        };

        const onMouseEnter = () => cursor.classList.add('cursor--hover');
        const onMouseLeave = () => cursor.classList.remove('cursor--hover');

        const init = () => {
            if (window.matchMedia('(hover: hover)').matches) {
                window.addEventListener('mousemove', onMouseMove);
                interactiveElements.forEach(el => {
                    el.addEventListener('mouseenter', onMouseEnter);
                    el.addEventListener('mouseleave', onMouseLeave);
                });
            }
        };

        return { init };
    })();

    /**
     * ------------------------------------------------------------------
     * SCROLL REVEAL MODULE
     * ------------------------------------------------------------------
     * Reveals sections and animates elements on scroll using IntersectionObserver.
     */
    const scrollRevealModule = (() => {
        const revealElements = document.querySelectorAll('.section--reveal');

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Animate only once
                }
            });
        };

        const init = () => {
            const observer = new IntersectionObserver(observerCallback, observerOptions);
            revealElements.forEach(el => observer.observe(el));
        };

        return { init };
    })();

    /**
     * ------------------------------------------------------------------
     * NAVIGATION HIGHLIGHT MODULE
     * ------------------------------------------------------------------
     * Highlights the active navigation link based on scroll position.
     */
    const navHighlightModule = (() => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav__link');

        const observerOptions = {
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        };

        const init = () => {
            const observer = new IntersectionObserver(observerCallback, observerOptions);
            sections.forEach(section => observer.observe(section));
        };

        return { init };
    })();

    /**
     * ------------------------------------------------------------------
     * TYPEWRITER MODULE
     * ------------------------------------------------------------------
     * Creates a typewriter effect for the hero section tagline.
     */
    const typewriterModule = (() => {
        const element = document.getElementById('typewriter');
        const words = ['Experiences.', 'Interfaces.', 'Solutions.', 'Websites.'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentWord = words[wordIndex];
            const speed = isDeleting ? 100 : 200;

            element.textContent = currentWord.substring(0, charIndex);

            if (!isDeleting && charIndex === currentWord.length) {
                // Pause at end of word
                setTimeout(() => { isDeleting = true; }, 1500);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            } 

            charIndex += isDeleting ? -1 : 1;
            setTimeout(type, speed);
        };

        const init = () => {
            if (element) type();
        };

        return { init };
    })();

    /**
     * ------------------------------------------------------------------
     * CONTACT FORM MODULE
     * ------------------------------------------------------------------
     * Handles client-side form validation and fetch submission.
     */
    const contactFormModule = (() => {
        const form = document.getElementById('contact-form');
        const statusEl = form.querySelector('.form-status');

        const handleSubmit = (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            statusEl.textContent = 'Sending...';

            // Mock endpoint using JSONPlaceholder
            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) return response.json();
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                statusEl.textContent = 'Message sent successfully!';
                statusEl.style.color = 'var(--color-accent)';
                form.reset();
            })
            .catch(error => {
                statusEl.textContent = 'Error sending message. Please try again.';
                statusEl.style.color = '#ff4d4d';
            });
        };

        const init = () => {
            if (form) form.addEventListener('submit', handleSubmit);
        };

        return { init };
    })();

    /**
     * ------------------------------------------------------------------
     * EASTER EGG MODULE
     * ------------------------------------------------------------------
     * Reveals a hidden menu on hover.
     */
    const easterEggModule = (() => {
        const trigger = document.querySelector('.footer__easter-egg');
        const menu = document.querySelector('.easter-egg__menu');

        const showMenu = () => menu.classList.add('visible');
        const hideMenu = () => menu.classList.remove('visible');

        const init = () => {
            if (trigger && menu) {
                trigger.addEventListener('mouseenter', showMenu);
                trigger.addEventListener('mouseleave', hideMenu);
            }
        };

        return { init };
    })();

    // Fire it up!
    init();
});
