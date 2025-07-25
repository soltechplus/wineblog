export const initComments = () => {
  const iframe = document.querySelector('#ghost-comments-root iframe');

  if (iframe) {
    iframe.addEventListener('load', () => {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

      const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            const commentsWrapper = iframeDoc.querySelector('[data-testid="content-box"]');
            const commentsElement = iframeDoc.querySelector('[data-testid="comment-elements"]');

            if (commentsWrapper) {
              commentsWrapper.style.paddingBottom = '0px';
            }

            if (commentsElement && commentsElement.innerHTML.trim() !== '') {
              commentsElement.style.marginTop = '24px';
            }
          }
        }
      });

      iframeDoc.head.insertAdjacentHTML(
        'beforeend',
        `<style>
  
              section.dark button[data-testid="signin-button"] {
                color: inherit !important;
              }
  
              section[data-testid="cta-box"] h1:first-child{
                color: #000000;
              }
  
              section[data-testid="cta-box"] p{
                color: #606060;
              }
  
              section.dark section[data-testid="cta-box"] h1:first-child{
              color: #fff;
              }
              section.dark section[data-testid="cta-box"] p{
                color: #acacac;
              }
  
            </style>`
      );

      observer.observe(iframeDoc, { childList: true, subtree: true });
    });
  }
};
