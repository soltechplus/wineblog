import { addClassToElement, removeClassFromElement } from './utils';

const addClassToLastElements = (elements, className) => {
  elements.forEach((element) => {
    addClassToElement(element.lastElementChild, className);
  });
};

const removeClassFromLastElements = (elements, className) => {
  elements.forEach((element) => {
    removeClassFromElement(element.lastElementChild, className);
  });
};

export const initHeader = () => {
  const header = document.querySelector('.header');
  const sidebars = document.querySelectorAll('aside');

  if (!header) {
    return;
  }

  const hidePos = 0; // in px;
  let prevScrollYPos = 0; // in px;

  const headerScrollHandler = () => {
    if (window.scrollY === 0) {
      removeClassFromLastElements(sidebars, 'last-elem--header-show');
    } else if (window.scrollY > hidePos) {
      if (window.scrollY < prevScrollYPos) {
        removeClassFromElement(header, 'hide');
        addClassToLastElements(sidebars, 'last-elem--header-show');
      } else {
        addClassToElement(header, 'hide');
        removeClassFromLastElements(sidebars, 'last-elem--header-show');
      }
    }

    prevScrollYPos = window.scrollY;
  };

  headerScrollHandler();
  window.addEventListener('scroll', headerScrollHandler);
};
