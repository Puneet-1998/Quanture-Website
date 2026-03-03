/* ============================================================
   Quanture Calanytics — Main JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* -----------------------------------------------------------
     1. MOBILE NAV TOGGLE
     ----------------------------------------------------------- */
  var hamburger = document.querySelector('.navbar__hamburger');
  var nav       = document.querySelector('.navbar__nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      nav.classList.toggle('open');
      var isOpen = nav.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      hamburger.classList.toggle('active', isOpen);
    });

    /* Close on outside click */
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.classList.remove('active');
      }
    });

    /* Close on nav link click (mobile UX) */
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.classList.remove('active');
      });
    });
  }

  /* -----------------------------------------------------------
     2. ACTIVE NAV LINK
     ----------------------------------------------------------- */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__nav a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage) link.classList.add('active');
  });

  /* -----------------------------------------------------------
     3. NAVBAR SCROLL EFFECT
     Adds .navbar--scrolled for enhanced shadow on scroll.
     Only on desktop where navbar is sticky.
     ----------------------------------------------------------- */
  var navbar = document.querySelector('.navbar');

  if (navbar) {
    var scrollThreshold = 40;
    var handleNavScroll = function () {
      if (window.scrollY > scrollThreshold) {
        navbar.classList.add('navbar--scrolled');
      } else {
        navbar.classList.remove('navbar--scrolled');
      }
    };
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();
  }

  /* -----------------------------------------------------------
     4. ACCORDION
     Scoped per accordion container so multiple accordions
     on the same page operate independently.
     ----------------------------------------------------------- */
  document.querySelectorAll('.accordion-header').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var body    = this.nextElementSibling;
      var isOpen  = this.classList.contains('open');
      var wrapper = this.closest('.accordion');
      var headers = wrapper
        ? wrapper.querySelectorAll('.accordion-header')
        : document.querySelectorAll('.accordion-header');

      /* Close all in scope */
      headers.forEach(function (h) {
        h.classList.remove('open');
        h.setAttribute('aria-expanded', 'false');
        if (h.nextElementSibling) h.nextElementSibling.classList.remove('open');
      });

      /* Toggle clicked */
      if (!isOpen) {
        this.classList.add('open');
        this.setAttribute('aria-expanded', 'true');
        if (body) body.classList.add('open');
      }
    });
  });

  /* -----------------------------------------------------------
     5. SMOOTH SCROLL WITH NAVBAR OFFSET
     Accounts for sticky navbar height so targets aren't
     hidden behind it.
     ----------------------------------------------------------- */
  var navbarHeight = navbar ? navbar.offsetHeight : 0;

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* Handle cross-page anchor links (e.g. services.html#aeps) */
  if (window.location.hash) {
    setTimeout(function () {
      var target = document.querySelector(window.location.hash);
      if (target) {
        var top = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    }, 150);
  }

  /* -----------------------------------------------------------
     6. CONTACT FORM VALIDATION (Enhanced)
     - Inline field-level errors on blur
     - Clears errors on input
     - Auto-resets form after successful submission
     ----------------------------------------------------------- */
  var form = document.getElementById('contactForm');

  if (form) {
    function showFieldError(el, message) {
      clearFieldError(el);
      var err = document.createElement('span');
      err.className = 'field-error';
      err.textContent = message;
      el.parentNode.appendChild(err);
      el.style.borderColor = '#E53E3E';
    }

    function clearFieldError(el) {
      var existing = el.parentNode.querySelector('.field-error');
      if (existing) existing.remove();
      el.style.borderColor = '';
    }

    /* Live validation on blur */
    form.querySelectorAll('input, textarea, select').forEach(function (el) {
      el.addEventListener('blur', function () {
        if (el.required && !el.value.trim()) {
          showFieldError(el, 'This field is required');
        } else if (el.type === 'email' && el.value.trim() &&
                   !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim())) {
          showFieldError(el, 'Please enter a valid email address');
        } else {
          clearFieldError(el);
        }
      });

      el.addEventListener('input', function () {
        clearFieldError(el);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name    = form.querySelector('[name="name"]');
      var email   = form.querySelector('[name="email"]');
      var message = form.querySelector('[name="message"]');
      var valid   = true;

      [name, email, message].forEach(function (el) {
        if (el && !el.value.trim()) {
          showFieldError(el, 'This field is required');
          valid = false;
        } else if (el) {
          clearFieldError(el);
        }
      });

      if (email && email.value.trim() &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        showFieldError(email, 'Please enter a valid email address');
        valid = false;
      }

      if (valid) {
        var btn = form.querySelector('button[type="submit"]');
        if (btn) {
          btn.textContent = 'Message Sent';
          btn.disabled = true;
          btn.style.background = '#0A7855';
        }
        /* Auto-reset after 4 seconds */
        setTimeout(function () {
          form.reset();
          form.querySelectorAll('.field-error').forEach(function (err) { err.remove(); });
          form.querySelectorAll('input, textarea, select').forEach(function (el) {
            el.style.borderColor = '';
          });
          if (btn) {
            btn.textContent = 'Submit Enquiry';
            btn.disabled = false;
            btn.style.background = '';
          }
        }, 4000);
      }
    });
  }

  /* -----------------------------------------------------------
     7. SCROLL-TRIGGERED FADE-IN (Staggered)
     Groups elements by parent container so siblings enter
     one after another instead of all at once.
     ----------------------------------------------------------- */
  var fadeSelectors = '.card, .service-card, .leader-card, .stat-item, .security-badge';
  var fadeElements  = document.querySelectorAll(fadeSelectors);

  /* Group by parent for stagger delay */
  var parentGroups = new Map();
  fadeElements.forEach(function (el) {
    var parent = el.parentElement;
    if (!parentGroups.has(parent)) parentGroups.set(parent, []);
    parentGroups.get(parent).push(el);
  });

  parentGroups.forEach(function (children) {
    children.forEach(function (el, i) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.5s ease ' + (i * 0.1) + 's, transform 0.5s ease ' + (i * 0.1) + 's';
    });
  });

  var cardObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  fadeElements.forEach(function (el) {
    cardObserver.observe(el);
  });

  /* -----------------------------------------------------------
     8. SECTION HEADING FADE-IN
     Labels, titles, and intro paragraphs slide up on scroll.
     ----------------------------------------------------------- */
  var headingObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        headingObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.section__label, .section__title, .section__intro, .page-hero h1, .page-hero p').forEach(function (el) {
    el.classList.add('fade-up');
    headingObserver.observe(el);
  });

  /* -----------------------------------------------------------
     9. BACK TO TOP BUTTON
     Appears after scrolling 500px. Smooth-scrolls to top.
     ----------------------------------------------------------- */
  var backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.setAttribute('aria-label', 'Scroll to top');
  backToTop.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/></svg>';
  document.body.appendChild(backToTop);

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  var backToTopThreshold = 500;
  window.addEventListener('scroll', function () {
    if (window.scrollY > backToTopThreshold) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  /* -----------------------------------------------------------
     10. COUNTER ANIMATION FOR STAT NUMBERS
     Animates numeric .stat-item__number elements from 0.
     Skips non-numeric text (e.g. "B2B", "RBI").
     ----------------------------------------------------------- */
  function animateCounter(el) {
    var text  = el.textContent.trim();
    var match = text.match(/^(\d+)(\+?)$/);
    if (!match) return;

    var target   = parseInt(match[1], 10);
    var suffix   = match[2] || '';
    var duration = 1200;
    var start    = null;

    el.textContent = '0' + suffix;

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      /* ease-out quad */
      var eased = 1 - (1 - progress) * (1 - progress);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-item__number').forEach(function (el) {
    counterObserver.observe(el);
  });

  /* -----------------------------------------------------------
     11. PAGE LOAD FADE-IN
     Prevents flash of unstyled content by fading the body in.
     ----------------------------------------------------------- */
  document.body.classList.add('loaded');

});
