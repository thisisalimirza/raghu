// Bio Modal Functions
function openBioModal() {
    const modal = document.getElementById('bioModal');
    modal.style.display = 'block';
    // Trigger reflow
    modal.offsetHeight;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeBioModal() {
    const modal = document.getElementById('bioModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
}

document.addEventListener('DOMContentLoaded', () => {
    // Theme Switching Functionality
    const themeSwitch = document.getElementById('theme-switch');
    const themeIcon = themeSwitch.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme === 'dark');

    themeSwitch.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme === 'dark');
    });

    function updateThemeIcon(isDark) {
        themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Mobile menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    let isMenuOpen = false;

    hamburger?.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        hamburger.classList.toggle('active');
        
        if (isMenuOpen) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.backgroundColor = 'var(--white)';
            navLinks.style.padding = '1rem';
            navLinks.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
            
            // Animate links
            const links = navLinks.querySelectorAll('a');
            links.forEach((link, index) => {
                link.style.opacity = '0';
                link.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    link.style.transition = 'all 0.3s ease';
                    link.style.opacity = '1';
                    link.style.transform = 'translateY(0)';
                }, index * 100);
            });
        } else {
            navLinks.style.display = 'none';
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        const isClickInsideMenu = navLinks?.contains(event.target);
        const isClickOnHamburger = hamburger?.contains(event.target);
        
        if (isMenuOpen && !isClickInsideMenu && !isClickOnHamburger) {
            isMenuOpen = false;
            navLinks.style.display = 'none';
        }
    });

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
                // Close mobile menu after clicking a link
                if (isMenuOpen) {
                    isMenuOpen = false;
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // Parallax effect for profile image
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        window.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = profileImg.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            profileImg.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.05)`;
        });

        profileImg.addEventListener('mouseleave', () => {
            profileImg.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale(1)';
        });
    }

    // Typing effect for subtitle
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        let index = 0;

        function typeText() {
            if (index < text.length) {
                subtitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeText, 50);
            }
        }

        // Start typing when subtitle is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeText();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(subtitle);
    }

    // Enhanced form handling with loading state
    const contactForm = document.getElementById('contact-form');
    const submitButton = contactForm?.querySelector('button[type="submit"]');

    contactForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Add loading state
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        
        const formData = new FormData(contactForm);
        const formObject = Object.fromEntries(formData.entries());
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log('Form submitted:', formObject);
        
        // Remove loading state
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
        
        // Show success message with animation
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
        successMessage.style.opacity = '0';
        successMessage.style.transform = 'translateY(20px)';
        
        contactForm.appendChild(successMessage);
        
        // Trigger animation
        setTimeout(() => {
            successMessage.style.transition = 'all 0.3s ease';
            successMessage.style.opacity = '1';
            successMessage.style.transform = 'translateY(0)';
        }, 100);
        
        // Remove success message after delay
        setTimeout(() => {
            successMessage.style.opacity = '0';
            successMessage.style.transform = 'translateY(-20px)';
            setTimeout(() => successMessage.remove(), 300);
        }, 3000);
        
        contactForm.reset();
    });

    // Skill tag hover effect
    const skillTags = document.querySelectorAll('.interests ul li');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseover', () => {
            skillTags.forEach(otherTag => {
                if (otherTag !== tag) {
                    otherTag.style.opacity = '0.5';
                }
            });
        });

        tag.addEventListener('mouseout', () => {
            skillTags.forEach(otherTag => {
                otherTag.style.opacity = '1';
            });
        });
    });

    // Smooth scroll with progress indicator
    const navbar = document.querySelector('.navbar');
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        background: var(--gradient);
        width: 0%;
        transition: width 0.1s ease;
    `;
    navbar.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });

    // Enhanced section animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate children with delay
                const children = entry.target.children;
                Array.from(children).forEach((child, index) => {
                    child.style.opacity = '0';
                    child.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        child.style.transition = 'all 0.5s ease';
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });

    // Add modal event listeners
    const modal = document.getElementById('bioModal');
    const closeBtn = document.querySelector('.close-modal');
    
    if (closeBtn) {
        closeBtn.onclick = closeBioModal;
    }
    
    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target === modal) {
            closeBioModal();
        }
    }

    // Close modal on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeBioModal();
        }
    });
}); 