import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import Image from 'next/image';
import ExpandableParagraph from "./TruncatedParagraph";
import { fetchMovieCast } from "../fetchData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Star } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const MovieOverviewAccordionItem = ({ id, title, overview, release_date, rating, genres, vote_average, poster_path, ...rest }) => {
    console.log('props accordion', { id, title, overview, release_date, rating, genres, rest });
    const [movieCast, setMovieCast] = useState(null);

    useEffect(() => {
        fetchMovieCast(id).then(data => {
            console.log('data movie cast', data);
            setMovieCast(data);
        })

    }, [id]);



    return (
        <AccordionItem key={id} value={id.toString()}>
            <AccordionTrigger>{title}</AccordionTrigger>
            <AccordionContent>
                <div className=" flex ">
                    <Image
                        width={200}
                        height={300}
                        src={`https://image.tmdb.org/t/p/w200${poster_path}`}
                        alt={title}
                        className="w-32 h-48  flex-none object-cover rounded mr-2"
                    />
                    <div className="flex flex-col h-full py-2 overflow-x-auto">
                        <ExpandableParagraph expandable={false} limit={200}>{overview}</ExpandableParagraph>

                        <ScrollArea className="flex gap-2 mt-3 overflow-x-auto mb-3 ">
                            {movieCast?.length > 0 ? (
                                movieCast.map(actor => (
                                    <Link key={actor.id} href={`/actor/${actor.id}`} className="flex flex-col items-center">
                                        <Avatar className="w-12 h-12">
                                            <AvatarImage
                                                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                                alt={actor.name}
                                            />
                                            <AvatarFallback>{actor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <p className="text-xs text-center">{actor.name}</p>
                                    </Link>
                                ))
                            ) : (
                                <p>No cast information available.</p>
                            )}</ScrollArea>
                        <div className="flex flex-wrap gap-2 mt-auto">
                            <Badge variant="secondary">Release Date: {release_date}</Badge>
                            <Badge variant="secondary">Rating: {vote_average}</Badge>
                            {genres?.map((genre, index) => (
                                <Badge key={index} variant="outline">{genre}</Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}
export default MovieOverviewAccordionItem;