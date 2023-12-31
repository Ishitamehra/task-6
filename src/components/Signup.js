// src/components/Signup.js
/*import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User signed up:", user);
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={handleSignup}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
*/

import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase";
import "./AuthForm.css"; // Import a CSS file for styling

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignup = async () => {
    try {
      setError(null); // Resetting error state
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      console.log("User signed up:", user);
      // You might want to redirect the user to a different page after successful signup
    } catch (error) {
      setError(error.message); // Setting error message if signup fails
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form className="auth-form">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
        />
        {error && <p className="error-message">{error}</p>}
        <button type="button" onClick={handleSignup} className="auth-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
