export const initProgressBar = () => {
  const progressBar = document.querySelector('.progress-bar');
  const header = document.querySelector('.header');

  if (!progressBar) {
    return;
  }

  const readingProgress = document.querySelector('.reading-progress');
  const postContent = document.querySelector('.post-content');

  function updateProgress() {
    const postContentRect = postContent.getBoundingClientRect();
    const scrollPosition = postContentRect.top * -1;
    const totalPostHeight = postContentRect.height;
    const progressPercentage = Math.max(0, Math.min(100, (scrollPosition / totalPostHeight) * 100));

    if (postContentRect.top <= 0 && postContentRect.bottom >= 0) {
      header.classList.add('header--progress-bar-show');
      readingProgress.setAttribute('value', progressPercentage);
    } else {
      header.classList.remove('header--progress-bar-show');
    }
  }

  window.addEventListener('scroll', updateProgress);
  window.addEventListener('load', updateProgress);
};
