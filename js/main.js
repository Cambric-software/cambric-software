/**
 * CAMBRIC — Main JavaScript v1.0
 * Handles navigation, scroll animations, and interactions
 */

(function() {
    'use strict';

    // ========================================
    // Navigation
    // ========================================
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile navigation toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });

    // ========================================
    // Scroll Reveal Animation
    // ========================================
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };

    // Initial reveal check
    revealOnScroll();
    
    // Scroll reveal listener
    window.addEventListener('scroll', revealOnScroll);

    // ========================================
    // Animated Counter
    // ========================================
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            // Check if element is in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    };

    animateCounters();

    // ========================================
    // Smooth Scroll
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Staggered Animation for Grid Items
    // ========================================
    const animateGridItems = () => {
        const grids = document.querySelectorAll('.services-grid, .products-grid');
        
        grids.forEach(grid => {
            const items = grid.querySelectorAll('.service-card, .product-card');
            
            items.forEach((item, index) => {
                item.style.transitionDelay = `${index * 0.1}s`;
            });
        });
    };

    animateGridItems();

    // ========================================
    // Page Load Animation
    // ========================================
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Trigger initial reveal for hero elements
        setTimeout(() => {
            const heroElements = document.querySelectorAll('.hero .reveal');
            heroElements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('active');
                }, index * 150);
            });
        }, 100);
    });

    // ========================================
    // Keyboard Navigation Support
    // ========================================
    document.addEventListener('keydown', (e) => {
        // Close mobile menu with Escape
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // ========================================
    // Reduced Motion Support
    // ========================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        document.querySelectorAll('.reveal').forEach(el => {
            el.style.transition = 'none';
            el.classList.add('active');
        });
    }

    // ========================================
    // Active Section Highlighting
    // ========================================
    const highlightActiveSection = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', highlightActiveSection);

})();

const modal = document.getElementById("donateModal");
const donateBtn = document.getElementById("donateBtn");
const closeBtn = document.querySelector(".close-btn");

donateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

function copyNumber() {
    navigator.clipboard.writeText("01007379630");

    const toast = document.getElementById("toast");

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}
// Interactive demo palette
const demoInput = document.getElementById('demoInput');
const demoOutput = document.getElementById('demoOutput');
const demoRules = [
  { test: /hash/i, tool: 'hash_tool', msg: 'Tool: hash (security). Fills in the text to hash.' },
  { test: /csv/i, tool: 'csv_tool', msg: 'Tool: CSV parse/encode (data).' },
  { test: /file|folder|delete|copy|move/i, tool: 'system_command', msg: 'Tool: system_command (file/folder actions).' },
  { test: /unit|convert/i, tool: 'unit_converter', msg: 'Tool: unit converter (everyday).' },
  { test: /qr/i, tool: 'qr_tool', msg: 'Tool: QR generator (media).' },
];
if (demoInput) {
  demoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const q = demoInput.value.trim();
      if (!q) return;
      const match = demoRules.find(r => r.test.test(q));
      demoOutput.textContent = match ? match.msg + '\nConfidence: ~85%\nArguments: extracted from sentence.' : 'No matching tool. Try: hash, csv, delete file, convert units, qr.';
    }
  });
}

// Metrics counter
const animateMetrics = () => {
  document.querySelectorAll('.metric-number').forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 1500;
    const increment = target / (duration / 16);
    let current = 0;
    const update = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          update();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(counter);
  });
};
animateMetrics();
