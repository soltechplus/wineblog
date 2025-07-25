export const changePostCardView = (post, currentPostClass, newPostClass) => {
  const postElements = post.querySelectorAll(`[class*="${currentPostClass}"]`);

  post.classList.replace(currentPostClass, newPostClass);

  postElements.forEach((postElement) => {
    const classNames = postElement.classList;
    classNames.forEach((className) => {
      if (className.startsWith(currentPostClass)) {
        const newClassName = className.replace(currentPostClass, newPostClass);
        postElement.classList.replace(className, newClassName);
      }
    });
  });
};

export const toggleClasses = (triggerSelector, targetSelector, firstClass, secondClass) => {
  const trigger = document.querySelector(triggerSelector);
  const target = document.querySelector(targetSelector);

  if (!trigger || !target) {
    return;
  }

  trigger.addEventListener('click', () => {
    console.log('test');
    if (target.classList.contains(firstClass)) {
      target.classList.remove(firstClass);
      target.classList.add(secondClass);
    } else {
      target.classList.remove(secondClass);
      target.classList.add(firstClass);
    }
  });
};

export const copyToClipboard = () => {
  const shareLinkBtns = document.querySelectorAll('.copyToClipboardBtn');

  const toCopy = (clickedBtn) => {
    const url = window.location.href;

    const handleCopy = (btn, success) => {
      if (success) {
        btn.classList.add('copied');
        setTimeout(() => {
          btn.classList.remove('copied');
        }, 800);
      } else {
        btn.classList.add('notCopied');
        setTimeout(() => {
          btn.classList.remove('notCopied');
        }, 800);
      }
    };

    navigator.clipboard.writeText(url).then(
      () => {
        handleCopy(clickedBtn, true);
      },
      () => {
        handleCopy(clickedBtn, false);
      }
    );
  };

  if (shareLinkBtns) {
    Array.from(shareLinkBtns).forEach((btn) => {
      btn.addEventListener('click', () => toCopy(btn));
    });
  }
};

export const addClassToElement = (element, classNames) => {
  if (element) {
    if (typeof classNames === 'string') element.classList.add(classNames);
    if (typeof classNames === 'object') element.classList.add(...classNames);
  }
};

export const removeClassFromElement = (element, classNames) => {
  if (element) {
    if (typeof classNames === 'string') element.classList.remove(classNames);
    if (typeof classNames === 'object') element.classList.remove(...classNames);
  }
};

export const showElem = (elem) => {
  elem.classList.add('open');
  elem.classList.add('open-anim');
};

export const stopElemAnim = (elem) => {
  elem.classList.remove('open');
  elem.classList.remove('close-anim');
  elem.classList.remove('open-anim');
};

export const addCloseElemAnim = (elem) => {
  elem.classList.remove('open-anim');
  elem.classList.add('close-anim');
};

export const hideElem = (elem) => {
  elem.classList.remove('open');
  elem.classList.remove('close-anim');
};

export let timeout = {
  id: null
};

export const calcHeightTierCard = () => {
  const membershipCards = document.querySelectorAll('.tier-card');

  if (membershipCards.length && window.innerWidth > 1100) {
    const cardsDescriptions = document.querySelectorAll('.tier-card__desc');
    let maxHeight = 0;

    cardsDescriptions.forEach((desc) => {
      if (desc.clientHeight >= maxHeight) {
        maxHeight = desc.clientHeight;
      }
    });

    cardsDescriptions.forEach((desc) => {
      desc.style.height = `${maxHeight}px`;
    });
  }
};

export const setColumnMaxWidth = (gridSelector, columnSelector) => {
  const grid = document.querySelector(`.${gridSelector}`);
  const columns = grid.querySelectorAll(`.${columnSelector}`);
  let maxWidth = 0;

  columns.forEach((column) => {
    const width = column.getBoundingClientRect().width;
    if (width > maxWidth) maxWidth = width;
  });

  columns.forEach((column) => {
    column.style.flexBasis = `${maxWidth}px`;
  });
};
