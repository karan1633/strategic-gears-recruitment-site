import { useState } from "react";

const Filter = () => {
  // const [tableState, setTableState] = useState([{id:1,net_wt:"", gross_wt:"", kundan_wt:""}]);
  return (
    <div className="">
      <p className="d-flex justify-content-center align-items-center">
        You have no job postings
      </p>
      <a href="#" className="d-flex justify-content-center align-items-center">
        Create Job Posting
      </a>
    </div>
  );
};

export default Filter;
