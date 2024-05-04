import React from "react";

const InvoiceTemplate = () => {
  return (
    <div>
      <header className="invoice-header">
        <div className="d-flex align-items-center">
          <a className="invoiceapp-title link-dark" href="/">
            <h1>Invoice Templates</h1>
          </a>
        </div>
        <div className="invoice-options-wrap">
          <a
            className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover hk-navbar-togglable ms-0 d-md-inline-block d-none"
            href="/"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title=""
            data-bs-original-title="Collapse"
          >
            <span className="icon">
              <span className="feather-icon">
                <i data-feather="chevron-up"></i>
              </span>
              <span className="feather-icon d-none">
                <i data-feather="chevron-down"></i>
              </span>
            </span>
          </a>
        </div>
        <div className="hk-sidebar-togglable"></div>
      </header>
      <div className="invoice-body">
        <div data-simplebar className="nicescroll-bar">
          <div className="container">
            <div className="my-md-7 my-3">
              <h3 className="mb-4">Pick your starting point</h3>
              <form>
                <div className="row">
                  <div className="col-md-4 mb-md-0 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search Template"
                    />
                  </div>
                  <div className="col-md-4 mb-md-0 mb-3">
                    <select className="form-select">
                      <option value="">Popular</option>
                      <option>classNameic</option>
                      <option>Trending</option>
                      <option>Simple</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <select className="form-select">
                      <option value="">All Categories</option>
                      <option>Business</option>
                      <option>Studio</option>
                      <option>Personal</option>
                    </select>
                  </div>
                </div>
              </form>
              <h5 className="mt-7 mb-3">Premium Templates</h5>
              <div className="row text-center">
                <a
                  href="/"
                  target="_blank"
                  className="d-block col-xl-2 col-sm-4 col-xs-12 mb-5"
                >
                  <div className="card card-border">
                    <img
                      className="card-img"
                      src="dist/img/templates/template1.png"
                      alt="Card image cap"
                    />
                  </div>
                  <h6 className="mb-0">Standard</h6>
                </a>
                <a
                  href="/"
                  target="_blank"
                  className="d-block col-xl-2 col-sm-4 col-xs-12 mb-5"
                >
                  <div className="card card-border">
                    <img
                      className="card-img"
                      src="dist/img/templates/template2.png"
                      alt="Card image cap"
                    />
                  </div>
                  <h6 className="mb-0">Simplicity</h6>
                </a>
                <a
                  href="/"
                  target="_blank"
                  className="d-block col-xl-2 col-sm-4 col-xs-12 mb-5"
                >
                  <div className="card card-border">
                    <img
                      className="card-img"
                      src="dist/img/templates/template3.png"
                      alt="Card image cap"
                    />
                  </div>
                  <h6 className="mb-0">Essential</h6>
                </a>
                <a
                  href="/"
                  target="_blank"
                  className="d-block col-xl-2 col-sm-4 col-xs-12 mb-5"
                >
                  <div className="card card-border">
                    <img
                      className="card-img"
                      src="dist/img/templates/template4.png"
                      alt="Card image cap"
                    />
                  </div>
                  <h6 className="mb-0">classNameic</h6>
                </a>
              </div>
              <h5 className="mt-7 mb-3">Business</h5>
              <div className="row text-center">
                <a
                  href="/"
                  target="_blank"
                  className="d-block col-xl-2 col-sm-4 col-xs-12 mb-5"
                >
                  <div className="card card-border">
                    <img
                      className="card-img"
                      src="dist/img/templates/template5.png"
                      alt="Card image cap"
                    />
                  </div>
                  <h6 className="mb-0">Pro Forma</h6>
                </a>
                <a
                  href="/"
                  target="_blank"
                  className="d-block col-xl-2 col-sm-4 col-xs-12 mb-5"
                >
                  <div className="card card-border">
                    <img
                      className="card-img"
                      src="dist/img/templates/template6.png"
                      alt="Card image cap"
                    />
                  </div>
                  <h6 className="mb-0">Trade</h6>
                </a>
                <a
                  href="/"
                  target="_blank"
                  className="d-block col-xl-2 col-sm-4 col-xs-12 mb-5"
                >
                  <div className="card card-border">
                    <img
                      className="card-img"
                      src="dist/img/templates/template7.png"
                      alt="Card image cap"
                    />
                  </div>
                  <h6 className="mb-0">Interim</h6>
                </a>
                <a
                  href="/"
                  target="_blank"
                  className="d-block col-xl-2 col-sm-4 col-xs-12 mb-5"
                >
                  <div className="card card-border">
                    <img
                      className="card-img"
                      src="dist/img/templates/template8.png"
                      alt="Card image cap"
                    />
                  </div>
                  <h6 className="mb-0">Primary</h6>
                </a>
                <a
                  href="/"
                  target="_blank"
                  className="d-block col-xl-2 col-sm-4 col-xs-12 mb-5"
                >
                  <div className="card card-border">
                    <img
                      className="card-img"
                      src="dist/img/templates/template1.png"
                      alt="Card image cap"
                    />
                  </div>
                  <h6 className="mb-0">Matt Opel</h6>
                </a>
                <a
                  href="/"
                  target="_blank"
                  className="d-block col-xl-2 col-sm-4 col-xs-12 mb-5"
                >
                  <div className="card card-border">
                    <img
                      className="card-img"
                      src="dist/img/templates/template2.png"
                      alt="Card image cap"
                    />
                  </div>
                  <h6 className="mb-0">Freelancer</h6>
                </a>
                <a
                  href="/"
                  target="_blank"
                  className="d-block col-xl-2 col-sm-4 col-xs-12 mb-5"
                >
                  <div className="card card-border">
                    <img
                      className="card-img"
                      src="dist/img/templates/template3.png"
                      alt="Card image cap"
                    />
                  </div>
                  <h6 className="mb-0">Designer</h6>
                </a>
                <a
                  href="/"
                  target="_blank"
                  className="d-block col-xl-2 col-sm-4 col-xs-12 mb-5"
                >
                  <div className="card card-border">
                    <img
                      className="card-img"
                      src="dist/img/templates/template4.png"
                      alt="Card image cap"
                    />
                  </div>
                  <h6 className="mb-0">Service</h6>
                </a>
                <a
                  href="/"
                  target="_blank"
                  className="d-block col-xl-2 col-sm-4 col-xs-12 mb-5"
                >
                  <div className="card card-border">
                    <img
                      className="card-img"
                      src="dist/img/templates/template5.png"
                      alt="Card image cap"
                    />
                  </div>
                  <h6 className="mb-0">Service</h6>
                </a>
                <a
                  href="/"
                  target="_blank"
                  className="d-block col-xl-2 col-sm-4 col-xs-12 mb-5"
                >
                  <div className="card card-border">
                    <img
                      className="card-img"
                      src="dist/img/templates/template6.png"
                      alt="Card image cap"
                    />
                  </div>
                  <h6 className="mb-0">Service</h6>
                </a>
                <a
                  href="/"
                  target="_blank"
                  className="d-block col-xl-2 col-sm-4 col-xs-12 mb-5"
                >
                  <div className="card card-border">
                    <img
                      className="card-img"
                      src="dist/img/templates/template7.png"
                      alt="Card image cap"
                    />
                  </div>
                  <h6 className="mb-0">Service</h6>
                </a>
                <a
                  href="/"
                  target="_blank"
                  className="d-block col-xl-2 col-sm-4 col-xs-12 mb-5"
                >
                  <div className="card card-border">
                    <img
                      className="card-img"
                      src="dist/img/templates/template8.png"
                      alt="Card image cap"
                    />
                  </div>
                  <h6 className="mb-0">Service</h6>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTemplate;
