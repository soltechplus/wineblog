export const initNextPostBlock = () => {
  const postHeader = document.querySelector('.post-header');
  const readNextSection = document.querySelector('.post-read-next');
  const nextBlock = document.querySelector('.next-block');
  const footer = document.querySelector('.footer');

  if (!postHeader || !nextBlock) {
    return;
  }

  const nextBlockCloseBtn = nextBlock.querySelector('.next-block-post__close-btn');

  const hideNextBlock = () => {
    nextBlock.classList.remove('next-block--show');
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.target.classList.contains('post-header')) {
          if (!entry.isIntersecting) {
            postHeader.classList.remove('visible-js');
            if (!readNextSection.classList.contains('visible-js')) {
              nextBlock.classList.add('next-block--show');
            }
          } else {
            postHeader.classList.add('visible-js');
            nextBlock.classList.remove('next-block--show');
          }
        }

        if (entry.target.classList.contains('post-read-next')) {
          if (entry.isIntersecting) {
            readNextSection.classList.add('visible-js');
            nextBlock.classList.remove('next-block--show');
          } else {
            readNextSection.classList.remove('visible-js');
            if (!postHeader.classList.contains('visible-js')) {
              nextBlock.classList.add('next-block--show');
            }
            if (footer.classList.contains('visible-js')) {
              nextBlock.classList.remove('next-block--show');
            }
          }
        }

        if (entry.target.classList.contains('footer')) {
          if (entry.isIntersecting) {
            footer.classList.add('visible-js');
            nextBlock.classList.remove('next-block--show');
          } else {
            footer.classList.remove('visible-js');
          }
        }
      });
    },
    { threshold: 0 }
  );

  [postHeader, readNextSection, footer].forEach((element) => observer.observe(element));

  nextBlockCloseBtn.addEventListener('click', (e) => {
    e.preventDefault();
    hideNextBlock();

    [postHeader, readNextSection].forEach((element) => observer.unobserve(element));
  });
};
