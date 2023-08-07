import { Link } from "react-router-dom";

const ListItem = ({ item, count, onclickHandler }) => {
  const deletePostHandler = (id) => {
    const result = window.confirm("Want to delete?");
    if (result) {
      onclickHandler(id);
    }
  };
  return (
    <tr key={item.id}>
      <td>{count + 1}</td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td align="center">{item.created_on}</td>
      <td align="center">
        <Link to={`edit/${item.id}`}>
          <i class="fa fa-fw fa-edit"></i> Edit
        </Link>
        |
        <span
          class="text-danger"
          style={{ cursor: "pointer" }}
          onClick={() => {
            deletePostHandler(item.id);
          }}
        >
          <i class="fa fa-fw fa-trash"></i> Delete
        </span>
      </td>
    </tr>
  );
};

export default ListItem;
