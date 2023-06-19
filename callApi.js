export async function getAllWorks() {
    // Récupération des données provenant du back-end pour les travaux
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
    return works;
};

export async function getAllCategories() {
    // Récupération des données provenant du back-end pour les catégories
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json();
    return categories;
};

export async function deleteWork(workId) {
    let storedToken = window.localStorage.getItem("token");
    let url = "";
    let httpOptions = "";
    let bearer = "Bearer " + storedToken;
    console.log(bearer);

    if (storedToken !== null) {
        const headersContent = {
        "Accept": "*/*",
        "Authorization": bearer
        };
        console.log(headersContent);
        const headers = new Headers(headersContent);
        console.log(headers);
        httpOptions = {
        method : "DELETE",
        headers: headers,
        };
        url = "http://localhost:5678/api/works/" + workId;
        console.log(httpOptions);
    }

    try {   
        const response = await fetch(url, httpOptions);
        console.log(response.status);
        if (response.status === 200) {
            let works = await getAllWorks();
                // Récupération de l'élément du DOM qui accueillera les travaux et suppression du contenu avant integration dynamique du contenu
                const sectionWorks = document.querySelector(".gallery");
                sectionWorks.innerHTML= "";
                worksGenerator(works);
                // Récupération dans le DOM de la balise modale_galerie_images  et suppression du contenu avant integration dynamique du contenu
                const galleireModaleImage = document.querySelector(".modale_galerie_images");
                galleireModaleImage.innerHTML= "";
                modaleGalleryGenerator(works);
        } else {
            throw new Error(response.status);
        }
    } catch (error) {
        console.error(error);
    }
};


   
   
export async function ajoutPhoto() {
   // Récupération dans le DOM du bouton d'envoie du formulaire d'ajout de photo 
    let photoSubmit = document.forms.namedItem("formulaire-ajout-image");
    console.log(photoSubmit);

    
    
    // Ajout d'un listener au bouton de submission du formulaire d'ajout de photo
    photoSubmit.addEventListener("submit", async (e) => {
        e.preventDefault();
        let responseApi = document.querySelector(".reponse-api");
        let formData = new FormData(photoSubmit);
  
        // récupération des éléments qui constituront le body de la requête POST
            //stockage du titre   
            const title = document.getElementById("titre").value;

            // récupération dans le DOM du file imput
            const selectedFile = document.getElementById("image").files[0];
            //stockage de l'URL
            const imageURL = window.URL.createObjectURL(selectedFile);

            // récupération de la liste des catégories à partir du backend
            let categories = await getAllCategories();
            let nomsCategories = categories.map(categorie => categorie.name);
            let indicesCategories = categories.map(categorie => categorie.id);
            // recherche de la catéogie concernée par la photo
            let categoriePhoto = document.getElementById("categorie").value;
            let indiceCategorie = nomsCategories.indexOf(categoriePhoto);

            //stockage de d'indice de la catéorie
            const categoryId = indicesCategories[indiceCategorie];
            console.log(categoryId)
;  
        formData.append("title", title);
        formData.append("imageURL", imageURL);
        formData.append("categoryId", categoryId);
    
        let storedToken = window.localStorage.getItem("token");
        let url = "http://localhost:5678/api/works";
        let httpOptions = "";
        let bearer = "Bearer " + storedToken;
        console.log(bearer);

        if (storedToken !== null) {
            const headersContent = {
                "Accept": "*/*",
                "Content-Type": "multipart/form-data",
                "Authorization": bearer
            };
            console.log(headersContent);
            const headers = new Headers(headersContent);
            console.log(headers);
            httpOptions = {
            method: "POST",
            headers: headers,
            // body: formData
            };
            console.log(httpOptions);
        }
    
            // try {   
            //     const response = await fetch(url, httpOptions);
            //     console.log(response.status);
            //     if (response.status === 201) {
            //         let works = await getAllWorks();
            //             // Récupération de l'élément du DOM qui accueillera les travaux et suppression du contenu avant integration dynamique du contenu
            //             const sectionWorks = document.querySelector(".gallery");
            //             sectionWorks.innerHTML= "";
            //             worksGenerator(works);
            //             // Récupération dans le DOM de la balise modale_galerie_images  et suppression du contenu avant integration dynamique du contenu
            //             const galleireModaleImage = document.querySelector(".modale_galerie_images");
            //             galleireModaleImage.innerHTML= "";
            //             modaleGalleryGenerator(works);
            //     } else {
            //         throw new Error(response.status);
            //     }
            // } catch (error) {
            //     console.error(error);
            // }


       });
  


    

    
}