import { CONSTANTS } from '@/services/config/app-config';
import axios from 'axios';

const fetchQuestionsList = async () => {
  let response: any;
  const config = {
    headers: {
      Accept: 'application/json',
    },
  };

  await axios
    .get(
      `${CONSTANTS.API_BASE_URL}/api/method/sg_job_portal.sdk.api?version=v1&entity=job_opening&method=get_question_answer_list`,
      {
        ...config,
        timeout: 5000,
      }
    )
    .then((res: any) => {
      response = res;
      console.log(response, 'response');
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

export default fetchQuestionsList;
