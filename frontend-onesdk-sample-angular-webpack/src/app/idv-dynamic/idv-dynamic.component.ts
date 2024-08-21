import { Component, OnInit } from '@angular/core';
import { OnesdkTokenService } from '../onesdk-token.service';
import { environment } from 'src/environments/environment';
import OneSDK from '@frankieone/one-sdk';

@Component({
	selector: 'app-idv-dynamic',
	templateUrl: './idv-dynamic.component.html',
	styleUrls: ['./idv-dynamic.component.css']
})
export class IdvDynamicComponent implements OnInit {
	constructor(private tokenService: OnesdkTokenService) { }

	async ngOnInit() {
		const oneSdk = await OneSDK({
			session: await this.tokenService.getToken(
				environment.CUSTOMER_ID,
				environment.API_KEY,
				environment.CUSTOMER_CHILD_ID
			),
		});

		const flow = oneSdk.flow as unknown as (arg0: any) => any;

		const idv = flow("idv");
		const oneSdkIndividual = oneSdk.individual();
		oneSdkIndividual.addConsent("general");
		oneSdkIndividual.addConsent("docs");
		oneSdkIndividual.addConsent("creditheader");
		await oneSdkIndividual.submit();

		idv.mount("#idv-dynamic");
	}
}