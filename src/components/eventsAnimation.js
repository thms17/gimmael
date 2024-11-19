import { gsap } from '../index'

// Select elements by their attributes
const menuColumn = document.querySelector('[menu-column]')
const navLinksWrapper = document.querySelector('[nav-links-wrapper]')
const eventsTextWrapper = document.querySelector('[events-text-wrapper]')
const eventTitles = document.querySelectorAll('[event-titles]')
const noticeButton = document.querySelector('[notice-button]')
const navButton = document.querySelector('[nav-button]')

// Function to handle SplitType and animation
function animateSplitText(element, animationProps, onComplete = null) {
  const splitInstance = new SplitType(element, { types: 'words', tagName: 'span' })
  const words = element.querySelectorAll('.word')

  gsap.fromTo(words, animationProps.from, {
    ...animationProps.to,
    onComplete: () => {
      splitInstance.revert()
      if (onComplete) onComplete()
    }
  })
}

// Function to create the events opening timeline
function createEventsTimeline() {
  const tl = gsap.timeline()

  // Step 1: Animate `menu-column` to `width: 100%`
  tl.to(menuColumn, {
    width: '100%',
    duration: 0.8,
    ease: 'power2.inOut'
  })

  // Animation 2: Fade out links in `nav-links-wrapper`
  tl.add(() => {
    animateSplitText(
      navLinksWrapper,
      {
        from: { autoAlpha: 1, y: 0 },
        to: {
          autoAlpha: 0,
          y: -30,
          duration: 0.3,
          ease: 'power2.in',
          stagger: { amount: 0.3 }
        }
      },
      () => gsap.set(navLinksWrapper, { display: 'none' })
    )
  }, 0.05)
  // Step 3: Make `events-text-wrapper` visible
  tl.add(() => {
    gsap.set(eventsTextWrapper, { display: 'flex', autoAlpha: 1 }) // Ensure wrapper is visible
  })

  // Step 4: Animate each `event-titles` inside the wrapper
  tl.add(() => {
    gsap.to(eventTitles, {
      opacity: 1,
      x: 0, // Endposition (keine Verschiebung mehr)
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.1 // Stagger animations by 0.1 seconds
    })
  })

  // Step 5: Show `nav-button` with a smooth animation from below
  tl.add(() => {
    gsap.set(navButton, { display: 'block' }) // Ensure button is visible
  })
  tl.fromTo(
    navButton,
    {
      autoAlpha: 0,
      y: 20
    },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.3,
      ease: 'power2.out'
    }
  )

  return tl
}

// Function to create the events closing timeline
function createEventsClosingTimeline() {
  const tl = gsap.timeline()

  // Step 1: Animate each `event-titles` out
  tl.add(() => {
    gsap.to(eventTitles, {
      opacity: 0,
      x: 30, // Zurück nach rechts
      duration: 0.6,
      ease: 'power2.in',
      stagger: 0.1 // Stagger animations by 0.1 seconds
    })
  })

  // Step 2: Hide `events-text-wrapper`
  tl.add(() => {
    gsap.set(eventsTextWrapper, { autoAlpha: 0, display: 'none' }) // Hide the wrapper
  })

  // Step 3: Hide `nav-button`
  tl.to(navButton, {
    autoAlpha: 0,
    y: 20, // Move back down
    duration: 0.3,
    ease: 'power2.inOut',
    onComplete: () => gsap.set(navButton, { display: 'none' })
  })

  // Step 4: Shrink `menu-column` back to its original size
  tl.to(menuColumn, {
    width: 'auto',
    duration: 0.8,
    ease: 'power2.inOut',
    onStart: () => gsap.set(menuColumn, { overflow: 'hidden' }),
    onComplete: () => gsap.set(menuColumn, { width: 'auto', overflow: '' })
  })

  // Step 5: Fade in links in `nav-links-wrapper`
  tl.add(() => {
    gsap.set(navLinksWrapper, { display: 'flex' }) // Ensure links are visible
    gsap.to(navLinksWrapper, {
      autoAlpha: 1,
      y: 0,
      duration: 0.3,
      ease: 'power2.out',
      stagger: { amount: 0.3 }
    })
  })

  return tl
}

// Button click event listeners
if (
  menuColumn &&
  navLinksWrapper &&
  eventsTextWrapper &&
  eventTitles &&
  noticeButton &&
  navButton
) {
  // Open animation
  noticeButton.addEventListener('click', () => {
    const eventsTl = createEventsTimeline()
    eventsTl.play()
  })

  // Close animation
  navButton.addEventListener('click', () => {
    const eventsClosingTl = createEventsClosingTimeline()
    eventsClosingTl.play()
  })
}
