    
import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

let app = ''

const config = {
  apiKey: "AIzaSyAj4gBW8ejKsPKk7CaqANi9nSNKKYxNNZQ",
  authDomain: "pockitbartender.firebaseapp.com",
  databaseURL: "https://pockitbartender.firebaseio.com",
  projectId: "pockitbartender",
  storageBucket: "pockitbartender.appspot.com",
  messagingSenderId: "572305886962"
}

firebase.initializeApp(config)

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
