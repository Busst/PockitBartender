<template>
  <div class="home">
    <h1>Hello {{ userName }}</h1>
    <button @click="logout">Logout</button><br/>
    <router-link :to="{ name: 'AddDrink' }">Add Drink</router-link><br/>
    <input v-model="searchTerm" placeholder="search drinks">
    <div v-for="drink in drinks" :key="drink.name">
      <router-link :to="{ name: 'Drink', params:{ name: drink.name } }"><h1>{{ drink.name }}</h1></router-link>
      <p>{{ drink.recipe }}</p>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import Services from '@/services'

export default {
  name: 'home',
   data() {
      return {
        searchTerm: '',
        drinks: []
      }
    },
    mounted () {
      if (this.user === null) {
        const user = firebase.auth().currentUser
        const that = this
        Services.getUser(user.uid)
          .then((response) => {
            that.$store.dispatch('setUser', response.data)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    watch: {
      searchTerm: {
        handler (searchTerm) {
          if (searchTerm.length === 0) return
          const that = this
          Services.filterDrinks({ searchTerm })
            .then((response) => {
              that.drinks = response.data
            })
            .catch((error) => {
              console.log(error)
            })
        }
      }
    },
    computed: {
      user () {
        return this.$store.state.user
      },
      userName () {
        return this.user && this.user.userName
      }
    },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}
</script>
