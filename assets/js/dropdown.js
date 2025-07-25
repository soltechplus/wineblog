import { showElem, stopElemAnim, addCloseElemAnim, hideElem } from './utils';
import { timeout } from './utils';

const dropdownHandler = (btn, dropdown, overlay) => {
  btn.addEventListener('mouseenter', () => {
    clearTimeout(timeout.id);

    stopElemAnim(overlay);
    stopElemAnim(dropdown);

    showElem(overlay);
    showElem(dropdown);
  });

  btn.addEventListener('mouseleave', (e) => {
    hideElem(e.target.querySelector('[data-dropdown-elem="dropdown"]'));
    addCloseElemAnim(overlay);
    addCloseElemAnim(dropdown);

    timeout.id = setTimeout(() => {
      hideElem(dropdown);
      hideElem(overlay);
    }, 300);
  });

  btn.addEventListener('keydown', (e) => {
    const currentTarget = e.currentTarget.querySelector('button');
    const keyCode = e.code;

    if (keyCode === 'Space' || keyCode === 'Enter') {
      if (currentTarget.getAttribute('aria-expanded') === 'true') {
        hideElem(dropdown);
        hideElem(overlay);
        currentTarget.setAttribute('aria-expanded', 'false');
      } else {
        showElem(overlay);
        showElem(dropdown);
        currentTarget.setAttribute('aria-expanded', 'true');
      }
    }
  });

  btn.addEventListener('focusout', (e) => {
    const currentTarget = e.currentTarget.querySelector('button');
    const currentTargetClass = '.' + e.currentTarget.className;

    if (!e.relatedTarget.closest(currentTargetClass)) {
      hideElem(dropdown);
      hideElem(overlay);
      currentTarget.setAttribute('aria-expanded', 'false');
    }
  });
};

export const initDropdown = () => {
  const overlay = document.querySelector('.overlay');
  const accountBtn = document.querySelector('.header-account');
  const dropdownAccount = document.querySelector('.account-dropdown');
  const subscribeBtn = document.querySelector('.header-subscribe');
  const dropdownSubscribe = document.querySelector('.subscribe-dropdown');

  if (accountBtn && dropdownAccount) {
    dropdownHandler(accountBtn, dropdownAccount, overlay);
  }

  if (subscribeBtn) {
    dropdownHandler(subscribeBtn, dropdownSubscribe, overlay);
  }
};
