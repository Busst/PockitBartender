

<template>
  <div>
    <button @click="logout">Logout</button>
    
    <h1>Welcome {{ userName }}!</h1>
    
    <router-link :to="{ name: 'AddDrink' }" ><h3>Add Drink</h3></router-link><br/>
    <input class="cc" v-model="searchTerm" placeholder="search drinks">
    <ul class="content" v-for="drink in drinks" :key="drink.name">
      <li>
        <router-link :to="{ name: 'Drink', params:{ name: drink.name } }" class="lonks"><h2>{{ drink.name }}</h2></router-link>
        <template v-if="upOff && upvoteTest( { name: drink.name } )">
          <img @click="upVote( { name: drink.name } )" src="../assets/upArrowOff.png" class="arrow">
        </template>
        <template v-else>
          <img @click="upVote( { name: drink.name } )" src="../assets/upArrowOn.png" class="arrow">
        </template>
        <p :name="drink.name" class="rating">{{ drink.rating }}</p>
        <template v-if="downOff && downvoteTest( { name: drink.name } )">
          <img @click="downVote( { name: drink.name } )" src="../assets/upArrowOff.png" class="arrow down">
        </template>
        <template v-else>
          <img @click="downVote( { name: drink.name } )" src="../assets/upArrowOn.png" class="arrow down">
        </template>
        <p>{{ drink.recipe }}</p>
      </li>
    </ul>
  </div>
</template>


<script>
import firebase, { functions } from 'firebase'
import Services from '@/services'

export default {
  name: 'home',
   data() {
      
      return {
        searchTerm: '',
        drinks: [],
        downOff: true,
        upOff: true,
        SHOW_MAX: 5,
        drinkVotes: []
      }
      
    },
    mounted () {
      if (this.user === null) {
        const user = firebase.auth().currentUser;
        const that = this
        Services.getUser(user.uid)
          .then((response) => {
            that.$store.dispatch('setUser', response.data);
            var i;
            var upArray =  response.data.upvotedDrinks.split("::");
            var downArray =  response.data.downvotedDrinks.split("::");
            
            for (i = 0; i < upArray.length; i++){
              if (upArray[i].length === 0) continue;
              var name = upArray[i];
              var newVote = {
                name,
                upvote: false,
                downvote: true
              };
              this.drinkVotes.push(newVote);
            }
            for (i = 0; i < downArray.length; i++){
              if (downArray[i].length === 0) continue;
              var name = downArray[i];
              var newVote = {
                name,
                upvote: true,
                downvote: false
              };
              this.drinkVotes.push(newVote);
            }
            
            
          })
          .catch((error) => {
            console.log(error)
          })
      }
     
    },
    watch: {
      searchTerm: {
        handler (searchTerm) {
          if (searchTerm.length === 0) {
            this.drinks = [];
            return;
          }

          const that = this
          Services.filterDrinks({ searchTerm })
            .then((response) => {
              that.drinks = [];
              for (var i = 0; i < that.SHOW_MAX && i < response.data.length; i++){
                that.drinks[i] = response.data[i];
                var name = that.drinks[i].name;
                if (this.findVote(name)){
                  var newVote = {
                    name,
                    upvote: true,
                    downvote: true
                  }
                  this.drinkVotes.push(newVote);

                }
                
              }
              
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
    },
    upVote: function(name) {
      this.upOff++;  //forces update
      var newCount = 0;
      for (var i = 0; i < this.drinkVotes.length; i++){

        if (name.name === this.drinkVotes[i].name){

          if (this.drinkVotes[i].upvote){
            newCount++;
            if (!this.drinkVotes[i].downvote){
              newCount++;
              this.drinkVotes[i].downvote = !(this.drinkVotes[i].downvote);
            }
            
          } else {
            newCount--;
          }
          document.getElementsByName(name.name)[0].innerHTML = parseInt(document.getElementsByName(name.name)[0].innerHTML) + newCount;
          this.drinkVotes[i].upvote = !(this.drinkVotes[i].upvote);
          
          var updateRating = {
            name: name.name,
            rating: newCount,
            user: this.user.id,
            vote: "up"
          }
          Services.upVoteDrink(updateRating)
            .then((response) => {

            })
            .catch(err => {
              console.log(err);
            });
          return;
        }

      }
      
    },
    downVote: function(name) {
      this.downOff++;  //forces update
      var newCount = 0;
      
      for (var i = 0; i < this.drinkVotes.length; i++){
        if (name.name === this.drinkVotes[i].name){

          if (this.drinkVotes[i].downvote){
            newCount--;
            if (!this.drinkVotes[i].upvote){
              newCount--;
              this.drinkVotes[i].upvote = !(this.drinkVotes[i].upvote);
            }
            
          } else {
            newCount++;
          }
          document.getElementsByName(name.name)[0].innerHTML = parseInt(document.getElementsByName(name.name)[0].innerHTML) + newCount;
          this.drinkVotes[i].downvote = !(this.drinkVotes[i].downvote);
          var updateRating = {
            name: name.name,
            rating: newCount,
            user: this.user.id,
            vote: "down"
          }
          Services.upVoteDrink(updateRating)
            .then((response) => {
              
            })
            .catch(err => {
              console.log(err);
            });
          return;
        }

      }
    },
    upvoteTest: function(name) {
      for (var i = 0; i < this.drinkVotes.length; i++){

        if (name.name === this.drinkVotes[i].name){
          return this.drinkVotes[i].upvote;
        }

      }
      return true;
    },
    downvoteTest: function(name) {
      
      for (var i = 0; i < this.drinkVotes.length; i++){

        if (name.name === this.drinkVotes[i].name){
          return this.drinkVotes[i].downvote;
        }

      }
      return true;
    },
    findVote: function(name) {
      for (var i = 0; i < this.drinkVotes.length; i++){

        if (this.drinkVotes[i].name === name){
          return false;
        }

      }
      return true;
    }
  }
}
</script>

<style scoped>

h1 {
  background-color: #b1dda2;
  padding: 10px;
  margin-bottom: 3px; 
}
h3 {
  padding: 2px;
  margin-top: 2px;
}

h1, h3 {
  text-align: center;
}

.cc {
  width: 50%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}



ul.content {
  
  
  text-align: center;
  margin-left: 25px;
  margin-right: 25px;
}

ul.content h2 {
  display: inline;
  
}

.lonks {
  text-decoration: none;
  color: black;
}



li {
  list-style: none;
}



#count {
  display: inline;
}

.arrow {
  cursor: pointer;
  margin-left: 5px;
  margin-right: 5px;
}
.down {
  transform: rotate(180deg);
}

.rating {
  display: inline;
}

p {
  white-space: pre-line;
}

button {
  background-color: #b1dda2;
  display: block;
  margin-left: 90%;
}



</style>



