import {getCategories, getWorks} from "./data/data.js"
import {displayGalleryObjectsByCategoryId, addListenersToCategoryButtons, displayGalleryMenu} from "./homeFunctions/homeFunctions.js"



// Affichage de la galerie et filtre par catégories sur les boutons
const works = await getWorks();
const categories = await getCategories();

displayGalleryMenu(categories);
displayGalleryObjectsByCategoryId(works, "0");
addListenersToCategoryButtons(works);

