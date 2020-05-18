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

  },
  methods: {
    load() {
      if( window.localStorage )
      {
        if( !localStorage.getItem('firstLoad') )
        {
          localStorage['firstLoad'] = true;
          window.location.reload();
        }  
        else
          localStorage.removeItem('firstLoad');
      }
    }
  }, 

  created() {
    this.load()
  }
}
</script>

<style>
</style>
