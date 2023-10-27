import InterviewRoundsListAPI from "@/services/api/interview-rounds-list-api";
import { get_access_token } from "@/store/slices/token-slice";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useInterviewRoundsList = () => {
  const { token }: any = useSelector(get_access_token);

  const [interviewRoundsList, setInterviewRoundsList] = useState<any>([]);

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
    getInterviewRoundsList();
  }, []);
  return { interviewRoundsList };
};

export default useInterviewRoundsList;
