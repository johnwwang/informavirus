<template>
  <q-page>
    <div class="q-pa-md text-center">
    <p style="font-size: 300%"> <strong> Do you display symptoms? </strong></p>
    <p><em> If you select yes, you will have the option to track your location </em> </p>
    </div>
    <br/>


  <div class="q-pa-md" style="max-width: 600px">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify">
        <q-tab name="fever" label="Fever" />
        <q-tab name="cough" label="Cough" />
        <q-tab name="shivers" label="Shivers" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated ref="panelName">
        
        <!--  -->
        <q-tab-panel name="fever" class="q-pa-none">

          <q-splitter
            v-model="splitterModel"
            style="height: 250px">

            <template v-slot:before>
              <q-tabs
                v-model="innerTab"
                vertical
                class="text-teal">
                <q-tab name="innerCheck" icon="check" label="Check" />
                <q-tab name="innerInfo" icon="info" label="Info" />
              </q-tabs>
            </template>

            <template v-slot:after>
              <q-tab-panels
                v-model="innerTab"
                animated
                transition-prev="slide-down"
                transition-next="slide-up">
                <q-tab-panel name="innerCheck">
                  <div style = "margin-left: auto; margin-right: auto;" class="q-pa-xl row items-start q-gutter-md"> 
                    <q-btn
                      class = "qbutton"
                      @click = FhandlerYes()
                      size="20px"
                      round
                      color="teal"
                      label="Yes"
                    />
                  <q-space/>
                    <q-btn
                      class = "qbutton"
                      @click = FhandlerNo()
                      size="20px"
                      round
                      color="teal"
                      label="No"
                     
                    />
                  </div>
                </q-tab-panel>
                <q-tab-panel name="innerInfo">
                  <div class="text-h4 q-mb-md">fever</div>
                  <p>You can tell you have a fever if you...</p>
                </q-tab-panel>
              </q-tab-panels>
            </template>
          </q-splitter>
        </q-tab-panel>
        <!--  -->
        <q-tab-panel name="cough" class="q-pa-none">
          <q-splitter
            v-model="splitterModel"
            style="height: 250px">
            
            <template v-slot:before>
              <q-tabs
                v-model="innerTab"
                vertical
                class="text-teal">
                <q-tab name="innerCheck" icon="check" label="Check" />
                <q-tab name="innerInfo" icon="info" label="Info" />
              </q-tabs>
            </template>
            
            <template v-slot:after>
              <q-tab-panels
                v-model="innerTab"
                animated
                transition-prev="slide-down"
                transition-next="slide-up">
                <q-tab-panel name="innerCheck">
                  <div style = "margin-left: auto; margin-right: auto;" class="q-pa-xl row items-start q-gutter-md"> 
                    <q-btn
                      class = "qbutton"
                      @click = ChandlerYes()
                      size="20px"
                      round
                      color="teal"
                      label="Yes"
                    />
                  <q-space/>
                    <q-btn
                      class = "qbutton"
                      @click = ChandlerNo()
                      size="20px"
                      round
                      color="teal"
                      label="No"
                    />
                  </div>
                </q-tab-panel>

                <q-tab-panel name="innerInfo">
                  <div class="text-h4 q-mb-md">cough</div>
                  <p>You can tell you have a cough if you...</p>
                  
                </q-tab-panel>
              </q-tab-panels>
            </template>

          </q-splitter>
        </q-tab-panel>
        <!--  -->
        <q-tab-panel name="shivers" class="q-pa-none">
          <q-splitter
            v-model="splitterModel"
            style="height: 250px">

            <template v-slot:before>
              <q-tabs
                v-model="innerTab"
                vertical
                class="text-teal">
                <q-tab name="innerCheck" icon="check" label="Check" />
                <q-tab name="innerInfo" icon="info" label="Info" />
              </q-tabs>
            </template>

            <template v-slot:after>
              <q-tab-panels
                v-model="innerTab"
                animated
                transition-prev="slide-down"
                transition-next="slide-up">
                <q-tab-panel name="innerCheck">
                  <div style = "margin-left: auto; margin-right: auto;" class="q-pa-xl row items-start q-gutter-md"> 
                    <q-btn
                        class = "qbutton"
                        @click = ShandlerYes()
                        size="20px"
                        round
                        color="teal"
                        label="Yes"
                        to="/"
                      />
                    <q-space/>
                      <q-btn
                        class = "qbutton"
                        @click = ShandlerNo()
                        size="20px"
                        round
                        color="teal"
                        label="No"
                        to="/"
                      />
                  </div>
                </q-tab-panel>

                <q-tab-panel name="innerInfo">
                  <div class="text-h4 q-mb-md">shivers</div>
                  <p>You can tell you have the shivers if you... haha shiver is a funny word</p>
                </q-tab-panel>
              </q-tab-panels>
            </template>

          </q-splitter>
        </q-tab-panel>
      </q-tab-panels>
  </div>

  <div class="q-pa-md absolute-bottom-right">
    <q-btn 
    round 
    icon="help_outline" 
    size="20px"
    color="grey"/>
  </div>

  <div class="q-pa-md q-gutter-md absolute-bottom-right" style="font-size: 36px">
      <q-icon  class="text-purple cursor-pointer">
      <q-popup-proxy :offset="[10, 10]">
        <q-banner class="bg-purple text-white">
          <template v-slot:avatar>
            <q-icon/>
          </template>
            Your coordinates will ONLY be used for a plot on our heat map. Your name and information is NOT attatched to your coordinates.
        </q-banner>
      </q-popup-proxy>
    </q-icon>
      
  </div>
 
  </q-page>
</template>

<script>
import Vue from 'vue';
export default {
  data () {
    return {
      tab: 'fever',
      innerTab: 'innerCheck',
      splitterModel: 20,
    }
  },

  methods: {
    nextTab () {
      this.$refs.panelName.next()
    },
    writetolocalFever (trackingbool) {
      window.localStorage.setItem("isTrackingF", trackingbool)
    },
    writetolocalCough (trackingbool) {
      window.localStorage.setItem("isTrackingC", trackingbool)
    },
    writetolocalShivers (trackingbool) {
      window.localStorage.setItem("isTrackingS", trackingbool)
    },  
    FhandlerYes () {
      this.writetolocalFever(true)
      this.nextTab()
    },
    FhandlerNo () {
      this.writetolocalFever(false)
      this.nextTab()
    },
    ChandlerYes () {
      this.writetolocalCough(true)
      this.nextTab()
    },
    ChandlerNo () {
      this.writetolocalCough(false)
      this.nextTab()
    },
    ShandlerYes () {
      this.writetolocalShivers(true)
      this.nextTab()
    },
    ShandlerNo () {
      this.writetolocalShivers(false)
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