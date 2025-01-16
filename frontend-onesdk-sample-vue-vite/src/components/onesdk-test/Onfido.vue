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
				provider: {
					name: "onfido",
					customUI: {
						"borderRadiusButton": "56px",
						"borderStyleSurfaceModal": "0px",
						"fontWeightBody": 400,
						"fontSizeBody": "16px",
						"fontSizeSubtitle": "16px",
						"fontSizeTitle": "40px",
						"colorBackgroundSurfaceModal": "white",
						"colorBackgroundIcon": "black",
						"colorBorderLinkUnderline": "black",
						"colorBackgroundLinkActive": "black",
						"colorBackgroundLinkHover": "blue",
						"colorBackgroundDocTypeButton": "black",
						"colorContentBody": "rgb(255,255,255)",
						"colorContentTitle": "rgb(247, 25, 233)",
						"colorContentSubtitle": "rgb(247, 25, 233)",

						"colorContentButtonPrimaryText": "rgb(41, 140, 41)",
						"colorBackgroundButtonPrimary": "rgb(237, 245, 17)",
						"colorBackgroundButtonPrimaryHover": "rgb(55, 115, 245)",
						"colorBackgroundButtonPrimaryActive": "rgb(55, 115, 245)",

						"colorContentButtonSecondaryText": "rgb(255,255,255)",
						"colorBackgroundButtonSecondary": "rgb(50,53,61)",
						"colorBackgroundButtonSecondaryHover": "rgb(30,32,37)",
						"colorBackgroundButtonSecondaryActive": "rgb(30,32,37)",
						"colorContentLinkTextHover": "rgb(55, 115, 245)",
						"colorBorderDocTypeButton": "rgb(20, 21, 25)",
						"colorBackgroundDocTypeButtonHover": "rgb(30,32,37)",
						"colorBackgroundDocTypeButtonActive": "rgb(30,32,37)",
						"colorContentDocTypeButton": "rgb(255,255,255)",
						"colorIcon": "rgb(55, 115, 245)",
						"colorContentInfoPill": "rgb(10,11,13)",
						"colorBackgroundInfoPill": "rgb(55, 115, 245)",
						"colorBackgroundSelector": "red",
						"colorInputOutline": "rgb(87, 139, 250)",
						"colorContentButtonTertiaryText": "rgb(255,255,255)",
						"colorContentInput": "blue",
						"colorBackgroundInput": "green",
						"colorBorderInput": "yellow"
					}
				},
				documents: [
					{
						type: 'PASSPORT',
						countries: ["AUS"],
					},
					{
						type: 'DRIVERS_LICENCE',
						countries: ["AUS"],
					},
					{
						type: 'NATIONAL_ID',
						countries: ["AUS"],
					},
				]
			},
			biometrics: {
					provider: {
						customUI: {
							"borderRadiusButton": "56px",
							"borderStyleSurfaceModal": "0px",
							"fontWeightBody": 400,
							"fontSizeBody": "16px",
							"fontSizeSubtitle": "16px",
							"fontSizeTitle": "40px",
							"colorBackgroundSurfaceModal": "white",
							"colorBackgroundIcon": "black",
							"colorBorderLinkUnderline": "black",
							"colorBackgroundLinkActive": "black",
							"colorBackgroundLinkHover": "blue",
							"colorBackgroundDocTypeButton": "black",
							"colorContentBody": "rgb(255,255,255)",
							"colorContentTitle": "rgb(247, 25, 233)",
							"colorContentSubtitle": "rgb(247, 25, 233)",

							"colorContentButtonPrimaryText": "rgb(41, 140, 41)",
							"colorBackgroundButtonPrimary": "rgb(237, 245, 17)",
							"colorBackgroundButtonPrimaryHover": "rgb(55, 115, 245)",
							"colorBackgroundButtonPrimaryActive": "rgb(55, 115, 245)",

							"colorContentButtonSecondaryText": "rgb(255,255,255)",
							"colorBackgroundButtonSecondary": "rgb(50,53,61)",
							"colorBackgroundButtonSecondaryHover": "rgb(30,32,37)",
							"colorBackgroundButtonSecondaryActive": "rgb(30,32,37)",
							"colorContentLinkTextHover": "rgb(55, 115, 245)",
							"colorBorderDocTypeButton": "rgb(20, 21, 25)",
							"colorBackgroundDocTypeButtonHover": "rgb(30,32,37)",
							"colorBackgroundDocTypeButtonActive": "rgb(30,32,37)",
							"colorContentDocTypeButton": "rgb(255,255,255)",
							"colorIcon": "rgb(55, 115, 245)",
							"colorContentInfoPill": "rgb(10,11,13)",
							"colorBackgroundInfoPill": "rgb(55, 115, 245)",
							"colorBackgroundSelector": "red",
							"colorInputOutline": "rgb(87, 139, 250)",
							"colorContentButtonTertiaryText": "rgb(255,255,255)",
							"colorContentInput": "blue",
							"colorBackgroundInput": "green",
							"colorBorderInput": "yellow"
						}
					}
				},
		},
	});

	const onesdkParam = oneSdk.component('ocr');
	const oneSdkIndividual = oneSdk.individual();
	oneSdkIndividual.addConsent("general");
	oneSdkIndividual.addConsent("docs");
	oneSdkIndividual.addConsent("creditheader");
	await oneSdkIndividual.submit();

	onesdkParam.mount("#onfido-container");
})
</script>

<template>
	<div id="onfido-container" style="width: '100%'; height: 85vh"></div>
</template>