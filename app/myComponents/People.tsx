"use client"
import React, { Suspense, useState, useEffect, use, useCallback } from 'react';
import LoadingSpinner from './LoadingSpinner';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import { Skeleton } from "@/components/ui/skeleton"

function AvatarSkeleton() {
    return (
        <div className="flex items-center space-x-4">
            <Skeleton className="h-14 w-12 rounded-full" />
            <Skeleton className="h-14 w-12 rounded-full" />
            <Skeleton className="h-14 w-12 rounded-full" />
            <Skeleton className="h-14 w-12 rounded-full" />

        </div>
    )
}
const TMDB_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTQ1ZmNlYTYyMzIwMDQyNjA0YTcyYzFjNzE3MzQxZiIsIm5iZiI6MTczMDEyMDA2NS4wNzIwNDEsInN1YiI6IjY3MWY4OGUxNzY5MTA3ZDc3YjQ4NGE1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WilCT_YVeTsbcbtJM2UjuFPz5JKE2CycjwokAfTY-IY'

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Label } from "@/components/ui/label"
import Link from 'next/link';
import ActorPreview from './ActorPreview/index';


export function ArtistAvatar({ src, alt }) {
    return (
        <Avatar>
            <AvatarImage src={src} alt={alt} />
            <AvatarFallback>{alt}</AvatarFallback>
        </Avatar>
    )
}

const fetchPeople = () => {
    const url = 'https://api.themoviedb.org/3/person/popular?language=en-US&page=1';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTQ1ZmNlYTYyMzIwMDQyNjA0YTcyYzFjNzE3MzQxZiIsIm5iZiI6MTczMDEyMDA2NS4wNzIwNDEsInN1YiI6IjY3MWY4OGUxNzY5MTA3ZDc3YjQ4NGE1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WilCT_YVeTsbcbtJM2UjuFPz5JKE2CycjwokAfTY-IY'
        }
    };

    return fetch(url, options)
        .then(res => res.json())
        .catch(err => console.error(err));
};

const fetchCreditDetails = (creditId) => {
    const url = `https://api.themoviedb.org/3/credit/${creditId}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTQ1ZmNlYTYyMzIwMDQyNjA0YTcyYzFjNzE3MzQxZiIsIm5iZiI6MTczMDEyMDA2NS4wNzIwNDEsInN1YiI6IjY3MWY4OGUxNzY5MTA3ZDc3YjQ4NGE1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WilCT_YVeTsbcbtJM2UjuFPz5JKE2CycjwokAfTY-IY'
        }
    };

    return fetch(url, options)
        .then(res => res.json())
        .catch(err => console.error(err));
};
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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

const fetchPerson = (personId) => {

    const url = `https://api.themoviedb.org/3/person/${id}?language=en-US`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTQ1ZmNlYTYyMzIwMDQyNjA0YTcyYzFjNzE3MzQxZiIsIm5iZiI6MTczMDEyMDA2NS4wNzIwNDEsInN1YiI6IjY3MWY4OGUxNzY5MTA3ZDc3YjQ4NGE1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WilCT_YVeTsbcbtJM2UjuFPz5JKE2CycjwokAfTY-IY'
        }
    };
    return fetch(url, options)
        .then(res => res.json())
        .catch(err => console.error(err));

}

const fetchPersonMovieCredits = (personId) => {

    const url = `https://api.themoviedb.org/3/person/${personId}/movie_credits?language=en-US`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTQ1ZmNlYTYyMzIwMDQyNjA0YTcyYzFjNzE3MzQxZiIsIm5iZiI6MTczMDEyMDA2NS4wNzIwNDEsInN1YiI6IjY3MWY4OGUxNzY5MTA3ZDc3YjQ4NGE1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WilCT_YVeTsbcbtJM2UjuFPz5JKE2CycjwokAfTY-IY'
        }
    };

    return fetch(url, options)
        .then(res => res.json())
}
const fetchMovie = (movieId) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTQ1ZmNlYTYyMzIwMDQyNjA0YTcyYzFjNzE3MzQxZiIsIm5iZiI6MTczMDEyMDA2NS4wNzIwNDEsInN1YiI6IjY3MWY4OGUxNzY5MTA3ZDc3YjQ4NGE1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WilCT_YVeTsbcbtJM2UjuFPz5JKE2CycjwokAfTY-IY'
        }
    };

    return fetch(url, options)
        .then(res => res.json())
        .catch(err => console.error(err));
};

// async function fetchRelatedActorsTMp(pid, range) {
//     const personMovieCredits = await fetchPersonMovieCredits(pid);
//     const movies = [];

//     for (const character of personMovieCredits.cast.slice(...range)) {
//         const credit = await fetchCreditDetails(character.credit_id);
//         // await delay(0);
//         const movieActors = await fetchMovieCredits(credit.media.id);
//         movies.push({ movieActors });
//     }

//     return movies
// }

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
        console.log('json', json);
        return json.cast;
    } catch (error) {
        // console.error(`Error fetching movie cast for movie ID ${movieId}:`, error);
        return []
    };
}

const fetchRelatedActors = async (personId, range) => {
    const movieCredits = await fetchMovieCredits(personId);
    const moviesInRange = (movieCredits || []).slice(range[0], range[1]);

    // const relatedActors = await moviesInRange.reduce(async (promise, movie) => {
    //     const actors = await promise;
    //     try {
    //         const cast = await fetchMovieCast(movie.id);
    //         actors.push(...(cast || []));
    //     } catch (error) {
    //         console.error(`Failed to fetch cast for movie ID ${movie.id}:`, error);
    //     }
    //     // await delay(100); // 1-second delay
    //     return actors;
    // }, Promise.resolve([]));
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

// const fetchAllData = async () => {
//     try {
//         const ps = await fetchPeople();
//         const people = await Promise.all(
//             ps.results.slice(0, 1).map(async (p) => {
//                 const personMovieCredits = await fetchPersonMovieCredits(p.id);
//                 const movies = [];

//                 for (const character of personMovieCredits.cast) {
//                     const credit = await fetchCreditDetails(character.credit_id);
//                     // await delay(0);
//                     const movie = await fetchMovie(credit.media.id);
//                     const movieActors = await fetchMovieCredits(movie.id);
//                     movies.push({ ...p, character, movie, movieActors });
//                 }

//                 return { ...p, movies };
//             })
//         );

//         console.log('people', people);
//         return people;
//     } catch (error) {
//         console.error(error);
//     }
// };

const ActorList = ({ personId }) => {
    const [actors, setActors] = useState([]);
    const [range, setRange] = useState([0, 5]);

    const [loading, setLoading] = useState(false);


    const loadData = useCallback(() => {
        setLoading(true);
        fetchRelatedActors(personId, range)
            .then(data => {
                console.log('data related', data);
                // const ms = data.map(d => d.movie);

                // console.log('ms', ms);
                // setMovies([...movies, ...ms]);
                setLoading(false);
                setActors(data.slice(0, 10));
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [personId, range]);

    useEffect(() => {
        // .catch(err => console.error(err));

        setLoading(true);
        loadData()


    }, [loadData, personId, range]);

    return (
        <div>
            {actors.map(actor => (<ActorPreview key={actor.id} actor={actor} knownFor={actor.known_for} />))}
        </div>

    )
}

const Person = (props) => {
    const [movieListVisible, setMovieListVisible] = useState(false);

    return (
        <li role="button"
            className={`transition-all max-w-96`}
        >
            <ActorPreview personId={props.id} {...props} range={[0, 5]} />

        </li >
    );
};

const PeopleList = () => {
    const [people, setPeople] = useState(null);

    useEffect(() => {
        fetchPeople().then(ps => {
            console.log('data people', ps);
            setPeople(ps.results);

        }).catch(error => console.error(error));
    }, []);

    if (!people) {
        return <div><LoadingSpinner /></div>;
    }

    return (
        <ul className='flex flex-col gap-3' >
            {people.map(actor => (
                <li>
                    <ActorPreview actor={actor} id={actor.id} range={[0, 5]} key={actor.id}>{actor.name}</ActorPreview>
                </li>
            ))}
        </ul>
    );
};

const People = () => {
    return (
        <div>
            <h1>People</h1>
            <PeopleList />
        </div>
    );
};

export default People;