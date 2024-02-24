import { ListGroup } from "react-bootstrap";

interface Props {
  items: { [key: string]: string }[];
  selectedItemId: string;
  onItemSelect: (itemId: string) => void;
}

const ListGroupComponent = ({ items, selectedItemId, onItemSelect }: Props) => {
  return (
    <ListGroup as="ul">
      {items.map((item) => (
        <ListGroup.Item
          as="li"
          key={item._id}
          active={item._id === selectedItemId}
          onClick={() => onItemSelect(item._id)}
          role="button"
        >
          {item.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ListGroupComponent;
