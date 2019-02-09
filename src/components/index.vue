<template>
	<div>
    <!-- parallex effect -->
    <!--header-->
		<div class="parallex_imageone_section">
      <b-navbar toggleable="md" variant="faded" type="light" class="index_main_header">
        <b-container class="index_header_container">
          <b-navbar-brand>
          <span class="index_header">Scalable Forms</span>
          </b-navbar-brand>
          <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
          <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav class="ml-auto">
              <div class="intro_signin mr-2">
                <router-link to="/login"><span>Login</span></router-link>
              </div>
            </b-navbar-nav>
          </b-collapse>
        </b-container>
      </b-navbar>
      <div class="caption">
        <span>CREATE ONLINE FORMS WITH EASE</span>
      </div>
      <div class="caption_option">
        <span>In less than a minute with Scalable forms</span>
      </div>
      <div class="caption_button">
        <b-button variant="primary">Create form - It's free</b-button>
      </div>
    </div>
	</div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    methods: {
      mainfunction: function () {
        if (localStorage.getItem('UserName') != null) {
          location.href = '/home'
        }
      }
    },
    created: function () {
      this.mainfunction()
    }
  }
</script>

<style>
  /* parallex effect code*/
  .parallex_imageone_section,.parallex_imageone_section4,.parallex_imageone_section2,.parallex_imageone_section3 {
    position: relative;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .parallex_imageone_section {
    background-image: url(../assets/images/she-174403-Business-meeting.jpg);
    min-height: 100vh;
  }
  .caption {
    position: absolute;
    left: 0;
    top: 40%;
    width: 100%;
    text-align: center;
    color: #000;
  }
  .caption span {
    padding: 8px;
    background-color: rgba(0,0,0,0.70);
    color: white;
    font-size: 250%;
    letter-spacing: 3px;
    box-shadow: 0px 0px 10px rgba(128,128,128,0.7);
  }
  .caption_option {
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    text-align: center;
    color: #000;
  }
  .caption_option span {
    background-color: rgba(0,0,0,0.50);
    color: white;
    font-size: 150%;
    letter-spacing: 2px;
    box-shadow: 0px 0px 10px rgba(128,128,128,0.7);
  }
  .caption_button {
    position: absolute;
    left: 0;
    top: 60%;
    width: 100%;
    text-align: center;
    color: #000;
  }

  /* navbar header */
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
  .intro_signin span {
    font-size: 125%;
    color: white;
  }
  .intro_signin span:hover {
    font-size: 130%;
    color: #DF362D;
    text-decoration: none;
  }
  @media (max-width: 575px) {
    .index_header_container {
      height: 100%;
    }
    .caption span {
      font-size: 100%;
      letter-spacing: 1px;
    }
    .caption_option span {
      font-size: 100%;
      letter-spacing: 0px;
    }
  }
</style>
