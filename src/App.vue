<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions ('store', ['handleAuthStateChanged']),
    // ...mapActions ('locationStore', ['changeCoord'])
  },

  mounted () {
    this.handleAuthStateChanged ()
    // this.changeCoord ()
  }
}


//   methods: {
//   gotData(data) {
//     console.log(data.val())
//     var coordinates = data.val();
//     var keys = Object.keys(coordinates);
//     console.log('KEYS' + keys);
  
//   for (var i = 0; i < keys.length; i++) {
//     var k = keys[i]
//     var latitude = coordinates[k].latitude
//     var longitude = coordinates[k].longitude
//     this.markers.push(k)
//   }
//   console.log(markers)
// }, 
//   errData(err) {
//     console.log("Error")
//     console.log(err)
//   },
//   addToArray () {
//     coordinatesRef.on('value', gotData, errData);
//   }
// },
//   mounted () {
//     this.addToArray()
//   },
</script>
