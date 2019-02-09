<template>
  <div>
    <div class="form_main_container">
      <div>
        <b-navbar toggleable="md" variant="faded" type="light" class="index_main_header">
          <b-container class="index_header_container">
            <b-navbar-brand>
              <router-link to="/home"><span class="index_header">Scalable Forms</span></router-link>
            </b-navbar-brand>
            <b-button class="float-right" size="sm" type="submit" variant="success" @click="logOut()"> Logout </b-button>
          </b-container>
        </b-navbar>
      </div>
      <br/>
      <b-container fluid class="form_main_data_container">
        <b-row>
          <b-col class="left_frame" cols="2" align="center"></b-col>
          <b-col class="right_frame col-md-8">
            <b-row class="justify-content-md-center">
              <b-col cols="12" md="10">
                <b-card>
                  <b-card no-body>
                    <b-tabs card>
                      <b-tab disabled></b-tab>
                      <b-tab title="Name">
                        {{ formnameid }}
                      </b-tab>
                      <b-tab title="Description" >
                        {{ formdescid }}
                      </b-tab>
                      <b-tab title="Date">
                        {{ formdateid }}
                      </b-tab>
                      <b-tab title="Shared Link">
                        <div class="float-right">
                          <b-button variant="outline-success" style="cursor: pointer" size="sm" v-clipboard:copy="formsharelinkid" @click="maincopyfunction()">copy</b-button>
                          <b-modal hide-header hide-footer ref="popover" style="text-align:center;font-size: 110%"> copied </b-modal>
                        </div>
                        <div><a href="#">{{ formsharelinkid }}</a></div>
                      </b-tab>
                      <b-tab title="output">
                        <b-form class="main_form_align">
                          <b-card v-for="(form,index) in forms" :key="index" no-body style="border: 1px solid white">
                            <!-- text and password -->
                            <div v-if="form.data === 'text'">
                              <b-form-group v-bind:label="form.name" class="labels">
                                <b-form-input v-bind:type="form.field"></b-form-input>
                              </b-form-group>
                            </div>
                            <!-- textarea -->
                            <div v-if="form.data === 'textarea'">
                              <b-form-group v-bind:label="form.name" class="labels">
                                <b-form-textarea v-bind:type="form.field" :rows="3" :max-rows="6">
                                </b-form-textarea>
                              </b-form-group>
                            </div>
                            <!-- button -->
                            <div v-else-if="form.data === 'button'">
                              <b-form-group v-bind:label="form.name">
                                <b-form-radio-group :options="form.field"></b-form-radio-group>
                              </b-form-group>
                            </div>
                            <!-- checkbox -->
                            <div v-else-if="form.data === 'checkbox'">
                              <b-form-group v-bind:label="form.name">
                                <b-form-checkbox-group :options="form.field"></b-form-checkbox-group>
                              </b-form-group>
                            </div>
                            <!-- select box -->
                            <div v-else-if="form.data === 'select'">
                              <b-form-group v-bind:label="form.name">
                                <b-form-select :options="form.field"></b-form-select>
                              </b-form-group>
                            </div>
                          </b-card>
                          <b-button class="float-right" type="submit" variant="success" disabled> Submit </b-button>
                          <br/>
                        </b-form>
                      </b-tab>
                      <b-tab title="Responses">
                        <div class="responsesstyling">
                          Total Number of entries: {{ totalnumberofresponses }}
                          <br/>
                        </div>
                      </b-tab>
                    </b-tabs>
                  </b-card>
                </b-card>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        forms: [],
        formnameid: '',
        formdescid: '',
        formdateid: '',
        formsharelinkid: '',
        totalnumberofresponses: ''
      }
    },
    methods: {
      logOut: function () {
        localStorage.removeItem('UserName')
        localStorage.removeItem('secondUserName')
        location.reload()
      },
      mainfunction: function () {
        if (localStorage.getItem('UserName') === null) {
          location.href = '/login'
        } else {
          // this.mainimpparseddata = localStorage.getItem('UserName')
        }
      },
      maincopyfunction: function () {
        this.$refs.popover.show()
      },
      mainfunctionload: function () {
        var fornmane = this.$route.query.formname
        var userformdata = {
          name: localStorage.getItem('secondUserName'),
          form: fornmane
        }
        this.$http.post('http://localhost:3000/alltheresponses', userformdata, {headers: {'Content-type': 'application/json'}})
          .then(
            response => {
              var mainresponse = response.data
              this.totalnumberofresponses = mainresponse.datavalues.length
              console.log(mainresponse.datavalues)
            }, error => {
              console.log(error)
            })
        this.$http.post('http://localhost:3000/formgenerateddataoutput', userformdata, {headers: {'Content-type': 'application/json'}})
          .then(
            response => {
              var mainresponse = response.data
              // console.log(mainresponse)
              // description data
              this.formnameid = mainresponse.formName
              this.formdescid = mainresponse.formDescription
              this.formdateid = mainresponse.formgeneratedDate
              this.formsharelinkid = 'http://localhost:8080/data?data=' + mainresponse.creatorName + '&data=' + this.formnameid
              // text
              var textlength = mainresponse.formgeneratedData[0].text.length
              for (var i = 0; i < textlength; i = i + 1) {
                if (mainresponse.formgeneratedData[0].text[i]._id != null) {
                  for (var tl = 0; tl < mainresponse.formgeneratedData[0].text[i]._id.length; tl = tl + 1) {
                    this.forms.push(mainresponse.formgeneratedData[0].text[i]._id[tl])
                  }
                }
              }
              // textarea
              var textarealength = mainresponse.formgeneratedData[0].textarea.length
              for (var j = 0; j < textarealength; j = j + 1) {
                if (mainresponse.formgeneratedData[0].textarea[j] != null) {
                  for (var tal = 0; tal < mainresponse.formgeneratedData[0].textarea[j]._id.length; tal = tal + 1) {
                    this.forms.push(mainresponse.formgeneratedData[0].textarea[j]._id[tal])
                  }
                }
              }
              // button
              var buttonlength = mainresponse.formgeneratedData[0].button.length
              for (var k = 0; k < buttonlength; k = k + 1) {
                if (mainresponse.formgeneratedData[0].button[k]._id != null) {
                  for (var bl = 0; bl < mainresponse.formgeneratedData[0].button[k]._id.length; bl = bl + 1) {
                    this.forms.push(mainresponse.formgeneratedData[0].button[k]._id[bl])
                  }
                }
              }
              // checkbox
              var checkboxlength = mainresponse.formgeneratedData[0].checkbox.length
              for (var l = 0; l < checkboxlength; l = l + 1) {
                if (mainresponse.formgeneratedData[0].checkbox[l]._id != null) {
                  for (var cl = 0; cl < mainresponse.formgeneratedData[0].checkbox[l]._id.length; cl = cl + 1) {
                    this.forms.push(mainresponse.formgeneratedData[0].checkbox[l]._id[cl])
                  }
                }
              }
              // select
              var selectlength = mainresponse.formgeneratedData[0].select.length
              for (var m = 0; m < selectlength; m = m + 1) {
                if (mainresponse.formgeneratedData[0].select[m]._id != null) {
                  for (var sl = 0; sl < mainresponse.formgeneratedData[0].select[m]._id.length; sl = sl + 1) {
                    this.forms.push(mainresponse.formgeneratedData[0].select[m]._id[sl])
                  }
                }
              }
            }, error => {
              console.log(error)
            })
      }
    },
    created: function () {
      this.mainfunction()
      this.mainfunctionload()
    }
  }
</script>

<style scoped>
  .form_main_container {
    position: relative;
    width: 100%;
    min-height: 100vh;
    height: 100%;
    background-attachment: fixed;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: rgba(0, 0, 0, 0.44);
  }
  .index_main_header {
    color: white;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .index_header_container {
    height: 40px;
  }
  .index_header {
    color: white;
    font-size: 125%;
  }
  .form_main_data_container {
    max-height: 80%;
  }
  .left_frame {
    min-height: 80vh;
    height: 100%;
  }
  .right_frame {
    border: 0px solid black;
    box-shadow: 0px 0px 10px black;
    padding-top: 30px;
  }
  .responsesstyling {
    font-size: 120%;
  }
</style>
