import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { GSDevTools } from 'gsap/GSDevTools'

import './styles/swiper.css'
import './styles/contactForm.css'
import './styles/button.css'

import './components/swiper-init'
import './components/fontWeightHover'
import './components/galleryLighthouseAnimation'
import './components/eventsAnimation'

// GSAP Plugins registrieren
gsap.registerPlugin(SplitText, GSDevTools)

export { gsap, GSDevTools, SplitText }
