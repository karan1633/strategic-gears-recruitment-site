import axios from 'axios';
import { CONSTANTS, TIMEOUT, headerGenerator } from '../config/app-config';

const InterviewFeedbackAPI = async (
  token: any,
  interviewFeedbackData: any,
  interviewId: any,
  interviewer_mail_id?: any
) => {
  let response: any;

  const getHeaders = headerGenerator(token);

  console.log('InterviewFeedbackAPI', interviewFeedbackData, interviewId);

  const body: any = {
    version: CONSTANTS.VERSION,
    method: 'interview_feedback',
    entity: 'job_interview',
    interview: interviewId,
    interviewer: interviewer_mail_id,
    result: interviewFeedbackData?.result,
    skill_ratings: interviewFeedbackData?.skill_ratings,
  };

  await axios
    .post(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}`, body, {
      ...getHeaders,
      timeout: TIMEOUT,
    })
    .then((res: any) => {
      response = res;
    })
    .catch((err: any) => {
      response = err;
    });
  return response;
};

export default InterviewFeedbackAPI;
