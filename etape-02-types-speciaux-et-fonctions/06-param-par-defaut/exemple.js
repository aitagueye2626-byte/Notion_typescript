// Le paramètre "remise" a une valeur par défaut de 0 (si on ne le précise pas)
function calculerPrixFinal(prix, remise = 0) {
    return prix - remise;
}
// 1. Appel SANS préciser la remise -> utilise la valeur par défaut (0)
console.log("Prix sans remise :", calculerPrixFinal(5000));
// 2. Appel EN précisant la remise -> remplace la valeur par défaut par 1000
console.log("Prix avec remise :", calculerPrixFinal(5000, 1000));
export {};
