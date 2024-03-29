import axios from 'axios'

const API_BASE = 'https://gentle-lowlands-90309.herokuapp.com'
//const API_BASE = 'http://localhost:3000'

export default {
  saveUser: user => axios.post(API_BASE + '/users', user),
  getUser: id => axios.get(API_BASE + '/users/' + id),
  saveDrink: drink => axios.post(API_BASE + '/drinks', drink),
  getDrink: name => axios.get(API_BASE + '/drinks/' + name),
  filterDrinks: searchObject => axios.post(API_BASE + "/drinks/filter", searchObject),
  upVoteDrink: drink => axios.post(API_BASE + '/drinks/upvote', drink)
}
