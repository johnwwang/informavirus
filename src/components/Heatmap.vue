
<template>
  <q-page padding>
    <template>
      <div>
        <GmapMap
            :center="center"
            :zoom="14"
            map-type-id="terrain"
            style="width: 500px; height: 300px"
          >
        </GmapMap>
        <!-- <q-btn color="red" v-on:click = "addHeatData" /> -->
      </div>
    </template>
  </q-page>
</template>


<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import { Plugins } from '@capacitor/core'
const { Geolocation } = Plugins
import * as VueGoogleMaps from 'vue2-google-maps'
import { coordinatesRef, firebaseAuth } from 'boot/firebase'
// import { coordObj } from 'components/Coordinates.vue'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCqbDsJ5lt1gxseVKXyPCbayQGqSyROtWQ',
    libraries: 
    'places, visualization'
    //// If you want to set the version, you can do so:
    // v: '3.26',
  },
})


export default {
  data () {
    return {
      position: 'determining...',
      center : {
        lat : 41.9051549, 
        lng : -87.6285003
      },
      currentCoord : {
        latitude : '',
        longitude : ''
      }
    }
  },
  methods: {
    // ...mapActions('locationStore', ['changeCoord']),
    getCurrentPosition() {
      Geolocation.getCurrentPosition().then(position => {
        console.log('Current', position);
        this.position = position  
      })
    },

  },

	mounted () {
    this.getCurrentPosition()

    // we start listening
    this.geoId = Geolocation.watchPosition({enableHighAccuracy: true}, (position, err) => {
      console.log('New GPS position')
      this.position = position
      this.currentCoord.latitude = position.coords.latitude
      this.currentCoord.longitude = position.coords.longitude
      console.log(currentCoord)
    })
  },
}
</script>
