/* ============================================
   KUMARULANKA TOURS - MAIN JAVASCRIPT
   Cinematic Interactions & Animations
   ============================================ */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    initLoadingScreen(prefersReducedMotion);

    if (!prefersReducedMotion) {
        initThreeParticles('heroParticles', 200);
        initThreeParticles('footerParticles', 100);
    }

    // Ensure navbar links are visible on non-home pages while preserving homepage style
    initNavVisibility();

    initNavbar();
    initMobileMenu();
    initHeroCarousel();
    initScrollAnimations();
    initCountUp();
    initTiltCards();
    initMagneticButtons();
    initTourFilters();
    initReviewsCarousel();
    initSearchForm();
    initContactForm();
    initNumberStepper();
    initCardStackRotation();
    initMobileWhatsApp();

    // Listen for visibility changes to pause Three.js when hidden
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            pauseParticles();
        }
    });
});

/* ----- LOADING SCREEN ----- */
function initLoadingScreen(prefersReducedMotion = false) {
    const loadingScreen = document.getElementById('loadingScreen');
    const brandName = document.getElementById('brandName');
    const goldenParticles = document.getElementById('goldenParticles');

    if (!loadingScreen) {
        return;
    }

    // Create golden particles
    if (goldenParticles && !prefersReducedMotion) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 2}s`;
            particle.style.opacity = `${Math.random() * 0.5 + 0.3}`;
            goldenParticles.appendChild(particle);
        }
    }

    // Type-in effect for brand name
    if (brandName) {
        const text = brandName.textContent;
        if (prefersReducedMotion) {
            brandName.style.opacity = '1';
            brandName.textContent = text;
        } else {
            brandName.textContent = '';
            brandName.style.opacity = '1';

            setTimeout(() => {
                let idx = 0;
                const typeInterval = setInterval(() => {
                    if (idx < text.length) {
                        brandName.textContent += text[idx];
                        idx++;
                    } else {
                        clearInterval(typeInterval);
                    }
                }, 80);
            }, 1000);
        }
    }

    const hideLoadingScreen = () => {
        if (loadingScreen.classList.contains('hidden')) {
            return;
        }

        loadingScreen.classList.add('hidden');
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        loadingScreen.style.pointerEvents = 'none';
        loadingScreen.style.display = 'none';
        document.body.style.overflow = '';
    };

    let minimumVisibleTimeElapsed = false;
    let hideRequested = false;

    const requestHideLoadingScreen = () => {
        hideRequested = true;

        if (minimumVisibleTimeElapsed) {
            hideLoadingScreen();
        }
    };

    // Allow Safari or slower devices to request the hide without forcing it early.
    setTimeout(() => {
        minimumVisibleTimeElapsed = true;

        if (hideRequested) {
            hideLoadingScreen();
        }
    }, 2500);

    // Safari/iOS fallback in case the first timer is delayed or dropped.
    window.addEventListener('load', requestHideLoadingScreen, { once: true });

    // Final safety net so the page cannot get stuck on the splash screen.
    setTimeout(hideLoadingScreen, 6000);
}

/* ----- HERO CAROUSEL ----- */
function initHeroCarousel() {
    const carousel = document.getElementById('heroCarousel');
    if (!carousel) return;

    const slides = Array.from(carousel.querySelectorAll('.hero-slide'));
    const prev = carousel.querySelector('.hero-prev');
    const next = carousel.querySelector('.hero-next');
    const dotsContainer = document.getElementById('heroDots');
    let current = 0;
    let intervalId = null;

    function goTo(index) {
        slides.forEach(s => s.classList.remove('active'));
        dotsContainer.querySelectorAll('button').forEach(d => d.classList.remove('active'));
        const idx = (index + slides.length) % slides.length;
        slides[idx].classList.add('active');
        dotsContainer.querySelectorAll('button')[idx].classList.add('active');
        current = idx;
    }

    function nextSlide() { goTo(current + 1); }
    function prevSlide() { goTo(current - 1); }

    // Create dots
    slides.forEach((_, i) => {
        const btn = document.createElement('button');
        if (i === 0) btn.classList.add('active');
        btn.addEventListener('click', () => {
            goTo(i);
            restart();
        });
        dotsContainer.appendChild(btn);
    });

    if (next) next.addEventListener('click', () => { nextSlide(); restart(); });
    if (prev) prev.addEventListener('click', () => { prevSlide(); restart(); });

    function start() {
        intervalId = setInterval(nextSlide, 4000);
    }

    function stop() {
        if (intervalId) clearInterval(intervalId);
        intervalId = null;
    }

    function restart() {
        stop();
        start();
    }

    // Initialize
    goTo(0);
    start();

    // Pause on hover
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
}

/* ----- NAV VISIBILITY FOR INTERNAL PAGES ----- */
function initNavVisibility() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    // Determine current file name (last segment of pathname)
    const path = window.location.pathname.split('/').pop();

    // Treat empty path and index.html as homepage
    const isHome = !path || path === '' || path.toLowerCase() === 'index.html' || path.toLowerCase() === 'index.htm';

    if (!isHome) {
        // Add a lightweight class that only reveals links (keeps transparent background)
        navbar.classList.add('nav-visible');
    }
}

/* ----- NAVBAR SCROLL BEHAVIOR ----- */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const heroSection = document.getElementById('hero');
    let lastScroll = 0;

    if (!navbar || !heroSection) return;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const heroHeight = heroSection.offsetHeight;

        if (currentScroll > heroHeight * 0.8) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // Nav link active state
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });
}

/* ----- MOBILE MENU ----- */
function initMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const menu = document.getElementById('mobileMenu');
    const links = document.querySelectorAll('.mobile-link');
    let isOpen = false;

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        isOpen = !isOpen;
        menu.classList.toggle('active');
        toggle.classList.toggle('active');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            isOpen = false;
            menu.classList.remove('active');
            toggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/* ----- SCROLL ANIMATIONS (AOS-like) ----- */
function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-aos]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        observer.observe(element);
    });

    // GSAP ScrollTrigger for section headers (horizontal wipe)
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Section headers wipe effect
        document.querySelectorAll('.section-header').forEach(header => {
            const title = header.querySelector('.section-title');
            if (title) {
                gsap.from(title, {
                    scrollTrigger: {
                        trigger: header,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    },
                    clipPath: 'inset(0 100% 0 0)',
                    duration: 1,
                    ease: 'power3.out'
                });
            }
        });

        // Trust stats count-up trigger
        const statsSection = document.getElementById('trustStats');
        if (statsSection) {
            ScrollTrigger.create({
                trigger: statsSection,
                start: 'top 70%',
                onEnter: () => animateCountUp()
            });
        }
    }
}

/* ----- COUNT-UP ANIMATION ----- */
function initCountUp() {
    // Fallback for when GSAP is not available
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateNumber(entry.target, 0, target, 1500);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => observer.observe(num));
}

function animateCountUp() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    statNumbers.forEach(num => {
        const target = parseInt(num.getAttribute('data-target'));
        animateNumber(num, 0, target, 1500);
    });
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic
        const current = Math.round(start + (end - start) * eased);

        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

/* ----- THREE.JS PARTICLE SYSTEM ----- */
let particleSystems = [];

function initThreeParticles(containerId, maxParticles) {
    const container = document.getElementById(containerId);
    if (!container || typeof THREE === 'undefined') return;

    // Adjust particle count for mobile
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? Math.min(maxParticles, 50) : maxParticles;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const primaryColor = new THREE.Color(0xe07b39);

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

        colors[i * 3] = primaryColor.r;
        colors[i * 3 + 1] = primaryColor.g;
        colors[i * 3 + 2] = primaryColor.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: containerId === 'heroParticles' ? 0.6 : 0.8,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    camera.position.z = 5;

    const system = { scene, camera, renderer, mesh: particlesMesh, container };
    particleSystems.push(system);

    // Animation loop
    function animate() {
        if (document.hidden) {
            requestAnimationFrame(animate);
            return;
        }

        const positions = particlesMesh.geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3 + 1] += 0.002; // Slow upward drift
            if (positions[i * 3 + 1] > 10) {
                positions[i * 3 + 1] = -10;
            }
        }
        particlesMesh.geometry.attributes.position.needsUpdate = true;
        particlesMesh.rotation.y += 0.0005;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        if (!system.container) return;
        const width = system.container.offsetWidth;
        const height = system.container.offsetHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
}

function pauseParticles() {
    // When tab is hidden, we don't render, but system keeps running
    // Three.js render loop checks document.hidden
}

/* ----- 3D TILT EFFECT ----- */
function initTiltCards() {
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

/* ----- MAGNETIC BUTTONS ----- */
function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.magnetic-btn');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const moveX = (x / rect.width) * 8;
            const moveY = (y / rect.height) * 8;

            btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

/* ----- TOUR FILTERING ----- */
function initTourFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const tourCards = document.querySelectorAll('.tour-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter cards
            tourCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* ----- REVIEWS CAROUSEL ----- */
function initReviewsCarousel() {
    const carousel = document.getElementById('reviewsCarousel');
    const track = document.querySelector('.reviews-track');
    if (!carousel || !track) return;

    let isDragging = false;
    let startX, scrollLeft;
    let autoScrollInterval;

    // Auto-scroll
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            if (document.hidden) return;
            carousel.scrollLeft += 1;
            if (carousel.scrollLeft >= track.scrollWidth - carousel.offsetWidth) {
                carousel.scrollLeft = 0;
            }
        }, 30);
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    startAutoScroll();

    carousel.addEventListener('mouseenter', stopAutoScroll);
    carousel.addEventListener('mouseleave', startAutoScroll);

    // Touch/drag scrolling
    carousel.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        carousel.style.cursor = 'grabbing';
    });

    carousel.addEventListener('mouseleave', () => {
        isDragging = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mouseup', () => {
        isDragging = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });

    // Grab cursor
    carousel.style.cursor = 'grab';
}

/* ----- SEARCH FORM ----- */
function initSearchForm() {
    const form = document.getElementById('searchForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const destination = document.getElementById('destination').value;
        const tourType = document.getElementById('tourType').value;
        const date = document.getElementById('travelDate').value;
        const guests = document.getElementById('guests').value;

        let message = `Hello Kumarulanka Tours! I'd like to plan my trip.`;
        if (destination) message += ` Destination: ${destination}.`;
        if (tourType) message += ` Type: ${tourType}.`;
        if (date) message += ` Date: ${date}.`;
        if (guests) message += ` Guests: ${guests}.`;
        message += ` Please send details and availability.`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/94703577490?text=${encodedMessage}`, '_blank');
    });
}

/* ----- CONTACT FORM ----- */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const whatsapp = document.getElementById('contactWhatsApp').value;
        const date = document.getElementById('contactDate').value;
        const destination = document.getElementById('contactDestination').value;
        const message = document.getElementById('contactMessage').value;

        let fullMessage = `Hello Kumarulanka Tours! I'd like to plan my trip.`;
        if (name) fullMessage += ` Name: ${name}.`;
        if (email) fullMessage += ` Email: ${email}.`;
        if (whatsapp) fullMessage += ` WhatsApp: ${whatsapp}.`;
        if (destination) fullMessage += ` Destination: ${destination}.`;
        if (date) fullMessage += ` Date: ${date}.`;
        if (message) fullMessage += ` Message: ${message}.`;

        const encodedMessage = encodeURIComponent(fullMessage);
        window.open(`https://wa.me/94703577490?text=${encodedMessage}`, '_blank');
    });
}

/* ----- NUMBER STEPPER ----- */
function initNumberStepper() {
    const steppers = document.querySelectorAll('.number-stepper');

    steppers.forEach(stepper => {
        const input = stepper.querySelector('input[type="number"]');
        const minusBtn = stepper.querySelector('.minus');
        const plusBtn = stepper.querySelector('.plus');

        if (!input || !minusBtn || !plusBtn) return;

        minusBtn.addEventListener('click', () => {
            const current = parseInt(input.value);
            const min = parseInt(input.min) || 1;
            if (current > min) {
                input.value = current - 1;
            }
        });

        plusBtn.addEventListener('click', () => {
            const current = parseInt(input.value);
            const max = parseInt(input.max) || 20;
            if (current < max) {
                input.value = current + 1;
            }
        });
    });
}

/* ----- CARD STACK ROTATION ----- */
function initCardStackRotation() {
    const stackCards = document.querySelectorAll('.stack-card');
    if (stackCards.length === 0) return;

    let currentIndex = 0;

    function rotateCards() {
        stackCards.forEach((card, index) => {
            card.classList.remove('active');
            if (index === currentIndex) {
                card.classList.add('active');
            }
        });

        currentIndex = (currentIndex + 1) % stackCards.length;
    }

    // Initial state
    rotateCards();

    // Rotate every 3 seconds
    setInterval(rotateCards, 3000);
}

/* ----- MOBILE WHATSAPP STICKY ----- */
function initMobileWhatsApp() {
    const stickyBtn = document.getElementById('mobileWhatsApp');
    if (!stickyBtn) return;

    function checkMobile() {
        if (window.innerWidth < 768) {
            stickyBtn.style.display = 'block';
        } else {
            stickyBtn.style.display = 'none';
        }
    }

    checkMobile();
    window.addEventListener('resize', checkMobile);
}

/* ----- SMOOTH SCROLL FOR ANCHOR LINKS ----- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* ----- LAZY LOADING IMAGES ----- */
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

/* ----- PAGE LOAD PERFORMANCE ----- */
// Preload critical images
function preloadCriticalImages() {
    const criticalImages = [
        'assets/images/dest-sigiriya.jpg',
        'assets/images/dest-ella.jpg',
        'assets/images/dest-mirissa.jpg'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

preloadCriticalImages();