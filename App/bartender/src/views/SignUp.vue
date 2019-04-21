<template>
  <div class="sign-up">
    <p>Let's create a new account !</p>
    <input type="text" v-model="userName" placeholder="User Name"><br>
    <input type="text" v-model="phoneNumber" placeholder="Phone Number"><br>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <button @click="signUp">Sign Up</button>
    <span>or go back to <router-link to="/login">login</router-link>.</span>
  </div>
</template>

 <script>
  import firebase from 'firebase'
  import Services from '@/services'

  export default {
    name: 'SignUp',
    data() {
      return {
        userName: '',
        phoneNumber: '',
        email: '',
        password: ''
      }
    },
    methods: {
      signUp () {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            this.saveUser({
              id: user.user.uid,
              userName: this.userName,
              phoneNumber: this.phoneNumber,
              email: this.email
            })
          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        );
      },
      saveUser (user) {
        const that = this
        Services.saveUser(user)
          .then((response) => {
            that.$store.dispatch('setUser', response)
            that.$router.replace('home')
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
  }
</script>

<style lang="sass">

</style>