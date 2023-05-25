// Récupération des données provenant du back-end pour les travaux
const works = fetch("http://localhost:5678/api/works").then(works => works.json());

// Récupération de l'élément du DOM qui accueillera les travaux
const sectionWorks = document.querySelector(".gallery");

function worksGenerator(works) {
    for (let i =  0; i < works.length; i++) {
        // Création d’une balise dédiée à un projet
        const figureWork = document.createElement("figure");
        // Création de l'élément image, attribution du src et de l'alt
        const imageWork = document.createElement("img");
        imageWork.src = works[i].imageUrl;
        imageWork.alt = works[i].title;
        // Création de la description de l'image
        const captionWork = document.createElement("figcaption");
        // Rattachement de la balise figure à la div .gallery
        sectionWorks.appendChild(figureWork);
        // Rattachement de l'image à la balise figure
        figureWork.appendChild(imageWork);
        // Rattachement de la description à la balise figure
        figureWork.appendChild(captionWork);
    };
}
    
//premier affichage de la page
worksGenerator(works);

