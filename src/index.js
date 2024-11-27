import { gsap } from 'gsap'
import GSDevTools from 'gsap/GSDevTools'

import './components/galleryLighthouseAnimation'
import './components/aboutUsAnimation'
import './components/eventsAnimation'
gsap.registerPlugin(GSDevTools)
export { gsap, GSDevTools }
