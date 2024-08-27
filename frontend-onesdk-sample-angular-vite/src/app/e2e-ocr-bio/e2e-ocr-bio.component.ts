import { Component, OnInit } from '@angular/core';
import { OnesdkTokenService } from '../onesdk-token.service';
import OneSDK from '@frankieone/one-sdk';
import { environment } from '../../environments/environment';

@Component({
	selector: 'app-e2e-ocr-bio',
	standalone: true,
	imports: [],
	templateUrl: './e2e-ocr-bio.component.html',
	styleUrl: './e2e-ocr-bio.component.css'
})
export class E2eOcrBioComponent implements OnInit {
	constructor(private tokenService: OnesdkTokenService) { }

	async ngOnInit() {
		const oneSdk = await OneSDK({
			session: await this.tokenService.getToken(
				environment.CUSTOMER_ID,
				environment.API_KEY,
				environment.CUSTOMER_CHILD_ID
			),
			recipe: {
				ocr: {
					maxDocumentCount: 3,
				},
				form: {
					provider: {
						name: 'react',
						googleApiKey: environment.GOOGLE_API_KEY
					},
				}
			}
		});

		const component = oneSdk.component as unknown as (arg0: any, arg1?: any) => any;

		const form_welcome = component("form", {
			name: "WELCOME",
			type: "ocr",
		});
		const form_consent = component("form", { name: "CONSENT" });
		const form_loading1 = component("form", { name: "LOADING", title: { label: "Loading..." }, descriptions: [{ label: "" }] });
		const form_loading2 = component("form", { name: "LOADING", title: { label: "Extracting data..." }, descriptions: [{ label: "Hold tight, this can take up to 30 seconds. Please do not referesh this page or click the 'back' button on your browser." }] });
		const form_loading3 = component("form", { name: "LOADING", title: { label: "Hold on..." }, descriptions: [{ label: "" }] });

		const form_document = component("form", {
			name: "DOCUMENT",
			showPreps: true,
		});
		const form_review = component("form", {
			name: "REVIEW",
			type: "ocr",
		});

		const biometrics = component('biometrics');

		form_welcome.mount("#e2e-ocr-bio-container");
		form_welcome.on("form:welcome:ready", () => {
			form_consent.mount("#e2e-ocr-bio-container");
		});

		form_consent.on("form:consent:ready", async () => {
			form_document.mount("#e2e-ocr-bio-container");
		});

		let docType;

		form_document.on("form:document:ready", async ({ inputInfo }: { inputInfo: any; }) => {

			form_loading1.mount("#e2e-ocr-bio-container");
			docType = inputInfo.documentType;

			const ocr = component("ocr", {
				documents: [{ type: docType, countries: ["AUS"] }],
			});

			ocr.mount("#e2e-ocr-bio-container");
			ocr.on("ready", () => form_loading1.unmount());

			ocr.on("results", ({ document }: { document: any; }) => {
				doSomethingAfterOcr({ document });
			});

			ocr.on("loading", (display: any) => {
				if (display) {
					form_loading2.mount("#e2e-ocr-bio-container");
				} else {
					form_loading2.unmount();
				}
			});
		});

		function doSomethingAfterOcr({ document }: { document: any; }) {
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

		biometrics.on("loading", (display: any) => {
			if (display) {
				//alert("loading, show now")
				form_loading3.mount("#e2e-ocr-bio-container");
			} else {
				form_loading3.unmount();
			}
		});

		biometrics.on('processing', () => alert('We will get back to you with results soon'));
	}
}
