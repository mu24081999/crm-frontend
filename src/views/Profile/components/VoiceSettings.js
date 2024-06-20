import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserRec } from "../../../redux/services/users";

const VoiceSettings = () => {
  const { token, user_id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    user_id: user_id,
    recording: 0,
  });
  const handleRecordingOnChange = (e) => {
    if (e.target.checked) {
      setFormData({
        ...formData,
        recording: 1,
      });
    } else {
      setFormData({
        ...formData,
        recording: 0,
      });
    }
  };
  const handleSubmitForm = () => {
    console.log(formData);
    dispatch(updateUserRec(token, formData, user_id));
  };
  return (
    <div className="tab-pane fade show" id="tab_voice_settings">
      <div className="title title-xs title-wth-divider text-primary text-uppercase my-4">
        <span>The Voice Settings</span>
      </div>
      <div className="d-flex border col-md-4 col-sm-6 justify-content-between px-4 py-2 shadow rounded">
        <div>
          <h6>Recording</h6>
        </div>
        <div className="form-check form-switch">
          <input
            type="checkbox"
            name="recording"
            className="form-check-input"
            id="flexSwitchCheckDefault"
            onChange={handleRecordingOnChange}
          />
        </div>
      </div>
      <div className=" py-4">
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleSubmitForm}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default VoiceSettings;
