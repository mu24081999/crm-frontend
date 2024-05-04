import React from "react";
import moment from "moment";
import { deleteFileRec, getFileDetails } from "../../../redux/services/gallery";
import "react-photo-view/dist/react-photo-view.css";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { CiMenuKebab } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";

const Files = ({ filesData, token, dispatch, authUser }) => {
  const handleFileClick = (file_id) => {
    dispatch(getFileDetails(token, file_id));
  };
  const handleDeleteFile = (file_id) => {
    dispatch(deleteFileRec(token, file_id, authUser.name));
  };
  return (
    <div data-simplebar className="nicescroll-bar">
      <div className="collapse-simple">
        {Object.entries(filesData).map(([date, filesList]) => (
          <div className="card card-border" key={date}>
            <div className="card-header">
              <a
                role="button"
                data-bs-toggle="collapse"
                href="/gal_collapse_1"
                aria-expanded="true"
              >
                <h5 className="mb-0">
                  {" "}
                  {moment(Date.now()).format("YYYY-MM-DD") === date
                    ? "Recently Assigned"
                    : moment(date).format("MMM DD YYYY")}
                </h5>
              </a>
            </div>
            <div id="gal_collapse_1" className="collapse show">
              <div className="card-body">
                <div className="row  hk-gallery">
                  <PhotoProvider>
                    {filesList?.length > 0 &&
                      filesList?.map((file, index) => (
                        <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
                          <PhotoView key={index} src={file.url}>
                            <img
                              src={file.url}
                              width={250}
                              alt=""
                              className="card card-border gallery-img"
                            />
                          </PhotoView>
                          <div
                            class="dropdown position-absolute"
                            style={{ top: "60px" }}
                          >
                            <button
                              class="btn btn-icon btn-rounded btn-flush-light flush-soft-hover dropdown-toggle no-caret"
                              aria-expanded="false"
                              data-bs-toggle="dropdown"
                            >
                              <span class="icon">
                                <span class="feather-icon">
                                  {/* <i data-feather="more-vertical"></i> */}
                                  <CiMenuKebab />
                                </span>
                              </span>
                            </button>
                            <div
                              role="menu"
                              class="dropdown-menu dropdown-menu-end"
                            >
                              <button
                                class="dropdown-item "
                                onClick={() => handleDeleteFile(file.id)}
                              >
                                <span className="px-2">
                                  <FaTrash />
                                </span>
                                Delete File
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </PhotoProvider>
                  {/* <div className="col">
                    <a href="/">
                      <div
                        className="card card-border gallery-img"
                        data-sub-html="#caption"
                        data-src="dist/img/gallery/mock2.jpg"
                        style={{ backgroundImage: `url(${image})` }}
                      ></div>
                      <span className="gallery-star">
                        <span className="feather-icon">
                          <i data-feather="star"></i>
                        </span>
                      </span>
                    </a>
                  </div>
                  <div className="col">
                    <a href="/">
                      <div
                        className="card card-border gallery-img"
                        data-sub-html="#caption"
                        data-src="dist/img/gallery/mock3.jpg"
                        style={{ backgroundImage: `url(${image})` }}
                      ></div>
                      <span className="gallery-star">
                        <span className="feather-icon">
                          <i data-feather="star"></i>
                        </span>
                      </span>
                    </a>
                  </div>
                  <div className="col">
                    <a href="/">
                      <div
                        className="card card-border gallery-img"
                        data-sub-html="#caption"
                        data-src="dist/img/gallery/mock4.jpg"
                        style={{ backgroundImage: `url(${image})` }}
                      ></div>
                      <span className="gallery-star">
                        <span className="feather-icon">
                          <i data-feather="star"></i>
                        </span>
                      </span>
                    </a>
                  </div>
                  <div className="col">
                    <a href="/">
                      <div
                        className="card card-border gallery-img"
                        data-sub-html="#caption"
                        data-src="dist/img/gallery/mock5.jpg"
                        style={{ backgroundImage: `url(${image})` }}
                      ></div>
                      <span className="gallery-star marked">
                        <span className="feather-icon">
                          <i data-feather="star"></i>
                        </span>
                      </span>
                    </a>
                  </div>
                  <div className="col">
                    <a href="/">
                      <div
                        className="card card-border gallery-img gallery-video"
                        data-sub-html="#caption"
                        data-src="https://www.youtube.com/watch?v=BvXR97eR1QE"
                        data-poster="dist/img/gallery/mock6.jpg"
                        //   data-sub-html="#caption3"
                        style={{ backgroundImage: `url(${image})` }}
                      ></div>
                      <span className="gallery-star marked">
                        <span className="feather-icon">
                          <i data-feather="star"></i>
                        </span>
                      </span>
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <div id="caption" className="">
        <div className="gallery-info h-100">
          <div data-simplebar className="nicescroll-bar">
            <header className="gallery-header">
              <div>
                <div className="file-name">bruce-mars-flEG-pk6Z</div>
                <span className="fs-7">JPG File</span>
              </div>
              <div className="gallery-options-wrap">
                <a
                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                  href="/"
                >
                  <span className="icon">
                    <span className="feather-icon">
                      <i data-feather="link-2"></i>
                    </span>
                  </span>
                </a>
                <a
                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                  href="/"
                >
                  <span className="icon">
                    <span className="feather-icon">
                      <i data-feather="more-horizontal"></i>
                    </span>
                  </span>
                </a>
              </div>
            </header>
            <div className="gallery-detail-body">
              <div className="collapse-simple">
                <div className="card">
                  <div className="card-header">
                    <a
                      role="button"
                      data-bs-toggle="collapse"
                      href="/fl_info"
                      aria-expanded="true"
                    >
                      Specification
                    </a>
                  </div>
                  <div id="fl_info" className="collapse show">
                    <div className="card-body">
                      <ul className="file-info">
                        <li>
                          <span>Date Modified</span>
                          <span>20 Nov,2020</span>
                        </li>
                        <li>
                          <span>Size</span>
                          <span>15.2 GB</span>
                        </li>
                        <li>
                          <span>Created by</span>
                          <span>Morgan Freeman</span>
                        </li>
                        <li>
                          <span>Date Created</span>
                          <span>12 Nov,2020</span>
                        </li>
                        <li>
                          <span>Dimension</span>
                          <span>1920 x 1245</span>
                        </li>
                        <li>
                          <span className="text-danger">
                            Delete Permanently
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="separator separator-light mt-0"></div>
              <form>
                <div className="form-group">
                  <label className="form-label">Add Comment</label>
                  <textarea className="form-control" rows="5"></textarea>
                  <small className="form-text text-muted">
                    Basic HTML is allowed
                  </small>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <button className="btn btn-primary">Send</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="collapse-simple">
        <div className="card card-border">
          <div className="card-header">
            <a
              role="button"
              data-bs-toggle="collapse"
              href="/gal_collapse_2"
              aria-expanded="true"
            >
              <h5 className="mb-0">November 20</h5>
            </a>
          </div>
          <div id="gal_collapse_2" className="collapse show">
            <div className="card-body">
              <div className="row gx-3 row-cols-xxl-6 row-cols-xl-5 row-cols-lg-3 row-cols-md-2 row-cols-1 hk-gallery">
                <div className="col">
                  <a href="/">
                    <div
                      className="card card-border gallery-img"
                      data-sub-html="#caption"
                      data-src="dist/img/gallery/mock6.jpg"
                      style={{ backgroundImage: `url(${image})` }}
                    ></div>
                    <span className="gallery-star marked">
                      <span className="feather-icon">
                        <i data-feather="star"></i>
                      </span>
                    </span>
                  </a>
                </div>
                <div className="col">
                  <a href="/">
                    <div
                      className="card card-border gallery-img"
                      data-sub-html="#caption"
                      data-src="dist/img/gallery/mock7.jpg"
                      style={{ backgroundImage: `url(${image})` }}
                    ></div>
                  </a>
                </div>
                <div className="col">
                  <a href="/">
                    <div
                      className="card card-border gallery-img"
                      data-sub-html="#caption"
                      data-src="dist/img/gallery/mock8.jpg"
                      style={{ backgroundImage: `url(${image})` }}
                    ></div>
                  </a>
                </div>
                <div className="col">
                  <a href="/">
                    <div
                      className="card card-border gallery-img"
                      data-sub-html="#caption"
                      data-src="dist/img/gallery/mock9.jpg"
                      style={{ backgroundImage: `url(${image})` }}
                    ></div>
                  </a>
                </div>
                <div className="col">
                  <a href="/">
                    <div
                      className="card card-border gallery-img"
                      data-sub-html="#caption"
                      data-src="dist/img/gallery/mock10.jpg"
                      style={{ backgroundImage: `url(${image})` }}
                    ></div>
                    <span className="gallery-star marked">
                      <span className="feather-icon">
                        <i data-feather="star"></i>
                      </span>
                    </span>
                  </a>
                </div>
                <div className="col">
                  <a href="/">
                    <div
                      className="card card-border gallery-img gallery-video"
                      data-sub-html="#caption"
                      data-src="https://www.youtube.com/watch?v=BvXR97eR1QE"
                      data-poster="dist/img/gallery/mock2.jpg"
                      //   data-sub-html="#caption3"
                      style={{ backgroundImage: `url(${image})` }}
                    ></div>
                    <span className="gallery-star marked">
                      <span className="feather-icon">
                        <i data-feather="star"></i>
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="collapse-simple">
        <div className="card card-border">
          <div className="card-header">
            <a
              role="button"
              data-bs-toggle="collapse"
              href="/gal_collapse_3"
              aria-expanded="true"
            >
              <h5 className="mb-0">October 20</h5>
            </a>
          </div>
          <div id="gal_collapse_3" className="collapse show">
            <div className="card-body">
              <div className="row gx-3 row-cols-xxl-6 row-cols-xl-5 row-cols-lg-3 row-cols-md-2 row-cols-1 hk-gallery">
                <div className="col">
                  <a href="/">
                    <div
                      className="card card-border gallery-img"
                      data-sub-html="#caption"
                      data-src="dist/img/gallery/mock11.jpg"
                      style={{ backgroundImage: `url(${image})` }}
                    ></div>
                    <span className="gallery-star marked">
                      <span className="feather-icon">
                        <i data-feather="star"></i>
                      </span>
                    </span>
                  </a>
                </div>
                <div className="col">
                  <a href="/">
                    <div
                      className="card card-border gallery-img"
                      data-sub-html="#caption"
                      data-src="dist/img/gallery/mock12.jpg"
                      style={{ backgroundImage: `url(${image})` }}
                    ></div>
                  </a>
                </div>
                <div className="col">
                  <a href="/">
                    <div
                      className="card card-border gallery-img"
                      data-sub-html="#caption"
                      data-src="dist/img/gallery/mock13.jpg"
                      style={{ backgroundImage: `url(${image})` }}
                    ></div>
                  </a>
                </div>
                <div className="col">
                  <a href="/">
                    <div
                      className="card card-border gallery-img"
                      data-sub-html="#caption"
                      data-src="dist/img/gallery/mock14.jpg"
                      style={{ backgroundImage: `url(${image})` }}
                    ></div>
                  </a>
                </div>
                <div className="col">
                  <a href="/">
                    <div
                      className="card card-border gallery-img"
                      data-sub-html="#caption"
                      data-src="dist/img/gallery/mock15.jpg"
                      style={{ backgroundImage: `url(${image})` }}
                    ></div>
                    <span className="gallery-star marked">
                      <span className="feather-icon">
                        <i data-feather="star"></i>
                      </span>
                    </span>
                  </a>
                </div>
                <div className="col">
                  <a href="/">
                    <div
                      className="card card-border gallery-img gallery-video"
                      data-sub-html="#caption"
                      data-src="https://www.youtube.com/watch?v=BvXR97eR1QE"
                      data-poster="dist/img/gallery/mock12.jpg"
                      //   data-sub-html="#caption3"
                      style={{ backgroundImage: `url(${image})` }}
                    ></div>
                    <span className="gallery-star marked">
                      <span className="feather-icon">
                        <i data-feather="star"></i>
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Files;
