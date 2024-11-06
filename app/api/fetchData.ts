const TMDB_TOKEN = process.env.TMDB_API_READ;

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
export const searchPeople = (query: string, page: number = 1) => {
    if (!query) return Promise.resolve({ results: [] });

    const url = `https://api.themoviedb.org/3/search/person?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_TOKEN}`
        }
    };

    return fetch(url, options)
        .then(res => res.json())
        .catch(err => console.error(err));
};


export const fetchPopularPeople = (page = 1) => {
    const url = `https://api.themoviedb.org/3/person/popular?language=en-US&page=${page}&language=en-US`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_TOKEN}`
        }
    };

    return fetch(url, options)
        .then(res => res.json())
        .catch(err => console.error(err));
};