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
    // ...mapActions ('locationStore', ['changeCoord'])
  },
  // WTF IS A VUE.JS LIFECYCLE HOOK
  mounted () {
    this.handleAuthStateChanged ()
    // this.changeCoord ()
  }
}
</script>
