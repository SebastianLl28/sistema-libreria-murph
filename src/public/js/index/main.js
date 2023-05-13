const header = document.querySelector('.header')

window.addEventListener('scroll', () => {
  // console.log(window.scrollY)
  if (window.scrollY === 0) {
    header.classList = 'header'
    return
  }
  header.classList = 'header header-active'
})
