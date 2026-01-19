document.addEventListener('DOMContentLoaded', function() {
  // Mobile nav toggle
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu-container');
  
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', function() {
      document.body.classList.toggle('mobile-nav-active');
      navMenu.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      document.body.classList.remove('mobile-nav-active');
      if (navMenu) {
        navMenu.classList.remove('active');
      }
    });
  });

  // Set placeholder URLs for buttons (user will update these later)
  const contactBtn = document.getElementById('contactBtn');
  const instagramBtn = document.getElementById('instagramBtn');
  
  // URLs are already set in HTML
  // WhatsApp: https://wa.me/6281212864666
  // Instagram: https://www.instagram.com/spngroupidn?igsh=N2Y0aWRpN3pkN3Z3

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});

