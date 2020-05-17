<template>
  <q-page>
    <p class="q-pa-md text-center" style="font-size: 200%"> Tap whether you have a fever or not! </P>
    <br/>
    <br/>
    <br/>
    <br/>
    <div class="q-pa-xl row items-start q-gutter-md"> 
      <q-btn
        
        size="40px"
        round
        color="teal"
        label="NF"
        to="/"
      />
    <q-space/>
      <q-btn
        size="40px"
        round
        color="teal"
        label="F"
        to="/"
      />
    </div>

  </q-page>
</template>

<script>
import Vue from 'vue';
export default {
  data() {

  },


methods: {
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Vollkorn&display=swap");
* {
  font-family: "Vollkorn", serif;
}
</style>