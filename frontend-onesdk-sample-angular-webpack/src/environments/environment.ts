/**
 * Refer https://apidocs.frankiefinancial.com/docs/quick-start
 * for more information on how to get the API_KEY, CUSTOMER_ID, CUSTOMER_CHILD_ID
 * 
 * BASE_API_URL is the base URL of the Frankie Financial API
 * Latest : https://backend.latest.frankiefinancial.io
 * QA : https://backend.qa.frankiefinancial.io
 * UAT : https://backend.kycaml.uat.frankiefinancial.io
 * Prod : https://backend.kycaml.frankiefinancial.io
 * 
 * CREATE_SESSION_PATH : /auth/v2/machine-session
 * 
 */
export const environment = {
	BASE_API_URL: 'https://backend.latest.frankiefinancial.io',
	API_CREATE_SESSION_PATH: '/auth/v2/machine-session',
	CUSTOMER_ID: "",
	CUSTOMER_CHILD_ID: "",
	API_KEY: "",
	GOOGLE_API_KEY: "",
};
