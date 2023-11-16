import Filter from '@/components/Candidates/Filter';
import JobsListing from '@/components/Jobs/JobsListing';
import { get_access_token } from '@/store/slices/token-slice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const Jobs = () => {
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
          style={{ backgroundColor: '#f8f9fa', height: '' }}
        >
          <div className="col-12 col-lg-2 mt-3">
            <Filter />
          </div>
          <div className="col-12 col-lg-10 mt-3">
            <JobsListing />
          </div>
        </div>
      );
    }
  }, [token, router]);

  return content;
};

export default Jobs;
