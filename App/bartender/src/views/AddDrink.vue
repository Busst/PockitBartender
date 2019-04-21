<template>
  <div class="add-drink">
      <router-link :to="{ name: 'Home' }">Home</router-link>
      <h1>Concoct Drink</h1>
    <input v-model="name" placeholder="Drink Name"><br/>
    <textarea v-model="recipe" placeholder="Drink Recipe"></textarea><br/>
    <button @click="handleSaveDrink">Concoct Drink!</button>
  </div>
</template>

<script>
  import Services from '@/services'

  export default {
    name: 'AddDrink',
    data() {
      return {
        name: '',
        recipe: ''
      }
    },
    methods: {
      handleSaveDrink () {
        const that = this
        const drink = {
            name: this.name,
            recipe: this.recipe
        }
        Services.saveDrink(drink)
          .then((response) => {
            that.$router.push({
                name: 'Drink',
                params: { name: response.data.name }
            })
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

