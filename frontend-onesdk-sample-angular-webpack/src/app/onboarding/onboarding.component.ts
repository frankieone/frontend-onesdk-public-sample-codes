import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OnesdkTokenService } from '../onesdk-token.service';
import OneSDK from '@frankieone/one-sdk';

@Component({
	selector: 'app-onboarding',
	templateUrl: './onboarding.component.html',
	styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent implements OnInit {
	constructor(private tokenService: OnesdkTokenService) { }

	configurations = {
		async configureWelcomeOCR(configureWelcomeOCR: any) {
			let configWelcomeOCR: any = {
				name: "WELCOME"
			};

			if (configureWelcomeOCR === "true") {
				configWelcomeOCR = {
					name: "WELCOME",
					type: "manual",
					title: { label: "Config Title" },
					descriptions: [
						{ label: "Config Description Line 1", style: {} }
					],
					instructions: {
						content: [{ label: " Config Instructions" }],
						style: { "ff-instructions": { "font-family": "Helvetica" } }
					},
					cta: {
						label: "Config button",
						style: { "ff-button": { backgroundColor: "green" } }
					}
				};
			}
			return configWelcomeOCR;
		},

		async configureConsentOCR(configureConsentOCR: any) {
			let configConsentOCR: any = {
				name: "CONSENT"
			};

			if (configureConsentOCR === "true") {
				configConsentOCR = {
					name: "CONSENT",
					title: {
						label: "Config Consent Title",
						style: { "ff-title": { "font-family": "Cascadia code" } }
					},
					descriptions: [
						{ label: "Config Description 1", style: {} },
						{ label: "Config Description 2", style: {} },
						{ label: "Config Description 3", style: {} }
					],
					cta: {
						label: "Config Consent Button",
						style: { "ff-button": { backgroundColor: "green" } }
					}
				};
			}
			return configConsentOCR;
		},

		async configureDocumentIDOCR(
			configureDocumentIDOCR: any,
			configurePassportOCR: any,
			configureDriverOCR: any,
			configureMedicareOCR: any
		) {
			let configPassportOCR: any = "";
			let configDriverOCR: any = "";
			let configMedicareOCR: any = "";

			let configDocumentOCR: any = { name: "DOCUMENT", showPreps: true };

			if (configurePassportOCR === "true") {
				configPassportOCR = {
					type: "PASSPORT",
					label: "Config Passport"
				};
			}

			if (configureDriverOCR === "true") {
				configDriverOCR = {
					type: "DRIVERS_LICENCE",
					label: "Config Driver Licence"
				};
			}
			if (configureMedicareOCR === "true") {
				configMedicareOCR = {
					type: "NATIONAL_HEALTH_ID",
					label: "Config Medicare"
				};
			}

			if (configureDocumentIDOCR === "true") {
				configDocumentOCR = {
					name: "DOCUMENT",
					type: "ocr",
					title: { label: "Configure ID" },
					descriptions: [{ label: "Configure Description" }],
					documents: [
						configPassportOCR,
						configDriverOCR,
						configMedicareOCR
					]
				};
			}

			return configDocumentOCR;
		},
	};

	async ngOnInit() {
		const oneSdk = await OneSDK({
			session: await this.tokenService.getToken(
				environment.CUSTOMER_ID,
				environment.API_KEY,
				environment.CUSTOMER_CHILD_ID
			),
			recipe: {
				ocr: {
					provideReviewScreen: false,
					maxDocumentCount: 1,
				},
				form: {
					provider: {
						name: 'react',
						googleApiKey: environment.GOOGLE_API_KEY
					}
				}
			},
		});

		const component = oneSdk.component as unknown as (arg0: any, arg1?: any) => any;

		const oneSdkIndividual = oneSdk.individual();
		oneSdkIndividual.addConsent("general");
		oneSdkIndividual.addConsent("docs");
		oneSdkIndividual.addConsent("creditheader");
		await oneSdkIndividual.submit();

		const welcome = component('form', await this.configurations.configureWelcomeOCR(true));
		const consent = component('form', await this.configurations.configureConsentOCR(true));
		const document = component('form', await this.configurations.configureDocumentIDOCR(true, true, true, true));
		const ocr = component('ocr');
		const review = component('form', {
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
	}
}