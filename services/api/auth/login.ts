import { CONSTANTS, TIMEOUT } from "@/services/config/app-config";
import axios from "axios";

const LoginAPI = async (credentials: any) => {
  let response: any;
  const version = CONSTANTS.VERSION;
  const method = "get_access_token";
  const entity = "access_token";

  const params = `?version=${version}&method=${method}&entity=${entity}&usr=${credentials.usr}&pwd=${credentials.pwd}`;

  await axios
    .get(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}${params}`, {
      timeout: TIMEOUT,
    })
    .then((res) => {
      // console.log("job listing api successfull", res);
      response = res;
    })
    .catch((err) => {
      if (err.code === "ECONNABORTED") {
        response = "Request timed out";
      } else if (err.code === "ERR_BAD_REQUEST") {
        response = "Bad Request";
      } else if (err.code === "ERR_INVALID_URL") {
        response = "Invalid URL";
      } else {
        response = err;
      }
    });
  return response;
};

export default LoginAPI;
