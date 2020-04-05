<template>
  <q-page class="flex">
  	<template>
			<div>
    		GPS position of {{ userDetails.name }}: 
				<br> <strong>Latitude: {{ position.coords.latitude }}</strong>
				<br> <strong>Longitude: {{ position.coords.longitude }}</strong>
  		</div>
  	</template>
	</q-page>
</template>

<script>
import { mapState } from 'vuex'
import { Plugins } from '@capacitor/core'
const { Geolocation } = Plugins

export default {
	computed: {
		...mapState('store', ['userDetails'])
	},
	data () {
    return {
      position: 'determining...'
    }
	},
	methods: {
    getCurrentPosition() {
      Geolocation.getCurrentPosition().then(position => {
        console.log('Current', position);
        this.position = position
      });
    }
	},
	mounted () {
    this.getCurrentPosition()

    // we start listening
    this.geoId = Geolocation.watchPosition({}, (position, err) => {
      console.log('New GPS position')
      this.position = position
    })
  },
  beforeDestroy () {
    // we do cleanup
    Geolocation.clearWatch(this.geoId)
  }
}
</script>

<style>
</style>
