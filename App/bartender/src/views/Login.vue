<template>
  <div class="login">
    <h3>Sign In</h3>
    <input class="cc" type="text" v-model="email" placeholder="Email"><br>
    <input class="cc" type="password" v-model="password" placeholder="Password"><br>
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


<style scoped>

.cc {
  background-color: aqua;
  font-size: 12pt;
  position: relative;
  width: 30%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: -5px;
}

h3 {
  text-align: center;
  font-size: 16pt;
  position: relative;
  top: 20px;
  padding-bottom: 10px;
  
}
p {
  padding-bottom: 10px;
  text-align: center;
  font-size: 11pt;
}

button {
  
  text-align: center;
  position: relative;
  transition: .5s ease;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0px;
}
  
</style>
