"use client"
import React, { Suspense, useState, useEffect, use, useCallback } from 'react';
import LoadingSpinner from './LoadingSpinner';


const TMDB_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTQ1ZmNlYTYyMzIwMDQyNjA0YTcyYzFjNzE3MzQxZiIsIm5iZiI6MTczMDEyMDA2NS4wNzIwNDEsInN1YiI6IjY3MWY4OGUxNzY5MTA3ZDc3YjQ4NGE1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WilCT_YVeTsbcbtJM2UjuFPz5JKE2CycjwokAfTY-IY'


import ActorPreview from './ActorPreview/index';
import { Skeleton } from '@/components/ui/skeleton';


export function ActorPreviewSkeleton() {
    return (
        <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    )
}



// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));



const PeopleList = ({ people }) => {

    return (
        <ul className='flex flex-col gap-3 w-full' >
            {!people && Array.from({ length: 10 }).map((_, index) => (
                <li key={index}>
                    <ActorPreviewSkeleton />
                </li>
            ))}

            {people && people.map(actor => (
                <li key={actor.id}>
                    <ActorPreview actor={actor} id={actor.id} range={[0, 5]} key={actor.id}>{actor.name}</ActorPreview>
                </li>
            ))}
        </ul>
    );
};

export default PeopleList;