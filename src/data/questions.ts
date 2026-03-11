export type Question = {
  id: number;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
};

export const questions: Question[] = [
  {
    id: 1,
    text: "Quel plan stratégique Intersport déploie-t-il (fusion avec Go Sport) en 2026 pour contrer la domination de Decathlon ?",
    options: ["New Horizon", "Core Plan", "Intersport 2030", "Apex Strategy"],
    correctAnswerIndex: 1,
    explanation: "Le 'Core Plan' vise à créer une synergie avec Go Sport et focalise l'enseigne sur le cyclisme, le ski et la randonnée pour concurrencer frontalement Decathlon."
  },
  {
    id: 2,
    text: "Quelle est la stratégie de différenciation d'Intersport appelée 'New Pathway' ?",
    options: ["Guerre des prix", "Marketing agressif", "Expertise, accompagnement et proximité", "Production délocalisée"],
    correctAnswerIndex: 2,
    explanation: "La stratégie 'New Pathway' veut se distinguer par une forte expertise de conseil, l'accompagnement personnalisé et la proximité avec la clientèle locale."
  },
  {
    id: 3,
    text: "Le parcours d'un vendeur technique s'articule autour de 4 étapes d'une 'ascension'. Lesquelles ?",
    options: [
      "Connaissances > Maîtrise > Conseil > Élite",
      "Débutant > Intermédiaire > Avancé > Expert",
      "Écoute > Orientation > Vente > Relation",
      "Découverte > Présentation > Négociation > Clôture"
    ],
    correctAnswerIndex: 0,
    explanation: "L'ascension du vendeur est structurée en 4 niveaux d'expertise : Connaissances, Maîtrise, Conseil, et Élite."
  },
  {
    id: 4,
    text: "Quelles sont les 4 phases du cycle de vente technique selon la présentation ?",
    options: [
      "Approche > Présentation > Négociation > Clôture",
      "Salutation > Démonstration > Argumentation > Vente",
      "Identifier le besoin > Analyser la composition > Expliquer les bénéfices > Finaliser/Fidéliser",
      "Écouter > Comprendre > Proposer > Conclure"
    ],
    correctAnswerIndex: 2,
    explanation: "C'est un cycle structuré : d'abord on Identifie le besoin, ensuite on Analyse la composition du produit, on Explique ses bénéfices concrets, puis on Finalise en fidélisant."
  },
  {
    id: 5,
    text: "Lequel de ces avantages caractérise la laine de Mérinos ?",
    options: ["Séchage ultra-rapide", "Élasticité inégalable", "Chaleur et thermorégulation", "Résistance extrême à l'abrasion"],
    correctAnswerIndex: 2,
    explanation: "Le Mérinos est une matière naturelle réputée pour sa très bonne isolation thermique (chaleur) et sa respirabilité naturelle limitant les odeurs."
  },
  {
    id: 6,
    text: "Parmi les matières synthétiques, laquelle est particulièrement reconnue pour sa forte résistance mécanique ?",
    options: ["Le Polyester", "Le Nylon", "Le Lycra", "L'Acrylique"],
    correctAnswerIndex: 1,
    explanation: "Le Nylon (polyamide) est une fibre synthétique très résistante face aux frottements et déchirures, souvent utilisée pour renforcer des vêtements techniques."
  },
  {
    id: 7,
    text: "Pourquoi conseille-t-on le Bambou comme matière textile lors des activités sportives ?",
    options: ["Pour son imperméabilité totale", "Pour son élasticité (effet stretch)", "Pour sa grande respirabilité", "Pour son pouvoir coupe-vent"],
    correctAnswerIndex: 2,
    explanation: "Le Bambou est une fibre d'origine naturelle appréciée pour sa grande douceur et son excellente respirabilité (évacuation de l'humidité)."
  },
  {
    id: 8,
    text: "Quel est l'intérêt de mélanger de la Laine Mérinos avec du Nylon ?",
    options: ["Allier la chaleur de la laine à la robustesse du synthétique", "Rendre le vêtement 100% imperméable", "Baisser radicalement le prix de production", "Empêcher le vêtement de décolorer au soleil"],
    correctAnswerIndex: 0,
    explanation: "Les mélanges (Blends) combinent le meilleur des deux mondes. Mérinos + Nylon permet d'avoir un vêtement chaud (Mérinos) tout en étant résistant (Nylon) pour la rando."
  },
  {
    id: 9,
    text: "Quel est l'atout numéro un du Polyester dans le vêtement de sport ?",
    options: ["L'isolation absolue", "Le séchage très rapide", "Sa composition 100% naturelle", "Son élasticité de plus de 500%"],
    correctAnswerIndex: 1,
    explanation: "Le polyester est une fibre synthétique peu coûteuse, hydrophobe, qui a l'avantage majeur d'évacuer vite la transpiration et de sécher très rapidement."
  },
  {
    id: 10,
    text: "Cas Pratique : Si un client souffre d'irritations cutanées sévères dues aux matières synthétiques, que lui recommandez-vous ?",
    options: ["Un t-shirt en Lycra", "Un mélange 50% Mérinos / 50% Polyester", "Une solution 100% Coton Bio", "Une polaire 100% Nylon"],
    correctAnswerIndex: 2,
    explanation: "Le Coton (idéalement bio) est très bien toléré par la peau, particulièrement en cas d'allergies ou d'irritations dues aux fibres synthétiques."
  }
];
