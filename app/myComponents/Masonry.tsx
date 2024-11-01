import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Film } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"

interface Actor {
    id: number
    name: string
    profilePath: string
    popularity: number
    known_for: string[]
}

interface ActorMasonryProps {
    actors: Actor[]
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
    ], loading = false
}: ActorMasonryProps) {
    console.log('loading', loading)
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-4">
                    {actors.filter((_, index) => index % 4 === 0).map((actor) => (
                        <ActorCard key={actor.id} actor={actor} />
                    ))}
                    {loading && [...Array(2)].map((_, index) => (<ActorSkeleton key={index} />))}
                </div>
                <div className="space-y-4 md:mt-12">
                    {actors.filter((_, index) => index % 4 === 1).map((actor) => (
                        <ActorCard key={actor.id} actor={actor} />
                    ))}
                    {loading && [...Array(2)].map((_, index) => (<ActorSkeleton key={index} />))}
                </div>
                <div className="space-y-4">
                    {actors.filter((_, index) => index % 4 === 2).map((actor) => (
                        <ActorCard key={actor.id} actor={actor} />
                    ))}
                    {loading && [...Array(2)].map((_, index) => (<ActorSkeleton key={index} />))}
                </div>
                <div className="space-y-4 mt-12">
                    {actors.filter((_, index) => index % 4 === 3).map((actor) => (
                        <ActorCard key={actor.id} actor={actor} />
                    ))}
                    {loading && [...Array(2)].map((_, index) => (<ActorSkeleton key={index} />))}
                </div>
                <div className="space-y-4 mt-12">
                </div>
            </div>
        </div>
    )
}


function ActorCard({ actor }: { actor: Actor }) {
    return (
        <Card className="overflow-hidden">
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
                        <Badge variant="secondary" className="flex items-center">
                            <Star className="w-3 h-3 mr-1 fill-primary" />
                            {actor.popularity.toFixed(1)}
                        </Badge>
                    </div>
                    <h3 className="font-semibold text-sm mb-2">Known For</h3>
                    <ul className="space-y-1">
                        {actor.known_for.map((work, index) => (
                            <li key={index} className="flex items-center text-sm text-muted-foreground">
                                <Film className="w-3 h-3 mr-2" />
                                {work.title}
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
    )
}