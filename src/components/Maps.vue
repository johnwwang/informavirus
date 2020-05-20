<template>
  <q-page padding>
    <div class="q-pa-md" style="max-width: 600px">
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab name="flu" label="Flu" />
        <q-tab name="fever" label="Fever" />
        <q-tab name="shivers" label="Shivers" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>

        <q-tab-panel name="flu">
            <div :v-if="this.arrayObj">
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
        </q-tab-panel>

        <q-tab-panel name="fever">
            <div :v-if="this.arrayObj">
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
        </q-tab-panel>

        <q-tab-panel name="shivers">
          <div :v-if="this.arrayObj">
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
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
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
      tab: 'flu',
      position: "determining...",
      center: {
        lat: 39.6918784,
        lng: -89.6925696
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

  
  mounted() {
    this.getCurrentPosition();

    // we start listening
    if (this.tracking == "true") {
      // removed this.geoid =
      Geolocation.watchPosition(
        { enableHighAccuracy: true },
        (position, err) => {
          console.log("New GPS position");
          this.position = position;

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