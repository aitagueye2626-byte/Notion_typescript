// 1. Texte avec guillemets doubles ou simples
let nomClient = "Aita";
let pays = 'Sénégal';
// 2. Texte avec backticks (` `) pour insérer des variables avec ${ }
let messageAccueil = `Bienvenue ${nomClient} depuis le ${pays} !`;
console.log(messageAccueil);
export {};
