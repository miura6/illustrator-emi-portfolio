// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initMobileMenu();
    initSmoothScrolling();
    initGalleryNavigation();
    initScrollAnimations();
    initHeaderScroll();
    initSlideshow();
    initContactForm();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Gallery Navigation
function initGalleryNavigation() {
    const galleryNavBtns = document.querySelectorAll('.gallery-nav-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryNavBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remove active class from all buttons and items
            galleryNavBtns.forEach(b => b.classList.remove('active'));
            galleryItems.forEach(item => item.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding gallery item
            const targetItem = document.querySelector(`[data-category="${category}"]`);
            if (targetItem) {
                targetItem.classList.add('active');
                
                // Add fade-in animation
                targetItem.style.opacity = '0';
                targetItem.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    targetItem.style.transition = 'all 0.5s ease';
                    targetItem.style.opacity = '1';
                    targetItem.style.transform = 'translateY(0)';
                }, 50);
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.menu-item, .goods-item, .direction-item, /*.concept-content,*/ .menu-intro, .gallery-intro, .goods-intro, .news-content, .access-info, .access-directions');
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove background opacity based on scroll
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Time Slots Animation
function animateTimeSlots() {
    const timeSlots = document.querySelectorAll('.time-slot');
    
    timeSlots.forEach((slot, index) => {
        setTimeout(() => {
            slot.style.opacity = '0';
            slot.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                slot.style.transition = 'all 0.5s ease';
                slot.style.opacity = '1';
                slot.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
}

// Initialize time slots animation when page loads
window.addEventListener('load', function() {
    setTimeout(animateTimeSlots, 500);
});

// Parallax Effect for Hero Section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Initialize parallax effect
// initParallaxEffect();

// Form Validation (if any forms are added later)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Loading Animation
function showLoading() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="spinner"></div>
            <p>読み込み中...</p>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    // Add loader styles
    const style = document.createElement('style');
    style.textContent = `
        .loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        }
        
        .loader-content {
            text-align: center;
        }
        
        .spinner {
            width: 50px;
            height: 50px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #8B4513;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    document.head.appendChild(style);
    
    // Remove loader after page loads
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(loader);
        }, 300);
    }, 1000);
}

// Show loading on page load
window.addEventListener('load', showLoading);

// Google Maps Integration (placeholder)
function initGoogleMaps() {
    const mapBtn = document.querySelector('.google-map-btn');
    
    if (mapBtn) {
        mapBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Open Google Maps with the cafe location
            const address = '大阪府豊中市新千里北町2-20-14-105';
            const encodedAddress = encodeURIComponent(address);
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
            
            window.open(mapsUrl, '_blank');
        });
    }
}

// Initialize Google Maps
initGoogleMaps();

// Add CSS for mobile menu
const mobileMenuStyles = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            padding: 2rem;
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .nav-menu.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;

// Add mobile menu styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileMenuStyles;
document.head.appendChild(styleSheet);

// Utility Functions
function debounce(func, wait) {
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

// Optimize scroll events
const optimizedScrollHandler = debounce(function() {
    // Scroll-based animations and effects
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Add error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Performance monitoring
window.addEventListener('load', function() {
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
    }
});

// Slideshow
function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;

    let currentSlide = 0;

    // Set initial active state
    slides[0].classList.add('active');

    setInterval(() => {
        // Deactivate current slide
        slides[currentSlide].classList.remove('active');
        
        // Update index to the next one
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Activate new slide
        slides[currentSlide].classList.add('active');
    }, 5000); // Change slide every 5 seconds
}

// Contact Form Handling
function initContactForm() {
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const message = form.querySelector('#message').value.trim();

        if (!name || !email || !message) {
            formMessage.textContent = 'すべての項目を入力してください。';
            formMessage.className = 'form-message error';
            return;
        }

        formMessage.textContent = 'お問い合わせありがとうございます。メッセージは正常に送信されました。';
        formMessage.className = 'form-message success';

        form.reset();

        setTimeout(() => {
            formMessage.className = 'form-message';
        }, 5000);
    });
}

// Slideshow for Concept Section
function initConceptSlideshow() {
    // This function can be created if needed for more complex slideshow controls
} 