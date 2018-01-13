import {firebaseAuth} from "./firebase/firebase";

export const login = (email, password) => {
  firebaseAuth.signInWithEmailAndPassword(email, password).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
  });
};

export const logout = () => {
  firebaseAuth.signOut().then(() => {
    console.log("You signed out")
  }).catch(function(error) {
    console.log("could not sign out", error)
  });
};
