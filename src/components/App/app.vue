<template>
  <div id="app">
    <header class="container">
      <h1>Vue Animated Graph Demo</h1>
      <p>Demos of animated graph that render by Vue.js without D3.js.</p>
    </header>

    <div class="container">
      <h2>Line chart</h2>
      <p>History of NPB's annual visitors.</p>
      <ChartLine
        :series="lineChartHistoryList"
        :lines="lineChartPropsList"
        :xAxisLabels="lineChartXAxisLabelList"
        yAxisUnit="x 1000"
      />
    </div>

    <div class="container">
      <h2>Bar chart</h2>
      <p>Annual visitors per team</p>
      <p>
        <span>Season: </span>
        <select v-model="barChartCurrentSeason" :disabled="isBarChartSeasonSelectorDisabled">
          <option v-for="season in seasonOptionList" :key="season" :value="season">{{season}}</option>
        </select>
      </p>
      <ChartBar
        :series="barChartCurrentSeasonList"
        :lines="barChartPropsList"
        yAxisUnit="x 1000"
        @in-animate="handleInAnimateChartBar"
      />
    </div>

    <div class="container">
      <h2>Pie chart</h2>
      <p>Annual visitors per team</p>
      <p>
        <span>Season: </span>
        <select v-model="pieChartCurrentSeason" :disabled="isPieChartSeasonSelectorDisabled">
          <option v-for="season in seasonOptionList" :key="season" :value="season">{{season}}</option>
        </select>
      </p>
      <ChartPie
        :series="pieChartCurrentSeasonList"
        :pies="pipeChartPropsList"
        @in-animate="handleInAnimateChartPie"
      />
    </div>
  </div>
</template>

<script lang="ts" src="./app.ts"></script>

<style src="./app.css"></style>
