import Filter from '@/components/Candidates/Filter';
import CandidatesListing from '@/components/Candidates/CandidatesListing';
import useInterviewRoundsList from '@/hooks/candidates-hook/interview-rounds-list-hook';
import { useSelector } from 'react-redux';
import { get_access_token } from '@/store/slices/token-slice';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Candidates = () => {
  const router = useRouter();
  const { token }: any = useSelector(get_access_token);
  const [content, setContent] = useState<JSX.Element | null>(null);

  useEffect(() => {
    if (token === '') {
      router.push('/login');
    } else {
      return setContent(
        <div
          className="row m-0"
          style={{ backgroundColor: '#f8f9fa', height: '90vh' }}
        >
          <div className="col-lg-2 mt-3">
            <Filter />
          </div>

          <div className="col-12 col-lg-10 mt-3">
            <CandidatesListing />
          </div>
        </div>
      );
    }
  }, [token, router]);

  return content;
};

export default Candidates;
