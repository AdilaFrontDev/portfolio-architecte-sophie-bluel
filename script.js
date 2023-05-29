// Récupération des données provenant du back-end pour les travaux
const response = await fetch("http://localhost:5678/api/works")
const works = await response.json();
console.log(works);

// Récupération de l'élément du DOM qui accueillera les travaux
const sectionWorks = document.querySelector(".gallery");
console.log(sectionWorks);

//suppression du contenu de la div de classe Gallery avant integration dynamique du contenu
sectionWorks.innerHTML= "";

function worksGenerator(works) {
    for (let i =  0; i < works.length; i++) {
        // Création d’une balise dédiée à un projet
        const figureWork = document.createElement("figure");
        console.log(figureWork);
        // Création de l'élément image, attribution du src et de l'alt
        const imageWork = document.createElement("img");
        imageWork.src = works[i].imageUrl;
        imageWork.alt = works[i].title;
        // Création de la description de l'image
        const captionWork = document.createElement("figcaption");
        captionWork.innerText = works[i].title;
        // Rattachement de la balise figure à la div .gallery
        sectionWorks.appendChild(figureWork);
        // Rattachement de l'image à la balise figure
        figureWork.appendChild(imageWork);
        // Rattachement de la description à la balise figure
        figureWork.appendChild(captionWork);
    };
}
    
// premier affichage de la page
worksGenerator(works);

// Récupération des éléments du DOM pour les boutons catégories
const tousSort = document.querySelector(".tous");
const objetsSort = document.querySelector(".objets");
const appartementsSort = document.querySelector(".appartements");
const hotelsAndRestaurantsSort = document.querySelector(".hotelsAndRestaurants");

// Ajout d'un listener pour la catégorie Tous
tousSort.addEventListener("click", function () {
    // Effacement de l'écran et regénération de la page avec les projets filtrées uniquement
    sectionWorks.innerHTML= "";
    worksGenerator(works);
    console.log("tous");
});

// Ajout d'un listener pour la catégorie Objets
objetsSort.addEventListener("click", function() {
    const objetsSorted = works.filter(function(work) {
        const categorie = work.category;
        return categorie.id == 1;
    });
    console.log(objetsSorted);
    // Effacement de l'écran et regénération de la page avec les projets filtrées uniquement
    sectionWorks.innerHTML= "";
    worksGenerator(objetsSorted);
});

// Ajout d'un listener pour la catégorie Appartements
appartementsSort.addEventListener("click", function() {
    const appartementsSorted = works.filter(function(work) {
        const categorie = work.category;
        return categorie.id == 2;
    });
    console.log(appartementsSorted);
     // Effacement de l'écran et regénération de la page avec les projets filtrées uniquement
     sectionWorks.innerHTML= "";
     worksGenerator(appartementsSorted);
});

// Ajout d'un listener pour la catégorie Hôtels & Restaurants
hotelsAndRestaurantsSort.addEventListener("click", function() {
    const hotelsAndRestaurantsSorted = works.filter(function(work) {
        const categorie = work.category;
        return categorie.id == 3;
    });
    console.log(hotelsAndRestaurantsSorted);
     // Effacement de l'écran et regénération de la page avec les projets filtrées uniquement
     sectionWorks.innerHTML= "";
     worksGenerator(hotelsAndRestaurantsSorted);
});
