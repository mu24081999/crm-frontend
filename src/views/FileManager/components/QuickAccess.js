import moment from "moment";
import React from "react";
import {
  FaCopy,
  FaDownload,
  FaEye,
  FaFileExcel,
  FaFilePdf,
  FaFileWord,
  FaForward,
  FaImage,
  FaInfo,
  FaLink,
  FaStar,
  FaTrash,
  FaUserPlus,
} from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { deleteFileRec, getFileDetails } from "../../../redux/services/gallery";

const QuickAccess = ({
  filesData,
  token,
  dispatch,
  authUser,
  onDataFromChild,
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
  const handleFileClick = (file_id) => {
    onDataFromChild("0px");
    dispatch(getFileDetails(token, file_id));
  };
  const handleDeleteFile = (file_id) => {
    dispatch(deleteFileRec(token, file_id, authUser.name));
  };
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
    <div className="collapse-simple mt-4">
      {Object.entries(filesData).map(([date, filesList]) => (
        <div className="card" key={date}>
          <div className="card-header">
            <a
              role="button"
              data-bs-toggle="collapse"
              href="/fm_collapse_1"
              aria-expanded="true"
            >
              <h5 className="mb-0">
                {moment(Date.now()).format("YYYY-MM-DD") === date
                  ? "Recently Assigned"
                  : moment(date).format("MMM DD YYYY")}
              </h5>
            </a>
          </div>
          <div id="fm_collapse_1" className="collapse show">
            <div className="row gx-3 row-cols-xxl-6 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 mt-3">
              {filesList?.length > 0 &&
                filesList?.map((file, index) => (
                  <div className="col" onClick={() => handleFileClick(file.id)}>
                    <div className="card file-card card-border">
                      <div className="card-body fmapp-info-trigger">
                        {/* <i className="ri-file-excel-2-fill text-blue"></i> */}
                        {(getFileType(file?.url) === "pdf" && (
                          <FaFilePdf size={100} color="red" />
                        )) ||
                          (getFileType(file?.url) === "docx" && (
                            <FaFileWord size={100} color="skyblue" />
                          )) ||
                          ((getFileType(file?.url) === "jpeg" ||
                            getFileType(file?.url) === "png" ||
                            getFileType(file?.url) === "jpg") && (
                            <FaImage size={100} color="red" />
                          ))}
                        {/* <FaFileExcel size={"xl"} /> */}
                      </div>
                      <div className="card-footer">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            {/* <div className="file-name">Website_content.exl</div> */}
                            <div className="file-name">{file.name}</div>
                            <div className="text-truncate fs-8 mb-2">
                              {/* 2,637 KB */}
                              {file.size}
                            </div>
                          </div>
                          <div className="d-flex">
                            <span className="file-star marked">
                              <span className="feather-icon">
                                {/* <i data-feather="star"></i> */}
                                <FaStar />
                              </span>
                            </span>
                            <a
                              className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover flex-shrink-0"
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
                                  <FaForward />
                                  {/* <i data-feather="skip-forward"></i> */}
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
                                  <FaLink />
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
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  {/* <i data-feather="download"></i> */}
                                  <FaDownload />
                                </span>
                                <span>Download</span>
                              </a>
                              <button
                                className="dropdown-item"
                                onClick={() => handleDeleteFile(file?.id)}
                              >
                                <span className="feather-icon dropdown-icon">
                                  {/* <i data-feather="trash-2"></i> */}
                                  <FaTrash />
                                </span>
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>
                        </div>
                        <p className="text-truncate p-xs">
                          Last Access: 2 hours ago
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              {/* <div className="col">
              <div className="card file-card card-border">
                <div className="card-body fmapp-info-trigger">
                  <i className="ri-file-pdf-fill text-danger"></i>
                </div>
                <div className="card-footer">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <div className="file-name">Website_content.exl</div>
                      <div className="text-truncate fs-8 mb-2">21.73 MB</div>
                    </div>
                    <div className="d-flex">
                      <span className="file-star">
                        <span className="feather-icon">
                          <i data-feather="star"></i>
                        </span>
                      </span>
                      <a
                        className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover flex-shrink-0"
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
                    </div>
                  </div>
                  <p className="text-truncate p-xs">
                    Last Access: 2 hours ago{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card file-card card-border">
                <div className="card-body fmapp-info-trigger">
                  <i className="ri-file-word-2-fill text-blue"></i>
                </div>
                <div className="card-footer">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <div className="file-name">jampack.doc</div>
                      <div className="text-truncate fs-8 mb-2">951 KB</div>
                    </div>
                    <div className="d-flex">
                      <span className="file-star">
                        <span className="feather-icon">
                          <i data-feather="star"></i>
                        </span>
                      </span>
                      <a
                        className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover flex-shrink-0"
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
                    </div>
                  </div>
                  <p className="text-truncate p-xs">Last Access: 2 hours ago</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card file-card card-border">
                <div className="card-body fmapp-info-trigger">
                  <i className="ri-folder-2-fill text-warning"></i>
                </div>
                <div className="card-footer">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <div className="file-name">Jampack - html - v1.0</div>
                      <div className="text-truncate fs-8 mb-2">1.6 GB</div>
                    </div>
                    <div className="d-flex">
                      <span className="file-star">
                        <span className="feather-icon">
                          <i data-feather="star"></i>
                        </span>
                      </span>
                      <a
                        className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover flex-shrink-0"
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
                    </div>
                  </div>
                  <p className="text-truncate p-xs">Last Access: 2 hours ago</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card file-card card-border">
                <div className="card-body fmapp-info-trigger">
                  <i className="ri-folder-2-fill text-warning"></i>
                </div>
                <div className="card-footer">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <div className="file-name">Jampack - Angular</div>
                      <div className="text-truncate fs-8 mb-2">2,637 KB</div>
                    </div>
                    <div className="d-flex">
                      <span className="file-star">
                        <span className="feather-icon">
                          <i data-feather="star"></i>
                        </span>
                      </span>
                      <a
                        className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover flex-shrink-0"
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
                    </div>
                  </div>
                  <p className="text-truncate p-xs">Last Access: 2 hours ago</p>
                </div>
              </div>
            </div> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickAccess;
