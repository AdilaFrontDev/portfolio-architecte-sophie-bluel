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