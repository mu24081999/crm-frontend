import React, { useEffect, useMemo, useState } from "react";
import Calender from "../../components/Calender/Calender";
import AddEventForm from "./components/AddEventForm";
import { useDispatch, useSelector } from "react-redux";
import { getEventsList } from "../../redux/services/calendar_event";
import moment from "moment";
import EventDetail from "./components/EventDetail";
import { getUsers } from "../../redux/services/users";
import SideNav from "./components/SideNav";
import _ from "lodash";

const CalenderContent = () => {
  const dispatch = useDispatch();
  const [eventsData, setEventsData] = useState([]);
  const [upcomingData, setUpcomingData] = useState([]);
  const [eventDetailRight, setEventDetailRight] = useState("-370px");
  const { token, user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const { events, isLoading, eventDetails } = useSelector(
    (state) => state.calendar_event
  );
  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    dispatch(getEventsList(token));
    dispatch(getUsers(token));
  }, [token, dispatch]);
  useMemo(() => {
    const data = [];
    events?.length > 0 &&
      events?.map((event, index) => {
        data.push({
          id: event.id,
          title: event?.name,
          backgroundColor: event.event_color,
          start:
            moment(event?.start_date).format("YYYY-MM-DD") +
            "T" +
            event?.start_time,
          end:
            moment(event?.end_date).format("YYYY-MM-DD") +
            "T" +
            event?.end_time,
        });
      });

    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
    const startDate = new Date(currentDate);
    startDate.setDate(startDate.getDate() - currentDayOfWeek); // Start date of the current week
    const endDate = new Date(currentDate);
    endDate.setDate(endDate.getDate() + (6 - currentDayOfWeek)); // End date of the current week

    // Filter data for the current week
    const filteredData = events.filter((item) => {
      const itemDate = new Date(item.created_at);
      return itemDate >= startDate && itemDate <= endDate;
    });
    // Use the filtered data as needed
    setUpcomingData(filteredData);
    setEventsData(data);
  }, [events]);
  const handleDataFromChild = () => {
    setEventsData([]);
  };
  const handleEventDetailRight = (value) => {
    setEventDetailRight(value);
  };
  useEffect(() => {
    if (users?.length > 0) {
      const data = users?.filter(
        (u) =>
          _.toInteger(u.parent_id) === user.id ||
          _.toInteger(u.client_id) === user.id
      );
      setUsersData(data);
    }
  }, [users, user]);
  return (
    <div>
      {/* <!-- Calendar Drawer --> */}
      <EventDetail
        rightValue={eventDetailRight}
        onDataFromChild={handleEventDetailRight}
        eventDetails={eventDetails}
      />
      {/* <!-- /Calendar Drawer --> */}

      {/* <!-- Main Content --> */}
      <div className="hk-pg-wrapper pb-0">
        {/* <!-- Page Body --> */}
        <div className="hk-pg-body py-0">
          <div className="calendarapp-wrap">
            <SideNav
              upcomingData={upcomingData}
              eventsData={eventsData}
              INITIAL_EVENTS={eventsData}
              isLoading={isLoading}
              onDataFromChild={handleEventDetailRight}
              token={token}
              dispatch={dispatch}
            />
            <div className="calendarapp-content">
              {/* <div id="calendar" className="w-100"></div> */}
              {eventsData?.length > 0 && (
                <Calender
                  INITIAL_EVENTS={eventsData}
                  isLoading={isLoading}
                  onDataFromChild={handleEventDetailRight}
                  token={token}
                  dispatch={dispatch}
                />
              )}
            </div>

            {/* <!-- New Event --> */}
            <AddEventForm
              dispatch={dispatch}
              token={token}
              authUser={user}
              onDataFromChild={handleDataFromChild}
              usersData={usersData}
            />
            {/* <!-- /New Event --> */}

            {/* <!-- Set Reminder --> */}
            <div
              id="set_new_reminder"
              className="modal fade"
              tabindex="-1"
              role="dialog"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-body">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                    <h5 className="mb-4">Create a Reminder</h5>
                    <form>
                      <div className="row gx-3">
                        <div className="col-sm-12 form-group">
                          <label className="form-label">Name</label>
                          <input className="form-control" type="text" />
                        </div>
                      </div>
                      <div className="row gx-3">
                        <div className="col-sm-12 form-group">
                          <div className="form-label-group">
                            <label>Note/Description</label>
                            <small className="text-muted">200</small>
                          </div>
                          <textarea
                            className="form-control"
                            rows="3"
                          ></textarea>
                        </div>
                      </div>
                      <div className="row gx-3">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="form-label">Start Date</label>
                            <input
                              className="form-control"
                              name="single-date-pick"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="form-label">Start Time</label>
                            <input
                              className="form-control input-single-timepicker"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row gx-3">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Remind</label>
                            <select className="form-control form-select me-20">
                              <option selected="">Daily</option>
                              <option value="1">Monthly</option>
                              <option value="2">Weekly</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer align-items-center">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Discard
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- /Set Reminder --> */}

            {/* <!-- Add Category --> */}
            <div
              id="add_new_cat"
              className="modal fade"
              tabindex="-1"
              role="dialog"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered modal-sm"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-body">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                    <h6 className="text-uppercase fw-bold mb-3">
                      Add Category
                    </h6>
                    <form>
                      <div className="row gx-3">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Category Name"
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary float-end"
                        data-bs-dismiss="modal"
                      >
                        Add
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- /Add Category --> */}
          </div>
        </div>
        {/* <!-- /Page Body --> */}
      </div>
      {/* <!-- /Main Content --> */}
    </div>
  );
};

export default CalenderContent;
