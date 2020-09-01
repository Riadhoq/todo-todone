import React, { useEffect } from "react";
import { auth } from "../../firebase";
import { useStore } from "../../store/StoreProvider";
import actionTypes from "../../store/actionTypes";
import MainApp from "../MainApp/MainApp";
import Login from "../Login/Login";
import "./App.css";

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
        <>
          <MainApp logout={logout}/>
        </>
      )}
    </div>
  );
}

export default App;
