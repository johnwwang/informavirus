import firebase from 'firebase'
import Vue from 'vue'
import { uid } from 'quasar'

state = {
  coordinates: {
    'ID1': {
      longitude: '-87.6285003',
      latitude: '41.9051549'  
    },
    'ID2': {
      longitude: '-87.6285005',
      latitude: '41.9051551'
    },
    'ID3': {
      longitude: '-87.6285007',
      latitude: '41.9051556'
    }
  }

// firebase uses objects not arrays
//   coordinates : [{
//     longitude: '-87.6285003',
//     latitude: '41.9051549'
//   },
//   {
//     longitude: '-87.6285005',
//     latitude: '41.9051551'
//   },
//   {
//     longitude: '-87.6285007',
//     latitude: '41.9051556'
//   }
// ]
}, 

mutations = {
  addCoord(state, payload) {
  Vue.set(state.coordinates, payload.id, payload.coord)
  }
},

actions = {
  addCoord ({ commit }, coord){
    let coordId = uid()
    let payload = {
      id: coordId,
      coord: coord
    }
    commit('addCoord', payload)
  }
},

getters = {

}