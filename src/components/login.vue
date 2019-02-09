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
      <div class="caption">
        <div class="main_container_blur">
        </div>
        <b-container>
          <b-row class="justify-content-md-center">
            <b-col md="5" class="login_main_parent_container">
              <div>
                <div class="mt-4 mb-4">
                  <h5 style="float: left;">{{ mainheader }}</h5>
                </div>
                <br/>
                <div class="mt-5 mb-5">
                  <div style="font-size: 150%; float: left;">Sign in</div><br/><br/>
                  <div style="font-size: 90%; float: left;">to continue to {{mainheader}}</div>
                </div>
                <div class="mb-5 mt-4" style="text-align: left;">
                  <b-form @submit="onSubmit" v-if="show">  <!-- @reset="onReset" -->
                    <b-form-group label="Email address" label-for="email" >
                       <b-form-input id="email" type="email" v-model="form.email" required placeholder="Enter your email" style="background-color: rgba(0, 0, 0, 0.79);color: white"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Password" label-for="password">
                       <b-form-input id="password" type="password" v-model="form.password" required placeholder="Enter your password" style="background-color: rgba(0, 0, 0, 0.79);color: white"></b-form-input>
                    </b-form-group>
                    <div align="right">
                      <b-button type="submit" variant="primary sm" class="mt-2 mb-3" >Submit</b-button>
                    </div>
                    <div align="center">
                      New to {{mainheader}} <router-link to="/registration" varient="primary"><span class="register_validate">( Register here )</span></router-link>
                    </div>
                  </b-form>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        form: {
          email: '',
          password: ''
        },
        mainHeader: '',
        show: true
      }
    },
    computed: {
      mainheader: function () {
        return (this.mainHeader = 'Scalable Forms')
      }
    },
    methods: {
      mainfunction: function () {
        if (localStorage.getItem('UserName') != null) {
          location.href = '/home'
        }
      },
      onSubmit: function (event) {
        event.preventDefault()
        let maindata = {
          gmail: this.form.email,
          password: this.form.password
        }
        this.$http.post('http://localhost:3000/login', maindata, {headers: {'Content-type': 'application/json'}})
          .then(
            response => {
              var mainresponse = response.data
              console.log(mainresponse)
              if (mainresponse !== 'success') {
                alert('Please check your username and password')
              } else {
                localStorage.setItem('UserName', maindata.gmail)
                location.href = '/home'
              }
            }, error => {
              console.log(error)
              alert('please check your internet connection')
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
  .main_container_blur {
    filter: blur(1px);
    position: absolute;
    left: 32.5%;
    top: 30%;
    width: 35%;
    text-align: center;
    color: #000;
    top: -6px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.51);
  }
  .caption {
    position: absolute;
    left: 0;
    top: 16%;
    width: 100%;
    text-align: center;
    color: white;
  }
  .register_validate {
    font-size: 120%;
    color: white;
    background-color: rgba(0, 0, 0, 0.82);
    padding: 5px;
  }
  .register_validate:hover {
    font-size: 122%;
  }
  @media (max-width: 575px) {
    .main_container_blur {
      width: 100%;
      left: 0;
      height: 100%;
    }
    .caption {
      top: 13.8%;
    }
  }
</style>
