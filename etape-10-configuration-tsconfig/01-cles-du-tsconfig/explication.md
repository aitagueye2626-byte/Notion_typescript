# 10.1 - Les clés fondamentales du `tsconfig.json`

Le fichier **`tsconfig.json`** est le cœur de tout projet TypeScript. Il indique au compilateur `tsc` :
- quels fichiers inclure ou exclure du projet ;
- quelles options de transpilation appliquer (`compilerOptions`).

Voici l'explication détaillée des clés fondamentales demandées :

---

## 1. La clé `files`

La clé **`files`** (au niveau racine) spécifie une **liste explicite et fixe de chemins de fichiers** à inclure dans la compilation :

```json
{
  "files": [
    "src/index.ts",
    "src/types.ts"
  ]
}
```

### Caractéristiques de `files` :
- Accepte **uniquement des chemins de fichiers précis** (les motifs génériques *glob* comme `*` ou `**` ne sont **pas** autorisés).
- **Priorité absolue** : les fichiers listés dans `files` sont **toujours** compilés, même s'ils correspondent à un motif de la clé `exclude`.
- Idéal pour les petits projets ou pour cibler uniquement quelques points d'entrée très précis.

---

## 2. La clé `include`

La clé **`include`** (au niveau racine) permet d'inclure des fichiers en utilisant des **motifs de recherche (glob patterns)** :

```json
{
  "include": [
    "src/**/*",
    "tests/**/*.spec.ts"
  ]
}
```

### Syntaxe des motifs glob :
- `*` : n'importe quelle suite de caractères (sauf le séparateur de dossier `/`).
- `?` : un seul caractère.
- `**/` : n'importe quel dossier ou sous-dossier, à n'importe quelle profondeur d'arborescence.

> Si la clé `files` et la clé `include` sont toutes les deux omises, TypeScript inclut par défaut **tous les fichiers `.ts`, `.tsx`, `.d.ts`** du dossier courant et de ses sous-dossiers.

---

## 3. La clé `compilerOptions.rootDir`

La clé **`rootDir`** indique le **dossier racine commun de vos fichiers sources TypeScript** :

```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist"
  }
}
```

### À quoi sert `rootDir` ?
Il sert à **reproduire à l'identique l'arborescence des dossiers sources** dans le dossier de sortie (`outDir`).
- Par exemple, si vous compilez `src/services/auth.ts`, `tsc` produira `dist/services/auth.js`.
- Si un fichier source TypeScript se trouve en dehors du dossier défini par `rootDir` et doit être compilé, `tsc` lèvera une erreur (`File '...' is not under 'rootDir'`).

---

## 4. La clé `compilerOptions.removeComments`

Par défaut (`false`), le compilateur TypeScript conserve les commentaires de code (`//` et `/* ... */`) dans les fichiers `.js` générés.

Lorsque l'option est activée :

```json
{
  "compilerOptions": {
    "removeComments": true
  }
}
```

- Tous les commentaires sont **supprimés des fichiers JavaScript de sortie**.
- Cela réduit le poids des fichiers finaux distribués en production.

---

## 5. La clé `compilerOptions.noEmitOnError`

Par défaut (`false`), `tsc` génère quand même les fichiers JavaScript **même si le code contient des erreurs de typage TypeScript** !

Lorsque l'option est activée :

```json
{
  "compilerOptions": {
    "noEmitOnError": true
  }
}
```

- Si une **seule erreur de typage** subsiste dans votre projet, **aucun fichier `.js` n'est émis sur le disque**.
- C'est une excellente pratique pour garantir que du code défectueux ne puisse jamais se retrouver en production ou en phase de test.

---

## 6. Tableau récapitulatif

| Clé | Emplacement | Rôle | Valeur typique |
| :-- | :---------- | :--- | :------------- |
| `files` | Racine | Liste blanche stricte de fichiers cibles (pas de globs) | `["src/index.ts"]` |
| `include` | Racine | Motifs d'inclusion avec jokers (`*`, `**`) | `["src/**/*"]` |
| `rootDir` | `compilerOptions` | Racine des sources pour refléter l'arborescence dans `outDir` | `"./src"` |
| `removeComments` | `compilerOptions` | Retire tous les commentaires du code JavaScript émis | `true` |
| `noEmitOnError` | `compilerOptions` | Bloque l'émission de JS si une erreur de typage existe | `true` |
