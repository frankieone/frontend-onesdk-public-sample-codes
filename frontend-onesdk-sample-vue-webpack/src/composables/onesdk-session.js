import { onMounted, ref } from "vue";

export function useOneSdkSession() {
	const BASE_URL = process.env.VUE_APP_BASE_API_URL;
	const LOGIN_PATH = process.env.VUE_APP_API_LOGIN_PATH;
	const CUSTOMER_ID = process.env.VUE_APP_CUSTOMER_ID;
	const CUSTOMER_CHILD_ID = process.env.VUE_APP_CUSTOMER_CHILD_ID;
	const API_KEY = process.env.VUE_APP_API_KEY;

	const tokenResult = ref();

	onMounted(async () => {
		// SECURITY WARNING: LOCAL DEVELOPMENT ONLY.
		// This sample creates the OneSDK session in the browser with your API key so it
		// can run without a backend. Never do this in production: anyone who opens your
		// page can read the key and call FrankieOne as you.
		// In production, on YOUR SERVER:
		//   1. create the individual with POST /v2/individuals and keep the entityId;
		//   2. create the session with permissions { preset: 'one-sdk', entityId };
		//   3. send only the session token to the browser.
		// FrankieOne can refuse sessions created from a browser with an API key.
		// See: https://github.com/frankieone/frontend-onesdk-public-sample-codes#production-integration-create-the-session-on-your-server
		const tokenResultRaw = await fetch(`${ BASE_URL }${ LOGIN_PATH }`, {
			method: "POST",
			headers: {
				"authorization": "machine " +
					btoa([CUSTOMER_ID, CUSTOMER_CHILD_ID, API_KEY].filter(Boolean).join(":")),
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				permissions: {
					"preset": "one-sdk",
					"reference": `demo-${ new Date().toISOString() }`//"<YOUR_UNIQUE_CUSTOMER_REF>"
				}
			})
		});

		tokenResult.value = await tokenResultRaw.json();
	});


	return tokenResult;
}
