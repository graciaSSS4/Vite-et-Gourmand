import Route from "./Route.js";

//Définir ici les routes
export const allRoutes = [
  new Route("/", "Accueil", "pages/home.html", []),
  new Route("/menu", "Nos menus", "pages/menus/menu.html", [], "/js/menus/menu.js"),
  new Route("/detailmenu", "Détail Menu", "pages/menus/detailmenu.html", [], "/js/menus/detailmenu.js"),
  new Route("/contact", "Nous contacter", "pages/contact.html", [], "/js/contact.js"),
  new Route("/signin_signup", "Inscription", "pages/auth/signin_signup.html", [], "/js/auth/signin_signup.js"), // rajouter ["disconnected"]
  new Route("/account", "Mon compte", "pages/auth/account.html", [], "/js/auth/account.js"),
  new Route("/employee", "Espace employé", "pages/spaces/employee.html", [], "/js/spaces/employee.js"),
  new Route("/admin", "Espace admin", "pages/spaces/admin.html", [], "/js/spaces/admin.js"),
  new Route("/editPassword", "Changement de mot de passe", "pages/auth/editPassword.html", [], "/js/auth/editPassword.js"),
  new Route("/forgotPassword", "Mot de passe oublié", "pages/auth/forgotPassword.html", [], "/js/auth/forgotPassword.js"),
  new Route("/allcommand", "Vos commandes", "pages/commandes/allcommand.html", [], "/js/commandes/allcommand.js"),
  new Route("/commander", "Commander", "pages/commandes/commander.html", [], "/js/commandes/commander.js"),
  new Route("/mlegals", "Mentions légales", "pages/legal/legalment.html", []),
  new Route("/cgv", "CGV", "pages/legal/cgv.html", []),
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Vite & Gourmand";
