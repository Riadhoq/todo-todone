import React from 'react';
import './App.css';
import db, { auth, provider } from "./firebase"

function App() {
  db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().todos}`);
    });
});

function login() {
  auth.signInWithPopup(provider).then((result)=> {
    console.log(result)
  })
}

  return (
    <div className="App">
      <header className="App-header">
        <h1>Tada Todo Tada</h1>
        <button
          className="App-login-link"
          onClick={()=>login()}
          rel="noopener noreferrer"
        >
          Sign Up/Login
        </button>
      </header>
    </div>
  );
}

export default App;
