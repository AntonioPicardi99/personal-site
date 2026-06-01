export function initScrollAnimations() {
  const els = document.querySelectorAll('.fade-in')
  if (!els.length) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12 }
  )

  els.forEach((el) => observer.observe(el))
}

export function initNavbarScroll() {
  const nav = document.getElementById('mainNav')
  if (!nav) return

  const onScroll = () => {
    if (window.scrollY > 40) {
      nav.style.background = 'rgba(15, 23, 42, 0.97)'
    } else {
      nav.style.background = 'rgba(15, 23, 42, 0.85)'
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true })
}

export function initActiveNavLinks() {
  const links = document.querySelectorAll('#mainNav .nav-link')
  const sections = document.querySelectorAll('section[id]')
  if (!sections.length) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((link) => {
            link.classList.remove('active')
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.classList.add('active')
            }
          })
        }
      })
    },
    { rootMargin: '-40% 0px -55% 0px' }
  )

  sections.forEach((s) => observer.observe(s))
}

export function initNavbarCollapse() {
  const toggler = document.querySelector('.navbar-toggler')
  const links = document.querySelectorAll('#navbarNav .nav-link')
  const collapse = document.getElementById('navbarNav')
  if (!toggler || !collapse) return

  links.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992 && collapse.classList.contains('show')) {
        toggler.click()
      }
    })
  })
}
