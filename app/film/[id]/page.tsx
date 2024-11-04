import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchMovieCast, fetchMovieDetails } from '@/app/fetchData'
import MovieDetails from '@/app/myComponents/MovieDetails'


interface Movie {
    id: number
    title: string
    overview: string
    poster_path: string
    release_date: string
    vote_average: number
}

export default async function FilmPage({ params }) {
    const { id } = params;
    let loading = true

    console.log('id', id)
    const movie = await fetchMovieDetails(id)

    const cast = await fetchMovieCast(id)
    console.log('cast', cast)
    loading = false


    if (loading) {
        return <Skeleton className="w-full h-96" />
    }

    return (
        <MovieDetails
            movie={movie}
            cast={cast}
            similarMovies={[]}
            isLoading={loading}
        />
    )
}
