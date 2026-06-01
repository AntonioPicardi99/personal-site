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

  const form = document.getElementById('contactForm')
  const success = document.getElementById('contactSuccess')

  if (form && success) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault()
      const data = new FormData(form)
      try {
        await fetch('/', { method: 'POST', body: data })
        form.classList.add('d-none')
        success.classList.remove('d-none')
      } catch {
        // fallback: invio tradizionale
        form.submit()
      }
    })
  }
})
