class PageLoadAnimation {
  constructor() {
    this.hasAnimated = sessionStorage.getItem('pageLoadAnimationShown') === 'true';
    this.duration = 1200;
    this.init();
  }

  init() {
    if (this.hasAnimated) {
      document.body.classList.add('page-load-complete');
      return;
    }

    window.addEventListener('load', () => {
      this.animate();
    });
  }

  animate() {
    const overlay = document.querySelector('.page-load-overlay');
    const logo = document.querySelector('.page-load-logo');
    const header = document.querySelector('header-component');
    const headerLogo = document.querySelector('.header-logo');

    if (!overlay || !logo || !header || !headerLogo) {
      document.body.classList.add('page-load-complete');
      return;
    }

    const headerLogoRect = headerLogo.getBoundingClientRect();
    const logoRect = logo.getBoundingClientRect();

    const translateX = headerLogoRect.left + headerLogoRect.width / 2 - (logoRect.left + logoRect.width / 2);
    const translateY = headerLogoRect.top + headerLogoRect.height / 2 - (logoRect.top + logoRect.height / 2);

    const scaleRatio = headerLogoRect.width / logoRect.width;

    setTimeout(() => {
      logo.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleRatio})`;
      overlay.style.opacity = '0';

      setTimeout(() => {
        document.body.classList.add('page-load-complete');
        overlay.style.display = 'none';
        sessionStorage.setItem('pageLoadAnimationShown', 'true');
      }, this.duration);
    }, 300);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new PageLoadAnimation();
  });
} else {
  new PageLoadAnimation();
}
