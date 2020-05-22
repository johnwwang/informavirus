<template>
  <q-page padding>
    <div class="q-pa-md" style="max-width: 600px">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab name="fever" label="Fever" />
        <q-tab name="cough" label="Cough" />
        <q-tab name="shivers" label="Shivers" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated >

        <q-tab-panel name="fever">
            <div :v-if="this.FArrayObj">
              <vue-google-heatmap
                :v-if="this.FArrayObj.length > 0"
                :points="FArrayObj"
                :lat="center.lat"
                :lng="center.lng"
                :initial-zoom="7"
                :width="this.windowWidth"
                :height="this.windowHeight"
                class="map"
              />
          </div>
        </q-tab-panel>

        <q-tab-panel name="cough">
            <div :v-if="this.CArrayObj">
              <vue-google-heatmap
                :v-if="this.CArrayObj.length > 0 "
                :points="CArrayObj"
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
          <div :v-if="this.SArrayObj">
              <vue-google-heatmap
                :v-if="this.SArrayObj.length > 0 "
                :points="SArrayObj"
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
  props: ["trackingF", "trackingC", "trackingS", "windowWidth", "windowHeight"],
  data() {
    return {
      tab: 'fever',
      position: "determining...",
      center: {
        lat: 41.8781,
        lng: -87.6298
      },
      FArrayObj: null,
      CArrayObj: null,
      SArrayObj: null,
    };
  },

  methods: {
    getCurrentPosition() {
      if (this.trackingF == "true" || this.trackingC == "true" || this.trackingS == "true") {
        Geolocation.getCurrentPosition().then(position => {
          this.position = position;
        });
      }
    },

    addToArray() {
      coordinatesRef.on("value", gotdata, errData);
      var that = this;
      function gotdata(data) {
        var FArray = [];
        var CArray = [];
        var SArray = [];
        // console.log(data.val());
        var coordinates = data.val();
        var keys = Object.keys(coordinates);
        // console.log("KEYS" + keys);
        for (var i = 0; i < keys.length; i++) {
          var k = keys[i];
          var FLatitude = coordinates[k].FLatitude;
          var FLongitude = coordinates[k].FLongitude;
          var CLatitude = coordinates[k].CLatitude;
          var CLongitude = coordinates[k].CLongitude;
          var SLatitude = coordinates[k].SLatitude;
          var SLongitude = coordinates[k].SLongitude;
          if (FLatitude && FLongitude) {
            FArray.push({ lat: FLatitude, lng: FLongitude });
          }
          if (CLatitude && CLongitude) {
            CArray.push({ lat: CLatitude, lng: CLongitude });
          }
          if (SLatitude && SLongitude) {
            SArray.push({ lat: SLatitude, lng: SLongitude });
          }
        }
        that.FArrayObj = FArray;
        that.CArrayObj = CArray;
        that.SArrayObj = SArray;
      }

      function errData(err) {
        console.log("Error");
        console.log(err);
      }
      console.log(that.FArrayObj);
      console.log(that.CArrayObj);
      console.log(that.SArrayObj);
    }
  },

  
  mounted() {
    this.getCurrentPosition();

    // we start listening
    if (this.trackingF == "true" || this.trackingC == "true" || this.trackingS == "true") {
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