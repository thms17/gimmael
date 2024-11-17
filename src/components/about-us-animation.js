import { gsap } from '../index';

// Select elements by their attributes
const menuColumn = document.querySelector('[menu-column]');
const navLinksWrapper = document.querySelector('[nav-links-wrapper]');
const homeTextWrapper = document.querySelector('[home-text-wrapper]');
const aboutUsButton = document.querySelector('[about-us-button]');
const navButton = document.querySelector('[nav-button]');

// Check if all necessary elements are present
if (menuColumn && navLinksWrapper && homeTextWrapper && aboutUsButton && navButton) {
  // Initialize the timeline with GSAP
  const tl = gsap.timeline({ paused: true });

  // Button click event listener
  aboutUsButton.addEventListener('click', () => {
    // Animation 1: Animate `menu-column` to `width: 100%`
    tl.to(
      menuColumn,
      {
        width: '100%',
        duration: 0.8,
        ease: 'power2.inOut',
      },
      0
    ); // Starts at 0 in the timeline

    // Animation 2: Fade out links in `nav-links-wrapper` with SplitType,
    // starts 0.15 seconds after the beginning of the `menuColumn` animation
    const splitInstance = new SplitType(navLinksWrapper, { types: 'words', tagName: 'span' });
    tl.fromTo(
      navLinksWrapper.querySelectorAll('.word'),
      { autoAlpha: 1, y: 0 }, // Initial state (visible)
      {
        autoAlpha: 0, // Target state (invisible)
        y: -30, // Move upward
        duration: 0.3, // Shorter duration
        ease: 'power2.in',
        stagger: { amount: 0.3 }, // Shorter delay between words
        onComplete: () => {
          splitInstance.revert(); // Removes spans after the animation
          gsap.set(navLinksWrapper, { display: 'none' }); // Hide links
        },
      },
      0.05 // Starts 0.15 seconds after `menuColumn`
    );

    // Animation 3: Make `home-text-wrapper` visible and animate text in
    // starts 0.1 seconds before the second animation ends
    tl.add(() => {
      const splitInstance = new SplitType(homeTextWrapper, { types: 'words', tagName: 'span' });
      gsap.set(homeTextWrapper, { display: 'block' }); // Make the text wrapper visible
      tl.fromTo(
        homeTextWrapper.querySelectorAll('.word'),
        { autoAlpha: 0, x: 30 }, // Initial state (invisible and slightly to the right)
        {
          autoAlpha: 1, // Target state (visible)
          x: 0, // Move to position
          duration: 0.6, // Shorter duration
          ease: 'power2.out',
          stagger: { amount: 0.3 }, // Shorter delay between words
          onComplete: () => splitInstance.revert(), // Removes spans after the animation
        }
      );
    }); // Starts 0.1 seconds before the second animation ends

    // Animation 4: Show `nav-button` with a smooth animation from below
    // tl.fromTo(
    //   navButton,
    //   { display: 'block', autoAlpha: 0, y: 20 }, // Initial state (hidden, 20px below)
    //   {
    //     autoAlpha: 1, // Fade in
    //     y: 0, // Move to original position
    //     duration: 0.3,
    //     ease: 'power2.out',
    //   }
    // );

    // Play the timeline
    tl.play();
  });
}
