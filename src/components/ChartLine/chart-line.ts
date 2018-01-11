import Vue from 'vue'
import range from 'lodash.range'
import round from 'lodash.round'
import ceil from 'lodash.ceil'
import * as anime from 'animejs'

import getDigits from '../../core/get-digits'

const Y_AXIS_LINES_LENGTH = 5
let cid = 0

export default Vue.extend({
  name: 'ChartLine',

  props: {
    cid: {
      type: String,
      default: `chart-line-${cid++}`
    },
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
      default: 80
    },
    paddingRight: {
      type: Number,
      default: 40
    },
    series: {
      type: Array,
      required: true
    },
    lines: {
      type: Array,
      default () {
        return []
      }
    },
    xAxisLabels: {
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
      displayMaskWidth: 0,
      displayFillOpacity: 0,
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
    allValues (): number[] {
      return this.series
        .reduce((memo, data) => {
          return memo.concat(data)
        }, [])
    },
    _maxValue (): number {
      return Math.max(...this.allValues)
    },
    maxValue (): number {
      return ceil(this._maxValue, (getDigits(this._maxValue) - 2) * -1)
    },
    percentOfSeries (): number[][] {
      return this.series
        .map((data: number[]) => data
          .map(value => value / this.maxValue)
        )
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
      return this.chartWidth / Math.max(...this.series.map(data => data.length - 1))
    },
    seriesLineTransform (): string {
      return `translate(${this.paddingLeft} ${this.chartHeight})`
    },
    seriesLinePointList (): number[][][] {
      return this.percentOfSeries
        .map(data => data
          .map((value, index) => [
            round(this.xAxisStep * index, 2),
            round(this.chartHeight * value * -1, 2)
          ]))
    },
    seriesLinePropsList (): { color: string, points: string }[] {
      return this.seriesLinePointList
        .map((points, i) => {
          const { color } = this.lines[i]

          return {
            color,
            points: points.map(p => p.join(' ')).join(' ')
          }
        })
    },
    seriesDotPropsList (): { transform: string }[][] {
      return this.seriesLinePointList
        .map(points => {
          return points
            .map(p => {
              const [x, y] = p
              return {
                transform: `translate(${x} ${y})`
              }
            })
        })
    },
    xAxisLabelPropsList (): { value: number, transform: string }[] {
      return this.xAxisLabels
        .map((label: number, index) => {
          return {
            value: label,
            transform: `translate(${round(this.xAxisStep * index, 2)})`
          }
        })
    },
    maskId (): string {
      return `mask-${this.cid}`
    },
    maskRef (): string {
      return `url(#${this.maskId})`
    },
    maskTransform (): string {
      return `translate(${0} ${this.chartHeight * -1})`
    }
  },

  methods: {
    handleClickRunButton (): void {
      this.animate()
    },

    animate (): void {
      if (this.inAnimate) {
        return
      }

      Object.assign(this, {
        displayMaskWidth: 0,
        displayFillOpacity: 0,
        inAnimate: true
      })

      const coordsA = { width: 0 }
      const coordsB = { fillOpacity: 0 }

      const timeline = anime.timeline()
        .add({
          targets: coordsA,
          width: this.chartWidth,
          easing: 'linear',
          duration: 300,
          autoplay: false,
          run: () => {
            this.displayMaskWidth = coordsA.width
          },
          complete: () => {
            this.displayMaskWidth = this.chartWidth
          }
        })
        .add({
          targets: coordsB,
          fillOpacity: 1,
          easing: 'easeOutExpo',
          duration: 300,
          autoplay: false,
          run: () => {
            this.displayFillOpacity = coordsB.fillOpacity
          },
          complete: () => {
            this.displayFillOpacity = 1
          }
        })

      timeline.complete = () => {
        this.inAnimate = false
      }
      timeline
        .play()
    }
  }
})
