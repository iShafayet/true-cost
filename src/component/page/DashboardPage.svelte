<script lang="ts">
  import IconButton from "@smui/icon-button";
  import Textfield from "@smui/textfield";
  import type { Compared, UserIncomeDetails } from "src/model/common.js";
  import { stockComparableList } from "../../constant/stock-comparables.js";
  import {
    selectedCategoryList,
    userIncomeDetails,
  } from "../../store/common.js";

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
  let comparedList: Compared[] = [];

  function amountEntered() {
    shouldShowResults = false;
  }

  function goPressed() {
    refinedInputAmount = parseFloat(String(enteredAmount));

    comparedList = comparableList
      .filter(
        (comparable) =>
          localSelectedCategoryList.length === 0 ||
          localSelectedCategoryList.indexOf(comparable.category) > -1
      )
      .map((comparable) => {
        return {
          name: comparable.name,
          result: comparable.conversionFn(refinedInputAmount),
        };
      })
      .filter((compared) => compared.result.length > 0);

    shouldShowResults = true;
  }
</script>

<div class="dashboard-page">
  <div class="main-wrapper">
    <!-- main input - start -->
    <div class="main-input-wrapper">
      <div class="main-prompt">Enter an amount</div>
      <Textfield
        bind:value={enteredAmount}
        suffix="BDT"
        type="number"
        class="main-input"
        on:input={amountEntered}
      />
      <IconButton class="material-icons" on:click={goPressed}>send</IconButton>
      <div class="main-prompt-hint">
        This can be something you are buying or selling or otherwise simply just
        want to know the value of.
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
</style>
