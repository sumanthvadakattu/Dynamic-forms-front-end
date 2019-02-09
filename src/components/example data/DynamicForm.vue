<template>
  <div>
    <b-container>
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

          </b-form>
        </b-card>

        <br/>

        <b-button v-b-modal.mainmodel type="submit" variant="success">Add Question</b-button>

        <div>
          <b-modal ref="mainmodel" id="mainmodel" hide-footer hide-header>

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
        maindataset: 0
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
          this.$refs.mainmodel.hide()
          this.dataname = ''
          this.datatype = ''
        }
      }
    }
  }
</script>

<style scoped>
  .delete_icon {
    cursor: pointer;
    margin-top: 3.2%;
  }
  .main_form_align {
    width: 95%;
  }
  .popupquestion {
    font-size: 120%;
    margin-bottom: 2%;
    text-shadow: 1px 1px 1px lightgray;
  }
  @media (max-width: 575px) {
    .delete_icon {
      cursor: pointer;
      margin-top: 11%;
    }
  }
</style>
