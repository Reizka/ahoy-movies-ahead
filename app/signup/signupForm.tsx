"use client";

import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../utility/firebase'; // Import the Firebase auth instance
import { addNewUser } from '../utility/db/user'; // Import Postgres user CRUD
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset messages
    setErrorMessage(null);
    setSuccessMessage(null);

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      // DB request - check if DB works before creating account on Firebase
      console.log(username + " " + email);
      const success = await addNewUser(username, email);
      if (success) {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Update the user's display name (username)
        await updateProfile(userCredential.user, {
          displayName: username,
        });

        setSuccessMessage('Signup successful! User created.');

        // Redirect to the index page after successful signup

      }
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10 p-6 shadow-md">
      <CardHeader>
        <h4 className="text-center mb-4">Sign Up</h4>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="email">Email</Label>
            <Input
              type="text"

              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>

        {/* Display Error Message */}
        {errorMessage && (
          <p className="text-red-600 text-center mt-4">{errorMessage}</p>
        )}

        {/* Display Success Message */}
        {successMessage && (
          <p className="text-green-600 text-center mt-4">{successMessage}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default SignupForm;

