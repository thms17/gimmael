import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { GSDevTools } from 'gsap/GSDevTools'

import './components/galleryLighthouseAnimation'
import './components/eventsAnimation'

// GSAP Plugins registrieren
gsap.registerPlugin(SplitText, GSDevTools)

export { gsap, GSDevTools, SplitText }
