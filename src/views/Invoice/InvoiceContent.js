import React, { useEffect, useState } from "react";
import Sidenav from "./components/Sidenav";
import InvoiceList from "./components/InvoiceList";
import InvoicePreview from "./components/InvoicePreview";
import InvoiceTemplate from "./components/InvoiceTemplate";
import CreateInvoice from "./components/CreateInvoice";
import BusinessForm from "./components/BusinessForm";
import BilledInfo from "./components/BilledInfo";
import { useDispatch, useSelector } from "react-redux";
import { getUserInvoicesList } from "../../redux/services/invoice";

const InvoiceContent = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { invoices, invoiceDetails } = useSelector((state) => state.invoice);
  const [showCreate, setShowCreate] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showInvoiceList, setShowInvoiceList] = useState(true);
  const [businessInfo, setBusinessInfo] = useState({});
  const [billedInfo, setBilledInfo] = useState({});
  const [invoiceData, setInvoiceData] = useState([]);
  const [invoiceData_, setInvoiceData_] = useState([]);
  useEffect(() => {
    dispatch(getUserInvoicesList(token));
  }, [token, dispatch]);
  useEffect(() => {
    if (invoices?.length > 0) {
      const data = invoices?.filter(
        (inv) => inv.activity !== "blocked" && inv.activity !== "archived"
      );
      setInvoiceData(data);
      setInvoiceData_(invoices);
    }
  }, [invoices]);
  const handleDataFromBusinessForm = (data) => {
    setBusinessInfo(data);
  };
  const handleDataFromBilledInfoForm = (data) => {
    setBilledInfo(data);
  };
  const handleShowCreate = (data) => {
    setShowCreate(data);
  };
  const handleShowList = (data) => {
    setShowInvoiceList(data);
  };
  const handleShowDetailsData = (data) => {
    setShowDetails(data);
  };
  const handleDataFromSidenav = (data) => {
    setInvoiceData(data);
  };

  return (
    <div className="hk-pg-wrapper pb-0">
      <div className="hk-pg-body py-0">
        <div className="invoiceapp-wrap">
          <Sidenav
            onShowCreateDataFromChild={handleShowCreate}
            onShowListDataFromChild={handleShowList}
            onShowDetailsDataFromChild={handleShowDetailsData}
            onFilterDataFromChild={handleDataFromSidenav}
            invoiceData={invoiceData_}
            dispatch={dispatch}
          />
          <div className="invoiceapp-content">
            <div className="invoiceapp-detail-wrap">
              {showInvoiceList && (
                <InvoiceList
                  invoiceData={invoiceData}
                  onShowDetailsDataFromChild={handleShowDetailsData}
                  dispatch={dispatch}
                  token={token}
                  onShowCreateDataFromChild={handleShowCreate}
                  onShowListDataFromChild={handleShowList}
                />
              )}
              {showDetails && (
                <InvoicePreview invoiceDetails={invoiceDetails} />
              )}
              {/* <InvoiceTemplate /> */}
              {showCreate && (
                <CreateInvoice
                  businessInfo={businessInfo}
                  billedInfo={billedInfo}
                  dispatch={dispatch}
                  token={token}
                  authUser={user}
                  invoiceDetails={invoiceDetails}
                />
              )}
            </div>
          </div>
          {/* <!-- Edit Info --> */}
          <BusinessForm onDataFromChild={handleDataFromBusinessForm} />
          {/* <!-- /Edit Info --> */}

          {/* <!-- Billed Edit Info --> */}
          <BilledInfo onDataFromChild={handleDataFromBilledInfoForm} />

          {/* <!-- /Billed Edit Info --> */}
        </div>
      </div>
      {/* <!-- /Page Body --> */}
    </div>
  );
};

export default InvoiceContent;
