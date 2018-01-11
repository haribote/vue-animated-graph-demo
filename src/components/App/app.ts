import Vue from 'vue'
import 'core-js/fn/promise'

import transformNumberOfVisitorsHistory from '../../core/transform-number-of-visitors-history'

import { fetchNpbLeagues, fetchNpbTeams, fetchNpbNumberOfVisitorsHistory, fetchNpbPennantRaceHistory } from '../../api/driver'

import ChartLine from '../ChartLine/chart-line.vue'

interface AppDataInterface {
  leagues: NpbLeagueInterface[]
  teams: NpbTeamInterface[]
  numberOfVisitorsHistory: NpbSeasonInterface[]
  pennantRaceHistory: NpbSeasonInterface[]
}

export default Vue.extend({
  name: 'App',

  components: {
    ChartLine
  },

  data (): AppDataInterface {
    return {
      leagues: [],
      teams: [],
      numberOfVisitorsHistory: [],
      pennantRaceHistory: []
    }
  },

  methods: {
    fetchAll (): Promise<[NpbLeagueInterface[], NpbTeamInterface[], NpbSeasonInterface[], NpbSeasonInterface[]]> {
      return Promise.all([
        fetchNpbLeagues(),
        fetchNpbTeams(),
        fetchNpbNumberOfVisitorsHistory(),
        fetchNpbPennantRaceHistory()
      ])
    }
  },

  computed: {
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
    }
  },

  created () {
    this.fetchAll()
      .then(resps => {
        const [leagues, teams, numberOfVisitorsHistory, pennantRaceHistory] = resps

        Object.assign(this, {
          leagues,
          teams,
          numberOfVisitorsHistory,
          pennantRaceHistory
        })
      })
      .catch(err => console.error(err.message))
  }
})
