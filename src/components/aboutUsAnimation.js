import { gsap } from 'gsap'
import {
  navButton, // Ensure navButton is imported or correctly defined
  animateMenuColumn,
  animateNavButton,
  animateNavLinks,
  animateSplitText
} from '../utils/animationUtils'

const homeTextWrapper = document.querySelector('[home-text-wrapper]')
const aboutUsButton = document.querySelector('[about-us-button]')

function createForwardTimeline() {
  const tl = gsap.timeline()

  // Animation 1: Expand the menu column
  tl.add(animateMenuColumn(true))

  // Animation 2: Fade out nav links
  tl.add(() => animateNavLinks(false), 0.05)

  // Animation 3: Make home text wrapper visible and animate text
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

  // Animation 4: Show nav button
  tl.add(() => animateNavButton(true))

  return tl
}

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
          duration: 0.3, // Kürzere Dauer für schnelleres Ausblenden
          ease: 'power2.in',
          stagger: { amount: 0.2 } // Gleicher Stagger wie beim vorherigen Code
        }
      },
      () => {
        gsap.set(homeTextWrapper, { display: 'none' }) // Sicherstellen, dass es unsichtbar wird
      }
    )
  })

  // Step 2: Hide nav button
  reverseTl.add(() => animateNavButton(false))

  // Step 3: Shrink menu column back to its initial size
  reverseTl.add(() => animateMenuColumn(false), '+=0.2') // Verzögerung, um sicherzustellen, dass vorherige Schritte abgeschlossen sind

  // Step 4: Fade in nav links
  reverseTl.add(() => animateNavLinks(true), '+=0.3')

  return reverseTl
}

// Button click event listeners
aboutUsButton.addEventListener('click', () => {
  createForwardTimeline().play()
})

if (navButton) {
  navButton.addEventListener('click', () => {
    createReverseTimeline().play()
  })
}
