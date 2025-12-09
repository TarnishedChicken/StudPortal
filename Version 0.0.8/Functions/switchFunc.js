const body = document.querySelector("body"),
        sidebar = body.querySelector(".sidebar"),
        toggle = body.querySelector(".toggle"),
        searchBtn = body.querySelector(".search-box"),
        modeSwitch = body.querySelector(".toggle-switch"),
        modeText = body.querySelector(".mode-text");

        toggle.addEventListener("click", () =>{
            sidebar.classList.toggle("close");
        });
        searchBtn.addEventListener("click", () =>{
            sidebar.classList.remove("close");
        });


        modeSwitch.addEventListener("click", () =>{
            toggleTheme()
        });
        function toggleTheme(){
            body.classList.toggle("dark");
            var theme = (body.classList.contains("dark"))? "dark":"light"
            cookies.setCookie("theme",theme)
            console.log(theme)
            if(body.classList.contains("dark")){
                modeText.innerText = "Light Mode"
            }else{
                modeText.innerText = "Dark Mode"
            }
        }


        // ==date==
document.addEventListener('DOMContentLoaded', function() {
    //scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Download
    const downloadButtons = document.querySelectorAll('.btn-download');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const moduleName = this.parentElement.querySelector('h3').textContent;
            showNotification(`Downloading ${moduleName} module...`);
            
            // Simulate
            this.textContent = 'Downloading...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = 'Downloaded ✓';
                setTimeout(() => {
                    this.textContent = 'Download';
                    this.disabled = false;
                }, 2000);
            }, 1500);
        });
    });

    // View button functionality
    const viewButtons = document.querySelectorAll('.btn-view');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const subjectName = this.parentElement.querySelector('h3').textContent;
            showNotification(`Opening ${subjectName}...`);
            
            // Add a visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });

    // Add animation on scroll
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

    // Observe all cards
    document.querySelectorAll('.module-card, .subject-card, .announcement').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Interactive instructor avatars
    const instructors = document.querySelectorAll('.instructor');
    instructors.forEach((instructor, index) => {
        instructor.addEventListener('click', function() {
            const instructorNames = ['Prof. John Smith', 'Prof. Sarah Johnson', 'Prof. Michael Chen'];
            showNotification(`Instructor: ${instructorNames[index]}`);
        });
    });

    // Add hover effect to cards
    function addCardHoverEffect(selector) {
        const cards = document.querySelectorAll(selector);
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s ease';
            });
        });
    }

    addCardHoverEffect('.module-card');
    addCardHoverEffect('.subject-card');

    // See all links functionality
    const seeAllLinks = document.querySelectorAll('.see-all');
    seeAllLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.closest('.section, .sidebar-section');
            const sectionTitle = section.querySelector('h2').textContent;
            showNotification(`Loading all ${sectionTitle.toLowerCase()}...`);
        });
    });

    // More link in announcements
    const moreLinks = document.querySelectorAll('.more-link');
    moreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const announcement = this.previousElementSibling;
            if (announcement.classList.contains('expanded')) {
                announcement.classList.remove('expanded');
                this.textContent = 'more →';
            } else {
                announcement.classList.add('expanded');
                this.textContent = 'less ←';
            }
        });
    });
});

// Notification system
function showNotification(message) {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #c93737, #8b0000);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease, slideOut 0.3s ease 2.7s;
        font-size: 14px;
        font-weight: 500;
    `;

    // Add animation keyframes
    if (!document.querySelector('#notificationStyles')) {
        const style = document.createElement('style');
        style.id = 'notificationStyles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
            .announcement.expanded p {
                display: block !important;
                max-height: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Update date dynamically
function updateDate() {
    const dateElement = document.querySelector('.date');
    if (dateElement) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();
        dateElement.textContent = today.toLocaleDateString('en-US', options);
    }
}

updateDate();

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals or reset states
        document.querySelectorAll('.btn-download').forEach(btn => {
            if (btn.textContent === 'Downloading...' || btn.textContent === 'Downloaded ✓') {
                btn.textContent = 'Download';
                btn.disabled = false;
            }
        });
    }
});
console.log('Student Portal Dashboard initialized successfully!');



