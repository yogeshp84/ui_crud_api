import ListItem from "./listItem";
const Listing = ({ data, deleteHandler }) => {
  return (
    <div>
      <table class="table table-striped table-bordered">
        <thead>
          <tr class="bg-primary text-white">
            <th>Sr#</th>
            <th>Title</th>
            <th>Description</th>
            <th class="text-center">Record Date</th>
            <th class="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => {
            return (
              <ListItem item={item} count={i} onclickHandler={deleteHandler} />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Listing;
