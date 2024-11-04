"use client"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { useEffect, useState } from "react";



const PaginatedList = ({ items, children }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const maxNumPages = Math.min(5, totalPages);

    const rangeArr = (startIndex: number, endIndex: number, itemsPerPage = 5): number[] => {
        const length = endIndex - startIndex + 1;
        const validNumbers = Array.from({ length }, (_, index) => {
            const pageNum = startIndex + index;
            return pageNum <= totalPages ? pageNum : null;
        }).filter((num): num is number => num !== null);

        return validNumbers.slice(0, itemsPerPage);
    };
    const currentItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


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

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    let startPage = Math.max(
        1,
        Math.min(
            currentPage - Math.floor(maxNumPages / 2),
            totalPages - maxNumPages + 1
        )
    );
    let endPage = Math.min(totalPages, startPage + maxNumPages - 1);

    if (endPage === totalPages) {
        startPage = startPage - 1
        endPage = endPage - 1
    }

    let curRange = rangeArr(startPage, endPage);

    return (
        <div>
            {children(currentItems)}
            {totalPages > 1 && (
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
                        {totalPages > maxNumPages && (
                            <>
                                <PaginationEllipsis className="mt-auto" />
                                <PaginationItem onClick={() => updatePage(totalPages)}>
                                    <PaginationLink isActive={currentPage === totalPages}>
                                        {totalPages}
                                    </PaginationLink>
                                </PaginationItem>
                            </>
                        )}
                        <PaginationItem>
                            <PaginationNext onClick={() => updatePage(currentPage + 1)} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>)
}


export default PaginatedList