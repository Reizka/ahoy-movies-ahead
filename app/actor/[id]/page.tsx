"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Button } from '@/components/ui/button';
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


const TMDB_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTQ1ZmNlYTYyMzIwMDQyNjA0YTcyYzFjNzE3MzQxZiIsIm5iZiI6MTczMDEyMDA2NS4wNzIwNDEsInN1YiI6IjY3MWY4OGUxNzY5MTA3ZDc3YjQ4NGE1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WilCT_YVeTsbcbtJM2UjuFPz5JKE2CycjwokAfTY-IY';

const fetchActorDetails = async (actorId) => {
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

const fetchMovieCredits = async (actorId) => {
    const url = `https://api.themoviedb.org/3/person/${actorId}/movie_credits`;
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
            throw new Error(`Failed to fetch movie credits for actor ID ${actorId}`);
        }
        const json = await response.json();
        return json.cast;
    } catch (error) {
        console.error(`Error fetching movie credits for actor ID ${actorId}:`, error);
        return [];
    }
};

const ActorPage = ({ params }) => {
    // const router = useRouter();
    const { id } = params;
    const [actor, setActor] = useState(null);
    const [movieCredits, setMovieCredits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                setLoading(true);
                const actorDetails = await fetchActorDetails(id);
                const credits = await fetchMovieCredits(id);
                setActor(actorDetails);
                setMovieCredits(credits);
                setLoading(false);
            };
            fetchData();
        }
    }, [id]);

    if (loading) {
        return <div>Loading...</div>
    }

    if (!actor) {
        return <div>Actor not found.</div>;
    }

    return (
        <div className="p-4">
            <div className="flex items-center space-x-4">
                <Avatar>
                    <AvatarImage src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} />
                    <AvatarFallback>{actor.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-2xl font-bold">{actor.name}</h1>
                    <p>{actor.biography}</p>
                </div>
            </div>
            <h2 className="text-xl font-bold mt-4">Movie Credits</h2>
            <Accordion type="single" collapsible className="w-full">
                {movieCredits.map((movie) => (
                    <AccordionItem key={movie.id} value={movie.id.toString()}>
                        <AccordionTrigger>{movie.title}</AccordionTrigger>
                        <AccordionContent>
                            <p>{movie.overview}</p>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};
// export default function Page({ params }: { params: { slug: string } }) {
//     return <div>My Post: {params.id}</div>
// }
export default ActorPage;