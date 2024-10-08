import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import SubscriptionList from "./components/SubscriptionList";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../../../Context";
import { getSubscriptionsList } from "../../../redux/services/subscription";
import { getUsers } from "../../../redux/services/users";
import Pagination from "../../../components/Pagination/Pagination";
const SubscriptionContent = () => {
  const { showLeadDetails } = useContext(SocketContext);
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [data_, setData_] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [view, setView] = useState("list");
  const { subscriptions } = useSelector((state) => state.subscription);
  const { users } = useSelector((state) => state.user);
  useEffect(() => {
    if (subscriptions?.length > 0) {
      const filterData = [];
      subscriptions?.map((sub) => {
        const user = users?.filter((user) => user.id === sub?.customer_id)[0];
        const data = {
          ...sub,
          customer_details: user,
        };
        return filterData?.push(data);
      });
      setData(subscriptions);
      setData_(subscriptions);
    }
  }, [subscriptions, users]);
  useEffect(() => {
    dispatch(getUsers(token));
    dispatch(getSubscriptionsList(token));
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

export default SubscriptionContent;
