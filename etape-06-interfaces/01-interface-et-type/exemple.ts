// Interface et type : deux façons de décrire la forme d'un objet

// 1. Avec un alias de type
type PersonneType = {
    nom: string;
    age: number;
};

// 2. Avec une interface
interface PersonneInterface {
    nom: string;
    age: number;
}

// Les deux s'utilisent exactement de la même façon
let aita1: PersonneType = { nom: "Aita", age: 21 };
let aita2: PersonneInterface = { nom: "Aita", age: 21 };
console.log(aita1, aita2);

// 3. Une interface et un type avec la même forme sont interchangeables
let viaType: PersonneInterface = aita1; // ✅ structurellement identiques
console.log("Interchangeable :", viaType.nom);

// 4. Différence 1 : l'interface peut être FUSIONNÉE (declaration merging)
interface Utilisateur {
    id: number;
}

interface Utilisateur {
    email: string;
}

// Les deux déclarations se cumulent
let u: Utilisateur = { id: 1, email: "aita@exemple.com" };
console.log("Fusion :", u);

// Un type ne peut pas être redéclaré
// type UtilisateurType = { id: number };
// type UtilisateurType = { email: string }; // ❌ Duplicate identifier

// 5. Différence 2 : le type accepte les unions et les primitifs
type Statut = "actif" | "inactif";      // ✅ impossible avec interface
type Identifiant = string | number;     // ✅
type Point = [number, number];          // ✅ tuple

// interface StatutInterface = "actif" | "inactif"; // ❌ syntaxe invalide

// 6. Différence 3 : l'interface peut étendre plusieurs types (voir leçon 6.6)
interface Employe extends PersonneInterface {
    poste: string;
}
let e: Employe = { nom: "Moussa", age: 25, poste: "Développeur" };
console.log("Employé :", e);

// 7. Différence 4 : le type accepte l'intersection et les utilitaires
type EmployeType = PersonneType & { poste: string };
let e2: EmployeType = { nom: "Fatou", age: 24, poste: "Designer" };
console.log("Employé (type) :", e2);

// 8. Différence 5 : les messages d'erreur et l'affichage de l'interface sont plus lisibles
//    (l'interface garde son NOM, le type peut être développé en interne)

// 9. Quand utiliser quoi ?
// - Interface : objets, classes, API publique, extension / fusion
// - Type    : unions, tuples, primitifs, types calculés (Mapped, Conditional)

// 10. Les deux se combinent sans problème
interface Animal {
    nom: string;
}

type AnimalAvecCri = Animal & {
    cri: string;
};

let chat: AnimalAvecCri = { nom: "Minou", cri: "Miaou" };
console.log("Animal :", chat);
