import * as firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth';

const app = firebase.initializeApp({
  apiKey: "AIzaSyDWrBGYF-MxYGquPe8Kv7kB0Fi2kUHas7I",
  authDomain: "saving-plant-b5135.firebaseapp.com",
  databaseURL: "https://saving-plant-b5135.firebaseio.com",
  projectId: "saving-plant-b5135",
  storageBucket: "",
  messagingSenderId: "923951065393",
  appId: "1:923951065393:web:b81e2639e8051ae9"
  // apiKey: "AIzaSyBpGAnTkr9V78C1NgKX_KOkNizJiaL-2zs",
  // authDomain: "money-plant-328e6.firebaseapp.com",
  // databaseURL: "https://money-plant-328e6.firebaseio.com",
  // projectId: "money-plant-328e6",
  // storageBucket: "",
  // messagingSenderId: "861867384752",
  // appId: "1:861867384752:web:f601494e92eb869c"
});

export default app