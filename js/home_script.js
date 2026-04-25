
window.addEventListener("load", function () {
  const loading = document.querySelector(".loading");
  const welcome = document.querySelector(".welcome");
  const preloader = document.getElementById("preloader");

  // Step 1: Loading complete → switch text
  setTimeout(() => {
    loading.classList.remove("active");
    loading.style.display = "none";

    welcome.style.display = "block";
    welcome.classList.add("active");


  }, 4000);


  // Step 2: Remove preloader
  setTimeout(() => {
    preloader.classList.add("fade-out");

    setTimeout(() => {
      preloader.style.display = "none";
    }, 2000);

  }, 7000);
});

const btn = document.getElementById("menuBtn");
const overlay = document.getElementById("menuOverlay");

btn.addEventListener("click", () => {
  btn.classList.toggle("active");
  overlay.classList.toggle("active");
});
// -------------------------------------slideshow----------

const slides = document.querySelectorAll(".slide");
let index = 0;

function showSlide(i) {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[i].classList.add("active");
}

document.getElementById("next").onclick = () => {
  index = (index + 1) % slides.length;
  showSlide(index);
};

document.getElementById("prev").onclick = () => {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
};

/* Auto slide */
setInterval(() => {
  index = (index + 1) % slides.length;
  showSlide(index);
}, 5000);

// ============================================ VERTICAL TABS FUNCTIONALITY ============================================

// Get all vertical tab buttons and content
const vTabButtons = document.querySelectorAll(".vtab");
const vTabContents = document.querySelectorAll(".vcontent");

// Add click event listener to each tab button
vTabButtons.forEach(button => {
  button.addEventListener("click", () => {
    const tabName = button.getAttribute("data-vtab");

    // Remove active class from all buttons
    vTabButtons.forEach(btn => btn.classList.remove("active"));
    
    // Add active class to clicked button
    button.classList.add("active");

    // Remove active class from all content
    vTabContents.forEach(content => content.classList.remove("active"));

    // Show corresponding content
    const activeContent = document.getElementById(tabName);
    if (activeContent) {
      activeContent.classList.add("active");
    }
  });
});

// Optional: Add keyboard navigation (arrow keys)
document.addEventListener("keydown", (e) => {
  const activeTab = document.querySelector(".vtab.active");
  const tabIndex = Array.from(vTabButtons).indexOf(activeTab);

  if (e.key === "ArrowDown" || e.key === "ArrowRight") {
    e.preventDefault();
    const nextIndex = (tabIndex + 1) % vTabButtons.length;
    vTabButtons[nextIndex].click();
  } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
    e.preventDefault();
    const prevIndex = (tabIndex - 1 + vTabButtons.length) % vTabButtons.length;
    vTabButtons[prevIndex].click();
  }
});

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

    // Validate all fields
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
    submitBtn.innerHTML = '<span>Sending...</span>';

    // Simulate form submission (replace with actual endpoint)
    setTimeout(() => {
      // In production, send data to server
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value
      };

      console.log("Form Data:", formData);

      // Show success message
      showFormStatus("Message sent successfully! I'll get back to you soon.", "success");

      // Reset form
      contactForm.reset();

      // Reset button
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      // Hide success message after 5 seconds
      setTimeout(() => {
        formStatus.classList.remove("success");
        formStatus.style.display = "none";
      }, 5000);
    }, 1500);
  });
}

// Show form status message
function showFormStatus(message, type) {
  const formStatus = document.getElementById("formStatus");
  formStatus.textContent = message;
  formStatus.classList.add(type);
  formStatus.style.display = "block";
}
