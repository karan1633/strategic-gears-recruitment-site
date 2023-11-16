import { CONSTANTS, TIMEOUT } from '@/services/config/app-config';
import axios from 'axios';

const LogoutAPI = async () => {
  let response: any;

  await axios
    .post(`${CONSTANTS.API_BASE_URL}/api/method/logout`, undefined, {
      timeout: TIMEOUT,
    })
    .then((res) => {
      // console.log("job listing api successfull", res);
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

export default LogoutAPI;
