import React from "react";

const Files = ({ filesData, token, dispatch, authUser }) => {
  return (
    <div className="collapse-simple mt-4">
      <div className="card">
        <div className="card-header">
          <a
            role="button"
            data-bs-toggle="collapse"
            href="/fm_collapse_3"
            aria-expanded="true"
          >
            <h5 className="mb-0">Files</h5>
          </a>
        </div>
        <div id="fm_collapse_3" className="collapse show">
          <div className="row gx-3 row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 mt-4">
            <div className="col">
              <div className="card file-compact-card card-border">
                <div className="card-body d-flex justify-content-between">
                  <div className="media fmapp-info-trigger">
                    <div className="media-head me-3">
                      <div className="avatar avatar-icon avatar-soft-blue avatar-sm">
                        <span className="initial-wrap">
                          <i className="ri-file-excel-2-fill"></i>
                        </span>
                      </div>
                    </div>
                    <div className="media-body">
                      <div className="file-name">Website_content.exl</div>
                      <div className="text-truncate fs-8 mb-2">2,635 KB</div>
                    </div>
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
              </div>
            </div>
            {/* <div className="col">
              <div className="card file-compact-card card-border">
                <div className="card-body d-flex justify-content-between">
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
                      <div className="text-truncate fs-8 mb-2">21.73 MB</div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <span className="file-star marked">
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
              </div>
            </div>
            <div className="col">
              <div className="card file-compact-card card-border">
                <div className="card-body d-flex justify-content-between">
                  <div className="media fmapp-info-trigger">
                    <div className="media-head me-3">
                      <img
                        src="dist/img/gallery/mock7.jpg"
                        alt="user"
                        className="d-block img-fluid h-50p"
                      />
                    </div>
                    <div className="media-body">
                      <div className="file-name">jonas-kakaroto-KIPqvvTxl</div>
                      <div className="text-truncate fs-8 mb-2">4,178 KB</div>
                    </div>
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
              </div>
            </div>
            <div className="col">
              <div className="card file-compact-card card-border">
                <div className="card-body d-flex justify-content-between">
                  <div className="media fmapp-info-trigger">
                    <div className="media-head me-3">
                      <div className="avatar avatar-icon avatar-soft-blue avatar-sm">
                        <span className="initial-wrap">
                          <i className="ri-folder-zip-fill"></i>
                        </span>
                      </div>
                    </div>
                    <div className="media-body">
                      <div className="file-name">themeforest-pack.zip</div>
                      <div className="text-truncate fs-8 mb-2">2.45 GB</div>
                    </div>
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
              </div>
            </div>
            <div className="col">
              <div className="card file-compact-card card-border">
                <div className="card-body d-flex justify-content-between">
                  <div className="media fmapp-info-trigger">
                    <div className="media-head me-3">
                      <div className="avatar avatar-icon avatar-soft-light avatar-sm">
                        <span className="initial-wrap">
                          <i className="ri-keynote-fill"></i>
                        </span>
                      </div>
                    </div>
                    <div className="media-body">
                      <div className="file-name">presentation.keynote</div>
                      <div className="text-truncate fs-8 mb-2">20 KB</div>
                    </div>
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
              </div>
            </div>
            <div className="col">
              <div className="card file-compact-card card-border">
                <div className="card-body d-flex justify-content-between">
                  <div className="media fmapp-info-trigger">
                    <div className="media-head me-3">
                      <img
                        src="dist/img/gallery/mock5.jpg"
                        alt="user"
                        className="d-block img-fluid h-50p"
                      />
                    </div>
                    <div className="media-body">
                      <div className="file-name">joel-mott-LaK153ghdig</div>
                      <div className="text-truncate fs-8 mb-2">2,635 KB</div>
                    </div>
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
              </div>
            </div>
            <div className="col">
              <div className="card file-compact-card card-border">
                <div className="card-body d-flex justify-content-between">
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
                      <div className="text-truncate fs-8 mb-2">2,635 KB</div>
                    </div>
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
              </div>
            </div>
            <div className="col">
              <div className="card file-compact-card card-border">
                <div className="card-body d-flex justify-content-between">
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
                      <div className="text-truncate fs-8 mb-2">2,635 KB</div>
                    </div>
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
              </div>
            </div>
            <div className="col">
              <div className="card file-compact-card card-border">
                <div className="card-body d-flex justify-content-between">
                  <div className="media fmapp-info-trigger">
                    <div className="media-head me-3">
                      <div className="avatar avatar-icon avatar-sm avatar-soft-blue">
                        <span className="initial-wrap">
                          <i className="ri-file-word-2-fill"></i>
                        </span>
                      </div>
                    </div>
                    <div className="media-body">
                      <div className="file-name">proposal.doc</div>
                      <div className="text-truncate fs-8 mb-2">951 KB</div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <span className="file-star marked">
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
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Files;
