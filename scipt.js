// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // Welcome section animations
    const welcomeSection = document.querySelector('.welcome-section');
    const speechBubbles = document.querySelectorAll('.speech-bubble-container');
    
    // Hide all speech bubbles initially except the first one
    speechBubbles.forEach((bubble, index) => {
      if (index > 0) {
        bubble.style.opacity = '0';
        bubble.style.transform = 'translateY(50px)';
        bubble.style.display = 'none';
      }
    });
    
    // Show speech bubbles sequentially as user scrolls
    let currentBubbleIndex = 0;
    
    // Show the first bubble immediately
    setTimeout(() => {
      speechBubbles[0].style.opacity = '1';
      speechBubbles[0].style.transform = 'translateY(0)';
    }, 500);
    
    // Function to show the next bubble
    function showNextBubble() {
      if (currentBubbleIndex < speechBubbles.length - 1) {
        currentBubbleIndex++;
        speechBubbles[currentBubbleIndex].style.display = 'flex';
        
        setTimeout(() => {
          speechBubbles[currentBubbleIndex].style.opacity = '1';
          speechBubbles[currentBubbleIndex].style.transform = 'translateY(0)';
        }, 100);
        
        // If it's the last bubble, add a pop effect
        if (currentBubbleIndex === speechBubbles.length - 1) {
          setTimeout(() => {
            const lastBubble = speechBubbles[currentBubbleIndex].querySelector('.speech-bubble');
            lastBubble.classList.add('pop-animation');
          }, 1000);
        }
        
        return false; // Not done showing all bubbles
      }
      return true; // Done showing all bubbles
    }
    
    // Set up scrolling through the welcome bubbles
    welcomeSection.addEventListener('wheel', function(e) {
      if (e.deltaY > 0) { // Scrolling down
        showNextBubble();
      }
    });
    
    // For touch devices
    let touchStartY;
    welcomeSection.addEventListener('touchstart', function(e) {
      touchStartY = e.touches[0].clientY;
    });
    
    welcomeSection.addEventListener('touchend', function(e) {
      const touchEndY = e.changedTouches[0].clientY;
      if (touchStartY > touchEndY + 30) { // Swiped up
        showNextBubble();
      }
    });
    
    // Allow clicking the current bubble to show the next one
    welcomeSection.addEventListener('click', function() {
      showNextBubble();
    });
    
    // Enhanced rock animation for the image placeholders
    const imageContainers = document.querySelectorAll('.image-placeholder');
    
    imageContainers.forEach((image) => {
      // Random starting position for more natural movement
      const randomDelay = Math.random() * 2;
      const randomAmplitude = Math.random() * 2 + 3; // Between 3-5 degrees
      
      image.style.animation = `rock 3s infinite ease-in-out ${randomDelay}s`;
      image.style.setProperty('--rock-amplitude', `${randomAmplitude}deg`);
      
      // Add hover effect
      image.addEventListener('mouseenter', function() {
        this.style.animation = 'rock-faster 0.5s infinite ease-in-out';
        this.style.transform = 'scale(1.1)';
      });
      
      image.addEventListener('mouseleave', function() {
        this.style.animation = `rock 3s infinite ease-in-out ${randomDelay}s`;
        this.style.transform = 'scale(1)';
      });
    });
    
    // Reveal sections as they come into view
    const sections = document.querySelectorAll('section');
    
    const revealSection = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    };
    
    const sectionObserver = new IntersectionObserver(revealSection, {
      root: null,
      threshold: 0.15,
    });
    
    sections.forEach(section => {
      section.classList.add('section-hidden');
      sectionObserver.observe(section);
    });
    
    // Add special animation for projects
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card) => {
      card.addEventListener('mouseenter', function() {
        this.classList.add('project-hover');
      });
      
      card.addEventListener('mouseleave', function() {
        this.classList.remove('project-hover');
      });
    });
    
    // "Oh me?" section image animations - stop motion effect
    const aboutMeImages = document.querySelectorAll('.about-me-section .image-placeholder');
    
    aboutMeImages.forEach((image) => {
      // Remove regular animation
      image.style.animation = 'none';
      image.classList.add('stop-motion-rock');
      
      // Create stop-motion rocking effect with a setInterval
      let angle = -3;
      let direction = 1;
      let frameCount = 0;
      
      const stopMotionInterval = setInterval(() => {
        frameCount++;
        
        // Only update every 8 frames for stop motion effect
        if (frameCount % 8 === 0) {
          angle += (2 * direction);
          
          if (angle >= 3) {
            direction = -1;
          } else if (angle <= -3) {
            direction = 1;
          }
          
          image.style.transform = `rotate(${angle}deg)`;
        }
      }, 50);
      
      // Store the interval on the element so we can clear it if needed
      image.stopMotionInterval = stopMotionInterval;
      
      // Pause animation when not in view to save resources
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          clearInterval(image.stopMotionInterval);
        } else {
          image.stopMotionInterval = setInterval(() => {
            frameCount++;
            if (frameCount % 8 === 0) {
              angle += (2 * direction);
              if (angle >= 3) direction = -1;
              else if (angle <= -3) direction = 1;
              image.style.transform = `rotate(${angle}deg)`;
            }
          }, 50);
        }
      });
    });
    
    // Navbar interaction
    const navLinks = document.querySelectorAll('.nav-bar a');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Smooth scroll to section
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          // Add a playful bounce to the scroll
          targetSection.scrollIntoView({
            behavior: 'smooth'
          });
          
          // Highlight the section briefly
          setTimeout(() => {
            targetSection.classList.add('section-highlight');
            setTimeout(() => {
              targetSection.classList.remove('section-highlight');
            }, 1000);
          }, 500);
        }
      });
    });
  });