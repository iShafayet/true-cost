<script lang="ts">
  import Button, { Label } from "@smui/button";
  import Checkbox from "@smui/checkbox";
  import FormField from "@smui/form-field";
  import Textfield from "@smui/textfield";
  import { navigateToRoute } from "../../lib/navigation-helper.js";
  import {
    ComparableCategory,
    type UserIncomeDetails,
  } from "../../model/common.js";
  import {
    selectedCategoryList,
    userIncomeDetails,
  } from "../../store/common.js";

  type LocalCategory = {
    name: string;
    isSelected: boolean;
  };

  let localSelectedCategoryList: LocalCategory[] = [];
  let localUserIncomeDetails: UserIncomeDetails = {
    monthlyIncome: 0,
    hourlyIncome: 0,
  };

  selectedCategoryList.subscribe((value) => {
    localSelectedCategoryList = Object.keys(ComparableCategory).map((name) => {
      return {
        name,
        isSelected: value.length === 0 || value.indexOf(name) > -1,
      };
    });
  });

  userIncomeDetails.subscribe((value) => {
    localUserIncomeDetails = value;
  });

  function saveClicked() {
    userIncomeDetails.set(localUserIncomeDetails);
    let selectedList = localSelectedCategoryList
      .filter((category) => category.isSelected)
      .map((category) => category.name);
    selectedCategoryList.set(selectedList);

    navigateToRoute("/dashboard", { replaceCurrentRoute: true });
  }
</script>

<div class="converter-page">
  <div class="main-wrapper">
    <div style="padding-bottom: 42px;"></div>
    <!-- Categories - start -->
    <div class="converter">
      <div class="group">
        <div class="group-title">Enabled Categories:</div>

        {#each localSelectedCategoryList as category}
          <div class="category">
            <FormField>
              <Checkbox bind:checked={category.isSelected} />
              <span slot="label">{category.name}</span>
            </FormField>
          </div>
        {/each}
      </div>
    </div>

    <!-- Categories - end -->
    <!-- Income - start -->
    <div class="converter">
      <div class="group">
        <div class="group-title">Your Income:</div>
        <div class="help-text">
          Enter the following if you want this tool to calculate how much of
          your income a certain expense consumes. Leave blank to skip this
          calculation.
        </div>
        <div class="income-input-wrapper">
          <Textfield
            bind:value={localUserIncomeDetails.hourlyIncome}
            label="Hourly Income"
            type="number"
            suffix="BDT"
            class="group-text-input"
          />
          <Textfield
            bind:value={localUserIncomeDetails.monthlyIncome}
            label="Monthly Income"
            type="number"
            suffix="BDT"
            class="group-text-input"
          />
        </div>
      </div>
    </div>
    <!-- Income - end -->

    <Button
      class="save-button"
      color="secondary"
      on:click={saveClicked}
      variant="raised"
    >
      <Label>Save Changes</Label>
    </Button>
  </div>
</div>

<style>
  .converter-page {
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

  /* --------------------------------- calculator and converter - start */
  .converter {
    width: 100%;
  }

  .group {
    margin-top: 14px;
  }

  .group-title {
    font-size: 18px;
    margin-bottom: 6px;
    margin-top: 6px;
  }

  * :global(.group-text-input) {
    width: 140px;
    margin-right: 8px;
  }

  .income-input-wrapper {
    display: flex;
  }

  .help-text {
    font-size: 12px;
  }

  * :global(.save-button) {
    margin-top: 12px;
  }

  /* --------------------------------- calculator and converter - end */
</style>
