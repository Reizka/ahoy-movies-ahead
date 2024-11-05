import { sql } from "@vercel/postgres";


// Get movie_id by name
export const getMovieIdByName = async (name: string): Promise<number | null> => {
    try {
        const { rows } = await sql`SELECT movie_id FROM "Movie" WHERE name = ${name}`;

        if (rows.length > 0) {
            return rows[0].movie_id; // Return the movie_id if found
        } else {
            return null;  // Movie not found
        }
    } catch (error) {
        console.error("Error fetching movie ID by name:", error);
        throw error;  // Handle error
    }
};


// Create a new movie
export const addNewMovie = async (name: string, genre: string): Promise<boolean> => {
    try {
        await sql`INSERT INTO "Movie" (name, genre) VALUES (${name}, ${genre})`;
        return true;  // Movie added successfully
    } catch (error) {
        console.error("Error adding movie:", error);
        return false;  // Failed to add movie
    }
};

// Fetch all movies
export const getAllMovies = async () => {
    try {
        const { rows } = await sql`SELECT movie_id, name, genre FROM "Movie"`;
        return rows;  // Return array of movies
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;  // Handle error
    }
};

// Update a movie by movie_id
export const updateMovie = async (movie_id: number, name: string, genre: string): Promise<boolean> => {
    try {
        await sql`UPDATE "Movie" SET name = ${name}, genre = ${genre} WHERE movie_id = ${movie_id}`;
        return true;  // Movie updated successfully
    } catch (error) {
        console.error("Error updating movie:", error);
        return false;  // Failed to update movie
    }
};

// Delete a movie by movie_id
export const deleteMovie = async (movie_id: number): Promise<boolean> => {
    try {
        await sql`DELETE FROM "Movie" WHERE movie_id = ${movie_id}`;
        return true;  // Movie deleted successfully
    } catch (error) {
        console.error("Error deleting movie:", error);
        return false;  // Failed to delete movie
    }
};


///###### Wanted Movies Table #####

// Add a movie to user's wanted list
export const addWantedMovie = async (user_id: number, movie_id: number): Promise<boolean> => {
    try {
        await sql`INSERT INTO "WantedMovie" (user_id, movie_id) VALUES (${user_id}, ${movie_id})`;
        return true;  // Wanted movie added successfully
    } catch (error) {
        console.error("Error adding wanted movie:", error);
        return false;  // Failed to add wanted movie
    }
};

// Fetch all wanted movies for a specific user
export const getWantedMoviesByUser = async (user_id: number) => {
    try {
        const { rows } = await sql`
        SELECT M.movie_id, M.name, M.genre 
        FROM "Movie" M
        JOIN "WantedMovie" WM ON M.movie_id = WM.movie_id
        WHERE WM.user_id = ${user_id}`;
        return rows;  // Return array of wanted movies for the user
    } catch (error) {
        console.error("Error fetching wanted movies for user:", error);
        throw error;  // Handle error
    }
};

// Remove a movie from user's wanted list
export const deleteWantedMovie = async (user_id: number, movie_id: number): Promise<boolean> => {
    try {
        await sql`DELETE FROM "WantedMovie" WHERE user_id = ${user_id} AND movie_id = ${movie_id}`;
        return true;  // Wanted movie removed successfully
    } catch (error) {
        console.error("Error deleting wanted movie:", error);
        return false;  // Failed to delete wanted movie
    }
};



