<template>
  <b-container>
    <b-button type="submit" variant="success" class="mt-2 mb-2" @click="addEmployee">Add Employee</b-button>
    <b-card v-for="(form, index) in forms" :key="index">
      <div class="float-right" style="cursor: pointer" @click="removeEmployee(index)">
        <span>X</span>
      </div>
      <h4 class="card-title">Add employee (index: {{ index }})</h4>

      <b-form v-if="show">
        <b-form-group>
          <b-form-input type="email" v-model="form.email" required placeholder="Enter your email"></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input type="password" v-model="form.password" required placeholder="Enter your password"></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="outline-primary">Submit</b-button>
      </b-form>

    </b-card>
    <b-button type="submit" @click="maindatacount" variant="outline-primary">Submit</b-button>
  </b-container>
</template>

<script>
  export default {
    name: 'Home',
    data () {
      return {
        forms: [
          {
            email: '',
            password: ''
          }
        ],
        show: true
      }
    },
    methods: {
      addEmployee: function () {
        this.forms.push({
          email: '',
          password: ''
        })
      },
      removeEmployee: function (index) {
        this.forms.splice(index, 1)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
