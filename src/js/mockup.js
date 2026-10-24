const STEP_DELAY = 450

// Mockup della hero: "Conferma" spunta una alla volta le operazioni automatiche
export function initHeroMockup() {
  const mockup = document.getElementById('heroMockup')
  const confirm = document.getElementById('mockupConfirm')
  const reset = document.getElementById('mockupReset')
  const status = document.getElementById('mockupStatus')
  const caption = document.getElementById('mockupCaption')
  if (!mockup || !confirm || !reset) return

  const rows = mockup.querySelectorAll('.mockup-auto .mockup-row')
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  let timers = []

  const clearTimers = () => {
    timers.forEach(clearTimeout)
    timers = []
  }

  confirm.addEventListener('click', () => {
    mockup.classList.add('is-done')
    caption?.classList.add('is-done')
    reset.focus({ preventScroll: true })

    // Su mobile le spunte sono sotto la piega: porta in vista il blocco intero
    const auto = mockup.querySelector('.mockup-auto')
    if (auto && auto.getBoundingClientRect().bottom > window.innerHeight) {
      auto.scrollIntoView({ block: 'end', behavior: reduceMotion.matches ? 'auto' : 'smooth' })
    }

    const delay = reduceMotion.matches ? 0 : STEP_DELAY
    rows.forEach((row, i) => {
      timers.push(setTimeout(() => row.classList.add('is-checked'), delay * (i + 1)))
    })

    const labels = [...rows].map((row) => {
      const text = row.textContent.trim()
      return /^[A-Z]{2}/.test(text) ? text : text[0].toLowerCase() + text.slice(1)
    })
    status.textContent = `Prenotazione confermata. Fatto in automatico: ${labels.join(', ')}.`
  })

  reset.addEventListener('click', () => {
    clearTimers()
    mockup.classList.remove('is-done')
    caption?.classList.remove('is-done')
    rows.forEach((row) => row.classList.remove('is-checked'))
    status.textContent = ''
    confirm.focus()
  })
}
