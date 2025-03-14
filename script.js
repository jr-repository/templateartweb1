document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const navbar = document.getElementById('navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuItems = document.querySelectorAll('.menu-items');
    const backToTop = document.querySelector('.back-to-top');
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
    
    // Function to toggle mobile menu
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    }
    
    // Function to handle navbar scroll effect
    function handleScroll() {
        const scrollPosition = window.scrollY;
        
        // Navbar background change on scroll
        if (scrollPosition > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Back to top button visibility
        if (scrollPosition > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
        
        // Active nav link based on scroll position
        const sections = document.querySelectorAll('section');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Function to switch menu tabs
    function switchMenuTab() {
        const targetTab = this.getAttribute('data-target');
        
        // Update active tab
        menuTabs.forEach(tab => tab.classList.remove('active'));
        this.classList.add('active');
        
        // Show corresponding menu items
        menuItems.forEach(item => {
            item.classList.remove('active');
            if (item.classList.contains(targetTab)) {
                item.classList.add('active');
            }
        });
    }
    
    // Function to handle smooth scrolling
    function smoothScroll(e) {
        e.preventDefault();
        
        if (navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
        
        const targetId = this.getAttribute('href');
        const targetPosition = document.querySelector(targetId).offsetTop - 70;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
    
    // Function to handle form submissions
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // In a real application, you would handle form submission here
        // For this demo, we'll just show a success message
        const form = e.target;
        const formFields = form.querySelectorAll('input, textarea');
        let isValid = true;
        
        formFields.forEach(field => {
            if (field.hasAttribute('required') && !field.value) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });
        
        if (isValid) {
            // Reset form
            form.reset();
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = form === contactForm ? 
                'Pesan Anda telah terkirim! Kami akan menghubungi Anda segera.' : 
                'Terima kasih telah berlangganan newsletter kami!';
            
            form.appendChild(successMessage);
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        }
    }
    
    // Event listeners
    mobileMenu.addEventListener('click', toggleMobileMenu);
    window.addEventListener('scroll', handleScroll);
    
    menuTabs.forEach(tab => {
        tab.addEventListener('click', switchMenuTab);
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Handle back to top button
    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Initialize AOS (Scroll Animation Library)
    function initAnimation() {
        // Apply animation classes when elements come into view
        const animatedElements = document.querySelectorAll('.animate__animated');
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(el => {
            el.style.opacity = 0;
            observer.observe(el);
        });
    }
    
    // Call initial functions
    handleScroll();
    initAnimation();
    
    // Add a small loading animation
    window.addEventListener('load', function() {
        setTimeout(function() {
            document.body.classList.add('loaded');
        }, 500);
    });
});

// Add some interactivity to menu items
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('pulse');
            setTimeout(() => {
                this.classList.remove('pulse');
            }, 1000);
        });
        
        // Add tilt effect on menu items
        item.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            
            const dx = x - xc;
            const dy = y - yc;
            
            this.style.transform = `translateY(-10px) rotateX(${-dy / 10}deg) rotateY(${dx / 10}deg)`;
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                this.style.transform = 'translateY(0)';
            }, 300);
        });
    });
    
    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        if (hero) {
            hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        }
    });
    
    // Add type effect to hero heading
    const heroHeading = document.querySelector('.hero-content h1');
    
    if (heroHeading) {
        const text = heroHeading.textContent;
        heroHeading.textContent = '';
        
        let i = 0;
        function typeEffect() {
            if (i < text.length) {
                heroHeading.textContent += text.charAt(i);
                i++;
                setTimeout(typeEffect, 100);
            }
        }
        
        setTimeout(typeEffect, 1000);
    }
    
    // Add counter animation to some statistics
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    
    // Add fade in animation to testimonials when they come into view
    const testimonials = document.querySelectorAll('.testimonial');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });
    
    testimonials.forEach(testimonial => {
        observer.observe(testimonial);
    });
});