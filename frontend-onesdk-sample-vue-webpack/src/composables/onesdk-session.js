import { onMounted, ref } from "vue";

export function useOneSdkSession() {
	const BASE_URL = process.env.VUE_APP_BASE_API_URL;
	const LOGIN_PATH = process.env.VUE_APP_API_LOGIN_PATH;
	const CUSTOMER_ID = process.env.VUE_APP_CUSTOMER_ID;
	const CUSTOMER_CHILD_ID = process.env.VUE_APP_CUSTOMER_CHILD_ID;
	const API_KEY = process.env.VUE_APP_API_KEY;

	const tokenResult = ref();

	onMounted(async () => {
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
