import { Fragment, useRef, useState } from "react";
import { Link } from "react-router-dom";

const CreatePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const titleRef = useRef();
  const descRef = useRef();
  const createPostHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const response = await fetch("http://local.crud-api.com/create", {
      method: "POST",
      headers: {
        "Content-type": "application/json;",
      },
      body: JSON.stringify({
        title: titleRef.current.value,
        description: descRef.current.value,
        user_name: "yogeshp",
      }),
    });
    if (!response.ok) {
      setIsError(true);
      return Error("Could not add new post");
    }
    const rescreate = await response.json();
    if (rescreate.status == "created") {
      setIsAdded(true);
    }

    setIsLoading(false);
  };
  return (
    <Fragment>
      {isAdded && (
        <div class="alert alert-success">
          <i class="fa fa-thumbs-up"></i> Record added successfully!
        </div>
      )}
      {isError && (
        <div class="alert alert-danger">
          <i class="fa fa-exclamation-triangle"></i> Record not added{" "}
          <strong>Please try again!</strong>
        </div>
      )}
      <div className="card">
        <div className="card-header">
          <i className="fa fa-fw fa-plus-circle"></i> <strong>Add Post</strong>
          <Link to={"/"} className="float-right btn btn-dark btn-sm">
            <i className="fa fa-fw fa-globe"></i> Browse Posts
          </Link>
        </div>

        <div className="card-body">
          <div className="col-sm-6">
            <h5 className="card-title">
              Fields with <span className="text-danger">*</span> are mandatory!
            </h5>

            <form method="post" onSubmit={createPostHandler}>
              <div className="form-group">
                <label>
                  Title <span className="text-danger">*</span>
                </label>

                <input
                  type="text"
                  name="title"
                  id="title"
                  className="form-control"
                  placeholder="Enter title"
                  required
                  ref={titleRef}
                />
              </div>

              <div className="form-group">
                <label>
                  Description <span className="text-danger">*</span>
                </label>

                <textarea
                  name="description"
                  id="description"
                  className="form-control"
                  placeholder="Enter description"
                  required
                  ref={descRef}
                ></textarea>
              </div>

              <div className="form-group">
                <button
                  type="submit"
                  name="submit"
                  value="submit"
                  id="submit"
                  className="btn btn-primary"
                >
                  <i className="fa fa-fw fa-plus-circle"></i>{" "}
                  {isLoading ? "Creating..." : "Add Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default CreatePost;
