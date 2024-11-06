"use client"
import { Star, Calendar, Clock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import Link from 'next/link'
import PaginatedList from '@/components/PaginatedList'

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

interface MovieDetails {
    id: number
    title: string
    overview: string
    poster_path: string
    release_date: string
    runtime: number
    vote_average: number
    genres: { id: number; name: string }[]
}

interface CastMember {
    id: number
    name: string
    character: string
    profile_path: string | null
}

interface SimilarMovie {
    id: number
    title: string
    poster_path: string | null
}

interface MovieDetailsProps {
    movie: MovieDetails | null
    cast: CastMember[]
    similarMovies: SimilarMovie[]
    isLoading: boolean
    error: string | null
}

export default function MovieDetails({ movie, cast, similarMovies, isLoading, error }: MovieDetailsProps) {
    if (isLoading) {
        return <MovieDetailsSkeleton />
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>
    }

    if (!movie) {
        return <div className="text-center">No movie data available</div>
    }

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="text-3xl font-bold">{movie.title}</CardTitle>
                <CardDescription>
                    <Badge variant="secondary" className="mr-2">
                        {new Date(movie.release_date).getFullYear()}
                    </Badge>
                    {movie.genres.map((genre) => (
                        <Badge key={genre.id} variant="outline" className="mr-2">
                            {genre.name}
                        </Badge>
                    ))}
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Image
                        width={50}
                        height={50}
                        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                        alt={`${movie.title} poster`}
                        className="w-full rounded-lg shadow-lg md:col-span-1"
                    />
                    <div className="md:col-span-2">
                        <h3 className="text-xl font-semibold mb-2">Overview</h3>
                        <p className="text-muted-foreground">{movie.overview}</p>
                        <div className="mt-4 grid grid-cols-2 gap-2">
                            <div className="flex items-center">
                                <Star className="mr-2 h-4 w-4" />
                                <span>{movie.vote_average.toFixed(1)} / 10</span>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4" />
                                <span>{new Date(movie.release_date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="mr-2 h-4 w-4" />
                                <span>{movie.runtime} minutes</span>
                            </div>
                        </div>
                    </div>
                </div>

                <h3 className="text-xl font-semibold mb-2">Cast</h3>
                <PaginatedList items={cast}>
                    {(items) => (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[300px]">
                            {items.map(actor => (
                                <div key={actor.id} className="flex w-full items-center space-x-2">
                                    <Link className="flex-none" href={`/actor/${actor.id}`}>
                                        <Avatar className='w-20 h-20'>
                                            <AvatarImage src={actor.profile_path ? `${IMAGE_BASE_URL}${actor.profile_path}` : undefined} />
                                            <AvatarFallback>{actor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                    </Link>
                                    <div>
                                        <p className="font-medium">{actor.name}</p>
                                        <p className="text-sm text-muted-foreground">{actor.character}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </PaginatedList>
            </CardContent>
            <CardFooter>
                <div className="w-full">
                    <h3 className="text-xl font-semibold mb-2">Similar Movies</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {similarMovies.map((similar) => (
                            <div key={similar.id} className="text-center">
                                <img
                                    src={similar.poster_path ? `${IMAGE_BASE_URL}${similar.poster_path}` : '/placeholder.svg'}
                                    alt={`${similar.title} poster`}
                                    className="w-full h-40 object-cover rounded-lg shadow-md mb-2"
                                />
                                <p className="text-sm font-medium line-clamp-2">{similar.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}

function MovieDetailsSkeleton() {
    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Skeleton className="h-[400px] w-full md:col-span-1" />
                    <div className="md:col-span-2">
                        <Skeleton className="h-6 w-1/4 mb-2" />
                        <Skeleton className="h-4 w-full mt-2" />
                        <Skeleton className="h-4 w-full mt-2" />
                        <Skeleton className="h-4 w-3/4 mt-2" />
                        <div className="mt-4 grid grid-cols-2 gap-2">
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    </div>
                </div>
                <div>
                    <Skeleton className="h-6 w-1/4 mb-2" />
                    <div className="flex flex-wrap gap-4">
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <div>
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-3 w-16 mt-1" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <div className="w-full">
                    <Skeleton className="h-6 w-1/4 mb-2" />
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[...Array(4)].map((_, index) => (
                            <div key={index}>
                                <Skeleton className="h-40 w-full mb-2" />
                                <Skeleton className="h-4 w-3/4 mx-auto" />
                            </div>
                        ))}
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}