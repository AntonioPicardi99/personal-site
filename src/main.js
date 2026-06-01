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
        } else {
          form.submit()
        }
      } catch {
        form.submit()
      }
    })
  }
})
