/* =========================================================
   ZAIQA — SIGNATURE DINING — script.js
========================================================= */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Sticky header on scroll ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* ---------- Mobile hamburger menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navCta = document.querySelector('.nav-cta');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    if (navCta) navCta.classList.toggle('open', isOpen);
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
      if (navCta) navCta.classList.remove('open');
    });
  });

  /* ---------- Scroll reveal animations ---------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-up');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Animated stat counters ---------- */
  const statNumbers = document.querySelectorAll('.stat-number');
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString();
    };
    requestAnimationFrame(step);
  };
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statNumbers.forEach(el => statObserver.observe(el));

  /* ---------- Menu category tabs ---------- */
  const menuTabs = document.querySelectorAll('.menu-tab');
  const menuLists = document.querySelectorAll('.menu-list');

  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const category = tab.dataset.category;

      menuTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      menuLists.forEach(list => {
        list.classList.toggle('active', list.dataset.panel === category);
      });
    });
  });

  /* ---------- Gallery lightbox ---------- */
  const galleryItems = document.querySelectorAll('.gallery-item img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  galleryItems.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ---------- Reservation form (front-end only) ----------
     NOTE FOR DEVELOPER:
     This form currently has no backend. To connect it to a real
     booking system or email service (e.g. Formspree, EmailJS,
     a custom API endpoint, or WhatsApp Business API), replace
     the logic inside handleReservationSubmit() below with an
     actual fetch()/API call using the `formData` object that is
     already being collected for you.
  ------------------------------------------------------------ */
  const reservationForm = document.getElementById('reservationForm');
  const formNote = document.getElementById('formNote');

  function handleReservationSubmit(formData) {
    // TODO: Replace this block with a real API/email/WhatsApp integration.
    console.log('Reservation request captured:', formData);
    return Promise.resolve({ success: true });
  }

  reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!reservationForm.checkValidity()) {
      reservationForm.reportValidity();
      return;
    }

    const formData = Object.fromEntries(new FormData(reservationForm).entries());

    formNote.textContent = 'Submitting your request...';

    handleReservationSubmit(formData).then((res) => {
      if (res.success) {
        formNote.textContent = `Thank you, ${formData.fullName || 'guest'}! Your reservation request has been received. We will confirm shortly via email or phone.`;
        reservationForm.reset();
      } else {
        formNote.textContent = 'Something went wrong. Please try again or call us directly.';
      }
    });
  });

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
