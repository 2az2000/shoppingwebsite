"use client"
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import ReactPaginate from "react-paginate";

export default function Pagination({pageCount}:{pageCount: number}) {
  const paginationParams = useSearchParams()
    const router = useRouter()
    function handlePageClick(event: {selected: number}){
        const page = event.selected + 1
        const currentPaginationParams = new URLSearchParams(paginationParams.toString())
        currentPaginationParams.set("page", page.toString())
        currentPaginationParams.set("per_page", "4")
        router.push(`/store?${currentPaginationParams.toString()}`)
    }
  return (
    <div>
      <ReactPaginate
        className="flex gap-2 justify-center items-center my-5 text-black 0font-bold text-2xl"
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        activeClassName="text-blue-500"
      />
    </div>
  );
}
