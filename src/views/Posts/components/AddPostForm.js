import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../components/FormFields/InputField";
import EditorField from "../../../components/FormFields/Editor";
import DatePickerFeild from "../../../components/FormFields/datePickerField";
import moment from "moment";
import ReactSelectField from "../../../components/FormFields/reactSelectField";
import ReactTagInputComponent from "../../../components/FormFields/reactTagInputComponent";
import { storePost, updatePostRec } from "../../../redux/services/post";

const AddPostForm = ({ authUser, dispatch, token, postDetails }) => {
  const {
    handleSubmit,
    // watch,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({});
  const handleFileChange = (event) => {
    setValue("slider_images", event.currentTarget.files);
  };
  const handlePreviewImage = (event) => {
    console.log(
      "🚀 ~ handlePreviewImage ~ event:",
      event.currentTarget.files[0]
    );
    setValue("preview_image", event.currentTarget.files);
  };
  useEffect(() => {
    if (postDetails) {
      setValue("category", {
        label: postDetails?.category,
        value: postDetails?.category,
      });
      setValue("permalink", postDetails?.permalink);
      setValue("post_content", postDetails?.post_content);
      setValue("title", postDetails?.title);
      setValue(
        "publish_date",
        moment(postDetails?.publish_date).format("YYYY-MM-DD")
      );
      // setValue("tags", postDetails?.tags?.tags);
      // setValue("preview_image", postDetails?.preview_image);
      // setValue("slider_image", postDetails?.slider_images);
      setValue("visibility", {
        label: postDetails?.visibility,
        value: postDetails?.visibility,
      });
      setValue("status", {
        label: postDetails?.status,
        value: postDetails?.status,
      });
      setValue("post_type", {
        label: postDetails?.post_type,
        value: postDetails?.post_type,
      });
    } else {
      reset();
    }
  }, [postDetails, setValue, reset]);
  const handleAddPost = (data) => {
    console.log("🚀 ~ handleAddPost ~ data:", data);
    const formData = new FormData();
    data?.category && formData.append("category", data.category.value);
    data?.permalink && formData.append("permalink", data.permalink);
    data?.post_content && formData.append("post_content", data.post_content);
    data?.post_type && formData.append("post_type", data.post_type.value);
    data?.preview_image &&
      data?.preview_image?.forEach((file) => {
        formData.append("preview_image", file);
      });
    data?.publish_date && formData.append("publish_date", data.publish_date);
    data?.slider_images &&
      data?.slider_images?.forEach((element) => {
        formData.append("slider_images", element);
      });
    data?.tags &&
      data?.tags?.forEach((element) => {
        formData.append("tags", element);
      });
    data?.title && formData.append("title", data.title);
    data?.visibility && formData.append("visibility", data.visibility.value);
    data?.status && formData.append("status", data.status.value);
    formData.append("user_id", authUser.id);
    formData.append("user_name", authUser.name);
    formData.append("user_image", authUser.avatar);
    if (postDetails) {
      dispatch(updatePostRec(token, postDetails?.id, formData));
    } else {
      dispatch(storePost(token, formData));
    }
    return {};
  };
  return (
    <form className="edit-post-form" onSubmit={handleSubmit(handleAddPost)}>
      <div className="row">
        <div className="col-xxl-9 col-lg-8">
          {/* <div className="form-group">
            <label className="form-label">Post Title</label>
            <input className="form-control" placeholder="Post Title" />
          </div> */}
          <InputField
            name="title"
            placeholder="Enter post title"
            label="Post Title"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Field required!",
              },
            }}
            errors={errors}
          />
          {/* <div className="form-group">
            <label className="form-label">Permalink</label>
            <input className="form-control" placeholder="Permalink" />
          </div> */}
          <InputField
            name="permalink"
            placeholder="Permalink"
            label="Permalink"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Field required!",
              },
            }}
            errors={errors}
          />
          <EditorField
            name="post_content"
            placeholder="Post Content"
            label="Post Content"
            control={control}
            type={postDetails ? "edit" : ""}
            rules={{
              required: {
                value: true,
                message: "Field required!",
              },
            }}
            errors={errors}
          />
          <div className="card card-border advance-option-post">
            <div className="card-body">
              <h5 className="card-title">Advance Option</h5>
              <ul className="nav nav-tabs nav-line nav-icon nav-light border-bottom">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-bs-toggle="tab"
                    href="/tab_summery"
                  >
                    <span className="nav-icon-wrap">
                      <span className="feather-icon">
                        <i data-feather="zap"></i>
                      </span>
                    </span>
                    <span className="nav-link-text">Post Slider Images</span>
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div className="tab-pane fade show active" id="tab_summery">
                  {/* <input type="file" className="dropify" /> */}
                  <div>
                    <div class="mb-4 d-flex justify-content-center p-5">
                      <div className="text-center">
                        <img
                          id="selectedImage"
                          src="https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118928_960_720.png"
                          alt="example placeholder"
                          style={{ width: "50px" }}
                        />
                        <br />
                        <br />
                        <span>Upload Files</span>
                      </div>
                    </div>
                    <div class="d-flex justify-content-center">
                      <div class="btn btn-primary btn-rounded">
                        <label
                          class="form-label text-white m-1"
                          for="customFile1"
                        >
                          Choose file
                        </label>
                        <input
                          type="file"
                          class="form-control d-none"
                          id="customFile1"
                          multiple
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {postDetails && (
                <div class="tab-content">
                  <div class="tab-pane fade show active" id="tab_summery">
                    <div class="row row-sm row-cols-xl-6 row-cols-lg-3 row-cols-sm-2 row-cols-1 uploaded-img-prev">
                      {postDetails?.slider_images?.images?.length > 0 &&
                        postDetails?.slider_images?.images?.map(
                          (image, index) => (
                            <div class="col" key={index}>
                              <a href="#">
                                <div
                                  class="card card-border"
                                  // style="background-image:url('dist/img/gallery/mock1.jpg');"
                                >
                                  <img
                                    src={image.image_url}
                                    alt={postDetails.id}
                                    className="img-fluid"
                                  />
                                </div>
                              </a>
                            </div>
                          )
                        )}
                      {/* <div class="col">
                        <a href="#">
                          <div
                            class="card card-border"
                            // style="background-image:url('dist/img/gallery/mock2.jpg');"
                          ></div>
                        </a>
                      </div>
                      <div class="col">
                        <a href="#">
                          <div
                            class="card card-border"
                            // style="background-image:url('dist/img/gallery/mock3.jpg');"
                          ></div>
                        </a>
                      </div>
                      <div class="col">
                        <a href="#">
                          <div
                            class="card card-border"
                            // style="background-image:url('dist/img/gallery/mock4.jpg');"
                          ></div>
                        </a>
                      </div>
                      <div class="col">
                        <a href="#">
                          <div
                            class="card card-border"
                            // style="background-image:url('dist/img/gallery/mock5.jpg');"
                          ></div>
                        </a>
                      </div>
                      <div class="col">
                        <a href="#">
                          <div
                            class="card card-border"
                            // style="background-image:url('dist/img/gallery/mock6.jpg');"
                          ></div>
                        </a>
                      </div> */}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-lg-4">
          <div className="content-aside">
            <button className="btn btn-primary btn-block mb-3" type="submit">
              Publish
            </button>
            <div className="card card-border">
              <div className="card-body">
                <DatePickerFeild
                  name="publish_date"
                  placeholder="Publish Date"
                  label="Publish Date"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Field required!",
                    },
                  }}
                  errors={errors}
                />
                <ReactSelectField
                  name="visibility"
                  placeholder="Visibility"
                  label="Visibility"
                  control={control}
                  options={[
                    {
                      label: "Public",
                      value: "public",
                    },
                    {
                      label: "Private",
                      value: "private",
                    },
                  ]}
                  rules={{
                    required: {
                      value: true,
                      message: "Field required!",
                    },
                  }}
                  errors={errors}
                />
                <ReactSelectField
                  name="status"
                  placeholder="Status"
                  label="Status"
                  control={control}
                  options={[
                    {
                      label: "Publish",
                      value: "published",
                    },
                    {
                      label: "Archive",
                      value: "archived",
                    },
                    {
                      label: "Draft",
                      value: "draft",
                    },
                    {
                      label: "Publish",
                      value: "published",
                    },
                    {
                      label: "Block",
                      value: "blocked",
                    },
                  ]}
                  rules={{
                    required: {
                      value: true,
                      message: "Field required!",
                    },
                  }}
                  errors={errors}
                />
                <ReactSelectField
                  name="category"
                  placeholder="Category"
                  label="Category"
                  control={control}
                  options={[
                    {
                      label: "Design",
                      value: "design",
                    },
                    {
                      label: "Development",
                      value: "development",
                    },
                    {
                      label: "Technology",
                      value: "technology",
                    },
                    {
                      label: "Business",
                      value: "business",
                    },
                    {
                      label: "Social Media",
                      value: "social media",
                    },
                    {
                      label: "Sport",
                      value: "sport",
                    },
                    {
                      label: "Writing",
                      value: "writing",
                    },
                  ]}
                  rules={{
                    required: {
                      value: true,
                      message: "Field required!",
                    },
                  }}
                  errors={errors}
                />
              </div>
            </div>
            <div className="card card-border overflow-hidden">
              <div className="card-header card-header-action">
                <a
                  role="button"
                  data-bs-toggle="collapse"
                  href="/tags_1"
                  aria-expanded="true"
                >
                  <h6 className="mb-0">Add Tags(Upto 5)</h6>
                </a>
                <div className="card-action-wrap">
                  <a
                    className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover"
                    data-bs-toggle="collapse"
                    href="/tags_1"
                    aria-expanded="true"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="chevron-down"></i>
                      </span>
                    </span>
                  </a>
                </div>
              </div>
              <div id="tags_1" className="collapse show">
                <div className="card-body">
                  <ReactTagInputComponent
                    name="tags"
                    placeholder="Tags"
                    label="Tags"
                    control={control}
                    // rules={{
                    //   required: {
                    //     value: true,
                    //     message: "Field required!",
                    //   },
                    // }}
                    errors={errors}
                  />
                </div>
              </div>
            </div>
            <div className="card card-border overflow-hidden">
              <div className="card-header card-header-action">
                <a
                  role="button"
                  data-bs-toggle="collapse"
                  href="/post_1"
                  aria-expanded="true"
                >
                  <div className="d-flex align-items-center">
                    <h6 className="me-2 mb-0">Post type</h6>
                    <span
                      className="btn btn-xs btn-icon btn-rounded btn-light"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title=""
                      data-bs-original-title="Add Category"
                    >
                      <span className="icon">
                        <span className="feather-icon">
                          <i data-feather="plus"></i>
                        </span>
                      </span>
                    </span>
                  </div>
                </a>
                <div className="card-action-wrap">
                  <a
                    className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover"
                    data-bs-toggle="collapse"
                    href="/post_1"
                    aria-expanded="true"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="chevron-down"></i>
                      </span>
                    </span>
                  </a>
                </div>
              </div>
              <div id="post_1" className="collapse show">
                <div className="card-body" style={{ height: "300px" }}>
                  <ReactSelectField
                    name="post_type"
                    placeholder="Post Type"
                    label="Post Type"
                    control={control}
                    options={[
                      {
                        label: "Image Post",
                        value: "image post",
                      },
                      {
                        label: "Video Post",
                        value: "video post",
                      },
                      {
                        label: "Quote Post",
                        value: "quote post",
                      },
                      {
                        label: "Gallery Post",
                        value: "gallery post",
                      },
                    ]}
                    rules={{
                      required: {
                        value: true,
                        message: "Field required!",
                      },
                    }}
                    errors={errors}
                  />
                </div>
              </div>
            </div>
            <div className="card card-border overflow-hidden">
              <div className="card-header card-header-action">
                <a
                  role="button"
                  data-bs-toggle="collapse"
                  href="/prev_1"
                  aria-expanded="true"
                >
                  <div className="d-flex align-items-center">
                    <h6 className="me-2 mb-0">Preview Image</h6>
                    <span
                      className="btn btn-xs btn-icon btn-rounded btn-light"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title=""
                      data-bs-original-title="Add Category"
                    >
                      <span className="icon">
                        <span className="feather-icon">
                          <i data-feather="plus"></i>
                        </span>
                      </span>
                    </span>
                  </div>
                </a>
                <div className="card-action-wrap">
                  <a
                    className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover"
                    data-bs-toggle="collapse"
                    href="/prev_1"
                    aria-expanded="true"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="chevron-down"></i>
                      </span>
                    </span>
                  </a>
                </div>
              </div>
              <div id="prev_1" className="collapse show">
                <div className="card-body">
                  <input
                    type="file"
                    className="form-control"
                    onClick={handlePreviewImage}
                  />
                  <div class="col">
                    <a href="#">
                      <div
                        class="card card-border"
                        // style="background-image:url('dist/img/gallery/mock1.jpg');"
                      >
                        <img
                          src={postDetails?.preview_image}
                          alt={postDetails.id}
                          className="img-fluid"
                        />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddPostForm;
