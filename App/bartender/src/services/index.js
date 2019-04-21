import axios from 'axios'

const API_BASE = 'https://agile-thicket-89184.herokuapp.com'

export default {
  saveUser: user => axios.post(API_BASE + '/users', user),
  getUser: id => axios.get(API_BASE + '/users/' + id),
  saveDrink: drink => axios.post(API_BASE + '/drinks', drink),
  getDrink: name => axios.get(API_BASE + '/drinks/' + name),
  filterDrinks: searchObject => axios.post(API_BASE + "/drinks/filter", searchObject)
}
