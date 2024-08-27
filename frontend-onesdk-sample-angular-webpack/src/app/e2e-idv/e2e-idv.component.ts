import { Component, OnInit } from '@angular/core';
import { OnesdkTokenService } from '../onesdk-token.service';
import OneSDK from '@frankieone/one-sdk';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-e2e-idv',
	templateUrl: './e2e-idv.component.html',
	styleUrls: ['./e2e-idv.component.css']
})
export class E2eIdvComponent implements OnInit {
	constructor(private tokenService: OnesdkTokenService) { }

	async ngOnInit() {
		const oneSdk = await OneSDK({
			session: await this.tokenService.getToken(
				environment.CUSTOMER_ID,
				environment.API_KEY,
				environment.CUSTOMER_CHILD_ID
			),
			recipe: {
				form: {
					provider: {
						name: 'react',
						googleApiKey: environment.GOOGLE_API_KEY
					},
				}
			}
		});

		const component = oneSdk.component as unknown as (arg0: any, arg1?: any) => any;
		const flow = oneSdk.flow as unknown as (arg0: any) => any;

		const oneSdkIndividual = oneSdk.individual();
		oneSdkIndividual.addConsent("general");
		oneSdkIndividual.addConsent("docs");
		oneSdkIndividual.addConsent("creditheader");
		await oneSdkIndividual.submit();

		const idv = flow("idv");
		const loading1 = component("form", { name: "LOADING", title: { label: "Loading..." }, descriptions: [{ label: "" }] });
		const loading2 = component("form", { name: "LOADING", title: { label: "Processing results..." }, descriptions: [{ label: "Hold tight, this can take up to 30 seconds. Please do not refresh this page or click the 'back' button on your browser." }] });
		const review = component("form", {
			name: "REVIEW",
			type: "ocr",
		});

		let before = true;
		idv.on("loading", (display: any) => {
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

		idv.on("results", async ({ checkStatus }: { checkStatus: any; }) => {
			if (checkStatus) {
				loading2.unmount();
				review.mount("#e2e-idv-container");
			}
		});

		idv.on("detection_complete", (message: any) => {
			loading2.mount("#e2e-idv-loading2");
		});

		idv.mount("#e2e-idv-container");
	}
}