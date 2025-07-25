// SCSS imports
// --------------------------------------------------------

import '../scss/index.scss';

// JS imports
// --------------------------------------------------------

import { initSubmenu } from './submenu';
import { initDropdown } from './dropdown';
import { initMobileMenu, initMobileSubmenus } from './mobileMenu';
import { initDarkMode } from './darkMode';
import { initProgressBar } from './progressBar';
import { initNextPostBlock } from './nextPostBlock';
import { initHeader } from './header';
import {
  copyToClipboard,
  changePostCardView,
  toggleClasses,
  calcHeightTierCard,
  setColumnMaxWidth
} from './utils';
import { initComments } from './comments';

// Set dark mode colors for comments block on post page
// --------------------------------------------------------

initComments();

// Toggle plan on membership page Script
// --------------------------------------------------------

calcHeightTierCard();

// Toggle plan on membership page
// --------------------------------------------------------

toggleClasses('.membership-toggle', '.membership', 'monthly', 'yearly');

// Toggle form on Sign In/Sign Up page
// --------------------------------------------------------

toggleClasses('.form-toggle', '.form-page', 'sign-in', 'sign-up');

// Submenu Script
// --------------------------------------------------------

initSubmenu();

// Dropdown Script
// --------------------------------------------------------

initDropdown();

// Mobile menu scripts
// --------------------------------------------------------

initMobileSubmenus();
initMobileMenu();

// Dark Mode Script
// --------------------------------------------------------

initDarkMode();

// Copy to clipboard button script
// --------------------------------------------------------

copyToClipboard();

// Progress Bar script
// --------------------------------------------------------

initProgressBar();

// Script show next post on post page
// --------------------------------------------------------

initNextPostBlock();

// Header Script
// --------------------------------------------------------

initHeader();

// Set max width column for grid on footer nav
// --------------------------------------------------------

setColumnMaxWidth('footer-nav', 'footer-nav-list');

// Set "position: sticky" last element in sidebar
// --------------------------------------------------------

const sidebars = document.querySelectorAll('.sidebar');

sidebars.forEach((sidebar) => {
  sidebar.lastElementChild.classList.add('last-elem');
});

// LoadMore script

let nextUrl = document.head.querySelector('link[rel="next"]')?.href;

function renderPosts(postsArray, containerNode) {
  postsArray.forEach((postCard) => {
    if (postCard.classList.contains('post-card-big-primary')) {
      changePostCardView(postCard, 'post-card-big-primary', 'post-card-default');
    }

    containerNode.append(postCard);
  });
}

const loadMorePosts = async (loadMoreButton, postsWrapper, renderPostsFunction) => {
  loadMoreButton.classList.add('loading');

  if (nextUrl) {
    try {
      const response = await fetch(nextUrl);

      if (response.ok) {
        const responseText = await response.text();
        const html = new DOMParser().parseFromString(responseText, 'text/html');
        const posts = html.querySelectorAll(`[data-load-more-posts] article`);
        const nextPageUrl = html.querySelector('link[rel="next"]')?.href;

        renderPostsFunction(posts, postsWrapper);

        //Update the next page link in the document head
        if (nextPageUrl) {
          nextUrl = nextPageUrl;
        } else {
          loadMoreButton.style.display = 'none';
          document
            .querySelector('[data-load-more-posts]')
            .setAttribute('data-load-more-posts', 'disable');
        }

        loadMoreButton.classList.remove('loading');
      } else {
        console.error('Error HTTP: ' + response.status);
      }
    } catch (error) {
      console.error(error);
    }
  }
};

const loadMoreBtn = document.querySelector('[data-load-more-btn="enable"]');

if (loadMoreBtn) {
  const postsSection = document.querySelector('[data-load-more-posts]');
  loadMoreBtn.addEventListener('click', function () {
    loadMorePosts(this, postsSection, renderPosts);
  });
}
