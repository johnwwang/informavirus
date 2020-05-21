<template>
  <q-page>
    <div class="q-pa-sm">
      <q-btn outline rounded color="primary" label="Symptoms Page" to="/buttons" />
    </div>
      <coordinates 
        v-bind:trackingF="isTrackingF"
        v-bind:trackingC="isTrackingC"
        v-bind:trackingS="isTrackingS" />
    <div>
      <maps
        v-bind:trackingF="isTrackingF"
        v-bind:trackingC="isTrackingC"
        v-bind:trackingS="isTrackingS"
        v-bind:windowWidth="windowWidth"
        v-bind:windowHeight="windowHeight - 250"
        :key="componentkey"
      />
    </div>
  </q-page>
</template>

<script>
import Vue from "vue";
// Vue.forceUpdate();
export default {
  props: ["decision"],
  data: {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    isTrackingF: null,
    isTrackingC: null,
    isTrackingS: null,
    componentkey: 0
  },
  components: {
    coordinates: require("components/coordinates.vue").default,
    maps: require("components/maps.vue").default
  },
  methods: {
    load() {
      if (window.localStorage) {
        if (!localStorage.getItem("firstLoad")) {
          localStorage["firstLoad"] = true;
          window.location.reload();
        } else localStorage.removeItem("firstLoad");
      }
    },
    loadtrackingF() {
      this.isTrackingF = window.localStorage.getItem("isTrackingF");
      console.log(this.isTrackingF);
    },
    loadtrackingC() {
      this.isTrackingC = window.localStorage.getItem("isTrackingC");
      console.log(this.isTrackingC);
    },
    loadtrackingS() {
      this.isTrackingS = window.localStorage.getItem("isTrackingS");
      console.log(this.isTrackingS);
    }
  },
  created() {
    decision == false
    this.load();
    this.loadtrackingF();
    this.loadtrackingC();
    this.loadtrackingS();
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
  },
  mounted() {
    window.onresize = () => {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
      this.componentKey += 1;
    };
  }
};
</script>

<style>
</style>
