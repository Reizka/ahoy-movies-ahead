import 'dotenv/config'; // Load environment variables (ensure it's only in server-side code)
import { createPool } from "@vercel/postgres";

const pool = createPool({
  connectionString: process.env.NEXT_PUBLIC_POSTGRES_URL,
});

// Create a new user
export const addNewUser = async (name: string, email: string): Promise<boolean> => {
  try {
    console.log(name + " " + email);
    await pool.sql`INSERT INTO "User" (name) VALUES (${name})`;
    return true;  // User added successfully
  } catch (error) {
    console.error("Error adding user:", error);
    return false;  // Failed to add user
  }
};

// Fetch all users
export const getAllUsers = async () => {
  try {
    const { rows } = await pool.sql`SELECT user_id, name, email FROM "User"`;
    return rows;  // Return array of users
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;  // Handle error
  }
};

// Update a user by user_id
export const updateUser = async (user_id: number, name: string, email: string): Promise<boolean> => {
  try {
    await pool.sql`UPDATE "User" SET name = ${name}, email = ${email} WHERE user_id = ${user_id}`;
    return true;  // User updated successfully
  } catch (error) {
    console.error("Error updating user:", error);
    return false;  // Failed to update user
  }
};


// Get user_id by name
export const getUserIdByName = async (name: string): Promise<number | null> => {
  try {
    const { rows } = await pool.sql`SELECT user_id FROM "User" WHERE name = ${name}`;

    if (rows.length > 0) {
      return rows[0].user_id; // Return the user_id if found
    } else {
      return null;  // User not found
    }
  } catch (error) {
    console.error("Error fetching user ID by name:", error);
    throw error;  // Handle error
  }
};
