<template>
  <q-page>
    <test />
    <coordinates />
    <maps />
  </q-page>
</template>

<script>
import Vue from 'vue';
// Vue.forceUpdate();
 
export default {
	components: {
    'coordinates' : require('components/coordinates.vue').default,
    'maps' : require('components/maps.vue').default,
    'test' : require('components/test.vue').default
  },

  methods: {
    forcesUpdate() {
      // ...
      this.Vue.$forceUpdate();  // Notice we have to use a $ here
      // ...
      console.log("updated")
    }
  },
    mounted() {
      this.forcesUpdate()
      console.log("created")
    }
}
</script>

<style>
</style>
