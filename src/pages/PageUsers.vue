<template>
  <q-page>
    <!-- <template> -->
      <coordinates />
    <!-- </template> -->
    <!-- <template> -->
      <maps />
    <!-- </template> -->
  </q-page>
</template>

<script>


export default {
	components: {
    'coordinates' : require('components/Coordinates.vue').default,
    'maps' : require('components/maps.vue').default
  }
}
</script>

<style>
</style>
