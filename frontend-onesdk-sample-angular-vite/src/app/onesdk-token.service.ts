import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

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

	getTokenWithChildId = async () => {

	};
}
