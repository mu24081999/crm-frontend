// export default Pagination;
import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import "./paginate.css";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";

// function Items({ currentItems }) {
//   return (
//     <>
//       {currentItems &&
//         currentItems.map((item, index) => (
//           <div key={index}>
//             <h3>Item #{item.id}</h3>
//           </div>
//         ))}
//     </>
//   );
// }
// Function to deep compare two arrays
const arraysEqual = (arr1, arr2) => {
  if (arr1?.length !== arr2?.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
};

function Pagination({ itemsPerPage, items, dataFromChild }) {
  const prevItems = useRef();

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);
  console.log(
    prevItems.current,
    currentItems,
    currentItems !== prevItems.current
  );
  // Invoke when user clicks to request another page.
  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    console.log(
      `User requested page number ${
        event.selected + 1
      }, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
    dataFromChild(currentItems);
  };
  useEffect(() => {
    const fetchData = async () => {
      // Simulate an API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (!arraysEqual(currentItems, prevItems.current)) {
        dataFromChild(currentItems);
        // Update the previous items reference
        prevItems.current = currentItems;
      }
    };
    fetchData();
  }, [currentItems, prevItems, dataFromChild]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          boxSizing: "border-box",
          // width: "max-content",
          width: "100%",
          height: "100px",
          // border: "1px solid teal",
        }}
      >
        {/* <Items currentItems={currentItems} /> */}

        <ReactPaginate
          breakClassName={"item break-me "}
          containerClassName={"d-flex justify-content-center"}
          disabledClassName={"disabled-page"}
          marginPagesDisplayed={2}
          nextClassName={"arrows btn btn-light "}
          pageClassName={"item pagination-page "}
          previousClassName={"arrows btn btn-light"}
          nextLabel={<FaGreaterThan />}
          previousLabel={<FaLessThan />}
          breakLabel="..."
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          //   previousLabel={
          //     <img src={backImg} style={{ fontSize: 18, width: 50 }} />
          //   }
          renderOnZeroPageCount={null}
          activeClassName="pagination_active"
        />
        {/* <p style={{ textAlign: "center", width: "100%", fontSize: "18px" }}>
          Loading items from {itemOffset + 1} to {endOffset} out of{" "}
          {items.length}
        </p> */}
      </div>
    </>
  );
}

export default Pagination;
