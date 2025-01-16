import { createRouter, createWebHistory } from "vue-router";
import Idv from "./components/onesdk-test/Idv.vue";
import IDVerse from "./components/onesdk-test/IDVerse.vue";
import Onboarding from "./components/onesdk-test/Onboarding.vue";
import OnboardingManual from "./components/onesdk-test/OnboardingManual.vue";
import Onfido from "./components/onesdk-test/Onfido.vue";
import Sardine from "./components/onesdk-test/Sardine.vue";
import E2eIDV from "./components/onesdk-test/E2eIDV.vue";
import E2eOcrBio from "./components/onesdk-test/E2eOcrBio.vue";
import HelloWorld from "./components/HelloWorld.vue";
import SmartUI from "./components/onesdk-test/SmartUI.vue";

export const routes = [
	{
		path: '/',
		title: 'Home',
		component: HelloWorld
	},
	{
		path: '/idv',
		title: 'IDV',
		component: Idv
	},
	{
		path: '/idverse',
		title: 'IDVerse',
		component: IDVerse
	},
	{
		path: '/onboarding',
		title: 'Onboarding',
		component: Onboarding
	},
	{
		path: '/onboarding-manual',
		title: 'Onboarding Manual',
		component: OnboardingManual
	},
	{
		path: '/onfido',
		title: 'Onfido',
		component: Onfido
	},
	{
		path: '/sardine',
		title: 'Sardine',
		component: Sardine
	},
	{
		path: '/smart-ui',
		title: 'SmartUI',
		component: SmartUI
	},
	{
		path: '/e2e-idv',
		title: 'E2E IDV',
		component: E2eIDV
	},
	{
		path: '/e2e-ocr-bio',
		title: 'E2E OCR BIO',
		component: E2eOcrBio
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router