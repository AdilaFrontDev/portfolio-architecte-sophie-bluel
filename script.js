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


// fonctions à executer en cas de connexion réussite

function modeConnecte() {
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
        
        header.classList.add("shift");
        
        // Ajout des boutons de modification pour l'introduction et pour la partie protfolio
        // Récupération des éléments du DOM dans lesquels seront ajouté les boutons de modification
        const introduction = document.querySelector(".introduction_figure");
        const mesProjets = document.querySelector(".projets");
    
        // Construction de la balise à ajouter
        
        const pModifier1 = document.createElement("p");
        const pModifier2 = document.createElement("p");
        pModifier1.classList.add("modifier");
        pModifier2.classList.add("modifier");
    
        pModifier1.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> modifier`;
        pModifier2.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> modifier`;
    
        introduction.appendChild(pModifier1);
        mesProjets.appendChild(pModifier2); 
        
        // Suppression des catégories
        document.querySelector(".categories").style.display = "none";

}

// fonction à executer en cas déconnexion

function modeNonConnecte () {
    // Récupération dans le DOM de l'élément logout
    const logOut = document.querySelector("#log-out");
    console.log(logOut);
    // ajout du listener pour le logout avec action à effectuer
    logOut.addEventListener("click", function() {
        window.localStorage.removeItem("token");
        console.log('coucou')
        // redirection vers la home page (ne semble pas fonctionner pour l'instant)
        location.href = "http://127.0.0.1:5500/FrontEnd/index.html";
        // Rétablissement des catégories de filtre
        document.querySelector(".categories").style.display = "flex";
    })
}

// en cas de connexion reussite 
// vérification du token dans le local storage

let storedToked = window.localStorage.getItem("token");
console.log(storedToked);



if (storedToked !== null) {

    // en cas de connexion on génère l'ensemble des éléments de l'espace reservé aux connectés
    modeConnecte();

    // en cas de déconnexion
    modeNonConnecte ();

    // si le delai de connection est dépassé on supprime le token et on revien sur la page d'accueil standard

    // quand on clique sur le bouton modifier de la partie portfolio
    // la premiere fenêtre modale doit s'ouvrir et de darke-background activé
        // si on clique a l'exterieur de la fenêtre modale ou sur la croix elle doit se ferner et le darken backgroud desactivé
        // si on clique sur supprimer une image cela doit être possible
        // si on clique sur ajouter image on doit desactiver la première fenetre modale et activier la deuxieme

    // une fois sur la seconde fenetre modale 
        // si on clique a l'exterieur de la fenêtre modale ou sur la croix elle doit se ferner et le darken backgroud desactivé
        // si on clique sur la fleche retour on revient vers la première fenetre modale
        // si on sélectionne une image pour le formulaire on a un apercu de l'image qui s'affiche au niveau de la fiv apercu et la div ajout-image est désactivé
        // si le formulaire est correctement remplit on ajoute la photo dans le backend et on l'affiche dans le flont end à la suite des autres et la fenetre modale se ferme
        // si le formulaire n'est pas correctement rempli o reçoit un message d'erreur

    // si on clique sur publier les changements les mofification sont enregistés et on se déconnect
    

}

