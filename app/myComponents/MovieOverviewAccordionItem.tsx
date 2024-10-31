import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import { Badge } from "@/components/ui/badge";

const MovieOverviewAccordionItem = ({ id, title, overview, releaseDate, rating, genres, ...rest }) => {
    console.log('props', { id, title, overview, releaseDate, rating, genres, rest });
    return (
        <AccordionItem key={id} value={id.toString()}>
            <AccordionTrigger>{title}</AccordionTrigger>
            <AccordionContent>
                <div className="space-y-2">
                    <p>{overview}</p>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">Release Date: {releaseDate}</Badge>
                        <Badge variant="secondary">Rating: {rating}</Badge>
                        {genres?.map((genre, index) => (
                            <Badge key={index} variant="outline">{genre}</Badge>
                        ))}
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}
export default MovieOverviewAccordionItem;