<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title class="absolute-center">
          {{ title }}
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  computed: {
    title() {
      console.log(this.$route)
      let currentPath = this.$route.fullPath
      if (currentPath == '/') return 'informavirus'
      else if (currentPath == '/auth') return 'Login'
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
