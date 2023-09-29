"use client";
import { Pagination, PaginationItem } from "@mui/material";
import Link from "next/link";

export default function CustomPagination({ total }: { total: number }) {
  return (
    <Pagination
      showFirstButton
      showLastButton
      count={Math.ceil(total / 5)}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          href={`/pets${item.page === 1 ? "" : `?page=${item.page}`}`}
          {...item}
        />
      )}
    />
  );
}
