import axios from 'axios';
import { CONSTANTS, TIMEOUT, headerGenerator } from '../config/app-config';

const JobsListAPI = async (token: any) => {
  let response: any;
  const version: string = `${CONSTANTS.VERSION}`;
  const method: string = 'job_list';
  const entity: string = 'job_details';

  const getHeaders = headerGenerator(token);

  const params = `version=${CONSTANTS.VERSION}&method=${method}&entity=${entity}`;

  await axios
    .get(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}?${params}`, {
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

export default JobsListAPI;
