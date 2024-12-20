import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Film } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import { use, useEffect, useRef, useState } from "react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { fetchRelatedActors } from "../fetchData"
import autoAnimate from '@formkit/auto-animate'
import { Actor, Movie } from "../types"



interface ActorMasonryProps {
    actors: Actor[]
    loading: boolean
    isMovies: boolean
    movies: Movie[]
    containerRef: React.RefObject<HTMLDivElement>
}

const ActorSkeleton = () => (
    <div className="p-4">
        <Skeleton className="w-full h-48 mb-4" />
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
    </div>
)

export default function Component({
    actors = [
        { id: 1, name: "Tom Hanks", profilePath: "/placeholder.svg?height=450&width=300", popularity: 84.23, knownFor: ["Forrest Gump", "Saving Private Ryan", "Cast Away"] },
        { id: 2, name: "Meryl Streep", profilePath: "/placeholder.svg?height=450&width=300", popularity: 71.89, knownFor: ["The Devil Wears Prada", "Sophie's Choice", "The Iron Lady"] },
        { id: 3, name: "Leonardo DiCaprio", profilePath: "/placeholder.svg?height=450&width=300", popularity: 88.12, knownFor: ["Inception", "Titanic", "The Revenant"] },
        { id: 4, name: "Viola Davis", profilePath: "/placeholder.svg?height=450&width=300", popularity: 62.45, knownFor: ["Fences", "The Help", "How to Get Away with Murder"] },
        { id: 5, name: "Denzel Washington", profilePath: "/placeholder.svg?height=450&width=300", popularity: 76.78, knownFor: ["Training Day", "Malcolm X", "Fences"] },
        { id: 6, name: "Cate Blanchett", profilePath: "/placeholder.svg?height=450&width=300", popularity: 68.34, knownFor: ["Elizabeth", "The Lord of the Rings", "Blue Jasmine"] },
        { id: 7, name: "Robert De Niro", profilePath: "/placeholder.svg?height=450&width=300", popularity: 72.56, knownFor: ["Goodfellas", "Taxi Driver", "Raging Bull"] },
        { id: 8, name: "Scarlett Johansson", profilePath: "/placeholder.svg?height=450&width=300", popularity: 85.67, knownFor: ["Lost in Translation", "Marriage Story", "Black Widow"] },
        { id: 9, name: "Morgan Freeman", profilePath: "/placeholder.svg?height=450&width=300", popularity: 69.23, knownFor: ["The Shawshank Redemption", "Driving Miss Daisy", "Million Dollar Baby"] },
    ], loading = false, isMovies = false, movies = [], containerRef,

}: ActorMasonryProps) {
    const parent0 = useRef(null)
    const parent1 = useRef(null)
    const parent2 = useRef(null)
    const parent3 = useRef(null)

    const Card = isMovies ? MovieCard : ActorCard
    const data = isMovies ? movies : actors


    useEffect(() => {
        parent0.current && autoAnimate(parent0.current)
        parent1.current && autoAnimate(parent1.current)
        parent2.current && autoAnimate(parent2.current)
        parent3.current && autoAnimate(parent3.current)
    }, [parent0, parent1, parent2, parent3])


    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-4" ref={parent0}>
                {data.filter((_, index: number) => index % 4 === 0).map((item) => (
                    isMovies ?
                        <MovieCard key={item.id} movie={item as Movie} /> :
                        <ActorCard key={item.id} actor={item as Actor} />
                ))}
                {loading && [...Array(2)].map((_, index) => (<ActorSkeleton key={index} />))}
            </div>
            <div className="space-y-4 md:mt-12" ref={parent1}>
                {data.filter((_: any, index: number) => index % 4 === 1).map((item: Actor | Movie) => (
                    isMovies ?
                        <MovieCard key={item.id} movie={item as Movie} /> :
                        <ActorCard key={item.id} actor={item as Actor} />
                ))}
                {loading && [...Array(2)].map((_, index) => (<ActorSkeleton key={index} />))}
            </div>
            <div className="space-y-4" ref={parent2}>
                {data.filter((_: any, index: number) => index % 4 === 2).map((item: Actor | Movie) => (
                    isMovies ?
                        <MovieCard key={item.id} movie={item as Movie} /> :
                        <ActorCard key={item.id} actor={item as Actor} />
                ))}
                {loading && [...Array(2)].map((_, index) => (<ActorSkeleton key={index} />))}
            </div>
            <div className="space-y-4 mt-12" ref={parent3}>
                {data.filter((_: any, index: number) => index % 4 === 3).map((item: Actor | Movie) => (
                    isMovies ?
                        <MovieCard key={item.id} movie={item as Movie} /> :
                        <ActorCard key={item.id} actor={item as Actor} />
                ))}
                {loading && [...Array(2)].map((_, index) => (<ActorSkeleton key={index} />))}
            </div>
            <div className="space-y-4 mt-12">
            </div>
        </div>
    )
}


function ActorCard({ actor }: { actor: Actor }) {
    const [knownFor, setKnownFor] = useState<boolean>(true);
    const [acts, setActs] = useState<Actor[]>([])

    const parent = useRef(null)
    useEffect(() => {
        fetchRelatedActors(actor.id, [0, 1]).then(data =>
            setActs(data.slice(0, 5))
        )

    }, [actor.id])

    useEffect(() => {
        parent.current && autoAnimate(parent.current)
    }, [])

    return (
        <Card className="overflow-hidden rounded-lg">
            <CardContent className="p-0">
                <Link href={`/actor/${actor.id}`}>
                    <div className="relative">
                        <Image
                            width={150}
                            height={225}
                            src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                            alt={actor.name}
                            className="w-full h-auto object-cover aspect-[2/3]"
                        />
                        <div className="absolute bg-gray-700 text-white bottom-0 left-0 right-0   p-2">
                            <h2 className="text-xl font-bold">{actor.name}</h2>
                        </div>
                    </div>
                </Link>
                <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <Badge variant="secondary" className="flex flex-none items-center">
                            <Star className="w-3 h-3 mr-1 fill-primary" />
                            {actor.popularity.toFixed(1)}
                        </Badge>
                    </div>
                    <h3 className="font-semibold text-sm mb-2">
                        <div className="flex items-center w-full">
                            <Label htmlFor={`show-worked-with-${actor.id}`} className="text-xs">
                                {knownFor ? "Known for" : "Worked with"}
                            </Label>
                            <Switch
                                className="ml-auto"
                                id={`show-worked-with-${actor.id}`}
                                checked={knownFor}
                                onCheckedChange={setKnownFor}
                                size="sm"
                            />
                        </div>
                    </h3>
                    <ul className="space-y-1" ref={parent}>
                        {knownFor ? actor.known_for.map((work, index) => (
                            <li key={index} className="flex items-center text-sm text-muted-foreground">
                                <Film className="w-3 h-3 mr-2 flex-none" />
                                <Link href={`/film/${work.id}`}>
                                    {work.title}
                                </Link>
                            </li>
                        )) : acts.map((actor, index) => (
                            <li key={actor.id} className="flex items-center space-x-1 text-sm text-muted-foreground">
                                <Avatar className="w-6 h-6 ">
                                    <AvatarImage
                                        src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                        alt={actor.name} />
                                    <AvatarFallback>{actor.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <Link href={`/actor/${actor.id}`}>
                                    {actor.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
    )
}

function MovieCard({ movie }: { movie: Movie }) {
    const [showCast, setShowCast] = useState<boolean>(true);
    const parent = useRef(null)
    console.log('movie', movie)

    useEffect(() => {
        parent.current && autoAnimate(parent.current)
    }, [])

    return (
        <Card className="overflow-hidden rounded-lg">
            <CardContent className="p-0">
                <Link href={`/film/${movie.id}`}>
                    <div className="relative">
                        <Image
                            width={150}
                            height={225}
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            alt={movie.title}
                            className="w-full h-auto object-cover aspect-[2/3]"
                        />
                        <div className="absolute bg-gray-700 text-white bottom-0 left-0 right-0 p-2">
                            <h2 className="text-xl font-bold">{movie.title}</h2>
                            <p className="text-sm opacity-75">{new Date(movie.release_date).getFullYear()}</p>
                        </div>
                    </div>
                </Link>
                <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <Badge variant="secondary" className="flex flex-none items-center">
                            <Star className="w-3 h-3 mr-1 fill-primary" />
                            {movie.vote_average.toFixed(1)}
                        </Badge>
                    </div>
                    <div className="space-y-2" ref={parent}>
                        {movie.cast?.slice(0, 5).map((actor) => (
                            <div key={actor.id} className="flex items-center gap-2">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage
                                        src={`https://image.tmdb.org/t/p/w92${actor.profile_path}`}
                                        alt={actor.name}
                                    />
                                    <AvatarFallback>{actor.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <Link
                                    className="text-sm text-muted-foreground"
                                    href={`/actor/${actor.id}`}>
                                    {actor.name}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

