import React from "react";
import db, { auth, provider } from "../../firebase";
import firebase from "firebase";

export default function Login({ setUser }) {
  function login() {
    auth.signInWithPopup(provider).then((result) => {
      setUser(result.user);
      const docToUpdate = db.collection("users").doc(result.user.email);
      docToUpdate.get().then((docdata) => {
        if (!docdata.exists) {
          docToUpdate.set({
            email: result.user.email,
            create_date: firebase.firestore.Timestamp.fromDate(new Date()),
            last_sign_in_date: firebase.firestore.Timestamp.fromDate(
              new Date()
            ),
          });
        } else {
          docToUpdate.update({
            last_sign_in_date: firebase.firestore.Timestamp.fromDate(
              new Date()
            ),
          });
        }
      });
    });
  }
  return (
    <div>
      <h1>Login</h1>
      <button onClick={login}>Login</button>
    </div>
  );
}
