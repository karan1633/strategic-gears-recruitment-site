import React, { useState, useEffect } from 'react';
import { Modal, Row, Col, Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { toast } from 'react-toastify';
import InterviewFeedbackAPI from '@/services/api/interview-feedback-data';
import { get_mail } from '@/store/slices/store-user-id';
import { useSelector } from 'react-redux';
// import style from '../styles/vertical-tabs.module.css';
const InterviewFeedbackModal = ({
  token,
  show,
  handleClose,
  activeNestedTabLabel,
  interviewID,
  skillsList,
}: any) => {
  const { mail_id } = useSelector(get_mail);
  const labels: { [index: string]: string } = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };

  function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }
  const [hover, setHover] = useState(-1);
  const [selectedBtn, setSelectedBtn] = useState<any>({
    cleared: false,
    rejected: false,
  });
  const [interviewFeedbackData, setInterviewFeedbackData] = useState<any>({
    result: '',
    skill_ratings: [],
  });

  const [addSkillRating, setAddSkillRating] = useState<any>([]);
  const handleResultButtonClick = (result_data: string) => {
    if (result_data === 'Cleared') {
      setSelectedBtn({ ...selectedBtn, cleared: true, rejected: false });
    } else {
      setSelectedBtn({ ...selectedBtn, rejected: true, cleared: false });
    }
    setInterviewFeedbackData({ ...interviewFeedbackData, result: result_data });
  };

  const storeStarRatingValue = (skill_value: any, rating_value: any) => {
    // console.log(skill_value, rating_value);
    const factor: number = 0.2;

    setAddSkillRating((prevState: any) => {
      // Find the index of the skill in the array
      const skillIndex = prevState.findIndex(
        (item: any) => item.skill === skill_value
      );

      // If the skill is found, update its value
      if (skillIndex !== -1) {
        prevState[skillIndex].ratings = Number(
          (rating_value * factor).toFixed(2)
        );
      } else {
        // If the skill is not found, add a new entry
        prevState.push({
          skill: skill_value,
          ratings: Number((rating_value * factor).toFixed(2)),
        });
      }

      // Log the updated array
      console.log(prevState);

      // Return the updated array
      setInterviewFeedbackData({
        ...interviewFeedbackData,
        skill_ratings: [...prevState],
      });
      return [...prevState];
    });
  };

  const getSkillsList = () => {
    const data = skillsList?.filter(
      (skill: any) => skill.round_name === activeNestedTabLabel
    );

    let arrState: any = [];

    if (data[0]?.skills?.length > 0) {
      data?.forEach((round: any) => {
        // Iterate through the skills array in the current round
        round?.skills?.forEach((skill: any) => {
          // Check if the skill already exists in arrState
          const existingSkill = arrState.find(
            (item: any) => Object.keys(item)[0] === skill
          );

          // If it doesn't exist, add it with a value of 0
          if (!existingSkill) {
            let newSkillObject: any = { skill: skill, ratings: 0 };
            arrState.push(newSkillObject);
          }
        });
      });
      console.log('arrState', arrState);
      setAddSkillRating([...arrState]);
    } else {
      setAddSkillRating([]);
    }
  };

  useEffect(() => {
    getSkillsList();
  }, []);

  const handleSubmitfeedback = async () => {
    console.log(addSkillRating);
    console.log(mail_id);
    // setInterviewFeedbackData({
    //   ...interviewFeedbackData,
    //   skill_ratings: [...addSkillRating],
    // });

    const submitInterviewFeedback: any = await InterviewFeedbackAPI(
      token,
      interviewFeedbackData,
      interviewID,
      mail_id
    );

    if (submitInterviewFeedback?.data?.message?.msg === 'success') {
      toast.success('Thank you for providing your feedback!', {
        autoClose: 3000,
        // Close the notification after 3 seconds
      });
    } else {
      toast.error(
        'Something went wrong while submitting your feedback. Please try in sometime!',
        {
          autoClose: 5000, // Close the notification after 5 seconds
        }
      );
    }
    handleClose();
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
                  style={{
                    backgroundColor: selectedBtn.cleared ? '#198754' : '',
                    color: selectedBtn?.cleared ? '#fff' : '',
                  }}
                >
                  Cleared
                </Button>
                <Button
                  className="ms-3"
                  variant="outline-danger"
                  onClick={() => handleResultButtonClick('Rejected')}
                  style={{
                    backgroundColor: selectedBtn.rejected ? '#dc3545' : '',
                    color: selectedBtn?.rejected ? '#fff' : '',
                  }}
                >
                  Rejected
                </Button>
              </div>
            </Form.Group>

            <Form.Group as={Col} md="12" className="my-3">
              <Form.Label>Skills Rating</Form.Label>
              <div className="row ">
                {addSkillRating?.length > 0 &&
                  addSkillRating?.map((skill_value: any, idx: number) => {
                    return (
                      <React.Fragment key={idx}>
                        <div className="col-md-4">
                          <p>{skill_value.skill} :</p>
                        </div>
                        <div className="col-md-8">
                          <Box
                            sx={{
                              width: 200,
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <Rating
                              name="hover-feedback"
                              value={skill_value?.value}
                              precision={0.5}
                              getLabelText={getLabelText}
                              onChange={(event, newValue) => {
                                storeStarRatingValue(
                                  skill_value.skill,
                                  newValue
                                );
                              }}
                              onChangeActive={(event, newHover) => {
                                setHover(newHover);
                              }}
                              emptyIcon={
                                <StarIcon
                                  style={{ opacity: 0.55 }}
                                  fontSize="inherit"
                                />
                              }
                            />
                          </Box>
                        </div>
                      </React.Fragment>
                    );
                  })}
              </div>
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmitfeedback}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InterviewFeedbackModal;
