
import { fetchWorks } from './api.js'
import { filterWorks } from './index.js'

const url = 'http://localhost:5678/api/works'

// Modal 1 - Delete Works
const modal1DeleteWorks = document.getElementById('modal-1')
const displayModal1 = document.getElementById('displayModal1')
const closeModalBtn1 = document.querySelector('#modal-1 .close1')

displayModal1.addEventListener('click', () => openModal(modal1DeleteWorks))
closeModalBtn1.addEventListener('click', () => closeModal(modal1DeleteWorks))

// Modal 2 - Add Form
const modal2AddForm = document.getElementById('modal-2')
const displayModal2 = document.getElementById('displayModal2')
const closeModalBtn2 = document.querySelector('#modal-2 .close2')
const previousModal1 = document.querySelector('.prev-modal1')

displayModal2.addEventListener('click', () => {
  closeModal(modal1DeleteWorks)
  openModal(modal2AddForm)
})

closeModalBtn2.addEventListener('click', () => closeModal(modal2AddForm))
previousModal1.addEventListener('click', () => {
  closeModal(modal2AddForm)
  openModal(modal1DeleteWorks)
})

// Common Functions
const openModal = (modal) => {
  modal.style.display = 'block'
}

const closeModal = (modal) => {
  resetForm()
  modal.style.display = 'none'
}

// Display Thumbnails
const displayThumbnail = async () => {
  try {
    const works = await fetchWorks()
    let display = ''
    for (let work of works) {
      display += `
        <figure class="thumbnail">
          <img class="img-thumbnail" id="${work.id}" src="${work.imageUrl}" alt="${work.title}" crossorigin="anonymous">
          <a href="#" id="delete-link"><i class="fa-solid fa-trash-can" data-delete="${work.id}"></i></a>
          <div class="text-edit">éditer</div>
        </figure>
      `
    }
    document.getElementById('thumbnail-modal').innerHTML = display
  } catch (error) {
    console.log('Erreur lors de la récupération des données : ', error)
  }
}

// Delete Works
const deleteWorks = async (id) => {
  try {
    const res = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    })
    if (!res.ok) {
      console.log('Erreur lors de la suppression')
    } else {
      return false
    }
  } catch (error) {
    console.log('Erreur lors de la suppression : ', error)
  }
}

// Confirm Deletion and Success Message
async function messageSuccess(id) {
  const pictureDelete = 'Voulez-vous vraiment supprimer cette image ?'
  if (confirm(pictureDelete)) {
    await deleteWorks(id)
    await displayThumbnail()
    await filterWorks()
  }
}

window.addEventListener('click', (e) => {
  if (e.target.dataset.delete) {
    e.preventDefault()
    messageSuccess(e.target.dataset.delete)
  }
})

displayThumbnail()

// Add Photo
const imageFile = document.getElementById('add-picture')
const displayPicture = document.querySelector('.display-picture')
const submitButton = document.getElementById('modal_form_validation')
const formAddPicture = document.getElementById('form-add')
const errorContainer = document.querySelector('.error-container')

const displayImage = (imageFile, content) => {
  imageFile.addEventListener('change', () => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      const uploadPicture = reader.result
      content.style.backgroundImage = `url(${uploadPicture})`
    })
    reader.readAsDataURL(imageFile.files[0])
    content.style.display = 'block'
  })
}

displayImage(imageFile, displayPicture)

const isTitleExists = async (title) => {
  const projects = await fetchWorks()
  return projects.some((project) => project.title === title)
}

formAddPicture.addEventListener('input', () => buttonEffect(submitButton))
formAddPicture.addEventListener('submit', async (e) => {
  e.preventDefault()
  const titleInput = document.querySelector('#title_input')
  const title = titleInput.value.trim()
  const addThumbnail = new FormData(formAddPicture)
  if (
    !title ||
    !addThumbnail.get('category') ||
    !addThumbnail.get('image').name
  ) {
    generateFormError(addThumbnail)
  } else if (await isTitleExists(url, title)) {
    errorContainer.innerText =
      'Ce projet existe déjà avec ce titre! Merci de le modifier'
  } else {
    await postWorks(url, addThumbnail)
    const works = await fetchWorks()
    filterWorks(works)
    displayThumbnail()
    closeModal(modal2AddForm)
    window.location.href = 'index.html'
  }
})

// Activation of the button
const buttonEffect = (button) => {
  const imageInput = document.querySelector('#add-picture')
  const titleInput = document.querySelector('#title_input')
  const categoryInput = document.querySelector('#category_input')
  button.classList.toggle(
    'button-off',
    !(imageInput.value && titleInput.value && categoryInput.value)
  )
}

// Error management
const generateFormError = (addThumbnail) => {
  errorContainer.innerText = ''
  if (!addThumbnail.get('category')) {
    errorContainer.innerText += 'Choisissez une catégorie !\n'
  }
  if (!addThumbnail.get('title')) {
    errorContainer.innerText += 'Renseignez un titre !\n'
  }
  if (!addThumbnail.get('image').name) {
    errorContainer.innerText += 'Choisissez une image !'
  }
}

// Reset Form
const resetForm = () => {
  displayPicture.style = ''
  errorContainer.innerText = ''
  formAddPicture.reset()
}

// Post Works
const postWorks = async (url, addThumbnail) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
      body: addThumbnail,
    })

    if (res.ok) {
      alert('image ajoutée')
      resetForm()
      return res.json()
    } else {
      throw new Error('Erreur ajout image')
    }
  } catch (error) {
    console.error('Erreur ajout image :', error)
  }
}


