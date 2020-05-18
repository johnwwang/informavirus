<template>
  <q-page>
    <div class="q-pa-md text-center">
    <p style="font-size: 300%"> <strong> Do you display symptoms? </strong></P>
    <p><em> If you select yes, you will have the option to track your location </em> </p>
    </div>
    <br/>
    <br/>
    <br/>
    <br/>
    <div style = "margin-left: auto; margin-right: auto;" class="q-pa-xl row items-start q-gutter-md"> 
      <q-btn
        class = "qbutton"
        @click = writetolocal(true) 
        size="40px"
        round
        color="teal"
        label="Y"
        to="/"
      />
    <q-space/>
      <q-btn
         class = "qbutton"
         @click = writetolocal(false)
        size="40px"
        round
        color="teal"
        label="N"
        to="/"
      />
    </div>

  </q-page>
</template>

<script>
import Vue from 'vue';
export default {

  methods: {
    writetolocal (trackingbool) {
      window.localStorage.setItem("isTracking", trackingbool)
    }
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Vollkorn&display=swap");
* {
  font-family: "Vollkorn", serif;
}
.qbutton:hover {
  box-shadow: 10px 10px 10px 0px rgb(0,0,0, 0.24)
}
</style>