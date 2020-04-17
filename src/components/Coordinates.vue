<template>
  <q-page class="flex">
  	<template>
			<div>
    		GPS position of {{ userDetails.name }}  :
				<br> <strong>Latitude: {{ position.coords.latitude }}</strong>
				<br> <strong>Longitude: {{ position.coords.longitude }}</strong>
        <br> <strong> {{ coordObj }} </strong>
        <q-btn 
          v-on:click = "addCoords"
          unelevated 
          rounded color="primary" 
          type="submit"
          label="Add Coordinate" />
  		</div>
      <div id = "app">
      <GmapMap
          :center="{lat: position.coords.latitude , lng: position.coords.longitude}"
          :zoom="7"
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
    key: 'AIzaSyA_BBkhxnsIH84FcFxxdrLUkyhHP1rjpws',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },

})

export default {
	computed: {
		...mapState('store', ['userDetails'])
	},
	data () {
    return {
      position: 'determining...',
      coordObj: {
        userId: '',
        longitude: '',
        latitude: ''
      }
    }
	},
	methods: {
    ...mapActions('locationStore', ['addCoord']),
    getCurrentPosition() {
      Geolocation.getCurrentPosition().then(position => {
        console.log('Current', position);
        this.position = position
        this.coordObj.latitude = position.coords.latitude
        this.coordObj.longitude = position.coords.longitude
        
      })
    },
    addCoords() {
      coordinatesRef.push(this.coordObj)
      alert("added to database!")
    },
    test_alert() {
      alert ('hello!')
    }
  },

	mounted () {
    this.getCurrentPosition()

    // we start listening
    this.geoId = Geolocation.watchPosition({enableHighAccuracy: true}, (position, err) => {
      console.log('New GPS position')
      this.position = position
      coordinatesRef.push(this.coordObj)
      this.coordObj.userId = firebaseAuth.currentUser.uid 
    })
  },
  // beforeDestroy () {
  //   // we do cleanup
  //   Geolocation.clearWatch(this.geoId)
  // }
}
</script>

<style>
</style>
