import axios from 'axios';
import { CONSTANTS, TIMEOUT, headerGenerator } from '../config/app-config';

const jobOpeningAPI = async (token: any, body: any) => {
  let response: any;

  const getHeaders = headerGenerator(token);

  //   const body: any = {
  //     version: CONSTANTS.VERSION,
  //     method: 'create_job_opening',
  //     entity: 'job_details',
  //     interview: interviewId,
  //     interviewer: interviewer_mail_id,
  //     result: interviewFeedbackData?.result,
  //     skill_ratings: interviewFeedbackData?.skill_ratings,
  //   };

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

export default jobOpeningAPI;
