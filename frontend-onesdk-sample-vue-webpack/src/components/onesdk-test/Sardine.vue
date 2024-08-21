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
				form: {
					provider: {
						name: "react",
						googleApiKey: process.env.VUE_APP_GOOGLE_API_KEY
					}
				}
			},
	});

	const device = oneSdk.component("device", {
		activityType: "REGISTRATION",
	});
	device.start();

	const welcome = oneSdk.component("form", {
		name: "WELCOME",
		mode: "individual",
		type: "manual",
	});

	const consent = oneSdk.component("form", {
		name: "CONSENT",
		mode: "individual",
		type: "manual",
	});

	const personal = oneSdk.component("form", {
		name: "PERSONAL",
		mode: "individual",
		type: "manual",
		personal: {
			countries: {
				default: {
					default: {
						fields: [
							{
								fieldType: 'input',
								dataType: 'text',
								label: 'Email',
								name: 'extraData.email',
								hide: false,
								rules: {
									required: {
										value: true,
										message: "Please enter your email"
									}
								}
							},
							{
								fieldType: 'phone',
								dataType: 'phone',
								label: 'Phone Number',
								name: 'extraData.phone',
								hide: false,
								placeholder: {
									cc: "Code",
									phoneNumber: "e.g. 0400 000 000"
								},
								options: [
									{ label: "AU +61", value: "+61" },
									{ label: "NZ +64", value: "+64" },
									{ label: "PH +63", value: "+63" },
								],
								rules: {
									required: {
										value: true,
										message: "Please enter your phone number"
									}
								}
							},
						]
					}
				}
			}
		}
	});

	const document = oneSdk.component("form", {
		name: "DOCUMENT",
		mode: "individual",
		type: "manual",
	});

	const review = oneSdk.component("form", {
		name: "REVIEW",
		mode: "individual",
		type: "manual",
		verify: true,
	});

	const retry = oneSdk.component("form", {
		name: "RETRY",
		mode: "individual",
		type: "manual",
	});

	const result = oneSdk.component("form", {
		name: "RESULT",
		mode: "individual",
		type: "manual",
		state: "FAIL",
	});

	welcome.on("*", OneSDK.wildcardEventLogger);

	welcome.on("form:welcome:ready", () => {
		consent.mount("#sardine-container");
	});

	consent.on("form:consent:ready", async () => {
		personal.mount("#sardine-container");
	});

	personal.on("form:personal:ready", async () => {
		document.mount("#sardine-container");
	});

	document.on("form:document:back", async () => {
		personal.mount("#sardine-container");
	});

	document.on("form:document:ready", async () => {
		review.mount("#sardine-container");
	});

	let count = 0;
	review.on("form:result:partial", async () => {
		if (count < 2) {
			retry.mount("#sardine-container");
			count += 1;
		}
	});

	welcome.mount("#sardine-container");
})
</script>

<template>
	<div id="sardine-container" style="width: '100%'; height: 85vh"></div>
</template>