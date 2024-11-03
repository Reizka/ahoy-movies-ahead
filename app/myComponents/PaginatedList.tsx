import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { useEffect, useState } from "react";


const rangeArr = (startIndex: number, endIndex: number, itemsPerPage=5): number[] => {
    const length = endIndex - startIndex + 1;
    if (length < itemsPerPage) {
        // If range is too small, pad with additional numbers after endIndex
        return Array.from({ length: itemsPerPage }, (_, index) => {
            if (index < length) {
                return startIndex + index - 1;
            }
            return endIndex + (index - length + 1);
        });
    }
    if (length > itemsPerPage) {
        // If range is too large, truncate to 5 items
        return Array.from({ length: itemsPerPage }, (_, index) => startIndex + index - 1);
    }
    // If length is exactly 5, use original logic
    return Array.from({ length }, (_, index) => startIndex + index - 1);
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

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            {children(currentItems)}
            {totalPages > 1 && (
                <Pagination>
                    <PaginationContent className="flex items-center">
                    <PaginationItem>
                        <PaginationPrevious onClick={() => updatePage(currentPage - 1)} />
                    </PaginationItem>
                    {curRange.map((page) => (
                        <PaginationItem key={page} onClick={() => 
                        updatePage(page)}>
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
            )}
        </>
    )
}

export default PaginatedList