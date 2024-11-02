import { Accordion } from "@/components/ui/accordion"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { LucideScissorsSquareDashedBottom } from "lucide-react";
import { Children, useEffect, useState } from "react"

import { useRouter } from 'next/router';

const rangeArr = (startIndex, endIndex) => {
    return Array.from({ length: endIndex - startIndex + 1 }, (_, index) => startIndex + index - 1);
};
const PaginatedList = ({ items, children }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const maxNumPages = Math.min(5, totalPages);

    const currentItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const startPage = Math.max(2, currentPage - Math.floor(maxNumPages / 2));
    const endPage = Math.min(totalPages, startPage + maxNumPages - 1);
    const curRange = rangeArr(startPage, endPage);

    useEffect(() => {
        // Initialize the page from URL on component mount
        const params = new URLSearchParams(window.location.search)
        const page = parseInt(params.get('page') || '1', 10)
        setCurrentPage(page)

        // Listen for popstate events (browser back/forward)
        const handlePopState = (event: PopStateEvent) => {
            if (event.state && event.state.page) {
                setCurrentPage(event.state.page)
            }
        }

        window.addEventListener('popstate', handlePopState)

        return () => {
            window.removeEventListener('popstate', handlePopState)
        }
    }, [])
    const updatePage = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage)
            const url = new URL(window.location.href)
            url.searchParams.set('page', newPage.toString())
            window.history.pushState({ page: newPage }, '', url.toString())
        }
    }

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
    ;
    return (
        <>
            {children(currentItems)}
            <Pagination>
                <PaginationContent className="flex items-center">
                    <PaginationItem>
                        <PaginationPrevious onClick={() => updatePage(currentPage - 1)} />
                    </PaginationItem>
                    {curRange.map((page) => (
                        <PaginationItem key={page} onClick={() => updatePage(page)}>
                            <PaginationLink isActive={currentPage === page}>{page}</PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationEllipsis className="mt-auto"></PaginationEllipsis>
                    <PaginationItem onClick={() => handlePageClick(totalPages)}
                    >
                        <PaginationLink >
                            {totalPages}
                        </PaginationLink>
                    </PaginationItem>


                    <PaginationItem>
                        <PaginationNext onClick={() => updatePage(currentPage + 1)} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    )
}

export default PaginatedList