import React from "react";

const AccountContent = () => {
  return (
    <div>
      <div className="hk-pg-wrapper">
        <div className="container-xxl">
          {/* <!-- Page Header --> */}
          <div className="hk-pg-header pg-header-wth-tab pt-7">
            <div className="d-flex">
              <div className="flex-1">
                <h1 className="pg-title">Account Settings</h1>
                <p className="p-lg col-lg-8">
                  Manage your account settings and options. You can customize
                  interests, add social media links, edit integrations for beter
                  inapp experience.
                </p>
              </div>
            </div>
            <ul className="nav nav-line nav-light nav-tabs">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-bs-toggle="tab"
                  href="#tab_block_1"
                >
                  <span className="nav-link-text">Customize Interests</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  href="#tab_block_2"
                >
                  <span className="nav-link-text">Social Profiles</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  href="#tab_block_3"
                >
                  <span className="nav-link-text">Integrations</span>
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Billing Info
                </a>
                <div className="dropdown-menu">
                  <a
                    className="dropdown-item"
                    href="#tab_block_4"
                    data-bs-toggle="tab"
                  >
                    Saved Cards
                  </a>
                  <a
                    className="dropdown-item"
                    href="#tab_block_5"
                    data-bs-toggle="tab"
                  >
                    My Addresses
                  </a>
                </div>
              </li>
            </ul>
          </div>
          {/* <!-- /Page Header --> */}

          {/* <!-- Page Body --> */}
          <div className="hk-pg-body">
            <div className="tab-content">
              <div className="tab-pane fade show active" id="tab_block_1">
                <div className="row">
                  <div className="col-xl-8">
                    <div className="title-lg fs-5">
                      <span>Customize Interests</span>
                    </div>
                    <p className="mb-4">
                      Customizing interests will help you get the personalised
                      experience.
                    </p>
                    <div className="row gx-2 filter-block-wrap mt-5">
                      <div className="col-sm-3 col-6">
                        <div className="card text-white filter-block h-120p mb-2">
                          <input className="form-check-input" type="checkbox" />
                          <img
                            src="dist/img/interests/interest-1.png"
                            className="card-img h-100 img-fluid"
                            alt="img-desc"
                          />
                          <div className="card-img-overlay bg-opacity-75 d-flex align-items-center justify-content-center">
                            <h5 className="card-title text-white">
                              Infrastructure
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-3 col-6">
                        <div className="card text-white filter-block h-120p mb-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked
                          />
                          <img
                            src="dist/img/interests/interest-2.png"
                            className="card-img h-100 img-fluid"
                            alt="img-desc"
                          />
                          <div className="card-img-overlay bg-opacity-75 d-flex align-items-center justify-content-center">
                            <h5 className="card-title text-white">Science</h5>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-3 col-6">
                        <div className="card text-white filter-block h-120p mb-2">
                          <input className="form-check-input" type="checkbox" />
                          <img
                            src="dist/img/interests/interest-3.png"
                            className="card-img h-100 img-fluid"
                            alt="img-desc"
                          />
                          <div className="card-img-overlay bg-opacity-75 d-flex align-items-center justify-content-center">
                            <h5 className="card-title text-white">
                              World Politics
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-3 col-6">
                        <div className="card text-white filter-block h-120p mb-2">
                          <input className="form-check-input" type="checkbox" />
                          <img
                            src="dist/img/interests/interest-4.png"
                            className="card-img h-100 img-fluid"
                            alt="img-desc"
                          />
                          <div className="card-img-overlay bg-opacity-75 d-flex align-items-center justify-content-center">
                            <h5 className="card-title text-white">
                              Technology
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-3 col-6">
                        <div className="card text-white filter-block h-120p mb-2">
                          <input className="form-check-input" type="checkbox" />
                          <img
                            src="dist/img/interests/interest-5.png"
                            className="card-img h-100 img-fluid"
                            alt="img-desc"
                          />
                          <div className="card-img-overlay bg-opacity-75 d-flex align-items-center justify-content-center">
                            <h5 className="card-title text-white">Travel</h5>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-3 col-6">
                        <div className="card text-white filter-block h-120p mb-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked
                          />
                          <img
                            src="dist/img/interests/interest-6.png"
                            className="card-img h-100 img-fluid"
                            alt="img-desc"
                          />
                          <div className="card-img-overlay bg-opacity-75 d-flex align-items-center justify-content-center">
                            <h5 className="card-title text-white">
                              Literature
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-3 col-6">
                        <div className="card text-white filter-block h-120p mb-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked
                          />
                          <img
                            src="dist/img/interests/interest-7.png"
                            className="card-img h-100 img-fluid"
                            alt="img-desc"
                          />
                          <div className="card-img-overlay bg-opacity-75 d-flex align-items-center justify-content-center">
                            <h5 className="card-title text-white">
                              Healthcare
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-3 col-6">
                        <div className="card text-white filter-block h-120p mb-2">
                          <input className="form-check-input" type="checkbox" />
                          <img
                            src="dist/img/interests/interest-8.png"
                            className="card-img h-100 img-fluid"
                            alt="img-desc"
                          />
                          <div className="card-img-overlay bg-opacity-75 d-flex align-items-center justify-content-center">
                            <h5 className="card-title text-white">Marketing</h5>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-3 col-6">
                        <div className="card text-white filter-block h-120p mb-2">
                          <input className="form-check-input" type="checkbox" />
                          <img
                            src="dist/img/interests/interest-9.png"
                            className="card-img h-100 img-fluid"
                            alt="img-desc"
                          />
                          <div className="card-img-overlay bg-opacity-75 d-flex align-items-center justify-content-center">
                            <h5 className="card-title text-white">Music</h5>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-3 col-6">
                        <div className="card text-white filter-block h-120p mb-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked
                          />
                          <img
                            src="dist/img/interests/interest-10.png"
                            className="card-img h-100 img-fluid"
                            alt="img-desc"
                          />
                          <div className="card-img-overlay bg-opacity-75 d-flex align-items-center justify-content-center">
                            <h5 className="card-title text-white">
                              Spirituality
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-3 col-6">
                        <div className="card text-white filter-block h-120p mb-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked
                          />
                          <img
                            src="dist/img/interests/interest-11.png"
                            className="card-img h-100 img-fluid"
                            alt="img-desc"
                          />
                          <div className="card-img-overlay bg-opacity-75 d-flex align-items-center justify-content-center">
                            <h5 className="card-title text-white">Lifestyle</h5>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-3 col-6">
                        <div className="card text-white filter-block h-120p mb-2">
                          <input className="form-check-input" type="checkbox" />
                          <img
                            src="dist/img/interests/interest-12.png"
                            className="card-img h-100 img-fluid"
                            alt="img-desc"
                          />
                          <div className="card-img-overlay bg-opacity-75 d-flex align-items-center justify-content-center">
                            <h5 className="card-title text-white">Adventure</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-end mt-5">
                      <button className="btn btn-primary btn-rounded">
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="tab_block_2">
                <div className="row">
                  <div className="col-md-8">
                    <div className="title-lg fs-5">
                      <span>Social profile links</span>
                    </div>
                    <p className="mb-4">
                      Connect your social media accounts for one-click sharing.
                    </p>
                    <form>
                      <div className="form-group">
                        <label className="form-label">Facebook</label>
                        <div className="input-group">
                          <span className="input-affix-wrapper">
                            <span className="input-prefix">
                              <span className="avatar avatar-logo avatar-xs">
                                <span className="initial-wrap">
                                  <img
                                    src="dist/img/symbol-avatar-17.png"
                                    alt="logo"
                                  />
                                </span>
                              </span>
                            </span>
                            <input
                              type="text"
                              className="form-control form-control-lg ps-8"
                              placeholder="Username"
                              value="Hencework"
                            />
                            <a href="#" className="input-suffix text-muted">
                              <span className="feather-icon">
                                <i data-feather="edit-3"></i>
                              </span>
                            </a>
                          </span>
                        </div>
                        <small className="form-text text-muted">
                          One-click sign in
                        </small>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Twitter</label>
                        <div className="input-group">
                          <span className="input-affix-wrapper">
                            <span className="input-prefix">
                              <span className="avatar avatar-logo avatar-xs">
                                <span className="initial-wrap">
                                  <img
                                    src="dist/img/symbol-avatar-18.png"
                                    alt="logo"
                                  />
                                </span>
                              </span>
                            </span>
                            <input
                              type="text"
                              className="form-control form-control-lg ps-8"
                              placeholder="Username"
                            />
                            <a href="#" className="input-suffix text-muted">
                              <span className="feather-icon">
                                <i data-feather="edit-3"></i>
                              </span>
                            </a>
                          </span>
                        </div>
                        <small className="form-text text-muted">
                          One-click sign in
                        </small>
                      </div>
                      <div className="form-group mb-5">
                        <label className="form-label">Linkedin</label>
                        <div className="input-group">
                          <span className="input-affix-wrapper">
                            <span className="input-prefix">
                              <span className="avatar avatar-logo avatar-xs">
                                <span className="initial-wrap">
                                  <img
                                    src="dist/img/symbol-avatar-19.png"
                                    alt="logo"
                                  />
                                </span>
                              </span>
                            </span>
                            <input
                              type="text"
                              className="form-control form-control-lg ps-8"
                              placeholder="Username"
                            />
                            <a href="#" className="input-suffix text-muted">
                              <span className="feather-icon">
                                <i data-feather="edit-3"></i>
                              </span>
                            </a>
                          </span>
                        </div>
                        <div className="form-check form-check-sm mt-2">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customCheckList4"
                            checked
                          />
                          <label
                            className="form-check-label"
                            for="customCheckList4"
                          >
                            This is a company account
                          </label>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Connect</label>
                        <div className="input-group mb-3">
                          <span className="input-affix-wrapper">
                            <span className="input-prefix">
                              <span className="avatar avatar-logo avatar-xs">
                                <span className="initial-wrap">
                                  <img
                                    src="dist/img/symbol-avatar-6.png"
                                    alt="logo"
                                  />
                                </span>
                              </span>
                            </span>
                            <input
                              type="text"
                              className="form-control form-control-lg ps-8 pe-15"
                              placeholder="Behance"
                            />
                            <span className="input-suffix">
                              <button className="btn btn-sm btn-outline-primary">
                                connect
                              </button>
                            </span>
                          </span>
                        </div>
                        <div className="input-group">
                          <span className="input-affix-wrapper">
                            <span className="input-prefix">
                              <span className="avatar avatar-logo avatar-xs">
                                <span className="initial-wrap">
                                  <img
                                    src="dist/img/symbol-avatar-5.png"
                                    alt="logo"
                                  />
                                </span>
                              </span>
                            </span>
                            <input
                              type="text"
                              className="form-control form-control-lg ps-8 pe-15"
                              placeholder="Dribbble"
                            />
                            <span className="input-suffix">
                              <button className="btn btn-sm btn-outline-primary">
                                connect
                              </button>
                            </span>
                          </span>
                        </div>
                      </div>
                    </form>
                    <div className="text-end mt-6">
                      <button className="btn btn-primary btn-rounded">
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="tab_block_3">
                <div className="row">
                  <div className="col-md-8">
                    <div className="title-lg fs-5">
                      <span>App Integrations</span>
                    </div>
                    <p className="mb-4">
                      Connect suitable apps with your app and get notifications
                      wherever you go
                    </p>
                    <ul className="advance-list">
                      <li className="advance-list-item transform-none shadow-none">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="media align-items-center">
                            <div className="media-head me-3">
                              <div className="avatar">
                                <img
                                  src="dist/img/symbol-avatar-6.png"
                                  alt="user"
                                  className="avatar-img"
                                />
                              </div>
                            </div>
                            <div className="media-body">
                              <div className="text-dark fw-medium">Behance</div>
                              <div className="fs-7">Design Platform</div>
                            </div>
                          </div>
                          <button className="btn mnw-125p btn-outline-primary">
                            Connect
                          </button>
                        </div>
                      </li>
                      <li className="advance-list-item transform-none shadow-none">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="media align-items-center">
                            <div className="media-head me-3">
                              <div className="avatar">
                                <img
                                  src="dist/img/symbol-avatar-5.png"
                                  alt="user"
                                  className="avatar-img"
                                />
                              </div>
                            </div>
                            <div className="media-body">
                              <div className="text-dark fw-medium">Dribble</div>
                              <div className="fs-7">Portfolio</div>
                            </div>
                          </div>
                          <button className="btn mnw-125p btn-outline-danger">
                            Disconnect
                          </button>
                        </div>
                      </li>
                      <li className="advance-list-item transform-none shadow-none">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="media align-items-center">
                            <div className="media-head me-3">
                              <div className="avatar">
                                <img
                                  src="dist/img/symbol-avatar-14.png"
                                  alt="user"
                                  className="avatar-img"
                                />
                              </div>
                            </div>
                            <div className="media-body">
                              <div className="text-dark fw-medium">
                                Intercom
                              </div>
                              <div className="fs-7">Chat Integrations</div>
                            </div>
                          </div>
                          <button className="btn mnw-125p btn-outline-primary">
                            Connect
                          </button>
                        </div>
                      </li>
                      <li className="advance-list-item transform-none shadow-none">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="media align-items-center">
                            <div className="media-head me-3">
                              <div className="avatar">
                                <img
                                  src="dist/img/symbol-avatar-16.png"
                                  alt="user"
                                  className="avatar-img"
                                />
                              </div>
                            </div>
                            <div className="media-body">
                              <div className="text-dark fw-medium">Gitlab</div>
                              <div className="fs-7">Developer Platform</div>
                            </div>
                          </div>
                          <button className="btn mnw-125p btn-outline-primary">
                            Connect
                          </button>
                        </div>
                      </li>
                    </ul>
                    <div className="text-end mt-6">
                      <button className="btn btn-primary btn-rounded">
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="tab_block_4">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="title-lg fs-5 justify-content-between mb-5">
                      <span>Saved Cards</span>
                      <button className="btn btn-outline-light">
                        + Add new card
                      </button>
                    </div>

                    <ul className="advance-list">
                      <li className="advance-list-item transform-none shadow-none py-3">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="media align-items-center">
                            <div className="media-head me-5">
                              <img
                                src="dist/img/card-visa.png"
                                alt="user"
                                className="img-fluid"
                              />
                            </div>
                            <div className="media-body">
                              <div>
                                <span className="text-dark fw-medium">
                                  ****4213
                                </span>
                                <span className="badge badge-soft-primary rounded-0 ms-3">
                                  Primary
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="d-lg-inline d-none">
                            <span className="fs-7 text-muted me-5 d-xl-inline d-none">
                              Last updated 12/03/2022
                            </span>
                            <button className="btn mnw-100p btn-outline-danger me-2">
                              Delete
                            </button>
                            <button className="btn mnw-100p btn-light">
                              Edit
                            </button>
                          </div>
                        </div>
                      </li>
                      <li className="advance-list-item transform-none shadow-none py-3">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="media align-items-center">
                            <div className="media-head me-5">
                              <img
                                src="dist/img/mastercard.png"
                                alt="user"
                                className="img-fluid"
                              />
                            </div>
                            <div className="media-body">
                              <div>
                                <span className="text-dark fw-medium">
                                  ****1214
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="d-lg-inline d-none">
                            <span className="fs-7 text-muted me-5 d-xl-inline d-none">
                              Last updated 25/04/2022
                            </span>
                            <button className="btn mnw-100p btn-outline-danger me-2">
                              Delete
                            </button>
                            <button className="btn mnw-100p btn-light">
                              Edit
                            </button>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <div className="text-end mt-6">
                      <button className="btn btn-primary btn-rounded">
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="tab_block_5">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="title-lg fs-5">
                      <span>My Addresses</span>
                    </div>
                    <div className="row gx-3">
                      <div className="col-md-4">
                        <div className="card card-border mnh-250p">
                          <div className="card-body">
                            <div className="card-action-wrap">
                              <a
                                className="btn btn-sm btn-icon btn-rounded btn-flush-danger flush-soft-hover card-close"
                                href="#"
                              >
                                <span className="icon">
                                  <span className="feather-icon">
                                    <i data-feather="trash-2"></i>
                                  </span>
                                  <span className="feather-icon d-none">
                                    <i data-feather="minimize"></i>
                                  </span>
                                </span>
                              </a>
                              <a className="btn btn-sm btn-icon btn-rounded btn-flush-dark flush-soft-hover">
                                <span className="icon">
                                  <span className="feather-icon">
                                    <i data-feather="edit-2"></i>
                                  </span>
                                </span>
                              </a>
                            </div>
                            <i className="bi bi-house-door-fill fs-3 d-block mb-1 text-primary"></i>
                            <h5>Home</h5>
                            <p className="card-text">
                              3421 Central Ave NE, Albuquerque, New York - 87106
                            </p>
                            <span className="badge badge-soft-primary">
                              Primary
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card card-border mnh-250p">
                          <div className="card-body">
                            <div className="card-action-wrap">
                              <a
                                className="btn btn-sm btn-icon btn-rounded btn-flush-danger flush-soft-hover card-close"
                                href="#"
                              >
                                <span className="icon">
                                  <span className="feather-icon">
                                    <i data-feather="trash-2"></i>
                                  </span>
                                  <span className="feather-icon d-none">
                                    <i data-feather="minimize"></i>
                                  </span>
                                </span>
                              </a>
                              <a className="btn btn-sm btn-icon btn-rounded btn-flush-dark flush-soft-hover">
                                <span className="icon">
                                  <span className="feather-icon">
                                    <i data-feather="edit-2"></i>
                                  </span>
                                </span>
                              </a>
                            </div>
                            <i className="bi bi-shield-fill-check fs-3 d-block mb-1 text-primary"></i>
                            <h5>Office</h5>
                            <p className="card-text">
                              2035 7th St, Clanton, Alaska, 35045
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card card-border border-dashed mnh-250p">
                          <div className="card-body d-flex align-items-center justify-content-center">
                            <button
                              className="btn btn-outline-light btn-block"
                              data-bs-toggle="modal"
                              data-bs-target="#add_new_board"
                            >
                              <span
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="Add New Address"
                              >
                                <span className="icon">
                                  <span className="feather-icon">
                                    <i data-feather="plus"></i>
                                  </span>
                                </span>
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-end mt-6">
                      <button className="btn btn-primary btn-rounded">
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- /Page Body -->		 */}
        </div>

        {/* <!-- Page Footer --> */}
        <div className="hk-footer">
          <footer className="container-xxl footer">
            <div className="row">
              <div className="col-xl-8">
                <p className="footer-text">
                  <span className="copy-text">
                    Jampack © 2023 All rights reserved.
                  </span>{" "}
                  <a href="#" className="" target="_blank">
                    Privacy Policy
                  </a>
                  <span className="footer-link-sep">|</span>
                  <a href="#" className="" target="_blank">
                    T&C
                  </a>
                  <span className="footer-link-sep">|</span>
                  <a href="#" className="" target="_blank">
                    System Status
                  </a>
                </p>
              </div>
              <div className="col-xl-4">
                <a href="#" className="footer-extr-link link-default">
                  <span className="feather-icon">
                    <i data-feather="external-link"></i>
                  </span>
                  <u>Send feedback to our help forum</u>
                </a>
              </div>
            </div>
          </footer>
        </div>
        {/* <!-- / Page Footer --> */}
      </div>
    </div>
  );
};

export default AccountContent;
