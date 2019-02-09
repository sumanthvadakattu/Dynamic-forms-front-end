<template>
  <div>
    <div class="form_main_container">
      <b-container fluid class="form_main_data_container">
        <b-row>
          <b-col class="left_frame" cols="2" align="center"></b-col>
          <b-col class="right_frame col-md-8">
            <b-row class="justify-content-md-center">
              <b-col cols="12" md="10">
                <div v-if="maindataproto">
                  <b-card class="regdatamainbackground">
                    <div class="heading">
                      {{ formnameid }}
                    </div>
                    <div class="description">
                      {{ formdescid }}
                    </div>
                  </b-card>
                  <b-card>
                    <b-form class="main_form_align" id="sainath" @submit.prevent="submitdata()">
                      <b-card v-for="(form,index) in forms" :key="index" no-body style="border: 1px solid white">
                        <!-- text and password -->
                        <div v-if="form.data === 'text'">
                          <b-form-group v-bind:label="form.name" class="labels">
                            <b-form-input v-bind:type="form.field" v-bind:name="form.name"></b-form-input>
                          </b-form-group>
                        </div>
                        <!-- textarea -->
                        <div v-if="form.data === 'textarea'">
                          <b-form-group v-bind:label="form.name" class="labels">
                            <b-form-textarea v-bind:name="form.name" :rows="3" :max-rows="6"></b-form-textarea>
                          </b-form-group>
                        </div>
                        <!-- button -->
                        <div v-else-if="form.data === 'button'">
                          <b-form-group v-bind:label="form.name">
                            <b-form-radio-group :options="form.field" v-bind:name="form.name"></b-form-radio-group>
                          </b-form-group>
                        </div>
                        <!-- checkbox -->
                        <div v-else-if="form.data === 'checkbox'">
                          <b-form-group v-bind:label="form.name">
                            <b-form-checkbox-group :options="form.field" v-bind:name="form.name"></b-form-checkbox-group>
                          </b-form-group>
                        </div>
                        <!-- select box -->
                        <div v-else-if="form.data === 'select'">
                          <b-form-group v-bind:label="form.name">
                            <b-form-select :options="form.field" v-bind:name="form.name"></b-form-select>
                          </b-form-group>
                        </div>
                      </b-card>
                      <b-button class="float-right" type="submit" variant="success"> Submit </b-button>
                      <br/>
                    </b-form>
                  </b-card>
                </div>
                <div v-else>
                  hit his is sainth <b-button @click="reload()" type="submit" variant="primary" size="sm">click to register another person</b-button>
                </div>
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
        maindataproto: true,
        finalsequence: {
          username: '',
          formname: '',
          data: []
        }
      }
    },
    methods: {
      reload: function () {
        location.reload()
      },
      submitdata: function () {
        var serialize = require('form-serialize')
        var form = document.querySelector('#sainath')
        var obj = serialize(form, { hash: true, empty: true })
        this.finalsequence.data.push(obj)
        this.$http.post('http://localhost:3000/datafromenduser', this.finalsequence, {headers: {'Content-type': 'application/json'}})
          .then(
            response => {
              var mainresponse = response.data
              console.log(mainresponse)
              if (mainresponse !== 'success') {
                alert('Pl')
              } else {
                // location.href = '/'
                this.maindataproto = false
              }
            }, error => {
              console.log(error)
            })
      },
      mainfunctionload: function () {
        var username = location.search.split('data=')[1]
        var fornmane = location.search.split('data=')[2]
        var datamainusername = username.substring(0, username.length - 1)
        var userformdata = {
          name: datamainusername,
          form: fornmane
        }
        this.$http.post('http://localhost:3000/formgenerateddataoutput', userformdata, {headers: {'Content-type': 'application/json'}})
          .then(
            response => {
              var mainresponse = response.data
              // data for inserting in to the database
              this.finalsequence.username = mainresponse.creatorName
              this.finalsequence.formname = mainresponse.formName
              // description data
              this.formnameid = mainresponse.formName
              this.formdescid = mainresponse.formDescription
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
    background-image: url(../assets/images/datausers.jpg);
  }
  .form_main_data_container {
    max-height: 80%;
  }
  .left_frame {
    min-height: 80vh;
    height: 100%;
  }
  .right_frame {
    padding-top: 30px;
  }
  .regdatamainbackground {
    color: white;
    background-color: rgba(0,0,0,0.29);
  }
  .regdatamainbackground .heading {
    font-size: 190%;
    text-shadow: 2px 3px 4px gray;
  }
  .regdatamainbackground .description {
    font-size: 120%;
  }
</style>
