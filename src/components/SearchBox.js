import { useRef } from "react";
import { Link } from "react-router-dom";

const SearchBox = ({ initiateSearch }) => {
  const searchString = useRef("search");
  const searchHandler = (event) => {
    event.preventDefault();
    initiateSearch(searchString.current.value);
  };
  return (
    <div className="card">
      <div className="card-header">
        <i className="fa fa-fw fa-globe"></i> <strong>Browse Posts</strong>
        <Link to={"/create"} className="float-right btn btn-dark btn-sm">
          <i className="fa fa-fw fa-plus-circle"></i> Add Post
        </Link>
      </div>
      <div className="card-body">
        <div className="col-sm-12">
          <h5 className="card-title">
            <i className="fa fa-fw fa-search"></i> Find Post
          </h5>
          <form method="get" onSubmit={searchHandler}>
            <div className="row">
              <div className="col-sm-2">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="search"
                    id="search"
                    ref={searchString}
                    className="form-control"
                    placeholder="Enter title"
                  />
                </div>
              </div>
              <div className="col-sm-2">
                <div className="form-group">
                  <label>&nbsp;</label>
                  <div>
                    <button
                      type="submit"
                      name="submit"
                      value="search"
                      id="button"
                      className="btn btn-primary"
                    >
                      <i className="fa fa-fw fa-search"></i> Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
