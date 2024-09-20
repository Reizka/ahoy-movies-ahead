"use client";

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utility/firebase'; // Import the Firebase auth instance

const SignInForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      // Reset messages
      setErrorMessage(null);
      setSuccessMessage(null);
  
      try {
        // Sign in the user with email and password
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
  
        setSuccessMessage(`Welcome back, ${user.email}!`);
      } catch (error: any) {
        setErrorMessage(error.message);
      }
    };
  
    return (
      <div>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
  
          <button type="submit">Sign In</button>
        </form>
  
        {/* Display Error Message */}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
  
        {/* Display Success Message */}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </div>
    );
  };
  
  export default SignInForm;