import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react";

import { cn } from "@/utils/shadcn/utils";
import { Button, buttonVariants } from "@/components/shadcn/button";
import Link from "next/link";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
    return (
        <nav
            role="navigation"
            aria-label="pagination"
            data-slot="pagination"
            className={cn("mx-auto flex w-full justify-center", className)}
            {...props}
        />
    );
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
    return (
        <ul data-slot="pagination-content" className={cn("flex flex-row items-center gap-1", className)} {...props} />
    );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
    return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
    isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
    React.ComponentProps<typeof Link>;

function PaginationLink({ className, isActive, size = "icon", ...props }: PaginationLinkProps) {
    return (
        <Link
            aria-current={isActive ? "page" : undefined}
            data-slot="pagination-link"
            data-active={isActive}
            className={cn(
                buttonVariants({
                    variant: isActive ? "outline" : "ghost",
                    size,
                }),
                className
            )}
            {...props}
        />
    );
}

function PaginationPrevious({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
    return (
        <PaginationLink
            aria-label="Go to previous page"
            size="default"
            className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
            {...props}
        >
            <ChevronLeftIcon />
            <span className="hidden sm:block">Previous</span>
        </PaginationLink>
    );
}

function PaginationNext({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
    return (
        <PaginationLink
            aria-label="Go to next page"
            size="default"
            className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
            {...props}
        >
            <span className="hidden sm:block">Next</span>
            <ChevronRightIcon />
        </PaginationLink>
    );
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
    return (
        <span
            aria-hidden
            data-slot="pagination-ellipsis"
            className={cn("flex size-9 items-center justify-center", className)}
            {...props}
        >
            <MoreHorizontalIcon className="size-4" />
            <span className="sr-only">More pages</span>
        </span>
    );
}

function getVisiblePageNumbers(currentPage: number, totalPages: number): (number | "ellipsis")[] {
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
        if (currentPage <= 3) {
            pages.push(1, 2, 3, 4, "ellipsis", totalPages);
        } else if (currentPage >= totalPages - 2) {
            pages.push(1, "ellipsis", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
            pages.push(1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages);
        }
    }

    return pages;
}

type UPaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChanged: (page: number) => void;
};

function UPagination({ currentPage, totalPages, onPageChanged }: UPaginationProps) {
    const pageNumbers = getVisiblePageNumbers(currentPage, totalPages);
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            onPageChanged(currentPage - 1);
                        }}
                        aria-disabled={currentPage === 1}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>
                {pageNumbers.map((page, index) => (
                    <PaginationItem key={index}>
                        {page === "ellipsis" ? (
                            <PaginationEllipsis />
                        ) : (
                            <PaginationLink
                                href="#"
                                isActive={page === currentPage}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onPageChanged(page);
                                }}
                            >
                                {page}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            onPageChanged(currentPage + 1);
                        }}
                        aria-disabled={currentPage === totalPages}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

export {
    Pagination,
    PaginationContent,
    PaginationLink,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
    UPagination,
};

