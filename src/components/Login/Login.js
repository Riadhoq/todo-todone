import React from "react";
import db, { auth, provider } from "../../firebase";
import firebase from "firebase";
import { Card, Button } from "@material-ui/core";
import "./Login.css";

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
    <div className="login">
      <Card className="login-card" square={true}>
        <h1 className="login-card-title">Login</h1>
        <Button className="login-card-button" variant="contained" size="large" color="primary" onClick={login}>Login with Google</Button>
      </Card>
    </div>
  );
}
