import {
  CONSTANTS,
  headerGenerator,
  TIMEOUT,
} from '@/services/config/app-config';
import axios from 'axios';

const CandidatesListAPI = async (token: any, filter: any) => {
  let response: any;
  const version = CONSTANTS.VERSION;
  const method = 'get_applicant';
  const entity = 'job_applicant';
  const job_title: any = filter === undefined ? '' : filter;

  console.log(filter);

  const params = `?version=${version}&method=${method}&entity=${entity}&job_title=${job_title}`;

  const getHeaders = headerGenerator(token);
  // console.log("headers", getHeaders.headers);

  await axios
    .get(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}${params}`, {
      ...getHeaders,
      timeout: TIMEOUT,
    })
    .then((res) => {
      // console.log("candidate listing api successfull", res);
      response = res;
    })
    .catch((err) => {
      if (err.code === 'ECONNABORTED') {
        response = 'Request timed out';
      } else if (err.code === 'ERR_BAD_REQUEST') {
        response = 'Bad Request';
      } else if (err.code === 'ERR_INVALID_URL') {
        response = 'Invalid URL';
      } else {
        response = err;
      }
    });
  return response;
};

export default CandidatesListAPI;
