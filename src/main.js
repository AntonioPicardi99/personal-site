import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import './css/style.css'

import {
  initScrollAnimations,
  initNavbarScroll,
  initActiveNavLinks,
  initNavbarCollapse,
} from './js/animations.js'
import { initHeroMockup } from './js/mockup.js'
import { initCaseCarousel } from './js/carousel.js'

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations()
  initNavbarScroll()
  initActiveNavLinks()
  initNavbarCollapse()
  initHeroMockup()
  initCaseCarousel()

  document.getElementById('footer-year').textContent = new Date().getFullYear()

  const form = document.getElementById('contactForm')
  const success = document.getElementById('contactSuccess')
  const submit = document.getElementById('contactSubmit')

  if (form && success) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault()
      // Niente doppi invii mentre la richiesta è in corso
      if (submit) {
        submit.disabled = true
        submit.textContent = 'Invio in corso…'
      }
      form.setAttribute('aria-busy', 'true')

      const data = new FormData(form)
      const encoded = new URLSearchParams(data).toString()
      try {
        const res = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: encoded,
        })
        if (res.ok) {
          form.classList.add('d-none')
          success.classList.remove('d-none')
          // Il pulsante premuto è sparito: il focus va sul messaggio, che viene letto
          success.querySelector('.contact-success-title')?.focus()
        } else {
          form.submit()
        }
      } catch {
        form.submit()
      }
    })
  }
})
