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
            <b-container>
              <!-- form description data-->
              <b-button @click="showmodel()" type="submit" variant="success">Form Description</b-button>
              <b-modal ref="descmodel" v-model="descdatamodel" hide-footer hide-header>

                <div class="headerpopupquestion"> Form Description</div>
                <hr/>

                <div class="popupquestion"> Name of the Form</div>
                <b-form-group>
                  <b-form-input type="text" v-model="formformname"></b-form-input>
                </b-form-group>

                <div class="popupquestion"> Description</div>
                <b-form-group>
                  <b-form-textarea :rows="3" :max-rows="6" v-model="formformdescription"></b-form-textarea>
                </b-form-group>

                <div class="popupquestion"> Date & Time</div>
                <b-form-group>
                  <b-form-input type="text" disabled v-model="formdateandtime"></b-form-input>
                </b-form-group>


                <b-button class="float-right" type="submit" variant="success" @click="descriptionData()">Submit</b-button>

              </b-modal>
              <br/>

              <b-card>
                <b-card v-for="(form,index) in forms" :key="index">

                  <div class="float-right delete_icon" v-if="index != 0" @click="removeForm(index)">
                    <span>delete</span>
                  </div>

                  <b-form class="main_form_align">

                    <!-- text and password -->
                    <div v-if="form.data === 'text'">
                      <b-form-group v-bind:label="form.name" class="labels">
                        <b-form-input v-bind:type="form.field" v-bind:placeholder="form.field" disabled></b-form-input>
                      </b-form-group>
                    </div>

                    <!-- textarea -->
                    <div v-if="form.data === 'textarea'">
                      <b-form-group v-bind:label="form.name" class="labels">
                        <b-form-textarea v-bind:type="form.field" v-bind:placeholder="form.field" disabled :rows="3" :max-rows="6">
                        </b-form-textarea>
                      </b-form-group>
                    </div>

                    <!-- button -->
                    <div v-else-if="form.data === 'button'">
                      <b-form-group v-bind:label="form.name">
                        <b-form-radio-group :options="form.field" disabled></b-form-radio-group>
                      </b-form-group>
                    </div>

                    <!-- checkbox -->
                    <div v-else-if="form.data === 'checkbox'">
                      <b-form-group v-bind:label="form.name">
                        <b-form-checkbox-group :options="form.field" disabled></b-form-checkbox-group>
                      </b-form-group>
                    </div>

                    <!-- select box -->
                    <div v-else-if="form.data === 'select'">
                      <b-form-group v-bind:label="form.name">
                        <b-form-select :options="form.field" disabled></b-form-select>
                      </b-form-group>
                    </div>

                  </b-form>
                </b-card>

                <br/>

                <b-button type="submit" variant="success" @click="addquestionmainmodel()">Add Question</b-button>
                <b-button class="float-right" type="submit" variant="success" @click="finalsubmitenterdata"> Submit </b-button>

                <div>
                  <b-modal ref="mainmodel" v-model="addquestionmodel" hide-footer hide-header>

                    <div class="headerpopupquestion"> Enter Your Question</div>
                    <hr/>

                    <div class="popupquestion"> question name</div>
                    <b-form-group>
                      <b-form-input type="text" v-model="dataname"></b-form-input>
                    </b-form-group>

                    <div class="popupquestion"> question type</div>
                    <b-form-group>
                      <b-form-select type="text" :options="questypeopt" v-model="datatype"></b-form-select>
                    </b-form-group>

                    <!-- options taken for the button and checkboxes -->
                    <div v-if="buttonstatus">
                      <div class="popupquestion"> options</div>
                      <div style="width: 100%;" v-for="(options,index) in buttonOption" :key="index">
                        <span style="line-height: 2.6; padding-left: 3%; cursor: pointer; margin-right: 38.5%;" class="float-right" @click="removeoption(index)" v-if="maindataset != index">delete</span>
                        <b-form-group style="width: 50%;">
                          <b-form-input type="text" v-model="options.datatext"></b-form-input>
                        </b-form-group>
                      </div>
                      <div>
                        <b-button type="submit" variant="success" @click="addOptionData">Add next option</b-button>
                      </div>
                    </div>

                    <br/>
                    <div>
                      <b-button type="submit" variant="success" @click="addData">Add Question</b-button>
                      <b-button class="float-right" type="submit" variant="success" @click="closePopup">Close</b-button>
                    </div>
                  </b-modal>
                </div>
              </b-card>

            </b-container>
          </b-col>
        </b-row>
      </b-container>
      <!-- footer -->
      <div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        forms: [
          {
            name: 'Firstname',
            data: 'text',
            field: 'text'
          }
        ],
        dataname: '',
        datatype: '',
        questypeopt: [
          {value: 'text', text: 'text'},
          {value: 'textarea', text: 'textarea'},
          {value: 'button', text: 'button'},
          {value: 'checkbox', text: 'checkbox'},
          {value: 'select', text: 'select'}
        ],
        buttonstatus: '',
        mainbuttondata: [],
        buttonOption: [
          {
            datatext: ''
          }
        ],
        maindataset: 0,
        flag: true,
        // final upload data
        userformrequirementsfront: {
          key: '',
          values: [{
            creatorName: '',
            formName: '',
            formDescription: '',
            formgeneratedDate: '',
            formgeneratedData: [{
              _id: '',
              text: [
              ],
              textarea: [
              ],
              button: [
              ],
              checkbox: [
              ],
              select: [
              ]
            }]
          }]
        },
        formformname: '',
        formformdescription: '',
        formdateandtime: new Date().toLocaleString(),
        descdatamodel: true,
        addquestionmodel: false
      }
    },
    watch: {
      datatype: function () {
        if (this.datatype === 'button' || this.datatype === 'checkbox' || this.datatype === 'select') {
          this.buttonstatus = true
        } else {
          this.buttonstatus = false
        }
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
      showmodel: function () {
        this.descdatamodel = true
      },
      addquestionmainmodel: function () {
        if (this.formformname === '' || this.formformdescription === '') {
          this.$refs.descmodel.show()
          alert('Please fill form description')
        } else {
          this.addquestionmodel = true
        }
      },
      finalsubmitenterdata: function () {
        // console.log(this.forms)
        if (this.formformname === '' || this.formformdescription === '') {
          this.$refs.descmodel.show()
          alert('Please fill form description')
        } else {
          for (var i = 0; i < this.forms.length; i = i + 1) {
            if (this.forms[i].data === 'text') {
              this.userformrequirementsfront.values[0].formgeneratedData[0].text.push(this.forms[i])
            } else if (this.forms[i].data === 'textarea') {
              this.userformrequirementsfront.values[0].formgeneratedData[0].textarea.push(this.forms[i])
            } else if (this.forms[i].data === 'button') {
              this.userformrequirementsfront.values[0].formgeneratedData[0].button.push(this.forms[i])
            } else if (this.forms[i].data === 'checkbox') {
              this.userformrequirementsfront.values[0].formgeneratedData[0].checkbox.push(this.forms[i])
            } else if (this.forms[i].data === 'select') {
              this.userformrequirementsfront.values[0].formgeneratedData[0].select.push(this.forms[i])
            }
          }
          var userformdata = this.userformrequirementsfront
          console.log(userformdata)
          this.$http.post('http://localhost:3000/formgenerateddata', userformdata, {headers: {'Content-type': 'application/json'}})
            .then(
              response => {
                var mainresponse = response.data
                console.log(mainresponse)
                if (mainresponse !== 'success') {
                  alert('Pl')
                } else {
                  location.href = '/home'
                }
              }, error => {
                console.log(error)
                alert('please check your internet connection')
              })
        }
      },
      descriptionData: function () {
        if (this.formformname === '' || this.formformdescription === '') {
          alert('please fill the fields')
          this.$refs.descmodel.show()
        } else {
          var formNameName = {
            formname: this.formformname,
            username: localStorage.getItem('secondUserName')
          }
          this.$http.post('http://localhost:3000/formcheckdata', formNameName, {headers: {'Content-type': 'application/json'}})
            .then(
              response => {
                var mainresponse = response.data
                console.log(mainresponse)
                if (mainresponse === 'notFind') {
                  this.userformrequirementsfront.key = localStorage.getItem('secondUserName')
                  this.userformrequirementsfront.values[0].creatorName = localStorage.getItem('secondUserName')
                  this.userformrequirementsfront.values[0].formName = this.formformname
                  this.userformrequirementsfront.values[0].formDescription = this.formformdescription
                  this.userformrequirementsfront.values[0].formgeneratedDate = this.formdateandtime
                  this.userformrequirementsfront.values[0].formgeneratedData[0]._id = this.formformname
                  this.$refs.descmodel.hide()
                } else {
                  if (mainresponse !== 'success') {
                    alert('formname already exists please change the form name')
                  } else {
                    this.userformrequirementsfront.key = localStorage.getItem('secondUserName')
                    this.userformrequirementsfront.values[0].creatorName = localStorage.getItem('secondUserName')
                    this.userformrequirementsfront.values[0].formName = this.formformname
                    this.userformrequirementsfront.values[0].formDescription = this.formformdescription
                    this.userformrequirementsfront.values[0].formgeneratedDate = this.formdateandtime
                    this.userformrequirementsfront.values[0].formgeneratedData[0]._id = this.formformname
                    this.$refs.descmodel.hide()
                  }
                }
              }, error => {
                console.log(error)
              })
        }
      },
      closePopup: function () {
        this.$refs.mainmodel.hide()
        this.dataname = ''
        this.datatype = ''
        this.mainbuttondata = []
        while (this.buttonOption.length > 1) {
          this.buttonOption.pop()
        }
        this.buttonOption[0].datatext = ''
        this.maindataset = 0
      },
      removeForm: function (index) {
        this.forms.splice(index, 1)
      },
      addOptionData: function () {
        if (this.buttonOption[this.maindataset].datatext === '') {
          alert('plz fill the option field')
        } else {
          this.buttonOption.push({
            datatext: ''
          })
          this.mainbuttondata.push({
            text: this.buttonOption[this.maindataset].datatext,
            value: this.buttonOption[this.maindataset].datatext
          })
          this.maindataset = this.maindataset + 1
        }
      },
      removeoption: function (index) {
        if (index === this.buttonOption.length - 1) {
          alert('This field data can be changed cannot be deleted')
        } else {
          this.buttonOption.splice(index, 1)
          this.mainbuttondata.splice(index, 1)
          this.maindataset = this.maindataset - 1
        }
      },
      addData: function () {
        if (this.dataname === '' || this.datatype === '') {
          alert('Please fill your requirements in fields')
          this.$refs.mainmodel.show()
        } else {
          if (this.datatype === 'text' || this.datatype === 'textarea') {
            this.forms.push({
              name: this.dataname,
              data: this.datatype,
              field: this.datatype
            })
          } else if (this.datatype === 'button' || this.datatype === 'checkbox' || this.datatype === 'select') {
            if (this.buttonOption[this.maindataset].datatext === '') {
              alert('plz fill the option field')
              this.flag = false
            } else {
              this.mainbuttondata.push({
                text: this.buttonOption[this.maindataset].datatext,
                value: this.buttonOption[this.maindataset].datatext
              })
              this.forms.push({
                name: this.dataname,
                data: this.datatype,
                field: this.mainbuttondata
              })
              this.mainbuttondata = []
              while (this.buttonOption.length > 1) {
                this.buttonOption.pop()
              }
              this.buttonOption[0].datatext = ''
              this.maindataset = 0
            }
          }
          if (this.flag === true) {
            this.$refs.mainmodel.hide()
            this.dataname = ''
            this.datatype = ''
          }
        }
      }
    },
    created: function () {
      this.mainfunction()
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
  .delete_icon {
    cursor: pointer;
    margin-top: 3.2%;
  }
  .main_form_align {
    width: 95%;
  }
  .popupquestion,.headerpopupquestion {
    font-size: 120%;
    margin-bottom: 2%;
    text-shadow: 1px 1px 1px lightgray;
  }
  .headerpopupquestion {
    font-size: 130%;
  }
  @media (max-width: 575px) {
    .left_frame {
      display: none;
    }
    .delete_icon {
      cursor: pointer;
      margin-top: 11%;
    }
  }
</style>
