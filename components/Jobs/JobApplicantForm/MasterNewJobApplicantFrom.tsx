import React from 'react';
import style from '../../../styles/new-job-applicant.module.css';
import NewJobApplicantForm from './NewJobApplicantForm';
import useJobApplicantformHook from '@/hooks/jobs-hook/new-job-applicant-hook';

const MasterNewJobApplicationForm = () => {
  const {
    questionList,
    handleFormSubmit,
    handleChange,
    handleRadioChange,
    handleSelectChange,
    queryParams,
    jobList,
  } = useJobApplicantformHook();

  console.log('jobsList', jobList);

  console.log('queryParams', queryParams);
  return (
    <>
      <div className={`container w-50 mt-5 pb-5 ${style.job_from_wrapper}`}>
        {/* <div className="row">
          <div className="row">
            <div className="col-md-6"> */}
        {/* <h1 className={style.h1_font}>It-Manager</h1> */}

        <label className={`${style.select_label} mb-2`}>
          select job opening{' '}
        </label>

        <select
          className={`w-100 py-1 ${style.jobOpening_select}`}
          onChange={handleSelectChange}
        >
          {jobList.map((ele: any, idx: any) => (
            <option key={idx} value={ele.job_title}>
              {ele.job_title}
            </option>
          ))}
        </select>

        {/* </div>
          </div> */}

        {/* <div className="row">
            <p className={style.p_tag}>{jobDetailData.location}</p>
            <p className={style.p_tag}>{jobDetailData.description}</p>
          </div> */}
        {/* </div> */}

        <NewJobApplicantForm
          questionList={questionList}
          queryParams={queryParams}
          handleFormSubmit={handleFormSubmit}
          handleRadioChange={handleRadioChange}
          handleChange={handleChange}
        />
      </div>
    </>
  );
};

export default MasterNewJobApplicationForm;
