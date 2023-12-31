import { useState, useRef } from 'react';
import styles from '../styles/candidate-cards.module.css';
import OffCanvasComponent from '@/components/Offcanvas';
import InterviewModal from '@/components/interview-modal';
import InterviewFeedbackModal from '@/components/interview-feedback-modal';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const CandidateCard = ({
  token,
  activeMainTab,
  skillsList,
  activeNestedTab,
  status,
  content,
  interviewRoundsList,
  updateCandidatesList,
}: any) => {
  const [show, setShow] = useState(false);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [showInterviewFeedbackModal, setShowInterviewFeedbackModal] =
    useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (email: any) => {
    saveCandidateEmailRef.current = email;
    setShow(true);
  };

  const saveCandidateEmailRef = useRef(null);
  const saveInterviewRef = useRef(null);

  const handleInterviewModalOpen = (email: any) => {
    console.log(email);
    setShowInterviewModal(true);
    saveCandidateEmailRef.current = email;
  };
  const handleInterviewFeedbackModalOpen = (name: any) => {
    setShowInterviewFeedbackModal(true);
    saveInterviewRef.current = name;
  };

  const handleInterviewModalClose = () => {
    setShowInterviewModal(false);
  };
  const handleInterviewFeedbackModalClose = () => {
    setShowInterviewFeedbackModal(false);
  };

  const handleSubmit = () => {};

  // console.log('activeMainTab', activeMainTab);
  // console.log('activeNestedTab', activeNestedTab.label);

  return (
    <div>
      {content?.map((content_card: any, index: number) => {
        return (
          <>
            <div className="container  mt-3 mb-3 ">
              <div className=" d-flex justify-content-between align-items-center mt-2">
                <div className={`col-md-4  ${styles.candidate_mob}`}>
                  <p
                    className={`${styles.card_content} ${styles.f6}`}
                    onClick={() => handleShow(content_card?.email_id)}
                  >
                    <span className={`${styles.info_icon} pe-2 `}>
                      <InfoOutlinedIcon />
                    </span>
                    <span className={styles.applicant_name_mob}>
                      {content_card?.applicant_name}
                    </span>
                  </p>
                </div>
                <div
                  className={`col-md-4 d-flex justify-content-center  ${styles.candidate_mob}`}
                >
                  <p className={`${styles.card_content}`}>
                    {content_card?.designation}
                  </p>
                </div>

                <div
                  className={` col-md-4 d-flex justify-content-end ${styles.candidate_mob}`}
                >
                  {activeMainTab?.main_tab === 'Applicant' &&
                  status === 'Open' ? (
                    <button
                      type="button"
                      className={`btn btn-outline-primary   py-1 ${styles.btn_fs} ${styles.btn_mob}`}
                      onClick={() =>
                        handleInterviewModalOpen(content_card?.email_id)
                      }
                    >
                      Schedule
                    </button>
                  ) : activeMainTab?.main_tab === 'Interview' ? (
                    <button
                      type="button"
                      className={`btn btn-outline-primary  ${styles.btn_mob}`}
                      onClick={() =>
                        handleInterviewFeedbackModalOpen(content_card?.name)
                      }
                    >
                      Add Interview Feedback
                    </button>
                  ) : (
                    <div className="">
                      <p className={`${styles.card_content}`}>
                        <i className="fas fa-calendar-alt"></i>{' '}
                        {content_card?.date}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="">
                <p className={`${styles.card_content} ${styles.card_p}`}>
                  {content_card?.description}
                </p>
              </div>
            </div>
            <hr />
          </>
        );
      })}
      {show && (
        <OffCanvasComponent
          show={show}
          token={token}
          candidateMailID={saveCandidateEmailRef.current}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
        />
      )}

      {showInterviewModal && (
        <InterviewModal
          token={token}
          show={showInterviewModal}
          handleClose={handleInterviewModalClose}
          interviewRoundsList={interviewRoundsList}
          candidateMailID={saveCandidateEmailRef.current}
          updateCandidatesList={updateCandidatesList}
        />
      )}
      {showInterviewFeedbackModal && (
        <InterviewFeedbackModal
          token={token}
          show={showInterviewFeedbackModal}
          handleClose={handleInterviewFeedbackModalClose}
          activeNestedTabLabel={activeNestedTab.label}
          interviewID={saveInterviewRef.current}
          skillsList={skillsList}
        />
      )}
    </div>
  );
};

export default CandidateCard;
