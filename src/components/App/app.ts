import Vue from 'vue'
import 'core-js/fn/promise'

import transformNumberOfVisitorsHistory from '../../core/transform-number-of-visitors-history'

import { fetchNpbLeagues, fetchNpbTeams, fetchNpbNumberOfVisitorsHistory, fetchNpbPennantRaceHistory } from '../../api/driver'

import ChartLine from '../ChartLine/chart-line.vue'
import ChartBar from '../ChartBar/chart-bar.vue'

interface AppDataInterface {
  leagues: NpbLeagueInterface[]
  teams: NpbTeamInterface[]
  numberOfVisitorsHistory: NpbSeasonInterface[]
  pennantRaceHistory: NpbSeasonInterface[]
  barChartCurrentSeason: number
  isBarChartSeasonSelectorDisabled: boolean
}

export default Vue.extend({
  name: 'App',

  components: {
    ChartLine,
    ChartBar
  },

  data (): AppDataInterface {
    return {
      leagues: [],
      teams: [],
      numberOfVisitorsHistory: [],
      pennantRaceHistory: [],
      barChartCurrentSeason: 0,
      isBarChartSeasonSelectorDisabled: false
    }
  },

  computed: {
    seasonOptionList (): number[] {
      return this.numberOfVisitorsHistory.map(h => h.season)
    },
    lineChartHistoryList (): number[][] {
      return transformNumberOfVisitorsHistory(this.numberOfVisitorsHistory, this.teams, 1000)
    },
    lineChartPropsList (): { id: number, name: string, color: string }[] {
      return this.teams
        .map(({ id, name, color }) => ({ id, name, color }))
    },
    lineChartXAxisLabelList (): number[] {
      return this.numberOfVisitorsHistory
        .map(s => s.season)
        .reverse()
    },
    barChartCurrentSeasonList (): number[] {
      const currentSeason = this.numberOfVisitorsHistory.find(h => h.season === this.barChartCurrentSeason)
      if (!currentSeason) {
        return []
      }
      return currentSeason
        .data
        .map(d => d.value / 1000)
    },
    barChartPropsList (): { id: number, name: string, color: string }[] {
      return this.teams
        .map(({ id, name, color }) => ({ id, name, color }))
    }
  },

  methods: {
    handleInAnimateChartBar (inAnimate: boolean) {
      this.isBarChartSeasonSelectorDisabled = inAnimate
    },
    fetchAll (): Promise<[NpbLeagueInterface[], NpbTeamInterface[], NpbSeasonInterface[], NpbSeasonInterface[]]> {
      return Promise.all([
        fetchNpbLeagues(),
        fetchNpbTeams(),
        fetchNpbNumberOfVisitorsHistory(),
        fetchNpbPennantRaceHistory()
      ])
    }
  },

  created () {
    this.fetchAll()
      .then(resps => {
        const [leagues, teams, numberOfVisitorsHistory, pennantRaceHistory] = resps
        const lastSeason = Math.max(...numberOfVisitorsHistory.map(h => h.season))

        Object.assign(this, {
          leagues,
          teams,
          numberOfVisitorsHistory,
          pennantRaceHistory,
          barChartCurrentSeason: lastSeason
        })
      })
      .catch(err => console.error(err.message))
  }
})
