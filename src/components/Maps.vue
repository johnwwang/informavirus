
<template>
  <q-page padding>
    <template>
      <div
        :v-if="this.arrayObj">
        
        <!-- <GmapMap
          id="map"
          :center="center"
          :zoom="7"
          map-type-id="terrain"
          style="width: 500px; height: 300px"
        ></GmapMap> -->
        <vue-google-heatmap 
          v-if="this.arrayObj.length > 0"
          :points="arrayObj"
          :lat="center.lat"
          :lng="center.lng"
          :initial-zoom=7
          :width="400"
          :height="350"/>
      </div>
    </template>
    <q-btn @click="arrobj"> get coords </q-btn>
    <div>
      <p> {{ this.arrayObj }} </p>
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
import VueGoogleHeatmap from 'vue-google-heatmap';


// Vue.use(VueGoogleMaps, {
//   load: {
//     key: "AIzaSyCqbDsJ5lt1gxseVKXyPCbayQGqSyROtWQ",
//     libraries: "places, visualization"
//     //// If you want to set the version, you can do so:
//     // v: '3.26',
//   }
// });
Vue.use(VueGoogleHeatmap, {
  apiKey: "AIzaSyCqbDsJ5lt1gxseVKXyPCbayQGqSyROtWQ"
});

export default {
  data() {
    return {
      isLoaded: false,
      position: "determining...",
      center: {
        lat: 39.6918784,
        lng: -89.6925696
      },
      arrayObj: null,
      
    };
  },

  methods: {
    arrobj() {
      console.log(this.arrayObj)
    },
    getCurrentPosition() {
      Geolocation.getCurrentPosition().then(position => {
        this.position = position;
      });
    },

    addToArray() {
      coordinatesRef.on("value", gotdata, errData);
      var that = this;
      function gotdata(data) {
        var array = [];
        console.log("array")
        console.log(array)
        // console.log(data.val());
        var coordinates = data.val();
        var keys = Object.keys(coordinates);
        // console.log("KEYS" + keys);
        for (var i = 0; i < keys.length; i++) {
          var k = keys[i];
          var latitude = coordinates[k].latitude;
          var longitude = coordinates[k].longitude;
          array.push({lat: latitude, lng: longitude});
        }
        that.arrayObj = array;
        console.log("array object");
        console.log(that.arrayObj);
      }

      function errData(err) {
        console.log("Error");
        console.log(err);
      }
    }
  },
  // beforeCreate() {
  //   this.addToArray();
  // },
  created() {
    this.addToArray();
  },
  mounted() {
    
    this.getCurrentPosition();

    // we start listening
    this.geoId = Geolocation.watchPosition(
      { enableHighAccuracy: true },
      (position, err) => {
        // console.log("New GPS position");
        this.position = position;
        Vue.set(this, "center", {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      }
    );
    this.addToArray();
  },
  beforeDestroy() {
    // we do cleanup
    Geolocation.clearWatch(this.geoId);
  }
};
</script>
