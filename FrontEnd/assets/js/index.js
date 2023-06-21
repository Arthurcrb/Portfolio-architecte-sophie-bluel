const getWorks = 'http://localhost:5678/api/works';

async function fetchWorks() {
  try {
    const response = await fetch(`${getWorks}`);
    const works = await response.json();

    const galleryElement = document.querySelector('.gallery');
    
    works.forEach(work => {
      const figureElement = document.createElement('figure');
      const imageElement = document.createElement('img');
      const figcaptionElement = document.createElement('figcaption');

      imageElement.src = work.imageUrl;
      imageElement.alt = work.title;
      figcaptionElement.textContent = work.title;

      figureElement.appendChild(imageElement);
      figureElement.appendChild(figcaptionElement);
      galleryElement.appendChild(figureElement);
    });
  } catch (error) {
    console.log('Une erreur s\'est produite :', error);
  }
}

fetchWorks();