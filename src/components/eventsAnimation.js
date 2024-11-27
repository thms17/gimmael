import { gsap, SplitText } from '../index'

// Selektoren für gemeinsame Elemente
const menuColumn = document.querySelector('[menu-column]')
const navLinks = document.querySelectorAll('[nav-links-wrapper] > *')
const navButton = document.querySelector('[nav-button]')
const homeTextWrapper = document.querySelector('[home-text-wrapper]')
const aboutUsButton = document.querySelector('[about-us-button]')
const eventsTextWrapper = document.querySelector('[events-text-wrapper]')
const eventTitles = document.querySelectorAll('[event-titles]')
const eventsButton = document.querySelector('[events-button]') // Button für Events

const initialMenuColumnWidth = `${menuColumn.offsetWidth}px`

// Helper-Funktion für SplitText-Animationen
function animateSplitText(element, animationProps, onComplete = null) {
  // Text mit GSAP SplitText aufteilen
  const split = new SplitText(element, { type: 'words' })

  gsap.fromTo(split.words, animationProps.from, {
    ...animationProps.to,
    onComplete: () => {
      split.revert() // Split rückgängig machen
      if (onComplete) onComplete()
    }
  })
}

// Animation für das Öffnen von About Us
function createAboutUsTimeline() {
  const tl = gsap.timeline()

  // 1. Menu Column expandieren
  tl.to(menuColumn, {
    width: '100%',
    duration: 0.8,
    ease: 'power2.inOut'
  })

  // 2. Navigation Links (einzeln) ausblenden mit Stagger
  tl.to(
    navLinks,
    {
      autoAlpha: 0,
      y: -30,
      duration: 0.3,
      ease: 'power2.in',
      stagger: { amount: 0.3 }, // Verteilung der Animation auf die Links
      onComplete: () => gsap.set(navLinks, { display: 'none' }) // Versteckt die Links nach der Animation
    },
    '-=0.8'
  )

  // 3. Home Text Wrapper sichtbar machen und animieren
  tl.set(homeTextWrapper, { display: 'block' })

  tl.add(() =>
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
  )

  // 4. Navigation Button einblenden
  tl.set(navButton, { y: 20 }) // Initial oben positioniert

  tl.to(
    navButton,
    {
      autoAlpha: 1, // Sichtbarkeit einblenden
      y: 0, // Button nach unten bewegen
      duration: 0.3,
      ease: 'power2.out',
      onStart: () => {
        gsap.set(navButton, { display: 'block' }) // Button sichtbar machen
      }
    },
    '<'
  )

  return tl
}

// Animation für das Schließen
function createCloseTimeline() {
  const tl = gsap.timeline()

  // Step 1: Fade out the home-text-wrapper
  tl.add(() => {
    animateSplitText(
      homeTextWrapper,
      {
        from: { autoAlpha: 1, x: 0 },
        to: {
          autoAlpha: 0,
          x: 30,
          duration: 0.3,
          ease: 'power2.in',
          stagger: { amount: 0.2 }
        }
      },
      () => {
        gsap.set(homeTextWrapper, { display: 'none' }) // Sicherstellen, dass es unsichtbar wird
      }
    )
  })

  // 2. Navigation Button ausblenden
  tl.to(navButton, {
    autoAlpha: 0,
    y: 20,
    duration: 0.3,
    ease: 'power2.in',
    onComplete: () => gsap.set(navButton, { display: 'none' })
  })

  // 3. Menu Column zurück auf die ursprüngliche Breite
  tl.to(menuColumn, {
    width: initialMenuColumnWidth, // Ursprüngliche Breite anpassen
    duration: 0.8,
    ease: 'power2.inOut'
  })

  // 4. Navigation Links (einzeln) wieder einblenden mit Stagger
  tl.to(
    navLinks,
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.3,
      ease: 'power2.out',
      stagger: { amount: 0.3 }, // Stagger für Links
      onStart: () => gsap.set(navLinks, { display: 'block' })
    },
    '-=0.3'
  )

  return tl
}

// Animation für das Öffnen der Events
function createEventsTimeline() {
  const tl = gsap.timeline()

  // 1. Menu Column expandieren
  tl.to(menuColumn, {
    width: '100%',
    duration: 0.8,
    ease: 'power2.inOut'
  })

  // 2. Navigation Links (einzeln) ausblenden mit Stagger
  tl.to(
    navLinks,
    {
      autoAlpha: 0,
      y: -30,
      duration: 0.3,
      ease: 'power2.in',
      stagger: { amount: 0.3 }, // Verteilung der Animation auf die Links
      onComplete: () => gsap.set(navLinks, { display: 'none' }) // Versteckt die Links nach der Animation
    },
    '<' // Parallel zur vorherigen Animation
  )

  // 3. Events Text Wrapper sichtbar machen
  tl.set(eventsTextWrapper, { display: 'flex', autoAlpha: 1 })

  // 4. Event Titel einzeln einblenden mit Stagger
  tl.to(eventTitles, {
    autoAlpha: 1,
    x: 0,
    duration: 0.4,
    ease: 'power2.out',
    stagger: 0.06
  })

  // 4. Navigation Button einblenden
  tl.to(
    navButton,
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.3,
      ease: 'power2.out',
      onStart: () => gsap.set(navButton, { display: 'block' })
    },
    '<'
  )

  return tl
}

// Animation für das Schließen der Events
function createCloseEventsTimeline() {
  const tl = gsap.timeline()

  // 1. Event Titel einzeln ausblenden mit Stagger
  tl.to(eventTitles, {
    autoAlpha: 0,
    x: 30,
    duration: 0.2,
    ease: 'power2.in',
    stagger: 0.05, // Stagger für das Ausblenden der Titel
    onComplete: () => gsap.set(eventsTextWrapper, { display: 'none' })
  })

  // 2. Navigation Button ausblenden
  tl.to(
    navButton,
    {
      autoAlpha: 0,
      y: 20,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => gsap.set(navButton, { display: 'none' })
    },
    '<'
  )

  // 3. Menu Column zurück auf die ursprüngliche Breite
  tl.to(
    menuColumn,
    {
      width: initialMenuColumnWidth,
      duration: 0.8,
      ease: 'power2.inOut'
    },
    '-=0.4'
  )

  // 4. Navigation Links (einzeln) wieder einblenden mit Stagger
  tl.to(
    navLinks,
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.3,
      ease: 'power2.out',
      stagger: { amount: 0.3 }, // Stagger für das Einblenden der Links
      onStart: () => gsap.set(navLinks, { display: 'block' })
    },
    '-=0.3'
  )

  return tl
}

// Event Listener für About Us Button
aboutUsButton.addEventListener('click', () => {
  const aboutUsTimeline = createAboutUsTimeline()
  aboutUsTimeline.play()
  navButton.setAttribute('data-close', 'about-us') // Attribut für Schließen setzen
})

// Event Listener für Events Button
eventsButton.addEventListener('click', () => {
  const eventsTimeline = createEventsTimeline()
  eventsTimeline.play()
  navButton.setAttribute('data-close', 'events') // Attribut für Schließen setzen
})

// Event Listener für Schließen über den Nav-Button
navButton.addEventListener('click', () => {
  const closeType = navButton.getAttribute('data-close') // Aktuelles Attribut abfragen

  if (closeType === 'about-us') {
    const closeTimeline = createCloseTimeline()
    closeTimeline.play()
  } else if (closeType === 'events') {
    const closeEventsTimeline = createCloseEventsTimeline()
    closeEventsTimeline.play()
  }

  // Attribut zurücksetzen, damit keine Schließ-Animation mehr unabsichtlich ausgeführt wird
  navButton.removeAttribute('data-close')
})
