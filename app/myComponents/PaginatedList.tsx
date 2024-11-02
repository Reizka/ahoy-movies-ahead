import { Accordion } from "@/components/ui/accordion"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { LucideScissorsSquareDashedBottom } from "lucide-react";
import { Children, useState } from "react"

const rangeArr = (startIndex, endIndex) => {
    return Array.from({ length: endIndex - startIndex + 1 }, (_, index) => startIndex + index - 1);
};
const PaginatedList = ({ items, children }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const maxNumPages = Math.min(5, totalPages);

    const currentItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const startPage = Math.max(1, currentPage - Math.floor(maxNumPages / 2));
    const endPage = Math.min(totalPages, startPage + maxNumPages - 1);
    const curRange = rangeArr(startPage, endPage);

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };
    return (
        <>
            {children(currentItems)}
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" onClick={handlePrevious} />
                    </PaginationItem>
                    {curRange.map((page) => (
                        <PaginationItem key={page} onClick={() => handlePageClick(page)}>
                            <PaginationLink href="#">{page}</PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationEllipsis></PaginationEllipsis>
                    <PaginationItem onClick={() => handlePageClick(totalPages)}
                    >
                        <PaginationLink href="#">
                            {totalPages}
                        </PaginationLink>
                    </PaginationItem>


                    <PaginationItem>
                        <PaginationNext href="#" onClick={handleNext} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    )
}

export default PaginatedList