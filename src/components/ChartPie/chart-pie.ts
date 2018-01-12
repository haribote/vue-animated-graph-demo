import Vue from 'vue'
import round from 'lodash.round'

const PIE2 = 2 * Math.PI

export default Vue.extend({
  name: 'ChartPie',

  props: {
    svgWidth: {
      type: Number,
      default: 640
    },
    svgHeight: {
      type: Number,
      default: 640
    },
    chartR: {
      type: Number,
      default: 160
    },
    series: {
      type: Array,
      required: true
    },
    pies: {
      type: Array,
      default () {
        return []
      }
    }
  },

  computed: {
    viewBox (): string {
      return `${this.svgWidth / -2} ${this.svgHeight / -2} ${this.svgWidth} ${this.svgHeight}`
    },
    totalValue (): number {
      return this.series.reduce((memo, value) => memo + value, 0)
    },
    percentOfSeries (): number[] {
      let subTotal = 0
      return this.series
        .map((value, i) => {
          if (i === this.series.length - 1) {
            return 1 - subTotal
          }
          const percentage = value / this.totalValue
          subTotal += percentage
          return percentage
        })
    },
    seriesPiePropsList (): { value: number, color: string, d: string, transform: string }[] {
      const x1 = this.chartR * Math.cos(0)
      const y1 = this.chartR * Math.sin(0)
      let subTotal = 0
      return this.percentOfSeries
        .map((value, i) => ({ value, team: i }))
        .sort((a, b) => b.value - a.value)
        .map(({ value, team }) => {
          const { color } = this.pies[team]
          const x2 = this.chartR * Math.cos(PIE2 * value)
          const y2 = this.chartR * Math.sin(PIE2 * value)

          const matrix = [round(Math.cos(PIE2 * subTotal), 4), round(Math.sin(PIE2 * subTotal), 4)]
          matrix.push(matrix[1] * -1, matrix[0], 0, 1)

          subTotal += value

          return {
            value,
            color,
            d: `M ${x1} ${y1} a ${this.chartR} ${this.chartR} ${0} ${value > .5 ? 1 : 0} ${1} ${round(x2 - x1, 2)} ${round(y2 - y1, 2)}`,
            transform: `matrix(${matrix.join(' ')})`
          }
        })
    }
  },

  created () {
    console.log('created', 'ChartPie')
  },

  mounted () {
    console.log('mounted', 'ChartPie')
  },

  destroyed () {
    console.log('destroyed', 'ChartPie')
  }
})
