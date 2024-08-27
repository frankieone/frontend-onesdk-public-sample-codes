<script setup>
import { useOneSdkSession } from '@/composables/onesdk-session';
import OneSDK from '@frankieone/one-sdk';
import { watchEffect } from 'vue';

const session = useOneSdkSession()

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

		const form_welcome = oneSdk.component("form", {
			name: "WELCOME",
			type: "ocr",
		});
		const form_consent = oneSdk.component("form", { name: "CONSENT" });
		const form_loading1 = oneSdk.component("form", { name: "LOADING", title: { label: "Loading..." }, descriptions: [{ label: "" }] });
		const form_loading2 = oneSdk.component("form", { name: "LOADING", title: { label: "Extracting data..." }, descriptions: [{ label: "Hold tight, this can take up to 30 seconds. Please do not referesh this page or click the 'back' button on your browser." }] });
		const form_loading3 = oneSdk.component("form", { name: "LOADING", title: { label: "Hold on..." }, descriptions: [{ label: "" }] });

		const form_document = oneSdk.component("form", {
			name: "DOCUMENT",
			showPreps: true,
		});
		const form_review = oneSdk.component("form", {
			name: "REVIEW",
			type: "ocr",
		});

		const biometrics = oneSdk.component('biometrics');

		form_welcome.mount("#e2e-ocr-bio-container");
		form_welcome.on("form:welcome:ready", () => {
			form_consent.mount("#e2e-ocr-bio-container");
		});

		form_consent.on("form:consent:ready", async () => {

			form_document.mount("#e2e-ocr-bio-container");
		});

		let docType;

		form_document.on("form:document:ready", async ({ inputInfo }) => {
			form_loading1.mount("#e2e-ocr-bio-container");
			docType = inputInfo.documentType;

			const ocr = oneSdk.component("ocr", {
				documents: [{ type: docType, countries: ["AUS"] }],
			});

			ocr.mount("#e2e-ocr-bio-container");
			ocr.on("ready", () => form_loading1.unmount());

			ocr.on("results", ({ document }) => {
				doSomethingAfterOcr({ document });
			});

			ocr.on("loading", (display) => {
				if (display) {
					form_loading2.mount("#e2e-ocr-bio-container");
				} else {
					form_loading2.unmount();
				}
			});
		});

		function doSomethingAfterOcr({ document }) {
			// Present the details of the document that were detected from the uploaded image or images.
			// Decide whether to proceed to the next stage of the onboarding process
			// depending on whether document verification was successful.
			if (document) {
				form_review.mount("#e2e-ocr-bio-container");
			}
		}

		form_review.on("form:review:ready", async () => {
			biometrics.mount("#e2e-ocr-bio-container");
		});

		let error = false;
		biometrics.on('detection_failed', () => (error = true));
		biometrics.on('session_closed', () => {
			// If the session was closed due to an error, try running the biometrics component again.
			if (error) biometrics.mount("#e2e-ocr-bio-container");
			error = false;
		});

		biometrics.on("loading", (display) => {
			if (display) {
				form_loading3.mount("#e2e-ocr-bio-container");
			} else {
				form_loading3.unmount();
			}
		});

		biometrics.on('processing', () => alert('We will get back to you with results soon'));
})
</script>

<template>
	<div id="e2e-ocr-bio-container" style="width: '100%'; height: 85vh"></div>
</template>