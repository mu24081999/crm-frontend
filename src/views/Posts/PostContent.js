import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import AddPostForm from "./components/AddPostForm";
import PostList from "./components/PostList";
import { useDispatch, useSelector } from "react-redux";
import { getPostList } from "../../redux/services/post";

const PostContent = () => {
  const [toggle, setToggle] = useState("List");
  const [postData, setPostData] = useState([]);
  const [deletedPostsData, setDeletedPostsData] = useState([]);
  const [draftPostData, setDraftPostData] = useState([]);
  const [archivedPostData, setArchivedPostData] = useState([]);
  const [filteredPostData, setFilteredPostData] = useState([]);
  console.log("🚀 ~ PostContent ~ filteredPostData:", filteredPostData);
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { posts, postDetails } = useSelector((state) => state.post);
  const handleDataFromChild = (value) => {
    setToggle(value);
  };
  useEffect(() => {
    dispatch(getPostList(token));
  }, [dispatch, token]);
  useEffect(() => {
    const data =
      posts?.length > 0 && posts?.filter((post) => post.status === "published");
    const deleted_posts =
      posts?.length > 0 && posts?.filter((post) => post.status === "blocked");
    const archived_posts =
      posts?.length > 0 && posts?.filter((post) => post.status === "archived");
    const draft_posts =
      posts?.length > 0 && posts?.filter((post) => post.status === "draft");
    setPostData(data);
    setFilteredPostData(data);
    setDeletedPostsData(deleted_posts);
    setArchivedPostData(archived_posts);
    setDraftPostData(draft_posts);
  }, [posts]);
  const handlePostDataFromChild = (data) => {
    setFilteredPostData(data);
  };

  return (
    <div className="hk-pg-wrapper pb-0">
      <div className="hk-pg-body py-0">
        <div className="blogapp-wrap">
          <Sidebar
            onDataFromChild={handleDataFromChild}
            dispatch={dispatch}
            deletedPostsData={deletedPostsData}
            onDeletedDataFromChild={handlePostDataFromChild}
            archivedPostData={archivedPostData}
            onArchivedDataFromChild={handlePostDataFromChild}
            draftPostData={draftPostData}
            onDraftDataFromChild={handlePostDataFromChild}
            postData={postData}
          />
          <div className="blogapp-content">
            <div className="blogapp-detail-wrap">
              {toggle === "Create" ? <Header /> : ""}

              <div className="blog-body">
                <div data-simplebar className="nicescroll-bar">
                  <div className="container-fluid">
                    {toggle === "Create" ? (
                      <AddPostForm
                        authUser={user}
                        dispatch={dispatch}
                        token={token}
                        postDetails={postDetails}
                      />
                    ) : (
                      <PostList
                        authUser={user}
                        dispatch={dispatch}
                        token={token}
                        postData={filteredPostData}
                        initialPostData={postData}
                        onDataFromChild={handlePostDataFromChild}
                        deletedPostsData={deletedPostsData}
                        onEditDataFromChild={handleDataFromChild}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Add Category --> */}
            <div
              id="add_new_cat"
              className="modal fade"
              tabindex="-1"
              role="dialog"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered modal-sm"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-body">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                    <h6 className="text-uppercase fw-bold mb-3">
                      Add Category
                    </h6>
                    <form>
                      <div className="row gx-3">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Category Name"
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary float-end"
                        data-bs-dismiss="modal"
                      >
                        Add
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- /Add Category --> */}

            {/* <!-- Add Tag --> */}
            <div
              id="add_new_tag"
              className="modal fade"
              tabindex="-1"
              role="dialog"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered modal-sm"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-body">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                    <h6 className="text-uppercase fw-bold mb-3">Add Tag</h6>
                    <form>
                      <div className="row gx-3">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <select
                              id="input_tags_1"
                              className="form-control"
                              multiple="multiple"
                            >
                              <option selected="selected">Collaborator</option>
                              <option selected="selected">Designer</option>
                              <option selected="selected">
                                React Developer
                              </option>
                              <option selected="selected">Promotion</option>
                              <option selected="selected">Advertisement</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary float-end"
                        data-bs-dismiss="modal"
                      >
                        Add
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Add Tag --> */}
          </div>
        </div>
      </div>
      {/* <!-- /Page Body --> */}
    </div>
  );
};

export default PostContent;
