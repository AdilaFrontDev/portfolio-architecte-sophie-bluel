import { getAllWorks, deleteWorkAPI, getAllCategories,ajoutPhoto} from "./callApi.js";

// récupération à partie du backend des travaux
    let works = await getAllWorks();

// Récupération de l'élément du DOM qui accueillera les travaux
    const sectionWorks = document.querySelector(".gallery");

// fonction pemtettant de générer dynamiquement les projets de la gallerie
    function worksGenerator(works) {
        // initialisation de la variable;
        let figureHTML = "";
        for (let i =  0; i < works.length; i++) {
            // utilisation template litteral pour les projets de la gallerie
            figureHTML += `
            <figure class="figure-${works[i].id}">
                            <img src=${works[i].imageUrl}  alt=${works[i].title}>
                            <figcaption>${works[i].title}</figcaption>
            </figure>
            `;
        };
        sectionWorks.innerHTML = figureHTML;
    };

// récupération dans le DOM de la balise modale_galerie_images
    const galleireModaleImage = document.querySelector(".modale_galerie_images");
    console.log()
// fonction permettant de générer dynamiquement les items de la gallerie de la modale de gestion de projets 
    function modaleGalleryGenerator(works) {
        // initialisation de la variavle;
            let gallerieModale = "";
        // création du contenu html et intégration dans le DOM
            for (let i =  0; i < works.length; i++) {
                gallerieModale += `
                <figure class="miniature figure-${works[i].id}">
                    <img src=${works[i].imageUrl}  alt=${works[i].title}>
                    <i class="fa-solid fa-trash-can" id="${works[i].id}"></i>
                    <i id="resize-icon" class="fa-solid fa-arrows-up-down-left-right"></i>
                    <p>éditer</p>				
                </figure>
                `;
            }
            galleireModaleImage.innerHTML= gallerieModale;
    };
    
// premier affichage de la page
    worksGenerator(works);

// génération dynamique des boutons filtre de catégorie de projet de la gallerie
    // récupération de la liste des catégories à partir du backend
        let categories = await getAllCategories();
        let filtresCategorie = "";
    // création du contenu html des fitres de catégorie
        categories.forEach(element => {
            filtresCategorie += `<p class="categorie" name="${element.name}">${element.name}</p>`; 
        }); 
        document.querySelector(".filtres").innerHTML = filtresCategorie;

// section du script permettant le fonctionnement des boutons filtre des catégories de projet de la partie galerie
    // extraction des id et des noms de catégorie
        let nomsCategories = categories.map(categorie => categorie.name);
        let indicesCategories = categories.map(categorie => categorie.id);
    // récupération à partir du DOM des boutons filtres
        let filtres = document.getElementsByClassName("categorie");
    for (let i = 0; i < filtres.length; i++) {
        // on recupère l'attribut name de l'élément html de la catégorie concernée, 
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
                });
                // Effacement de l'écran et regénération de la page avec les projets filtrées uniquement
                    sectionWorks.innerHTML= "";
                    worksGenerator(categorieSorted);
            });
    };

// section du script dédiée au fonctionnement du bouton permétant d'afficher toutes les catégories de projet de la partie galerie
    // Récupération des éléments du DOM pour les boutons catégories
        const tousSort = document.querySelector("#tous");
    // Ajout d'un listener pour la catégorie Tous
        tousSort.addEventListener("click", function () {
            // Effacement de l'écran et regénération de la page avec tous les projets  
                sectionWorks.innerHTML= "";
                worksGenerator(works);
        });

// fonctions à executer en cas de connexion réussite
    function modeConnecte() {
        // modification de la base de navigation
            // Recupétation du DOM de la bare de navigation 
                const navigation = document.querySelector("#nav");
            //suppression du menu hors connexion
                navigation.innerHTML = "";
            // Création du menu une fois connecté
                let navigationIn = "";
            // utilisation d'un template litteral pour le menu durant la connexion que l'on intègre dans la balise nav
                navigationIn = 
                `<ul>
                    <li>
                        <a href="#portfolio" class="nav_link">projets</a>
                    </li>
                    <li>
						<a href="#contact" class="nav_link">contact</a>
					</li>
                    <li>
                        <a id="log-out" href="#" class="nav_link">logout</a>
                    </li>
                    <li>
                        <img src="./assets/icons/instagram.png" alt="Instagram">
                    </li>
                </ul>`;
                navigation.innerHTML = navigationIn;
        // Affichage de la modale
            document.querySelector(".modale").style.display = "flex";
        // Décalage du reste des balises pour laisser la place au modale
            // récupérations dans le DOM des balises à décaler
                const header =document.querySelector("header");
            // ajout de la classe css permettant le décalage
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
            // création du contenu html
                pModifier1.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> modifier`;
                pModifier2.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> modifier`;
            // rattachement aux éléments html correspondants
                introduction.appendChild(pModifier1);
                mesProjets.appendChild(pModifier2); 
        // Mise en silence des catégories
            document.querySelector(".categories").style.display = "none";
    };

// fonction à executer en cas déconnexion
    function modeNonConnecte () {
        // Récupération dans le DOM de l'élément logout 
            const logOut = document.querySelector("#log-out");
        // ajout du listener pour le logout avec action à effectuer
            logOut.addEventListener("click", function() {
                // on supprime le token stocké dans le local storage
                    window.localStorage.removeItem("token");
                // redirection vers la home page 
                    window.location.href = "index.html";
                // Rétablissement des catégories de filtre
                    document.querySelector(".categories").style.display = "flex";
            });
    };

// fonction à executer en cas de fermeture de la fenêtre modale
function fermetureModale() {
    document.querySelector(".modale_galerie").style.display = "none";
    document.querySelector(".darker-background").style.display = "none";
    document.querySelector(".modale_image").style.display = "none";
};

// fonction a executer pour montrer l'aperçu de l'image selectionnée dans le formulaire d'ajout d'image
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
            });
        };

function fermetureApercu() {
    // suppression du contenu de la balise aperçu
        const apercu = document.querySelector(".apercu");
        apercu.innerHTML = "";
    // restauration de la partie import image
        document.querySelector(".apercu").style.display = "none";
        document.querySelector(".import-image").style.display = "flex";
};

// Section du code permettant de rendre accessible le bouton d'envoie du formulaire d'ajout d'image uniquement quand tous les champs sont renseignés
    //récupération dans le DOM des champs requis pour le formulaire d'ajout de photo et du bouton d'envoie
        let boutonEnvoie = document.querySelector("#photo-ajout");
        boutonEnvoie.disabled = true;
    // Récupération dans le DOM du bouton d'envoie du formulaire d'ajout de photo 
        let photoSubmit = document.forms.namedItem("formulaire-ajout-image");
        // ajout d'un listerner 
            photoSubmit.addEventListener("mouseover", (e) =>{
                let title = document.getElementById("titre").value;
                let image = document.getElementById("image").files[0];
                let categoriePhoto = document.getElementById("categorie").value;
                if (title.length > 0 && image.size > 0 && categoriePhoto.length > 0) {
                    boutonEnvoie.disabled = false;
                }
            });

// récupération du token dans le local storage
    let storedToken = window.localStorage.getItem("token");

// en cas de connexion reussite 
    if (storedToken !== null) {
        // en cas de connexion on génère l'ensemble des éléments de l'espace reservé aux connectés
            modeConnecte();
        // en cas de déconnexion
            modeNonConnecte ();
        // si on clique sur le bouton modifier de la partie portfolio
            // récupéraion dans le DOM du bouton modifier-gallerie
                const modifierGallerie = document.querySelector(".modifier-gallerie");
            // ajout d'un listener au bouton modifier-gallerie
                modifierGallerie.addEventListener("click", function() {
                    // récupéation dans le DOM de la fenêtre modale galerie
                        document.querySelector(".modale_galerie").style.display = "flex";
                        document.querySelector(".darker-background").style.display = "block";
                });
        //on récupère dynamiquement les images de la gallerie
            modaleGalleryGenerator(works);
        
        // si on clique a l'exterieur de la fenêtre modale ou sur la croix elle doit se ferner et le darken backgroud desactivé
            //on récupère dans le DOM tous les élements qui, au click, donne lieu à la fermeture de la modale
                let elementsFermetureModale = [];
                const femetureModale = document.querySelector(".fa-xmark");
                const darkenBackground = document.querySelector(".darker-background");
                const bareModale = document.querySelector(".modale");
                const femetureModale2 = document.querySelector("#fa-xmark");
                elementsFermetureModale.push(femetureModale, darkenBackground, bareModale, femetureModale2);
            //on ajoute pour chacun des éléments un listener permetant la fermeture de la modale
            for (const element of elementsFermetureModale) {
                // ajout d'un listener à l'élement html 
                    element.addEventListener("click", function() {
                        fermetureModale();
                        fermetureApercu();
                        document.getElementById("formulaire-ajout-image").reset();
                    });
            };

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
    };

// on récupéère dans le DOM l'ensemble des éléments html icone poubelle
    let supprime = document.getElementsByClassName("fa-trash-can");
    console.log(supprime)
// section permettant la suppression de travaux à partir de la modale
    function deleteWork() {
        //on rend les icones corbeille clickable pour chacun des projets dans la fenêtre modale
            for (let i = 0; i < supprime.length; i++) {
                const trashCan = supprime[i];
                trashCan.addEventListener("click", async (e) => {
                    e.preventDefault();
                    // on sélectionne du projet dans la liste works et on le supprimer, l'id du bouton supprimé étant le même que celui du projet à supprimer   
                        let indice = e.target.id;
                        await deleteWorkAPI(indice);
                        let remainworks = await getAllWorks();
                        worksGenerator(remainworks);
                        modaleGalleryGenerator(remainworks);
                        fermetureModale();
                }); 
            }
    };

    deleteWork();

// section permettant l'ajout de projet via le formulaier de la modale
    // Ajout d'un listener au bouton de submission du formulaire d'ajout de photo
        photoSubmit.addEventListener("submit", async (e) => {
        // on vérifie la possibilité d'utiliser un preventDefault()
            console.log(e.cancelable);
        // on utilise les méthode permattant d'empécher le rafraichissement de la page web
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();    
        // récupération des éléments qui constituront le body de la requête POST
            //stockage du titre   
                const title = document.getElementById("titre").value;
            // récupération dans le DOM du file imput
                const selectedFile = document.getElementById("image").files[0];
                let imageName = selectedFile.name;
                imageName = imageName.slice(0,-4);
            //stockage de l'URL
                const imageUrl = `http://localhost:5678/images/${imageName}${selectedFile.lastModified}.png`;
            // récupération de la liste des catégories à partir du backend
                let categories = await getAllCategories();
                let nomsCategories = categories.map(categorie => categorie.name);
                let indicesCategories = categories.map(categorie => categorie.id);
            // recherche de l'indice de la catéogie concernée par la photo
                let categoriePhoto = document.getElementById("categorie").value;
                let indiceCategorie = nomsCategories.indexOf(categoriePhoto);
            //stockage de d'indice de la catéorie
                const categoryId = indicesCategories[indiceCategorie];
            // utilisation de la méthode FormData() pour constituer le body
                let formData = new FormData(photoSubmit);
            // On intègre les donnée du formulaire au formData
                formData.append("title", title);
                formData.append("image", imageUrl);
                formData.append("category", categoryId);
            // utilisation de la fonction faisant appel à l'API pour l'ajout de projet au backend
            ajoutPhoto(formData).then(() => {
                getAllWorks().then((newworks) => {
                    worksGenerator(newworks);
                    modaleGalleryGenerator(newworks);
                    fermetureModale();
                    fermetureApercu();
                    boutonEnvoie.disabled = true;
                    document.getElementById("formulaire-ajout-image").reset();
                });
            });
    });