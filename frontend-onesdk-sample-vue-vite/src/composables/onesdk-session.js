import { onMounted, ref } from 'vue'

export function useOneSdkSession() {
	const BASE_URL = import.meta.env.VITE_BASE_API_URL
	const LOGIN_PATH = import.meta.env.VITE_API_LOGIN_PATH
	const CUSTOMER_ID = import.meta.env.VITE_CUSTOMER_ID
	const CUSTOMER_CHILD_ID = import.meta.env.VITE_CUSTOMER_CHILD_ID
	const API_KEY = import.meta.env.VITE_API_KEY

	const tokenResult = ref()

	onMounted(async () => {
		const tokenResultRaw = await fetch(
			`${ BASE_URL }${ LOGIN_PATH }`,
			{
				method: 'POST',
				headers: {
					'authorization': 'machine ' +
						btoa([CUSTOMER_ID, CUSTOMER_CHILD_ID, API_KEY].filter(Boolean).join(":")),
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					permissions: {
						preset: 'one-sdk',
						reference: `demo-${ new Date().toISOString() }`
					}
				})
			}
		)
		tokenResult.value = await tokenResultRaw.json()
	})

	return tokenResult
}