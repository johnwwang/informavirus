<template>
  <q-card>
    <template>
      <div>
        GPS position of {{ userDetails.name }} :
        <br />
        <strong>Latitude: {{ position.coords.latitude }}</strong>
        <br />
        <strong>Longitude: {{ position.coords.longitude }}</strong>
        <br />
        <strong>{{ coordObj }}</strong>
        <q-btn
          v-on:click="addCoords"
          elevated
          rounded
          color="primary"
          type="submit"
          label="Add Coordinate"
        />
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
        longitude: ""
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
      alert("added to database!");
    }
  },

  mounted() {
    this.getCurrentPosition();

    // we start listening
    this.geoId = Geolocation.watchPosition({enableHighAccuracy: true}, (position, err) => {
      console.log('New GPS position -- coordinates')
      this.position = position
      
      // TURN ON TO ADD TO DATABASE
      // coordinatesRef.push(this.coordObj)
      this.coordObj.latitude = position.coords.latitude
      this.coordObj.longitude = position.coords.longitude
      this.coordObj.userId = firebaseAuth.currentUser.uid 
      
    })
  },
  beforeDestroy() {
    // we do cleanup
    Geolocation.clearWatch(this.geoId);
  }
};
</script>

<style>
</style>
