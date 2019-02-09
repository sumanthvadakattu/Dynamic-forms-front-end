<template>
  <div>
    <div class="parallex_imageone_section">
      <b-navbar toggleable="md" variant="faded" type="light" class="index_main_header">
        <b-container class="index_header_container">
          <b-navbar-brand>
            <router-link to="/"><span class="index_header">Scalable Forms</span></router-link>
          </b-navbar-brand>
        </b-container>
      </b-navbar>
      <b-container class="mt-4 mb-4">
        <b-row>
          <b-col md="7">
          </b-col>
          <b-col md="5" class="registration_main_container">
            <div class="sign_up_container">
              <div class="signup_header">Sign Up</div>
              <div class="signup_header_caption">to continue to Scalable forms</div>
            </div>

            <div>
              <b-form @submit="regiatrationSubmit" @reset="regiatrationReset" v-if="show">
                <!-- firstname -->
                <b-form-group label="Firstname" label-for="firstname" class="labels">
                  <b-form-input id="firstname" type="text" v-model="form.firstName" required placeholder="Enter your firstname" class="data"></b-form-input>
                </b-form-group>

                <!-- lastname -->
                <b-form-group label="Lastname" label-for="lastname" class="labels">
                  <b-form-input id="lastname" type="text" v-model="form.lastName" required placeholder="Enter your lastname" class="data"></b-form-input>
                </b-form-group>

                <!-- gmail -->
                <b-form-group label="Gmail" label-for="gmail" class="labels">
                  <b-form-input id="gmail" type="email" v-model="form.gmail" required placeholder="Enter your email" class="data"></b-form-input>
                </b-form-group>

                <!-- password -->
                <b-form-group label="Password" label-for="password" class="labels">
                  <b-form-input id="password" type="password" v-model="form.Password" required placeholder="Enter your password" class="data"></b-form-input>
                </b-form-group>

                <!-- birthday -->
                <b-form-group label="Birthday" label-for="birthday" class="labels">
                  <b-form-input id="birthday" type="date" v-model="form.birthday" required placeholder="Enter your birthday" class="data"></b-form-input>
                </b-form-group>

                <!-- gender -->
                <b-form-group label="Gender" label-for="gender" class="labels">
                  <!--<b-form-input id="gender" type="text" v-model="form.gender" required placeholder="Enter your gender"></b-form-input>-->
                  <b-form-select id="gender" :options="gender" required v-model="form.gender" class="data"></b-form-select>
                </b-form-group>

                <!-- mobile -->
                <b-form-group label="Mobile number" label-for="mobile" class="labels">
                  <b-form-input id="mobile" type="text" v-model="form.mobile" required placeholder="Enter your mobile" class="data"></b-form-input>
                </b-form-group>

                <!-- nation -->
                <b-form-group label="Nation" label-for="nation" class="labels">
                  <!--<b-form-input id="nation" type="text" v-model="form.nation" required placeholder="Enter your nation"></b-form-input>-->
                  <b-form-select id="nation" :options="nation" required v-model="form.nation" class="data"></b-form-select>
                </b-form-group>

                <b-row class="signin_positions">
                  <b-col md="5" offset-md="7">
                    <b-button type="reset" variant="primary sm">Reset</b-button>
                    <b-button type="submit" variant="primary sm">Submit</b-button>
                  </b-col>
                </b-row>
                <div class="registration_login labels">
                  Already member in Scalable Forms <router-link to="/login" varient="primary"><span class="login_validate">( Login here )</span></router-link>
                </div>
              </b-form>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'registration',
    data () {
      return {
        form: {
          firstName: '',
          lastName: '',
          gmail: '',
          Password: '',
          birthday: '',
          gender: null,
          mobile: '',
          nation: null
        },
        gender: [
          { text: 'I am...', value: null },
          'Male', 'Female', 'Other', 'Rather not say'
        ],
        nation: [
          { text: 'Select nation', value: null },
          'India', 'Canada', 'Singapore', 'Others'
        ],
        show: true
      }
    },
    // functionalities in functions
    methods: {
      mainfunction: function () {
        if (localStorage.getItem('UserName') != null) {
          location.href = '/home'
        }
      },
      regiatrationSubmit: function (event) {
        event.preventDefault()
        // alert(JSON.stringify(this.form))
        let registrationmaindata = {
          firstname: this.form.firstName,
          lastname: this.form.lastName,
          gmail: this.form.gmail,
          password: this.form.Password,
          birthday: this.form.birthday,
          gender: this.form.gender,
          mobilenumber: this.form.mobile,
          nation: this.form.nation
        }
        this.$http.post('http://localhost:3000/registration', registrationmaindata, {headers: {'Content-type': 'application/json'}})
          .then(
            response => {
              var mainresponse = response.data
              console.log(mainresponse)
              if (mainresponse !== 'success') {
                alert('Pl')
              } else {
                location.href = '/login'
              }
            }, error => {
              console.log(error)
              alert('pleace check your network connection')
            })
      },
      regiatrationReset: function (event) {
        event.preventDefault()
        /* Reset our form values */
        this.form.firstName = ''
        this.form.lastName = ''
        this.form.gmail = ''
        this.form.Password = ''
        this.form.birthday = ''
        this.form.gender = null
        this.form.mobile = ''
        this.form.nation = null
        /* Trick to reset/clear native browser form validation state */
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    },
    created: function () {
      this.mainfunction()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .parallex_imageone_section {
    position: relative;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .parallex_imageone_section {
    background-image: url(../assets/images/bike-wallpaper-1920x1080.jpg);
    min-height: 100vh;
  }
  .index_main_header {
    color: white;
    background-color: rgba(0,0,0,0.45);
  }
  .index_header_container {
    height: 40px;
  }
  .index_header {
    color: white;
    font-size: 125%;
  }
  .registration_main_container {
    box-shadow: 0 0 5px lightgray;
    background-color: rgba(0, 0, 0, 0.55);
    margin-bottom: 2%;
  }
  .sign_up_container {
    margin: 5% 0% 10% 0%;
  }
  .signup_header {
    font-size: 140%;
    color: white;
  }
  .signup_header_caption {
    font-size: 90%;
    margin-bottom: 7%;
    color: white;
  }
  .registration_login {
    text-align: center;
    margin: 6% 0% 3% 0%;
  }
  .labels {
    color: white;
  }
  .labels .data {
    background-color: rgba(0, 0, 0, 0.79);
    color: white;
  }
  .login_validate {
    font-size: 120%;
    color: white;
    background-color: rgba(0, 0, 0, 0.82);
    padding: 5px;
  }
  .login_validate:hover {
    font-size: 122%;
  }
</style>
