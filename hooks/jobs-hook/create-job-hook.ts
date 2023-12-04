import DesignationsListAPI from '@/services/api/designations-list-api';
import jobOpeningAPI from '@/services/api/job-opening-api';
import QuestionsListAPI from '@/services/api/questions-list-api';
import { CONSTANTS } from '@/services/config/app-config';
import { get_access_token } from '@/store/slices/token-slice';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useCreateJobOpening = () => {
  const [designationsList, setDesignationList] = useState<any>([]);
  const [questionsListData, setQuestionsListData] = useState<any>([]);
  const { token }: any = useSelector(get_access_token);
  const [questionList, setQuestionList] = React.useState<string[]>([]);
  const [createJobOpening, setCreateJobOpening] = useState({
    version: CONSTANTS.VERSION,
    method: 'create_job_opening',
    entity: 'job_details',
    job_title: '',
    designation: '',
    company: 'Strategic Gears',
    custom_location: '',
    custom_location_type: '',
    custom_work_type: '',
  });

  const [candidateSkills, setCandidateSkills] = useState<any>('');
  const [candidateSkillsData, setCandidateSkillsData] = useState<any>([]);
  const [candidateQualification, setCandidateQualifications] =
    useState<any>('');
  const [candidateQualificationData, setCandidateQualificationData] =
    useState<any>([]);
  const getDesignationsListFromAPI = async () => {
    const getDesignationData = await DesignationsListAPI(token);
    if (
      getDesignationData?.status === 200 &&
      getDesignationData?.data?.message?.msg === 'success'
    ) {
      let designationList: string[] = [];
      if (getDesignationData?.data?.message?.data?.length > 0) {
        designationList = getDesignationData?.data?.message?.data?.map(
          (designation: any) => ({
            label: designation?.name,
            value: designation?.name,
          })
        );
        setDesignationList([...designationList]);
      } else {
        setDesignationList([]);
      }
    } else {
      setDesignationList([]);
    }
  };
  const getQuestionListAPI = async () => {
    const getQuestionListData = await QuestionsListAPI(token);
    if (
      getQuestionListData?.status === 200 &&
      getQuestionListData?.data?.message?.msg === 'success'
    ) {
      setQuestionsListData(getQuestionListData?.data?.message?.data);
    } else {
      setQuestionsListData([]);
    }
  };
  useEffect(() => {
    getDesignationsListFromAPI();
    getQuestionListAPI();
  }, []);

  const handleSkillChange = (e: any) => {
    const { name, value } = e.target;
    if (name === 'skills') {
      setCandidateSkills(value);
    } else if (name === 'qualifications') {
      setCandidateQualifications(value);
    } else {
      setCandidateSkills('');
      setCandidateQualifications('');
    }
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === 'questions_list') {
      setQuestionList(typeof value === 'string' ? value?.split(',') : value);
    }
    setCreateJobOpening({ ...createJobOpening, [name]: value });
  };
  console.log(questionList, 'personName');
  const handleSubmitValue = (values: any) => {
    if (values === 'skills' && candidateSkills !== '') {
      setCandidateSkillsData([...candidateSkillsData, candidateSkills]);
      setCandidateSkills('');
    } else if (values === 'qualifications' && candidateQualification !== '') {
      setCandidateQualificationData([
        ...candidateQualificationData,
        candidateQualification,
      ]);
      setCandidateQualifications('');
    } else {
    }
  };

  const handleSubmit = async () => {
    const data = {
      ...createJobOpening,
      qualification_list: candidateQualificationData,
      skills_list: candidateSkillsData,
      questions_list: questionList,
    };
    const postJobOpening = await jobOpeningAPI(token, data);
    if (
      postJobOpening.data.message.msg === 'success' &&
      postJobOpening.status === 200
    ) {
      // setCandidateQualificationData([]);
      // setCandidateSkillsData([]);
      setCandidateSkills('');
      setCandidateQualifications('');
      setCreateJobOpening({
        version: CONSTANTS.VERSION,
        method: 'create_job_opening',
        entity: 'job_details',
        job_title: '',
        designation: '',
        company: 'Strategic Gears',
        custom_location: '',
        custom_location_type: '',
        custom_work_type: '',
      });
      setQuestionList([]);
    }
    console.log(postJobOpening, 'candidateSkillsData12');
  };

  console.log(questionsListData, 'questionsList');

  return {
    designationsList,
    questionsListData,
    handleSubmitValue,
    handleChange,
    handleSubmit,
    handleSkillChange,
    questionList,
    candidateSkillsData,
    candidateSkills,
    candidateQualification,
    candidateQualificationData,
    createJobOpening,
  };
};

export default useCreateJobOpening;
