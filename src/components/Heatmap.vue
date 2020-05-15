
<template>
  <q-page padding>
    <template>
      <div>
        <GmapMap
          :center="center"
          :zoom="7"
          map-type-id="terrain"
          style="width: 500px; height: 300px"
        ></GmapMap>
        <gmap-marker
        :key="index"
        v-for="(m, index) in arrayObj"
        :position="m.position"
        @click="center=m.position"
        ref="marker"
        ></gmap-marker>
        <!-- <vue-google-heatmap :points="arrayObj"
                      :width="400"
                      :height="350"
                      :center="center" /> -->
      </div>
    </template>
    <div>
      <q-btn @click="printMarkers"> Print Markers </q-btn>
    </div>
  </q-page>
</template>


<script>
import Vue from "vue";
import { mapState } from "vuex";
import { mapActions } from "vuex";
import { Plugins, KeyboardStyle } from "@capacitor/core";
const { Geolocation } = Plugins;
import * as VueGoogleMaps from "vue2-google-maps";
import { coordinatesRef, firebaseAuth } from "boot/firebase";
// import VueGoogleHeatmap from 'vue-google-heatmap';

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCqbDsJ5lt1gxseVKXyPCbayQGqSyROtWQ",
    libraries: "places, visualization"
  }
});

// Vue.use(VueGoogleHeatmap, {
//   apiKey: "AIzaSyCqbDsJ5lt1gxseVKXyPCbayQGqSyROtWQ"
// });

export default {
  data() {
    return {
      position: "determining...",
      center: {
        lat: 40.3399,
        lng: 127.5101
      },
      arrayObj: []
    };
  },

  methods: {
    printMarkers() {
      console.log(this.arrayObj)
    },
    getCurrentPosition() {
      Geolocation.getCurrentPosition().then(position => {
        this.position = position;
      });
    },
    addToArray() {
      coordinatesRef.on("value", gotdata, errData);
      var array = [];
      var that = this;
      function gotdata(data) {
        console.log(data.val());
        var coordinates = data.val();
        var keys = Object.keys(coordinates);
        console.log("KEYS" + keys);
        for (var i = 0; i < keys.length; i++) {
          var k = keys[i];
          var latitude = coordinates[k].latitude;
          var longitude = coordinates[k].longitude;
          array.push(new google.maps.LatLng(latitude, longitude));
        }
        that.arrayObj = array;
        console.log("thatarray");
        console.log(that.arrayObj);
      }

      function errData(err) {
        console.log("Error");
        console.log(err);
      }
    }
  },
  mounted() {
    this.getCurrentPosition();

    // we start listening
    this.geoId = Geolocation.watchPosition(
      { enableHighAccuracy: true },
      (position, err) => {
        console.log("New GPS position");
        this.position = position;
        Vue.set(this, "center", {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    this.addToArray();
  },
  beforeDestroy() {
    // we do cleanup
    Geolocation.clearWatch(this.geoId);
  }
};
</script>
