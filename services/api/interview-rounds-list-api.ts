import axios from "axios";
import { CONSTANTS, TIMEOUT, headerGenerator } from "../config/app-config";

const InterviewRoundsListAPI = async (token: any) => {
  let response: any;
  const version: string = `${CONSTANTS.VERSION}`;
  const method: string = "get_interview_rounds";
  const entity: string = "job_interview";

  const getHeaders = headerGenerator(token);

  const params: any = `version=${version}&method=${method}&entity=${entity}`;

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

export default InterviewRoundsListAPI;
