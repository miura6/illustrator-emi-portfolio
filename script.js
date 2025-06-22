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
    updateVisitorCount();
    applyAdminChanges();
    
    // 新しいアニメーション機能を初期化
    initParallax();
    initMouseFollow();
    initTypingEffect();
    initParticles();
    
    // スクロールアニメーション用のクラスを追加
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('scroll-reveal');
    });
    
    // パララックス効果用のクラスを追加
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('parallax');
        heroContent.dataset.speed = '0.3';
    }
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

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // アニメーション対象要素を監視
    const animatedElements = document.querySelectorAll('.scroll-reveal');
    animatedElements.forEach(el => observer.observe(el));
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
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
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

// 閲覧数カウンター機能
function updateVisitorCount() {
    let count = localStorage.getItem('visitorCount') || 0;
    count = parseInt(count) + 1;
    localStorage.setItem('visitorCount', count);
    
    // カウンター表示要素があれば更新
    const counterElement = document.getElementById('visitor-counter');
    if (counterElement) {
        counterElement.textContent = count.toLocaleString();
    }
}

// 管理パネルからの変更を反映
function applyAdminChanges() {
    const saved = localStorage.getItem('siteChanges');
    if (saved) {
        const changes = JSON.parse(saved);
        
        // サイトタイトル更新
        if (changes.siteTitle) {
            document.title = changes.siteTitle;
            const logoTitle = document.querySelector('.logo h1');
            if (logoTitle) logoTitle.textContent = changes.siteTitle;
        }
        
        // メインキャッチコピー更新
        if (changes.mainCatch) {
            const catchElement = document.querySelector('.hero-description strong');
            if (catchElement) catchElement.textContent = changes.mainCatch;
        }
        
        // SNSリンク更新
        if (changes.instagramLink) {
            const instagramLink = document.querySelector('.social-icons a[aria-label="Instagram"]');
            if (instagramLink) instagramLink.href = changes.instagramLink;
        }
        if (changes.twitterLink) {
            const twitterLink = document.querySelector('.social-icons a[aria-label="Twitter"]');
            if (twitterLink) twitterLink.href = changes.twitterLink;
        }
        
        // 料金更新
        if (changes.illustrationPrice) {
            const priceElements = document.querySelectorAll('.price');
            if (priceElements[0]) priceElements[0].textContent = changes.illustrationPrice;
        }
        if (changes.revisionPrice) {
            const priceElements = document.querySelectorAll('.price');
            if (priceElements[1]) priceElements[1].textContent = changes.revisionPrice;
        }
        if (changes.accessoryPrice) {
            const priceElements = document.querySelectorAll('.price');
            if (priceElements[2]) priceElements[2].textContent = changes.accessoryPrice;
        }
        
        // ギャラリー更新
        if (changes.galleryItems && changes.galleryItems.length > 0) {
            updateGalleryFromAdmin(changes.galleryItems);
        }
        
        // お知らせ更新
        if (changes.newsTitle) {
            const newsTitle = document.querySelector('.news-content h3');
            if (newsTitle) newsTitle.textContent = changes.newsTitle;
        }
        if (changes.newsContent) {
            const newsContent = document.querySelector('.news-list p');
            if (newsContent) newsContent.textContent = changes.newsContent;
        }
        
        // 画像更新
        if (changes.slideshowImages && changes.slideshowImages.length > 0) {
            updateSlideshowImages(changes.slideshowImages);
        }
        if (changes.conceptImages && changes.conceptImages.length > 0) {
            updateConceptImages(changes.conceptImages);
        }
    }
}

// ギャラリーを管理パネルから更新
function updateGalleryFromAdmin(galleryItems) {
    const galleryGrid = document.querySelector('.gallery-grid');
    const galleryNav = document.querySelector('.gallery-nav');
    
    if (galleryGrid && galleryNav) {
        // ギャラリーグリッドをクリア
        galleryGrid.innerHTML = '';
        galleryNav.innerHTML = '';
        
        // 新しいギャラリーアイテムを追加
        galleryItems.forEach((item, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item' + (index === 0 ? ' active' : '');
            galleryItem.setAttribute('data-category', `work${index + 1}`);
            
            galleryItem.innerHTML = `
                <div class="gallery-image">
                    <img src="${item.image || `assets/gallery-${index + 1}.png`}" alt="${item.title}">
                </div>
                <div class="gallery-description">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                </div>
            `;
            
            galleryGrid.appendChild(galleryItem);
            
            // ナビゲーションボタンを追加
            const navBtn = document.createElement('button');
            navBtn.className = 'gallery-nav-btn' + (index === 0 ? ' active' : '');
            navBtn.setAttribute('data-category', `work${index + 1}`);
            navBtn.textContent = `WORK ${index + 1}`;
            navBtn.addEventListener('click', function() {
                showGalleryItem(`work${index + 1}`);
            });
            
            galleryNav.appendChild(navBtn);
        });
        
        // ギャラリー機能を再初期化
        initGallery();
    }
}

// スライドショー画像を更新
function updateSlideshowImages(slideshowImages) {
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer && slideshowImages.length > 0) {
        slideshowContainer.innerHTML = '';
        
        slideshowImages.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = 'slide' + (index === 0 ? ' active' : '');
            slide.style.backgroundImage = `url('${image.src}')`;
            slideshowContainer.appendChild(slide);
        });
        
        // スライドショーを再初期化
        initSlideshow();
    }
}

// コンセプト画像を更新
function updateConceptImages(conceptImages) {
    const conceptTrack = document.querySelector('.concept-slideshow-track');
    if (conceptTrack && conceptImages.length > 0) {
        conceptTrack.innerHTML = '';
        
        conceptImages.forEach(image => {
            const slide = document.createElement('div');
            slide.className = 'concept-slide';
            slide.innerHTML = `<img src="${image.src}" alt="コンセプトを表現するかわいい猫のイラスト">`;
            conceptTrack.appendChild(slide);
        });
    }
}

// ギャラリー機能の初期化
function initGallery() {
    const galleryNavBtns = document.querySelectorAll('.gallery-nav-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryNavBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            showGalleryItem(category);
        });
    });
}

// ギャラリーアイテム表示
function showGalleryItem(category) {
    // すべてのアイテムとボタンを非アクティブに
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelectorAll('.gallery-nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 選択されたアイテムとボタンをアクティブに
    const selectedItem = document.querySelector(`[data-category="${category}"]`);
    const selectedBtn = document.querySelector(`[data-category="${category}"]`);
    
    if (selectedItem) selectedItem.classList.add('active');
    if (selectedBtn) selectedBtn.classList.add('active');
}

// マウス追従効果
function initMouseFollow() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // ホバー効果
    const hoverElements = document.querySelectorAll('a, button, .gallery-item, .menu-item');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

// テキストタイピング効果
function initTypingEffect() {
    const typingElement = document.querySelector('.font-accent-heading');
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = '';
        typingElement.style.borderRight = '2px solid var(--accent-color)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    typingElement.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
}

// パーティクル効果
function initParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    document.body.appendChild(particleContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particleContainer.appendChild(particle);
    }
}

// カスタムカーソル用CSS
const cursorStyles = `
    .custom-cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        mix-blend-mode: difference;
    }
    
    .custom-cursor.hover {
        transform: scale(2);
        background: linear-gradient(135deg, var(--accent-color), var(--secondary-color));
    }
    
    .particle-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    }
    
    .particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        animation: float linear infinite;
    }
    
    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    .scroll-reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    .scroll-reveal.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .parallax {
        transition: transform 0.1s ease-out;
    }
`;

// CSSを追加
const styleSheet = document.createElement('style');
styleSheet.textContent = cursorStyles;
document.head.appendChild(styleSheet); 