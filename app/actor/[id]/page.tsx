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

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Film, Star, TrendingUp } from "lucide-react"

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
                console.log('det', actorDetails);
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
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
                <Avatar className="w-32 h-32 sm:w-40 sm:h-40 mr-auto">
                    <AvatarImage
                        src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                        alt={actor.name} />
                    <AvatarFallback>{actor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="text-center sm:text-left">
                    <CardTitle className="text-2xl sm:text-3xl mb-2">{actor.name}</CardTitle>
                    <CardDescription className="flex flex-wrap justify-center sm:justify-start gap-2">
                        <Badge variant="secondary" className="flex items-center gap-1">
                            <CalendarDays className="w-3 h-3" />
                            {actor.birthday}
                        </Badge>
                        <Badge variant="secondary" className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            {actor.popularity.toFixed(1)}
                        </Badge>
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h3 className="font-semibold mb-2">Biography</h3>
                    <p className="text-sm text-muted-foreground">{actor.biography}</p>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Place of Birth</h3>
                    <p className="text-sm text-muted-foreground">{actor.placeOfBirth}</p>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Known For</h3>
                    <div className="flex flex-wrap gap-2">
                        {movieCredits.slice(0, 5).map((movie, index) => (
                            <Badge key={index} variant="outline" className="flex items-center gap-1">
                                <Film className="w-3 h-3" />
                                {movie.title}
                            </Badge>
                        ))}
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
            </CardContent>
        </Card>
    );
};
// export default function Page({ params }: { params: { slug: string } }) {
//     return <div>My Post: {params.id}</div>
// }
export default ActorPage;