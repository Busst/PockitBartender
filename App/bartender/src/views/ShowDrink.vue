<template>
    <div class="show-drink">
        <router-link :to="{ name: 'Home' }">Home</router-link>
        <template v-if="isEditing">
            <h1>{{ drinkName }}</h1>
            <textarea v-model="drinkRecipe" placeholder="Drink Recipe"></textarea><br/>
            <textarea v-model="drinkDirections" placeholder="Drink Directions"></textarea><br/>
            <button @click="handleSaveDrink">Concoct Drink!</button>
        </template>
        <template v-else>
            <h1>{{ drinkName }}</h1>
            <p>{{ drinkRecipe }}</p>
            <p>{{ drinkDirections }}</p>
            <button @click="handleEdit">Update Recipe</button>
        </template>
    </div>
</template>

<script>
  import Services from '@/services'

  export default {
    name: 'ShowDrink',
    data() {
      return {
        drinkName: '',
        drinkRecipe: '',
        drinkDirections: '',
        isEditing: false
      }
    },
    mounted () {
        const that = this
        const name = this.$route.params.name
        if (!name) {
            this.$router.push({ name: 'Home' })
        } else {
            Services.getDrink(name)
                .then((response) => {
                    const drink = response.data
                    that.drinkName = drink.name
                    that.drinkRecipe = drink.recipe
                    that.drinkDirections = drink.directions
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    },
    methods: {
        handleEdit () {
            this.isEditing = true
        },
        handleSaveDrink () {
            const that = this
            const drink = {
                name: this.drinkName,
                recipe: this.drinkRecipe,
                directions: this.drinkDirections
            }
            Services.saveDrink(drink)
            .then((response) => {
                that.isEditing = false
            })
            .catch((error) => {
                console.log(error)
            })
      }
    }
  }
</script>


