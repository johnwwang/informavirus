import { coordinatesRef } from 'boot/firebase'
import { firebaseAuth, firebaseDb } from 'boot/firebase'
import state from 'store/store'

const state = {
  // coordDetails: {},
}

const mutations = {
  // setCoordDetails(state, payload) {
  //   state.coordinates = payload
  // } 
},

const actions = {
  addCoord ({}, payload){
    coordinatesRef.set({
    userId: payload.userId,
    longitude: payload.longitude,
    latitude: payload.latitude
    })
  },
//   changeCoord ({ commit }) {
//   console.log('coordDetails', coordinates)
//   commit('setCoordDetails', {
//     latitude = coordinates.latitude,
//     longitude = coordinates.longitude
//   })
// }
},

getters = {

}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
