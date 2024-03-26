<script lang="ts">
  import IconButton from "@smui/icon-button";
  import Textfield from "@smui/textfield";
  import type { Compared, UserIncomeDetails } from "src/model/common.js";
  import { stockComparableList } from "../../constant/stock-comparables.js";
  import {
    selectedCategoryList,
    userIncomeDetails,
  } from "../../store/common.js";
  import { CommonConstant } from "../../constant/common-constants.js";
  import { showAlert } from "../../store/ui.js";

  let localSelectedCategoryList: string[] = [];
  let localUserIncomeDetails: UserIncomeDetails = {
    monthlyIncome: 0,
    hourlyIncome: 0,
  };

  selectedCategoryList.subscribe((value) => {
    localSelectedCategoryList = value;
  });

  userIncomeDetails.subscribe((value) => {
    localUserIncomeDetails = value;
  });

  // Prepare comparable list
  const comparableList = stockComparableList;

  // UI Bindings
  let enteredAmount = 0;

  // Computed and flags
  let shouldShowResults = false;
  let refinedInputAmount = 0;
  let fullComparedList: Compared[] = [];
  let comparableHead = 0;
  let comparedList: Compared[] = [];

  function amountEntered(e) {
    shouldShowResults = false;
  }

  function computeHourlyIncomeBasedCompared(
    refinedInputAmount: number
  ): Compared[] {
    let result = "";
    if (localUserIncomeDetails.hourlyIncome <= 0) {
      return [];
    }
    const hours = Math.floor(
      refinedInputAmount / localUserIncomeDetails.hourlyIncome
    );
    if (hours < 1) {
      result = `Less than one hour of your time!`;
    } else if (hours === 1) {
      result = `An hour of your time!`;
    } else {
      result = `${hours} hours of your time!`;
    }
    return [
      {
        name: "Computed/hourly",
        result,
      },
    ];
  }

  function computeMonthlyIncomeBasedCompared(
    refinedInputAmount: number
  ): Compared[] {
    let result = "";
    if (localUserIncomeDetails.monthlyIncome <= 0) {
      return [];
    }
    const months = refinedInputAmount / localUserIncomeDetails.monthlyIncome;

    if (months < 1) {
      const percentage = Math.round(months * 100);
      result = `${percentage}% of your monthly salary!`;
    } else if (Math.floor(months) === 1) {
      result = `Around a month's salary!`;
    } else {
      result = `Your ${Math.round(months)} month's salary!`;
    }
    return [
      {
        name: "Computed/monthly",
        result,
      },
    ];
  }

  function prepareFullComparableList() {
    refinedInputAmount = parseFloat(String(enteredAmount));

    comparableHead = 0;
    let stockComparedList = comparableList
      .filter(
        (comparable) =>
          localSelectedCategoryList.length === 0 ||
          localSelectedCategoryList.indexOf(comparable.category) > -1
      )
      .map((comparable, index) => {
        return {
          name: comparable.name,
          result: comparable.conversionFn(refinedInputAmount),
        };
      })
      .filter((compared) => compared.result.length > 0)
      .sort(() => 0.5 - Math.random());

    fullComparedList = [
      ...computeHourlyIncomeBasedCompared(refinedInputAmount),
      ...computeMonthlyIncomeBasedCompared(refinedInputAmount),
      ...stockComparedList,
    ];
  }

  function showNextFewComparables() {
    comparedList = fullComparedList.slice(
      comparableHead,
      comparableHead + CommonConstant.MAX_COMPARABLE_TO_DISPLAY
    );

    comparableHead += comparedList.length;

    if (comparableHead >= fullComparedList.length) {
      comparableHead = 0;
    }
  }

  function goPressed() {
    prepareFullComparableList();
    showNextFewComparables();
    shouldShowResults = true;
  }

  function refreshPressed() {
    showNextFewComparables();
  }

  function amountKeyUp(e) {
    if (e && e.which === CommonConstant.ENTER_KEY_CODE) {
      setTimeout(() => {
        goPressed();
      }, 50);
    }
  }

  async function helpPressed() {
    const message = `Human beings are terrible at accurately gauging the true value of money. 
    This app allows you to relate an amount to familiar items or expenses.`;
    await showAlert("About TrueCost", message);
  }
</script>

<div class="dashboard-page">
  <div class="main-wrapper">
    <!-- main input - start -->
    <div class="main-input-wrapper">
      <div class="main-prompt">
        <div>Enter an amount of money</div>
        <div class="help-icon-wrapper">
          <IconButton
            size="button"
            class="material-icons"
            on:click={helpPressed}
          >
            help_outline
          </IconButton>
        </div>
      </div>
      <Textfield
        bind:value={enteredAmount}
        suffix="BDT"
        type="number"
        class="main-input"
        on:input={amountEntered}
        on:keyup={amountKeyUp}
      />
      <IconButton class="material-icons" on:click={goPressed}>send</IconButton>
      <div class="main-prompt-hint">
        This can be something you are buying, selling, or simply want to know
        the value of.
      </div>
    </div>
    <!-- main input - end -->
    <!-- comparisons - start -->
    {#if shouldShowResults}
      <div class="comparison-wrapper">
        <div class="comparison-title">This money is good for:</div>
        <ul>
          {#each comparedList as compared}
            <li>{compared.result}</li>
          {/each}
        </ul>

        <div class="refresh-button-wrapper">
          <IconButton class="material-icons" on:click={refreshPressed}>
            refresh
          </IconButton>
        </div>
      </div>
    {/if}
    <!-- comparisons - end -->
  </div>
</div>

<style>
  .dashboard-page {
    height: calc(100vh - 64px - 50px - 8px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .main-wrapper {
    width: calc(100% - 20px);
    max-width: 400px;
    padding: 10px;
    margin-bottom: 100px;
  }

  .page-title {
    font-size: 24px;
    margin-bottom: 20px;
  }

  /* ----------------- */

  .main-input-wrapper {
  }

  .main-prompt {
    font-size: 24px;
    margin-bottom: 12px;
    display: flex;
  }

  .main-prompt-hint {
    font-size: 12px;
    margin-top: 8px;
  }

  * :global(.main-input) {
    width: 160px;
    margin-right: 8px;
  }

  * :global(.main-input .mdc-text-field__input) {
    text-align: right;
  }

  .comparison-title {
    margin-top: 12px;
    margin-bottom: -4px;
  }

  .refresh-button-wrapper {
    text-align: center;
  }

  .help-icon-wrapper {
    display: inline-block;
    margin-top: -12px;
  }
</style>
