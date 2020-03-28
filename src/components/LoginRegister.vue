<template>
  <q-form>
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
      :label="tab" />
    </div>
  </q-form>
</template>

<script>
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
  }
}
</script>