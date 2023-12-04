import CandidatesListAPI from '@/services/api/candidates-list-api';
import InterviewRoundsListAPI from '@/services/api/interview-rounds-list-api';
import { get_access_token } from '@/store/slices/token-slice';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import SkillsListAPI from '@/services/api/skills-list-api';

const useCandidatesHook = () => {
  const router = useRouter();
  const { filter } = router.query;
  const [candidatesList, setCandidatesList] = useState<any>([]);
  const [interviewRoundsList, setInterviewRoundsList] = useState<any>([]);
  const [skillsList, setSkillsList] = useState<any>([]);
  const { token }: any = useSelector(get_access_token);

  const [updateList, setUpdateList] = useState(0);
  // console.log('job filter ', filter);

  const getCandidatesList = async () => {
    const candidatesList = await CandidatesListAPI(token, filter);
    if (
      candidatesList?.status === 200 &&
      candidatesList?.data?.message?.msg === 'success'
    ) {
      setCandidatesList([...candidatesList?.data?.message?.data]);
    } else {
      setCandidatesList([]);
    }
    // console.log('candidates list', candidatesList);
  };

  const getInterviewRoundsList = async () => {
    const interviewRoundsListData = await InterviewRoundsListAPI(token);
    if (
      interviewRoundsListData?.status === 200 &&
      interviewRoundsListData?.data?.message?.msg === 'success'
    ) {
      setInterviewRoundsList([...interviewRoundsListData?.data?.message?.data]);
    } else {
      setInterviewRoundsList([]);
    }
  };

  const getSkillsList = async () => {
    const skillsListData = await SkillsListAPI(token);
    if (
      skillsListData?.status === 200 &&
      skillsListData?.data?.message?.msg === 'success'
    ) {
      setSkillsList([...skillsListData?.data?.message?.data]);
    } else {
      setSkillsList([]);
    }
  };

  useEffect(() => {
    getCandidatesList();
    getInterviewRoundsList();
    getSkillsList();
  }, [router, updateList]);
  return {
    token,
    interviewRoundsList,
    skillsList,
    candidatesList,
    updateList,
    setUpdateList,
  };
};

export default useCandidatesHook;
