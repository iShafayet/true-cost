export const ComparableCategory = {
  TECHNOLOGY: "TECHNOLOGY",
  HUMANITARIAN: "HUMANITARIAN",
  GENERAL: "GENERAL",
  WHIMSICAL: "WHIMSICAL",
};

export type Comparable = {
  name: string;
  category: string;
  conversionFn: (enteredAmount: number) => string;
};

export type Compared = {
  name: string;
  result: string;
};

export type UserIncomeDetails = {
  monthlyIncome: number;
  hourlyIncome: number;
};
