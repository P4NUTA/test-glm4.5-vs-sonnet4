// Smooth scrolling for navigation links
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

// Animated counter for statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Animate counters when they come into view
            if (entry.target.classList.contains('counter')) {
                const target = parseInt(entry.target.dataset.target);
                animateCounter(entry.target, target);
            }
        }
    });
}, observerOptions);

// Observe all sections and cards for animation
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll(
        '.problem-card, .feature-card, .benefit-item, .step, .testimonial, .pricing-card'
    );
    
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(15, 23, 42, 0.9)';
        nav.style.backdropFilter = 'blur(10px)';
        nav.style.transition = 'all 0.3s ease';
    } else {
        nav.style.background = 'transparent';
        nav.style.backdropFilter = 'none';
    }
});

// Interactive pricing cards
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        if (card.classList.contains('popular')) {
            card.style.transform = 'scale(1.05)';
        } else {
            card.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// Testimonial rotation
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');

function rotateTestimonials() {
    testimonials.forEach((testimonial, index) => {
        testimonial.style.opacity = index === currentTestimonial ? '1' : '0.6';
        testimonial.style.transform = index === currentTestimonial 
            ? 'scale(1.05)' 
            : 'scale(1)';
    });
    
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
}

// Start testimonial rotation after page load
setTimeout(() => {
    setInterval(rotateTestimonials, 4000);
}, 2000);

// Dynamic particle background for hero
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 20 + 10}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
        `;
        hero.appendChild(particle);
    }
}

// Form handling for CTAs
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', (e) => {
        if (button.textContent.includes('Start Free Trial')) {
            // Add subtle success animation
            button.style.transform = 'scale(0.95)';
            button.textContent = 'Getting Started...';
            
            setTimeout(() => {
                button.style.transform = 'scale(1)';
                button.textContent = 'Start Free Trial';
                
                // Here you would typically integrate with your signup system
                alert('Free trial signup would be handled here!');
            }, 300);
        }
    });
});

// Add demo functionality
document.querySelectorAll('.btn-secondary').forEach(button => {
    button.addEventListener('click', (e) => {
        if (button.textContent.includes('See Demo')) {
            // Demo modal or redirect logic would go here
            alert('Demo functionality would be implemented here!');
        }
    });
});

// Lazy loading for better performance
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// Mobile menu toggle (if needed)
function createMobileMenu() {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelector('.nav-links');
    
    if (window.innerWidth <= 768) {
        const hamburger = document.createElement('button');
        hamburger.innerHTML = '☰';
        hamburger.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
        `;
        
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-open');
        });
        
        nav.appendChild(hamburger);
    }
}

// Initialize mobile menu on load and resize
window.addEventListener('load', createMobileMenu);
window.addEventListener('resize', createMobileMenu);

// Add CSS for mobile menu
const mobileMenuCSS = `
    @media (max-width: 768px) {
        .nav-links.mobile-open {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(15, 23, 42, 0.95);
            padding: 20px;
            border-radius: 0 0 16px 16px;
        }
        
        .nav button {
            display: block !important;
        }
    }
`;

const style = document.createElement('style');
style.textContent = mobileMenuCSS;
document.head.appendChild(style);

// Performance optimization: Throttled scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Any scroll-based animations or effects
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
}, 16));

// Initialize particles after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(createParticles, 1000);
});

// Add some Easter eggs for the Vas3k style
let konamiCode = '';
const konamiSequence = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightKeyBKeyA';

document.addEventListener('keydown', (e) => {
    konamiCode += e.code;
    if (konamiCode.length > konamiSequence.length) {
        konamiCode = konamiCode.slice(-konamiSequence.length);
    }
    
    if (konamiCode === konamiSequence) {
        // Easter egg activation
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);
        konamiCode = '';
    }
});

// Analytics tracking (placeholder)
function trackEvent(eventName, properties = {}) {
    // Here you would send events to your analytics service
    console.log(`Event: ${eventName}`, properties);
}

// Track important interactions
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn')) {
        trackEvent('button_click', {
            button_text: e.target.textContent,
            button_type: e.target.className
        });
    }
});

// Track scroll depth
let maxScrollDepth = 0;
window.addEventListener('scroll', throttle(() => {
    const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        if (maxScrollDepth % 25 === 0) {
            trackEvent('scroll_depth', { depth: maxScrollDepth });
        }
    }
}, 1000));