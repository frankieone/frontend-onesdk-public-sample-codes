<script setup>
import { useOneSdkSession } from '@/composables/onesdk-session';
import { configurations } from '@/helper/onboarding.config';
import OneSDK from '@frankieone/one-sdk';
import { watchEffect } from 'vue';

const session = useOneSdkSession()

watchEffect(async () => {
	if (!session.value) return

	const oneSdk = await OneSDK({
		session: session.value,
		mode: "development",
		recipe: {
			ocr: {
				maxDocumentCount: 3,
			},
			form: {
				provider: {
					name: 'react',
					googleApiKey: import.meta.env.VITE_GOOGLE_API_KEY
				},
			}
		},
	});

	const oneSdkIndividual = oneSdk.individual();

	const form_welcome = oneSdk.component("form", await configurations.configureWelcome(true));
	const form_consent = oneSdk.component("form", await configurations.configureConsent(true));
	const form_loading1 = oneSdk.component("form", {name: "LOADING", title: {label: "Loading..."}, descriptions: [{label: ""}]});
	const form_loading2 = oneSdk.component("form", {name: "LOADING", title: {label: "Extracting data..."}, descriptions: [{label: "Hold tight, this can take up to 30 seconds. Please do not refresh this page or click the 'back' button on your browser."}]});
	const form_loading3 = oneSdk.component("form", {name: "LOADING", title: {label: "Hold on..."}, descriptions: [{label: ""}]});
	
	const form_personal = oneSdk.component("form", await configurations.configurePersonal(true));

	const form_document = oneSdk.component("form", await configurations.configureDocument(true, 1, false, true, false));

	const form_review = oneSdk.component("form", {
		name: "REVIEW",
		type: "manual",
		verify: true
	});

	const form_retry = oneSdk.component("form", {
		name: "RETRY",
		type: "manual",
	});

	const form_result = oneSdk.component("form", {
		name: "RESULT",
		type: "manual",
		state: 'FAIL',
		title: {label:'Complete'},
		descriptions: [{label:'Process is now complete. You can close the page'}],
		cta:{label: 'Close'}
	});

	const biometrics = oneSdk.component('biometrics');

	form_welcome.mount("#onboarding-manual-container");
	form_welcome.on("form:welcome:ready", () => {
		form_consent.mount("#onboarding-manual-container");
	});
	
	form_consent.on("form:consent:ready", async () => {
		form_personal.mount("#onboarding-manual-container");
	});

	form_personal.on("form:personal:ready", async () => {
		form_document.mount("#onboarding-manual-container");
	});

	form_document.on("form:document:back", async ({inputInfo}) => {
		form_personal.mount("#onboarding-manual-container");
	
	});

	form_document.on("form:document:ready", async ({inputInfo}) => {
		form_review.mount("#onboarding-manual-container");
	
	});

	let count = 0;
	form_review.on("form:result:partial", async () => {
		if (count < 2)
		{
			form_retry.mount("#onboarding-manual-container");
			count+=1;
		}
	});
})
</script>

<template>
	<div id="onboarding-manual-container" style="width: '100%'; height: 85vh"></div>
</template>