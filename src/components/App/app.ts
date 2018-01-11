import Vue from 'vue'

import { fetchNpbLeagues, fetchNpbTeams, fetchNpbNumberOfVisitorsHistory, fetchNpbPennantRaceHistory } from '../../api/driver'

interface AppDataInterface {
  leagues: NpbLeagueInterface[]
  teams: NpbTeamInterface[]
  numberOfVisitorsHistory: NpbSeasonInterface[]
  pennantRaceHistory: NpbSeasonInterface[]
}

export default Vue.extend({
  name: 'App',

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
