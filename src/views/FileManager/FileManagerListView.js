import moment from "moment";
import React from "react";
import { CiMenuBurger, CiMenuFries, CiMenuKebab } from "react-icons/ci";
import {
  FaCopy,
  FaDownload,
  FaEye,
  FaFilePdf,
  FaFileWord,
  FaForward,
  FaImage,
  FaInfo,
  FaRegStar,
  FaShare,
  FaTrash,
  FaUserPlus,
} from "react-icons/fa";
import { getFileDetails } from "../../redux/services/gallery";

const FileManagerListView = ({
  filesDataList,
  onDataFromChild,
  dispatch,
  token,
}) => {
  // Function to convert bytes to megabytes (MB)
  function bytesToMegabytes(bytes) {
    return (bytes / (1024 * 1024)).toFixed(2);
  }
  const handleFileClick = (file_id) => {
    onDataFromChild("0px");
    dispatch(getFileDetails(token, file_id));
  };
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
  const downloadFile = async (file_link, file_name) => {
    try {
      const link = document.createElement("a");
      link.href = file_link;
      link.setAttribute("download", file_name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  return (
    <div className="fm-body">
      <div data-simplebar className="nicescroll-bar">
        <div className="file-list-view">
          <ul className="nav nav-tabs nav-line nav-icon nav-light">
            <li className="nav-item">
              <a
                className="nav-link active"
                data-bs-toggle="tab"
                href="/cloud_doc"
              >
                <span className="nav-link-text">Cloud Documents</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-bs-toggle="tab" href="/cloud_doc">
                <span className="nav-link-text">Shared with me</span>
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div className="tab-pane fade show active" id="cloud_doc">
              <div className="table-responsive">
                <table id="datable_1" className="table nowrap w-100 mb-5">
                  <thead>
                    <tr>
                      <th className="w-30p">
                        <span className="form-check mb-0">
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
                      </th>
                      <th>Name</th>
                      {/* <th>Sharing</th> */}
                      <th>Modified</th>
                      <th>Size</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filesDataList?.length > 0 &&
                      filesDataList?.map((file, index) => (
                        <tr key={index}>
                          <td>
                            <div className="d-flex align-items-center">
                              <span className="file-star marked">
                                <span className="feather-icon">
                                  {/* <i data-feather="star"></i> */}
                                  <FaRegStar />
                                </span>
                              </span>
                            </div>
                          </td>
                          <td onClick={() => handleFileClick(file.id)}>
                            <div className="media fmapp-info-trigger">
                              <div className="media-head me-3">
                                <div className="avatar avatar-icon avatar-soft-blue avatar-sm">
                                  <span className="initial-wrap">
                                    {/* <i className="ri-file-excel-2-fill"></i> */}
                                    {(getFileType(file.url) === "pdf" && (
                                      <FaFilePdf size={100} color="red" />
                                    )) ||
                                      (getFileType(file.url) === "docx" && (
                                        <FaFileWord
                                          size={100}
                                          color="skyblue"
                                        />
                                      )) ||
                                      ((getFileType(file.url) === "jpeg" ||
                                        getFileType(file.url) === "png" ||
                                        getFileType(file.url) === "jpg") && (
                                        <FaImage size={100} color="red" />
                                      ))}
                                  </span>
                                </div>
                              </div>
                              <div className="media-body">
                                <div className="file-name">
                                  {/* Website_content.exl */}
                                  {file?.title}
                                </div>
                                <div>{file?.type?.slice(0, 20)}...</div>
                              </div>
                            </div>
                          </td>
                          {/* <td>
                            <div className="avatar-group avatar-group-overlapped">
                              <div
                                className="avatar avatar-rounded"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="Dean"
                              >
                                <img
                                  src="dist/img/avatar13.jpg"
                                  alt="user"
                                  className="avatar-img"
                                />
                              </div>
                              <div
                                className="avatar avatar-rounded"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="Danial"
                              >
                                <img
                                  src="dist/img/avatar14.jpg"
                                  alt="user"
                                  className="avatar-img"
                                />
                              </div>
                            </div>
                          </td> */}
                          <td>
                            {moment(file?.created_at).format("DD, MMM, YYYY")}
                          </td>
                          <td>{bytesToMegabytes(file?.size)} MB</td>
                          <td className="text-right">
                            <a
                              className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                              href="/"
                              data-bs-toggle="dropdown"
                              role="button"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <span className="icon">
                                <span className="feather-icon">
                                  {/* <i data-feather="more-horizontal"></i> */}
                                  <CiMenuKebab />
                                </span>
                              </span>
                            </a>
                            <div className="dropdown-menu">
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  {/* <i data-feather="eye"></i> */}
                                  <FaEye />
                                </span>
                                <span>Preview</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  {/* <i data-feather="copy"></i> */}
                                  <FaCopy />
                                </span>
                                <span>Duplicate</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  {/* <i data-feather="skip-forward"></i> */}
                                  <FaForward />
                                </span>
                                <span>Move</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  {/* <i data-feather="user-plus"></i> */}
                                  <FaUserPlus />
                                </span>
                                <span>Invite</span>
                              </a>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  {/* <i data-feather="link-2"></i> */}
                                  <FaShare />
                                </span>
                                <span>Share Link</span>
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  {/* <i data-feather="info"></i> */}
                                  <FaInfo />
                                </span>
                                <span>View Details</span>
                              </a>
                              <button
                                className="dropdown-item"
                                // onClick={() =>
                                //   downloadFile(file?.url, file?.title)
                                // }
                              >
                                <span className="feather-icon dropdown-icon">
                                  {/* <i data-feather="download"></i> */}
                                  <FaDownload />
                                </span>
                                <span>Download</span>
                              </button>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  {/* <i data-feather="trash-2"></i> */}
                                  <FaTrash />
                                </span>
                                <span>Delete</span>
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    {/* <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="file-star">
                            <span className="feather-icon">
                              <i data-feather="star"></i>
                            </span>
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="media fmapp-info-trigger">
                          <div className="media-head me-3">
                            <div className="avatar avatar-icon avatar-soft-danger avatar-sm">
                              <span className="initial-wrap">
                                <i className="ri-file-pdf-fill"></i>
                              </span>
                            </div>
                          </div>
                          <div className="media-body">
                            <div className="file-name">jampack.pdf</div>
                            <div>pdf</div>
                          </div>
                        </div>
                      </td>
                      <td>-</td>
                      <td>Today, 4:30 PM</td>
                      <td>21.73 MB</td>
                      <td className="text-right">
                        <a
                          className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                          href="/"
                          data-bs-toggle="dropdown"
                          role="button"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <span className="icon">
                            <span className="feather-icon">
                              <i data-feather="more-horizontal"></i>
                            </span>
                          </span>
                        </a>
                        <div className="dropdown-menu">
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="eye"></i>
                            </span>
                            <span>Preview</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="copy"></i>
                            </span>
                            <span>Duplicate</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="skip-forward"></i>
                            </span>
                            <span>Move</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="user-plus"></i>
                            </span>
                            <span>Invite</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="link-2"></i>
                            </span>
                            <span>Share Link</span>
                          </a>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="info"></i>
                            </span>
                            <span>View Details</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="download"></i>
                            </span>
                            <span>Download</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="trash-2"></i>
                            </span>
                            <span>Delete</span>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="file-star">
                            <span className="feather-icon">
                              <i data-feather="star"></i>
                            </span>
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="media fmapp-info-trigger">
                          <div className="media-head me-3">
                            <img
                              src="dist/img/gallery/mock7.jpg"
                              alt="user"
                              className="d-block img-fluid w-50p"
                            />
                          </div>
                          <div className="media-body">
                            <div className="file-name">
                              bruce-mars-fiEG-Pk6ZEZLA
                            </div>
                            <div>png</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="avatar-group avatar-group-overlapped">
                          <div
                            className="avatar avatar-soft-success avatar-rounded"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title=""
                            data-bs-original-title="Tom"
                          >
                            <span className="initial-wrap">B</span>
                          </div>
                        </div>
                      </td>
                      <td>Yesterday, 2:40 PM</td>
                      <td>4,178 KB</td>
                      <td className="text-right">
                        <a
                          className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                          href="/"
                          data-bs-toggle="dropdown"
                          role="button"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <span className="icon">
                            <span className="feather-icon">
                              <i data-feather="more-horizontal"></i>
                            </span>
                          </span>
                        </a>
                        <div className="dropdown-menu">
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="eye"></i>
                            </span>
                            <span>Preview</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="copy"></i>
                            </span>
                            <span>Duplicate</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="skip-forward"></i>
                            </span>
                            <span>Move</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="user-plus"></i>
                            </span>
                            <span>Invite</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="link-2"></i>
                            </span>
                            <span>Share Link</span>
                          </a>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="info"></i>
                            </span>
                            <span>View Details</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="download"></i>
                            </span>
                            <span>Download</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="trash-2"></i>
                            </span>
                            <span>Delete</span>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="file-star">
                            <span className="feather-icon">
                              <i data-feather="star"></i>
                            </span>
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="media fmapp-info-trigger">
                          <div className="media-head me-3">
                            <div className="avatar avatar-icon avatar-soft-warning avatar-sm">
                              <span className="initial-wrap">
                                <i className="ri-folder-2-fill"></i>
                              </span>
                            </div>
                          </div>
                          <div className="media-body">
                            <div className="file-name">
                              Jampack - HTML - v1.0
                            </div>
                            <div>folder</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="avatar-group avatar-group-overlapped">
                          <div
                            className="avatar avatar-rounded"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title=""
                            data-bs-original-title="Danial"
                          >
                            <img
                              src="dist/img/avatar2.jpg"
                              alt="user"
                              className="avatar-img"
                            />
                          </div>
                        </div>
                      </td>
                      <td>13 Jul, 1:46 PM</td>
                      <td>501 KB</td>
                      <td className="text-right">
                        <a
                          className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                          href="/"
                          data-bs-toggle="dropdown"
                          role="button"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <span className="icon">
                            <span className="feather-icon">
                              <i data-feather="more-horizontal"></i>
                            </span>
                          </span>
                        </a>
                        <div className="dropdown-menu">
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="eye"></i>
                            </span>
                            <span>Preview</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="copy"></i>
                            </span>
                            <span>Duplicate</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="skip-forward"></i>
                            </span>
                            <span>Move</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="user-plus"></i>
                            </span>
                            <span>Invite</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="link-2"></i>
                            </span>
                            <span>Share Link</span>
                          </a>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="info"></i>
                            </span>
                            <span>View Details</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="download"></i>
                            </span>
                            <span>Download</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="trash-2"></i>
                            </span>
                            <span>Delete</span>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="file-star">
                            <span className="feather-icon">
                              <i data-feather="star"></i>
                            </span>
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="media fmapp-info-trigger">
                          <div className="media-head me-3">
                            <div className="avatar avatar-icon avatar-soft-blue avatar-sm">
                              <span className="initial-wrap">
                                <i className="ri-folder-zip-fill"></i>
                              </span>
                            </div>
                          </div>
                          <div className="media-body">
                            <div className="file-name">
                              themeforest-pack.zip
                            </div>
                            <div>zip</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="avatar-group avatar-group-overlapped">
                          <div
                            className="avatar avatar-rounded"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title=""
                            data-bs-original-title="Danial"
                          >
                            <img
                              src="dist/img/avatar12.jpg"
                              alt="user"
                              className="avatar-img"
                            />
                          </div>
                        </div>
                      </td>
                      <td>10 Jun, 8:00 AM</td>
                      <td>2.45 GB</td>
                      <td className="text-right">
                        <a
                          className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                          href="/"
                          data-bs-toggle="dropdown"
                          role="button"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <span className="icon">
                            <span className="feather-icon">
                              <i data-feather="more-horizontal"></i>
                            </span>
                          </span>
                        </a>
                        <div className="dropdown-menu">
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="eye"></i>
                            </span>
                            <span>Preview</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="copy"></i>
                            </span>
                            <span>Duplicate</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="skip-forward"></i>
                            </span>
                            <span>Move</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="user-plus"></i>
                            </span>
                            <span>Invite</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="link-2"></i>
                            </span>
                            <span>Share Link</span>
                          </a>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="info"></i>
                            </span>
                            <span>View Details</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="download"></i>
                            </span>
                            <span>Download</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="trash-2"></i>
                            </span>
                            <span>Delete</span>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="file-star marked">
                            <span className="feather-icon">
                              <i data-feather="star"></i>
                            </span>
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="media fmapp-info-trigger">
                          <div className="media-head me-3">
                            <div className="avatar avatar-icon avatar-soft-warning avatar-sm">
                              <span className="initial-wrap">
                                <i className="ri-folder-5-fill"></i>
                              </span>
                            </div>
                          </div>
                          <div className="media-body">
                            <div className="file-name">Jampack</div>
                            <div>folder</div>
                          </div>
                        </div>
                      </td>
                      <td>-</td>
                      <td>24 Jun, 6:55 PM</td>
                      <td>1.6 GB</td>
                      <td className="text-right">
                        <a
                          className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                          href="/"
                          data-bs-toggle="dropdown"
                          role="button"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <span className="icon">
                            <span className="feather-icon">
                              <i data-feather="more-horizontal"></i>
                            </span>
                          </span>
                        </a>
                        <div className="dropdown-menu">
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="eye"></i>
                            </span>
                            <span>Preview</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="copy"></i>
                            </span>
                            <span>Duplicate</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="skip-forward"></i>
                            </span>
                            <span>Move</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="user-plus"></i>
                            </span>
                            <span>Invite</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="link-2"></i>
                            </span>
                            <span>Share Link</span>
                          </a>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="info"></i>
                            </span>
                            <span>View Details</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="download"></i>
                            </span>
                            <span>Download</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="trash-2"></i>
                            </span>
                            <span>Delete</span>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="file-star">
                            <span className="feather-icon">
                              <i data-feather="star"></i>
                            </span>
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="media fmapp-info-trigger">
                          <div className="media-head me-3">
                            <div className="avatar avatar-icon avatar-soft-blue avatar-sm">
                              <span className="initial-wrap">
                                <i className="ri-file-text-fill"></i>
                              </span>
                            </div>
                          </div>
                          <div className="media-body">
                            <div className="file-name">minutes_meeting.doc</div>
                            <div>document</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="avatar-group avatar-group-overlapped">
                          <div
                            className="avatar avatar-rounded"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title=""
                            data-bs-original-title="Dean"
                          >
                            <img
                              src="dist/img/avatar12.jpg"
                              alt="user"
                              className="avatar-img"
                            />
                          </div>
                          <div
                            className="avatar avatar-rounded"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title=""
                            data-bs-original-title="Danial"
                          >
                            <img
                              src="dist/img/avatar13.jpg"
                              alt="user"
                              className="avatar-img"
                            />
                          </div>
                        </div>
                      </td>
                      <td>18 Feb, 12:25 PM</td>
                      <td>20 KB</td>
                      <td className="text-right">
                        <a
                          className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                          href="/"
                          data-bs-toggle="dropdown"
                          role="button"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <span className="icon">
                            <span className="feather-icon">
                              <i data-feather="more-horizontal"></i>
                            </span>
                          </span>
                        </a>
                        <div className="dropdown-menu">
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="eye"></i>
                            </span>
                            <span>Preview</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="copy"></i>
                            </span>
                            <span>Duplicate</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="skip-forward"></i>
                            </span>
                            <span>Move</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="user-plus"></i>
                            </span>
                            <span>Invite</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="link-2"></i>
                            </span>
                            <span>Share Link</span>
                          </a>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="info"></i>
                            </span>
                            <span>View Details</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="download"></i>
                            </span>
                            <span>Download</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="trash-2"></i>
                            </span>
                            <span>Delete</span>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="file-star">
                            <span className="feather-icon">
                              <i data-feather="star"></i>
                            </span>
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="media fmapp-info-trigger">
                          <div className="media-head me-3">
                            <div className="avatar avatar-icon avatar-soft-blue avatar-sm">
                              <span className="initial-wrap">
                                <i className="ri-file-text-fill"></i>
                              </span>
                            </div>
                          </div>
                          <div className="media-body">
                            <div className="file-name">expenses.doc</div>
                            <div>document</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="avatar-group avatar-group-overlapped">
                          <div
                            className="avatar avatar-rounded"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title=""
                            data-bs-original-title="Dean"
                          >
                            <img
                              src="dist/img/avatar12.jpg"
                              alt="user"
                              className="avatar-img"
                            />
                          </div>
                        </div>
                      </td>
                      <td>12 Feb, 12:30 PM</td>
                      <td>76.3 KB</td>
                      <td className="text-right">
                        <a
                          className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                          href="/"
                          data-bs-toggle="dropdown"
                          role="button"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <span className="icon">
                            <span className="feather-icon">
                              <i data-feather="more-horizontal"></i>
                            </span>
                          </span>
                        </a>
                        <div className="dropdown-menu">
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="eye"></i>
                            </span>
                            <span>Preview</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="copy"></i>
                            </span>
                            <span>Duplicate</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="skip-forward"></i>
                            </span>
                            <span>Move</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="user-plus"></i>
                            </span>
                            <span>Invite</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="link-2"></i>
                            </span>
                            <span>Share Link</span>
                          </a>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="info"></i>
                            </span>
                            <span>View Details</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="download"></i>
                            </span>
                            <span>Download</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="trash-2"></i>
                            </span>
                            <span>Delete</span>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="file-star">
                            <span className="feather-icon">
                              <i data-feather="star"></i>
                            </span>
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="media fmapp-info-trigger">
                          <div className="media-head me-3">
                            <img
                              src="dist/img/gallery/mock8.jpg"
                              alt="user"
                              className="d-block img-fluid w-50p"
                            />
                          </div>
                          <div className="media-body">
                            <div className="file-name">
                              joel-mott-LaK153ghdigdss
                            </div>
                            <div>jpeg</div>
                          </div>
                        </div>
                      </td>
                      <td>-</td>
                      <td>02 Jan, 4:32 PM</td>
                      <td>3,028 KB</td>
                      <td className="text-right">
                        <a
                          className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                          href="/"
                          data-bs-toggle="dropdown"
                          role="button"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <span className="icon">
                            <span className="feather-icon">
                              <i data-feather="more-horizontal"></i>
                            </span>
                          </span>
                        </a>
                        <div className="dropdown-menu">
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="eye"></i>
                            </span>
                            <span>Preview</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="copy"></i>
                            </span>
                            <span>Duplicate</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="skip-forward"></i>
                            </span>
                            <span>Move</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="user-plus"></i>
                            </span>
                            <span>Invite</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="link-2"></i>
                            </span>
                            <span>Share Link</span>
                          </a>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="info"></i>
                            </span>
                            <span>View Details</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="download"></i>
                            </span>
                            <span>Download</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="trash-2"></i>
                            </span>
                            <span>Delete</span>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="file-star">
                            <span className="feather-icon">
                              <i data-feather="star"></i>
                            </span>
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="media fmapp-info-trigger">
                          <div className="media-head me-3">
                            <div className="avatar avatar-icon avatar-soft-blue avatar-sm">
                              <span className="initial-wrap">
                                <i className="ri-file-word-fill"></i>
                              </span>
                            </div>
                          </div>
                          <div className="media-body">
                            <div className="file-name">proposal.doc</div>
                            <div>word document</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="avatar-group avatar-group-overlapped">
                          <div
                            className="avatar avatar-rounded"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title=""
                            data-bs-original-title="Dean"
                          >
                            <img
                              src="dist/img/avatar12.jpg"
                              alt="user"
                              className="avatar-img"
                            />
                          </div>
                          <div
                            className="avatar avatar-rounded"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title=""
                            data-bs-original-title="Dean"
                          >
                            <img
                              src="dist/img/avatar13.jpg"
                              alt="user"
                              className="avatar-img"
                            />
                          </div>
                          <div
                            className="avatar avatar-rounded"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title=""
                            data-bs-original-title="Danial"
                          >
                            <img
                              src="dist/img/avatar14.jpg"
                              alt="user"
                              className="avatar-img"
                            />
                          </div>
                          <div
                            className="avatar avatar-soft-success avatar-rounded"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title=""
                            data-bs-original-title="Tom"
                          >
                            <span className="initial-wrap">B</span>
                          </div>
                        </div>
                      </td>
                      <td>02 Jan, 9:45 AM</td>
                      <td>951 KB</td>
                      <td className="text-right">
                        <a
                          className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                          href="/"
                          data-bs-toggle="dropdown"
                          role="button"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <span className="icon">
                            <span className="feather-icon">
                              <i data-feather="more-horizontal"></i>
                            </span>
                          </span>
                        </a>
                        <div className="dropdown-menu">
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="eye"></i>
                            </span>
                            <span>Preview</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="copy"></i>
                            </span>
                            <span>Duplicate</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="skip-forward"></i>
                            </span>
                            <span>Move</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="user-plus"></i>
                            </span>
                            <span>Invite</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="link-2"></i>
                            </span>
                            <span>Share Link</span>
                          </a>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="info"></i>
                            </span>
                            <span>View Details</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="download"></i>
                            </span>
                            <span>Download</span>
                          </a>
                          <a className="dropdown-item" href="/">
                            <span className="feather-icon dropdown-icon">
                              <i data-feather="trash-2"></i>
                            </span>
                            <span>Delete</span>
                          </a>
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

export default FileManagerListView;
