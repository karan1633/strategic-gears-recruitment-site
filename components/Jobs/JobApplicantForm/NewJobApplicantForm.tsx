import React, { useState } from 'react';
import style from "../../../styles/new-job-applicant.module.css"
import JobApplicationFormTextInput from '@/components/InputFieldText/JobApplicationFormTextInput';


const NewJobApplicantForm = ({questionList,
  handleFormSubmit,
  handleRadioChange,
  handleChange,
  queryParams}:any) => {
  return (
    <>
    <h6 className={style.h6_text}>SUBMIT YOUR APPLICATION</h6>
    <JobApplicationFormTextInput
      typetext="text"
      fieldId="applicant_name"
      labelField="Full name"
      handleChange={handleChange}
    />
    <JobApplicationFormTextInput
      typetext="email"
      fieldId="email_id"
      labelField="Email"
      handleChange={handleChange}
    />
    <JobApplicationFormTextInput
      typetext="text"
      fieldId="phone_number"
      labelField="Phone"
      handleChange={handleChange}
    />
    <JobApplicationFormTextInput
      typetext="text"
      fieldId="company"
      labelField="Current company"
      handleChange={handleChange}
    />
    <JobApplicationFormTextInput
      typetext="text"
      fieldId="country"
      labelField="Country"
      handleChange={handleChange}
      
    />

    <div className="mb-5">
      {questionList?.map((data: any, i: any) => (
        <>
          <label
            htmlFor="checked"
            className="form-label leverform-label mb-4"
          >
            {data.question}
            <span className={`text-danger ${style.display_red}`}>*</span>
          </label>
          <br />
          {data.answer.map((val: any, index: any) => (
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="radio"
                name={`answer${i + 1}`}
                id={`questions${index + 1}`}
                value={val}
                onChange={(e) => handleRadioChange(e, data.question, i, val)}
              />
              <label
                className="form-check-label radio-label"
                htmlFor={`questions${index + 1}`}
              >
                {val}
              </label>
            </div>
          ))}
        </>
      ))}
    </div>
    
    <div className="btn_container text-center mt-5">
      <button
        className={`btn px-4 py-2 ${style.apply_btn}`}
        onClick={handleFormSubmit}
      >
        APPLY FOR THIS JOB
      </button>
    </div>
  </>
  );
};

export default NewJobApplicantForm;
