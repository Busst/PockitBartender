<template>
  <div class="home">
    <button @click="logout">Logout</button>
    <router-link :to="{ name: 'AddDrink' }">Add Drink</router-link>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'home',
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}
</script>
