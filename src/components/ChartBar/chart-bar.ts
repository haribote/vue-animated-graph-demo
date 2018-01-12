import Vue from 'vue'
import 'core-js/fn/number/is-finite'
import ceil from 'lodash.ceil'
import round from 'lodash.round'
import range from 'lodash.range'
import * as anime from 'animejs'

import getDigits from '../../core/get-digits'

interface SeriesLinePropsInterface {
  color: string
  d: string
  transform: string
}

const Y_AXIS_LINES_LENGTH = 5

export default Vue.extend({
  name: 'ChartBar',

  props: {
    svgWidth: {
      type: Number,
      default: 1140
    },
    svgHeight: {
      type: Number,
      default: 640
    },
    paddingBottom: {
      type: Number,
      default: 24
    },
    paddingLeft: {
      type: Number,
      default: 120
    },
    paddingRight: {
      type: Number,
      default: 90
    },
    series: {
      type: Array,
      required: true
    },
    forcedMinValue: {
      type: Number
    },
    lines: {
      type: Array,
      default () {
        return []
      }
    },
    yAxisUnit: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      displaySeriesLinePropsList: [],
      inAnimate: false
    }
  },

  computed: {
    viewBox (): string {
      return `${0} ${0} ${this.svgWidth} ${this.svgHeight}`
    },
    chartHeight (): number {
      return this.svgHeight - this.paddingBottom
    },
    _maxValue (): number {
      return Math.max(...this.series)
    },
    maxValue (): number {
      return ceil(this._maxValue, (getDigits(this._maxValue) - 2) * -1)
    },
    percentOfSeries (): number[] {
      return this.series
        .map(value => value / this.maxValue)
    },
    yAxisLinePropsList (): { y: number, d: string, transform: string }[] {
      const d = `M${0},${.5} H${this.svgWidth}`
      return range(0, this.chartHeight, this.chartHeight / (Y_AXIS_LINES_LENGTH - 1))
        .concat([this.chartHeight])
        .map(y => {
          const _y = round(y, 2)
          return {
            y: _y,
            d,
            transform: `translate(0, ${_y})`
          }
        })
    },
    yAxisLabelPropsList (): any[] {
      return [0, .5, 1]
        .map(value => ({
          value: this.maxValue * value,
          transform: `translate(0, ${round(this.chartHeight * value * -1, 2)})`
        }))
    },
    yAxisLabelTransform (): string {
      return `translate(0 ${this.chartHeight})`
    },
    chartWidth (): number {
      return this.svgWidth - (this.paddingLeft + this.paddingRight)
    },
    xAxisStep (): number {
      return this.chartWidth / (this.series.length - 1)
    },
    seriesLineTransform (): string {
      return `translate(${this.paddingLeft} ${this.chartHeight})`
    },
    seriesLinePointList (): number[][] {
      return this.percentOfSeries
        .map((value, index) => [
          round(this.xAxisStep * index, 2),
          round(this.chartHeight * value * -1, 2)
        ])
    },
    seriesLinePropsList (): SeriesLinePropsInterface[] {
      return this.seriesLinePointList
        .map(this.createSeriesLineProps.bind(this))
    },
    xAxisLabelPropsList (): any[] {
      return this.lines
        .map((line, index) => ({
          value: line.name,
          transform: `translate(${round(this.xAxisStep * index, 2)})`
        }))
    }
  },

  watch: {
    inAnimate (inAnimate) {
      this.$emit('in-animate', inAnimate)
    },
    seriesLinePropsList () {
      this.animate()
    }
  },

  methods: {
    handleClickRunButton (): void {
      this.initializeDisplaySeriesLinePropsList()
      this.$nextTick(() => {
        this.animate()
      })
    },

    createSeriesLineProps (points: number[], i: number): SeriesLinePropsInterface {
      const { color } = this.lines[i]
      const [x, h] = points

      return {
        color,
        d: `M ${0} ${0} V ${h}`,
        transform: `translate(${x})`
      }
    },

    initializeDisplaySeriesLinePropsList (): void {
      this.displaySeriesLinePropsList
        .splice(
          0,
          this.displaySeriesLinePropsList.length,
          ...this.seriesLinePointList
            .map((points, i) => {
              const [x] = points
              return this.createSeriesLineProps([x, 0], i)
            })
        )
    },

    animate (): void {
      if (this.inAnimate) {
        return
      }

      this.inAnimate = true

      const timeline = anime.timeline()
      this.displaySeriesLinePropsList
        .forEach(({ d }: { d: string }, i) => {
          const coords = { d }
          timeline.add({
            targets: coords,
            d: this.seriesLinePropsList[i].d,
            easing: 'easeOutQuad',
            duration: 500,
            autoplay: false,
            offset: 0,
            run: () => {
              Object.assign(this.displaySeriesLinePropsList[i], {
                d: coords.d
              })
            },
            complete: () => {
              Object.assign(this.displaySeriesLinePropsList[i], {
                d: this.seriesLinePropsList[i].d
              })
            }
          })
        })

      timeline.complete = () => {
        this.inAnimate = false
      }
      timeline
        .play()
    }
  },

  created () {
    console.log('created', 'ChartBar')
    this.initializeDisplaySeriesLinePropsList()
  },

  mounted () {
    console.log('mounted', 'ChartBar')
  },

  destroyed () {
    console.log('destroyed', 'ChartBar')
  }
})
