document.addEventListener('DOMContentLoaded', () => {
    // === Sticky Navbar ===
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // === Mobile Menu Toggle ===
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // === Active Nav Link Update on Scroll ===
    const sections = document.querySelectorAll('.section');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    // === Typewriter Effect ===
    const words = ["AI Engineer", "Data Analyst", "Data Scientist", "Full Stack Developer", "Dashboard Engineer"];
    let i = 0;
    let timer;
    const typewriterElement = document.getElementById('typewriter');

    function typeWriter() {
        if (!typewriterElement) return;

        const currentWord = words[i];
        let isDeleting = false;
        let charIndex = 0;

        function type() {
            const currentObjWord = words[i];

            if (isDeleting) {
                typewriterElement.textContent = currentObjWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterElement.textContent = currentObjWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentObjWord.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                i++;
                if (i === words.length) i = 0;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        type();
    }

    if (typewriterElement) {
        typeWriter();
    }

    // === Scroll Reveal Animations ===
    const revealElements = document.querySelectorAll('.reveal-fade, .reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Handle staggered delays for skills and projects
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
    });

    // === Project Filtering ===
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                    // Reset animation
                    card.classList.remove('active');
                    setTimeout(() => {
                        card.classList.add('active');
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // === Modal Logic ===
    const modalBtns = document.querySelectorAll('.btn-project-details');
    const closeBtns = document.querySelectorAll('.close-modal');

    // Open Modal
    modalBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            modal.style.display = 'flex';
            // Slight delay to allow display flex to apply before adding opacity class
            setTimeout(() => {
                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Prevent body scroll
            }, 10);
        });
    });

    // Close Modal via Button
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });

    // Close Modal via outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });

    // Close Modal via Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                closeModal(openModal);
            }
        }
    });

    function closeModal(modal) {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restore body scroll
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300); // Wait for transition to finish
    }
});
