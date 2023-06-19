export async function getAllWorks() {
    // Récupération des données provenant du back-end pour les travaux
    const response = await fetch("http://localhost:5678/api/works")
    const works = await response.json();
    return works;
}

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
}
   
   
