import firebase from "firebase/";

const firebaseConfig = {
  apiKey: "AIzaSyDhtO-LI6XcrM1jtyRYqxdCUah-OvdMxEU",
  authDomain: "amigo-73b2a.firebaseapp.com",
  projectId: "amigo-73b2a",
  storageBucket: "amigo-73b2a.appspot.com",
  messagingSenderId: "577212242455",
  appId: "1:577212242455:web:3e447cf25622cd74005a52",
  measurementId: "G-BYJYN5ZFYW",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
