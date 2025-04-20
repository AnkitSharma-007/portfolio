// Mobile menu toggle
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS (Animate on Scroll)
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  } else {
    console.warn("AOS is not defined. Make sure it is properly imported.");
  }

  // Preloader
  const preloader = document.getElementById("preloader");
  if (preloader) {
    window.addEventListener("load", function () {
      preloader.style.opacity = "0";
      setTimeout(function () {
        preloader.style.display = "none";
      }, 500);
    });
  }

  // Mobile menu toggle
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const hamburger = document.querySelector(".hamburger");

  if (menuToggle && mobileMenu && hamburger) {
    menuToggle.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
      hamburger.classList.toggle("open");
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", function () {
        mobileMenu.classList.add("hidden");
        hamburger.classList.remove("open");
      });
    });
  }

  // Navbar scroll effect
  const navbar = document.getElementById("navbar");
  if (navbar) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  // Smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Offset for fixed header
        const headerHeight = document.querySelector("nav").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Typing effect for hero section
  const typingElement = document.getElementById("typing-text");
  if (typingElement) {
    const text = typingElement.textContent;
    typingElement.textContent = "";

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        typingElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };

    setTimeout(typeWriter, 1000);
  }

  // Skills tabs
  const skillTabs = document.querySelectorAll(".skill-tab");
  const skillContents = document.querySelectorAll(".skill-content");

  if (skillTabs.length > 0 && skillContents.length > 0) {
    skillTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Remove active class from all tabs
        skillTabs.forEach((t) => t.classList.remove("active"));

        // Add active class to clicked tab
        tab.classList.add("active");

        // Hide all content
        skillContents.forEach((content) => content.classList.remove("active"));

        // Show corresponding content
        const target = tab.getAttribute("data-target");
        document.getElementById(target).classList.add("active");
      });
    });
  }

  // Project filters
  const projectFilters = document.querySelectorAll(".project-filter");
  const projectCards = document.querySelectorAll(".project-card");

  if (projectFilters.length > 0 && projectCards.length > 0) {
    // Set initial state for all cards
    projectCards.forEach((card) => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
      card.style.transition = "opacity 0.3s ease, transform 0.4s ease";
      card.style.display = "block";
    });

    // Ensure the "all" filter is active by default
    const defaultFilter = document.querySelector(
      '.project-filter[data-filter="all"]'
    );
    if (defaultFilter) {
      defaultFilter.classList.add("active");
    }

    projectFilters.forEach((filter) => {
      filter.addEventListener("click", () => {
        // Remove active class from all filters
        projectFilters.forEach((f) => f.classList.remove("active"));

        // Add active class to clicked filter
        filter.classList.add("active");

        // Get filter category
        const category = filter.getAttribute("data-filter");

        // Filter projects with improved animation
        projectCards.forEach((card) => {
          const isVisible =
            category === "all" ||
            card.getAttribute("data-category") === category;

          if (isVisible) {
            // First make the element visible but transparent
            if (card.style.display === "none") {
              card.style.opacity = "0";
              card.style.transform = "translateY(20px)";
              card.style.display = "block";

              // Force a reflow to ensure the display change is processed
              void card.offsetWidth;
            }

            // Then animate in
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, 10);
          } else {
            // Animate out
            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";

            // Hide after animation completes
            setTimeout(() => {
              card.style.display = "none";
            }, 300);
          }
        });
      });
    });

    // Trigger a resize event after animations to help layout reflow properly
    window.addEventListener("resize", () => {
      if (document.querySelector(".project-filter.active")) {
        document.querySelector(".project-filter.active").click();
      }
    });
  }

  // Form submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Basic validation
      if (!name || !email || !message) {
        alert("Please fill in all required fields");
        return;
      }

      // Here you would typically send the form data to a server
      // For now, we'll just show a success message
      alert("Thank you for your message! I will get back to you soon.");
      contactForm.reset();
    });
  }

  // Stats counter
  const counters = document.querySelectorAll(".counter");

  if (counters.length > 0) {
    // Initialize all counters to 0
    counters.forEach((counter) => {
      counter.innerText = "0";
    });

    const animateCounter = (counter, current, target, duration) => {
      const increment = target / duration;

      if (current < target) {
        const newValue = Math.ceil(current + increment);
        counter.innerText = newValue;
        setTimeout(
          () => animateCounter(counter, newValue, target, duration),
          20
        );
      } else {
        counter.innerText = target; // Ensure we land exactly on the target
      }
    };

    // Start counter when stats section is in view
    const statsSection = document.getElementById("stats");
    if (statsSection) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          // Start animation for each counter independently
          counters.forEach((counter) => {
            const target = parseInt(counter.getAttribute("data-target"));
            animateCounter(counter, 0, target, 500);
          });

          // Disconnect observer after animation starts to prevent re-triggering
          observer.disconnect();
        }
      });

      observer.observe(statsSection);
    }
  }

  // Back to top button
  const backToTopBtn = document.getElementById("back-to-top");

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Dark mode toggle
  const themeToggle = document.getElementById("theme-toggle");
  const mobileThemeToggle = document.getElementById("mobile-theme-toggle");
  const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;
  const mobileThemeIcon = mobileThemeToggle
    ? mobileThemeToggle.querySelector("i")
    : null;

  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add("dark-mode");
    if (themeIcon) themeIcon.classList.replace("fa-moon", "fa-sun");
    if (mobileThemeIcon) mobileThemeIcon.classList.replace("fa-moon", "fa-sun");
  }

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark-mode")) {
      document.documentElement.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
      if (themeIcon) themeIcon.classList.replace("fa-sun", "fa-moon");
      if (mobileThemeIcon)
        mobileThemeIcon.classList.replace("fa-sun", "fa-moon");
    } else {
      document.documentElement.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
      if (themeIcon) themeIcon.classList.replace("fa-moon", "fa-sun");
      if (mobileThemeIcon)
        mobileThemeIcon.classList.replace("fa-moon", "fa-sun");
    }
  };

  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener("click", toggleTheme);
  }

  // Add active class to nav links on scroll
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Animate elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".animate-on-scroll");

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("active");
      } else {
        element.classList.remove("active");
      }
    });
  };

  window.addEventListener("scroll", animateOnScroll);

  // Initial check for elements in view
  animateOnScroll();
});

// Typing effect for hero section
document.addEventListener("DOMContentLoaded", function () {
  const typingElement = document.querySelector("#hero h2");
  if (typingElement) {
    const text = typingElement.textContent;
    typingElement.textContent = "";

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        typingElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };

    setTimeout(typeWriter, 1000);
  }
});
