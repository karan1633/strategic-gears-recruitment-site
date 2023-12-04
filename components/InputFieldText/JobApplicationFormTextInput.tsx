import React from "react";
import style from "../../styles/new-job-applicant.module.css"
const JobApplicationFormTextInput = ({
  typetext,
  fieldId,
  labelField,
  handleChange,
}: any) => {
  return (
    <>
      <div className="mb-4 row">
        <label
          htmlFor={fieldId}
          className="col-sm-4 col-form-label leverform-label"
        >
          {labelField}
          <span className={`text-danger ${style.display_red}`}>*</span>
        </label>
        <div className="col-sm-8">
          <input
            type={typetext}
            className="form-control joblever-form"
            id={fieldId}
            onChange={handleChange}
            name={fieldId}
          />
        </div>
      </div>
    </>
  );
};

export default JobApplicationFormTextInput;
