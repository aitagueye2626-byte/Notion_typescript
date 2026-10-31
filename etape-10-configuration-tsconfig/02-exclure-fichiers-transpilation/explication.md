# 10.2 - Exclure des fichiers de transpilation (`exclude`)

La clé **`exclude`** (placée au niveau racine du `tsconfig.json`) permet de filtrer les fichiers résolus par la clé `include`, afin d'éviter qu'ils soient transpilés en JavaScript.

```json
{
  "include": ["src/**/*"],
  "exclude": [
    "src/secret.ts",
    "*.dev.ts",
    "**/*.dev.ts",
    "node_modules"
  ]
}
```

Voici l'explication précise des 4 cas demandés :

---

## 1. Exclure un fichier cible précis

Pour exclure un fichier unique bien déterminé, on renseigne son **chemin relatif direct** :

```json
{
  "exclude": [
    "src/ancien-script.ts",
    "config/secret.dev.ts"
  ]
}
```

- Seul ce fichier précis sera ignoré par le processus de transpilation.
- Les autres fichiers du même dossier continuent d'être compilés normalement.

---

## 2. Exclure tous les fichiers `.dev.ts` du dossier racine (`*.dev.ts`)

Pour exclure les fichiers ayant l'extension `.dev.ts` situés **uniquement dans le dossier courant (racine)** :

```json
{
  "exclude": [
    "*.dev.ts"
  ]
}
```

- Le joker simple `*` remplace n'importe quelle séquence de caractères, **sans traverser les séparateurs de dossiers (`/`)**.
- ✅ Exclut : `./database.dev.ts`, `./server.dev.ts`.
- ❌ N'exclut pas : `src/database.dev.ts` (car il est dans un sous-dossier).

---

## 3. Exclure les fichiers `.dev.ts` de TOUT répertoire (`**/*.dev.ts`)

Pour exclure de façon récursive tous les fichiers `.dev.ts`, **quelle que soit leur profondeur dans l'arborescence** :

```json
{
  "exclude": [
    "**/*.dev.ts"
  ]
}
```

- Le joker double `**/` indique n'importe quel dossier ou sous-dossier (0, 1, 2 niveaux ou plus).
- ✅ Exclut : `./serveur.dev.ts`, `src/serveur.dev.ts`, `src/modules/auth/auth.dev.ts`, etc.
- C'est le motif standard pour exclure des scripts de développement, des mocks ou des fichiers temporaires.

---

## 4. Exclure les fichiers de `node_modules`

Pour ignorer l'ensemble des dépendances installées par npm / yarn / pnpm :

```json
{
  "exclude": [
    "node_modules"
  ]
}
```

### ⚠️ Le piège critique de TypeScript avec `node_modules` :
- Par défaut, si la clé `exclude` **n'est pas mentionnée**, TypeScript exclut automatiquement `["node_modules", "bower_components", "jspm_packages", "<outDir>"]`.
- **Mais dès que vous écrivez votre propre tableau `exclude: [...]`**, TypeScript **écrase** sa liste par défaut !
- Par conséquent, vous devez **toujours penser à réécrire explicitement `"node_modules"`** dans votre tableau `exclude`, sous peine de voir le compilateur inspecter ou transpiler par erreur les milliers de fichiers de vos dépendances !

---

## 5. Règles de priorité et pièges à connaître

| Situation | Comportement |
| :-------- | :----------- |
| **`files` vs `exclude`** | **`files` gagne toujours** ! Si un fichier est listé dans `files`, `exclude` ne peut pas l'exclure. |
| **`import` dans le code** | Si un fichier inclus (ex: `main.ts`) fait un `import { x } from "./mon-fichier-exclu"`, TypeScript **chargera quand même** le fichier exclu pour vérifier ses types ! L'exclusion empêche l'inclusion automatique globale, mais pas la résolution des dépendances directes. |
| **Fichiers `.d.ts`** | Exclure un fichier n'empêche pas TypeScript d'aller chercher ses types si un package y fait référence. |

---

## 6. Synthèse des motifs glob

| Motif | Portée | Cible |
| :---- | :----- | :---- |
| `"src/test.ts"` | Fichier unique | Uniquement `src/test.ts` |
| `"*.dev.ts"` | Dossier courant | `serveur.dev.ts` à la racine |
| `"**/*.dev.ts"` | Partout récursivement | Tout fichier `.dev.ts` à n'importe quel niveau |
| `"node_modules"` | Dossier de dépendances | Tout le contenu de `node_modules` |
