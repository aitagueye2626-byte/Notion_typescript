// Intersection de types : un objet doit posséder TOUTES les propriétés (symbole &)

// 1. Intersection de deux types
type Nommable = {
    nom: string;
};

type Ageable = {
    age: number;
};

type Personne = Nommable & Ageable;

let aita: Personne = {
    nom: "Aita",
    age: 21
    // ⚠️ Il FAUT les deux propriétés, sinon erreur
};
console.log("Personne :", aita);

// 2. Il manque une propriété -> erreur de compilation
// let incomplet: Personne = { nom: "Moussa" }; // ❌ Property 'age' is missing

// 3. Intersection de propriétés en conflit -> type impossible (never)
type A = { valeur: string };
type B = { valeur: number };
type Impossible = A & B;
// let x: Impossible = { valeur: "a" }; // ❌ aucun type ne satisfait string ET number

// 4. Intersection de littéraux -> never
type UnionLitterale = "oui" & "non"; // never
// let y: UnionLitterale = "oui"; // ❌

// 5. Intersection de primitifs
type Texte = string & { longueur: number }; // un string qui a aussi une propriété longueur

// 6. Intersection pour enrichir un type existant (pattern courant)
type Utilisateur = {
    id: number;
    email: string;
};

type UtilisateurAvecDates = Utilisateur & {
    creeLe: Date;
    modifieLe: Date;
};

let compte: UtilisateurAvecDates = {
    id: 1,
    email: "aita@exemple.com",
    creeLe: new Date(),
    modifieLe: new Date()
};
console.log("Compte :", compte.id, compte.email);

// 7. Intersection avec un type générique
function ajouterDateCreation<T extends object>(objet: T): T & { creeLe: Date } {
    return { ...objet, creeLe: new Date() };
}

let produit = ajouterDateCreation({ nom: "Cahier", prix: 1500 });
console.log("Produit :", produit.nom, produit.creeLe.getFullYear());

// 8. Intersection vs union
// A & B -> l'objet possède les propriétés de A ET de B (plus restrictif)
// A | B -> l'objet possède celles de A OU de B (plus permissif)
type Admin = { niveau: number } & Utilisateur; // doit avoir niveau ET id ET email
let admin: Admin = { niveau: 2, id: 2, email: "admin@exemple.com" };
console.log("Admin :", admin);

// 9. Combiner union et intersection avec des parenthèses
type Employe = { id: number };
type Contact = { email: string };
type Telephone = { tel: string };

// Un employé avec email OU téléphone
type EmployeJoignable = Employe & (Contact | Telephone);

let e1: EmployeJoignable = { id: 1, email: "a@b.com" };
let e2: EmployeJoignable = { id: 2, tel: "+221" };
// let e3: EmployeJoignable = { id: 3 }; // ❌ ni email ni tel
console.log(e1, e2);

// 10. Intersection avec des types de fonctions
type Log = (message: string) => void;
type LogHorodate = Log & { prefixe: string };

let logger: LogHorodate = Object.assign(
    (message: string) => console.log(logger.prefixe, message),
    { prefixe: "[LOG]" }
);
logger("Démarrage");

// 11. Récapitulatif
// & = ET  (toutes les propriétés)
// | = OU  (au moins une forme)
