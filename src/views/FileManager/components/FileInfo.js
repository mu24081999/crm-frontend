import _ from "lodash";
import moment from "moment";
import React from "react";
import { FaWindowClose } from "react-icons/fa";
import {
  FaFileExcel,
  FaFilePdf,
  FaFileWord,
  FaImage,
  FaStar,
} from "react-icons/fa";
import { deleteFileRec } from "../../../redux/services/gallery";
const FileInfo = ({
  rightValue,
  onDataFromChild,
  fileDetails,
  authUser,
  dispatch,
  token,
}) => {
  function getFileType(url) {
    const parsedUrl = new URL(url);
    const pathname = parsedUrl.pathname;
    const lastSlashIndex = pathname.lastIndexOf("/");
    const filename = pathname.substring(lastSlashIndex + 1);
    const dotIndex = filename.lastIndexOf(".");
    if (dotIndex !== -1) {
      return filename.substring(dotIndex + 1);
    } else {
      return "";
    }
  }
  // Function to convert bytes to gigabytes (GB)
  function bytesToGigabytes(bytes) {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2);
  }

  // Function to convert bytes to megabytes (MB)
  function bytesToMegabytes(bytes) {
    return (bytes / (1024 * 1024)).toFixed(2);
  }
  const handleDeleteFile = (file_id) => {
    dispatch(deleteFileRec(token, file_id, authUser.name));
  };
  return (
    <div className="file-info" style={{ right: rightValue }}>
      <div data-simplebar className="nicescroll-bar">
        <FaWindowClose
          color="black"
          className="float-end"
          onClick={() => {
            onDataFromChild("-370px");
          }}
        />
        <div className="file-name">{fileDetails?.title}</div>
        <span>{_.upperCase(fileDetails?.type)}</span>
        {/* <img
          src={authUser.avatar}
          alt="user"
          className="d-block img-fluid my-4 w-250p"
        /> */}
        <div className="card-body fmapp-info-trigger d-flex justify-content-center">
          {/* <i className="ri-file-excel-2-fill text-blue"></i> */}
          {fileDetails?.url &&
            ((getFileType(fileDetails?.url) === "pdf" && (
              <FaFilePdf size={100} color="red" />
            )) ||
              (getFileType(fileDetails?.url) === "docx" && (
                <FaFileWord size={100} color="skyblue" />
              )) ||
              ((getFileType(fileDetails?.url) === "jpeg" ||
                getFileType(fileDetails?.url) === "png" ||
                getFileType(fileDetails?.url) === "jpg") && (
                <FaImage size={100} color="red" />
              )))}
          {/* <FaFileExcel size={"xl"} /> */}
        </div>

        <ul className="nav nav-justified nav-light nav-tabs nav-segmented-tabs active-theme mt-5">
          <li className="nav-item">
            <a
              className="nav-link active"
              data-bs-toggle="tab"
              href="/tab_info"
            >
              <span className="nav-link-text">Details</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-bs-toggle="tab" href="/tab_activity">
              <span className="nav-link-text">Activity</span>
            </a>
          </li>
        </ul>
        <div className="tab-content mt-5">
          <div className="tab-pane fade show active" id="tab_info">
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
                    <ul className="fm-info">
                      <li>
                        <span>Date Modified</span>
                        <span>
                          {moment(fileDetails?.updated_at).format(
                            "DD, MMM YYYY"
                          )}
                        </span>
                      </li>
                      <li>
                        <span>Size</span>
                        <span>{bytesToMegabytes(fileDetails?.size)} MB</span>
                      </li>
                      <li>
                        <span>Created by</span>
                        <span>{authUser?.name}</span>
                      </li>
                      <li>
                        <span>Date Created</span>
                        <span>
                          {" "}
                          {moment(fileDetails?.created_at).format(
                            "DD, MMM YYYY"
                          )}
                        </span>
                      </li>
                      {/* <li>
                        <span>Dimension</span>
                        <span>1950 x 1245</span>
                      </li> */}
                    </ul>
                  </div>
                </div>
              </div>
              {/* <div className="card">
                <div className="card-header">
                  <a
                    role="button"
                    data-bs-toggle="collapse"
                    href="/shared_with"
                    aria-expanded="true"
                  >
                    Shared with{" "}
                  </a>
                </div>
                <div id="shared_with" className="collapse show">
                  <div className="card-body">
                    <ul className="hk-list">
                      <li>
                        <div className="avatar avatar-sm avatar-primary position-relative avatar-rounded">
                          <img
                            src="dist/img/avatar9.jpg"
                            alt="user"
                            className="avatar-img"
                          />
                          <div className="badge-icon badge-circle text-blue badge-icon-xxs position-bottom-end-overflow-1">
                            <div className="badge-icon-wrap">
                              <i className="ri-upload-2-fill"></i>
                            </div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 127 127"
                            >
                              <g
                                data-name="Ellipse 302"
                                transform="translate(8 8)"
                                stroke-width="3"
                              >
                                <circle
                                  cx="55.5"
                                  cy="55.5"
                                  r="55.5"
                                  stroke="currentColor"
                                ></circle>
                                <circle
                                  cx="55.5"
                                  cy="55.5"
                                  r="59.5"
                                  fill="currentColor"
                                ></circle>
                              </g>
                            </svg>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="avatar avatar-sm  avatar-rounded">
                          <img
                            src="dist/img/avatar10.jpg"
                            alt="user"
                            className="avatar-img"
                          />
                        </div>
                      </li>
                      <li>
                        <div
                          className="avatar avatar-sm avatar-soft-danger avatar-rounded"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title=""
                          data-bs-original-title="Winston"
                        >
                          <span className="initial-wrap">W</span>
                        </div>
                      </li>
                      <li>
                        <a
                          href="/"
                          className="avatar avatar-sm avatar-icon avatar-soft-light avatar-rounded"
                          data-bs-toggle="modal"
                          data-bs-target="#invite_people"
                        >
                          <span
                            className="initial-wrap"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title=""
                            data-bs-original-title="Add New"
                          >
                            <span className="feather-icon">
                              <i data-feather="plus"></i>
                            </span>
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div> */}
              <div className="card">
                <div className="card-header">
                  <a
                    role="button"
                    data-bs-toggle="collapse"
                    href="/settings"
                    aria-expanded="true"
                  >
                    Settings{" "}
                  </a>
                </div>
                <div id="settings" className="collapse show">
                  <div className="card-body">
                    <ul className="fm-action">
                      <li>
                        <button
                          onClick={() => handleDeleteFile(fileDetails?.id)}
                          className="btn btn-danger"
                        >
                          <span className="">Delete File</span>
                        </button>
                      </li>
                      <li>
                        <a href="/">Somthing's Wrong</a>
                      </li>
                    </ul>
                    <a href="/" className="d-block text-dark fs-7 mb-2">
                      Give feedback and report conversation
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="tab_activity">
            <div className="collapse-simple">
              <div className="card">
                <div className="card-header">
                  <a
                    role="button"
                    data-bs-toggle="collapse"
                    href="/act_info1"
                    aria-expanded="true"
                  >
                    Yesterday
                  </a>
                </div>
                <div id="act_info1" className="collapse show">
                  <div className="card-body">
                    <ul className="activity-list list-group list-group-flush">
                      <li className="list-group-item">
                        <div className="media">
                          <div className="media-head">
                            <div className="avatar avatar-sm avatar-primary avatar-rounded">
                              <span className="initial-wrap">H</span>
                            </div>
                          </div>
                          <div className="media-body">
                            <p>
                              <span className="text-dark">Hencework</span> is
                              working on{" "}
                              <a href="/" className="link-url">
                                <u>
                                  https://assets.adobe.com/id/urn:aaid:sc:AP:5cebaf53-ca19-420a-aeeb-1517b04ab8c0?view=file
                                </u>
                              </a>
                            </p>
                            <div className="last-activity-time">3:15 PM</div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="media">
                          <div className="media-head">
                            <div className="avatar avatar-sm avatar-soft-danger avatar-rounded">
                              <span className="initial-wrap">W</span>
                            </div>
                          </div>
                          <div className="media-body">
                            <p>
                              <span className="text-dark">Morgan Fregman</span>{" "}
                              completed react conversion of{" "}
                              <a href="/" className="link-default">
                                <u>components</u>
                              </a>
                            </p>
                            <div className="last-activity-time">3:15 PM</div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  <a
                    role="button"
                    data-bs-toggle="collapse"
                    href="/act_info2"
                    aria-expanded="true"
                  >
                    23 April
                  </a>
                </div>
                <div id="act_info2" className="collapse show">
                  <div className="card-body">
                    <ul className="activity-list list-group list-group-flush">
                      <li className="list-group-item">
                        <div className="media">
                          <div className="media-head">
                            <div className="avatar avatar-sm avatar-rounded">
                              <img
                                src="dist/img/avatar15.jpg"
                                alt="user"
                                className="avatar-img"
                              />
                            </div>
                          </div>
                          <div className="media-body">
                            <p>
                              <span className="text-dark">Hencework</span> is
                              working on{" "}
                              <a href="/" className="link-url">
                                <u>
                                  https://assets.adobe.com/id/urn:aaid:sc:AP:5cebaf53-ca19-420a-aeeb-1517b04ab8c0?view=file
                                </u>
                              </a>
                            </p>
                            <div className="last-activity-time">3:15 PM</div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="media">
                          <div className="media-head">
                            <div className="avatar avatar-sm avatar-rounded">
                              <img
                                src="dist/img/avatar12.jpg"
                                alt="user"
                                className="avatar-img"
                              />
                            </div>
                          </div>
                          <div className="media-body">
                            <p>
                              <span className="text-dark">Morgan Fregman</span>{" "}
                              completed react conversion of{" "}
                              <a href="/" className="link-default">
                                <u>components</u>
                              </a>
                            </p>
                            <div className="last-activity-time">3:15 PM</div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileInfo;
