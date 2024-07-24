import React, { useEffect, useState } from "react";
import InputField from "../../components/FormFields/InputField";

import { useForm } from "react-hook-form";
import { getUserKYCList, storeKyc } from "../../redux/services/kyc";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
  addPlanRateRec,
  readRateRec,
  updatePlanRec,
} from "../../redux/services/plan-rates";
import { FaPlus, FaTrash } from "react-icons/fa";
import {
  readPackage,
  storePackage,
  updatePackageRec,
} from "../../redux/services/package";
import Loader from "../../components/Loader/Loader";
const PlanRateContent = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { token, user_id } = useSelector((state) => state.auth);
  const { planRates } = useSelector((state) => state.plan_rate);
  const { isLoading, packageDetails } = useSelector((state) => state.package);
  const [packageObjects, setPackagesObjects] = useState([
    {
      id: "1",
      name: "",
      price: "",
      discount: "",
      content: [],
    },
  ]);
  useEffect(() => {
    dispatch(readPackage(token, 1));
  }, [dispatch, token]);
  useEffect(() => {
    if (packageDetails?.id) {
      const packages =
        packageDetails?.packages &&
        JSON.parse(packageDetails?.packages)?.packagesDetails;
      setPackagesObjects(packages);
      packages?.map((pac) => {
        setValue(`package-name-${pac.id}`, pac.name);
        setValue(`package-price-${pac.id}`, pac.price);
        setValue(`package-discount-${pac.id}`, pac.discount);
        pac?.content?.map((content, index) => {
          setValue(`content-${pac.id}-${index}`, content);
        });
      });
    }
  }, [packageDetails, setValue]);
  const handleAddContent = (objId) => {
    setPackagesObjects((prevObj) =>
      prevObj?.map((obj) =>
        obj.id === objId
          ? { ...obj, content: [...obj.content, "Package Content"] }
          : obj
      )
    );
  };
  const handleRemoveContent = (objId, index) => {
    setPackagesObjects((prevObj) =>
      prevObj.map((obj) =>
        obj.id === objId
          ? {
              ...obj,
              content: obj.content.filter((_, i) => i !== index),
            }
          : obj
      )
    );
  };
  const handleChangeContent = (objId, index, newValue) => {
    setPackagesObjects((prevObj) =>
      prevObj.map((obj) =>
        obj.id === objId
          ? {
              ...obj,
              content: obj.content.map((item, i) =>
                i === index ? newValue : item
              ),
            }
          : obj
      )
    );
  };
  useEffect(() => {
    dispatch(readRateRec(token, 1));
  }, [dispatch, token]);
  useEffect(() => {
    if (planRates) {
      setValue("starter", planRates?.starter);
      setValue("growth", planRates?.growth);
      setValue("enterprise", planRates?.enterprise);
    }
  }, [planRates, setValue]);
  const handleAddRates = (data) => {
    const formData = {
      starter: data.starter,
      growth: data.growth,
      enterprise: data.enterprise,
      user_id: user_id,
    };
    if (planRates?.id !== undefined)
      return dispatch(updatePlanRec(token, planRates?.id, formData));
    else return dispatch(addPlanRateRec(token, formData));
  };
  const handleChangePackageName = (object, packageName) => {
    setPackagesObjects((prevObjects) =>
      prevObjects.map((obj) =>
        obj.id === object.id ? { ...obj, name: packageName } : obj
      )
    );
  };
  const handleChangePackagePrice = (object, price) => {
    setPackagesObjects((prevObjects) =>
      prevObjects.map((obj) =>
        obj.id === object.id ? { ...obj, price: price } : obj
      )
    );
  };
  const handleChangePackageDiscount = (object, discount) => {
    setPackagesObjects((prevObjects) =>
      prevObjects.map((obj) =>
        obj.id === object.id ? { ...obj, discount: discount } : obj
      )
    );
  };
  const handleAddPackage = () => {
    const newObj = {
      id: packageObjects?.length + 1,
      content: [],
    };
    setPackagesObjects([...packageObjects, newObj]);
  };
  const handleRemoveObject = (objId) => {
    setPackagesObjects((prevObject) =>
      prevObject?.filter((obj) => obj.id !== objId)
    );
  };
  const addPackageDetails = () => {
    if (packageDetails?.id)
      dispatch(
        updatePackageRec(token, packageDetails?.id, {
          packages: {
            packagesDetails: packageObjects,
          },
          user_id: user_id,
        })
      );
    else
      dispatch(
        storePackage(token, {
          packages: {
            packagesDetails: packageObjects,
          },
          user_id: user_id,
        })
      );
  };
  return (
    // <div className="container">
    //   <div className="card" style={{ margin: "7% 15% 7% 15%" }}>
    //     <div className="card-header bg-primary">
    //       <div className="card-title" style={{ color: "white" }}>
    //         Plan Rate Setting
    //       </div>
    //     </div>
    //     <div className="card-body">
    //       <div className="form">
    //         <form onSubmit={handleSubmit(handleAddRates)}>
    //           <div className="row">
    //             <div className="col-md-4 col-sm-6">
    //               <InputField
    //                 name="starter"
    //                 errors={errors}
    //                 control={control}
    //                 label="Starter"
    //                 placeholder="Starter plan rate"
    //               />
    //             </div>

    //             <div className="col-md-4 col-sm-6">
    //               <InputField
    //                 name="growth"
    //                 errors={errors}
    //                 control={control}
    //                 label="Growth"
    //                 placeholder="Growth plan rate"
    //               />
    //             </div>
    //             <div className="col-md-4 col-sm-6">
    //               <InputField
    //                 name="enterprise"
    //                 errors={errors}
    //                 control={control}
    //                 label="Enterprise"
    //                 placeholder="Enterprise plan rate"
    //               />
    //             </div>
    //           </div>
    //           <div className=" float-end">
    //             <button className="btn btn-primary">Submit</button>
    //           </div>
    //         </form>
    //         <form>

    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="hk-pg-wrapper pb-0">
      {/* <!-- Page Body --> */}
      <div className="hk-pg-body py-0">
        <div className="contactapp-wrap">
          <div className="border border-1 rounded">
            <header className="taskboard-header pt-3 pb-2 px-4">
              <div className="d-flex justify-content-between">
                <div className="taskboardapp-title link-dark" href="/">
                  <h3>Packages</h3>
                </div>
                <div className="">
                  <button
                    className="btn btn-primary"
                    onClick={addPackageDetails}
                  >
                    Submit
                  </button>
                </div>{" "}
              </div>
            </header>
          </div>
          <div className="contactapp-content" style={{ width: "100%" }}>
            {isLoading ? (
              <div className="w-100">
                <Loader />
              </div>
            ) : (
              <div
                className="d-flex gap-5 w-100 p-5"
                style={{ overflow: "scroll" }}
              >
                {packageObjects?.length > 0 &&
                  packageObjects?.map((obj, index) => (
                    <div
                      className="card rouded shadow col-md-3 "
                      style={{ height: "max-content" }}
                      key={index}
                    >
                      <div className="card-header bg-primary">
                        <div className="card-title text-white">
                          Package Details
                        </div>
                        <span
                          className="col-1 p-2 btn btn-icon btn-sm mt-2 btn-danger"
                          onClick={() => handleRemoveObject(obj.id)}
                        >
                          <FaTrash className="mb-2" />
                        </span>
                      </div>
                      <div className="card-body">
                        <div className="col-sm-12">
                          <InputField
                            name={`package-name-${obj.id}`}
                            placeholder="Name"
                            label="Package Name"
                            control={control}
                            onChange={(e) =>
                              handleChangePackageName(obj, e.target.value)
                            }
                            rules={{
                              required: {
                                value: true,
                                message: "Field required!",
                              },
                            }}
                            errors={errors}
                          />
                        </div>
                        <div className="col-sm-12">
                          <InputField
                            name={`package-price-${obj.id}`}
                            placeholder="Price"
                            label="Package Price"
                            control={control}
                            onChange={(e) =>
                              handleChangePackagePrice(obj, e.target.value)
                            }
                            rules={{
                              required: {
                                value: true,
                                message: "Field required!",
                              },
                            }}
                            errors={errors}
                          />
                        </div>
                        <div className="col-sm-12">
                          <InputField
                            name={`package-discount-${obj.id}`}
                            placeholder="Price"
                            type="number"
                            label="Yearly Discount Percentage"
                            control={control}
                            onChange={(e) =>
                              handleChangePackageDiscount(obj, e.target.value)
                            }
                            rules={{
                              required: {
                                value: true,
                                message: "Field required!",
                              },
                            }}
                            errors={errors}
                          />
                        </div>
                        <div className="title title-xs title-wth-divider text-primary text-uppercase my-4">
                          <span>Package Content</span>
                        </div>
                        <div className="">
                          {obj.content?.length > 0 ? (
                            obj.content?.map((content, index) => (
                              <div className="col-12 d-flex gap-2" key={index}>
                                <div className="col-11 py-2">
                                  <InputField
                                    name={`content-${obj.id}-${index}`}
                                    placeholder="Content Name"
                                    // label="Name"
                                    onChange={(e) =>
                                      handleChangeContent(
                                        obj.id,
                                        index,
                                        e.target.value
                                      )
                                    }
                                    mb={true}
                                    control={control}
                                    rules={{
                                      required: {
                                        value: true,
                                        message: "Field required!",
                                      },
                                    }}
                                    errors={errors}
                                  />
                                </div>
                                <span
                                  className="col-1 p-2 btn btn-icon btn-sm mt-2 btn-danger"
                                  onClick={() =>
                                    handleRemoveContent(obj.id, index)
                                  }
                                >
                                  <FaTrash className="mb-2" />
                                </span>
                              </div>
                            ))
                          ) : (
                            <p>No content added</p>
                          )}
                        </div>
                        <div className=" py-2">
                          <button
                            onClick={() => handleAddContent(obj.id)}
                            type="button"
                            className="btn btn-icon btn-primary btn-xs mb-2"
                          >
                            <span>
                              <FaPlus />
                            </span>{" "}
                          </button>
                          <span
                            className="text-primary"
                            style={{ fontSize: "13px" }}
                          >
                            {" "}
                            Add Content
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                <div
                  className="col-md-3 d-flex justify-content-center border rounded"
                  style={{ height: "100px" }}
                >
                  <div
                    className="my-auto border border-primary p-3 rounded"
                    style={{ cursor: "pointer" }}
                    onClick={handleAddPackage}
                  >
                    <p className="text-primary">Add Package</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanRateContent;
