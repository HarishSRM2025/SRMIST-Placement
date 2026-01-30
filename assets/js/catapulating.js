// Intersection Observer for timeline animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate timeline items on scroll
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Add hover effect enhancement for content boxes
    const contentBoxes = document.querySelectorAll('.content-box');
    contentBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add active state to marker circles on scroll
    const markerObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelector('.marker-circle').classList.add('active');
            }
        });
    }, { threshold: 0.5 });

    timelineItems.forEach(item => {
        markerObserver.observe(item);
    });
});

// Add CSS class for active markers
const style = document.createElement('style');
style.textContent = `
    .marker-circle.active {
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0%, 100% {
            box-shadow: 0 4px 10px rgba(0, 82, 163, 0.3);
        }
        50% {
            box-shadow: 0 4px 20px rgba(0, 82, 163, 0.6);
        }
    }
`;
document.head.appendChild(style);
