import { gsap } from '../index'

// Überprüfe, ob alle erforderlichen Elemente vorhanden sind
const collectionItems = document.querySelectorAll('[collection-list-image]')
const lightboxOverlay = document.querySelector('[lighthouse-overlay]')
const lightboxImage = lightboxOverlay?.querySelector('[lighthouse-image]')
const titleElement = lightboxOverlay?.querySelector('[lighthouse-title]')
const yearElement = lightboxOverlay?.querySelector('[lighthouse-year]')
const materialsElement = lightboxOverlay?.querySelector('[lighthouse-materials]')
const dimensionsElement = lightboxOverlay?.querySelector('[lighthouse-dimensions]')
const lightboxInner = lightboxOverlay?.querySelector('[lightbox-inner]')

// Funktion zum Schließen des Overlays
function closeLightbox() {
  gsap.to(lightboxOverlay, {
    opacity: 0,
    duration: 0.5,
    ease: 'power2.in',
    onComplete: () => {
      lightboxOverlay.style.display = 'none'
    }
  })
}

if (
  collectionItems.length > 0 &&
  lightboxOverlay &&
  lightboxImage &&
  titleElement &&
  yearElement &&
  materialsElement &&
  dimensionsElement &&
  lightboxInner
) {
  // Wenn alle Elemente vorhanden sind, setze die Event Listener
  collectionItems.forEach((item) => {
    item.addEventListener('click', function () {
      // Selektiere das Bild und die Daten des CMS-Elements
      const imgElement = this.querySelector('img') // Bild des CMS-Elements

      // Setze das Bild und die Informationen im Overlay
      if (imgElement) lightboxImage.src = imgElement.src // Dynamisches Bild im Overlay setzen
      titleElement.textContent = this.getAttribute('lighthouse-title')
      yearElement.textContent = this.getAttribute('lighthouse-year')
      materialsElement.textContent = this.getAttribute('lighthouse-materials')
      dimensionsElement.textContent = this.getAttribute('lighthouse-dimensions')

      // Blende das Overlay ein (mit display: block)
      gsap.to(lightboxOverlay, {
        display: 'block',
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
      })
    })
  })

  // Schließe das Overlay, wenn außerhalb von lightbox-inner geklickt wird
  lightboxOverlay.addEventListener('click', function (event) {
    if (!lightboxInner.contains(event.target)) {
      closeLightbox()
    }
  })

  // Schließe das Overlay per ESC-Taste
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeLightbox()
    }
  })
}
