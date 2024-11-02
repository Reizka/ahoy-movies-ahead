"use client"

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchMovieDetails } from '@/app/fetchData'



interface Film {
    id: number
    title: string
    overview: string
    poster_path: string
    release_date: string
    vote_average: number
}

export default function FilmPage({ params }) {
    const { id } = params;
    const [film, setFilm] = useState<Film | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log('id', id)
        fetchMovieDetails(id).then((data) => {
            setFilm(data)
            setLoading(false)

        }, [id])
    })

    if (loading) {
        return <Skeleton className="w-full h-96" />
    }

    if (!film) {
        return <div>Film not found</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                    <Image
                        width={300}
                        height={450}
                        src={`https://image.tmdb.org/t/p/w300${film.poster_path}`}
                        alt={film.title}
                        className="w-full h-auto object-cover"
                    />
                </div>
                <div className="md:w-2/3 md:pl-8">
                    <h1 className="text-3xl font-bold mb-4">{film.title}</h1>
                    <p className="text-muted-foreground mb-4">{film.release_date}</p>
                    <p className="mb-4">{film.overview}</p>
                    <p className="font-bold">Rating: {film.vote_average}</p>
                </div>
            </div>
        </div>
    )
}
