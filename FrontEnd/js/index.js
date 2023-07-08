
// Fetch categories
const fetchCategories = async () => {
  try {
    const response = await fetch('http://localhost:5678/api/categories')
    const categories = await response.json()

    // Create buttons
    const buttonsContainer = document.querySelector('.btns-category')

    // Creation of the "All" button to display all works
    const allButton = document.createElement('button')
    allButton.textContent = 'Tous'
    allButton.addEventListener('click', () => filterWorks())
    allButton.classList.add('btn-category') // Add class CSS
    buttonsContainer.appendChild(allButton)

    // list without duplicates
    const uniqueCategoryIds = new Set(categories.map((category) => category.id))

    uniqueCategoryIds.forEach((categoryId) => {
      const button = document.createElement('button')
      const category = categories.find((category) => category.id === categoryId)
      button.textContent = category.name
      button.addEventListener('click', () => filterWorks(categoryId))
      button.classList.add('btn-category') // Add class CSS
      buttonsContainer.appendChild(button)
    })

    // Display of all works by default
    filterWorks(null)
  } catch (error) {
    console.error('erreur récupération catégories :', error)
  }
}

// Filter works based on selected category
const filterWorks = async (categoryId = null) => {
  try {
    const response = await fetch('http://localhost:5678/api/works')
    const data = await response.json()

    const gallery = document.querySelector('.gallery')
    gallery.innerHTML = '' // Delete existing works

    const filteredWorks = categoryId
      ? data.filter((work) => work.categoryId === categoryId)
      : data

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

// Function call
fetchCategories()

export { fetchCategories, filterWorks }


