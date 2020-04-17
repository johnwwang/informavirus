import {coordinatesRef } from 'boot/firebase'

// const state = {
//   coordinates: {
//     longitude: '',
//     latitude: ''
//   },

// // firebase uses objects not arrays
// //   coordinates : [{
// //     longitude: '-87.6285003',
// //     latitude: '41.9051549'
// //   },
// //   {
// //     longitude: '-87.6285005',
// //     latitude: '41.9051551'
// //   },
// //   {
// //     longitude: '-87.6285007',
// //     latitude: '41.9051556'
// //   }
// // ]
// }, 

// const mutations = {
//   setCoord(state, payload) {
//     state.userDetails = payload
//   }
// },

const actions = {
  addCoord ({}, payload){
    coordinatesRef.set({
    longitude: payload.longitude,
    latitude: payload.latitude
    })
    // commit('addCoord', payload)
  },
  removeCoord ({}, payload){
    // commit('removeCoord', payload)
  }

},

// getters = {

// }
export default {
  namespaced: true,
  // state,
  // mutations,
  actions,
  // getters
}