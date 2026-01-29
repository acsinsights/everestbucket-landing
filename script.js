// ========================================
// EverestBucket - Interactive JavaScript
// ========================================

// FAQ Toggle Function
function toggleFaq(button) {
  const faqItem = button.parentElement;
  const answer = faqItem.querySelector(".faq-answer");
  const icon = button.querySelector(".faq-icon");

  // Close all other FAQs
  document.querySelectorAll(".faq-item").forEach((item) => {
    if (item !== faqItem) {
      item.querySelector(".faq-answer").classList.add("hidden");
      item.querySelector(".faq-icon").style.transform = "rotate(0deg)";
    }
  });

  // Toggle current FAQ
  answer.classList.toggle("hidden");
  icon.style.transform = answer.classList.contains("hidden")
    ? "rotate(0deg)"
    : "rotate(180deg)";
}

document.addEventListener("DOMContentLoaded", function () {
  // ========================================
  // Scroll Fade Animation Observer
  // ========================================
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Optionally stop observing after animation
        // fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all scroll-fade elements
  document.querySelectorAll(".scroll-fade").forEach((el) => {
    fadeObserver.observe(el);
  });

  // ========================================
  // Counter Animation
  // ========================================
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute("data-target"));
          const duration = 2000; // 2 seconds
          const increment = target / (duration / 16); // 60fps
          let current = 0;

          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.textContent = Math.floor(current).toLocaleString();
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target.toLocaleString() + "+";
            }
          };

          updateCounter();
          counterObserver.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 },
  );

  document.querySelectorAll(".counter").forEach((counter) => {
    counterObserver.observe(counter);
  });

  // ========================================
  // Navbar Scroll Effect
  // ========================================
  const navbar = document.querySelector("nav");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
  });

  // ========================================
  // Smooth Scroll for Anchor Links
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // ========================================
  // Button Ripple Effect
  // ========================================
  document.querySelectorAll(".btn-primary").forEach((button) => {
    button.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement("span");
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add ripple animation keyframes dynamically
  const style = document.createElement("style");
  style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(style);

  // ========================================
  // Parallax Effect for Hero
  // ========================================
  const hero = document.querySelector("section:first-of-type");
  const adCards = document.querySelectorAll(".ad-card");

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.3;

    adCards.forEach((card, index) => {
      const direction = index % 2 === 0 ? 1 : -1;
      card.style.transform = `translateY(${rate * 0.1 * direction}px)`;
    });
  });

  // ========================================
  // Feature Cards Tilt Effect
  // ========================================
  document
    .querySelectorAll(".feature-card, .ad-preview-card")
    .forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform =
          "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
      });
    });

  // ========================================
  // Mobile Menu Toggle (if needed)
  // ========================================
  const mobileMenuButton = document.querySelector("[data-mobile-menu]");
  const mobileMenu = document.querySelector("[data-mobile-menu-content]");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // ========================================
  // Lazy Load Images (if needed)
  // ========================================
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll("img.lazy").forEach((img) => {
      imageObserver.observe(img);
    });
  }

  // ========================================
  // Console Easter Egg
  // ========================================
  console.log(
    "%c🚀 EverestBucket",
    "font-size: 24px; font-weight: bold; color: #4E9FEC;",
  );
  console.log(
    "%cAdvertise Smarter, Not Harder.",
    "font-size: 14px; color: #1A1F3B;",
  );
  console.log(
    "%cInterested in working with us? Visit our careers page!",
    "font-size: 12px; color: #666;",
  );
});

// ========================================
// Preloader (Optional)
// ========================================
window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader");
  if (preloader) {
    preloader.style.opacity = "0";
    setTimeout(() => preloader.remove(), 500);
  }
});
