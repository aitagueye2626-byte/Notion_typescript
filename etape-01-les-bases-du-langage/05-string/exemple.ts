// 1. Texte avec guillemets doubles ou simples
let nomClient: string = "Aita";
let pays: string = 'Sénégal';

// 2. Texte avec backticks (` `) pour insérer des variables avec ${ }
let messageAccueil: string = `Bienvenue ${nomClient} depuis le ${pays} !`;

console.log(messageAccueil);
