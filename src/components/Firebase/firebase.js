import app from "firebase/app";
import { REACT_APP_API_KEY } from "../../secerts";
import "firebase/auth";

const config = {
  apiKey: REACT_APP_API_KEY,
  authDomain: "bluebubbles-998d5.firebaseapp.com",
  databaseURL: "https://bluebubbles-998d5.firebaseio.com",
  projectId: "bluebubbles-998d5",
  storageBucket: "bluebubbles-998d5.appspot.com",
  messagingSenderId: "406743690960"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
}

export default Firebase;
