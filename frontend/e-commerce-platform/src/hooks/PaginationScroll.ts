import {
  useState,
  useCallback,
  type Dispatch,
  type SetStateAction,
} from "react";

export function usePaginationScroll(initialPage: number = 1) {
  const [page, setPage] = useState<number>(initialPage);

  const handlePageChange: Dispatch<SetStateAction<number>> = useCallback(
    (action) => {
      setPage((prev) => (typeof action === "function" ? action(prev) : action));

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    [],
  );

  return [page, handlePageChange] as const;
}
