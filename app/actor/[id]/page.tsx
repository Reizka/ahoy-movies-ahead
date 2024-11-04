import { useEffect, useState } from 'react';
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
import { fetchActorDetails, fetchMovieCredits } from '@/app/fetchData';
import ActorSkeleton from './ActorSkeleton';
import Link from 'next/link';
import ActorPage from './ActorPage';


const Page = async ({ params, ...rest }) => {
    // const router = useRouter();
    console.log('rest', rest)
    const { id } = params;

    let loading = true
    const actor = await fetchActorDetails(id)
    const movieCredits = await fetchMovieCredits(id)
    loading = false


    if (loading) {
        return <ActorSkeleton />;

    }

    if (!actor) {
        return <div>Actor not found.</div>;
    }


    return (
        <ActorPage actor={actor} movieCredits={movieCredits} loading={loading} id={'9'} />
    );
};
// export default function Page({params}: {params: {slug: string } }) {
//     return <div>My Post: {params.id}</div>
// }
export default Page;