
<template>
  <q-page padding>
    <template>
      <div :v-if="this.arrayObj">
        <!-- <GmapMap
          id="map"
          :center="center"
          :zoom="7"
          map-type-id="terrain"
          style="width: 500px; height: 300px"
        ></GmapMap>-->
        <vue-google-heatmap
          :v-if="this.arrayObj.length >0 "
          :points="arrayObj"
          :lat="center.lat"
          :lng="center.lng"
          :initial-zoom="7"
          :width="this.windowWidth"
          :height="this.windowHeight"
          class="map"
        />
      </div>
    </template>
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
import VueGoogleHeatmap from "vue-google-heatmap";

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
  props: ["tracking", "windowWidth", "windowHeight"],
  data() {
    return {
      position: "determining...",
      center: {
        lat: 41.8781,
        lng: -87.6298
      },
      arrayObj: null
    };
  },

  methods: {
    getCurrentPosition() {
      if (this.tracking == "true") {
        Geolocation.getCurrentPosition().then(position => {
          this.position = position;
        });
      }
    },

    addToArray() {
      coordinatesRef.on("value", gotdata, errData);
      var that = this;
      function gotdata(data) {
        var array = [];
        console.log("array");
        console.log(array);
        // console.log(data.val());
        var coordinates = data.val();
        var keys = Object.keys(coordinates);
        // console.log("KEYS" + keys);
        for (var i = 0; i < keys.length; i++) {
          var k = keys[i];
          var latitude = coordinates[k].latitude;
          var longitude = coordinates[k].longitude;
          array.push({ lat: latitude, lng: longitude });
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

  // created() {
  //   this.addToArray();
  // },
  mounted() {
    this.getCurrentPosition();

    // we start listening
    if (this.tracking == "true") {
      this.geoId = Geolocation.watchPosition(
        { enableHighAccuracy: true },
        (position, err) => {
          // console.log("New GPS position");
          this.position = position;

          coordinatesRef.push(this.coordObj)
          Vue.set(this, "center", {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        }
      );
    }
    this.addToArray();
  },
  beforeDestroy() {
    // we do cleanup
    Geolocation.clearWatch(this.geoId);
  }
};
</script>

<style scoped>
:root {
  --map-size: 600px;
}

@media (max-width: 500px) {
  :root {
    --map-size: 500px;
  }
}
.map {
  margin: auto;
  width: 500px;
  height: 500px;
}

/* @media screen (max-width); */
</style>