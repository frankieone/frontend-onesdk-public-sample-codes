import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class OnesdkTokenService {

	constructor() { }

	getToken = async (
		custid: string,
		apikey: string,
		childid?: string | undefined,
	) => {
		// SECURITY WARNING: LOCAL DEVELOPMENT ONLY.
		// This sample creates the OneSDK session in the browser with your API key so it
		// can run without a backend. Never do this in production: anyone who opens your
		// page can read the key and call FrankieOne as you.
		// In production, on YOUR SERVER:
		//   1. create the individual with POST /v2/individuals and keep the entityId;
		//   2. create the session with permissions { preset: 'one-sdk', entityId };
		//   3. send only the session token to the browser.
		// FrankieOne can refuse sessions created from a browser with an API key.
		// See: https://github.com/frankieone/frontend-onesdk-public-sample-codes#production-integration-create-the-session-on-your-server
		const response = await fetch(environment.BASE_API_URL + environment.API_CREATE_SESSION_PATH, {
			method: "POST",
			headers: {
				authorization:
					"machine " +
					btoa([custid, childid, apikey].filter(Boolean).join(":")),
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				permissions: {
					preset: "one-sdk",
					reference: `demo-${ new Date().toISOString() }`
				}
			})
		});
		return response.json();
	};
}
