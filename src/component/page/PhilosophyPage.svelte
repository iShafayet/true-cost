<script lang="ts">
  import { CommonConstant } from "../../constant/common-constants.js";
</script>

<div class="dashboard-page">
  <div class="main-wrapper">
    <div class="page-title">TrueCost</div>
    <div class="subtitle">Visualize the True Cost of your expenses</div>

    <!-- Prologue - Start -->
    <div class="rules">
      <div class="label">Prologue:</div>
      Human beings are terrible at judging the true magnitude of an amount of money.
      One of the best way to make sense of any amount of money is to compare it with
      various known or relatable commodities or set expenditures.<br /> <br />
      This is why this application tries to calculate how many of various commodities
      and expenditures a certain amount of money can buy.
    </div>
    <!-- Prologue - End -->

    <!-- Rules - Start -->
    <div class="rules">
      <div class="label">Credits:</div>
      This FOSS application is developed by&nbsp;<a
        href={CommonConstant.COPYRIGHT_HREF}
        target="_blank"
        rel="noreferrer"
        class="footer-link"
      >
        {CommonConstant.COPYRIGHT}
      </a>
      and is available under the
      <a
        href={CommonConstant.LICENSE_HREF}
        target="_blank"
        rel="noreferrer"
        class="footer-link"
      >
        {CommonConstant.LICENSE}
      </a>.
    </div>
    <!-- Rules - End -->

    <!-- Rules - Start -->
    <div class="rules">
      <div class="label">Disclaimer:</div>
      <ul class="list">
        <li>
          This application has no telemetry. Any data collected for calculations
          are stored on your device.
        </li>
        <li>
          The values are estimates and are hardcoded. It's expected that they
          will be outdated eventually.
        </li>
        <li>You are welcome to contribute to the project.</li>
        <li>
          If you end up using it personally, institutionally or academically,
          let me (author) know.
        </li>
      </ul>
    </div>
    <!-- Rules - End -->
  </div>
</div>

<style>
  .dashboard-page {
    height: calc(100vh - 64px - 50px - 8px);
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    overflow-y: auto;
  }

  .main-wrapper {
    width: calc(100% - 20px);
    max-width: 800px;
    padding: 10px;
    margin-bottom: 30px;
  }

  .page-title {
    font-size: 24px;
    margin-bottom: 8px;
  }

  .subtitle {
    font-size: 18px;
    margin-bottom: 8px;
  }

  .rules {
    font-size: 14px;
  }

  .rules .label {
    font-size: 16px;
    margin-top: 24px;
    margin-bottom: 4px;
  }

  .rules .list {
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 20px;
    line-height: 1.4;
  }

  .rules .unit {
    text-decoration: underline;
  }
</style>
