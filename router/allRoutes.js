import Route from "./Route.js";

//Définir ici les routes
export const allRoutes = [
  new Route("/", "Accueil", "pages/home.html", []),
  new Route("/menu", "Nos menus", "pages/menu.html", [], "/js/menu.js"),
  new Route("/contact", "Nous contacter", "pages/contact.html", [], "/js/contact.js"),

  new Route("/signup_signup", "Inscription", "pages/auth/signup_signup.html", [], "/js/auth/signup_signup.js"), // rajouter ["disconnected"]
  new Route("/account", "Mon compte", "pages/auth/account.html", ["client", "admin"]),
  new Route("/editPassword", "Changement de mot de passe", "pages/auth/editPassword.html", ["client", "admin"]),
  new Route("/allcommand", "Vos commandes", "pages/commandes/allcommand.html", ["client"]),
  new Route("/commander", "Commander", "pages/commandes/commander.html", ["client"]),
  new Route("/mlegals", "Mentions légales", "pages/legal/legalment.html", []),
  new Route("/cgv", "CGV", "pages/legal/cgv.html", []),
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Vite & Gourmand";
