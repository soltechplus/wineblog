export const initMobileMenu = () => {
  const html = document.documentElement;
  const burgerBtns = document.querySelectorAll('.header-btn[data-mobile-menu="open"]');
  const mobileMenuContainer = document.querySelector('.mobile-menu-container');
  const submenuItems = document.querySelectorAll('.mobile-nav-submenu-item');
  const header = document.querySelector('.header');

  const closeActiveSubMenu = () => {
    submenuItems.forEach((item) => {
      item.classList.remove('active');
      item.querySelector('.mobile-nav-submenu').style.height = '0px';
    });
  };

  const openMobileMenu = () => {
    html.classList.add('lock-scroll');
    mobileMenuContainer.classList.add('menu-open');
    header.classList.add('header--announcement-bar-hide');
  };

  const closeMobileMenu = () => {
    mobileMenuContainer.classList.add('menu-hide-anim');
    html.classList.remove('lock-scroll');

    setTimeout(() => {
      mobileMenuContainer.classList.remove('menu-open');
      mobileMenuContainer.classList.remove('menu-hide-anim');
      header.classList.remove('header--announcement-bar-hide');
      closeActiveSubMenu();
    }, 250);
  };

  burgerBtns.forEach((burgerBtn) => burgerBtn.addEventListener('click', openMobileMenu));

  mobileMenuContainer.addEventListener('click', (e) => {
    const elem = e.target;

    if (
      elem.closest('.header-btn[data-mobile-menu="close"]') ||
      elem.closest('.mobile-menu-overlay')
    ) {
      closeMobileMenu();
    }
  });
};

export const initMobileSubmenus = () => {
  const submenuItems = document.querySelectorAll('.mobile-nav-submenu-item__button');

  if (!submenuItems.length) {
    return;
  }

  const clickHandler = (btn) => {
    const submenu = btn.parentElement;
    const submenuItems = submenu.querySelectorAll('.mobile-nav-submenu__item');
    const submenuItemsList = submenu.querySelector('.mobile-nav-submenu');

    if (submenu.classList.contains('active')) {
      submenu.classList.remove('active');
      submenuItemsList.style.height = '0px';
    } else {
      submenu.classList.add('active');

      const submenuHeight = Array.from(submenuItems).reduce(
        (accumulator, currentValue) => accumulator + currentValue.offsetHeight,
        0
      );
      submenuItemsList.style.height = `${submenuHeight}px`;
    }
  };

  submenuItems.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        return;
      }

      clickHandler(btn);
    });
  });
};
