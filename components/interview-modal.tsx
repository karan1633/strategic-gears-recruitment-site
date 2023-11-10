import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SetInterviewAPI from '@/services/api/set-interview-api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import CandidatesListAPI from '@/services/api/candidates-list-api';
function InterviewModal({
  token,
  show,
  handleClose,
  interviewRoundsList,
  candidateMailID,
  updateCandidatesList,
}: any) {
  const router = useRouter();
  const { job } = router.query;
  const [interviewData, setInterviewData] = useState({
    interview_round: '',
    scheduled_on: '',
    from_time: '',
    to_time: '',
    interviewers: [],
  });
  const handleValueChange = (key: any, value: any) => {
    if (key === 'interview_round') {
      const interviewersList = (
        interviewRoundsList.find(
          (round: any) => round.round_name === value
        ) || { interviewers: [] }
      ).interviewers;

      setInterviewData({
        ...interviewData,
        [key]: value,
        interviewers: interviewersList,
      });
    } else {
      setInterviewData({ ...interviewData, [key]: value });
    }
    // console.log(interviewData);
  };

  const handleRemovalOfInterviewerFromList = (index: any) => {
    const data = interviewData.interviewers.filter((name: any, idx: any) => {
      return idx !== index;
    });
    setInterviewData({ ...interviewData, interviewers: [...data] });
    // console.log(data);
  };

  const handleScheduleInterview = async () => {
    // console.log(interviewData);
    const callSetInterviewAPI = await SetInterviewAPI(
      token,
      candidateMailID,
      interviewData
    );
    if (
      callSetInterviewAPI?.status === 200 &&
      callSetInterviewAPI?.data?.message?.msg === 'success'
    ) {
      toast.success('Interview has been scheduled', {
        autoClose: 3000,
      });
      updateCandidatesList();
    } else {
      toast.error(
        "Couldn't schedule interview right now. Please try in sometime.",
        {
          autoClose: 5000, // Close the notification after 5 seconds
        }
      );
    }
    handleClose();
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Schedule an Interview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} md="12">
                <Form.Label>Interview Round</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) =>
                    handleValueChange('interview_round', e.target.value)
                  }
                >
                  <option>Select an Interview Round</option>
                  {interviewRoundsList?.map((round: any, idx: any) => {
                    return (
                      <option key={idx} value={round.name}>
                        {round.round_name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} md="4" className="my-2">
                <Form.Label>Date</Form.Label>
                <div>
                  <input
                    type="date"
                    onChange={(e) =>
                      handleValueChange('scheduled_on', e.target.value)
                    }
                  />
                </div>
              </Form.Group>
              <Form.Group as={Col} md="4" className="my-2">
                <Form.Label>From Time</Form.Label>
                <div>
                  <input
                    type="time"
                    onChange={(e) =>
                      handleValueChange('from_time', e.target.value)
                    }
                  />
                </div>
              </Form.Group>
              <Form.Group as={Col} md="4" className="my-2">
                <Form.Label>To Time</Form.Label>
                <div>
                  <input
                    type="time"
                    onChange={(e) =>
                      handleValueChange('to_time', e.target.value)
                    }
                  />
                </div>
              </Form.Group>
              <Form.Group as={Col} md="12" className="my-2">
                <p className="mb-2">Interviewers List</p>

                {interviewData?.interviewers?.length > 0 ? (
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Sr No.</th>
                        <th scope="col">Interviewer Name</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {interviewData?.interviewers?.length > 0 &&
                        interviewData?.interviewers?.map(
                          (interviewer_name: any, idx: any) => {
                            return (
                              <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{interviewer_name}</td>
                                <td className="text-center">
                                  <i
                                    className="fas fa-ban text-danger"
                                    onClick={() =>
                                      handleRemovalOfInterviewerFromList(idx)
                                    }
                                  ></i>
                                </td>
                              </tr>
                            );
                          }
                        )}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-danger">No Interviewers Found</p>
                )}
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleScheduleInterview}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InterviewModal;
