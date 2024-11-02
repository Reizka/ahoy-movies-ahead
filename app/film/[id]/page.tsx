"use client"

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
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

export default function FilmPage({ params }) {
    const { id } = params;
    const [movie, setMovie] = useState<Movie | null>(null)
    const [cast, setCast] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log('id', id)
        fetchMovieDetails(id).then((data) => {
            setMovie(data)
            setLoading(false)

        }, [id])
        fetchMovieCast(id).then((data) => {
            console.log('cast', data)
            setCast(data)
        })
    })


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
