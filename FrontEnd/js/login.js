
document.addEventListener('DOMContentLoaded', function () {
  const loginLogoutLink = document.querySelector('#loginLogout')

  // Checking if the current page matches the login page
  if (window.location.pathname.includes('login.html')) {
    loginLogoutLink.classList.add('active')
  }
})

document.addEventListener('DOMContentLoaded', () => {
  // Retrieve from elements
  const emailInput = document.getElementById('email')
  const passwordInput = document.getElementById('password')
  const submitButton = document.getElementById('submit')
  const errorFormMessage = document.getElementById('errorFormMessage')

  // add eventListener
  submitButton.addEventListener('click', async (event) => {
    event.preventDefault() // Prevent form submission by default

    const email = emailInput.value
    const password = passwordInput.value

    // Verification of form fields
    if (email === '' || password === '') {
      errorFormMessage.textContent =
        'Erreur dans l’identifiant ou le mot de passe.'
      return
    }

    // Post API
    const url = 'http://localhost:5678/api/users/login'
    const data = {
      email: email,
      password: password,
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const userData = await response.json()
        console.log(userData)
        if (userData) {
          window.sessionStorage.setItem('userData', JSON.stringify(userData))
          window.sessionStorage.setItem('token', userData.token)
          window.location.replace('./index.html')
        }
      } else {
        throw new Error('Erreur connexion.')
      }
    } catch (error) {
      errorFormMessage.textContent = error.message
    }
  })
})


