import { gsap } from 'gsap'
import {
  menuColumn,
  animateMenuColumn,
  animateNavButton,
  animateNavLinks
} from '../utils/animationUtils'

const eventsTextWrapper = document.querySelector('[events-text-wrapper]')
const eventTitles = document.querySelectorAll('[event-titles]')
const noticeButton = document.querySelector('[notice-button]')

// Forward Animation
function createEventsTimeline() {
  const tl = gsap.timeline()
  tl.add(animateMenuColumn(true))
    .add(() => animateNavLinks(false), 0.05)
    .add(() => gsap.set(eventsTextWrapper, { display: 'flex', autoAlpha: 1 }))
    .add(() =>
      gsap.to(eventTitles, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.1
      })
    )
    .add(() => animateNavButton(true))
  return tl
}

// Reverse Animation
function createEventsClosingTimeline() {
  const tl = gsap.timeline()
  tl.add(() =>
    gsap.to(eventTitles, {
      opacity: 0,
      x: 30,
      duration: 0.6,
      ease: 'power2.in',
      stagger: 0.1
    })
  )
    .add(() => gsap.set(eventsTextWrapper, { autoAlpha: 0, display: 'none' }))
    .add(animateNavButton(false))
    .add(animateMenuColumn(false))
    .add(() => animateNavLinks(true))
  return tl
}

noticeButton.addEventListener('click', () => createEventsTimeline().play())
navButton.addEventListener('click', () => createEventsClosingTimeline().play())
