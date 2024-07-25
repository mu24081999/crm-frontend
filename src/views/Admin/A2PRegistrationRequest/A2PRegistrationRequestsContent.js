import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import SubscriptionList from "./components/SubscriptionList";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../../../Context";
import { getSubscriptionsList } from "../../../redux/services/subscription";
import { getUsers } from "../../../redux/services/users";
import Pagination from "../../../components/Pagination/Pagination";
import { getVerificationsList } from "../../../redux/services/verification";
import { useForm } from "react-hook-form";
const A2PRegistrationRequestsContent = () => {
  const {
    handleSubmit,
    // watch,
    control,
    // setValue,
    formState: { errors },
  } = useForm({});
  const { showLeadDetails } = useContext(SocketContext);
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [data_, setData_] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [view, setView] = useState("list");
  const { subscriptions } = useSelector((state) => state.subscription);
  const { verifications } = useSelector((state) => state.verification);
  const { users } = useSelector((state) => state.user);
  useEffect(() => {
    if (verifications?.length > 0) {
      const filterData = [];
      verifications?.map((ver) => {
        const user = users?.filter((user) => user.id === ver?.user_id)[0];
        const data = {
          ...ver,
          customer_details: user,
        };
        return filterData?.push(data);
      });
      setData(verifications);
      setData_(verifications);
    }
  }, [verifications, users]);
  useEffect(() => {
    dispatch(getUsers(token));
    dispatch(getVerificationsList(token));
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

  const handleDataFromPagination = (newData) => {
    setData(newData);
  };

  return (
    <div className="hk-pg-wrapper pb-0">
      {/* <!-- Page Body --> */}
      <div className="hk-pg-body py-0">
        <div className="contactapp-wrap">
          <div className="contactapp-content">
            {/* <Sidebar
              onSendData={handleReceiveData}
              onToggleEdit={handleToggleEdit}
              subscriptions={data_}
            /> */}

            {!showLeadDetails && (
              <div className="contactapp-detail-wrap">
                <Header
                  onDataFromChild={handleViewDataFromHeader}
                  activeBar={view}
                />
                <div className="contact-body">
                  <div className="nicescroll-bar">
                    <SubscriptionList
                      subscriptionsArray={data}
                      users={users}
                      onToggleEdit={handleToggleEdit}
                      isEdit={isEdit}
                    />
                    <div>
                      <Pagination
                        itemsPerPage={20}
                        dataFromChild={handleDataFromPagination}
                        items={data_}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <!-- /Page Body --> */}
    </div>
  );
};

export default A2PRegistrationRequestsContent;
