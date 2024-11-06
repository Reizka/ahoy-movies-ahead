"use client";

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utility/firebase'; // Import the Firebase auth instance
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

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
    <div className="max-w-md mx-auto mt-10 p-6 shadow-md">
      <CardHeader>
        <h4 className="text-center mb-4">Sign In</h4>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
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

          <Button type="submit" className="w-full">
            Sign In
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
    </div>
  );
};

export default SignInForm;
