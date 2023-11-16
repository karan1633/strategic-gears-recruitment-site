import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { InterviewData } from "../../../datasets/interview-dataset";
import styles from "../../../styles/Candidate-Detail.module.css";

const CandidateDetail = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {};
  return (
    <div>
      <>
        <Button variant="primary" onClick={handleShow}>
          Launch
        </Button>

        <Offcanvas
          show={show}
          onHide={handleClose}
          placement={"end"}
          className="offCanvasMain"
          style={{ width: "50%" }}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Candidate Detail</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className={`candidate-detail-main`}>
              <div className={`candidate-form-detail`}>
                <div className="d-flex align-items-center">
                  <h3 className="">Samuel</h3>
                  <a className={`px-3 ${styles.resume_text}`}>Resume</a>
                </div>
                <Form onSubmit={handleSubmit} className="px-3">
                  <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        required
                        readOnly
                        type="text"
                        defaultValue="samuel@yopmail.com"
                      />
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom01">
                      <Form.Label>Job Title</Form.Label>
                      <Form.Control
                        required
                        readOnly
                        type="text"
                        defaultValue="Developer"
                      />
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom01">
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        required
                        readOnly
                        type="text"
                        defaultValue="Saudi Arabia"
                      />
                    </Form.Group>
                  </Row>
                </Form>
              </div>
              <div className={`candidate-interview-details-main`}>
                <div className={`candidate-interview-details-heading-text`}>
                  <h3>Interview Details</h3>
                </div>
                <div className={`candidate-interview-details-body px-3`}>
                  {InterviewData?.length > 0 &&
                    InterviewData?.map((interview: any, idx: any) => {
                      return (
                        <div key={idx} className={`border rounded-3 mt-3 `}>
                          <div
                            className={`${styles.interview_heading} border px-3 py-1`}
                          >
                            <h4>{interview.scheduled_history}</h4>
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
                                            <i
                                              className="fas fa-plus"
                                              data-toggle="collapse"
                                              data-target={`#${interview_stage.label}-feedback-data`}
                                              aria-expanded="false"
                                              aria-controls={`#${interview_stage.label}-feedback-data`}
                                            ></i>
                                            <span className="ms-2">
                                              {interview_stage.interview_stage}
                                            </span>
                                          </td>
                                          <td>{interview_stage.date}</td>
                                          <td>{interview_stage.from_time}</td>
                                          <td>{interview_stage.to_time}</td>
                                        </tr>
                                        <tr>
                                          <td colSpan={4}>
                                            <table
                                              className="table collapse "
                                              id={`${interview_stage.label}-feedback-data`}
                                            >
                                              <thead>
                                                <tr className={``}>
                                                  <th>Interviewer Name</th>
                                                  <th>Interviewer Rating</th>
                                                  <th>Interviewer Status</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {interview_stage?.feedback_data?.map(
                                                  (feedback: any, idx: any) => {
                                                    return (
                                                      <tr key={idx}>
                                                        <td className="text-center">
                                                          {
                                                            feedback.interviewer_name
                                                          }
                                                        </td>
                                                        <td className="text-center">
                                                          {
                                                            feedback.interviewer_rating
                                                          }
                                                        </td>
                                                        <td className="text-center">
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
                    })}
                </div>
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    </div>
  );
};

export default CandidateDetail;
