// Carosello dei progetti su mobile: i pallini seguono lo scroll e portano alla scheda
export function initCaseCarousel() {
  const list = document.getElementById('caseList')
  const dotsBox = document.getElementById('caseDots')
  if (!list || !dotsBox) return

  const cards = [...list.children]
  const dots = [...dotsBox.querySelectorAll('.case-dot')]
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

  const offsetOf = (i) => cards[i].offsetLeft - cards[0].offsetLeft

  const setActive = (index) => {
    dots.forEach((dot, i) => dot.setAttribute('aria-current', i === index ? 'true' : 'false'))
  }

  const onScroll = () => {
    const max = list.scrollWidth - list.clientWidth
    // L'ultima scheda non arriva mai al bordo sinistro: a fine corsa è lei la attiva
    if (list.scrollLeft >= max - 2) return setActive(cards.length - 1)

    const step = offsetOf(1) || 1
    setActive(Math.round(list.scrollLeft / step))
  }

  list.addEventListener('scroll', onScroll, { passive: true })

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      list.scrollTo({ left: offsetOf(i), behavior: reduceMotion.matches ? 'auto' : 'smooth' })
    })
  })
}
