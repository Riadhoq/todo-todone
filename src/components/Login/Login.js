import React from "react";
import db, { auth, provider } from "../../firebase";
import firebase from "firebase";
import { Card, Button } from "@material-ui/core";
import Person from "@material-ui/icons/Person"
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
        <h1>Todo Todone</h1>
        <img width="150" className="login-card-logo" src="/todo-todone-logo-wide.png" />
        <h2 className="login-card-title">Sign Up/Login</h2>
        <Button className="login-card-button" startIcon={<Person />} variant="contained" size="large" color="primary" onClick={login}>Login with Google</Button>
      </Card>
    </div>
  );
}
