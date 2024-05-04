import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Files from "./components/Files";
import { useDispatch, useSelector } from "react-redux";
import { getFileList } from "../../redux/services/gallery";

const GalleryContent = () => {
  const dispatch = useDispatch();
  const [filesData, setFilesData] = useState([]);
  const { token, user } = useSelector((state) => state.auth);
  const { files } = useSelector((state) => state.gallery);
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
  }, [files]);
  return (
    <div className="hk-pg-wrapper pb-0">
      {/* <!-- Page Body --> */}
      <div className="hk-pg-body py-0">
        <div className="galleryapp-wrap">
          <Sidebar dispatch={dispatch} token={token} authUser={user} />
          <div className="galleryapp-content">
            <div className="galleryapp-detail-wrap">
              <Header />
              <div className="gallery-body">
                <Files
                  filesData={filesData}
                  token={token}
                  dispatch={dispatch}
                  authUser={user}
                />
              </div>
            </div>
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
      </div>
      {/* <!-- /Page Body --> */}
    </div>
  );
};

export default GalleryContent;
