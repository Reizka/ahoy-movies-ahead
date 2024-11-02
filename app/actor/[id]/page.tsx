"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import ExpandableParagraph from '@/app/myComponents/TruncatedParagraph';
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
import { fetchActorDetails, fetchMovieCredits } from '@/app/fetchData';
import ActorSkeleton from './ActorSkeleton';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationLink, PaginationNext, PaginationItem, PaginationPrevious } from '@/components/ui/pagination';



const ActorPage = ({ params }) => {
    // const router = useRouter();
    const { id } = params;
    const [actor, setActor] = useState(null);
    const [movieCredits, setMovieCredits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

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

    const totalPages = Math.ceil(movieCredits.length / itemsPerPage);
    if (loading) {
        return <ActorSkeleton />;

    }

    if (!actor) {
        return <div>Actor not found.</div>;
    }
    const currentCredits = movieCredits.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const numPages = Math.ceil(movieCredits.length / itemsPerPage);
    const maxNumPages = Math.min(5, numPages);



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
                <Accordion type="single" collapsible className="w-full">
                    {currentCredits.map((movie) => (
                        <MovieOverview key={movie.id} {...movie} />
                    ))}

                </Accordion>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        {Array.from({ length: maxNumPages }).map((_, index) => (
                            <PaginationItem key={index} onClick={() => console.log('click')}>
                                <PaginationLink href="#">{index + 1}</PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </CardContent>
        </Card >
    );
};
// export default function Page({ params }: { params: { slug: string } }) {
//     return <div>My Post: {params.id}</div>
// }
export default ActorPage;