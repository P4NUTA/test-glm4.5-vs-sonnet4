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

// Mobile menu toggle (for responsive design)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-active');
}

// Add scroll effect to navigation
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = 'none';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Interactive chat demo
const chatMessages = [
    "Hello! I'm your AI assistant 👋",
    "What can you do?",
    "I can moderate chats, run games, and engage your community!",
    "That's awesome! Tell me more about the games.",
    "We have trivia, word games, and custom quizzes that adapt to your community's interests!",
    "How about moderation?",
    "I can automatically detect spam, filter inappropriate content, and enforce community rules 24/7!"
];

let messageIndex = 0;
const screen = document.querySelector('.screen');
if (screen) {
    setInterval(() => {
        if (messageIndex < chatMessages.length) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-bubble ${messageIndex % 2 === 0 ? 'bot' : 'user'}`;
            messageDiv.textContent = chatMessages[messageIndex];
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translateY(10px)';
            screen.appendChild(messageDiv);
            
            // Animate message appearance
            setTimeout(() => {
                messageDiv.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                messageDiv.style.opacity = '1';
                messageDiv.style.transform = 'translateY(0)';
            }, 100);
            
            messageIndex++;
            
            // Reset demo after all messages
            if (messageIndex >= chatMessages.length) {
                setTimeout(() => {
                    screen.innerHTML = '';
                    messageIndex = 0;
                }, 3000);
            }
        }
    }, 2000);
}

// Form interactions
const ctaButtons = document.querySelectorAll('.cta-button');
ctaButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.width = ripple.style.height = '0';
        ripple.style.top = '50%';
        ripple.style.left = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (element.textContent.includes('M')) {
            element.textContent = (current / 1000000).toFixed(1) + 'M+';
        } else if (element.textContent.includes('K')) {
            element.textContent = (current / 1000).toFixed(0) + 'K+';
        } else if (element.textContent.includes('%')) {
            element.textContent = current.toFixed(1) + '%';
        } else {
            element.textContent = Math.floor(current).toLocaleString() + '+';
        }
    }, 16);
}

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                let target = 0;
                
                if (text.includes('M')) {
                    target = parseFloat(text) * 1000000;
                } else if (text.includes('K')) {
                    target = parseFloat(text) * 1000;
                } else if (text.includes('%')) {
                    target = parseFloat(text);
                } else {
                    target = parseInt(text.replace(/\D/g, ''));
                }
                
                animateCounter(stat, target);
            });
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Feature card hover effects
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Pricing card selection
const pricingCards = document.querySelectorAll('.pricing-card');
pricingCards.forEach(card => {
    card.addEventListener('click', function() {
        // Remove active class from all cards
        pricingCards.forEach(c => c.classList.remove('selected'));
        // Add active class to clicked card
        this.classList.add('selected');
    });
});

// FAQ accordion functionality
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('h3');
    const answer = item.querySelector('p');
    
    question.style.cursor = 'pointer';
    question.addEventListener('click', function() {
        const isOpen = answer.style.display === 'block';
        
        // Close all FAQ items
        faqItems.forEach(faqItem => {
            faqItem.querySelector('p').style.display = 'none';
            faqItem.querySelector('h3').style.color = 'var(--text-primary)';
        });
        
        // Open clicked item if it was closed
        if (!isOpen) {
            answer.style.display = 'block';
            question.style.color = 'var(--primary-color)';
        }
    });
    
    // Initially hide answers
    answer.style.display = 'none';
});