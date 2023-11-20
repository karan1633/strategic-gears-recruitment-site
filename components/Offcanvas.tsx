import Offcanvas from 'react-bootstrap/Offcanvas';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { InterviewData } from '../datasets/interview-dataset';
import styles from '../styles/Candidate-Detail.module.css';
import { useState, useEffect, use } from 'react';
import CandidateDetailAPI from '@/services/api/candidate-detail-api';
const OffCanvasComponent = ({
  show,
  token,
  candidateMailID,
  handleClose,
  handleSubmit,
}: any) => {
  const [candidateDetail, setCandidateDetail] = useState<any>({});
  const [isExpanded, setIsExpanded] = useState<any>(false);
  const getCandidateData = async () => {
    const getCandidateDetail = await CandidateDetailAPI(token, candidateMailID);
    console.log('candidate detail', getCandidateDetail);
    if (
      getCandidateDetail?.status === 200 &&
      getCandidateDetail?.data?.message?.msg === 'success'
    ) {
      setCandidateDetail(getCandidateDetail?.data?.message?.data);
    } else {
      setCandidateDetail({});
    }
  };

  useEffect(() => {
    getCandidateData();
  }, []);
  return (
    <>
      <div className="sidebar-modal">
        <Offcanvas
          show={show}
          onHide={handleClose}
          placement={'end'}
          className="offCanvasMain"
          style={{ width: '50%' }}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Candidate Detail</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className={`candidate-detail-main`}>
              <div className={`candidate-form-detail`}>
                <div className="d-flex align-items-center">
                  <h3 className="">
                    {Object.keys(candidateDetail)?.length > 0 &&
                      candidateDetail?.applicant_name}
                  </h3>
                  <a className={`px-3 ${styles.resume_text}`}>Resume</a>
                </div>
                <Form onSubmit={handleSubmit} className="px-3 mt-3">
                  <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        required
                        readOnly
                        type="text"
                        defaultValue={candidateDetail?.email_id}
                      />
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom01">
                      <Form.Label>Job Title</Form.Label>
                      <Form.Control
                        required
                        readOnly
                        type="text"
                        defaultValue={candidateDetail?.job_title}
                      />
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom01">
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        required
                        readOnly
                        type="text"
                        defaultValue={candidateDetail?.country}
                      />
                    </Form.Group>
                  </Row>
                </Form>
              </div>
              <div className={`candidate-interview-details-main mt-1`}>
                <div className={`candidate-interview-details-heading-text`}>
                  <h5 className="px-3">Interview Details</h5>
                </div>
                {candidateDetail?.interview_details?.length > 0 ? (
                  <div className={`candidate-interview-details-body px-3`}>
                    {candidateDetail?.interview_details?.length > 0 &&
                      candidateDetail?.interview_details?.map(
                        (interview: any, idx: any) => {
                          return (
                            <div key={idx} className={`border rounded-3 mt-3 `}>
                              <div
                                className={`${styles.interview_heading} border px-3 py-1`}
                              >
                                <h6>{interview.scheduled_history}</h6>
                              </div>
                              <div className={`interview-detail-main px-3 `}>
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th scope="col">Round</th>
                                      <th scope="col">Date</th>
                                      <th scope="col">From Time</th>
                                      <th scope="col">To Time</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {interview.interview_data?.map(
                                      (interview_stage: any, idx: any) => {
                                        return (
                                          <>
                                            <tr key={idx}>
                                              <td className="">
                                                {/* {isExpanded ? (
                                                  <i
                                                    className="fas fa-minus"
                                                    data-toggle="collapse"
                                                    data-target={`#${interview_stage.label}-feedback-data`}
                                                    aria-expanded="false"
                                                    aria-controls={`#${interview_stage.label}-feedback-data`}
                                                    onClick={() =>
                                                      setIsExpanded(true)
                                                    }
                                                  ></i>
                                                ) : (
                                                  
                                                )} */}
                                                <i
                                                  className="fas fa-plus"
                                                  data-toggle="collapse"
                                                  data-target={`#${interview_stage.label}-feedback-data`}
                                                  aria-expanded="false"
                                                  aria-controls={`#${interview_stage.label}-feedback-data`}
                                                  // onClick={() =>
                                                  //   setIsExpanded(false)
                                                  // }
                                                ></i>
                                                <span className="ms-2">
                                                  {
                                                    interview_stage.interview_stage
                                                  }
                                                </span>
                                              </td>
                                              <td>{interview_stage.date}</td>
                                              <td>
                                                {interview_stage.from_time}
                                              </td>
                                              <td>{interview_stage.to_time}</td>
                                            </tr>
                                            <tr>
                                              <td colSpan={4}>
                                                <table
                                                  className="table collapse"
                                                  id={`${interview_stage.label}-feedback-data`}
                                                >
                                                  <thead>
                                                    <tr
                                                      className={`${styles.nested_table_div}`}
                                                    >
                                                      <th className={``}>
                                                        Interviewer Name
                                                      </th>
                                                      <th className={``}>
                                                        Interviewer Rating
                                                      </th>
                                                      <th className={``}>
                                                        Interviewer Status
                                                      </th>
                                                    </tr>
                                                  </thead>
                                                  <tbody>
                                                    {interview_stage?.feedback_data?.map(
                                                      (
                                                        feedback: any,
                                                        idx: any
                                                      ) => {
                                                        return (
                                                          <tr
                                                            key={idx}
                                                            className={`${styles.nested_feedback_div}`}
                                                          >
                                                            <td className="">
                                                              {
                                                                feedback.interviewer_name
                                                              }
                                                            </td>
                                                            <td className="">
                                                              {
                                                                feedback.interviewer_rating
                                                              }
                                                            </td>
                                                            <td className="">
                                                              {
                                                                feedback.interview_result
                                                              }
                                                            </td>
                                                          </tr>
                                                        );
                                                      }
                                                    )}
                                                  </tbody>
                                                </table>
                                              </td>
                                            </tr>
                                          </>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          );
                        }
                      )}
                  </div>
                ) : (
                  'No Interview Details Found'
                )}
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
};

export default OffCanvasComponent;
