import { getAllWorks, deleteWork, getAllCategories, ajoutPhoto} from "./callApi.js";

let works = await getAllWorks();

// Récupération de l'élément du DOM qui accueillera les travaux
const sectionWorks = document.querySelector(".gallery");

//suppression du contenu de la div de classe Gallery avant integration dynamique du contenu
    sectionWorks.innerHTML= "";

function worksGenerator(works) {
    
    // initialisation de la variavle;
    let figureHTML = "";
    for (let i =  0; i < works.length; i++) {
        // template litteral pour les projets de la gallerie
        figureHTML += `
        <figure class="${works[i].id}">
						<img src=${works[i].imageUrl}  alt=${works[i].title}>
						<figcaption>${works[i].title}</figcaption>
	    </figure>
        `;
    };
    sectionWorks.innerHTML = figureHTML;
}

// récupération dans le DOM de la balise modale_galerie_images
const galleireModaleImage = document.querySelector(".modale_galerie_images");

//suppression du contenu de la div de classe Gallery avant integration dynamique du contenu
    galleireModaleImage.innerHTML= "";

function modaleGalleryGenerator(works) {
    // initialisation de la variavle;
    let gallerieModale = "";
    for(let i =  0; i < works.length; i++) {
        gallerieModale += `
        <figure class="miniature ${works[i].id}">
            <img src=${works[i].imageUrl}  alt=${works[i].title}>
            <i class="fa-solid fa-trash-can" id="${works[i].id}"></i>
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
const tousSort = document.querySelector("#tous");
const objetsSort = document.querySelector("#objets");
const appartementsSort = document.querySelector("#appartements");
const hotelsAndRestaurantsSort = document.querySelector("#hotelsAndRestaurants");


// récupération de la liste des catégories à partir du backend
let categories = await getAllCategories();
// extraction des id et des noms de catégorie
let nomsCategories = categories.map(categorie => categorie.name);
let indicesCategories = categories.map(categorie => categorie.id);
console.log(nomsCategories);
console.log(indicesCategories);

// récupération à partir du DOM des boutons filtres
let filtres = document.getElementsByClassName("categorie");
console.log(filtres);

for (let i = 0; i < filtres.length; i++) {
    // on recupère l'attribut name de l'élément html de la catégorie concernée, 
    // ATTENTION le name de l'élément HTML doit être rigoureusement identique à celui utilisé dans le backend pour la même catégorie
    const categorieFiltre = filtres[i].getAttribute("name");
    
    // on récupère l'élément html de la catégorie concernée
    const categorieSort = filtres[i];

    //stockage de d'indice de la catéorie cocnernée
    const indiceCategorie = nomsCategories.indexOf(categorieFiltre);

    // puis on récupère l'ID associé
    const categoryId = indicesCategories[indiceCategorie];

    //on ajout un listerner à la catégorie concernée
    categorieSort.addEventListener("click", function () {
        const categorieSorted = works.filter(function(work) {
            const categorie = work.category;
            // on utilise cet ID pour sélectionner les travaux qui nous intéresse
            return categorie.id == categoryId;
        })
        // Effacement de l'écran et regénération de la page avec les projets filtrées uniquement
        sectionWorks.innerHTML= "";
        worksGenerator(categorieSorted);
    })
};


// Ajout d'un listener pour la catégorie Tous
tousSort.addEventListener("click", function () {
    // Effacement de l'écran et regénération de la page avec tous les projets  
    sectionWorks.innerHTML= "";
    worksGenerator(works);
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
            pModifier2.classList.add("modifier")
        
            pModifier1.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> modifier`;
            pModifier2.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> modifier`;
        
            introduction.appendChild(pModifier1);
            mesProjets.appendChild(pModifier2); 
            
            // Mise en silence des catégories
            document.querySelector(".categories").style.display = "none";
}

// fonction à executer en cas déconnexion

function modeNonConnecte () {
    // Récupération dans le DOM de l'élément logout et publier les changements
    const logOut = document.querySelector("#log-out");
    const publierChangement = document.querySelector(".publier");
    // ajout du listener pour le logout avec action à effectuer
    logOut.addEventListener("click", function() {
        window.localStorage.removeItem("token");
        // redirection vers la home page 
        location.href = "http://127.0.0.1:5500/FrontEnd/index.html";
        // Rétablissement des catégories de filtre
        document.querySelector(".categories").style.display = "flex";
    });
    // idem pour le bouton publier les changements
    publierChangement.addEventListener("click", function() {
        window.localStorage.removeItem("token");
        // Rétablissement des catégories de filtre
        document.querySelector(".categories").style.display = "flex";
        // redirection vers la home page 
        location.href = "http://127.0.0.1:5500/FrontEnd/index.html";
    });
}

// fonction à executer en cas de fermeture de la fenêtre modale
function fermetureModale() {
    document.querySelector(".modale_galerie").style.display = "none";
    document.querySelector(".darker-background").style.display = "none";
    document.querySelector(".modale_image").style.display = "none";
}

// fonction montre l'aperçu dde l'image selectionnée dans le formulaire d'ajout d'image
function montrerApercu() {
    // on récupère du DOM l'élément HTML input file
    const imageInput = document.querySelector("#image");
    // on ajout en listenr qui s'active quand on sélectionne une image
    imageInput.addEventListener("change", function () {

         // on enregistre les information de l'image téléchargée
        let image = document.getElementById("image").files;

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

            //ajout d'un listener en cas de téléchargement image pour l'attribution de la source de l'image 
            lecteurImage.addEventListener("load", function() {
                apercuImage.src = lecteurImage.result;
            }, false);
            //lecture de l'url de l'image
            lecteurImage.readAsDataURL(image[0]);
        }
    })

    
};

function fermetureApercu() {
    // suppression du contenu de la balise aperçu
    const apercu = document.querySelector(".apercu");
    apercu.innerHTML = "";

    // restauration de la partie import image
    document.querySelector(".apercu").style.display = "none";
    document.querySelector(".import-image").style.display = "flex";
}


    //récupération dans le DOM des champs requis pour le formulaire d'ajout de photo et du bouton d'envoie
    let boutonEnvoie = document.querySelector("#photo-ajout");
    boutonEnvoie.disabled = true;
    console.log(boutonEnvoie);
    // Récupération dans le DOM du bouton d'envoie du formulaire d'ajout de photo 
    let photoSubmit = document.forms.namedItem("formulaire-ajout-image");
    console.log(photoSubmit);
    photoSubmit.addEventListener("mouseover", (e) =>{
        let title = document.getElementById("titre").value;
        let image = document.getElementById("image").files[0];
        let categoriePhoto = document.getElementById("categorie").value;

        if (title.length > 0 && image.size > 0 && categoriePhoto.length > 0) {
            boutonEnvoie.disabled = false;
        }
    });


// vérification du token dans le local storage
let storedToken = window.localStorage.getItem("token");

// en cas de connexion reussite 
if (storedToken !== null) {

    // en cas de connexion on génère l'ensemble des éléments de l'espace reservé aux connectés
    modeConnecte();

    // en cas de déconnexion
    modeNonConnecte ();

    // si le delai de connection est dépassé on supprime le token et on revien sur la page d'accueil standard (facultatif)

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
            fermetureApercu();
            document.getElementById("formulaire-ajout-image").reset();
        })

        // idem si on clique à l'exterieur de la fenetre modale
        const darkenBackground = document.querySelector(".darker-background");
        darkenBackground.addEventListener("click", function() {
            fermetureModale();
            fermetureApercu();
            document.getElementById("formulaire-ajout-image").reset();
        })

        // idem si on clique sur la bare modale
        const bareModale = document.querySelector(".modale");
        bareModale.addEventListener("click", function() {
            fermetureModale();
            fermetureApercu();
            document.getElementById("formulaire-ajout-image").reset();
        })

        //idem si on ferme la seconde fenetre modale
        const femetureModale2 = document.querySelector("#fa-xmark");
        femetureModale2.addEventListener("click", function() {
            fermetureModale();
            fermetureApercu();
            document.getElementById("formulaire-ajout-image").reset();
        })

    // si on clique sur supprimer un projet on stock les informations liées au projet à supprimé et on le supprime du front end
        //récupération dans le DOM de l'icône de corbeille
        const supprime = document.querySelectorAll(".fa-trash-can");

        //on rend les icones corbeille clickable pour chacun des projets dans la fenêtre modale
        supprime.forEach((trashCan) => {
            trashCan.addEventListener("click", (e) => {
                e.preventDefault();
                // on sélectionne du projet dans la liste works et on le supprimer, l'id du bouton supprimé étant le même que celui du projet à supprimer   
                let indice = e.target.id;
                // On supprime le projet concerné par l'icone corbeille selectonnée
                deleteWork(indice);
            })
        });

    // si on clique sur ajouter image on doit desactiver la première fenetre modale et activier la deuxieme
        // récopération dans le DOM du bouton ajouter image
        const ajouterPhoto = document.querySelector(".ajout-photo");
        // ajout d'un listener au bouton ajouter photo
        ajouterPhoto.addEventListener("click", function() {
            document.querySelector(".modale_galerie").style.display = "none";
            document.querySelector(".modale_image").style.display = "flex";
        });
    
    // si on clique sur la fleche retour on revient vers la première fenetre modale
        // récopération dans le DOM du bouton ajouter photo
        const retourModaleGallerie = document.querySelector(".fa-arrow-left");
        // ajout d'un listener au bouton ajouter photo
        retourModaleGallerie.addEventListener("click", function() {
            document.querySelector(".modale_galerie").style.display = "flex";
            document.querySelector(".modale_image").style.display = "none";
            fermetureApercu();
        });
    
    // si on sélectionne une image pour le formulaire on a un apercu de l'image qui s'affiche au niveau de la fiv apercu et la div ajout-image est désactivé
        montrerApercu();
    
        ajoutPhoto();

}  
