// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatMessages = document.getElementById('chatMessages');

    // Navigation between sections
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSection = button.getAttribute('data-section');
            
            // Remove active class from all nav buttons and sections
            navButtons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button and corresponding section
            button.classList.add('active');
            document.getElementById(targetSection).classList.add('active');
        });
    });

    // Chat functionality
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'guru-message'}`;
        
        const currentTime = new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas ${isUser ? 'fa-user' : 'fa-om'}"></i>
            </div>
            <div class="message-content">
                <p>${text}</p>
                <span class="message-time">${currentTime}</span>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, true);
            messageInput.value = '';
            
            // Simulate guru response after a delay
            setTimeout(() => {
                const responses = [
                    "Thank you for sharing. Let's explore this together through mindful practice.",
                    "Your awareness is beautiful. How does this make you feel in your body?",
                    "Remember to breathe deeply. Every breath is a new beginning.",
                    "That's a wonderful insight. Trust your inner wisdom to guide you.",
                    "Let's approach this with compassion for yourself. You are exactly where you need to be.",
                    "Consider taking a moment to sit in stillness with this feeling.",
                    "Your practice is a journey, not a destination. Be patient with yourself.",
                    "How might we bring more presence to this situation?",
                    "I sense your dedication to growth. What does your heart tell you?",
                    "Let's honor this moment with gratitude for your willingness to explore."
                ];
                
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessage(randomResponse);
            }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
        }
    }

    // Send message on button click
    sendBtn.addEventListener('click', sendMessage);

    // Send message on Enter key press
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Personal area card interactions
    const personalCards = document.querySelectorAll('.personal-card');
    personalCards.forEach(card => {
        const button = card.querySelector('.card-btn');
        button.addEventListener('click', () => {
            const cardTitle = card.querySelector('h3').textContent;
            showNotification(`${cardTitle} feature coming soon! 🧘‍♀️`);
        });
    });

    // Blog card interactions
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        const readMoreBtn = card.querySelector('.read-more');
        readMoreBtn.addEventListener('click', () => {
            const articleTitle = card.querySelector('h3').textContent;
            showNotification(`Opening "${articleTitle}"... 📖`);
        });
    });

    // Notification system
    function showNotification(message) {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="fas fa-info-circle"></i>
            <span>${message}</span>
        `;
        
        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #68d391 0%, #4fd1c7 100%);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(104, 211, 145, 0.3);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 500;
            max-width: 300px;
            animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 2.7s forwards;
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }

    // Add CSS animations for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }

        .notification {
            transition: all 0.3s ease;
        }

        .notification:hover {
            transform: scale(1.02);
        }
    `;
    document.head.appendChild(style);

    // Add some gentle animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            }
        });
    }, observerOptions);

    // Observe cards for scroll animations
    document.querySelectorAll('.personal-card, .blog-card').forEach(card => {
        observer.observe(card);
    });

    // Add typing indicator functionality
    let typingTimeout;
    messageInput.addEventListener('input', () => {
        // Clear existing timeout
        clearTimeout(typingTimeout);
        
        // Show typing indicator (you could expand this)
        const guruStatus = document.querySelector('.status');
        const originalText = guruStatus.innerHTML;
        
        // Set timeout to reset status
        typingTimeout = setTimeout(() => {
            guruStatus.innerHTML = originalText;
        }, 1000);
    });

    // Welcome message sequence
    setTimeout(() => {
        showNotification('Welcome to Serenity Yoga Center! 🕉️');
    }, 1000);
});

// Smooth scrolling utility (if needed for future features)
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Theme toggle functionality (placeholder for future enhancement)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}

// Responsive navigation helper
function handleResponsiveNav() {
    const nav = document.querySelector('.nav');
    const navButtons = document.querySelectorAll('.nav-btn');
    
    if (window.innerWidth <= 768) {
        nav.classList.add('mobile-nav');
    } else {
        nav.classList.remove('mobile-nav');
    }
}

// Listen for window resize
window.addEventListener('resize', handleResponsiveNav);

// Initialize responsive nav on load
handleResponsiveNav();