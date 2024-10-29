import { useCallback, useState, useEffect } from "react";
import ActorPreview from "./ActorPreview";

const TMDB_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTQ1ZmNlYTYyMzIwMDQyNjA0YTcyYzFjNzE3MzQxZiIsIm5iZiI6MTczMDEyMDA2NS4wNzIwNDEsInN1YiI6IjY3MWY4OGUxNzY5MTA3ZDc3YjQ4NGE1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WilCT_YVeTsbcbtJM2UjuFPz5JKE2CycjwokAfTY-IY'

const fetchMovieCredits = async (personId) => {
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

const fetchRelatedActors = async (personId, range) => {
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


const fetchMovieCast = async (movieId) => {
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


const ActorPreviewPage = ({ id, range, ...rest }) => {
    const [relatedActors, setRelatedActors] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadData = useCallback(() => {
        setLoading(true);
        fetchRelatedActors(id, range)
            .then(data => {
                // console.log('data related', data);
                // const ms = data.map(d => d.movie);

                // console.log('ms', ms);
                // setMovies([...movies, ...ms]);
                setLoading(false);
                setRelatedActors(data.slice(0, 10));
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id, range]);

    useEffect(() => {
        setLoading(true);
        loadData()


    }, [loadData, id, range]);


    return (
        <ActorPreview {...rest} id={id} range={range} relatedActors={relatedActors} ></ActorPreview>
    );
}

export default ActorPreviewPage;