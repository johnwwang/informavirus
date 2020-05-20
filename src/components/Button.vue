<template>
  <q-page>
    <div class="q-pa-md text-center">
    <p style="font-size: 300%"> <strong> Do you display symptoms? </strong></p>
    <p><em> If you select yes, you will have the option to track your location </em> </p>
    </div>
    <br/>


    <div class="q-pa-md" style="max-width: 600px">
    <q-card>
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

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="fever" class="q-pa-none">

          <q-splitter
            v-model="splitterModel"
            style="height: 250px">

            <template v-slot:before>
              <q-tabs
                v-model="innerTab"
                vertical
                class="text-teal">
                <q-tab name="innerfever" icon="check" label="Check" />
                <q-tab name="innershivers" icon="info" label="Info" />
              </q-tabs>
            </template>

            <template v-slot:after>
              <q-tab-panels
                v-model="innerTab"
                animated
                transition-prev="slide-down"
                transition-next="slide-up">
                <q-tab-panel name="innerfever">
                  <div style = "margin-left: auto; margin-right: auto;" class="q-pa-xl row items-start q-gutter-md"> 
                    <q-btn
                      class = "qbutton"
                      @click = writetolocal(true) 
                      size="20px"
                      round
                      color="teal"
                      label="Yes"
                      to="/"
                    />
                  <q-space/>
                    <q-btn
                      class = "qbutton"
                      @click = writetolocal(false)
                      size="20px"
                      round
                      color="teal"
                      label="No"
                      to="/"
                    />
                  </div>
                </q-tab-panel>

                <q-tab-panel name="innershivers">
                  <div class="text-h4 q-mb-md">fever</div>
                  <p>You can tell you have a fever if you...</p>
                </q-tab-panel>
              </q-tab-panels>
            </template>

          </q-splitter>
        </q-tab-panel>

        <q-tab-panel name="cough">
              <q-splitter
            v-model="splitterModel"
            style="height: 250px">

            <template v-slot:before>
              <q-tabs
                v-model="innerTab"
                vertical
                class="text-teal">
                <q-tab name="innerfever" icon="check" label="Check" />
                <q-tab name="innershivers" icon="info" label="Info" />
              </q-tabs>
            </template>

            <template v-slot:after>
              <q-tab-panels
                v-model="innerTab"
                animated
                transition-prev="slide-down"
                transition-next="slide-up">
                <q-tab-panel name="innerfever">
                  <div style = "margin-left: auto; margin-right: auto;" class="q-pa-xl row items-start q-gutter-md"> 
                    <q-btn
                      class = "qbutton"
                      @click = writetolocal(true) 
                      size="20px"
                      round
                      color="teal"
                      label="Yes"
                      to="/"
                    />
                  <q-space/>
                    <q-btn
                      class = "qbutton"
                      @click = writetolocal(false)
                      size="20px"
                      round
                      color="teal"
                      label="No"
                      to="/"
                    />
                  </div>
                </q-tab-panel>

                <q-tab-panel name="innershivers">
                  <div class="text-h4 q-mb-md">cough</div>
                  <p>You can tell you have a cough if you...</p>
                  
                </q-tab-panel>
              </q-tab-panels>
            </template>

          </q-splitter>
        </q-tab-panel>

        <q-tab-panel name="shivers">
              <q-splitter
            v-model="splitterModel"
            style="height: 250px">

            <template v-slot:before>
              <q-tabs
                v-model="innerTab"
                vertical
                class="text-teal">
                <q-tab name="innerfever" icon="check" label="Check" />
                <q-tab name="innershivers" icon="info" label="Info" />
              </q-tabs>
            </template>

            <template v-slot:after>
              <q-tab-panels
                v-model="innerTab"
                animated
                transition-prev="slide-down"
                transition-next="slide-up">
                <q-tab-panel name="innerfever">
                  <div style = "margin-left: auto; margin-right: auto;" class="q-pa-xl row items-start q-gutter-md"> 
                    <q-btn
                      class = "qbutton"
                      @click = writetolocal(true) 
                      size="20px"
                      round
                      color="teal"
                      label="Yes"
                      to="/"
                    />
                  <q-space/>
                    <q-btn
                      class = "qbutton"
                      @click = writetolocal(false)
                      size="20px"
                      round
                      color="teal"
                      label="No"
                      to="/"
                    />
                  </div>
                </q-tab-panel>

                <q-tab-panel name="innershivers">
                  <div class="text-h4 q-mb-md">shivers</div>
                  <p>You can tell you have the shivers if you... haha shiver is a funny word</p>
                </q-tab-panel>
              </q-tab-panels>
            </template>

          </q-splitter>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>




    
  </q-page>
</template>

<script>
import Vue from 'vue';
export default {
  data () {
    return {
      tab: 'fever',
      innerTab: 'innerfever',
      splitterModel: 20
    }
  },

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