const mySwiper = new Swiper('.swiper', {
  slidesPerView: 3, // Standard-Anzahl der Slides pro Zeile
  grid: {
    rows: 2, // Maximal 2 Reihen
    fill: 'row' // Reihenweise auffüllen
  },
  spaceBetween: 16, // Standard-Abstand zwischen Slides
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  breakpoints: {
    1200: {
      slidesPerView: 3 // 3 Slides pro Zeile ab 1200px
    },
    768: {
      slidesPerView: 2, // 2 Slides pro Zeile ab 768px
      spaceBetween: 16
    },
    0: {
      slidesPerView: 2, // 1 Slide pro Zeile ab 480px
      spaceBetween: 12
    }
  }
})
