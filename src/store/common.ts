import { Writable, writable } from "svelte/store";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../utility/store-utils.js";
import type { UserIncomeDetails } from "../model/common.js";

const SELECTED_CATEGORIES_LOCALSTORAGE_KEY = "--true-cost--selected-cats";

export const selectedCategoryList: Writable<string[]> = writable(
  getLocalStorageItem(SELECTED_CATEGORIES_LOCALSTORAGE_KEY) ?? []
);

selectedCategoryList.subscribe((value) => {
  setLocalStorageItem(SELECTED_CATEGORIES_LOCALSTORAGE_KEY, value);
});

const INCOME_LOCALSTORAGE_KEY = "--true-cost--income";

export const userIncomeDetails: Writable<UserIncomeDetails> = writable(
  getLocalStorageItem(INCOME_LOCALSTORAGE_KEY) ?? {
    monthlyIncome: 0,
    hourlyIncome: 0,
  }
);

userIncomeDetails.subscribe((value) => {
  setLocalStorageItem(INCOME_LOCALSTORAGE_KEY, value);
});
