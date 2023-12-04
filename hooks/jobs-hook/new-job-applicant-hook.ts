import fetchQuestionsList from '@/services/api/new-job-applicant/fetch-questions-list-api';
import fetchJobList from '@/services/api/new-job-applicant/job-listing-api';
import postApplicationFormData from '@/services/api/new-job-applicant/post-form-data-api';
import { CONSTANTS } from '@/services/config/app-config';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { get_access_token } from '@/store/slices/token-slice';
import { useSelector } from 'react-redux';

const useJobApplicantformHook = () => {
  const router = useRouter();
  const { token }: any = useSelector(get_access_token);
  const [questionList, setQuestionsList] = useState<any>([]);
  const [applicationFormDetails, setApplicationFormDetails] = useState({
    version: 'v1',
    entity: 'job_applicant',
    method: 'create_job_applicant',
    applicant_name: '',
    email_id: '',
    phone_number: '',
    company: '',
    country: '',
  });

  const [questionsAnswerList, setQuestionsAnswerList] = useState<any>([]);

  const queryParams = router.query.job_details;
  // const queryParams = router.query;
  console.log('queryParams', queryParams);
  const fetchList = async () => {
    const questionsListdata = await fetchQuestionsList();
    if (
      questionsListdata?.data?.message?.msg === 'success' &&
      questionsListdata?.status === 200
    ) {
      setQuestionsList(questionsListdata?.data?.message?.data);
    }
  };
  useEffect(() => {
    fetchList();
  }, []);
  console.log(questionList, 'questionList ');

  const [jobList, setJobList] = useState<any>([]);
  const getJobsList = async () => {
    const jobsList = await fetchJobList();
    if (
      jobsList?.status === 200 &&
      jobsList?.data?.message?.msg === 'success'
    ) {
      setJobList([...jobsList?.data?.message?.data]);
    } else {
      setJobList([]);
    }
  };

  useEffect(() => {
    getJobsList();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setApplicationFormDetails({ ...applicationFormDetails, [name]: value });
  };
  const handleRadioChange = (e: any, questions: any, i: any, val: any) => {
    let questionsListArr: any = [];
    questionList.map((data: any, index: any) => {
      if (index === i) {
        questionsListArr.push({ question: data.question, answer: val });
      }
    });
    setQuestionsAnswerList([...questionsListArr, ...questionsAnswerList]);
  };

  const [selectedJobTitle, setSelectedJobTitle] = useState('');

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const title = e.target.value;
    const selectedJob = jobList.find((job: any) => job.job_title === title);

    if (selectedJob) {
      setJobList([selectedJob]);
      setSelectedJobTitle(title);
    }
  };

  const handleFormSubmit = async () => {
    const data = {
      // version: 'v1',
      // entity: 'job_applicant',
      // method: 'create_job_applicant',
      job_opening: selectedJobTitle,
      question_answer_list: questionsAnswerList,
      ...applicationFormDetails,
    };

    const applicationFormData = await postApplicationFormData(token, data);

    if (
      applicationFormData.message === 'success' &&
      applicationFormData.status === 200
    ) {
      setSelectedJobTitle(''),
        setQuestionsAnswerList(''),
        setApplicationFormDetails({
          version: 'v1',
          entity: 'job_applicant',
          method: 'create_job_applicant',
          applicant_name: '',
          email_id: '',
          phone_number: '',
          company: '',
          country: '',
        });
    }

    console.error('Unexpected response', applicationFormData);
  };
  return {
    questionList,
    handleFormSubmit,
    handleRadioChange,
    handleChange,
    handleSelectChange,
    queryParams,
    jobList,
  };
};

export default useJobApplicantformHook;
