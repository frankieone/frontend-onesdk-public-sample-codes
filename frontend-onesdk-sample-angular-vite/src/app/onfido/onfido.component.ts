import { Component, OnInit } from '@angular/core';
import { OnesdkTokenService } from '../onesdk-token.service';
import OneSDK from '@frankieone/one-sdk';
import { environment } from '../../environments/environment';

@Component({
	selector: 'app-onfido',
	standalone: true,
	imports: [],
	templateUrl: './onfido.component.html',
	styleUrl: './onfido.component.css'
})
export class OnfidoComponent implements OnInit {
	constructor(private tokenService: OnesdkTokenService) { }

	async ngOnInit() {
		const oneSdk = await OneSDK({
			session: await this.tokenService.getToken(
				environment.CUSTOMER_ID,
				environment.API_KEY,
				environment.CUSTOMER_CHILD_ID,
			),
			recipe: {
				ocr: {
					provider: {
						name: "onfido",
					},
					documents: [
						{
							type: 'PASSPORT' as any,
							countries: ["AUS"],
						},
						{
							type: 'DRIVERS_LICENCE' as any,
							countries: ["AUS"],
						},
						{
							type: 'NATIONAL_ID' as any,
							countries: ["AUS"],
						},
					]
				},
				biometrics: {
					provider: {
					}
				},
			}
		});

		const component = oneSdk.component as unknown as (arg0: any, arg1?: any) => any;

		// 4. Use IDV component
		const onesdkParam = component('ocr');
		const oneSdkIndividual = oneSdk.individual();
		oneSdkIndividual.addConsent("general");
		oneSdkIndividual.addConsent("docs");
		oneSdkIndividual.addConsent("creditheader");
		await oneSdkIndividual.submit();

		onesdkParam.mount("#onfido-container");
	}
}
