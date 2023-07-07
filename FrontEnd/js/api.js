// Récupération des travaux depuis l'API
const URL_API = 'http://localhost:5678/api'

export const fetchWorks = async () => {
  try {
    let response = await fetch('http://localhost:5678/api/works')
    let data = await response.json()
    return data
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des travaux.",
      error
    )
  }

}