// recupération des éléments form et submit du DOM 
    const loginForm = document.querySelector("#login-form");
    const loginButton = document.querySelector("#login-form-submit");
// ajout d'un event listener au bouton submit avec vérification de l'email et du mot de passe 
    loginButton.addEventListener("click", async (e) => {
        // Blockage du comportement par defaut du navigateur 
            e.preventDefault();
        // Création de l'objet qui servira de charge utile
            const login = {
                email: document.querySelector("#email").value,
                password: document.querySelector("#password").value,
            };
        // Conversion de la charge utile au format JSON
            const chargeUtile = JSON.stringify(login);
        // Envoie de la requête de connexion
            let response = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: chargeUtile
            });
        // Taitement de la réponse du serveur
            if (response.status == 200) {
                // Récupération de la réponse du serveur à lequête de connexion 
                    const data = await response.json();
                // Récupération du token issue de la réposnse du serveur en vue de son utilisaion
                    const token = data.token;
                // Enregistrement du token dans local storage 
                    window.localStorage.setItem("token", token);
                // Redirection vers la page d'accueil 
                    window.location.href = "index.html";
            } else if (response.status == 401) {
                // Affivhage du message d'erreur dans le DOM
                    const divErrorMessage = document.querySelector(".error-message");
                    divErrorMessage.innerHTML= "";
                    const errorMessage = document.createElement("p");
                    errorMessage.innerText = "Erreur dans le mot de passe";
                    divErrorMessage.appendChild(errorMessage);
            } else if (response.status == 404) {
                // Affivhage du message d'erreur dans le DOM
                    const divErrorMessage = document.querySelector(".error-message");
                    divErrorMessage.innerHTML= "";
                    const errorMessage = document.createElement("p");
                    errorMessage.innerText = "Erreur dans l’identifiant ou le mot de passe";
                    divErrorMessage.appendChild(errorMessage);
            };
    });
