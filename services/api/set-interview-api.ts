import axios from 'axios';
import { CONSTANTS, TIMEOUT, headerGenerator } from '../config/app-config';

const SetInterviewAPI = async (
  token: any,
  candidateMailID: any,
  api_params: any
) => {
  let response: any;
  const version: string = `${CONSTANTS.VERSION}`;
  const method: string = 'schedule_interview';
  const entity: string = 'job_interview';

  const getHeaders = headerGenerator(token);

  console.log(api_params);

  const params: any = `version=${version}&method=${method}&entity=${entity}&job_applicant=${candidateMailID}&interview_round=${
    api_params.interview_round
  }&scheduled_on=${
    api_params.scheduled_on
  }&from_time=${`${api_params.from_time}:00`}&to_time=${`${api_params.to_time}:00`}&interviewers=${
    api_params.interviewers
  }`;

  await axios
    .post(
      `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}?${params}`,
      undefined,
      {
        ...getHeaders,
        timeout: TIMEOUT,
      }
    )
    .then((res: any) => {
      response = res;
    })
    .catch((err: any) => {
      response = err;
    });
  return response;
};

export default SetInterviewAPI;
