import { useState, useEffect } from 'react';
import { Modal, Row, Col, Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import style from "../styles/vertical-tabs.module.css";
const InterviewFeedbackModal = ({
  token,
  show,
  handleClose,
  activeNestedTabLabel,
  skillsList,
}: any) => {
  const [interviewFeedbackData, setInterviewFeedbackData] = useState({
    result: '',
    skill_ratings: [],
  });

  const [addSkillRating, setAddSkillRating] = useState<any>([]);

  console.log('skillslist', skillsList);
  console.log('activeNestedTabLabel', activeNestedTabLabel);

  const handleResultButtonClick = (result_data: string) => {
    setInterviewFeedbackData({ ...interviewFeedbackData, result: result_data });
  };

  const getSkillsList = () => {
    const data = skillsList?.filter(
      (skill: any) => skill.round_name === activeNestedTabLabel
    );
    console.log(data);
    // setInterviewFeedbackData({...interviewFeedbackData, skill_ratings:[...]})
    setAddSkillRating([data.skills]);
  };

  useEffect(() => {
    getSkillsList();
  }, []);

  const [hoveredRating, setHoveredRating] = useState(0);

  const handleStarHover = (hoveredRating:any) => {
    setHoveredRating(hoveredRating);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const getStarClass = (star:any, hoveredRating:any) => {
    if (star <= hoveredRating - 0.5) {
      return style.fas; // Full star
    } else if (star <= hoveredRating) {
      return style.fas_half; // Half star
    } else {
      return style.far; // Empty star
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Interview Feedback</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} md="12">
              <Form.Label>Interview Result</Form.Label>
              <div className=" m-0 p-0">
                <Button
                  className="ms-0 "
                  variant="outline-success"
                  onClick={() => handleResultButtonClick('Cleared')}
                >
                  Cleared
                </Button>
                <Button
                  className="ms-3"
                  variant="outline-danger"
                  onClick={() => handleResultButtonClick('Rejected')}
                >
                  Rejected
                </Button>
              </div>
            </Form.Group>
            <Form.Group as={Col} md="12" className="my-3">
              <Form.Label>Rate Candidate Skills</Form.Label>
              {/* <div className=" m-0 p-0"><i className='fa fa-star fa-lg'></i></div>
              <div className=" m-0 p-0"><i className='fa fa-star-half-alt fa-lg'></i></div> */}
              <div className=" m-0 p-0">
                {[1, 2, 3, 4, 5].map((star: number) => {
                  return (
                    <i
                      key={star}
                      className={`fa fa-star fa-lg ${getStarClass(star, hoveredRating)}`}
                      onMouseEnter={() => handleStarHover(star)}
                      onMouseLeave={handleStarLeave}
                    ></i>
                  );
                })}
              </div>
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default InterviewFeedbackModal;
