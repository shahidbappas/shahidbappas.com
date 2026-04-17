// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Change icon if needed, or simple toggle
        menuToggle.classList.toggle('active');
    });
}

// Close menu when clicking a link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (menuToggle) menuToggle.classList.remove('active');
    });
});


// Header Scroll Effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.background = 'rgba(13, 13, 13, 0.95)';
        header.style.padding = '15px 5%';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    } else {
        header.style.background = 'rgba(13, 13, 13, 0.8)';
        header.style.padding = '20px 5%';
        header.style.boxShadow = 'none';
    }
});

// Smooth Scroll for Anchor Links (if browser smooth scroll isn't enough/supported everywhere)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ===== Advertisement Popup =====
(function () {
    const overlay = document.getElementById('ad-popup-overlay');
    const closeBtn = document.getElementById('ad-popup-close');

    if (!overlay) return;

    // Show popup after a short delay (only once per session)
    if (!sessionStorage.getItem('adPopupClosed')) {
        setTimeout(() => {
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }, 1500);
    }

    function closePopup() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        sessionStorage.setItem('adPopupClosed', 'true');
    }

    // Close on button click
    if (closeBtn) {
        closeBtn.addEventListener('click', closePopup);
    }

    // Close on overlay click (outside the popup)
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) {
            closePopup();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closePopup();
        }
    });
})();

// Handle Google Form submission via hidden iframe
const contactForm = document.querySelector('.contact-form');
const hiddenIframe = document.getElementById('hidden_iframe');

if (contactForm && hiddenIframe) {
    // Save name for the success page
    contactForm.addEventListener('submit', function () {
        const nameInput = this.querySelector('input[name="entry.466243044"]');
        if (nameInput && nameInput.value) {
            sessionStorage.setItem('submittedName', nameInput.value);
        }
    });

    // When Google Form responds (loads into the hidden iframe), redirect to success page
    hiddenIframe.addEventListener('load', function () {
        // Ignore the very first load (empty iframe on page load)
        if (hiddenIframe.dataset.submitted === 'true') {
            window.location.href = 'success.html';
        }
    });

    contactForm.addEventListener('submit', function () {
        hiddenIframe.dataset.submitted = 'true';
    });
}
