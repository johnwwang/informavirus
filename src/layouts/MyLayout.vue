<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="absolute-center">
          {{ title }}
        </q-toolbar-title>

        <q-btn
          to="/auth"
          class="absolute-right q-pr-sm"
          icon="account_circle"
          no-caps
          flat
          dense
          label="Login" />

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
      if (currentPath == '/') return 'InformaVirus'
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
