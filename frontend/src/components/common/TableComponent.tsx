import { ReactNode, useState } from "react";
import { Table } from "react-bootstrap";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import resolveObjectPath from "../../utils/resolveObjectPath";

interface Header {
  value: string;
  label: ReactNode;
  content?: ReactNode;
}

export interface Item {
  [key: string]: ReactNode;
}

interface Props {
  headers: Header[];
  data: Item[];
}

const TableComponent = ({ headers, data }: Props) => {
  const [sorting, setSorting] = useState({ value: "", order: "" });

  const handleSort = (sortValue: string) =>
    setSorting((prevSorting) =>
      prevSorting.order === "asc"
        ? { value: sortValue, order: "dsc" }
        : { value: sortValue, order: "asc" }
    );

  const renderSortIcon = (header: Header) => {
    if (sorting.value !== header.value) return null;

    switch (sorting.order) {
      case "asc":
        return <AiOutlineSortAscending />;

      case "dsc":
        return <AiOutlineSortDescending />;

      default:
        return null;
    }
  };

  const renderCell = (item: Item, header: Header) =>
    (resolveObjectPath(item, header.value) as ReactNode) || header.content;

  const sortedData = sorting.value
    ? data.sort((dataA, dataB) => {
        const sortOrder = sorting.order === "asc" ? 1 : -1;

        return resolveObjectPath(dataA, sorting.value) <
          resolveObjectPath(dataB, sorting.value)
          ? -sortOrder
          : sortOrder;
      })
    : data;

  return (
    <Table striped>
      <thead>
        <tr>
          {headers.map((header, i) => (
            <th
              key={i}
              onClick={() => handleSort(header.value)}
              style={{ cursor: "pointer" }}
            >
              {header.label}
              {header.label && renderSortIcon(header)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((_, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header, itemIndex) => (
              <td key={itemIndex}>
                {renderCell(sortedData[rowIndex], header)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableComponent;
