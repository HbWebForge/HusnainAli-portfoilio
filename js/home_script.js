// ========================= NAVBAR FUNCTIONALITY =========================
document.addEventListener('DOMContentLoaded', function () {
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Hamburger menu toggle
  hamburgerMenu.addEventListener('click', function () {
    hamburgerMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      hamburgerMenu.classList.remove('active');
      navMenu.classList.remove('active');
      
      // Update active link
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Update active link on scroll
  window.addEventListener('scroll', function () {
    let current = '';
    
    const sections = document.querySelectorAll('section, main > div');
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // Set initial active link
  const homeLink = document.querySelector('a[href="#home"]');
  if (homeLink) {
    homeLink.classList.add('active');
  }
});

// ========================= END NAVBAR FUNCTIONALITY =========================

// ========================= EMAILJS INITIALIZATION =========================
// Global promise to track EmailJS loading status
let emailjsLoadingPromise = null;
let emailjsLoaded = false;

// Dynamically load EmailJS library with fallback CDNs
function loadEmailJS() {
  // Return existing promise if already loading
  if (emailjsLoadingPromise) {
    return emailjsLoadingPromise;
  }

  emailjsLoadingPromise = new Promise((resolve, reject) => {
    // Check if EmailJS is already loaded
    if (typeof emailjs !== 'undefined') {
      try {
        emailjs.init("iKEGL7sZnorJTpUM0");
        emailjsLoaded = true;
        console.log('✓ EmailJS already loaded and initialized');
        resolve();
        return;
      } catch (e) {
        console.error('EmailJS init error:', e);
      }
    }

    // List of CDN sources to try
    const cdnSources = [
      'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/index.min.js',
      'https://unpkg.com/@emailjs/browser@3/dist/index.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/emailjs-com/3.2.0/email.min.js'
    ];

    let attemptIndex = 0;

    function tryLoadFromCDN(index) {
      if (index >= cdnSources.length) {
        console.error('❌ Failed to load EmailJS from all CDN sources');
        reject(new Error('Failed to load EmailJS from all CDN sources'));
        return;
      }

      console.log(`📦 Attempting to load EmailJS from: ${cdnSources[index]}`);
      
      const script = document.createElement('script');
      script.src = cdnSources[index];
      script.type = 'text/javascript';
      script.async = true;
      script.crossOrigin = 'anonymous';
      
      script.onload = function() {
        console.log(`📦 Script loaded from: ${cdnSources[index]}`);
        // Wait a moment for script to execute
        const checkInterval = setInterval(() => {
          if (typeof emailjs !== 'undefined') {
            clearInterval(checkInterval);
            try {
              emailjs.init("iKEGL7sZnorJTpUM0");
              emailjsLoaded = true;
              console.log(`✓ EmailJS initialized successfully from: ${cdnSources[index]}`);
              resolve();
            } catch (e) {
              console.error('EmailJS init failed:', e);
              tryLoadFromCDN(index + 1);
            }
          }
        }, 50);
        
        // Timeout after 2 seconds
        setTimeout(() => {
          clearInterval(checkInterval);
          if (!emailjsLoaded) {
            console.warn(`Timeout waiting for EmailJS from ${cdnSources[index]}, trying next...`);
            tryLoadFromCDN(index + 1);
          }
        }, 2000);
      };
      
      script.onerror = function(error) {
        console.warn(`⚠️ Failed to load from CDN ${index + 1}: ${cdnSources[index]}`);
        console.warn(`Error: ${error}`);
        tryLoadFromCDN(index + 1);
      };
      
      document.head.appendChild(script);
    }

    // Start trying CDN sources
    tryLoadFromCDN(0);
  });

  return emailjsLoadingPromise;
}

// Load EmailJS when DOM is ready
console.log('Loading EmailJS initialization script...');
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Starting EmailJS load...');
    loadEmailJS();
  });
} else {
  console.log('DOM already loaded - Starting EmailJS load...');
  loadEmailJS().catch(err => console.error('EmailJS loading failed:', err));
}

// ========================= END EMAILJS INITIALIZATION =========================

// ========================= PRELOADER FUNCTIONALITY =========================
// Simple, reliable preloader that shows for 2.5 seconds then fades out

window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  
  if (!preloader) return; // Safety check

  // Wait 2.5 seconds, then start fade-out animation
  setTimeout(() => {
    preloader.classList.add("fade-out");
    
    // After fade-out completes, hide the preloader completely
    setTimeout(() => {
      preloader.style.display = "none";
      // Optional: Remove from DOM entirely
      preloader.remove();
    }, 600); // Match CSS transition duration
  }, 1500); // Show for 1.5 seconds
});

// ========================= END PRELOADER FUNCTIONALITY =========================

// ============================================ PROJECTS FILTER FUNCTIONALITY ============================================

// Get all filter buttons and project cards
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

// Add click event to filter buttons
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");

    // Update active button
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    // Filter cards with animation
    projectCards.forEach(card => {
      const category = card.getAttribute("data-category");

      // Add hide animation
      card.classList.add("hide");

      // After animation, show/hide based on filter
      setTimeout(() => {
        if (filter === "all" || category === filter) {
          card.classList.remove("hide");
          card.classList.add("show");
          card.style.display = "block";
        } else {
          card.classList.remove("show");
          card.style.display = "none";
        }
      }, 150);
    });
  });
});

// Optional: Add smooth scroll to projects section
const projectSection = document.querySelector(".projects-section");
if (projectSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  });

  observer.observe(projectSection);
}

// ============================================ CONTACT FORM FUNCTIONALITY ============================================

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
  // Form validation rules
  const validation = {
    name: {
      pattern: /^[a-zA-Z\s]{3,}$/,
      message: "Name must be at least 3 characters and contain only letters"
    },
    email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address"
    },
    subject: {
      pattern: /^.{5,}$/,
      message: "Subject must be at least 5 characters"
    },
    message: {
      pattern: /^.{10,}$/,
      message: "Message must be at least 10 characters"
    }
  };

  // Validate individual field
  function validateField(fieldName) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(fieldName + "Error");
    const rule = validation[fieldName];

    if (!rule.pattern.test(field.value.trim())) {
      errorElement.textContent = rule.message;
      errorElement.classList.add("show");
      field.style.borderColor = "#ff6b6b";
      return false;
    } else {
      errorElement.textContent = "";
      errorElement.classList.remove("show");
      field.style.borderColor = "rgba(202, 240, 248, 0.3)";
      return true;
    }
  }

  // Add blur event to validate on blur
  Object.keys(validation).forEach(fieldName => {
    const field = document.getElementById(fieldName);
    field.addEventListener("blur", () => validateField(fieldName));

    // Clear error on input
    field.addEventListener("input", () => {
      const errorElement = document.getElementById(fieldName + "Error");
      if (errorElement.classList.contains("show")) {
        validateField(fieldName);
      }
    });
  });

  // Handle form submission
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validate all fields first
    let isValid = true;
    Object.keys(validation).forEach(fieldName => {
      if (!validateField(fieldName)) {
        isValid = false;
      }
    });

    if (!isValid) {
      showFormStatus("Please fix the errors above", "error");
      return;
    }

    // Disable button and show loading state
    const submitBtn = contactForm.querySelector(".submit-btn");
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>📨 Message is sending...</span>';

    // Get form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Wait for EmailJS to load, then send email
    emailjsLoadingPromise.then(() => {
      // EmailJS is ready, send the email
      emailjs.send(
        "service_96hbj6s",  // Replace with your EmailJS service ID
        "template_wth4v7h", // Replace with your EmailJS template ID
        {
          to_email: "hbwebcraft@gmail.com", // Your email
          from_name: name,
          from_email: email,
          subject: subject,
          message: message
        }
      )
      .then(function(response) {
        // Show success message
        showFormStatus(`✓ Your message is sent successfully, I'm responding quickly!`, "success");
        
        // Reset form
        contactForm.reset();
        
        // Add WhatsApp button
        const whatsappBtn = document.createElement('a');
        whatsappBtn.href = 'https://wa.me/+923442005467?text=Hi%20Husnain!%20I%20just%20sent%20you%20a%20message%20through%20your%20portfolio.%20Let%20me%20know%20when%20you%20get%20a%20chance%20to%20review%20it!';
        whatsappBtn.target = '_blank';
        whatsappBtn.className = 'whatsapp-link';
        whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Connect on WhatsApp';
        
        const statusDiv = document.getElementById("formStatus");
        const lineBreak = document.createElement('br');
        statusDiv.appendChild(lineBreak);
        statusDiv.appendChild(whatsappBtn);
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        // Hide success message after 10 seconds
        setTimeout(() => {
          formStatus.classList.remove("success");
          formStatus.style.display = "none";
        }, 10000);
      })
      .catch(function(error) {
        console.error("Email send failed:", error);
        showFormStatus("Error sending message. Please try again or contact via WhatsApp.", "error");
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      });
    }).catch(function(error) {
      // EmailJS failed to load - Use fallback method
      console.error("EmailJS not available, using fallback method:", error);
      sendEmailVisFallback(name, email, subject, message, submitBtn, originalText);
    });
  });
}

// ========================= FALLBACK EMAIL METHOD =========================
// Use FormSubmit.co as fallback if EmailJS fails
function sendEmailVisFallback(name, email, subject, message, submitBtn, originalText) {
  console.log('Using FormSubmit fallback method...');
  
  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('subject', subject);
  formData.append('message', message);
  formData.append('_template', 'table');
  formData.append('_next', window.location.href);

  fetch('https://formsubmit.co/ajax/hbwebcraft@gmail.com', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log('✓ Message sent via fallback method');
      showFormStatus(`✓ Your message is sent successfully, I'm responding quickly!`, "success");
      contactForm.reset();
      
      // Add WhatsApp button
      const whatsappBtn = document.createElement('a');
      whatsappBtn.href = 'https://wa.me/+923442005467?text=Hi%20Husnain!%20I%20just%20sent%20you%20a%20message%20through%20your%20portfolio.%20Let%20me%20know%20when%20you%20get%20a%20chance%20to%20review%20it!';
      whatsappBtn.target = '_blank';
      whatsappBtn.className = 'whatsapp-link';
      whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Connect on WhatsApp';
      
      const statusDiv = document.getElementById("formStatus");
      const lineBreak = document.createElement('br');
      statusDiv.appendChild(lineBreak);
      statusDiv.appendChild(whatsappBtn);
      
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      setTimeout(() => {
        formStatus.classList.remove("success");
        formStatus.style.display = "none";
      }, 10000);
    } else {
      throw new Error('FormSubmit failed');
    }
  })
  .catch(error => {
    console.error("Fallback method failed:", error);
    showFormStatus("Error sending message. Please contact via WhatsApp instead.", "error");
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  });
}


// Show form status message
function showFormStatus(message, type) {
  const formStatus = document.getElementById("formStatus");
  formStatus.textContent = message;
  formStatus.classList.add(type);
  formStatus.style.display = "block";
}
