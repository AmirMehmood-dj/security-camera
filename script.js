/* ============================================
   SECUREGUARD PRO — SCRIPTS
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ---- Navbar scroll effect ----
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ---- Active nav link highlight on scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  const highlightNav = () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
  };
  window.addEventListener('scroll', highlightNav);

  // ---- Back to top ----
  const backBtn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backBtn.classList.toggle('visible', window.scrollY > 400);
  });

  // ---- Smooth close mobile nav on link click ----
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const toggler = document.querySelector('.navbar-toggler');
      const menu   = document.getElementById('navMenu');
      if (menu.classList.contains('show')) toggler.click();
    });
  });

  // ---- Contact form submit → sends details via WhatsApp ----
  const form = document.getElementById('quoteForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const fields = form.querySelectorAll('input, select, textarea');
      const name     = fields[0].value.trim() || '—';
      const phone    = fields[1].value.trim() || '—';
      const city     = fields[2].value.trim() || '—';
      const property = fields[3].value || '—';

      const services = [];
      if (form.querySelector('#chkCamera').checked)  services.push('Security Cameras');
      if (form.querySelector('#chkFence').checked)   services.push('Electric Fence');
      if (form.querySelector('#chkTracker').checked) services.push('Car Tracker');
      const serviceText = services.length ? services.join(', ') : '—';

      const message = form.querySelector('textarea').value.trim() || '—';

      const text =
        `*New Quote Request — SecureGuard Pro*\n\n` +
        `👤 *Name:* ${name}\n` +
        `📞 *Phone:* ${phone}\n` +
        `📍 *City:* ${city}\n` +
        `🏠 *Property Type:* ${property}\n` +
        `🔧 *Services:* ${serviceText}\n` +
        `💬 *Details:* ${message}`;

      const waURL = `https://wa.me/923150030730?text=${encodeURIComponent(text)}`;

      const btn = form.querySelector('button[type="submit"]');
      btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Opening WhatsApp...';
      btn.disabled = true;

      setTimeout(() => {
        window.open(waURL, '_blank');
        btn.innerHTML = '<i class="fas fa-check-circle me-2"></i>Sent via WhatsApp!';
        btn.style.background = '#059669';
        setTimeout(() => {
          btn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Send Quote Request';
          btn.style.background = '';
          btn.disabled = false;
          form.reset();
        }, 3000);
      }, 600);
    });
  }

  // ---- Intersection Observer — fade-in on scroll ----
  const fadeEls = document.querySelectorAll(
    '.service-card, .product-card, .process-card, .testimonial-card, .why-item'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
    observer.observe(el);
  });

  // ---- Counter animation for hero stats ----
  const counters = document.querySelectorAll('.stat-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = el.textContent;
        // Only animate pure numbers
        const num = parseInt(target.replace(/[^0-9]/g, ''));
        if (isNaN(num) || target.includes('/')) return;
        const suffix = target.replace(/[0-9]/g, '');
        let count = 0;
        const step = Math.ceil(num / 60);
        const timer = setInterval(() => {
          count += step;
          if (count >= num) { count = num; clearInterval(timer); }
          el.textContent = count.toLocaleString() + suffix;
        }, 24);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

});
