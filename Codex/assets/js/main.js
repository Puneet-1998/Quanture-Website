/* ============================================================
   Quanture Calanytics Private Limited - Codex Redesign Scripts
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  var body = document.body;
  var nav = document.querySelector('.navbar__nav');
  var hamburger = document.querySelector('.navbar__hamburger');
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function closeNav() {
    if (!nav || !hamburger) {
      return;
    }
    nav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    body.classList.remove('menu-open');
  }

  if (nav && hamburger) {
    hamburger.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      body.classList.toggle('menu-open', isOpen);
    });

    document.addEventListener('click', function (event) {
      if (!nav.contains(event.target) && !hamburger.contains(event.target)) {
        closeNav();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeNav();
      }
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        closeNav();
      });
    });
  }

  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__nav a').forEach(function (link) {
    var href = (link.getAttribute('href') || '').split('#')[0];
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (event) {
      var targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') {
        return;
      }

      var target = document.querySelector(targetId);
      if (!target) {
        return;
      }

      event.preventDefault();
      var navHeight = document.querySelector('.navbar') ? document.querySelector('.navbar').offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.scrollY - navHeight - 12;

      window.scrollTo({
        top: top,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });

      closeNav();
    });
  });

  var revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length) {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealElements.forEach(function (element) {
        element.classList.add('is-visible');
      });
    } else {
      var revealObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });

      revealElements.forEach(function (element) {
        revealObserver.observe(element);
      });
    }
  }

  var accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(function (item, index) {
    var button = item.querySelector('.accordion-header');
    var content = item.querySelector('.accordion-content');
    if (!button || !content) {
      return;
    }

    var panelId = 'accordion-panel-' + index;
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', panelId);
    content.id = panelId;
    content.hidden = true;

    button.addEventListener('click', function () {
      var shouldOpen = !button.classList.contains('open');

      accordionItems.forEach(function (entry) {
        var entryButton = entry.querySelector('.accordion-header');
        var entryContent = entry.querySelector('.accordion-content');
        if (!entryButton || !entryContent) {
          return;
        }
        entryButton.classList.remove('open');
        entryButton.setAttribute('aria-expanded', 'false');
        entryContent.classList.remove('open');
        entryContent.hidden = true;
      });

      if (shouldOpen) {
        button.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
        content.classList.add('open');
        content.hidden = false;
      }
    });
  });

  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    var successBox = contactForm.querySelector('[data-form-success="true"]');
    if (successBox) {
      successBox.setAttribute('role', 'status');
      successBox.setAttribute('aria-live', 'polite');
    }

    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var requiredFields = contactForm.querySelectorAll('[data-required="true"]');
      var valid = true;
      var firstInvalidField = null;

      requiredFields.forEach(function (field) {
        var value = field.value.trim();
        var isEmailField = field.getAttribute('type') === 'email';
        var emailValid = !isEmailField || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

        if (!value || !emailValid) {
          field.style.borderColor = '#d22d2d';
          field.setAttribute('aria-invalid', 'true');
          valid = false;
          if (!firstInvalidField) {
            firstInvalidField = field;
          }
        } else {
          field.style.borderColor = '';
          field.removeAttribute('aria-invalid');
        }
      });

      if (!valid) {
        if (firstInvalidField) {
          firstInvalidField.focus();
        }
        return;
      }

      var submitButton = contactForm.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.textContent = 'Request Submitted';
        submitButton.disabled = true;
        submitButton.style.background = '#0f6f73';
        submitButton.style.borderColor = '#0f6f73';
      }

      if (successBox) {
        successBox.hidden = false;
      }
    });
  }

  function startCounterAnimation(element, endValue, suffix) {
    if (prefersReducedMotion) {
      element.textContent = String(endValue) + suffix;
      return;
    }

    var duration = 1200;
    var startTime = null;

    function updateCounter(timestamp) {
      if (!startTime) {
        startTime = timestamp;
      }
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var currentValue = Math.floor(eased * endValue);
      element.textContent = String(currentValue) + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(updateCounter);
      }
    }

    window.requestAnimationFrame(updateCounter);
  }

  var counterElements = document.querySelectorAll('[data-count]');
  if (counterElements.length) {
    if (!('IntersectionObserver' in window)) {
      counterElements.forEach(function (counter) {
        var endValue = Number(counter.getAttribute('data-count'));
        var suffix = counter.getAttribute('data-suffix') || '';
        if (!Number.isNaN(endValue)) {
          startCounterAnimation(counter, endValue, suffix);
        }
      });
    } else {
      var counterObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }

          var element = entry.target;
          var endValue = Number(element.getAttribute('data-count'));
          var suffix = element.getAttribute('data-suffix') || '';
          if (!Number.isNaN(endValue)) {
            startCounterAnimation(element, endValue, suffix);
          }
          observer.unobserve(element);
        });
      }, { threshold: 0.35 });

      counterElements.forEach(function (counter) {
        counterObserver.observe(counter);
      });
    }
  }
});
