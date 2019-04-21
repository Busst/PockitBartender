<template>
  <div class="login">
    <h3>Sign In</h3>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <button @click="login">login</button>
    <p>You don't have an account ? You can <router-link to="/sign-up">create one</router-link></p>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import Services from '@/services'

  export default {
    name: 'Login',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      login: function() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            this.getAndSetUser(user.user.uid)
          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        )
      },
      getAndSetUser (id) {
        const that = this
        Services.getUser(id)
          .then((response) => {
            that.$store.dispatch('setUser', response.data)
            that.$router.replace('home')
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
  }
</script>
