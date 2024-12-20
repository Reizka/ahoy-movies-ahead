
"use client"
import ExpandableParagraph from '@/app/myComponents/TruncatedParagraph';
import {
    Accordion,
} from "@/components/ui/accordion"

import PaginatedList from '@/app/myComponents/PaginatedList';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, ChevronLeft, Film, Star, TrendingUp } from "lucide-react"
import MovieOverview from '@/app/myComponents/MovieOverviewAccordionItem';
import ActorSkeleton from './ActorSkeleton';
import Link from 'next/link';


const ActorPage = ({ actor, movieCredits, loading, id }: { params: { id: string }, actor: any, movieCredits: any }) => {
    // const router = useRouter();
    // const [actor, setActor] = useState(null);
    // const [movieCredits, setMovieCredits] = useState([]);
    // const [loading, setLoading] = useState(true);


    // useEffect(() => {
    //     if (id) {
    //         const fetchData = async () => {
    //             setLoading(true);
    //             const actorDetails = await fetchActorDetails(id);
    //             const credits = await fetchMovieCredits(id);
    //             console.log('credits', credits);
    //             setActor(actorDetails);
    //             setMovieCredits(credits);
    //             setLoading(false);
    //         };
    //         fetchData();
    //     }
    // }, [id]);

    if (loading) {
        return <ActorSkeleton />;

    }

    if (!actor) {
        return <div>Actor not found.</div>;
    }


    return (
        <>
            <Link
                href="/?dialog=false"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-4 w-fit"
            >
                <ChevronLeft size={20} />
                Back to Home
            </Link>
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
                    <PaginatedList items={movieCredits}>{
                        (curMovieCredits) => (
                            <Accordion className="mb-3">
                                {curMovieCredits.map(d => (
                                    <MovieOverview key={d.id} {...d}></MovieOverview>
                                ))}

                            </Accordion>
                        )
                    }</PaginatedList>
                </CardContent>
            </Card >
        </>
    );
};
// export default function Page({params}: {params: {slug: string } }) {
//     return <div>My Post: {params.id}</div>
// }
export default ActorPage;