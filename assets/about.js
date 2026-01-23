// ========================================
// ABOUT PAGE SPECIFIC JAVASCRIPT
// Scroll progress, carousel, counter animations
// ========================================

// ========================================
// SCROLL PROGRESS BAR
// ========================================
const progressBar = document.getElementById('progressBar');

if (progressBar) {
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ========================================
// STATISTICS COUNTER ANIMATION
// ========================================
function animateStatCounter(element, target) {
    let current = 0;
    const increment = target / 60; // 60 frames for smooth animation
    const duration = 2000; // 2 seconds
    const frameTime = duration / 60;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            // Add + symbol for percentage or regular numbers
            const text = element.parentElement.querySelector('.stat-label').textContent;
            if (text.includes('%')) {
                element.textContent = target + '%';
            } else {
                element.textContent = target + '+';
            }
            clearInterval(timer);
        } else {
            if (element.parentElement.querySelector('.stat-label').textContent.includes('%')) {
                element.textContent = Math.floor(current) + '%';
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }
    }, frameTime);
}

// Observe stat numbers and trigger animation when in view
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const target = parseInt(entry.target.getAttribute('data-target'));
            if (target) {
                animateStatCounter(entry.target, target);
            }
        }
    });
}, { threshold: 0.3 });

// Observe all stat numbers
document.querySelectorAll('.stat-number[data-target]').forEach(el => {
    statObserver.observe(el);
});

// ========================================
// TESTIMONIALS CAROUSEL
// ========================================
const carouselTrack = document.getElementById('carouselTrack');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');
const carouselDotsContainer = document.getElementById('carouselDots');

if (carouselTrack) {
    const slides = carouselTrack.querySelectorAll('.carousel-slide');
    let currentIndex = 0;
    let autoAdvanceInterval;

    // Create dots
    if (carouselDotsContainer) {
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            carouselDotsContainer.appendChild(dot);
        });
    }

    const dots = carouselDotsContainer.querySelectorAll('.carousel-dot');

    function updateDots() {
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
        resetAutoAdvance();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        goToSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        goToSlide(currentIndex);
    }

    // Button click handlers
    if (carouselNext) {
        carouselNext.addEventListener('click', nextSlide);
    }

    if (carouselPrev) {
        carouselPrev.addEventListener('click', prevSlide);
    }

    // Auto-advance every 5 seconds
    function startAutoAdvance() {
        autoAdvanceInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoAdvance() {
        clearInterval(autoAdvanceInterval);
        startAutoAdvance();
    }

    // Start auto-advance
    startAutoAdvance();

    // Pause on hover
    if (carouselTrack.parentElement) {
        carouselTrack.parentElement.addEventListener('mouseenter', () => {
            clearInterval(autoAdvanceInterval);
        });

        carouselTrack.parentElement.addEventListener('mouseleave', () => {
            startAutoAdvance();
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carouselTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carouselTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
        }
        if (touchEndX > touchStartX + 50) {
            prevSlide();
        }
    }
}

// ========================================
// TIMELINE ANIMATION ON SCROLL
// ========================================
const timelineSteps = document.querySelectorAll('.timeline-step');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 100); // Stagger animation
        }
    });
}, { threshold: 0.2 });

timelineSteps.forEach((step, index) => {
    step.style.opacity = '0';
    step.style.transform = 'translateX(-30px)';
    step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    timelineObserver.observe(step);
});

// ========================================
// CASE STUDY CARDS HOVER EFFECT
// ========================================
const caseStudyCards = document.querySelectorAll('.case-study-card');

caseStudyCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ========================================
// SMOOTH REVEAL FOR SECTIONS
// ========================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Apply to all fade-in elements that haven't been observed yet
document.querySelectorAll('.fade-in:not(.visible)').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

// ========================================
// TEAM MEMBER CARDS MICRO-INTERACTIONS
// ========================================
const teamMembers = document.querySelectorAll('.team-member-sm');

teamMembers.forEach(member => {
    member.addEventListener('mouseenter', function() {
        const avatar = this.querySelector('.member-avatar');
        if (avatar) {
            avatar.style.transform = 'scale(1.1) rotate(5deg)';
        }
    });

    member.addEventListener('mouseleave', function() {
        const avatar = this.querySelector('.member-avatar');
        if (avatar) {
            avatar.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Add transition to avatars
document.querySelectorAll('.member-avatar').forEach(avatar => {
    avatar.style.transition = 'transform 0.3s ease';
});

// ========================================
// MVV CARDS STAGGER ANIMATION
// ========================================
const mvvCards = document.querySelectorAll('.mvv-card');

const mvvObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 150);
        }
    });
}, { threshold: 0.2 });

mvvCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    mvvObserver.observe(card);
});

// ========================================
// FOUNDER IMAGE PARALLAX EFFECT (subtle)
// ========================================
const founderImage = document.querySelector('.founder-image img');

if (founderImage) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const imagePosition = founderImage.getBoundingClientRect().top;

        if (imagePosition < window.innerHeight && imagePosition > -founderImage.offsetHeight) {
            const parallaxValue = (scrolled - (imagePosition + scrolled)) * 0.05;
            founderImage.style.transform = `translateY(${parallaxValue}px)`;
        }
    });
}

// ========================================
// METRIC VALUES ANIMATION
// ========================================
const metricValues = document.querySelectorAll('.metric-value');

const metricObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            entry.target.style.transform = 'scale(1.2)';
            setTimeout(() => {
                entry.target.style.transform = 'scale(1)';
            }, 300);
        }
    });
}, { threshold: 0.5 });

metricValues.forEach(value => {
    value.style.transition = 'transform 0.3s ease';
    metricObserver.observe(value);
});

// ========================================
// EXPERTISE TAGS STAGGER
// ========================================
const expertiseTags = document.querySelectorAll('.expertise-tag');

const tagsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const tags = entry.target.parentElement.querySelectorAll('.expertise-tag');
            tags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.opacity = '1';
                    tag.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, { threshold: 0.5 });

if (expertiseTags.length > 0) {
    expertiseTags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(10px)';
        tag.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });

    const expertiseContainer = document.querySelector('.expertise-tags');
    if (expertiseContainer) {
        tagsObserver.observe(expertiseContainer);
    }
}

// ========================================
// CONSOLE MESSAGE
// ========================================
console.log('%c About Us - Flexible Remote Services ', 'background: #3BFFDD; color: #17274D; font-size: 16px; font-weight: bold; padding: 8px;');
console.log('%c Learn more about our journey and team ', 'color: #667085; font-size: 12px;');

// ========================================
// PAGE LOAD COMPLETE
// ========================================
window.addEventListener('load', () => {
    console.log('About page loaded successfully with all animations ready!');
});
