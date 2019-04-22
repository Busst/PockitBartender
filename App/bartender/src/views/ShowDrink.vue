<template>
    <div class="show-drink">
        <router-link class="ho" :to="{ name: 'Home' }"><h2>Home</h2></router-link>
        <template v-if="isEditing">
            <h1>{{ drinkName }}</h1>
            <textarea class="n" v-model="drinkRecipe" placeholder="Drink Recipe"></textarea><br/>
            <textarea class="n d" v-model="drinkDirections" placeholder="Drink Directions"></textarea><br/>
            <div class="butClass">           
              <button id="but1" name="saveD" @click="handleSaveDrink">Concoct Drink!</button>
              <button id="but2" name="cancelD" @click="handleCancelDrink">Cancel Concoction!</button>
            </div>
        </template>
        <template v-else>
            <h1>{{ drinkName }}</h1>
            <div class="te">
                <p>{{ drinkRecipe }}</p>
						</div>
						<div class="te">
                <p>{{ drinkDirections }}</p>
						</div>
            <button class="edit" name="edit" @click="handleEdit">Update Recipe</button>
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
                    this.$router.push({ name: 'Home' })
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
        },
        handleCancelDrink () {
            const that = this
            const name = this.$route.params.name
            Services.getDrink(name)
                .then((response) => {
                    const drink = response.data
                    that.drinkName = drink.name
                    that.drinkRecipe = drink.recipe
                    that.drinkDirections = drink.directions
                    this.isEditing = false;
                })
            .catch((error) => {
                console.log(error)
            })
        }
    }
  }
</script>


<style scoped>

.butClass {
  width: 300px;
  margin: auto;
}

#but1 {
  width: 140px;
  float: left;
}
#but2 {
  width: 140px;
  float: right;
}
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

p {
	display: inline-block;
	text-align: left;
  white-space: pre-line;
  margin-bottom: 14px;
}
.te {
	text-align: center;
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

 .edit {
  display: block;
  margin: 0 auto;
}

</style>

