import { Injectable } from '@angular/core';

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
		const response = await fetch("https://backend.latest.frankiefinancial.io/auth/v2/machine-session", {
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
