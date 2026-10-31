# 9.1 - Introduction aux Décorateurs

Un **décorateur** est une fonction spéciale préfixée par le symbole **`@`** qui permet de modifier, observer ou enrichir une classe, une méthode, une propriété ou un paramètre au moment de son chargement (au moment où le fichier est évalué par JavaScript).

Il s'agit d'une forme de **métaprogrammation** très populaire dans des frameworks modernes comme **Angular**, **NestJS**, **TypeORM** ou **Prisma**.

---

## 1. À quoi sert un décorateur ?

Au lieu de répéter du code d'infrastructure (journalisation, validation de données, vérification d'authentification, injection de dépendances) dans chaque méthode ou classe, on "décore" l'élément pour lui injecter ce comportement de manière déclarative.

```typescript
// Exemple illustratif du style déclaratif :
@Controller("/utilisateurs")
class UtilisateurController {
    @Inject() private service!: UtilisateurService;

    @Get("/:id")
    @Authorize(["admin"])https://github.com/aitagueye2626-byte/Notion_typescript.git
    recuperer(@Param("id") id: string) { ... }
}
```

---

## 2. Configuration : `experimentalDecorators`

Historiquement, TypeScript a introduit les décorateurs sous forme expérimentale (basée sur une proposition de standardisation). Pour les utiliser, il faut activer l'option dans le fichier `tsconfig.json` :

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "experimentalDecorators": true
  }
}
```

> **Note TypeScript 5.0+ :** TypeScript supporte également la spécification standard ECMAScript Stage 3 (qui ne nécessite pas `experimentalDecorators`), mais l'immense majorité des projets (Angular, NestJS) s'appuie encore sur le mode expérimental.

---

## 3. Les différents types de décorateurs

Selon l'élément auquel on applique le symbole `@`, la fonction décorateur reçoit des arguments différents :

| Type de décorateur | Emplacement | Signature reçue (arguments) |
| :----------------- | :---------- | :-------------------------- |
| **Classe**         | `@Decorateur class X {}` | `(target: Function)` |
| **Propriété**      | `@Decorateur nom: string` | `(target: any, propertyKey: string)` |
| **Méthode**        | `@Decorateur maMethode() {}` | `(target: any, propertyKey: string, descriptor: PropertyDescriptor)` |
| **Accesseur**      | `@Decorateur get nom() {}` | `(target: any, propertyKey: string, descriptor: PropertyDescriptor)` |
| **Paramètre**      | `fn(@Decorateur x: number)` | `(target: any, propertyKey: string, parameterIndex: number)` |

---

## 4. Quand le décorateur est-il exécuté ?

Un décorateur est exécuté **une seule fois, au chargement de la classe** (à la définition du module), et **NON PAS** à chaque appel de méthode ou à chaque `new`.

Il s'exécute donc à la compilation / lecture du script, configurant la classe avant toute instanciation.

---

## 5. Points à retenir

- Un décorateur est simplement une fonction JavaScript appelée avec `@NomDuDecorateur`.
- Nécessite `"experimentalDecorators": true` dans le `tsconfig.json`.
- Apporte une syntaxe élégante et réutilisable pour la séparation des préoccupations (*Separation of Concerns*).
- S'exécute à l'initialisation de la classe, pas à chaque instanciation.
