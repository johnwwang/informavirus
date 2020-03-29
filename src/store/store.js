import { firebaseAuth, firebaseDb } from 'boot/firebase'


const state = {
  userDetails: {}
}

const mutations = {
  setUserDetails(state, payload) {
    state.userDetails = payload
  }
}

const actions = {
  registerUser({}, payload) {
    // console.log(payload)
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
    .then(response => {
      console.log(response)
      let userId = firebaseAuth.currentUser.uid
      firebaseDb.ref('users/' + userId).set({
        name: payload.name,
        email: payload.email
      })
    })
    .catch(error => {
      console.log(error.message);
    })
  },
  loginUser({}, payload) {
     firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
     .then(response => {
       console.log(response)
     })
     .catch(error => {
      console.log(error.message);
    })
  },
  handleAuthStateChanged({ commit }) {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        //user is logged in
        let userId = firebaseAuth.currentUser.uid
        firebaseDb.ref('users/' + userId).once('value', snapshot => {
          console.log('snapshot', snapshot)
          //WHAT IS A SNAPSHOT -- VIDEO 8 goes over all of this
          let userDetails = snapshot.val()
          console.log('userDetails:', userDetails)
          commit('setUserDetails', {
            name: userDetails.name,
            email: userDetails.email,
            userId: userId
          })
        }
        )
      }
      else {
        //user is logged out
        commit('setUserDetails', {})
      }
    })
  }
} 

const getters = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}