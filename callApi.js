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

export async function deleteWorkAPI(workId) {
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
    } catch (error) {
        console.error(error);
    }
}; 
   
export async function ajoutPhoto() {
   // Récupération dans le DOM du bouton d'envoie du formulaire d'ajout de photo et du boputon d'envoie du formulaire
    const photoSubmit = document.forms.namedItem("formulaire-ajout-image");
 
    // Ajout d'un listener au bouton de submission du formulaire d'ajout de photo
    photoSubmit.addEventListener("submit", async (e) => {
        e.preventDefault();    
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
            // On intègre les donnée fu formulaire au formData
            formData.append("title", title);
            formData.append("image", imageUrl);
            formData.append("category", categoryId);

        // récupérations des autres éléments constitutifs des options de la requête
        let storedToken = window.localStorage.getItem("token");
        let bearer = "Bearer " + storedToken;
        let httpOptions = "";

        if (storedToken !== null) {
            const headersContent = {
                "Accept": "*/*",
                "Authorization": bearer
            };
            const headers = new Headers(headersContent);
            httpOptions = {
                method: "POST",
                headers: headers,
                body: formData
            };
            console.log(httpOptions);
        }
        try {   
            const response = await fetch("http://localhost:5678/api/works", httpOptions);
            console.log(response.status);
            
            if (response.status === 201) {
                alert('image correctement ajoutée');
            } else {
                alert(response.status);
                throw new Error(response.status);
            }
            return false;
        } catch (error) {
            console.error(error);
        }
    });    
    
};