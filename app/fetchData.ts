
const TMDB_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTQ1ZmNlYTYyMzIwMDQyNjA0YTcyYzFjNzE3MzQxZiIsIm5iZiI6MTczMDEyMDA2NS4wNzIwNDEsInN1YiI6IjY3MWY4OGUxNzY5MTA3ZDc3YjQ4NGE1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WilCT_YVeTsbcbtJM2UjuFPz5JKE2CycjwokAfTY-IY'

export const fetchMovieCredits = async (personId) => {
    const url = `https://api.themoviedb.org/3/person/${personId}/movie_credits`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_TOKEN}`
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Failed to fetch movie credits for person ID ${personId}`);
        }
        const json = await response.json();
        return json.cast;
    } catch (error) {
        console.error(`Error fetching movie credits for person ID ${personId}:`, error);
        return [];
    }
};

export const fetchRelatedActors = async (personId, range = [0, 10]) => {
    const movieCredits = await fetchMovieCredits(personId);
    const moviesInRange = (movieCredits || []).slice(range[0], range[1]);

    const relatedActors = [];
    for (const movie of moviesInRange) {
        try {
            const cast = await fetchMovieCast(movie.id);
            relatedActors.push(...(cast || []));
        } catch (error) {
            console.error(`Failed to fetch cast for movie ID ${movie.id}:`, error);
        }
        // await delay(1000); // 1-second delay
    }

    return relatedActors;
};


export const fetchMovieCast = async (movieId) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_TOKEN}`
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Failed to fetch cast for movie ID ${movieId}`);
        }
        const json = await response.json();
        return json.cast;
    } catch (error) {
        // console.error(`Error fetching movie cast for movie ID ${movieId}:`, error);
        return []
    };
}

export const fetchMovieDetails = async (movieId) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_TOKEN}`
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Failed to fetch details for movie ID ${movieId}`);
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(`Error fetching movie details for movie ID ${movieId}:`, error);
        return null;
    }
};

export const fetchActorDetails = async (actorId) => {
    const url = `https://api.themoviedb.org/3/person/${actorId}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_TOKEN}`
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Failed to fetch actor details for ID ${actorId}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching actor details for ID ${actorId}:`, error);
        return null;
    }
};
