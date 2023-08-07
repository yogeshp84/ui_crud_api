import { Fragment, useEffect, useState, useCallback } from "react";
import SearchBox from "../components/SearchBox";
import Listing from "../components/listing";
import Pagination from "../components/paginate";

const HomePage = () => {
  const [listingData, setListingData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isDeleteError, setIsDeleteError] = useState(false);
  const [respMsg, setRespMsg] = useState("");
  const [isdeleted, setIsdeleted] = useState(false);
  const [updateListing, setUpdateListing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [start, setStart] = useState(0);
  const [perPage] = useState(2);
  const [totalPosts, setTotalPosts] = useState();
  const loadListingHadler = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch(
      "http://local.crud-api.com/list?user_name=yogeshp&start=" +
        start +
        "&end=" +
        perPage +
        "&keyword=" +
        searchKeyword
    );
    if (!response.ok) {
      setIsError(true);
      return Error("Could not fetch listing");
    }
    const resListing = await response.json();

    setListingData(resListing.items);
    setTotalPosts(resListing.count);
    setIsLoading(false);
  });

  const paginate = (currentPage) => {
    let newStart = 0;
    if (currentPage > 1) {
      newStart = perPage * (currentPage - 1);
    }
    setStart(newStart);
    setCurrentPage(currentPage);
  };
  const deleteHandler = async (id) => {
    setIsDeleting(true);
    setIsDeleteError(false);
    const response = await fetch("http://local.crud-api.com/delete", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json;",
      },
      body: JSON.stringify({
        user_name: "yogeshp",
        post_id: id,
      }),
    });
    if (response.status != 200) {
      setIsDeleteError(true);
      setRespMsg("Something went wrong...");
    }
    const resDelete = await response.json();
    if (resDelete.status == "deleted") {
      setIsdeleted(true);
      setRespMsg("Post deleted successfully");
      setUpdateListing(id);
    } else if (resDelete.status == "Nothing Updated") {
      setIsdeleted(true);
      setRespMsg("Nothing to delete");
    }
    setIsDeleting(false);
  };
  useEffect(() => {
    loadListingHadler();
  }, [searchKeyword, updateListing, currentPage]);
  return (
    <Fragment>
      {isdeleted && (
        <div class="alert alert-success">
          <i class="fa fa-thumbs-up"></i> {respMsg}
        </div>
      )}
      {isDeleteError && (
        <div class="alert alert-danger">
          <i class="fa fa-exclamation-triangle"></i> {respMsg}
          <strong>Please try again!</strong>
        </div>
      )}
      <SearchBox initiateSearch={setSearchKeyword} />
      <hr />
      {isLoading && <p>Loading..</p>}
      {isError && <p>Something went wrong</p>}
      {listingData.length === 0 && <p>No Post Found</p>}
      {listingData.length > 0 && (
        <Listing data={listingData} deleteHandler={deleteHandler} />
      )}
      <Pagination
        postsPerPage={perPage}
        totalPosts={totalPosts}
        paginate={paginate}
      />
    </Fragment>
  );
};

export default HomePage;
