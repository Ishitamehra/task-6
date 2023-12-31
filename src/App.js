// src/App.js
import React, { useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Todo from "./components/Todo";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import auth from "./firebase";

function App() {
  const [user, setUser] = useState(null);

  // Check if user is logged in
  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  return (
    <div>
      <h1>To-do List</h1>
      {user ? (
        <>
          <h2>Welcome, {user.email}!</h2>
          <Todo user={user} />
        </>
      ) : (
        <>
          <Signup />
          <Login />
        </>
      )}
    </div>
  );
}

export default App;
