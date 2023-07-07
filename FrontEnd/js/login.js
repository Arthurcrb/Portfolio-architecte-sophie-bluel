
document.addEventListener('DOMContentLoaded', () => {
  // Récupération des éléments du formulaire
  const emailInput = document.getElementById('email')
  const passwordInput = document.getElementById('password')
  const submitButton = document.getElementById('submit')
  const errorFormMessage = document.getElementById('errorFormMessage')

  // J'ajoute l'événement de soumission du formulaire
  submitButton.addEventListener('click', async (event) => {
    event.preventDefault() // Empêche la soumission du formulaire par défaut

    const email = emailInput.value
    const password = passwordInput.value

    // Vérification des champs du formulaire
    if (email === '' || password === '') {
      errorFormMessage.textContent = 'Erreur email et mot de passe .'
      return
    }

    // J'effectue la requête de connexion à l'API avec la méthode POST
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
        throw new Error('Erreur de connexion.')
      }
    } catch (error) {
      errorFormMessage.textContent = error.message
    }
  })
})


