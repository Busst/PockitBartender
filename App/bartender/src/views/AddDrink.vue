<template>
  <div class="add-drink">
      <router-link :to="{ name: 'Home' }"><h2>Home</h2></router-link>
      <h1>Concoct Drink</h1>
    <input class="n name" v-model="name" placeholder="Drink Name"><br/>
    <textarea class= "n" rows=7 v-model="recipe" placeholder="Drink Recipe"></textarea><br/>
    <textarea class= "n d" rows=7 v-model="directions" placeholder="Additional Directions"></textarea><br/>
    <button @click="handleSaveDrink">Build Drink!</button>
  </div>
</template>

<script>
  import Services from '@/services'

  export default {
    name: 'AddDrink',
    data() {
      return {
        name: '',
        recipe: '',
        directions: ''
      }
    },
    methods: {
      handleSaveDrink () {
        const that = this
        const drink = {
            name: this.name,
            recipe: this.recipe,
            directions: this.directions
        }
        
        Services.saveDrink(drink)
          .then((response) => {
            that.$router.push({
                name: 'Drink',
                params: { name: response.data.name,
                          directions: response.data.directions
                           }
            })
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
  }
</script>


<style scoped>



h1 {
  text-align: center;
  padding-top: 2%;
  padding-bottom: 2%;
  background-color: #b1dda2
}
h2 {
  position: relative;
  margin-left: 10px;
  top: 67px;
  font-size: 12pt;
}

.n {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
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
.d {
  min-height: 140px;
  max-height: 140px;
}

button {
  display: block;
  margin: 0 auto;
}

</style>

