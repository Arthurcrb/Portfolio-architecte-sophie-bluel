// Récupération des travaux depuis l'API
const URL_API = 'http://localhost:5678/api'

const fetchWorks = async () => {
  try {
    const response = await fetch('http://localhost:5678/api/works')
    const data = await response.json()

    // Parcourir les travaux et création des éléments du DOM
    const gallery = document.querySelector('.gallery')

    data.forEach((work) => {
      const figure = document.createElement('figure')
      const img = document.createElement('img')
      const figcaption = document.createElement('figcaption')

      img.src = work.imageUrl
      img.alt = work.title
      figcaption.textContent = work.title

      figure.appendChild(img)
      figure.appendChild(figcaption)
      gallery.appendChild(figure)
    })
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des travaux.",
      error
    )
  }
}

// Appel de la fonction pour récupérer et afficher les travaux
fetchWorks()