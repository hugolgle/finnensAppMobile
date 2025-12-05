import moment from "moment";

// -----------------------------

export const months = [
  { label: "Janvier", value: "01" },
  { label: "Février", value: "02" },
  { label: "Mars", value: "03" },
  { label: "Avril", value: "04" },
  { label: "Mai", value: "05" },
  { label: "Juin", value: "06" },
  { label: "Juillet", value: "07" },
  { label: "Août", value: "08" },
  { label: "Septembre", value: "09" },
  { label: "Octobre", value: "10" },
  { label: "Novembre", value: "11" },
  { label: "Décembre", value: "12" },
];

export const currentDate = () => {
  const theDate = moment();
  return {
    day: theDate.date().toString().padStart(2, "0"),
    month: (theDate.month() + 1).toString().padStart(2, "0"),
    year: theDate.year(),
  };
};

export const timestamp = (date: Date) => {
  const now = new Date().getTime();
  const d = new Date(date).getTime();
  const diff = Math.floor((now - d) / 1000);

  const intervals = [
    { label: "an", seconds: 31536000 },
    { label: "mois", seconds: 2592000 },
    { label: "semaine", seconds: 604800 },
    { label: "jour", seconds: 86400 },
    { label: "heure", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "seconde", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diff / interval.seconds);
    if (count >= 1) {
      return `Il y a ${count} ${interval.label}${
        count > 1 && interval.label !== "mois" ? "s" : ""
      }`;
    }
  }
  return "À l'instant";
};
// -----------------------------

export function alphaSort(arrayData: any) {
  return arrayData?.sort((a: any, b: any) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  });
}

export function translate(word: string) {
  let name = "";
  switch (word) {
    case "deposit":
      name = "Dépôt";
      break;
    case "withdraw":
      name = "Retrait";
      break;
    case "transfer":
      name = "Transfert";
      break;
    case "interest":
      name = "Intérêts";
      break;
    case "expense":
      name = "Dépense";
      break;
    case "income":
      name = "Revenu";
      break;
    case "dividend":
      name = "Dividende";
      break;
    case "buy":
      name = "Achat";
      break;
    case "amount":
      name = "Montant";
      break;
    case "percentage":
      name = "Pourcentage";
      break;
    case "sell":
      name = "Vente";
      break;
    case "general_question":
      name = "Question générale";
      break;
    case "technical_problem":
      name = "Problème technique";
      break;
    case "feature_request":
      name = "Demande de fonctionnalité";
      break;
    case "credit":
      name = "Crédit";
      break;
    case "epargn":
      name = "Épargne";
      break;
    case "finance":
      name = "Finance";
      break;
    case "heritage":
      name = "Patrimoine";
      break;
    case "investment":
      name = "Investissement";
      break;
    case "list":
      name = "Liste";
      break;
    case "pieChart":
      name = "Camembert";
      break;
    case "lineChart":
      name = "Graphique linéaire";
      break;
    case "progressBar":
      name = "Barre de progression";
      break;
    case "savings":
      name = "Mis de coté";
      break;
    case "needs":
      name = "Dépense fixe";
      break;
    case "wants":
      name = "Dépense loisir";
      break;
    case "regulated":
      name = "Réglementé";
      break;
    case "unregulated":
      name = "Non réglementé";
      break;

    default:
      name = "";
  }

  return name;
}

export function updateMonth(date: any, delta: any) {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + delta);
  return newDate;
}

export function convertDate(dateObj: Date): string {
  if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) return "";

  const year = dateObj.getFullYear();
  const monthIndex = dateObj.getMonth();
  const monthName = months[monthIndex]?.label || "";

  return `${monthName} ${year}`;
}

export const getMonthsOfYear = (year: any) => {
  return Array.from({ length: 12 }, (_, i) => {
    const date = new Date(year, i, 1);
    const monthLabel = date.toLocaleString("fr", { month: "short" });

    return { date, month: { label: monthLabel }, year };
  });
};

export function getInitials(name = "", lastname = "") {
  const initialPrenom = name.charAt(0).toUpperCase();
  const initialNom = lastname.charAt(0).toUpperCase();

  return `${initialPrenom}${initialNom}`;
}
