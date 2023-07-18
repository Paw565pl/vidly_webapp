import Pagination from "react-bootstrap/Pagination";

interface Props {
  itemsCount: number;
  pageSize: number;
  activePage: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent = ({
  itemsCount,
  pageSize,
  activePage,
  onPageChange,
}: Props) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);

  if (pagesCount === 1) return null;

  return (
    <Pagination>
      {[...Array(pagesCount).keys()]
        .map((number) => number + 1)
        .map((page) => (
          <Pagination.Item
            key={page}
            active={page === activePage}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Pagination.Item>
        ))}
    </Pagination>
  );
};

export default PaginationComponent;
