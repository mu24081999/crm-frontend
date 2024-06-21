import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserRec } from "../../../redux/services/users";
import { setAccount } from "../../../redux/slices/auth";

const VoiceSettings = ({ user }) => {
  console.log("🚀 ~ VoiceSettings ~ user:", user);
  const [recording, setRecording] = useState(user.recording);
  const { token, user_id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    user_id: user_id,
    recording: 0,
  });

  const handleRecordingOnChange = (e) => {
    setRecording(!recording);

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
  const handleSubmitForm = async () => {
    console.log(formData);
    const is_updated = await dispatch(updateUserRec(token, formData, user_id));
    if (is_updated === true) {
      const newUser = {
        ...user,
        recording: recording,
      };
      dispatch(setAccount(newUser));
    }
  };
  return (
    <div className="tab-pane fade show" id="tab_voice_settings">
      <div className="title title-xs title-wth-divider text-primary text-uppercase my-4">
        <span>The Voice Settings</span>
      </div>
      <div className="d-flex border col-md-4 col-sm-6 justify-content-between px-4 py-2 shadow rounded">
        <div>
          <h6>Auto Call Recording</h6>
        </div>
        <div className="form-check form-switch">
          <input
            type="checkbox"
            name="recording"
            className="form-check-input"
            id="flexSwitchCheckDefault"
            checked={recording}
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
