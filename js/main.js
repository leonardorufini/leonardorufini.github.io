document.addEventListener("DOMContentLoaded", function() {
  // --- Mobile Navigation Toggle ---
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('.nav-list a');
  const body = document.body; // Reference to the body element

  navToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    navToggle.classList.toggle('active'); // Toggle class on button for custom icon animation
    body.classList.toggle('nav-active'); // Toggle class on body to prevent scroll
    
    // --- FIX 1: Re-evaluate active link after nav state change ---
    // When closing, allow a brief moment for layout to settle before updating
    if (!nav.classList.contains('active')) {
        setTimeout(updateActiveNavLink, 50); 
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('active')) {
        nav.classList.remove('active');
        navToggle.classList.remove('active'); // Remove class from button
        body.classList.remove('nav-active'); // Remove class from body
        // --- FIX 1: Ensure active link is updated immediately after closing nav ---
        setTimeout(updateActiveNavLink, 50); 
      }
    });
  });


  // --- GitHub Projects Loading ---
  const apiURL = "https://api.github.com/users/pennyw1ze/repos";
  
  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      const projectList = document.getElementById("project-list");
      projectList.innerHTML = ""; // Clear the container
      
      data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
      
      data.forEach(repo => {
        const projectDiv = document.createElement("div");
        projectDiv.className = "project";
        projectDiv.innerHTML = `
            <h3><a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a></h3>
            <hr>
            <p>${repo.description ? repo.description : "No description provided."}</p>
            <ul>
              <li><strong>Language:</strong> ${repo.language ? repo.language : "N/A"}</li>
              <li><strong><i class="fas fa-star"></i> Stars:</strong> ${repo.stargazers_count}</li>
              <li><strong><i class="fas fa-eye"></i> Watchers:</strong> ${repo.watchers_count}</li>
            </ul>
          `;
        projectList.appendChild(projectDiv);
      });

      // After projects are loaded, observe them for animations
      const projectCards = document.querySelectorAll('.project');
      projectCards.forEach((card, index) => {
          cardObserver.observe(card); // Use the new cardObserver
          // Removed the individual transitionDelay for consistent animation speed
          // card.style.transitionDelay = `${index * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--stagger-delay'))}s`; 
      });

    })
    .catch(error => {
      console.error("Errore durante il caricamento dei progetti:", error);
      document.getElementById("project-list").innerHTML = "<p style=\"color: var(--text-light);\">Failed to load projects from GitHub. Please try again later.</p>";
    });

  // --- Persistent Scroll Animations (Intersection Observer) ---
  const animatedSections = document.querySelectorAll('.animated-section');
  
  const observerOptions = {
    root: null, /* viewport */
    rootMargin: '0px',
    threshold: 0.1 /* Trigger when 10% of the element is visible */
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      } else {
        entry.target.classList.remove('is-visible'); // Remove class when out of view
      }
    });
  }, observerOptions);

  animatedSections.forEach(section => {
    sectionObserver.observe(section);
  });

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      } else {
        entry.target.classList.remove('is-visible');
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.2 // Slightly higher threshold for cards
  });

  // --- Header Scroll Effect ---
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    updateActiveNavLink(); // Update active nav link on scroll
  });

  // --- Active Navigation Link on Scroll ---
  function updateActiveNavLink() {
    // --- FIX 1: Prevent active link update when mobile nav is open ---
    if (nav.classList.contains('active')) {
        return; 
    }

    let currentActive = '';
    // Using Array.from to iterate over NodeList with forEach
    Array.from(animatedSections).reverse().forEach(section => { // Reverse to correctly pick top-most visible
      const sectionTop = section.offsetTop;
      // Offset by header height for better accuracy
      if (window.scrollY >= sectionTop - header.clientHeight - 30) { // Increased offset
        currentActive = section.getAttribute('id');
        return; // Exit loop once the first visible section (from bottom up) is found
      }
    });

    navLinks.forEach(a => {
      a.classList.remove('active');
      if (a.href.includes(currentActive) && currentActive !== '') { // Ensure currentActive is not empty
        a.classList.add('active');
      }
    });
  }

  // Initial call to set active link and handle potential immediate visibility
  updateActiveNavLink();
  // Ensure animations trigger for elements visible on page load
  animatedSections.forEach(section => {
    if (section.getBoundingClientRect().top < window.innerHeight && section.getBoundingClientRect().bottom > 0) {
      section.classList.add('is-visible');
    }
  });
});
