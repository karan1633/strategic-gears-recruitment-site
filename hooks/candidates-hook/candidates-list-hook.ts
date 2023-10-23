import CandidatesListAPI from "@/services/api/candidates-list-api";
import { get_access_token } from "@/store/slices/token-slice";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useCandidatesHook = () => {
  const [candidatesList, setCandidatesList] = useState<any>([]);
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

  useEffect(() => {
    getCandidatesList();
  }, []);
  return {
    candidatesList,
  };
};

export default useCandidatesHook;
