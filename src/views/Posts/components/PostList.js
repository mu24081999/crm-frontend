import React, { useEffect } from "react";
import PostListHeader from "./PostListHeader";
import moment from "moment";
import { CiMenuKebab } from "react-icons/ci";
import { FaEdit, FaTrash } from "react-icons/fa";
import { deletePostRec, getPostDetails } from "../../../redux/services/post";

const PostList = ({
  authUser,
  token,
  dispatch,
  postData,
  deletedPostsData,
  onDataFromChild,
  onEditDataFromChild,
  initialPostData,
}) => {
  console.log("🚀 ~ PostList ~ postData:", postData);
  const handleDeletePost = (post_id) => {
    dispatch(deletePostRec(token, post_id));
  };
  const handleEditPost = (post_id) => {
    dispatch(getPostDetails(token, post_id));
    onEditDataFromChild("Create");
  };

  return (
    <div className="blogapp-detail-wrap">
      <PostListHeader />
      <div className="blog-body">
        <div className="nicescroll-bar">
          <div className="post-list">
            <ul className="nav nav-tabs nav-line nav-icon nav-light">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-bs-toggle="tab"
                  href="/all_post"
                >
                  <div
                    className="d-flex align-items-center"
                    onClick={() => onDataFromChild(initialPostData)}
                  >
                    <span className="nav-link-text">All Posts</span>
                    <span className="badge badge-pill badge-sm badge-soft-secondary ms-1">
                      {postData?.length}
                    </span>
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  onClick={() => onDataFromChild(initialPostData)}
                >
                  <div className="d-flex align-items-center">
                    <span className="nav-link-text">Published</span>
                    <span className="badge badge-pill badge-sm badge-soft-secondary ms-1">
                      {postData?.length}
                    </span>
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  onClick={() => onDataFromChild(deletedPostsData)}
                >
                  <div className="d-flex align-items-center">
                    <span className="nav-link-text">Trash</span>
                    <span className="badge badge-pill badge-sm badge-soft-secondary ms-1">
                      {deletedPostsData?.length}
                    </span>
                  </div>
                </a>
              </li>
            </ul>
            <div
              className="tab-content"
              style={{ minHeight: "200px", overflow: "scroll" }}
            >
              <div className="tab-pane show active ">
                <table className="table table-responsive ">
                  <thead>
                    <tr>
                      {/* <th>
                        <span className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input check-select-all"
                            id="customCheck1"
                          />
                          <label
                            className="form-check-label"
                            for="customCheck1"
                          ></label>
                        </span>
                      </th> */}
                      <th>ID</th>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Categories</th>
                      <th>Tags</th>
                      <th>Status</th>
                      <th>Date</th>
                      {/* <th>SEO</th> */}
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {postData?.length > 0 &&
                      postData?.map((post, index) => (
                        <tr key={index} className="">
                          {/* <td></td> */}
                          <td>{post.id}</td>
                          <td className="mw-250p text-truncate text-high-em">
                            <span>{post.title}</span>
                          </td>
                          <td>
                            <div className="media align-items-center">
                              <div className="media-head me-2">
                                <div className="avatar avatar-xs">
                                  <img
                                    src={post?.user_image}
                                    alt="user"
                                    className="avatar-img rounded-circle"
                                  />
                                </div>
                              </div>
                              <div className="media-body">
                                <span className="d-block">
                                  {post.user_name}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>{post.category}</td>
                          <td>
                            {post?.tags?.tags?.length > 0 &&
                              post?.tags?.tags?.map((tag, index) => (
                                <span
                                  className="badge badge-soft-violet my-1  me-2"
                                  key={index}
                                >
                                  {tag}
                                </span>
                              ))}
                            {/* <span className="badge badge-soft-danger my-1  me-2">
                              Collaborator
                            </span> */}
                          </td>
                          <td>{post.status}</td>
                          <td>
                            {moment(post.created_at).format("DD MMM YYYY")}
                          </td>
                          {/* <td>
                            <span className="badge badge-primary badge-indicator badge-indicator-xl"></span>
                          </td> */}
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="dropdown">
                                <button
                                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                                  aria-expanded="false"
                                  data-bs-toggle="dropdown"
                                >
                                  <span className="icon">
                                    <span className="feather-icon">
                                      {/* <i data-feather="more-vertical"></i> */}
                                      <CiMenuKebab />
                                    </span>
                                  </span>
                                </button>
                                <div
                                  role="menu"
                                  className="dropdown-menu dropdown-menu-end"
                                >
                                  <a
                                    onClick={() => handleDeletePost(post.id)}
                                    className="dropdown-item"
                                    // href="/"
                                  >
                                    <FaTrash className="me-1" />
                                    <span>Delete</span>
                                  </a>
                                  <a
                                    onClick={() => handleEditPost(post.id)}
                                    className="dropdown-item"
                                    // href="/"
                                  >
                                    <FaEdit className="me-1" />

                                    <span>Edit</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    {/* <tr>
                      <td></td>
                      <td>109</td>
                      <td className="mw-250p text-truncate text-high-em">
                        <span>Testing Post</span>
                      </td>
                      <td>
                        <div className="media align-items-center">
                          <div className="media-head me-2">
                            <div className="avatar avatar-xs">
                              <img
                                src="dist/img/avatar9.jpg"
                                alt="user"
                                className="avatar-img rounded-circle"
                              />
                            </div>
                          </div>
                          <div className="media-body">
                            <span className="d-block">Huma Therman</span>
                          </div>
                        </div>
                      </td>
                      <td>Development</td>
                      <td>-</td>
                      <td>Draft</td>
                      <td>
                        13 Jan 2020
                        <div className="fs-8">Last Edited</div>
                      </td>
                      <td>
                        <span className="badge badge-light badge-indicator badge-indicator-xl"></span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="dropdown">
                            <button
                              className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                              aria-expanded="false"
                              data-bs-toggle="dropdown"
                            >
                              <span className="icon">
                                <span className="feather-icon">
                                  <i data-feather="more-vertical"></i>
                                </span>
                              </span>
                            </button>
                            <div
                              role="menu"
                              className="dropdown-menu dropdown-menu-end"
                            >
                              <a className="dropdown-item" href="/">
                                Action
                              </a>
                              <a className="dropdown-item" href="/">
                                Another action
                              </a>
                              <a className="dropdown-item" href="/">
                                Something else here
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/">
                                Separated link
                              </a>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>108</td>
                      <td className="mw-250p text-truncate text-high-em">
                        <span>Untitled Post</span>
                      </td>
                      <td>
                        <div className="media align-items-center">
                          <div className="media-head me-2">
                            <div className="avatar avatar-xs avatar-soft-success avatar-rounded">
                              <span className="initial-wrap">C</span>
                            </div>
                          </div>
                          <div className="media-body">
                            <span className="d-block">Charlie Chaplin</span>
                          </div>
                        </div>
                      </td>
                      <td>-</td>
                      <td>-</td>
                      <td>Draft</td>
                      <td>
                        13 Jan 2020
                        <div className="fs-8">Last Edited</div>
                      </td>
                      <td>
                        <span className="badge badge-light badge-indicator badge-indicator-xl"></span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="dropdown">
                            <button
                              className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                              aria-expanded="false"
                              data-bs-toggle="dropdown"
                            >
                              <span className="icon">
                                <span className="feather-icon">
                                  <i data-feather="more-vertical"></i>
                                </span>
                              </span>
                            </button>
                            <div
                              role="menu"
                              className="dropdown-menu dropdown-menu-end"
                            >
                              <a className="dropdown-item" href="/">
                                Action
                              </a>
                              <a className="dropdown-item" href="/">
                                Another action
                              </a>
                              <a className="dropdown-item" href="/">
                                Something else here
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/">
                                Separated link
                              </a>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>106</td>
                      <td className="mw-250p text-truncate text-high-em">
                        <span>Remote Work & Collaboration in Design</span>
                      </td>
                      <td>
                        <div className="media align-items-center">
                          <div className="media-head me-2">
                            <div className="avatar avatar-xs">
                              <img
                                src="dist/img/avatar10.jpg"
                                alt="user"
                                className="avatar-img rounded-circle"
                              />
                            </div>
                          </div>
                          <div className="media-body">
                            <span className="d-block">Winston Churcchil</span>
                          </div>
                        </div>
                      </td>
                      <td>Business</td>
                      <td>
                        <span className="badge badge-soft-violet my-1  me-2">
                          Promotion
                        </span>
                        <span className="badge badge-soft-light my-1  me-2">
                          Advertisement
                        </span>
                      </td>
                      <td>Published</td>
                      <td>13 Jan 2020</td>
                      <td>
                        <span className="badge badge-danger badge-indicator badge-indicator-xl"></span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="dropdown">
                            <button
                              className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                              aria-expanded="false"
                              data-bs-toggle="dropdown"
                            >
                              <span className="icon">
                                <span className="feather-icon">
                                  <i data-feather="more-vertical"></i>
                                </span>
                              </span>
                            </button>
                            <div
                              role="menu"
                              className="dropdown-menu dropdown-menu-end"
                            >
                              <a className="dropdown-item" href="/">
                                Action
                              </a>
                              <a className="dropdown-item" href="/">
                                Another action
                              </a>
                              <a className="dropdown-item" href="/">
                                Something else here
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/">
                                Separated link
                              </a>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>105</td>
                      <td className="mw-250p text-truncate text-high-em">
                        <span>What are empty states in application?</span>
                      </td>
                      <td>
                        <div className="media align-items-center">
                          <div className="media-head me-2">
                            <div className="avatar avatar-xs">
                              <img
                                src="dist/img/avatar3.jpg"
                                alt="user"
                                className="avatar-img rounded-circle"
                              />
                            </div>
                          </div>
                          <div className="media-body">
                            <span className="d-block">Jaquiline Joker</span>
                          </div>
                        </div>
                      </td>
                      <td>Design</td>
                      <td>
                        <span className="badge badge-soft-violet my-1  me-2">
                          Promotion
                        </span>
                        <span className="badge badge-soft-danger my-1  me-2">
                          Collaborator
                        </span>
                      </td>
                      <td>Published</td>
                      <td>13 Jan 2020</td>
                      <td>
                        <span className="badge badge-warning badge-indicator badge-indicator-xl"></span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="dropdown">
                            <button
                              className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                              aria-expanded="false"
                              data-bs-toggle="dropdown"
                            >
                              <span className="icon">
                                <span className="feather-icon">
                                  <i data-feather="more-vertical"></i>
                                </span>
                              </span>
                            </button>
                            <div
                              role="menu"
                              className="dropdown-menu dropdown-menu-end"
                            >
                              <a className="dropdown-item" href="/">
                                Action
                              </a>
                              <a className="dropdown-item" href="/">
                                Another action
                              </a>
                              <a className="dropdown-item" href="/">
                                Something else here
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/">
                                Separated link
                              </a>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>104</td>
                      <td className="mw-250p text-truncate text-high-em">
                        <span>
                          How to keep your code simple and orderly that any
                          developer can pick up easily?
                        </span>
                      </td>
                      <td>
                        <div className="media align-items-center">
                          <div className="media-head me-2">
                            <div className="avatar avatar-xs">
                              <img
                                src="dist/img/avatar7.jpg"
                                alt="user"
                                className="avatar-img rounded-circle"
                              />
                            </div>
                          </div>
                          <div className="media-body">
                            <span className="d-block">Tom Cruz</span>
                          </div>
                        </div>
                      </td>
                      <td>Development</td>
                      <td>
                        <span className="badge badge-soft-danger my-1  me-2">
                          Collaboration
                        </span>
                        <span className="badge badge-soft-success my-1  me-2">
                          Angular Development
                        </span>
                      </td>
                      <td>Published</td>
                      <td>
                        13 Jan 2020
                        <div className="fs-8">Last Edited</div>
                      </td>
                      <td>
                        <span className="badge badge-primary badge-indicator badge-indicator-xl"></span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="dropdown">
                            <button
                              className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                              aria-expanded="false"
                              data-bs-toggle="dropdown"
                            >
                              <span className="icon">
                                <span className="feather-icon">
                                  <i data-feather="more-vertical"></i>
                                </span>
                              </span>
                            </button>
                            <div
                              role="menu"
                              className="dropdown-menu dropdown-menu-end"
                            >
                              <a className="dropdown-item" href="/">
                                Action
                              </a>
                              <a className="dropdown-item" href="/">
                                Another action
                              </a>
                              <a className="dropdown-item" href="/">
                                Something else here
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/">
                                Separated link
                              </a>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>104</td>
                      <td className="mw-250p text-truncate text-high-em">
                        <span>Untitled post</span>
                      </td>
                      <td>
                        <div className="media align-items-center">
                          <div className="media-head me-2">
                            <div className="avatar avatar-xs avatar-soft-danger avatar-rounded">
                              <span className="initial-wrap">D</span>
                            </div>
                          </div>
                          <div className="media-body">
                            <span className="d-block">Daniel Craig</span>
                          </div>
                        </div>
                      </td>
                      <td>-</td>
                      <td>
                        <span className="badge badge-soft-violet my-1  me-2">
                          Collaboration
                        </span>
                        <span className="badge badge-soft-success my-1  me-2">
                          Angular Development
                        </span>
                      </td>
                      <td>Draft</td>
                      <td>
                        13 Jan 2020
                        <div className="fs-8">Last Edited</div>
                      </td>
                      <td>
                        <span className="badge badge-light badge-indicator badge-indicator-xl"></span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="dropdown">
                            <button
                              className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                              aria-expanded="false"
                              data-bs-toggle="dropdown"
                            >
                              <span className="icon">
                                <span className="feather-icon">
                                  <i data-feather="more-vertical"></i>
                                </span>
                              </span>
                            </button>
                            <div
                              role="menu"
                              className="dropdown-menu dropdown-menu-end"
                            >
                              <a className="dropdown-item" href="/">
                                Action
                              </a>
                              <a className="dropdown-item" href="/">
                                Another action
                              </a>
                              <a className="dropdown-item" href="/">
                                Something else here
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/">
                                Separated link
                              </a>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>103</td>
                      <td className="mw-250p text-truncate text-high-em">
                        <span>Sass based solid core framework</span>
                      </td>
                      <td>
                        <div className="media align-items-center">
                          <div className="media-head me-2">
                            <div className="avatar avatar-xs avatar-primary avatar-rounded">
                              <span className="initial-wrap">H</span>
                            </div>
                          </div>
                          <div className="media-body">
                            <span className="d-block">Hence work</span>
                          </div>
                        </div>
                      </td>
                      <td>User Interface</td>
                      <td>
                        <span className="badge badge-soft-violet my-1  me-2">
                          Promotion
                        </span>
                      </td>
                      <td>Draft</td>
                      <td>13 Jan 2020</td>
                      <td>
                        <span className="badge badge-light badge-indicator badge-indicator-xl"></span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="dropdown">
                            <button
                              className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                              aria-expanded="false"
                              data-bs-toggle="dropdown"
                            >
                              <span className="icon">
                                <span className="feather-icon">
                                  <i data-feather="more-vertical"></i>
                                </span>
                              </span>
                            </button>
                            <div
                              role="menu"
                              className="dropdown-menu dropdown-menu-end"
                            >
                              <a className="dropdown-item" href="/">
                                Action
                              </a>
                              <a className="dropdown-item" href="/">
                                Another action
                              </a>
                              <a className="dropdown-item" href="/">
                                Something else here
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/">
                                Separated link
                              </a>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>102</td>
                      <td className="mw-250p text-truncate text-high-em">
                        <span>
                          Marvin - Bootstrap 4.5.0 Admin Dashboard template
                        </span>
                      </td>
                      <td>
                        <div className="media align-items-center">
                          <div className="media-head me-2">
                            <div className="avatar avatar-xs">
                              <img
                                src="dist/img/avatar8.jpg"
                                alt="user"
                                className="avatar-img rounded-circle"
                              />
                            </div>
                          </div>
                          <div className="media-body">
                            <span className="d-block">Huma Therman</span>
                          </div>
                        </div>
                      </td>
                      <td>Design</td>
                      <td>
                        <span className="badge badge-soft-violet my-1  me-2">
                          Promotion
                        </span>
                      </td>
                      <td>Published</td>
                      <td>13 Jan 2020</td>
                      <td>
                        <span className="badge badge-primary badge-indicator badge-indicator-xl"></span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="dropdown">
                            <button
                              className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                              aria-expanded="false"
                              data-bs-toggle="dropdown"
                            >
                              <span className="icon">
                                <span className="feather-icon">
                                  <i data-feather="more-vertical"></i>
                                </span>
                              </span>
                            </button>
                            <div
                              role="menu"
                              className="dropdown-menu dropdown-menu-end"
                            >
                              <a className="dropdown-item" href="/">
                                Action
                              </a>
                              <a className="dropdown-item" href="/">
                                Another action
                              </a>
                              <a className="dropdown-item" href="/">
                                Something else here
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/">
                                Separated link
                              </a>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>101</td>
                      <td className="mw-250p text-truncate text-high-em">
                        <span>Go miles away</span>
                      </td>
                      <td>
                        <div className="media align-items-center">
                          <div className="media-head me-2">
                            <div className="avatar avatar-xs">
                              <img
                                src="dist/img/avatar8.jpg"
                                alt="user"
                                className="avatar-img rounded-circle"
                              />
                            </div>
                          </div>
                          <div className="media-body">
                            <span className="d-block">Huma Therman</span>
                          </div>
                        </div>
                      </td>
                      <td>Business</td>
                      <td>
                        <span className="badge badge-soft-violet my-1  me-2">
                          Promotion
                        </span>
                      </td>
                      <td>Published</td>
                      <td>13 Jan 2020</td>
                      <td>
                        <span className="badge badge-primary badge-indicator badge-indicator-xl"></span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="dropdown">
                            <button
                              className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                              aria-expanded="false"
                              data-bs-toggle="dropdown"
                            >
                              <span className="icon">
                                <span className="feather-icon">
                                  <i data-feather="more-vertical"></i>
                                </span>
                              </span>
                            </button>
                            <div
                              role="menu"
                              className="dropdown-menu dropdown-menu-end"
                            >
                              <a className="dropdown-item" href="/">
                                Action
                              </a>
                              <a className="dropdown-item" href="/">
                                Another action
                              </a>
                              <a className="dropdown-item" href="/">
                                Something else here
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/">
                                Separated link
                              </a>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostList;
