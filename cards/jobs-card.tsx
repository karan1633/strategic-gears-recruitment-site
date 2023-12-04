import Link from 'next/link';
import style from '../styles/jobs-card.module.css';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const JobsCard = ({
  job_name,
  job_title,
  department,
  no_of_openings,
  company,
  designation,
}: any) => {
  // const tooltips = document.querySelectorAll('[data-toggle="tooltip"]');
  // tooltips.forEach((tooltip) => {
  //   {`$('[data-toggle="tooltip"]').tooltip()`};
  // });

  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      job title
    </Tooltip>
  );

  const renderTooltipDesignation = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      designation
    </Tooltip>
  );

  const renderTooltipDepartment = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      department
    </Tooltip>
  );

  return (
    <div className={` px-3`}>
      <div
        className={`d-flex justify-content-between px-2  ${style.border_bottom}`}
      >
        <div className={`row w-100 p-0 m-0`}>
          <div className="col-md-4">
            <Link
              href={`/candidates?filter=${job_name}`}
              // target="_blank"
              className={` ${style.title} ${style.job_card_main}`}
            >
              <OverlayTrigger
                placement="left"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
              >
                <span
                  className={`${style.info_icon} pe-2`}
                  // data-toggle="tooltip"  data-placement="right" title="job title"
                >
                  <InfoOutlinedIcon />
                </span>
              </OverlayTrigger>
              <span className={style.job_title}>{job_title}</span>
            </Link>
          </div>
          <div className="col-md-4">
            <OverlayTrigger
              placement="left"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltipDesignation}
            >
              <span className={`${style.info_icon} pe-2 `} title="designation">
                <InfoOutlinedIcon />
              </span>
            </OverlayTrigger>
            <span className={`${style.m_0} ${style.job_title} `}>
              {designation}
            </span>
          </div>
          <div className="col-md-4">
            {department && (
              <OverlayTrigger
                placement="left"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltipDepartment}
              >
                <span className={`${style.info_icon} pe-2 `}>
                  <InfoOutlinedIcon />
                </span>
              </OverlayTrigger>
            )}
            <span className={` ${style.job_title}`}>{department}</span>
          </div>
        </div>
        <div className={`d-flex ${style.opportunities_wrapper}`}>
          <p
            className={`${style.mr_4} ${style.fw7} ${style.job_title} ${
              no_of_openings === 0 ? style.red_text : style.blue_text
            }`}
          >
            {no_of_openings}
          </p>
          <p
            className={`${
              no_of_openings === 0 ? style.red_text : style.blue_text
            }`}
          >
            Opportunities
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobsCard;
