// ========================================
// FLEXIBLE REMOTE SERVICES - MAIN JAVASCRIPT
// Version: 1.0
// ========================================

// ========================================
// NAVIGATION
// ========================================
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky header on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// ========================================
// FADE-IN ANIMATIONS
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// ========================================
// PORTFOLIO FILTER (for homepage)
// ========================================
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            // Filter portfolio cards
            portfolioCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ========================================
// TESTIMONIALS SLIDER (for homepage)
// ========================================
const testimonialTrack = document.getElementById('testimonialTrack');
const dots = document.querySelectorAll('.dot');

if (testimonialTrack && dots.length > 0) {
    let currentSlide = 0;
    let autoPlayInterval;

    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

        // Update dots
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % dots.length;
        goToSlide(currentSlide);
    }

    // Dot click handlers
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.getAttribute('data-slide'));
            goToSlide(slideIndex);
            resetAutoPlay();
        });
    });

    // Auto-play
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    startAutoPlay();
}

// ========================================
// ACCORDION (for services page)
// ========================================
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const accordionItem = header.parentElement;
        const accordionContent = accordionItem.querySelector('.accordion-content');
        const isActive = accordionItem.classList.contains('active');

        // Close all accordion items
        document.querySelectorAll('.accordion-item').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.accordion-content').style.maxHeight = null;
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            accordionItem.classList.add('active');
            accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
        }
    });
});

// ========================================
// SCROLL TO TOP BUTTON
// ========================================
const scrollToTop = document.getElementById('scrollToTop');

if (scrollToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTop.classList.add('visible');
        } else {
            scrollToTop.classList.remove('visible');
        }
    });

    scrollToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip if href is just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// NEWSLETTER FORM
// ========================================
function handleNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input').value;
    alert(`Thank you for subscribing! We'll send updates to ${email}`);
    event.target.reset();
    return false;
}

// ========================================
// QUOTE FORM
// ========================================
function handleQuoteForm(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        budget: document.getElementById('budget').value,
        details: document.getElementById('details').value
    };

    console.log('Quote Form Submitted:', formData);

    alert(`Thank you ${formData.name}! We've received your quote request and will get back to you within 24 hours at ${formData.email}.`);

    event.target.reset();
    return false;
}

// ========================================
// COUNTER ANIMATION (for stats)
// ========================================
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 30);
}

// Trigger counter animation when visible
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const target = parseInt(entry.target.getAttribute('data-target'));
            if (target) {
                animateCounter(entry.target, target);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => {
    counterObserver.observe(el);
});

// ========================================
// FORM VALIDATION
// ========================================
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#ef4444';
            } else {
                field.style.borderColor = '#e5e7eb';
            }
        });

        if (!isValid) {
            e.preventDefault();
            alert('Please fill in all required fields.');
        }
    });
});

// ========================================
// STICKY CTA VISIBILITY (Mobile)
// ========================================
const stickyCta = document.querySelector('.sticky-cta');

if (stickyCta) {
    window.addEventListener('scroll', () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            const contactPosition = contactSection.getBoundingClientRect().top;

            // Hide sticky CTA when contact section is in view
            if (contactPosition < window.innerHeight) {
                stickyCta.style.display = 'none';
            } else if (window.scrollY > 800) {
                stickyCta.style.display = 'block';
            } else {
                stickyCta.style.display = 'none';
            }
        }
    });
}

// ========================================
// PAGE LOAD ANIMATIONS
// ========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ========================================
// CONSOLE MESSAGE
// ========================================
console.log('%c Flexible Remote Services ', 'background: #3BFFDD; color: #17274D; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c Powering Your Business with Expert Web Solutions! ', 'color: #17274D; font-size: 14px;');
console.log('%c Website: flexibleremoteservices.com | Email: info@flexibleremoteservices.com ', 'color: #667085; font-size: 12px;');
