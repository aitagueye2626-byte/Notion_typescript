// 10.2 - Démonstration des règles d'exclusion de fichiers

// Ce fichier simule un module de production inclus dans la transpilation
interface ConfigurationSysteme {
    nomApplication: string;
    modeProduction: boolean;
    fichiersExclusAutorises: string[];
}

const configApp: ConfigurationSysteme = {
    nomApplication: "Formation TypeScript",
    modeProduction: true,
    fichiersExclusAutorises: [
        "fichier-cible.ts",       // Exclure un fichier précis
        "*.dev.ts",               // Exclure les .dev.ts de la racine
        "**/*.dev.ts",            // Exclure les .dev.ts partout
        "node_modules"            // Exclure les dépendances externes
    ]
};

console.log("Configuration des exclusions du projet :");
configApp.fichiersExclusAutorises.forEach((regle, index) => {
    console.log(` ${index + 1}. Motif d'exclusion : ${regle}`);
});

// Explication de la vérification des types :
function verifierMotifExclusion(chemin: string, motif: string): boolean {
    if (motif === "*.dev.ts") {
        return chemin.endsWith(".dev.ts") && !chemin.includes("/");
    }
    if (motif === "**/*.dev.ts") {
        return chemin.endsWith(".dev.ts");
    }
    if (motif === "node_modules") {
        return chemin.startsWith("node_modules/");
    }
    return chemin === motif;
}

// Tests des motifs globaux
const cheminsDeTest = [
    "serveur.dev.ts",
    "src/database.dev.ts",
    "src/index.ts",
    "node_modules/express/index.d.ts",
    "fichier-cible.ts"
];

console.log("\n--- Simulation du filtre exclude ---");
cheminsDeTest.forEach((chemin) => {
    const excluParFichierCible = verifierMotifExclusion(chemin, "fichier-cible.ts");
    const excluParDevRacine = verifierMotifExclusion(chemin, "*.dev.ts");
    const excluParDevPartout = verifierMotifExclusion(chemin, "**/*.dev.ts");
    const excluParNodeModules = verifierMotifExclusion(chemin, "node_modules");

    const estExclu = excluParFichierCible || excluParDevRacine || excluParDevPartout || excluParNodeModules;
    console.log(`Fichier: '${chemin}' -> ${estExclu ? "❌ EXCLU" : "✅ INCLUS"}`);
});
