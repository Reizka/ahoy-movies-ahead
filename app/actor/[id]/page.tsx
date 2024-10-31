"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import ExpandableParagraph from '@/app/myComponents/ExpandableParagraph';
import {
    Accordion,
} from "@/components/ui/accordion"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Film, Star, TrendingUp } from "lucide-react"
import MovieOverview from '@/app/myComponents/MovieOverviewAccordionItem';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchActorDetails, fetchMovieCredits } from '@/app/fetchData';
import { ScrollArea } from '@/components/ui/scroll-area';



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
                console.log('credits', credits);
                setActor(actorDetails);
                setMovieCredits(credits);
                setLoading(false);
            };
            fetchData();
        }
    }, [id]);

    if (loading) {
        return (<Card className="w-full max-w-3xl mx-auto">
            <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
                <Skeleton className="w-32 h-32 sm:w-40 sm:h-40 rounded-full" />
                <div className="text-center sm:text-left">
                    <Skeleton className="h-8 w-48 mb-2" />
                    <Skeleton className="h-4 w-32" />
                </div>
            </CardHeader>
            <CardDescription className="p-4">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
            </CardDescription>
        </Card>)

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
                    <ExpandableParagraph >
                        {actor.biography}
                    </ExpandableParagraph>
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
                <ScrollArea className="h-96 overflow-auto ">
                    <Accordion type="single" collapsible className="w-full">
                        {movieCredits.map((movie) => (
                            <MovieOverview key={movie.id} {...movie} />
                        ))}

                    </Accordion>
                </ScrollArea>
            </CardContent>
        </Card >
    );
};
// export default function Page({ params }: { params: { slug: string } }) {
//     return <div>My Post: {params.id}</div>
// }
export default ActorPage;