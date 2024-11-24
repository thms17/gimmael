import { gsap } from 'gsap'

// Gemeinsame Elemente
export const menuColumn = document.querySelector('[menu-column]')
export const navLinksWrapper = document.querySelector('[nav-links-wrapper]')
export const navButton = document.querySelector('[nav-button]')

// SplitType Helper
export function animateSplitText(element, animationProps, onComplete = null) {
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

// Breite für `menuColumn` initialisieren
export const initialMenuColumnWidth = `${menuColumn.offsetWidth}px`

// Gemeinsame Animation für `menuColumn`
export function animateMenuColumn(expand = true) {
  return gsap.to(menuColumn, {
    width: expand ? '100%' : initialMenuColumnWidth,
    duration: 0.8,
    ease: 'power2.inOut',
    onStart: () => {
      if (!expand) gsap.set(menuColumn, { overflow: 'hidden' })
    },
    onComplete: () => {
      if (!expand) gsap.set(menuColumn, { width: 'auto', overflow: '' })
    }
  })
}

// Gemeinsame Animation für `navButton`
export function animateNavButton(show = true) {
  return gsap.to(navButton, {
    autoAlpha: show ? 1 : 0,
    y: show ? 0 : 20,
    duration: 0.3,
    ease: 'power2.out',
    onStart: () => {
      if (show) gsap.set(navButton, { display: 'block' })
    },
    onComplete: () => {
      if (!show) gsap.set(navButton, { display: 'none' })
    }
  })
}

export function animateNavLinks(show = true) {
  if (show) {
    // Fade in animation
    return animateSplitText(
      navLinksWrapper,
      {
        from: { autoAlpha: 0, y: -30 },
        to: {
          autoAlpha: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
          stagger: { amount: 0.3 }
        }
      },
      () => gsap.set(navLinksWrapper, { display: 'flex' })
    )
  } else {
    // Fade out animation
    return animateSplitText(
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
  }
}
