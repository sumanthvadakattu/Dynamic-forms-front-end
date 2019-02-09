<template>
  <b-container>
    <b-container>
      <div>
      <b-btn v-b-modal.modal1 class="mt-3 mb-3" variant="primary">Add data</b-btn>
      <b-modal hide-footer id="modal1" title="Bootstrap-Vue">
        <!-- <p class="my-4">Hello from modal!</p> -->
        <form @submit="data_form_submit">
          <md-input-container>
            <label>Name</label>
            <md-input v-model="name"></md-input>
          </md-input-container>
          <md-input-container>
            <label>Input type</label>
            <md-input v-model="input"></md-input>
          </md-input-container>
          <md-button type="submit" class="md-raised md-primary">submit</md-button>
        </form>
      </b-modal>  
      <!-- data will be added here -->
      <b-card>
        <b-card-body>
          hi
        </b-card-body>
      </b-card>
      </div>
    </b-container>
  </b-container>
</template>


<script>
  export default ({
    name: 'example',
    data () {
      return {
        name: '',
        input: ''
      }
    },
    methods: {
      data_form_submit () {
        var data = {
          name: this.name,
          inputtype: this.input
        }
        this.$http.post('http://localhost:3000/formgeneratedata', data, {headers: {'Content-type': 'application/json'}})
          .then(
            response => {
              var mainresponse = response.data
              console.log(mainresponse)
              if (mainresponse !== 'success') {
                alert('Pl')
              } else {
                location.href = '/'
              }
            }, error => {
              console.log(error)
            })
      }
    }
  })
</script>

<style scoped>

</style>
