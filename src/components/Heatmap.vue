
<template>
  <q-page padding>
    <template>
      <div>
        <GmapMap
            :center="current"
            :zoom="14"
            map-type-id="terrain"
            style="width: 500px; height: 300px"
          >
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
      current : {
        lat : 41.9051549, 
        lng : -87.6285003
      },
      heatData : []
    }
  },

}
</script>
