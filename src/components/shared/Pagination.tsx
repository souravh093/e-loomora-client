import React from "react";
import { Button } from "@/components/ui/button";

// Props type definition
interface PaginationProps {
  active: number; // The currently active page
  totalPages: number; // Total number of pages
  onPageChange: (page: number) => void; // Function to handle page changes
}

const Pagination: React.FC<PaginationProps> = ({ active, totalPages, onPageChange }) => {
  const adjacentPages = 2;

  const pages: JSX.Element[] = [];
  const startPage = Math.max(1, active - adjacentPages);
  const endPage = Math.min(totalPages, active + adjacentPages);

  // Generate pages
  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <Button
        key={i}
        size="sm"
        className={`rounded-none ${active === i ? "bg-green-500 text-white" : "bg-transparent"}`}
        onClick={() => onPageChange(i)}
        variant={active === i ? "default" : "ghost"}
      >
        {i}
      </Button>
    );
  }

  // Add ellipsis and first page button if necessary
  if (startPage > 1) {
    pages.unshift(
      <Button
        key="ellipsis-start"
        size="sm"
        className="rounded-none bg-transparent"
        variant="ghost"
        disabled
      >
        ...
      </Button>,
      <Button
        key={1}
        size="sm"
        className={`rounded-none ${active === 1 ? "bg-green-500 text-white" : "bg-transparent"}`}
        onClick={() => onPageChange(1)}
        variant={active === 1 ? "default" : "ghost"}
      >
        {1}
      </Button>
    );
  }

  // Add ellipsis and last page button if necessary
  if (endPage < totalPages) {
    pages.push(
      <Button
        key="ellipsis-end"
        size="sm"
        className="rounded-none bg-transparent"
        variant="ghost"
        disabled
      >
        ...
      </Button>,
      <Button
        key={totalPages}
        size="sm"
        className={`rounded-none ${active === totalPages ? "bg-green-500 text-white" : "bg-transparent"}`}
        onClick={() => onPageChange(totalPages)}
        variant={active === totalPages ? "default" : "ghost"}
      >
        {totalPages}
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Button
        size="sm"
        className="flex items-center gap-2 rounded-none bg-gray-100 text-gray-700"
        onClick={() => onPageChange(active - 1)}
        disabled={active === 1}
      >
        Previous
      </Button>
      <div className="flex items-center gap-2">{pages}</div>
      <Button
        size="sm"
        className="flex items-center gap-2 rounded-none bg-gray-100 text-gray-700"
        onClick={() => onPageChange(active + 1)}
        disabled={active === totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
