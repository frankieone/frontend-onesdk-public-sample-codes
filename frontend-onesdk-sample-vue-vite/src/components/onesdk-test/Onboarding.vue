<script setup>
import { useOneSdkSession } from '@/composables/onesdk-session';
import { configurations } from '@/helper/onboarding.config';
import OneSDK from '@frankieone/one-sdk';
import { watchEffect } from 'vue';

const session = useOneSdkSession()
let welcome, consent, document, ocr, review

watchEffect(async () => {
	if (!session.value) return

	const oneSdk = await OneSDK({
		session: session.value,
		mode: "development",
		recipe: {
			ocr: {
				provideReviewScreen: false,
				maxDocumentCount: 1,
			},
			form: {
				provider: {
					name: 'react',
					googleApiKey: import.meta.env.VITE_GOOGLE_API_KEY
				}
			}
		},
	});

	const oneSdkIndividual = oneSdk.individual();
	oneSdkIndividual.addConsent("general");
	oneSdkIndividual.addConsent("docs");
	oneSdkIndividual.addConsent("creditheader");
	await oneSdkIndividual.submit();

	welcome = oneSdk.component('form', await configurations.configureWelcomeOCR(true));
	consent = oneSdk.component('form', await configurations.configureConsentOCR(true));
	document = oneSdk.component('form', await configurations.configureDocumentIDOCR(true, true, true, true));
	ocr = oneSdk.component('ocr');
	review = oneSdk.component('form', {
		name: 'REVIEW',
	});
	welcome.on('form:welcome:ready', () => {
		consent.mount('#onboarding-container');
	});
	consent.on('form:consent:ready', () => {
			document.mount('#onboarding-container');
	});
	document.on('form:document:ready', () => {
		ocr.mount('#onboarding-container');
	});
	ocr.on('results', () => {
		review.mount('#onboarding-container');
	});

	welcome.mount('#onboarding-container');
})
</script>

<template>
	<div id="onboarding-container" style="width: '100%'; height: 85vh"></div>
</template>