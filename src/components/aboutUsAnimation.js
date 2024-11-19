import { gsap } from '../index'

// Select elements by their attributes
const menuColumn = document.querySelector('[menu-column]')
const navLinksWrapper = document.querySelector('[nav-links-wrapper]')
const homeTextWrapper = document.querySelector('[home-text-wrapper]')
const aboutUsButton = document.querySelector('[about-us-button]')
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

// Store the initial width of the menuColumn before any animation runs
const initialMenuColumnWidth = menuColumn.offsetWidth + 'px'
console.log(initialMenuColumnWidth)

// Function to create the forward timeline
function createForwardTimeline() {
  const tl = gsap.timeline()

  // Animation 1: Animate `menu-column` to `width: 100%`
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

  // Animation 3: Make `home-text-wrapper` visible and animate text in
  tl.add(() => {
    gsap.set(homeTextWrapper, { display: 'block' })
    animateSplitText(homeTextWrapper, {
      from: { autoAlpha: 0, x: 30 },
      to: {
        autoAlpha: 1,
        x: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: { amount: 0.3 }
      }
    })
  })

  // Animation 4: Show `nav-button` with a smooth animation from below
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

// Function to create the reverse timeline
function createReverseTimeline() {
  const reverseTl = gsap.timeline()

  // Step 1: Fade out the home-text-wrapper
  reverseTl.add(() => {
    animateSplitText(
      homeTextWrapper,
      {
        from: { autoAlpha: 1, x: 0 },
        to: {
          autoAlpha: 0,
          x: 30,
          duration: 0.4,
          ease: 'power2.in',
          stagger: { amount: 0.2 }
        }
      },
      () => gsap.set(homeTextWrapper, { display: 'none' })
    )
  })

  // Step 2: Hide the nav-button
  reverseTl.to(navButton, {
    autoAlpha: 0,
    y: 20,
    duration: 0.3,
    ease: 'power2.inOut',
    onComplete: () => {
      gsap.set(navButton, { display: 'none' }) // Hide button after animation
    }
  })

  // Step 3: Shrink menu-column back to its initial size
  reverseTl.to(menuColumn, {
    width: initialMenuColumnWidth,
    duration: 0.8,
    ease: 'power2.inOut',
    onStart: () => gsap.set(menuColumn, { overflow: 'hidden' }),
    onComplete: () => {
      gsap.set(menuColumn, { width: 'auto', overflow: '' })
    }
  })

  // Step 4: Fade in nav-links-wrapper
  reverseTl.add(() => {
    gsap.set(navLinksWrapper, { display: 'flex' })
    animateSplitText(navLinksWrapper, {
      from: { autoAlpha: 0, y: -30 },
      to: {
        autoAlpha: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
        stagger: { amount: 0.3 }
      }
    })
  })

  return reverseTl
}

// Button click event listener for About Us button
aboutUsButton.addEventListener('click', () => {
  const tl = createForwardTimeline()
  tl.play()
})

// Button click event listener for Nav Button
navButton.addEventListener('click', () => {
  const reverseTl = createReverseTimeline()
  reverseTl.play()
})
