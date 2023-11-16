import Filter from '@/components/Candidates/Filter';
import JobsListing from '@/components/Jobs/JobsListing';

const Jobs = () => {
  return (
    <div className="row m-0" style={{ backgroundColor: '#f8f9fa', height: '' }}>
      <div className="col-12 col-lg-2 mt-3">
        <Filter />
      </div>
      <div className="col-12 col-lg-10 mt-3">
        <JobsListing />
      </div>
    </div>
  );
};

export default Jobs;
