// Voici un tableau avec 2 informations : [Prénom, Ville]
let monTableau = ["Aita", "Dakar"];
// --- MÉTHODE 1 : Façon normale (2 lignes avec [0] et [1]) ---
let prenomNormal = monTableau[0];
let villeNormale = monTableau[1];
console.log("Façon normale :", prenomNormal, "-", villeNormale);
// --- MÉTHODE 2 : Avec destructuration (1 seule ligne, sans [0] ni [1]) ---
let [monPrenom, maVille] = monTableau;
console.log("Avec destructuration :", monPrenom, "-", maVille);
export {};
