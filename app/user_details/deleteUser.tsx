"use client";
// components/DeleteAccount.js
import { useState } from "react";
import { getAuth, reauthenticateWithCredential, deleteUser, EmailAuthProvider } from "firebase/auth";
import { auth } from "../utility/firebase";

const DeleteAccount = () => {
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword]  = useState<string>('');

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;
    if (user) {
        
        // Check if user email exists
        if (!user.email) {
          setError('User email is not available.');
          return;
        }

      const credential = EmailAuthProvider.credential(user.email, password);

      try {
        // Reauthenticate user
        await reauthenticateWithCredential(user, credential);

        // Delete the user
        await deleteUser(user);
        alert("Account deleted successfully.");
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("An unknown error occurred.");
          }
      }
    }
  };

  return (
    <div>
      <h2>Delete Account</h2>
      <input 
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleDeleteAccount}>Delete Account</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default DeleteAccount;
