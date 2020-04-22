
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
      </div>
    </template>
    <div>
      <h2> {{ center }} </h2>
    </div>
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
        lat : 41, 
        lng : -8
      },
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
      Vue.set(this, 'center', {
        lat : position.coords.latitude,
        lng : position.coords.longitude
      })
      
      // this.center.latitude = position.coords.latitude
      // this.center.longitude = position.coords.longitude

    })
  },
    beforeDestroy () {
    // we do cleanup
    Geolocation.clearWatch(this.geoId)
  }
}
</script>
