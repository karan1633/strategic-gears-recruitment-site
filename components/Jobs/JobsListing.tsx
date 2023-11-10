import JobsCard from '@/cards/jobs-card';
import useJobsListingHook from '@/hooks/jobs-hook';

const JobsListing = () => {
  const { jobsList } = useJobsListingHook();
  return (
    <div
      className={`jobs-section-main`}
      style={{
        backgroundColor: '',
      }}
    >
      <div>
        <h3 className="">Jobs</h3>
      </div>
      <div
        className=""
        style={{
          backgroundColor: '#fff',
          borderRadius: '7px',
          // height: '600px',
          border: '1px solid #ecebe9',
        }}
      >
        {/* <div className="mt-3">test</div> */}
        {jobsList?.length > 0 &&
          jobsList?.map((job: any, index: number) => {
            return (
              <div key={index} className="mt-3">
                <JobsCard
                  job_title={job?.job_title}
                  department={job?.department}
                  no_of_openings={job?.no_of_openings}
                  company={job?.company}
                  designation={job?.designation}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default JobsListing;
