// import React from "react";
// import "./loader.css";

// const Loader = () => {
//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         padding: "5%",
//         background: "rgb(0,0,0,0.5)",
//       }}
//     >
//       <span className="loader"></span>
//     </div>
//   );
// };

// export default Loader;
import React from "react";
import { BallTriangle } from "react-loader-spinner";

const Loader = () => {
  return (
    // <div className="d-flex justify-content-around w-100 h-100">
    //   <BallTriangle
    //     height={100}
    //     width={70}
    //     radius={5}
    //     color="#007D88"
    //     ariaLabel="ball-triangle-loading"
    //     wrapperStyle={{}}
    //     wrapperClass=""
    //     visible={true}
    //   />
    // </div>
    <div class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
