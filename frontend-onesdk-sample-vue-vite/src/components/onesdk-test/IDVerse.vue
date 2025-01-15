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
			idv: {
				provider: {
					name: "ocrlabs"
				}
			}
		},
	});

		const idv = oneSdk.flow("idv");
		const oneSdkIndividual = oneSdk.individual();
		oneSdkIndividual.addConsent("general");
		oneSdkIndividual.addConsent("docs");
		oneSdkIndividual.addConsent("creditheader");
		await oneSdkIndividual.submit();

		idv.mount("#idverse");
})
</script>

<template>
	<div id="idverse" style="width: '100%'; height: 85vh"></div>
</template>