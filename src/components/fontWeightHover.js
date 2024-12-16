import { gsap, SplitText } from '../index'

gsap.registerPlugin(SplitText)

// Funktion zur Initialisierung der Animation
function setupFontWeightHoverAnimation() {
  const fontWeightItems = document.querySelectorAll('[data-animate="font-weight"]')

  // Abbruch, wenn keine Elemente vorhanden sind
  if (!fontWeightItems.length) return

  const MAX_DISTANCE = 100 // Maximale Distanz für Font-Weight-Änderung
  const MAX_FONT_WEIGHT = 800 // Maximales Font-Weight
  const MIN_FONT_WEIGHT = 400 // Minimales Font-Weight

  // GSAP SplitText für Zeichenaufteilung
  fontWeightItems.forEach((item) => {
    const split = new SplitText(item, { type: 'chars' }) // Text in Zeichen splitten
    const chars = split.chars // Zugriff auf die einzelnen Zeichen

    // Event-Listener nur für Hover
    item.addEventListener('mouseenter', () => {
      // Mausbewegung innerhalb des Elements verfolgen
      const mouseMoveHandler = (event) => {
        const mouseX = event.pageX
        const mouseY = event.pageY

        chars.forEach((char) => {
          const charRect = char.getBoundingClientRect()
          const charCenterX = charRect.left + charRect.width / 2 + window.scrollX
          const charCenterY = charRect.top + charRect.height / 2 + window.scrollY

          const distance = Math.sqrt(
            Math.pow(mouseX - charCenterX, 2) + Math.pow(mouseY - charCenterY, 2)
          )

          // Berechnung des Font-Weights basierend auf der Distanz
          const fontWeight =
            distance < MAX_DISTANCE
              ? gsap.utils.mapRange(0, MAX_DISTANCE, MAX_FONT_WEIGHT, MIN_FONT_WEIGHT, distance)
              : MIN_FONT_WEIGHT

          // Animation des Font-Weights
          gsap.to(char, {
            fontVariationSettings: `'wght' ${fontWeight}`,
            duration: 0.3,
            overwrite: true
          })
        })
      }

      item.addEventListener('mousemove', mouseMoveHandler)

      // Maus verlässt das Element - Animation stoppen
      item.addEventListener('mouseleave', () => {
        item.removeEventListener('mousemove', mouseMoveHandler)

        // Zurücksetzen der Font-Weights
        chars.forEach((char) => {
          gsap.to(char, {
            fontVariationSettings: `'wght' ${MIN_FONT_WEIGHT}`,
            duration: 0.2,
            overwrite: true
          })
        })
      })
    })
  })
}

// GSAP matchMedia für Media Query Handling
const mm = gsap.matchMedia()

// Media Query für Bildschirmbreiten ab 992px
mm.add('(min-width: 992px)', setupFontWeightHoverAnimation)
