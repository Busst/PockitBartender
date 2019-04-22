<template>
  <div class="sign-up">
    <p>Let's create a new account !</p>
    <input class="n name" type="text" v-model="userName" placeholder="User Name"><br>
    <input class="n name" type="text" v-model="email" placeholder="Email"><br>
    <input class="n name" type="password" v-model="password" placeholder="Password"><br>
    <button @click="signUp">Sign Up</button>
    <p>Or you can <router-link to="/login">login</router-link>!</p>
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

p {
  text-align: center;
}


.n {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: -10px;
  background-color:blanchedalmond;
  
  max-width: 300px;
  min-width: 300px;
  max-height: 110px;
  min-height: 110px;
}
.name {
  min-height: 17px;
  max-height: 17px;
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
