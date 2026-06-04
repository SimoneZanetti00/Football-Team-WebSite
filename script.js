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
// ENHANCED MOUSE MOVE EFFECT ON CARDS
// ============================
const playerCards = document.querySelectorAll('.player-card');
const productCards = document.querySelectorAll('.product-card');
const flipCards = document.querySelectorAll('[data-flip-card]');
const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const postImageSrc = 'images/Stats_palo/ElevenLabs_image_nano-banana_Ri elabora l..._2026-06-04T19_23_05.png';
const paliPresiByPlayer = {
    'gionginho': 3,
    'joao-finezze': 8,
    'il-buccia': 8,
    'gian': 1,
    'renzo': 1,
    'juan-zeppinho': 3,
    'pax': 3,
    'calore': 1
};

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

if (supportsHover) {
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
}

flipCards.forEach(card => {
    const playerKey = card.dataset.player;
    const paliPresi = paliPresiByPlayer[playerKey] ?? 0;
    const cardBack = card.querySelector('.card-back');

    if (!cardBack || paliPresi <= 0 || cardBack.querySelector('.pali-presi')) {
        return;
    }

    const statRow = document.createElement('div');
    statRow.className = 'pali-presi';
    statRow.setAttribute('aria-label', `${paliPresi} posts hit`);
    statRow.title = `${paliPresi} posts hit`;

    const postImage = document.createElement('img');
    postImage.className = 'palo-sticker';
    postImage.src = postImageSrc;
    postImage.alt = '';
    postImage.loading = 'lazy';
    postImage.decoding = 'async';

    const meta = document.createElement('div');
    meta.className = 'pali-meta';
    meta.innerHTML =
        `<span class="pali-count">&times;${paliPresi}</span>` +
        '<span class="pali-label">posts hit</span>';

    statRow.append(postImage, meta);
    cardBack.prepend(statRow);
});

flipCards.forEach(card => {
    const toggleFlip = () => {
        const isFlipped = card.classList.toggle('is-flipped');
        card.setAttribute('aria-pressed', String(isFlipped));
    };

    card.addEventListener('click', toggleFlip);
    card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleFlip();
        }
    });
});

// ============================
// CONSOLIDATED SCROLL HANDLER (rAF-throttled)
// Handles: parallax, navbar background, scroll progress bar
// ============================
const parallaxElements = document.querySelectorAll('.story-image, .hero, .team-photo-closing img');
const navbar = document.querySelector('.navbar');
const scrollProgress = document.querySelector('.scroll-progress');

function getScrollProgress() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return 0;
    return Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100));
}

function onScroll() {
    const scrolled = window.scrollY;

    // Parallax
    const rate = scrolled * -0.05;
    parallaxElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            element.style.transform = `translateY(${rate}px)`;
        }
    });

    // Navbar background
    if (navbar) {
        const scrolledDown = scrolled > 100;
        navbar.style.backgroundColor = scrolledDown
            ? 'rgba(10, 14, 39, 0.95)'
            : 'rgba(10, 14, 39, 0.85)';
        navbar.style.borderBottomColor = scrolledDown
            ? 'rgba(212, 165, 116, 0.2)'
            : 'rgba(212, 165, 116, 0.1)';
    }

    // Scroll progress bar
    if (scrollProgress) {
        const progress = getScrollProgress();
        scrollProgress.style.transform = `scaleX(${progress / 100})`;
        scrollProgress.classList.toggle('hide', progress < 5);
    }
}

let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            onScroll();
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// Set initial state on load
onScroll();

// ============================
// LOAD ANIMATION
// ============================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Ensure body starts with opacity 1 for smooth loading
document.body.style.opacity = '1';

// ============================
// FOOTER YEAR
// ============================
const footerYear = document.getElementById('footer-year');
if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}

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
// MERCH RESERVATION MODAL (FormSubmit)
// ============================
const reserveModal = document.getElementById('reserveModal');

if (reserveModal) {
    const reserveForm = document.getElementById('reserveForm');
    const reserveSuccess = document.getElementById('reserveSuccess');
    const reserveProductName = document.getElementById('reserveProductName');
    const reserveEmail = document.getElementById('reserveEmail');
    const reserveFeedback = document.getElementById('reserveFeedback');
    const reserveSubmit = reserveForm.querySelector('.reserve-submit');
    const FORM_ENDPOINT = 'https://formsubmit.co/ajax/deportivolostanzino@gmail.com';

    let lastFocused = null;

    const openModal = (product) => {
        lastFocused = document.activeElement;
        reserveProductName.textContent = product || 'Merch';
        reserveForm.hidden = false;
        reserveSuccess.hidden = true;
        reserveFeedback.textContent = '';
        reserveEmail.value = '';
        reserveEmail.classList.remove('invalid');
        reserveModal.hidden = false;
        document.body.style.overflow = 'hidden';
        reserveEmail.focus();
    };

    const closeModal = () => {
        reserveModal.hidden = true;
        document.body.style.overflow = '';
        if (lastFocused) {
            lastFocused.focus();
        }
    };

    document.querySelectorAll('[data-reserve-open]').forEach(btn => {
        btn.addEventListener('click', () => openModal(btn.dataset.product));
    });

    reserveModal.querySelectorAll('[data-reserve-close]').forEach(el => {
        el.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !reserveModal.hidden) {
            closeModal();
        }
    });

    const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    reserveForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = reserveEmail.value.trim();
        const product = reserveProductName.textContent;

        if (!isValidEmail(email)) {
            reserveEmail.classList.add('invalid');
            reserveFeedback.textContent = 'Inserisci un indirizzo email valido.';
            reserveEmail.focus();
            return;
        }

        reserveEmail.classList.remove('invalid');
        reserveFeedback.textContent = '';
        reserveSubmit.disabled = true;
        reserveSubmit.textContent = 'Invio in corso…';

        try {
            const response = await fetch(FORM_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    email,
                    _subject: `Prenotazione merch: ${product}`,
                    product,
                    message: `Richiesta di prenotazione per "${product}" da ${email}.`,
                    _template: 'table'
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            reserveForm.hidden = true;
            reserveSuccess.hidden = false;
        } catch (error) {
            reserveFeedback.textContent = 'Ops, qualcosa è andato storto. Riprova più tardi.';
        } finally {
            reserveSubmit.disabled = false;
            reserveSubmit.textContent = 'Invia richiesta';
        }
    });
}
