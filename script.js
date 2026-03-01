const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
const navbar = document.querySelector('.navbar');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

const updateActiveLink = () => {
    let currentSectionId = '';

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 90;
        if (window.scrollY >= sectionTop) {
            currentSectionId = section.id;
        }
    });

    navLinks.forEach((link) => {
        const targetId = link.getAttribute('href')?.replace('#', '');
        link.classList.toggle('active', targetId === currentSectionId);
    });
};

const handleNavbarShadow = () => {
    if (!navbar) {
        return;
    }

    navbar.classList.toggle('scrolled', window.scrollY > 8);
};

window.addEventListener('scroll', () => {
    updateActiveLink();
    handleNavbarShadow();
    
    // Parallax effect for hero
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.scrollY;
        const heroContent = hero.querySelector('.hero-wrapper');
        if (heroContent && scrolled < 600) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / 800);
        }
    }
});

const revealElements = document.querySelectorAll('.card, .certificate-card, .education-card, .contact-item, .skill-category');

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in', 'visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((element) => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        const href = anchor.getAttribute('href');
        if (!href) {
            return;
        }

        const target = document.querySelector(href);
        if (!target) {
            return;
        }

        event.preventDefault();
        const offsetTop = target.offsetTop - 58;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    });
});

window.addEventListener('DOMContentLoaded', () => {
    updateActiveLink();
    handleNavbarShadow();
    
    // 3D tilt effect on cards
    const cards = document.querySelectorAll('.card, .certificate-card, .skill-category, .education-card, .contact-item');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
});
