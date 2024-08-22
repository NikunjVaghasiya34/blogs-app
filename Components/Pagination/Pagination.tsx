import React from "react";
import PgnStyle from "./Pagination.module.scss";

interface PaginationProps {
  pageNo: number;
  totalRecord: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  pageNo,
  totalRecord,
  onPageChange,
}: PaginationProps) {
  const blogsPerPage = 10;
  const totalPages = Math.ceil(totalRecord / blogsPerPage);
  const maxPageNumbersToShow = 4;

  const getPageNumbers = () => {
    const pageNumbers = [];

    let startPage = Math.max(1, pageNo - Math.floor(maxPageNumbersToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

    if (endPage - startPage + 1 < maxPageNumbersToShow) {
      startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={PgnStyle.pagination}>
      {/* Previous */}
      {pageNo > 1 && (
        <button onClick={() => onPageChange(pageNo - 1)}>Previous</button>
      )}

      {/* Page Numbers */}
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={pageNo === number ? PgnStyle.active : ""}
        >
          {number}
        </button>
      ))}

      {/* Next */}
      {pageNo < totalPages && (
        <button onClick={() => onPageChange(pageNo + 1)}>Next</button>
      )}
    </div>
  );
}
