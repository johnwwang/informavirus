<template>
  <q-page>
    <!-- <template> -->
      <coordinates />
    <!-- </template> -->
    <!-- <template> -->
      <heatmap />
    <!-- </template> -->
  </q-page>
</template>

<script>


export default {
	components: {
    'coordinates' : require('components/Coordinates.vue').default,
    'heatmap' : require('components/Heatmap.vue').default
  }
}
</script>

<style>
</style>
