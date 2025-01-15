import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OnesdkTokenService } from '../onesdk-token.service';
import OneSDK from '@frankieone/one-sdk';

@Component({
	selector: 'app-idverse',
	templateUrl: './idverse.component.html',
	styleUrls: ['./idverse.component.css']
})
export class IdverseComponent implements OnInit {
	constructor(private tokenService: OnesdkTokenService) { }

	async ngOnInit() {
		const oneSdk = await OneSDK({
			session: await this.tokenService.getToken(
				environment.CUSTOMER_ID,
				environment.API_KEY,
				environment.CUSTOMER_CHILD_ID
			),
			recipe: {
				idv: {
					provider: {
						name: "ocrlabs"
					}
				}
			},
		});

		const flow = oneSdk.flow as unknown as (arg0: any) => any;

		const idv = flow("idv");
		const oneSdkIndividual = oneSdk.individual();
		oneSdkIndividual.addConsent("general");
		oneSdkIndividual.addConsent("docs");
		oneSdkIndividual.addConsent("creditheader");
		await oneSdkIndividual.submit();

		idv.mount("#idverse");
	}
}