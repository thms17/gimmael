import { gsap } from '../index'

// Alle Elemente mit dem Attribut `animate-stagger-in` auswählen
const elements = document.querySelectorAll('[animate-stagger-in]')

// Überprüfen, ob die Elemente vorhanden sind
if (elements.length > 0) {
  // GSAP-Animation mit Stagger
  gsap.from(elements, {
    y: 20,
    autoAlpha: 0,
    duration: 0.35,
    ease: 'power3.out',
    stagger: 0.07 // Zeitverzögerung zwischen den Animationen
  })
}
