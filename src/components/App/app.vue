<template>
  <div id="app">
    <header class="container">
      <h1>Vue Animated Graph Demo</h1>
      <p>Demos of animated graph that render by Vue.js without D3.js.</p>
    </header>

    <div class="container">
      <h2>Line chart</h2>
      <p>History of NPB's annual visitors.</p>
      <ChartLine :series="lineChartHistoryList" :lines="lineChartPropsList" :xAxisLabels="lineChartXAxisLabelList" yAxisUnit="x 1000" />
    </div>
  </div>
</template>

<script lang="ts" src="./app.ts"></script>

<style src="./app.css"></style>
