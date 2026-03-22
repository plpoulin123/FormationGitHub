const liste = document.getElementById("postsList");
const btn_getPosts = document.getElementById("getPosts");

const showLoading = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getPosts = async () => {
  liste.textContent = "Chargement...";

  try {
    // Le showLoading(1500) sert juste pour test de UI pour faire affiche le message de chargement au moins 1.5 secondes.
    // On ne ferait jamais ça en production.
    // On utilise de la déstructuration pour remplir réponse. Les 2 promises sont dans un array [0,1].
    // La réponse est dans un array [0], donc elle se set par la promesse[0] de l'array. La promesse de
    // showLoading (promesse[1]) est juste carrément oubliée et ne sert à rien.

    // Sinon, on pourrait faire la même chose en plus de lignes sans déstructuration :
    //const résultats = await Promise.all([fetch(...), attendre(1500)])
    //const réponse = résultats[0]
    const [réponse] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/posts"),
      showLoading(1500),
    ]);

    if (!réponse.ok) {
      throw new Error(`Erreur HTTP : ${réponse.status}`);
    }

    const posts = await réponse.json();
    renderPosts(posts);
  } catch (erreur) {
    liste.textContent = "Erreur de chargement ❌";
    console.log(erreur);
  }
};

const renderPosts = (posts) => {
  const fiveFirstPosts = posts.slice(0, 5);
  liste.innerHTML = fiveFirstPosts.map((p) => `<li>${p.title}</li>`).join("");
};

btn_getPosts.addEventListener("click", () => {
  getPosts();
});
