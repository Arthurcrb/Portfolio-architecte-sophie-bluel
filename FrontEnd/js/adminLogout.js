// Retrieve elements
const topBar = document.getElementById('topBar')
const loginLogout = document.getElementById('loginLogout')
const buttonsFilterCategory = document.querySelector('.btns-category')
const textEdit = document.querySelector('.textEdit')
const token = window.sessionStorage.getItem('token')

// Display topBar & textEdit
if (token != null) {
  topBar.style.visibility = 'visible'
  textEdit.style.visibility = 'visible'
  buttonsFilterCategory.style.display = 'none'
  loginLogout.innerHTML = 'Logout'
  loginLogout.addEventListener('click', () => {
    sessionStorage.removeItem('token')
    window.location.href = 'index.html'
    loginLogout.href = 'index.html'
  })
}


