<script setup>
import { useOneSdkSession } from '@/composables/onesdk-session';
import OneSDK from '@frankieone/one-sdk';
import { watchEffect } from 'vue';

const session = useOneSdkSession()
let loading1, loading2, review

watchEffect(async () => {
	if (!session.value) return

	const oneSdk = await OneSDK({
		session: session.value,
		mode: "development",
		recipe: {
			form: {
				provider: {
					name: 'react',
					googleApiKey: process.env.VUE_APP_GOOGLE_API_KEY
				},
			}
		}
	});

	const oneSdkIndividual = oneSdk.individual();
	oneSdkIndividual.addConsent("general");
	oneSdkIndividual.addConsent("docs");
	oneSdkIndividual.addConsent("creditheader");
	await oneSdkIndividual.submit();

	const idv = oneSdk.flow("idv");
	loading1 = oneSdk.component("form", { name: "LOADING", title: { label: "Loading..." }, descriptions: [{ label: "" }] });
	loading2 = oneSdk.component("form", { name: "LOADING", title: { label: "Processing results..." }, descriptions: [{ label: "Hold tight, this can take up to 30 seconds. Please do not refresh this page or click the 'back' button on your browser." }] });
	review = oneSdk.component("form", {
		name: "REVIEW",
		type: "ocr",
	});

	let before = true;
	idv.on("loading", (display) => {
		if (display) {
			if (before) {
				loading1.mount("#e2e-idv-loading1");
			}
		} else {
			if (before) {
				loading1.unmount();
			}
			before = false;
		}
	});

	idv.on("results", async ({ checkStatus }) => {
		if (checkStatus) {
			loading2.unmount();
			review.mount("#e2e-idv-container");
		}
	});

	idv.on("detection_complete", (message) => {
		loading2.mount("#e2e-idv-loading2");
	});

	idv.mount("#e2e-idv-container");
})
</script>

<template>
	<div id="e2e-idv-container" style="width: '100%'; height: 85vh"></div>
	<div id="e2e-idv-loading1"></div>
	<div id="e2e-idv-loading2"></div>
</template>