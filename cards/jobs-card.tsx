import Link from 'next/link';
import style from '../styles/jobs-card.module.css';

const JobsCard = ({
  job_title,
  department,
  no_of_openings,
  company,
  designation,
}: any) => {
  return (
    <div className={` px-3`}>
      <div
        className="d-flex justify-content-between px-2 "
        style={{ borderBottom: '1px solid gray' }}
      >
        <div className="">
          <div className="">
            <div className="">
              <Link
                href={`/candidates?filter=${job_title}`}
                // target="_blank"
                className={` ${style.title} ${style.job_card_main}`}
              >
                {job_title}
              </Link>
            </div>
            <div>
              <p className={`${style.m_0}`}>{designation}</p>
              <p>{department}</p>
            </div>
          </div>
        </div>
        <div className="d-flex">
          <p className={`${style.mr_4} ${style.fw7}`}>{no_of_openings}</p>
          <p>Opportunities</p>
        </div>
      </div>
    </div>
  );
};

export default JobsCard;
