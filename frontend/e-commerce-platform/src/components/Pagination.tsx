const Pagination = ({
  page,
  totalPages,
  setPage,
}: {
  page: number;

  totalPages: number;

  setPage: (page: number) => void;
}) => {
  return (
    <div className="flex justify-center gap-3 mt-10">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="btn"
      >
        Prev
      </button>

      <button className="btn btn-active">{page}</button>

      <button
        disabled={page >= totalPages}
        onClick={() => setPage(page + 1)}
        className="btn"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
