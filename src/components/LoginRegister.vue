<template>
  <q-form @submit="submitForm">
    <q-input 
      v-if="tab == 'register'"
      class="flex q-pa-md"
      rounded outlined 
      v-model="formData.name" 
      label="Name" />
    <q-input 
      class="flex q-pa-md"
      rounded outlined 
      v-model="formData.email" 
      label="Email"
      type="email" />
    <q-input 
      class="flex q-pa-md"
      rounded outlined 
      v-model="formData.password" 
      label="Password"
      type="password" />
    <div align="center">
      <q-btn 
      unelevated 
      rounded color="primary" 
      type="submit"
      :label="tab" />
    </div>
  </q-form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['tab'],
  data () {
    return {
      formData: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions('store', ['registerUser']),
    submitForm () {
      if (this.tab == 'login') {
        console.log('login user')
      }
      else {
       this.registerUser(this.formData)
      }
    }
  }
}
</script>