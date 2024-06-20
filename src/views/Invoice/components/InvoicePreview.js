import React from "react";

const InvoicePreview = ({ invoiceDetails }) => {
  console.log("🚀 ~ InvoicePreview ~ invoiceDetails:", invoiceDetails);
  const labels = [];
  const values = [];
  invoiceDetails?.invoice_details?.items?.map((item, index) => {
    labels.push(item.label);
    values.push(item.value);
    return {};
  });
  return (
    <div>
      <header className="invoice-header">
        <div className="d-flex align-items-center">
          <a className="invoiceapp-title link-dark ms-1 ms-sm-0">
            <h1>Template Preview</h1>
          </a>
        </div>
      </header>
      <div className="invoice-body">
        <div
          className="nicescroll-bar"
          style={{ height: "700px", overflow: "scroll" }}
        >
          <div className="container">
            <div className="template-invoice-wrap mt-xxl-5 p-md-5 p-3">
              <div className="row">
                <div className="col-lg-3 col-md-5 order-md-0 order-1">
                  <img src={invoiceDetails?.logo} width={100} alt="logo" />
                </div>
                <div className="col-lg-4 offset-lg-5 offset-md-3 col-md-4 mb-md-0 mb-2">
                  <h2 className="d-flex justify-content-md-end mb-0">
                    {invoiceDetails?.title}
                  </h2>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-4 order-md-0 order-1">
                  <div className="address-wrap">
                    <h6>{invoiceDetails?.business_info?.company_name}</h6>
                    <p>{invoiceDetails?.business_info?.address_line_1}</p>
                    <p>{invoiceDetails?.business_info?.address_line_2}</p>
                    {/* <p>Washington DC 42341</p> */}
                    <p>j{invoiceDetails?.business_info?.email}</p>
                  </div>
                </div>
                <div className="col-md-5 offset-md-3 mb-4 mb-md-0">
                  <div className="d-flex justify-content-md-end">
                    <div className="text-md-end me-3">
                      {labels?.map((label, index) => (
                        <div key={index} className="mb-1">
                          {label}
                        </div>
                      ))}
                      {/* <div className="mb-1">Invoice Date*</div>
                      <div className="mb-1">Due Date*</div>
                      <div>Customer No</div> */}
                    </div>
                    <div className="text-dark">
                      {values?.map((value, index) => (
                        <div key={index} className="mb-1">
                          {value}
                        </div>
                      ))}
                      {/* <div className="mb-1">0001</div>
                      <div className="mb-1">24/08/2020</div>
                      <div className="mb-1">Due on receipt</div>
                      <div>321456</div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="separator separator-light"></div>
              <div className="row">
                <div className="col-md-3">
                  <h6 className="text-uppercase fs-7 mb-2">Billed To</h6>
                  <div className="Billto-wrap">
                    <h6>{invoiceDetails?.bill_details?.company_name}</h6>
                    <p>{invoiceDetails?.bill_details?.address_line_1}</p>
                    <p>{invoiceDetails?.bill_details?.address_line_2}</p>
                    {/* <p>Washington DC 42341</p> */}
                    <p>j{invoiceDetails?.bill_details?.email}</p>
                  </div>
                </div>
              </div>
              <div className="table-wrap mt-6">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead className="thead-primary">
                      <tr>
                        <th>Item</th>
                        <th className="text-end">Quantity</th>
                        <th className="text-end">Price</th>
                        <th className="text-end">Discount</th>
                        <th className="text-end">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoiceDetails?.invoice_items?.items?.map(
                        (item, index) => (
                          <tr key={index}>
                            <td className="w-70">
                              <h6>{item?.name}</h6>
                              <p>{item?.description}</p>
                            </td>
                            <td className="text-end text-dark">
                              {item?.quantity}
                            </td>
                            <td className="w-15 text-end text-dark">
                              {item?.price}
                            </td>
                            <td className="text-end text-dark">
                              {item?.discount}%
                            </td>
                            <td className="w-20 text-end text-dark">
                              ${item?.total}
                            </td>
                          </tr>
                        )
                      )}
                      {/* <tr>
                        <td className="w-70">
                          <h6>Redesiging of agencyclick.com</h6>
                          <p>
                            This is my project description. if the line do not
                            filt like the sentence is to big the area will start
                            getting bigger
                          </p>
                        </td>
                        <td className="text-end text-dark">8</td>
                        <td className="w-15 text-end text-dark">60.00</td>
                        <td className="text-end text-dark">5%</td>
                        <td className="w-20 text-end text-dark">$420.5</td>
                      </tr>
                      <tr>
                        <td className="w-70">
                          <h6>Re-branding</h6>
                        </td>
                        <td className="text-end text-dark">1</td>
                        <td className="w-15 text-end text-dark">150.00</td>
                        <td className="text-end text-dark">0%</td>
                        <td className="w-20 text-end text-dark">$140.5</td>
                      </tr>
                      <tr>
                        <td className="w-70">
                          <h6>Social media marketing</h6>
                        </td>
                        <td className="text-end text-dark">20</td>
                        <td className="w-15 text-end text-dark">30.00</td>
                        <td className="text-end text-dark">5%</td>
                        <td className="w-20 text-end text-dark">$540.5</td>
                      </tr> */}
                      <tr>
                        <td colspan="2" rowspan="4" className="border-0"></td>
                        <td colspan="2">Subtotal</td>
                        <td className="text-end text-dark">
                          ${invoiceDetails?.subtotal}
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2">Item Discount</td>
                        <td className="text-end text-dark">
                          ${invoiceDetails?.discount}
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2">Extra Discount</td>
                        <td className="text-end text-dark">
                          ${invoiceDetails?.discount_total}
                        </td>
                      </tr>
                      <tr className="border-0">
                        <td colspan="2" className="text-dark border">
                          Total
                        </td>
                        <td className="text-end text-dark border">
                          ${invoiceDetails?.total}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-lg-5">
                  <h6>Note to client</h6>
                  <p>{invoiceDetails?.note_to_client}</p>
                </div>
                <div className="col-lg-7 text-lg-end mt-lg-0 mt-3">
                  <h5 className="mt-lg-7">{invoiceDetails?.from_name}</h5>
                  <p>{invoiceDetails?.from_label}</p>
                </div>
              </div>
              <div className="separator separator-light mt-7"></div>
              <div className="row">
                <div className="col-md-12">
                  <h6>Terms & Conditions</h6>
                  <ol className="ps-3">
                    {invoiceDetails?.conditions?.items?.map(
                      (condition, index) => (
                        <li key={index}>{condition?.term}</li>
                      )
                    )}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;
