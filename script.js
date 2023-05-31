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
    let figureHTML = "";
    for (let i =  0; i < works.length; i++) {
        // template litteral pour les projets de la gallerie
        figureHTML += `
        <figure>
						<img src=${works[i].imageUrl}  alt=${works[i].title}>
						<figcaption>${works[i].title}</figcaption>
	    </figure>
        `;
    };
    sectionWorks.innerHTML = figureHTML;
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


// en cas de connexion reussite 
// vérification du token dans le local storage

let storedToked = window.localStorage.getItem("token");
console.log(storedToked);



if (storedToked !== null) {
    // Recupétation du DOM de la bare de navigation 
    const navigation = document.querySelector("#nav");
    //suppression du menu hors connexion
    navigation.innerHTML = "";
    // Création du menu une fois connecté
    let navigationIn = "";
    // template litteral pour le menu durant la connexion
    navigationIn = 
    `<ul>
        <li>projets</li>
        <li>contact</li>
        <li>
        <a id="log-out" href="./login.html">logout</a>
        </li>
        <li><img src="./assets/icons/instagram.png" alt="Instagram"></li>
    </ul>`;
    navigation.innerHTML = navigationIn;

    // Affichage de la modale
    document.querySelector(".modale").style.display = "flex";
    
    // Décalage du reste des balises pour laisser la place au modale
    //récupérations dans le DOM des balises à décaler
    const header =document.querySelector("header");
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    
    header.classList.add("shift");
    main.classList.add("shift");
    footer.classList.add("shift");
    
    // Ajout des boutons de modification pour l'introduction et pour la partie protfolio
    // Récupération des éléments du DOM dans lesquels seront ajouté les boutons de modification
    const introduction = document.querySelector(".introduction_figure");
    const mesProjets = document.querySelector(".projets");

    // Construction de la balise à ajouter
    const pModifier1 = document.createElement("p");
    const pModifier2 = document.createElement("p");
    
    pModifier1.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> modifier`;
    pModifier2.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> modifier`;

    introduction.appendChild(pModifier1);
    mesProjets.appendChild(pModifier2);

    // Suppression des catégories
    const categories = document.querySelector(".categories");
    categories.innerHTML="";

    // en cas de déconnexion
    
    const logOut = document.querySelector("#log-out");
    console.log(logOut);

    logOut.addEventListener("click", function() {
        window.localStorage.removeItem("token");
    })

}

