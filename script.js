// ============================
// SMOOTH SCROLL NAVIGATION
// ============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================
// INTERSECTION OBSERVER - FADE-IN ANIMATIONS
// ============================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stagger animation for grid items
            if (entry.target.parentElement?.classList.contains('players-grid') ||
                entry.target.parentElement?.classList.contains('products-grid')) {
                const children = entry.target.parentElement.querySelectorAll('.fade-in');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('visible');
                    }, index * 150);
                });
                observer.unobserve(entry.target.parentElement);
            } else {
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Observe story blocks
document.querySelectorAll('.story-block').forEach(el => {
    observer.observe(el);
});

// Observe team photo closing
document.querySelectorAll('.team-photo-closing').forEach(el => {
    observer.observe(el);
});

// ============================
// ENHANCED PARALLAX EFFECT ON SCROLL
// ============================
const parallaxElements = document.querySelectorAll('.story-image, .hero, .team-photo-closing img');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const rate = scrolled * -0.5;

    parallaxElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            element.style.transform = `translateY(${rate * 0.1}px)`;
        }
    });
});

// ============================
// NAVBAR BACKGROUND ON SCROLL
// ============================
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;

    if (scrollTop > 100) {
        navbar.style.backgroundColor = 'rgba(10, 14, 39, 0.95)';
        navbar.style.borderBottomColor = 'rgba(212, 165, 116, 0.2)';
    } else {
        navbar.style.backgroundColor = 'rgba(10, 14, 39, 0.85)';
        navbar.style.borderBottomColor = 'rgba(212, 165, 116, 0.1)';
    }

    lastScrollTop = scrollTop;
});

// ============================
// ENHANCED MOUSE MOVE EFFECT ON CARDS
// ============================
const playerCards = document.querySelectorAll('.player-card');
const productCards = document.querySelectorAll('.product-card');

const handleCardTilt = (e, card) => {
    const rect = card.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rotationX = (mouseY - centerY) * 0.02;
    const rotationY = (centerX - mouseX) * 0.02;

    card.style.transform = `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(1.02)`;
};

playerCards.forEach(card => {
    card.addEventListener('mousemove', (e) => handleCardTilt(e, card));
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

productCards.forEach(card => {
    card.addEventListener('mousemove', (e) => handleCardTilt(e, card));
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ============================
// SCROLL PROGRESS INDICATOR
// ============================
const scrollProgress = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    const progress = updateScrollProgress();
    scrollProgress.style.transform = `scaleX(${progress / 100})`;

    // Hide progress bar when at top
    if (progress < 5) {
        scrollProgress.classList.add('hide');
    } else {
        scrollProgress.classList.remove('hide');
    }
});

// ============================
// LOAD ANIMATION
// ============================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Ensure body starts with opacity 1 for smooth loading
document.body.style.opacity = '1';

// ============================
// PERFORMANCE: LAZY LOAD IMAGES
// ============================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src && !img.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================
// APPLE-STYLE SCROLL SMOOTHING
// ============================
let ticking = false;

function updateScroll() {
    // Add any scroll-based updates here
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
    }
});