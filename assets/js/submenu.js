import { showElem, stopElemAnim, addCloseElemAnim, hideElem } from './utils';
import { timeout } from './utils';

const showSubmenu = (elem, overlay) => {
  stopElemAnim(elem);
  stopElemAnim(overlay);

  showElem(elem);
  showElem(overlay);
};

const hideSubmenu = (elem, overlay) => {
  addCloseElemAnim(overlay);
  addCloseElemAnim(elem);

  timeout.id = setTimeout(() => {
    hideElem(elem);
    hideElem(overlay);
  }, 300);
};

export const initSubmenu = () => {
  const overlay = document.querySelector('.overlay');
  const submenuItems = document.querySelectorAll('.nav-submenu-item');

  submenuItems.forEach((submenuItem) => {
    const submenu = submenuItem.querySelector('.submenu');

    submenuItem.addEventListener('mouseenter', (e) => {
      submenuItem.classList.add('open');
      clearTimeout(timeout.id);
      showSubmenu(submenu, overlay);
    });
    submenuItem.addEventListener('mouseleave', (e) => {
      submenuItem.classList.remove('open');
      hideElem(e.target.querySelector('.submenu'));
      hideSubmenu(submenu, overlay);
    });

    submenuItem.addEventListener('keydown', (e) => {
      const submenuBtn = e.currentTarget.querySelector('button');
      const keyCode = e.code;

      if (keyCode === 'Space' || keyCode === 'Enter') {
        clearTimeout(timeout.id);
        if (submenuBtn.getAttribute('aria-expanded') === 'true') {
          hideSubmenu(submenu, overlay);

          submenuBtn.setAttribute('aria-expanded', 'false');
        } else {
          showSubmenu(submenu, overlay);

          submenuBtn.setAttribute('aria-expanded', 'true');
        }
      }
    });

    submenuItem.addEventListener('focusout', (e) => {
      const currentTargetLastClass = '.' + e.currentTarget.classList[1];
      const submenuBtn = e.currentTarget.querySelector('button');

      if (!e.relatedTarget.closest(currentTargetLastClass)) {
        hideSubmenu(submenu, overlay);

        submenuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  });
};
