export const CONSTANTS = {
  API_BASE_URL: "https://sgdevelopment.8848digitalerp.com",
  API_MANDATE_PARAMS: "/api/method/sg_job_portal.sdk.api",
  VERSION: "v1",
};
// export const API_CONFIG = {
//   headers: {
//     Accept: "application/json",
//   },
// };

export const headerGenerator = (token: any) => {
  const API_CONFIG = {
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
  };
  return API_CONFIG;
};

export const TIMEOUT = 5000;
