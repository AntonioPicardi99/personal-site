import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import './css/style.css'

import {
  initScrollAnimations,
  initNavbarScroll,
  initActiveNavLinks,
  initNavbarCollapse,
} from './js/animations.js'

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations()
  initNavbarScroll()
  initActiveNavLinks()
  initNavbarCollapse()

  document.getElementById('footer-year').textContent = new Date().getFullYear()
})
