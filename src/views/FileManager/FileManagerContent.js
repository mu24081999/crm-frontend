import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Alert from "./components/Alert";
import Files from "./components/Files";
import Folders from "./components/Folders";
import QuickAccess from "./components/QuickAccess";
import FileInfo from "./components/FileInfo";
import FileManagerListView from "./FileManagerListView";
import { useDispatch, useSelector } from "react-redux";
import { getFileList } from "../../redux/services/gallery";

const FileManagerContent = () => {
  const [viewToggle, setViewToggle] = useState("List");
  const handleDataFromChild = (data) => {
    setViewToggle(data);
  };
  const dispatch = useDispatch();
  const [filesData, setFilesData] = useState([]);
  const [fileDetailRight, setFileDetailRight] = useState("-370px");
  const [filesDataList, setFilesDataList] = useState([]);
  const { token, user } = useSelector((state) => state.auth);
  const { files, fileDetails } = useSelector((state) => state.gallery);
  useEffect(() => {
    dispatch(getFileList(token));
  }, [dispatch, token]);
  useEffect(() => {
    const filesByDate = files.reduce((acc, file) => {
      const date = file.created_at.split("T")[0]; // Assuming created_at is in ISO 8601 format
      acc[date] = acc[date] || [];
      acc[date].push(file);
      return acc;
    }, {});
    setFilesData(filesByDate);
    setFilesDataList(files);
  }, [files]);
  const handleCssPropertyFromChild = (value) => {
    setFileDetailRight(value);
  };
  return (
    <div className="hk-pg-wrapper pb-0">
      {/* <!-- Page Body --> */}
      <div className="hk-pg-body py-0">
        <div className="fmapp-wrap">
          <Sidebar dispatch={dispatch} token={token} authUser={user} />
          <div className="fmapp-content">
            <div className="fmapp-detail-wrap">
              <Header onDataFromChild={handleDataFromChild} view={viewToggle} />
              {viewToggle === "Grid" ? (
                <div className="fm-body">
                  <div data-simplebar className="nicescroll-bar">
                    <div className="file-card-view">
                      <Alert />
                      <QuickAccess
                        filesData={filesData}
                        token={token}
                        dispatch={dispatch}
                        authUser={user}
                        onDataFromChild={handleCssPropertyFromChild}
                      />
                      {/* <Folders />
                      <Files
                        filesData={filesData}
                        token={token}
                        dispatch={dispatch}
                        authUser={user}
                      />{" "} */}
                    </div>
                  </div>
                </div>
              ) : (
                <FileManagerListView
                  filesDataList={filesDataList}
                  token={token}
                  dispatch={dispatch}
                  authUser={user}
                  onDataFromChild={handleCssPropertyFromChild}
                />
              )}

              <FileInfo
                rightValue={fileDetailRight}
                onDataFromChild={handleCssPropertyFromChild}
                fileDetails={fileDetails}
                authUser={user}
                token={token}
                dispatch={dispatch}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Page Body --> */}
    </div>
  );
};

export default FileManagerContent;
