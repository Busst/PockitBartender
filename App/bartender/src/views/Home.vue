

<template>
  <div class="home">
    
    <h1>Welcome {{ userName }}!</h1>
    
    <button @click="logout">Logout</button><br/>
    <router-link :to="{ name: 'AddDrink' }" ><h3>Add Drink</h3></router-link><br/>
    <input class="cc" v-model="searchTerm" placeholder="search drinks">
    <div v-for="drink in drinks" :key="drink.name">
      <router-link :to="{ name: 'Drink', params:{ name: drink.name } }"><h2>{{ drink.name }}</h2></router-link>
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

<style scoped>


.cc {
  background-color: aqua;
  font-size: 12pt;
  position: relative;
  width: 50%;
  top: -75px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
h1, h2 {
  text-align: center; 
  
}
h1 {
  padding-top: 2%;
  padding-bottom: 2%;
  background-color: #b1dda2
}
h3 {
  text-align: center;
  font-size: 16pt;
  position: relative;
  top: 20px;
  
}
p {
  text-align: center;
  font-size: 13pt;
  white-space: pre-line;
}

button {
  text-align: center;
  position: absolute;
  transition: .5s ease;
  top: 5.5%;
  left: 93%;
}
  
</style>



