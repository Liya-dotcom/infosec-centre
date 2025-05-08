// DOM Elements
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mainNav = document.querySelector('.main-nav');
const newsletterForm = document.getElementById('newsletter-form');
const newsletterNotification = document.getElementById('newsletter-notification');
const contactForm = document.getElementById('contactForm');
const formNotification = document.getElementById('form-notification');
const categoryButtons = document.querySelectorAll('.category-btn');
const tutorialCards = document.querySelectorAll('.tutorial-card');
const toolsSearchInput = document.getElementById('tools-search-input');
const toolsCategoryFilter = document.getElementById('tools-category-filter');
const toolCards = document.querySelectorAll('.tool-card');

// Dark Mode Toggle
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}

// Mobile Menu Toggle
if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
}

// Newsletter Form
if (newsletterForm && newsletterNotification) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        
        // Simulate form submission
        newsletterNotification.textContent = 'Thank you for subscribing!';
        newsletterNotification.style.display = 'block';
        newsletterNotification.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            newsletterNotification.style.opacity = '0';
            setTimeout(() => {
                newsletterNotification.style.display = 'none';
                newsletterNotification.style.opacity = '1';
            }, 300);
        }, 3000);
        
        newsletterForm.reset();
    });
}

// Contact Form
if (contactForm && formNotification) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to a server
        // For this example, we'll just show a success message
        formNotification.textContent = 'Thank you for your message! We will get back to you soon.';
        formNotification.style.display = 'block';
        formNotification.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            formNotification.style.opacity = '0';
            setTimeout(() => {
                formNotification.style.display = 'none';
                formNotification.style.opacity = '1';
            }, 300);
        }, 3000);
        
        contactForm.reset();
    });
}

// Tutorial Category Filter
if (categoryButtons.length > 0 && tutorialCards.length > 0) {
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.dataset.category;
            
            // Filter tutorial cards
            tutorialCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Tools Search and Filter
if (toolsSearchInput && toolsCategoryFilter && toolCards.length > 0) {
    const filterTools = () => {
        const searchTerm = toolsSearchInput.value.toLowerCase();
        const category = toolsCategoryFilter.value;
        
        toolCards.forEach(card => {
            const toolName = card.querySelector('h3').textContent.toLowerCase();
            const toolDesc = card.querySelector('.tool-description').textContent.toLowerCase();
            const toolCategory = card.dataset.category;
            
            const matchesSearch = toolName.includes(searchTerm) || toolDesc.includes(searchTerm);
            const matchesCategory = category === 'all' || toolCategory === category;
            
            if (matchesSearch && matchesCategory) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    };
    
    toolsSearchInput.addEventListener('input', filterTools);
    toolsCategoryFilter.addEventListener('change', filterTools);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
            
            // Update URL without page reload
            if (history.pushState) {
                history.pushState(null, null, targetId);
            } else {
                location.hash = targetId;
            }
        }
    });
});

// Close notification when clicking on it
if (newsletterNotification) {
    newsletterNotification.addEventListener('click', () => {
        newsletterNotification.style.opacity = '0';
        setTimeout(() => {
            newsletterNotification.style.display = 'none';
            newsletterNotification.style.opacity = '1';
        }, 300);
    });
}

if (formNotification) {
    formNotification.addEventListener('click', () => {
        formNotification.style.opacity = '0';
        setTimeout(() => {
            formNotification.style.display = 'none';
            formNotification.style.opacity = '1';
        }, 300);
    });
}

// Initialize page transition
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '1';
});