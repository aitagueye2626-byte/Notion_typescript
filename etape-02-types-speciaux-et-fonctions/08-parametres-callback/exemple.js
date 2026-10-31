// --- 2 petites fonctions qui représentent des actions possibles ---
function sonnerALaPorte() {
    console.log("🔔 Ding dong ! Le livreur sonne à la porte.");
}
function appelerTelephone() {
    console.log("📱 Dring dring ! Le livreur t'appelle sur ton téléphone.");
}
// --- La fonction principale qui reçoit l'action (le callback) en 2ème paramètre ---
function commanderRepas(plat, actionFin) {
    console.log("🍕 Préparation de la commande :", plat);
    // Une fois le plat prêt, on exécute l'action choisie par le client (le callback) :
    actionFin();
}
// Client 1 : veut une Pizza et demande au livreur de SONNER À LA PORTE
commanderRepas("Pizza", sonnerALaPorte);
console.log("---");
// Client 2 : veut un Burger et demande au livreur d'APPELER AU TÉLÉPHONE
commanderRepas("Burger", appelerTelephone);
export {};
