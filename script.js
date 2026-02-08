
document.addEventListener('DOMContentLoaded', function() {
    
    
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    navToggle.addEventListener('click', function() {
        // Toggle 'active' class on both button and menu
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Update ARIA attribute for accessibility
        const isExpanded = navMenu.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isExpanded);
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Only close menu on mobile (when toggle is visible)
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
    

    document.addEventListener('click', function(event) {
        // Check if menu is open and click was outside nav
        const isClickInsideNav = navbar.contains(event.target);
        const isMenuActive = navMenu.classList.contains('active');
        
        if (!isClickInsideNav && isMenuActive) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
   
    
    // Configuration for Intersection Observer
    const observerOptions = {
        root: null, // viewport
        rootMargin: '-50% 0px -50% 0px', // Trigger when section is in middle of viewport
        threshold: 0 // Percentage of element visible
    };
    
    // Callback function when section becomes visible
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            // If section is intersecting (visible)
            if (entry.isIntersecting) {
                // Get the section id
                const sectionId = entry.target.getAttribute('id');
                
                // Remove 'active' class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add 'active' class to corresponding nav link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    };
    
    // Create the observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links (starting with #)
            if (href.startsWith('#')) {
                e.preventDefault(); // Prevent default jump
                
                const targetId = href.substring(1); // Remove #
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Calculate position accounting for fixed navbar
                    const navHeight = navbar.offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight;
                    
                    // Smooth scroll to position
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
   
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // If window is now wider than mobile breakpoint
            if (window.innerWidth > 768) {
                // Close mobile menu if it's open
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        }, 250); // Wait 250ms after resize stops
    });
    
   
   
    
}); 
   
   