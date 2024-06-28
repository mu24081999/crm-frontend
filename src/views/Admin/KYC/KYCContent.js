import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import KYCList from "./components/KYCList";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../../../Context";
import { getUsers } from "../../../redux/services/users";
import { getKYCList, updateKycRec } from "../../../redux/services/kyc";
import Loader from "../../../components/Loader/Loader";
const KYCContent = () => {
  const { showLeadDetails } = useContext(SocketContext);
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [data_, setData_] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [view, setView] = useState("list");
  const { kycs, isLoading, kycDetails } = useSelector((state) => state.kyc);
  const { users } = useSelector((state) => state.user);
  useEffect(() => {
    if (kycs?.length > 0) {
      const filterData = [];
      kycs?.map((form) => {
        const user = users?.filter((user) => user.id === form?.customer_id)[0];
        const data = {
          ...form,
          customer_details: user,
        };
        return filterData?.push(data);
      });
      setData(kycs);
      setData_(kycs);
    }
  }, [kycs, users]);
  useEffect(() => {
    dispatch(getUsers(token));
    dispatch(getKYCList(token));
  }, [token, dispatch]);
  const handleReceiveData = (receivedData) => {
    setData(receivedData);
  };
  const handleToggleEdit = (value) => {
    // setIsEdit(value);
  };
  const handleViewDataFromHeader = (value) => {
    setView(value);
  };
  const handleUpdateKycForm = (form_id) => {
    dispatch(
      updateKycRec(token, form_id, { is_approved: 1, approved_by: user.id })
    );
  };
  return (
    <div className="hk-pg-wrapper pb-0">
      {/* <!-- Page Body --> */}
      <div className="hk-pg-body py-0">
        <div className="contactapp-wrap">
          <div className="contactapp-content">
            <Sidebar
              onSendData={handleReceiveData}
              onToggleEdit={handleToggleEdit}
              subscriptions={data_}
            />
            {!showLeadDetails && (
              <div className="contactapp-detail-wrap">
                <Header
                  onDataFromChild={handleViewDataFromHeader}
                  activeBar={view}
                />
                <div className="contact-body">
                  <div className="nicescroll-bar">
                    <KYCList
                      dispatch={dispatch}
                      token={token}
                      kycArray={data}
                      users={users}
                      isLoading={isLoading}
                      onToggleEdit={handleToggleEdit}
                      isEdit={isEdit}
                    />
                  </div>
                </div>
              </div>
            )}
            {/* <!-- Edit Info --> */}
            <div
              id="kyc_form_detail"
              className="modal fade add-new-contact"
              tabIndex="-1"
              role="dialog"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-top modal-md"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header bg-primary">
                    <span style={{ color: "white", fontWeight: "bold" }}>
                      Kyc Form Detials
                    </span>
                    <button
                      type="button"
                      className="btn-close btn-light"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <div>
                        {kycDetails?.id && (
                          <>
                            <section>
                              <div
                                className="rounded-4 px-3 py-2 text-primary fw-bold"
                                style={{ backgroundColor: "#00808038" }}
                              >
                                Personal Details
                              </div>
                              <div className="p-3">
                                <div className="px-2">
                                  <div className="d-flex justify-content-between">
                                    <div className="fw-bold">Firstname:</div>
                                    <div>{kycDetails?.firstname}</div>
                                  </div>
                                  <div className="d-flex justify-content-between">
                                    <div className="fw-bold">Lastname:</div>
                                    <div>{kycDetails?.lastname}</div>
                                  </div>

                                  <div className="d-flex justify-content-between">
                                    <div className="fw-bold">
                                      Email Address:
                                    </div>
                                    <div>{kycDetails?.email}</div>
                                  </div>
                                  <div className="d-flex justify-content-between">
                                    <div className="fw-bold">Phone Number:</div>
                                    <div>{kycDetails?.phone}</div>
                                  </div>
                                </div>
                              </div>
                            </section>
                            <section>
                              <div
                                className="rounded-4 px-3 py-2 text-primary fw-bold"
                                style={{ backgroundColor: "#00808038" }}
                              >
                                Address
                              </div>
                              <div className="p-3">
                                <div className="px-2">
                                  <div className="d-flex justify-content-between">
                                    <div className="fw-bold">Nationality:</div>
                                    <div>{kycDetails?.nationality}</div>
                                  </div>
                                  <div className="d-flex justify-content-between">
                                    <div className="fw-bold">State:</div>
                                    <div>{kycDetails?.state}</div>
                                  </div>
                                  <div className="d-flex justify-content-between">
                                    <div className="fw-bold">City:</div>
                                    <div>{kycDetails?.city}</div>
                                  </div>
                                  <div className="d-flex justify-content-between">
                                    <div className="fw-bold">
                                      Postal/Zip Code:
                                    </div>
                                    <div>{kycDetails?.zip_code}</div>
                                  </div>
                                </div>
                              </div>
                            </section>
                            <section>
                              <div
                                className="rounded-4 px-3 py-2 text-primary fw-bold"
                                style={{ backgroundColor: "#00808038" }}
                              >
                                Business Details
                              </div>
                              <div className="p-3">
                                <div className="px-2">
                                  <div className="">
                                    <div className="fw-bold">
                                      What type of business you own?
                                    </div>
                                    <div>{kycDetails?.company_type}</div>
                                  </div>
                                  <div className="">
                                    <div className="fw-bold">
                                      What does your company do?
                                    </div>
                                    <div>{kycDetails?.company_do}</div>
                                  </div>
                                  <div className="">
                                    <div className="fw-bold">
                                      What is the size of your company?
                                    </div>
                                    <div>{kycDetails?.company_size}</div>
                                  </div>
                                  <div className="">
                                    <div className="fw-bold">
                                      Explain Your Business?
                                    </div>
                                    <div>{kycDetails?.company_details}</div>
                                  </div>
                                </div>
                              </div>
                            </section>
                            <section>
                              <div
                                className="rounded-4 px-3 py-2 text-primary fw-bold"
                                style={{ backgroundColor: "#00808038" }}
                              >
                                Declaration
                              </div>
                              <div className="p-3">
                                <div className="px-2">
                                  <div className="d-flex justify-content-between">
                                    <div className="fw-bold">Document Type</div>
                                    <div>{kycDetails?.document_type}</div>
                                  </div>
                                  <div className="d-flex justify-content-between">
                                    <div className="fw-bold">
                                      Policy Accepted
                                    </div>
                                    <div>
                                      {kycDetails?.is_policy_accepted === 1
                                        ? "true"
                                        : "false"}
                                    </div>
                                  </div>
                                  <div className="d-flex justify-content-center">
                                    <img
                                      className="rounded-3 border mt-5"
                                      src="https://www.nadra.gov.pk/wp-content/uploads/2023/12/NIC.png"
                                      alt="id"
                                    />
                                  </div>
                                </div>
                              </div>
                            </section>
                          </>
                        )}
                      </div>
                    )}
                    {kycDetails?.is_approved === 0 && (
                      <div className="modal-footer">
                        <button
                          className="btn btn-primary btn-block"
                          onClick={() => handleUpdateKycForm(kycDetails?.id)}
                        >
                          Approve
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- /Edit Info --> */}
          </div>
        </div>
      </div>
      {/* <!-- /Page Body --> */}
    </div>
  );
};

export default KYCContent;
