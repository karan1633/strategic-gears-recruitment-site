import {
    CONSTANTS,
    headerGenerator,
    TIMEOUT,
  } from '@/services/config/app-config';
  import axios from 'axios';

const SkillsListAPI = async (token:any) =>
{
    let response: any;
  const version = CONSTANTS.VERSION;
  const method = 'get_round_details';
  const entity = 'job_interview';

  const params = `?version=${version}&method=${method}&entity=${entity}`;

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
}

export default SkillsListAPI;