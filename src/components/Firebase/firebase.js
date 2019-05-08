import app from "firebase/app";
import { REACT_APP_API_KEY } from "../../secrets";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: REACT_APP_API_KEY,
  authDomain: "bluebubbles-998d5.firebaseapp.com",
  databaseURL: "https://bluebubbles-998d5.firebaseio.com",
  projectId: "bluebubbles-998d5",
  storageBucket: "bluebubbles-998d5.appspot.com",
  messagingSenderId: "406743690960"
};
const firebase = app.initializeApp(config);

class Firebase {
  constructor() {
    // app.initializeApp(config);

    this.auth = firebase.auth();
    this.db = firebase.database();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref("users");
}

export const databaseRef = firebase.database().ref();
export const placesRef = databaseRef.child("places");
export default Firebase;
