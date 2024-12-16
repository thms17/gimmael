import { gsap, SplitText } from '../index'

// Hauptfunktion, die die gesamte Logik enthält
function initAnimations() {
  // Selektoren für gemeinsame Elemente
  const menuColumn = document.querySelector('[menu-column]')
  const navLinks = document.querySelectorAll('[nav-links-wrapper] > *')
  const navButton = document.querySelector('[nav-button]')
  const homeTextWrapper = document.querySelector('[home-text-wrapper]')
  const aboutUsButton = document.querySelector('[about-us-button]')
  const eventsTextWrapper = document.querySelector('[events-text-wrapper]')
  const eventTitles = document.querySelectorAll('[event-titles]')
  const eventsButton = document.querySelector('[events-button]') // Button für Events

  // Überprüfen, ob alle benötigten Elemente vorhanden sind
  if (
    !menuColumn ||
    navLinks.length === 0 ||
    !navButton ||
    !homeTextWrapper ||
    !aboutUsButton ||
    !eventsTextWrapper ||
    eventTitles.length === 0 ||
    !eventsButton
  ) {
    return
  }

  const initialMenuColumnWidth = `${menuColumn.offsetWidth}px`

  // Helper-Funktion für SplitText-Animationen
  function animateSplitText(element, animationProps, onComplete = null) {
    const split = new SplitText(element, { type: 'words' })

    gsap.fromTo(split.words, animationProps.from, {
      ...animationProps.to,
      onComplete: () => {
        split.revert()
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

    // 2. Navigation Links ausblenden
    tl.to(
      navLinks,
      {
        autoAlpha: 0,
        y: -30,
        duration: 0.3,
        ease: 'power2.in',
        stagger: { amount: 0.3 },
        onComplete: () => gsap.set(navLinks, { display: 'none' })
      },
      '-=0.8'
    )

    // 3. Home Text Wrapper sichtbar machen
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
    tl.set(navButton, { y: 20 })

    tl.to(
      navButton,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
        onStart: () => {
          gsap.set(navButton, { display: 'block' })
        }
      },
      '<'
    )

    return tl
  }

  // Animation für das Schließen von About Us
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
          gsap.set(homeTextWrapper, { display: 'none' })
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
      width: initialMenuColumnWidth,
      duration: 0.8,
      ease: 'power2.inOut'
    })

    // 4. Navigation Links wieder einblenden
    tl.to(
      navLinks,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
        stagger: { amount: 0.3 },
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

    // 2. Navigation Links ausblenden
    tl.to(
      navLinks,
      {
        autoAlpha: 0,
        y: -30,
        duration: 0.3,
        ease: 'power2.in',
        stagger: { amount: 0.3 },
        onComplete: () => gsap.set(navLinks, { display: 'none' })
      },
      '<'
    )

    // 3. Events Text Wrapper sichtbar machen
    tl.set(eventsTextWrapper, { display: 'flex', autoAlpha: 1 })

    // 4. Event Titel einzeln einblenden
    tl.to(eventTitles, {
      autoAlpha: 1,
      x: 0,
      duration: 0.4,
      ease: 'power2.out',
      stagger: 0.06
    })

    // 5. Navigation Button einblenden
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

    // 1. Event Titel einzeln ausblenden
    tl.to(eventTitles, {
      autoAlpha: 0,
      x: 30,
      duration: 0.2,
      ease: 'power2.in',
      stagger: 0.05,
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

    // 4. Navigation Links wieder einblenden
    tl.to(
      navLinks,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
        stagger: { amount: 0.3 },
        onStart: () => gsap.set(navLinks, { display: 'block' })
      },
      '-=0.3'
    )

    return tl
  }
  let isAboutUsPlaying = false

  // Event Listener für About Us Button
  aboutUsButton.addEventListener('click', () => {
    if (isAboutUsPlaying) return // verhindert mehrfaches Abspielen

    isAboutUsPlaying = true // Setzt Zustand auf spielend

    const aboutUsTimeline = createAboutUsTimeline()

    // Attribut erst nach Abschluss der Timeline setzen
    aboutUsTimeline.eventCallback('onComplete', () => {
      navButton.setAttribute('data-close', 'about-us')
      isAboutUsPlaying = false
    })

    aboutUsTimeline.play()
  })
  // Event Listener für Events Button
  eventsButton.addEventListener('click', () => {
    const eventsTimeline = createEventsTimeline()
    eventsTimeline.play()
    navButton.setAttribute('data-close', 'events')
  })

  // Event Listener für Schließen
  navButton.addEventListener('click', () => {
    const closeType = navButton.getAttribute('data-close')

    if (closeType === 'about-us') {
      const closeTimeline = createCloseTimeline()
      closeTimeline.play()
    } else if (closeType === 'events') {
      const closeEventsTimeline = createCloseEventsTimeline()
      closeEventsTimeline.play()
    }

    navButton.removeAttribute('data-close')
  })
}

// Initialisierung der Animationen
initAnimations()
