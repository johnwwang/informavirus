
<template>
  <q-page padding>
    <template>
      <div>
        <GmapMap
            :center="center"
            :zoom="7"
            map-type-id="terrain"
            style="width: 500px; height: 300px"
          >
          <!-- <gmap-marker
          :key="index"
          v-for="(i, index) in markers"
          :position="i"
          ></gmap-marker> -->
        </GmapMap>
      </div>
    </template>
    <div>
      <!-- <h2> {{ center }} </h2> -->
    </div>
  </q-page>
</template>

<script type="text/javascript"
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCqbDsJ5lt1gxseVKXyPCbayQGqSyROtWQ&libraries=visualization">
</script>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import { Plugins, KeyboardStyle } from '@capacitor/core'
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


// logs all coordinates in the database
coordinatesRef.on('value', gotData, errData);

let array = []
function gotData(data) {
  console.log(data.val())
  var coordinates = data.val();
  var keys = Object.keys(coordinates);
  console.log('KEYS' + keys);
  

  for (var i = 0; i < keys.length; i++) {
    var k = keys[i]
    var latitude = coordinates[k].latitude
    var longitude = coordinates[k].longitude
    array.push({latitude, longitude})
  }

  console.log(array)
}

function errData(err) {
  console.log("Error")
  console.log(err)
}

export default {
  data () {
    return {
      position: 'determining...',
      center : {
        lat : 40.3399, 
        lng : 127.5101
      },
      markers : [{
        latitude: 42.11967010000001,
      longitude: -88.03082619999999
      }]
    }
  },
  methods: {

  }, 

  // EVERYTHING BELOW THIS IS TO GET CURRENT POSITION
  methods: {
    getCurrentPosition() {
      Geolocation.getCurrentPosition().then(position => {
        this.position = position  
      })
    },

  },

	mounted () {
    this.getCurrentPosition()

    // we start listening
    this.geoId = Geolocation.watchPosition({enableHighAccuracy: true}, (position, err) => {
      console.log('New GPS position -- heatmap')
      this.position = position
      Vue.set(this, 'center', {
        lat : position.coords.latitude,
        lng : position.coords.longitude
      })
    })
  },
    beforeDestroy () {
    // we do cleanup
    Geolocation.clearWatch(this.geoId)
  }
}
</script>
