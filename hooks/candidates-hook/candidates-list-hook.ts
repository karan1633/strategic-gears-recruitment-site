import CandidatesListAPI from "@/services/api/candidates-list-api";
import InterviewRoundsListAPI from "@/services/api/interview-rounds-list-api";
import { get_access_token } from "@/store/slices/token-slice";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useCandidatesHook = () => {
  const [candidatesList, setCandidatesList] = useState<any>([]);
  const [interviewRoundsList, setInterviewRoundsList] = useState<any>([]);
  const { token }: any = useSelector(get_access_token);

  const getCandidatesList = async () => {
    // console.log("token ", token);
    const candidatesList = await CandidatesListAPI(token);
    if (
      candidatesList?.status === 200 &&
      candidatesList?.data?.message?.msg === "success"
    ) {
      setCandidatesList([candidatesList?.data?.message?.data]);
    } else {
      setCandidatesList([]);
    }
    // console.log("candidates list", candidatesList);
  };

  const getInterviewRoundsList = async () => {
    const interviewRoundsListData = await InterviewRoundsListAPI(token);
    if (
      interviewRoundsListData?.status === 200 &&
      interviewRoundsListData?.data?.message?.msg === "success"
    ) {
      setInterviewRoundsList([...interviewRoundsListData?.data?.message?.data]);
    } else {
      setInterviewRoundsList([]);
    }
  };

  useEffect(() => {
    getCandidatesList();
    getInterviewRoundsList();
  }, []);
  return {
    token,
    interviewRoundsList,
    candidatesList,
  };
};

export default useCandidatesHook;
