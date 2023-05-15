const iconMenu = document.querySelector('.aside__menu-container')
iconMenu.addEventListener('click', (e) => {
  e.target.parentElement.parentElement.classList.toggle('aside-active')
})

// alert('gaaaa')

const logout = document.querySelector('form.form__logout')

logout.addEventListener('click', (e) => {
  logout.submit()
})
