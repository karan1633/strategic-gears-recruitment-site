import { get_access_token } from '@/store/slices/token-slice';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import JobsListAPI from '@/services/api/jobs-list-api';

const useJobsListingHook = () => {
  const router = useRouter();
  const { token }: any = useSelector(get_access_token);

  const [jobsList, setJobsList] = useState<any>([]);

  const getJobsList = async () => {
    const jobsList = await JobsListAPI(token);
    if (
      jobsList?.status === 200 &&
      jobsList?.data?.message?.msg === 'success'
    ) {
      setJobsList([...jobsList?.data?.message?.data]);
    } else {
      setJobsList([]);
    }
  };

  useEffect(() => {
    getJobsList();
  }, []);

  return {
    jobsList,
  };
};

export default useJobsListingHook;
