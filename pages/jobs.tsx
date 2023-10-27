import Filter from '@/components/Candidates/Filter';

const Jobs = () => {
  return (
    <div className="row" style={{ backgroundColor: '#f8f9fa', height: '90vh' }}>
      <div className="col-lg-2 mt-3">
        <Filter />
      </div>
      <div className="col-12 col-lg-10"></div>
    </div>
  );
};

export default Jobs;
