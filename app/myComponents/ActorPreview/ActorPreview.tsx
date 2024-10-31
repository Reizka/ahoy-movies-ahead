"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Film, Star, Users } from "lucide-react"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

interface Actor {
    id: string
    name: string
    imageUrl: string
    popularity: number
}

interface Movie {
    id: string
    title: string
    releaseYear: number
}

interface ActorPreviewProps {
    actor: Actor
    knownFor: Movie[]
    relatedActors: Actor[]
}

function AvatarSkeleton() {
    return (
        <div className="space-y-2">
            <div className="flex items-center">
                <Skeleton className="h-10 w-10 rounded-full mr-2" />
                <Skeleton className="ml-auto w-14 h-4" />
            </div>
            <div className="flex items-center">
                <Skeleton className="h-10 w-10 rounded-full mr-2" />
                <Skeleton className="ml-auto w-14 h-4" />
            </div>
            <div className="flex items-center">
                <Skeleton className="h-10 w-10 rounded-full mr-2" />
                <Skeleton className="ml-auto w-14 h-4" />
            </div>
            <div className="flex items-center">
                <Skeleton className="h-10 w-10 rounded-full mr-2" />
                <Skeleton className="ml-auto w-14 h-4" />
            </div>
            <div className="flex items-center">
                <Skeleton className="h-10 w-10 rounded-full mr-2" />
                <Skeleton className="ml-auto w-14 h-4" />
            </div>
        </div>
    )
}

export default function Component({
    actor = {
        id: "1",
        name: "Tom Hanks",
        imageUrl: "/placeholder.svg?height=100&width=100",
        popularity: 84.23,
        range: [0, 3]
    },
    knownFor = [
        { id: "1", title: "Forrest Gump", releaseYear: 1994 },
        { id: "2", title: "Saving Private Ryan", releaseYear: 1998 },
        { id: "3", title: "Cast Away", releaseYear: 2000 }
    ],
    relatedActors = [
        { id: "2", name: "Tim Allen", imageUrl: "/placeholder.svg?height=50&width=50", popularity: 62.45 },
        { id: "3", name: "Meg Ryan", imageUrl: "/placeholder.svg?height=50&width=50", popularity: 55.78 },
        { id: "4", name: "Gary Sinise", imageUrl: "/placeholder.svg?height=50&width=50", popularity: 48.92 }
    ]
}: ActorPreviewProps) {
    const [openItems, setOpenItems] = useState<string[]>([])

    const toggleAccordion = (value: string) => {
        setOpenItems(prev =>
            prev.includes(value)
                ? prev.filter(item => item !== value)
                : [...prev, value]
        )
    }

    return (
        <Accordion type="multiple" value={openItems} className="w-full ">
            <AccordionItem value={actor.id}>
                <AccordionTrigger onClick={() => toggleAccordion(actor.id)} className="hover:no-underline">
                    <Link className="flex items-center gap-4"
                        href={`/actor/${actor.id}`}
                        onClick={e => e.stopPropagation()}
                    >
                        <Avatar>
                            <AvatarImage src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                alt={actor.name} />
                            <AvatarFallback>{actor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                            <h3 className="font-semibold">{actor.name}</h3>
                            <Badge variant="secondary" className="mt-1">
                                <Star className="w-3 h-3 mr-1" />
                                {actor.popularity.toFixed(1)}
                            </Badge>
                        </div>
                    </Link>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="space-y-4 pt-4">
                        <div>
                            <h4 className="font-semibold mb-2 flex items-center">
                                <Film className="w-4 h-4 mr-2" />
                                Known For
                            </h4>
                            <ul className="space-y-2">
                                {knownFor.map(movie => (
                                    <li key={movie.id} className="flex justify-between text-sm">
                                        <span>{movie.title}</span>
                                        <span className="text-muted-foreground">{movie.releaseYear}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 flex items-center">
                                <Users className="w-4 h-4 mr-2" />
                                Related Actors
                            </h4>
                            <ScrollArea className="h-[200px]" >
                                <ul className="space-y-2">
                                    {!relatedActors && <AvatarSkeleton />}
                                    {relatedActors?.map(relatedActor => (
                                        <Link key={relatedActor.id} href={`/actor/${relatedActor.id}`} className="flex items-center gap-2">
                                            <Avatar className="w-8 h-8">
                                                <AvatarImage
                                                    src={`https://image.tmdb.org/t/p/w200${relatedActor.profile_path}`}
                                                    alt={relatedActor.name}
                                                />
                                                <AvatarFallback>{relatedActor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm">{relatedActor.name}</span>
                                            <Badge variant="secondary" className="ml-auto text-xs">
                                                <Star className="w-2 h-2 mr-1" />
                                                {relatedActor.popularity.toFixed(1)}
                                            </Badge>
                                        </Link>
                                    ))}
                                </ul>
                            </ScrollArea>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem >
        </Accordion >
    )
}