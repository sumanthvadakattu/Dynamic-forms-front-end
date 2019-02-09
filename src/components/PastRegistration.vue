<template>
  <div>
    <br/><br/>
    <b-row>
      <b-col cols='12'>
        <b-card v-for="(form,index) in dataform" :key="index" v-bind:title="form.formname" class="mb-2 ml-3 float-left" style="overflow:auto; max-width: 15rem; min-width: 13rem; min-height: 10rem;max-height: 15rem">
          <p class="card-text">
            {{ form.formdesc }}
          </p>
          <b-button v-bind:href="form.formlink" variant="primary" class="float-right">Check details</b-button>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        localhostdata: '',
        dataform: []
      }
    },
    methods: {
      mainfunction: function () {
        if (localStorage.getItem('UserName') === null) {
          location.href = '/login'
        } else {
          this.localhostdata = localStorage.getItem('UserName')
        }
      },
      dataretrival: function () {
        var maindatasset = {
          gmail: this.localhostdata
        }
        this.$http.post('http://localhost:3000/gettingtheusername', maindatasset, {headers: {'Content-type': 'application/json'}})
          .then(
            response => {
              var mainresponse = response.data
              var secondlocalname = mainresponse[0].firstname + '' + mainresponse[0].lastname
              localStorage.setItem('secondUserName', secondlocalname)
              var secondarydata = {
                key: secondlocalname
              }
              this.$http.post('http://localhost:3000/gettingtheformdata', secondarydata, {headers: {'Content-type': 'application/json'}})
                .then(
                  response => {
                    var mainresponse = response.data
                    var datalength = mainresponse.values.length
                    for (var i = 0; i < datalength; i = i + 1) {
                      var maindataform = {
                        formname: mainresponse.values[i].formName,
                        formdesc: mainresponse.values[i].formDescription,
                        formlink: 'http://localhost:8080/output?formname=' + mainresponse.values[i].formName
                      }
                      this.dataform.push(maindataform)
                    }
                    console.log(this.dataform)
                  }, error => {
                    console.log(error)
                    alert('please check your internet connection')
                  })
            }, error => {
              console.log(error)
              alert('please check your internet connection')
            })
      }
    },
    created: function () {
      this.mainfunction()
      this.dataretrival()
    }
  }
</script>

<style scoped>

</style>
