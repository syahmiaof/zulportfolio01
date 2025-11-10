document.addEventListener('DOMContentLoaded', function() {
    // --- Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Set initial theme based on system preference
    if (prefersDarkScheme.matches) {
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.body.removeAttribute('data-theme');
            themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        }
    });
    
    // --- Scroll Progress Indicator ---
    const scrollProgress = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / totalHeight) * 100;
        scrollProgress.style.width = progress + '%';
    });

    // --- Initialize AOS ---
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
    });

    // --- Sticky Header on Scroll ---
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Active Nav Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) { // 100px offset
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // --- Mobile Menu Toggle ---
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    menuToggleBtn.addEventListener('click', () => {
        mobileNav.classList.add('open');
    });

    closeMenuBtn.addEventListener('click', () => {
        mobileNav.classList.remove('open');
    });

    // Close mobile menu when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('open');
        });
    });

    // --- Hero Typing Effect ---
    const typingText = document.getElementById('typing-text');
    const roles = ["Journalist", "Lecturer", "Silat Gayong Instructor"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            // Deleting characters
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(type, 500); // Pause before typing next role
            } else {
                setTimeout(type, 50); // Deleting speed
            }
        } else {
            // Typing characters
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentRole.length) {
                isDeleting = true;
                setTimeout(type, 2000); // Pause at end of word
            } else {
                setTimeout(type, 100); // Typing speed
            }
        }
    }
    // Start typing effect
    setTimeout(type, 1000); 

    // --- Back to Top Button ---
    const backToTopButton = document.createElement('button');
    backToTopButton.id = 'back-to-top';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Contact Form Handling ---
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate form submission
        formMessage.textContent = 'Sending message...';
        
        setTimeout(() => {
            // This is a dummy success message.
            // In a real application, you would handle the form submission here.
            formMessage.textContent = 'Message sent successfully! Thank you.';
            formMessage.className = 'success';
            contactForm.reset();
            
            // Clear message after 5 seconds
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = '';
            }, 5000);
            
        }, 1500);
    });
    
    // --- Gallery Lightbox (Simple Placeholder) ---
    // This setup just prevents the default link action.
    // A full lightbox is complex; this ensures the links work for hover
    // and don't cause page jumps.
    const galleryLinks = document.querySelectorAll('.gallery-item');
    galleryLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            // In a real build, you would trigger a modal/lightbox here
            // using the href 'https://placehold.co/...'
            console.log('Opening lightbox for: ' + link.href);
        });
    });

});