// Récupération des catégories depuis l'API
const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5678/api/categories')
      const categories = await response.json()
  
      // Création des boutons de catégorie
      const buttonsContainer = document.querySelector('.btns-category')
  
      // Création du bouton "Tous" pour afficher tous les travaux
      const allButton = document.createElement('button')
      allButton.textContent = 'Tous'
      allButton.addEventListener('click', () => filterWorks())
      allButton.classList.add('btn-category') // Ajout de la classe CSS
      buttonsContainer.appendChild(allButton)
  
      // Utilisation de l'objet Set pour obtenir une liste sans doublons
      const uniqueCategoryIds = new Set(categories.map((category) => category.id))
  
      uniqueCategoryIds.forEach((categoryId) => {
        const button = document.createElement('button')
        const category = categories.find((category) => category.id === categoryId)
        button.textContent = category.name
        button.addEventListener('click', () => filterWorks(categoryId))
        button.classList.add('btn-category') // Ajout de la classe CSS
        buttonsContainer.appendChild(button)
      })
  
      // Affichage de tous les travaux par défaut
      filterWorks()
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des catégories :",
        error
      )
    }
  }
  
  // Filtrage des travaux en fonction de la catégorie sélectionnée
  const filterWorks = async (categoryId = null) => {
    try {
      const response = await fetch('http://localhost:5678/api/works')
      const data = await response.json()
      // console.log(data)
  
      const gallery = document.querySelector('.gallery')
      gallery.innerHTML = '' // Efface les travaux existants
  
      const filteredWorks = categoryId
        ? data.filter((work) => work.categoryId === categoryId)
        : data
  
      // console.log(filteredWorks)
  
      filteredWorks.forEach((work) => {
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
        "Une erreur s'est produite lors de la récupération des travaux :",
        error
      )
    }
  }
  
  // Appel de la fonction pour récupérer les catégories et afficher les boutons
  fetchCategories()
  
  
  
  
  
  