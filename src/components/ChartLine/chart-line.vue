<template>
  <div class="chart-line">
    <p>
      <button type="button" :disabled="inAnimate" @click.prevent="handleClickRunButton">Run</button>
    </p>
    <svg :viewBox="viewBox" :width="svgWidth" :height="svgHeight">
      <defs>
        <mask :id="maskId">
          <rect x="0" y="0" :width="displayMaskWidth" :height="chartHeight" :transform="maskTransform" fill="#fff"></rect>
        </mask>
      </defs>
      <g class="chart-line__y-step-line">
        <path v-for="line in yAxisLinePropsList" :key="line.y" :d="line.d" :transform="line.transform"></path>
      </g>
      <g class="chart-line__y-label">
        <g :transform="yAxisLabelTransform">
          <text x="0" y="0" v-for="(label, i) in yAxisLabelPropsList" :key="i" :transform="label.transform">{{label.value}}</text>
        </g>
      </g>
      <g :transform="seriesLineTransform">
        <g class="chart-line__series-line" :mask="maskRef">
          <polyline v-for="(line, i) in seriesLinePropsList" :key="i" :points="line.points" :stroke="line.color"></polyline>
        </g>
        <g class="chart-line__series-dot" :fill-opacity="displayFillOpacity">
          <g v-for="(series, i) in seriesDotPropsList" :key="i"  :fill="seriesLinePropsList[i].color">
            <circle v-for="(dot, j) in series" :key="j" cx="0" cy="0" :transform="dot.transform"></circle>
          </g>
        </g>
      </g>
      <g class="chart-line__x-label">
        <g :transform="seriesLineTransform">
          <text x="0" y="0" v-for="label in xAxisLabelPropsList" :key="label.value" :transform="label.transform">{{label.value}}</text>
        </g>
      </g>
    </svg>
  </div>
</template>

<script lang="ts" src="./chart-line.ts"></script>

<style scoped src="./chart-line.css"></style>
