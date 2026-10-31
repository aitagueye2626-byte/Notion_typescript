// Interface et type : deux façons de décrire la forme d'un objet
// Les deux s'utilisent exactement de la même façon
let aita1 = { nom: "Aita", age: 21 };
let aita2 = { nom: "Aita", age: 21 };
console.log(aita1, aita2);
// 3. Une interface et un type avec la même forme sont interchangeables
let viaType = aita1; // ✅ structurellement identiques
console.log("Interchangeable :", viaType.nom);
// Les deux déclarations se cumulent
let u = { id: 1, email: "aita@exemple.com" };
console.log("Fusion :", u);
let e = { nom: "Moussa", age: 25, poste: "Développeur" };
console.log("Employé :", e);
let e2 = { nom: "Fatou", age: 24, poste: "Designer" };
console.log("Employé (type) :", e2);
let chat = { nom: "Minou", cri: "Miaou" };
console.log("Animal :", chat);
export {};
