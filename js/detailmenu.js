const urlParams = new URLSearchParams(window.location.search);
const onlyMenu = Number(urlParams.get("onlyMenu"));
console.log(onlyMenu); //on teste si ça affiche bien le numéro du menu détaillé demandé
