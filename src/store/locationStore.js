import { coordinatesRef } from 'boot/firebase'
import { firebaseAuth, firebaseDb } from 'boot/firebase'
import state from 'store/store'

// const state = {
//   coordinates: {
//     longitude: '',
//     latitude: ''
//   },


// const mutations = {
//   setCoord(state, payload) {
//     state.userDetails = payload
//   }
// },

const actions = {
  addCoord ({}, payload){
    coordinatesRef.set({
    userId: payload.userId,
    longitude: payload.longitude,
    latitude: payload.latitude
    })
    // commit('addCoord', payload)
  },
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
