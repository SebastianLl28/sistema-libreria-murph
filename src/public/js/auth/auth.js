const logo = document.querySelector('#logo')

if (logo) {
  logo.addEventListener('mouseover', () => {
    logo.src = '/img/auth/logo-gif.gif'
    logo.classList.add('picture__img-active')
  })

  logo.addEventListener('mouseout', () => {
    logo.src = '/img/auth/logo.png'
    logo.classList.remove('picture__img-active')
  })
}

window.addEventListener('load', () => {
  const errors = document.querySelectorAll('.errors__message')

  if (errors.length === 0) {
    return
  }

  errors.forEach(error => {
    const input = document.querySelector(`input#${error.getAttribute('data-parent')}`)

    input.classList.add('form__input--error')
  })

  const errorsContainer = document.querySelector('.errors')
  setTimeout(() => {
    errorsContainer.remove()
  }, 3500)
})
