<template>
      <div 
        v-if="this.trackingF == 'true' || this.trackingC == 'true' || this.trackingS == 'true'" 
        class="text-center">

        <h4>{{(userDetails.name.charAt(0).toUpperCase()+userDetails.name.slice(1)).trim()}}'s Current Position:</h4>
        <p>
          <b>Latitude:</b>
          {{ position.coords.latitude }}
        </p>
        <p>
          <b>Longitude:</b>
          {{ position.coords.longitude }}
        </p>
        <br />
        <q-btn
          style="margin-bottom: 20px;"
          v-on:click="addCoords"
          elevated
          rounded
          color="primary"
          type="submit"
          label="Add Coordinate"
        />
      </div>
      <div v-else class="text-center">
        <h4>Heatmap of symptoms (you are not being tracked)</h4>
      </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import { mapActions } from "vuex";
import { Plugins } from "@capacitor/core";
const { Geolocation } = Plugins;
import * as VueGoogleMaps from "vue2-google-maps";
import { coordinatesRef, firebaseAuth } from "boot/firebase";

export default {
  props: ["trackingF", "trackingC", "trackingS"],
  computed: {
    ...mapState("store", ["userDetails"])
  },
  data() {
    return {
      position: "determining...",
      FCoordObj: {
        userId: "",
        FLatitude: "",
        FLongitude: "",
      },
      CCoordObj: {
        userId: "",
        CLatitude: "",
        CLongitude: "",
      },
      SCoordObj:{
        userId: "",
        SLatitude: "",
        SLongitude: "",
      }
    };
  },
  methods: {
    getCurrentPosition() {
      if (this.trackingF == "true" || this.trackingC == "true" || this.trackingS == "true") {
        Geolocation.getCurrentPosition().then(position => {
          console.log("Current", position);
          this.position = position;
        });
      }
    },
    addCoords() {
      if (this.trackingF == "true") {
        coordinatesRef.push(this.FCoordObj);
      }
      if (this.trackingC == "true") {
        coordinatesRef.push(this.CCoordObj);
      }
      if (this.trackingS == "true") {
        coordinatesRef.push(this.SCoordObj);
      }
      console.log("hello")
    }
  },

  mounted() {
    this.getCurrentPosition();

    // we start listening
    if (this.trackingF == "true" || this.trackingC == "true" || this.trackingS == "true") {
      Geolocation.watchPosition(
        { enableHighAccuracy: true },
        (position, err) => {
          console.log("New GPS position -- coordinates");
          this.position = position;

          // TURN ON TO ADD TO DATABASE
          // coordinatesRef.push(this.coordObj)
          this.FCoordObj.FLatitude = position.coords.latitude;
          this.FCoordObj.FLongitude = position.coords.longitude;
          this.FCoordObj.userId = firebaseAuth.currentUser.uid;
          this.CCoordObj.CLatitude = position.coords.latitude;
          this.CCoordObj.CLongitude = position.coords.longitude;
          this.CCoordObj.userId = firebaseAuth.currentUser.uid;
          this.SCoordObj.SLatitude = position.coords.latitude;
          this.SCoordObj.SLongitude = position.coords.longitude;
          this.SCoordObj.userId = firebaseAuth.currentUser.uid;
          
        }
      );
    }
  },
  beforeDestroy() {
    // we do cleanup
    Geolocation.clearWatch(this.geoId);
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Vollkorn&display=swap");
* {
  font-family: "Vollkorn", serif;
}
</style>
