
<template>
  <q-page>
    <template>
      <div>
        <GmapMap
            :center="center"
            :zoom="6"
            map-type-id="terrain"
            style="width: 500px; height: 300px"
          >
            <GmapMarker
              :key="index"
              v-for="(m, index) in markers"
              :position="m.position"
              :clickable="true"
              :draggable="true"
              @click="center=m.position"
            />
        </GmapMap>
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
    center : {
      lat : 30,
      lng : -87
    }
  }
},
methods: {
  getCurrentPosition() {
    Geolocation.getCurrentPosition().then(position => {
      console.log('Current', position);
      this.position = position
    })
  },
	mounted () {
    this.getCurrentPosition()

    // we start listening
    this.geoId = Geolocation.watchPosition({enableHighAccuracy: true}, (position, err) => {
      console.log('New GPS position')
      this.position = position
      this.center = {
        lat : position.coords.latitude,
        lng : position.coords.longitude
      }
    })
  },
  // beforeDestroy () {
  //   // we do cleanup
  //   Geolocation.clearWatch(this.geoId)
  // }
}
}
</script>