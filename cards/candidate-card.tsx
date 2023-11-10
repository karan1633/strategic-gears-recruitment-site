import { useState, useRef } from 'react';
import styles from '../styles/candidate-cards.module.css';
import OffCanvasComponent from '@/components/Offcanvas';
import InterviewModal from '@/components/interview-modal';
import InterviewFeedbackModal from '@/components/interview-feedback-modal';

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
  const handleShow = () => setShow(true);

  const saveCandidateEmailRef = useRef(null);

  const handleInterviewModalOpen = (email: any) => {
    console.log(email);
    setShowInterviewModal(true);
    saveCandidateEmailRef.current = email;
  };
  const handleInterviewFeedbackModalOpen = () => {
    setShowInterviewFeedbackModal(true);
  };

  const handleInterviewModalClose = () => {
    setShowInterviewModal(false);
  };
  const handleInterviewFeedbackModalClose = () => {
    setShowInterviewFeedbackModal(false);
  };

  const handleSubmit = () => {};

  console.log('activeMainTab', activeMainTab);
  console.log('activeNestedTab', activeNestedTab.label);

  return (
    <div>
      {content?.map((content_card: any, index: number) => {
        return (
          <>
            <div className=" mt-3 mb-3">
              <div className="d-flex justify-content-between align-items-center mt-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="">
                    <p
                      className={`${styles.card_content} ${styles.f6}`}
                      onClick={handleShow}
                    >
                      {content_card?.applicant_name}
                    </p>
                  </div>
                  <div className="ml-3">
                    <p className={`${styles.card_content}`}>
                      {content_card?.designation}
                    </p>
                  </div>
                </div>
                {activeMainTab?.main_tab === 'Applicant' &&
                status === 'Open' ? (
                  <button
                    type="button"
                    className="btn btn-outline-primary me-5"
                    onClick={() =>
                      handleInterviewModalOpen(content_card?.email_id)
                    }
                  >
                    Schedule
                  </button>
                ) : activeMainTab?.main_tab === 'Interview' ? (
                  <button
                    type="button"
                    className="btn btn-outline-primary me-5"
                    onClick={() => handleInterviewFeedbackModalOpen()}
                  >
                    Add Interview Feedback
                  </button>
                ) : (
                  <div className="me-5">
                    <p className={`${styles.card_content}`}>
                      <i className="fas fa-calendar-alt"></i>{' '}
                      {content_card?.date}
                    </p>
                  </div>
                )}
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
      <OffCanvasComponent
        show={show}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
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
          skillsList={skillsList}
        />
      )}
    </div>
  );
};

export default CandidateCard;
