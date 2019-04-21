<template>
  <div class="add-drink">
    <input v-model="name">
    <input v-model="recipe">
    <button @click="handleSaveDrink">Concoct Drink!</button>
  </div>
</template>

<script>
  import firebase from 'firebase'
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
      handleSaveDrink (id) {
        const that = this
        Services.saveDrink(id)
          .then((response) => {
            that.$router.push({
                name: 'Drink',
                params: { userId: '123' }
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

