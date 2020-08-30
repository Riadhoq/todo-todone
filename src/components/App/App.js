import React, { useEffect } from "react";
import "./App.css";
import { auth } from "../../firebase";
import { useStore } from "../../store/StoreProvider";
import actionTypes from "../../store/actionTypes";
import Login from "../Login/Login";

function App() {
  const [{ user }, dispatch] = useStore();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);

      // eslint-disable-next-line
      setUser(foundUser);
    }
  }, []);

  // db.collection("users")
  //   .get()
  //   .then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       console.log(`${doc.id} => ${doc.data().todos}`);
  //     });
  //   });

  function setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({ type: actionTypes.SET_USER, user });
  }

  function logout() {
    auth.signOut().then(setUser(null));
  }

  return (
    <div className="App">
      {console.log(user)}
      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <div>
          <h1>Main App</h1>
          <h2>Hello, {user.displayName}</h2>
          <img src={user?.photoURL} alt="" />
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default App;
