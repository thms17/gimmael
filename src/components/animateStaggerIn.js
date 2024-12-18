import { gsap } from '../index'

// Alle Elemente mit dem Attribut `animate-stagger-in` auswählen
const elements = document.querySelectorAll('[animate-stagger-in]')

// Überprüfen, ob die Elemente vorhanden sind
if (elements.length > 0) {
  // GSAP-Animation mit Stagger
  gsap.from(elements, {
    y: 40,
    autoAlpha: 0,
    duration: 0.45,
    ease: 'power1.out',
    stagger: 0.1 // Zeitverzögerung zwischen den Animationen
  })
}
