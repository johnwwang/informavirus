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
      this.$router.push('/buttons')
    })
    .catch(error => {
      console.log(error.message);
    })
  },
  loginUser({}, payload) {
     firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
     .then(response => {
       console.log(response)
       this.$router.push('/buttons')
     })
     .catch(error => {
      console.log(error.message);
    })
    
  },
  logoutUser() {
    firebaseAuth.signOut()
  },
  handleAuthStateChanged({ commit }) {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        //user is logged in
        let userId = firebaseAuth.currentUser.uid
        firebaseDb.ref('users/' + userId).once('value', snapshot => {
          console.log('snapshot', snapshot)
          
          let userDetails = snapshot.val()
          console.log('userDetails:', userDetails)
          commit('setUserDetails', {
            name: userDetails.name,
            email: userDetails.email,
            userId: userId
          })
        })
        // IF SOMETHING IS WRONG WITH HANDLAUTHSTATECHANGED, MOVE this.$routerpush('/')
        // BELOW console.log('snapshot', snapshot)
          
      }
      else {
        //user is logged out
        commit('setUserDetails', {})
        this.$router.replace('/auth')
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