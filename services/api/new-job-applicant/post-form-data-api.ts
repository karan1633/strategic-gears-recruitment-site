import {
  CONSTANTS,
  headerGenerator,
  TIMEOUT,
} from '@/services/config/app-config';
import axios from 'axios';

const postApplicationFormData = async (token: any, body: any) => {
  let response: any;
  // const getHeaders = headerGenerator(token);
  // const config = {
  //   headers: {
  //     Accept: 'application/json',
  //     Authorization: `${token}`,
  //   },
  //   timeout: 5000,
  // };
  const getHeaders = headerGenerator(token);

  await axios
    .post(`${CONSTANTS.API_BASE_URL}/api/method/sg_job_portal.sdk.api`, body, {
      ...getHeaders,
      timeout: TIMEOUT,
      // ...config,
      // timeout: 5000,
    })
    .then((res: any) => {
      console.log('@@post subscriptionApi api', res.data);
      response = res.data;
    })
    .catch((err: any) => {
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

export default postApplicationFormData;
