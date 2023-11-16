export const CONSTANTS = {
  API_BASE_URL: 'https://staging-strategicgears.frappe.cloud',
  // API_BASE_URL: 'http://192.168.29.2:8000/',
  API_MANDATE_PARAMS: '/api/method/sg_job_portal.sdk.api',
  VERSION: 'v1',
};
// export const API_CONFIG = {
//   headers: {
//     Accept: "application/json",
//   },
// };

export const headerGenerator = (token: any) => {
  const API_CONFIG = {
    headers: {
      Accept: 'application/json',
      Authorization: token,
    },
  };
  return API_CONFIG;
};

export const TIMEOUT = 5000;
