import Route from "./Route.js";

//Définir ici les routes
export const allRoutes = [
  new Route("/", "Accueil", "pages/home.html", []),
  new Route("/menu", "Nos menus", "pages/menu.html", [], "/js/menu.js"),
  new Route("/contact", "Nous contacter", "pages/contact.html", []),
  new Route("/signin", "Connexion", "pages/auth/signin.html", ["disconnected"], "/js/auth/signin.js"),
  new Route("/signup", "Inscription", "pages/auth/signup.html", ["disconnected"], "/js/auth/signup.js"),
  new Route("/account", "Mon compte", "pages/auth/account.html", ["client", "admin"]),
  new Route("/editPassword", "Changement de mot de passe", "pages/auth/editPassword.html", ["client", "admin"]),
  new Route("/allcommand", "Vos commandes", "pages/commandes/allcommand.html", ["client"]),
  new Route("/commander", "Commander", "pages/commandes/commander.html", ["client"]),
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Vite & Gourmand";
