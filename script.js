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
    
    // initialisation de la variavle;
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

// récupération dans le DOM de la balise modale_galerie_images
const galleireModaleImage = document.querySelector(".modale_galerie_images");
console.log(galleireModaleImage);

//suppression du contenu de la div de classe Gallery avant integration dynamique du contenu
    galleireModaleImage.innerHTML= "";

function modaleGalleryGenerator(works) {
    // initialisation de la variavle;
    let gallerieModale = "";
    for(let i =  0; i < works.length; i++) {
        gallerieModale += `
        <figure class="miniature">
            <img src=${works[i].imageUrl}  alt=${works[i].title}>
            <i class="fa-solid fa-trash-can"></i>
            <i id="resize-icon" class="fa-solid fa-arrows-up-down-left-right"></i>
            <p>éditer</p>				
        </figure>
        `;
    }
    galleireModaleImage.innerHTML= gallerieModale;
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
        
            // Construction des balises à ajouter
            
            const pModifier1 = document.createElement("p");
            const pModifier2 = document.createElement("p");
            pModifier1.classList.add("modifier");
            pModifier2.classList.add("modifier-gallerie");
        
            pModifier1.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> modifier`;
            pModifier2.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> modifier`;
        
            introduction.appendChild(pModifier1);
            mesProjets.appendChild(pModifier2); 
            
            // Mise en silence des catégories
            document.querySelector(".categories").style.display = "none";

}

// fonction à executer en cas déconnexion

function modeNonConnecte () {
    // Récupération dans le DOM de l'élément logout
    const logOut = document.querySelector("#log-out");
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

// fonction à executer en cas de fermeture de la fenêtre modale
function fermetureModale() {
    document.querySelector(".modale_galerie").style.display = "none";
    document.querySelector(".darker-background").style.display = "none";
    document.querySelector(".modale_image").style.display = "none";
}

// fonction à effectuer lorque l'aperçu du formulaire d'ajout d'image doit être activé
// On effectu le lien entre le DOM input file et la fonction javascript
document.getElementById("image").onchange = function() {montrerApercu()};

function montrerApercu() {
    // on enregistre les information de l'image téléchargée
    let image = document.getElementById("image").files;
    console.log(image);
    // s'il y a bien une image de téléchargée 
    if (image.length > 0) {
        
        // mise en place de l'emplacement de l'aperçu image
        document.querySelector(".apercu").style.display = "block";
        document.querySelector(".import-image").style.display = "none";

        // création de la balise image pour l'aperçu et ratachement à la balise aperçu
        const apercuImage = document.createElement("img");
        const apercuCadre = document.querySelector(".apercu");
        apercuCadre.appendChild(apercuImage);
        
        // utilisation du constructeur FileReader()
        let lecteurImage = new FileReader();
        console.log(lecteurImage);

        //ajout d'un listener en cas de téléchargement image pour l'attribution de la source de l'image 
        lecteurImage.addEventListener("load", function() {
            apercuImage.src = lecteurImage.result;
        }, false);

        lecteurImage.readAsDataURL(image[0]);
    }
   
}


// vérification du token dans le local storage

let storedToked = window.localStorage.getItem("token");
console.log(storedToked);

// en cas de connexion reussite 
if (storedToked !== null) {

    // en cas de connexion on génère l'ensemble des éléments de l'espace reservé aux connectés
    modeConnecte();

    // en cas de déconnexion
    modeNonConnecte ();

    // si le delai de connection est dépassé on supprime le token et on revien sur la page d'accueil standard

    // si on clique sur le bouton modifier de la partie portfolio
        // récupéraion dans le DOM du bouton modifier-gallerie
        const modifierGallerie = document.querySelector(".modifier-gallerie");
        // ajout d'un listener au bouton modifier-gallerie
        modifierGallerie.addEventListener("click", function() {
            // récupéation dans le DOM de la fenêtre modale galerie
            document.querySelector(".modale_galerie").style.display = "flex";
            document.querySelector(".darker-background").style.display = "block";
        })
        //on récupère dynamiquement les images de la gallerie
        modaleGalleryGenerator(works);

    // si on clique a l'exterieur de la fenêtre modale ou sur la croix elle doit se ferner et le darken backgroud desactivé
        // récupération dans le DOM du bouton de fermeture de la fenetre modale
        const femetureModale = document.querySelector(".fa-xmark");
        // ajout d'un listener au bouton de fermeture de la fenetre modale
        femetureModale.addEventListener("click", function() {
            fermetureModale();
        })

        // idem si on clique à l'exterieur de la fenetre modale
        const darkenBackground = document.querySelector(".darker-background");
        darkenBackground.addEventListener("click", function() {
            fermetureModale();
        })

        // idem si on clique sur la bare modale
        const bareModale = document.querySelector(".modale");
        bareModale.addEventListener("click", function() {
            fermetureModale();
        })

        //idem si on ferme la seconde fenetre modale
        const femetureModale2 = document.querySelector("#fa-xmark");
        femetureModale2.addEventListener("click", function() {
            fermetureModale();
        })

    // si on clique sur supprimer un projet on stock les informations liées au projet à supprimé et on le supprime du front end
        //récupération dans le DOM de l'icône de corbeille


    // si on clique sur ajouter image on doit desactiver la première fenetre modale et activier la deuxieme
        // récopération dans le DOM du bouton ajouter image
        const ajouterPhoto = document.querySelector(".ajout-photo");
        // ajout d'un listener au bouton ajouter photo
        ajouterPhoto.addEventListener("click", function() {
            document.querySelector(".modale_galerie").style.display = "none";
            document.querySelector(".modale_image").style.display = "flex";
        })

    
    // si on clique sur la fleche retour on revient vers la première fenetre modale
        // récopération dans le DOM du bouton ajouter photo
        const retourModaleGallerie = document.querySelector(".fa-arrow-left");
        // ajout d'un listener au bouton ajouter photo
        retourModaleGallerie.addEventListener("click", function() {
            document.querySelector(".modale_galerie").style.display = "flex";
            document.querySelector(".modale_image").style.display = "none";

        })
       
    // si on sélectionne une image pour le formulaire on a un apercu de l'image qui s'affiche au niveau de la fiv apercu et la div ajout-image est désactivé
        //compléter
    // si le formulaire est correctement remplit on ajoute on stock l'information du projet selectionné et on l'affiche dans le front end à la suite des autres projet et la fenetre modale se ferme
        //compléter
    // si le formulaire n'est pas correctement rempli o reçoit un message d'erreur
        //compléter

    // si on clique sur publier les changements les mofification enregistées sont envoyé au backend et on se déconnect 
        //compléter
        

}

