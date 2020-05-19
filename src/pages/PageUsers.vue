<template>
  <q-page>
    <div class="q-pa-sm">
      <q-btn outline rounded color="primary" label="Symptoms Page" to="/buttons" />
    </div>
    <coordinates v-bind:tracking="isTracking" />
    <div>
      <maps
        v-bind:tracking="isTracking"
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
  data: {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    isTracking: null,
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
    loadtracking() {
      this.isTracking = window.localStorage.getItem("isTracking");
      console.log(this.isTracking);
    }
  },
  created() {
    this.load();
    this.loadtracking();
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
