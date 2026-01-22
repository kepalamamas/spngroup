document.addEventListener('DOMContentLoaded', function() {
  // Mobile nav toggle
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', function() {
      document.body.classList.toggle('mobile-nav-active');
    });
  }

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      document.body.classList.remove('mobile-nav-active');
    });
  });

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

  // Services Carousel Functionality
  const carouselThumbs = document.querySelectorAll('.carousel-item-thumb');
  const carouselItems = document.querySelectorAll('.carousel-item');
  const carouselMainImage = document.querySelector('.carousel-main-image');
  
  let currentIndex = 0;
  let autoSlideTimer = null;

  // Service items data
  const serviceItems = [
    {
      image: 'img/loco.png',
      title: 'Loco',
      subtitle: 'Fuel Transfer at Supply Point',
      description: 'A fuel delivery method where the transfer and handover of fuel take place at the seller\'s designated supply location, and ownership and responsibility are transferred to the buyer at the point of delivery.'
    },
    {
      image: 'img/operational.png',
      title: 'Franco',
      subtitle: 'Delivery to Client\'s Storage',
      description: 'A delivery method where the seller is fully responsible for transporting and delivering the fuel up to the client\'s storage facility, and ownership and risk are transferred to the buyer after the fuel is received at the client\'s storage.'
    },
    {
      image: 'img/trucktoship.png',
      title: 'Truck to Ship',
      subtitle: 'Truck-Based Fuel Transfer',
      description: 'Truck-based fuel transfer method enabling efficient logistics and flexible delivery schedules, ensuring reliable fuel supply chain management and on-time delivery.'
    }
  ];

  function updateCarousel(newIndex) {
    // Validate index
    if (newIndex >= serviceItems.length) {
      newIndex = 0;
    }
    if (newIndex < 0) {
      newIndex = serviceItems.length - 1;
    }

    // Determine direction (for animation)
    const direction = newIndex > currentIndex ? 'next' : 'prev';

    // Remove active class from current thumbnail
    carouselThumbs[currentIndex].classList.remove('active');

    // Add prev class to current item for slide-out animation
    carouselItems[currentIndex].classList.add('prev');
    carouselItems[currentIndex].classList.remove('active');

    // Fade out main image
    carouselMainImage.classList.add('fade-out');

    // Update after a brief delay for smooth transition
    setTimeout(() => {
      currentIndex = newIndex;

      // Add active class to new item
      carouselItems[currentIndex].classList.remove('prev');
      carouselItems[currentIndex].classList.add('active');

      // Update thumbnail
      carouselThumbs[currentIndex].classList.add('active');

      // Update main image
      carouselMainImage.src = serviceItems[currentIndex].image;
      carouselMainImage.classList.remove('fade-out');
    }, 0);

    // Restart auto-slide timer
    resetAutoSlide();
  }

  function autoSlide() {
    const nextIndex = (currentIndex + 1) % serviceItems.length;
    updateCarousel(nextIndex);
  }

  function resetAutoSlide() {
    // Clear existing timer
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
    }
    // Start new timer - auto-slide every 3 seconds
    autoSlideTimer = setInterval(autoSlide, 3000);
  }

  // Thumbnail click handlers
  carouselThumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', function() {
      updateCarousel(index);
    });
  });

  // Mobile Carousel Functionality
  const mobileServiceCards = document.querySelectorAll('.mobile-service-card');
  const carouselDots = document.querySelectorAll('.carousel-dot');
  let mobileCurrentIndex = 0;
  let mobileAutoSlideTimer = null;

  function updateMobileCarousel(newIndex) {
    // Validate index
    if (newIndex >= mobileServiceCards.length) {
      newIndex = 0;
    }
    if (newIndex < 0) {
      newIndex = mobileServiceCards.length - 1;
    }

    // Remove active class from current card
    mobileServiceCards[mobileCurrentIndex].classList.remove('active');

    // Add animation class based on direction
    if (newIndex > mobileCurrentIndex) {
      mobileServiceCards[mobileCurrentIndex].classList.add('prev');
    } else {
      mobileServiceCards[mobileCurrentIndex].classList.add('next');
    }

    // Remove active class from current dot
    carouselDots[mobileCurrentIndex].classList.remove('active');

    // Update after a brief delay to ensure smooth transition
    setTimeout(() => {
      // Remove animation classes from old card
      mobileServiceCards[(mobileCurrentIndex + mobileServiceCards.length) % mobileServiceCards.length].classList.remove('prev', 'next');

      // Update index
      mobileCurrentIndex = newIndex;

      // Add active class to new card and dot
      mobileServiceCards[mobileCurrentIndex].classList.add('active');
      carouselDots[mobileCurrentIndex].classList.add('active');
    }, 10);

    // Restart auto-slide timer
    resetMobileAutoSlide();
  }

  function mobileAutoSlide() {
    const nextIndex = (mobileCurrentIndex + 1) % mobileServiceCards.length;
    updateMobileCarousel(nextIndex);
  }

  function resetMobileAutoSlide() {
    // Clear existing timer
    if (mobileAutoSlideTimer) {
      clearInterval(mobileAutoSlideTimer);
    }
    // Start new timer - auto-slide every 4 seconds
    mobileAutoSlideTimer = setInterval(mobileAutoSlide, 4000);
  }

  // Dot click handlers
  carouselDots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      updateMobileCarousel(index);
    });
  });

  // Initialize mobile carousel with first card active
  if (mobileServiceCards.length > 0) {
    mobileServiceCards[0].classList.add('active');
    resetMobileAutoSlide();
  }

  // Start auto-slide on page load (desktop carousel)
  resetAutoSlide();

});

