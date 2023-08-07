import { Fragment, useRef, useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const EditPost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [postStatus, setPostStatus] = useState(true);
  const [respMsg, setRespMsg] = useState("");
  let { id } = useParams();
  const titleRef = useRef();
  const descRef = useRef();
  const editPostHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setIsError(false);
    const response = await fetch("http://local.crud-api.com/update", {
      method: "PUT",
      headers: {
        "Content-type": "application/json;",
      },
      body: JSON.stringify({
        title: titleRef.current.value,
        description: descRef.current.value,
        user_name: "yogeshp",
        post_id: id,
      }),
    });
    if (response.status != 200) {
      console.log("Here....");
      setIsError(true);
      setRespMsg("Something went wrong...");
    }
    const rescreate = await response.json();
    if (rescreate.status == "updated") {
      setIsUpdated(true);
      setRespMsg("Post updated successfully");
    } else if (rescreate.status == "Nothing Updated") {
      setIsUpdated(true);
      setRespMsg("Nothing to update");
    }
    setIsLoading(false);
  };

  const loadPost = useCallback(async (id) => {
    setIsLoading(true);
    setIsLoading(false);
    setIsError(false);
    const response = await fetch(
      "http://local.crud-api.com/post?user_name=yogeshp&post_id=" + id
    );
    if (response.status != 200) {
      setIsError(true);
      setPostStatus(false);
    }
    if (!response.ok) {
      setRespMsg("Something went wrong...");
      return Error("Could not fetch Post data");
    }
    const postData = await response.json();
    //load data to form
    titleRef.current.value = postData.title;
    descRef.current.value = postData.description;
    setIsLoading(false);
  });
  useEffect(() => {
    loadPost(id);
  }, [id]);
  return (
    <Fragment>
      {isUpdated && (
        <div class="alert alert-success">
          <i class="fa fa-thumbs-up"></i> {respMsg}
        </div>
      )}
      {isError && (
        <div class="alert alert-danger">
          <i class="fa fa-exclamation-triangle"></i> {respMsg}
          <strong>Please try again!</strong>
        </div>
      )}
      <div className="card">
        <div className="card-header">
          <i className="fa fa-fw fa-plus-circle"></i> <strong>Edit Post</strong>{" "}
          <Link to={"/"} className="float-right btn btn-dark btn-sm">
            <i className="fa fa-fw fa-globe"></i> Browse Posts
          </Link>
        </div>

        <div className="card-body">
          <div className="col-sm-6">
            <h5 className="card-title">
              Fields with <span className="text-danger">*</span> are mandatory!
            </h5>
            <form method="post" onSubmit={editPostHandler}>
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
                {postStatus && (
                  <button
                    type="submit"
                    name="submit"
                    value="submit"
                    id="submit"
                    className="btn btn-primary"
                  >
                    <i className="fa fa-fw fa-plus-circle"></i>{" "}
                    {isLoading ? "Updating..." : "Update Post"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default EditPost;
