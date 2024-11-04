import * as React from "react"

import { useMediaQuery } from 'react-responsive';

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BarChart2, Heart, Search, User } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";


const Content = () => <>
    {/* Title */}

    {/* Description Text */}
    <p className="text-gray-600 mb-6">
        Dive into a world of cinema with ease. Search for your favorite actors
        and explore their filmographies or discover new movies by genre, release
        year, and more. Start your journey now!
    </p>

    {/* Feature List */}
    <ul className="space-y-4 mb-6">
        <li className="flex items-center text-gray-700">
            <Search className=" mr-3" />
            <span>Search Across Genres: Quickly find movies by genre, popularity, or release date.</span>
        </li>
        <li className="flex items-center text-gray-700">
            <User className=" mr-3" />
            <span>Actor Filmography: View complete filmographies and interesting facts about actors.</span>
        </li>
        <li className="flex items-center text-gray-700">
            <BarChart2 className=" mr-3" />
            <span>Detailed Insights: Access detailed insights, including box office stats, reviews, and more.</span>
        </li>
        <li className="flex items-center text-gray-700">
            <Heart className=" mr-3" />
            <span>Save Favorites: Create a personalized list of your favorite actors and movies for easy access.</span>
        </li>
    </ul>

    {/* Action Button */}

</>

function DrawerDialog({ open, onOpenChange }) {
    const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });
    const title = 'Discover & Explore Movies and Actors'


    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl">{title}</DialogTitle>
                        <DialogDescription
                            className="text-xl"
                        >
                            <Content></Content>

                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button className="w-full ">
                                Start Exploring
                            </Button>

                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle className="text-xl">{title}</DrawerTitle>
                    <DrawerDescription className="text-xl">
                        <Content></Content>
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>

                        <Button className="w-full ">
                            Start Exploring
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}


export default DrawerDialog