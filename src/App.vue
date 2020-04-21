<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions ('store', ['handleAuthStateChanged']),
    ...mapActions ('locationStore', ['addCoord'])
  },
  // WTF IS A VUE.JS LIFECYCLE HOOK
  mounted () {
    this.handleAuthStateChanged ()
    this.addCoord ()
  }
}
</script>
