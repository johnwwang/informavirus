<template>
  <q-card>
    <template>
      <div class="text-center">
        <h4>GPS position of {{ userDetails.name.charAt(0).toUpperCase() + userDetails.name.slice(1) }} :</h4>
        <br />
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
          v-on:click="addCoords"
          elevated
          rounded
          color="primary"
          type="submit"
          label="Add Coordinate"
        />
        <br />
      </div>
    </template>
  </q-card>
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
  computed: {
    ...mapState("store", ["userDetails"])
  },
  data() {
    return {
      position: "determining...",
      coordObj: {
        userId: "",
        latitude: "",
        longitude: "",
        fever: false
      }
    };
  },
  methods: {
    // ...mapActions('locationStore', ['changeCoord']),
    getCurrentPosition() {
      Geolocation.getCurrentPosition().then(position => {
        console.log("Current", position);
        this.position = position;
      });
    },
    addCoords() {
      coordinatesRef.push(this.coordObj);
      alert("Added Coordinate to the Database!");
    }
  },

  mounted() {
    this.getCurrentPosition();

    // we start listening
    this.geoId = Geolocation.watchPosition(
      { enableHighAccuracy: true },
      (position, err) => {
        console.log("New GPS position -- coordinates");
        this.position = position;

        // TURN ON TO ADD TO DATABASE
        // coordinatesRef.push(this.coordObj)
        this.coordObj.latitude = position.coords.latitude;
        this.coordObj.longitude = position.coords.longitude;
        this.coordObj.userId = firebaseAuth.currentUser.uid;
      }
    );
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
