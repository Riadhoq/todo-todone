import React from "react";
import { auth, provider } from "../../firebase";

export default function Login({ setUser }) {
  function login() {
    auth.signInWithPopup(provider).then((result) => {
      setUser(result.user);
    });
  }
  return (
    <div>
      <h1>Login</h1>
      <button onClick={login}>Login</button>
    </div>
  );
}
