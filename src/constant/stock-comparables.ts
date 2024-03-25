import { ComparableCategory, type Comparable } from "../model/common.js";

const internationalNumberFormat = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

const internationalAmountFormat = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});

function roundAmount(amount: number) {
  return Math.round(amount * 100) / 100;
}

function floorCountable(amount: number) {
  return Math.floor(amount);
}

function prettifyNumber(num: number) {
  return internationalNumberFormat.format(num);
}

function prettifyAmount(num: number) {
  return internationalAmountFormat.format(num);
}

const technologyComparableList: Comparable[] = [
  {
    name: "BD/playstation-2024",
    category: ComparableCategory.TECHNOLOGY,
    conversionFn(enteredAmount: number) {
      const FACTOR = 60000;
      const count = floorCountable(enteredAmount / FACTOR);

      if (count === 0) {
        return "Not even one Sony PlayStation in 2024.";
      } else if (count === 1) {
        return "A Sony PlayStation in 2024.";
      } else {
        return `${prettifyNumber(count)} Sony PlayStations in 2024.`;
      }
    },
  },
  {
    name: "BD/midranger-2024",
    category: ComparableCategory.TECHNOLOGY,
    conversionFn(enteredAmount: number) {
      const FACTOR = 30000;
      const count = floorCountable(enteredAmount / FACTOR);

      if (count === 0) {
        return "Not even a decent mid-range smartphone from Samsung in 2024.";
      } else if (count === 1) {
        return "A solid mid-range smartphone from Samsung in 2024.";
      } else {
        return `${prettifyNumber(
          count
        )} mid-range smartphones from Samsung in 2024.`;
      }
    },
  },
];

const generalComparableList: Comparable[] = [
  {
    name: "BD/white-bread-2020",
    category: ComparableCategory.GENERAL,
    conversionFn(enteredAmount: number) {
      const FACTOR = 80;
      const count = floorCountable(enteredAmount / FACTOR);

      if (count === 0) {
        return "Not even one packet of white bread in 2020.";
      } else if (count === 1) {
        return "A packet of white bread in 2020.";
      } else {
        return `${prettifyNumber(count)} packets of white bread in 2020.`;
      }
    },
  },
  {
    name: "BD/gold-2024",
    category: ComparableCategory.GENERAL,
    conversionFn(enteredAmount: number) {
      const FACTOR = 9780;
      const amount = roundAmount(enteredAmount / FACTOR);

      if (amount === 1) {
        return "One gram of 22 Karat gold in 2024.";
      } else {
        return `${prettifyAmount(amount)} grams of 22 Karat gold in 2024.`;
      }
    },
  },
  {
    name: "BD/rent-dhaka-2024",
    category: ComparableCategory.GENERAL,
    conversionFn(enteredAmount: number) {
      const FACTOR = 38_195;
      const count = floorCountable(enteredAmount / FACTOR);

      if (count === 0) {
        return "Not even one month of rent in a 3BHK apartment in Dhaka in 2024.";
      } else if (count === 1) {
        return "Around one month of rent in a 3BHK apartment in Dhaka in 2024.";
      } else {
        return `${prettifyNumber(count)} months of rent in a 3BHK apartment in Dhaka in 2024.`;
      }
    },
  },
];



const humanitarianComparableList: Comparable[] = [
  {
    name: "Charity/africa-polio-2024",
    category: ComparableCategory.HUMANITARIAN,
    conversionFn(enteredAmount: number) {
      const FACTOR = 105;
      const count = floorCountable(enteredAmount / FACTOR);

      if (count === 0) {
        return "";
      } else if (count === 1) {
        return "A 10-dose Polio Vaccines for a child in Africa in 2024.";
      } else {
        return `10-dose Polio Vaccines for ${prettifyNumber(
          count
        )} children in Africa in 2024.`;
      }
    },
  },
];

const whimsicalComparableList: Comparable[] = [];

export const stockComparableList: Comparable[] = [
  ...generalComparableList,
  ...technologyComparableList,
  ...whimsicalComparableList,
  ...humanitarianComparableList,
];
