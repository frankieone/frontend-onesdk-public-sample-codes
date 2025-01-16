import { Component, OnInit } from '@angular/core';
import { OnesdkTokenService } from '../onesdk-token.service';
import OneSDK from '@frankieone/one-sdk';
import { environment } from '../../environments/environment';

@Component({
	selector: 'app-onboarding-manual',
	standalone: true,
	imports: [],
	templateUrl: './onboarding-manual.component.html',
	styleUrl: './onboarding-manual.component.css'
})
export class OnboardingManualComponent implements OnInit {
	constructor(private tokenService: OnesdkTokenService) { }

	configurations = {
		async configureWelcome(configureWelcome: any) {
			let configWelcome: any = { name: "WELCOME", type: "manual" };

			if (configureWelcome === "true") {
				configWelcome = {
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
			return configWelcome;
		},

		async configureConsent(configureConsent: any) {
			let configConsent: any = { name: "CONSENT" };

			if (configureConsent === "true") {
				configConsent = {
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
			return configConsent;
		},

		async configurePersonal(configurePersonal: any) {
			let configPersonal: any = {
				name: "PERSONAL",
				type: "manual",
				personal: {
					countries: {
						default: {
							default: {
								fields: [
									{
										fieldType: "input",
										dataType: "text",
										label: "Email",
										name: "extraData.email",
										hide: false,
										rules: {
											required: {
												value: true,
												message: "Please enter your email"
											}
										}
									},
									{
										fieldType: "phone",
										dataType: "phone",
										label: "Phone Number",
										name: "extraData.phone",
										hide: false,
										placeholder: {
											cc: "Code",
											phoneNumber: "e.g. 0400 000 000"
										},
										options: [
											{ label: "AU +61", value: "+61" },
											{ label: "NZ +64", value: "+64" }
										],
										rules: {
											required: {
												value: true,
												message:
													"Please enter your phone number"
											}
										}
									}
								]
							}
						}
					}
				}
			};

			if (configurePersonal === "true") {
				configPersonal = {
					name: "PERSONAL",
					type: "manual",
					title: { label: "Config Personal Title" },
					descriptions: [{ label: "Config Description 1", style: {} }],
					cta: {
						label: "Config Personal Button",
						style: { "ff-button": { backgroundColor: "red" } }
					},
					showPreps: true,
					personal: {
						countries: {
							AUS: {
								default: {
									fields: [
										{
											fieldType: "input",
											dataType: "text",
											name: "givenName",
											label: "Given Config Label",
											hide: false,
											placeholder: "Given Config Placeholder",
											rules: {
												minLength: {
													value: 4,
													message:
														"Given name input minimum length 4 Characters config"
												},
												maxLength: {
													value: 10,
													message:
														"Given name input maximum legth 10 Characters config"
												}
											}
										},
										{
											fieldType: "input",
											dataType: "text",
											name: "middleName",
											label: "Middle Config Label",
											hide: false,
											placeholder:
												"Middle Config Placeholder",
											rules: {
												minLength: {
													value: 4,
													message:
														"Middle name input minimum length 4 Characters config"
												},
												maxLength: {
													value: 10,
													message:
														"Middle name input maximum legth 10 Characters config"
												}
											}
										},
										{
											fieldType: "input",
											dataType: "text",
											name: "familyName",
											label: "Family Config Label",
											hide: false,
											placeholder:
												"Family Config Placeholder",
											rules: {
												minLength: {
													value: 4,
													message:
														"Family name input minimum length 4 Characters config"
												},
												maxLength: {
													value: 10,
													message:
														"Family name input maximum legth 10 Characters config"
												}
											}
										},
										{
											fieldType: "input",
											dataType: "text",
											label: "Config Email Label",
											name: "extraData.email",
											hide: false,
											placeholder: "Email Config Placeholder",
											rules: {
												required: {
													value: true,
													message:
														"Config Email Error Message"
												}
											}
										},
										{
											fieldType: "date",
											dataType: "text",
											label: "Config DOB Label",
											name: "dateOfBirth",
											hide: false,
											calendarConfig: {
												type: "gregory",
												locale: "en"
											}
										},
										{
											fieldType: "phone",
											dataType: "phone",
											label: "Config Phone Number Label",
											name: "extraData.phone",
											hide: false,
											placeholder: {
												cc: "Code",
												phoneNumber: "e.g. 0400 000 000"
											},
											options: [
												{ label: "AU +61", value: "+61" },
												{ label: "NZ +64", value: "+64" }
											],
											rules: {
												required: {
													value: true,
													message:
														"Config Phone number Error Message"
												}
											}
										},
										{
											fieldType: "address",
											dataType: "current_addr",
											label: "Config Address Label",
											name: "address.fullAddress",
											hide: false,
											placeholder:
												"Config Long Address Placeholder"
										}
									]
								}
							}
						}
					}
				};
			}

			return configPersonal;
		},

		async configureDocument(
			configureIDSelect: any,
			configureNumID: any,
			configurePassport: any,
			configureDriver: any,
			configureMedicare: any
		) {
			let configPassport: any = "";
			let configDriver: any = "";
			let configMedicare: any = "";

			if (
				configureNumID === null ||
				configureNumID === "" ||
				configureNumID === "1"
			) {
				configureNumID = 1;
			}
			console.log("Number of ID: " + configureNumID);
			let configID: any = {
				name: "DOCUMENT",
				type: "manual",
				numberOfIDs: configureNumID
			};

			console.log(configID);

			if (configurePassport === "true") {
				configPassport = {
					type: "PASSPORT",
					label: "Config Passport Label",
					countries: {
						default: {
							default: {
								fields: [
									{
										fieldType: "select",
										name: "country",
										label: "Config Passport Country",
										hide: false
									},
									{
										fieldType: "input",
										name: "idNumber",
										label: "Config Passport Number",
										placeholder: "Passport Number Placeholder",
										hide: false
									}
								]
							}
						},
						NZL: {
							default: {
								fields: [
									{
										fieldType: "select",
										name: "country",
										label: "Config Passport Country",
										hide: false
									},
									{
										fieldType: "input",
										name: "idNumber",
										label: "Config Passport Number",
										placeholder: "Passport Number Placeholder",
										hide: false
									}
								]
							}
						}
					}
				};
			}

			if (configureDriver === "true") {
				configDriver = {
					type: "DRIVERS_LICENCE",
					label: "Config Driver Licence Label",
					countries: {
						default: {
							default: {
								fields: [
									{
										fieldType: "select",
										name: "country",
										label: "Config country",
										hide: false
									},
									{
										fieldType: "select",
										name: "region",
										label: "Config State Label",
										placeholder: "Config State Placeholder",
										hide: false
									},
									{
										fieldType: "input",
										name: "idNumber",
										label: "Config Licence Number Label",
										placeholder:
											"Config Licence Number Placeholder",
										hide: false
									},
									{
										fieldType: "input",
										name: "extraData.document_number",
										label: "Config Extra Document Label",
										placeholder:
											"Config Extra Document Placeholder",
										hide: false
									}
								]
							}
						},
						AUS: {
							default: {
								fields: [
									{
										fieldType: "select",
										name: "country",
										label: "Config country",
										hide: false
									},
									{
										fieldType: "select",
										name: "region",
										label: "Config State Label",
										placeholder: "Config State Placeholder",
										hide: false
									},
									{
										fieldType: "input",
										name: "idNumber",
										label: "Config Licence Number Label",
										placeholder:
											"Config Licence Number Placeholder",
										hide: false
									},
									{
										fieldType: "input",
										name: "extraData.document_number",
										label: "Config Card Number Label",
										placeholder:
											"Config Card Number Placeholder",
										hide: false
									}
								]
							}
						}
					}
				};
			}

			if (configureMedicare === "true") {
				configMedicare = {
					type: "NATIONAL_HEALTH_ID",
					label: "Config Medicare Label",
					countries: {
						default: {
							default: {
								fields: [
									{
										fieldType: "select",
										name: "idSubType",
										label: "Config medicare colour Label",
										hide: false
									},
									{
										fieldType: "input",
										name: "idNumber",
										label: "Config card number Label",
										placeholder:
											"Config Card Number Placeholder",
										hide: false
									},
									{
										fieldType: "input",
										name: "extraData.reference",
										label: "Config Position Label",
										placeholder: "Config Position Placeholder",
										hide: false
									},
									{
										fieldType: "date",
										name: "idExpiry",
										label: "Config Expiry Label",
										hide: false
									}
								]
							}
						}
					}
				};
			}

			if (configureIDSelect === "true") {
				configID = {
					name: "DOCUMENT",
					type: "manual",
					title: { label: "Config Document Title" },
					descriptions: [
						{ label: "Config Document Description", style: {} }
					],
					numberOfIDs: configureNumID,
					documents: [configDriver, configPassport, configMedicare]
				};
			}
			return configID;
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

		const form_welcome = component("form", await this.configurations.configureWelcome(true));
		const form_consent = component("form", await this.configurations.configureConsent(true));

		const form_personal = component("form", await this.configurations.configurePersonal(true));

		const form_document = component("form", await this.configurations.configureDocument(true, 1, false, true, false));

		const form_review = component("form", {
			name: "REVIEW",
			type: "manual",
			verify: true
		});

		const form_retry = component("form", {
			name: "RETRY",
			type: "manual",
		});

		const form_result = component("form", {
			name: "RESULT",
			type: "manual",
			state: 'FAIL',
			title: { label: 'Complete' },
			descriptions: [{ label: 'Process is now complete. You can close the page' }],
			cta: { label: 'Close' }
		});

		form_welcome.mount("#onboarding-manual-container");
		form_welcome.on("form:welcome:ready", () => {
			form_consent.mount("#onboarding-manual-container");
		});

		form_consent.on("form:consent:ready", async () => {
			form_personal.mount("#onboarding-manual-container");
		});

		form_personal.on("form:personal:ready", async () => {
			form_document.mount("#onboarding-manual-container");
		});

		form_document.on("form:document:back", async ({ inputInfo }: { inputInfo: any; }) => {
			form_personal.mount("#onboarding-manual-container");
		});

		form_document.on("form:document:ready", async ({ inputInfo }: { inputInfo: any; }) => {
			form_review.mount("#onboarding-manual-container");
		});

		form_review.on("form:review:ready", async ({ inputInfo }: { inputInfo: any; }) => {
			form_review.mount("#onboarding-manual-container");
		});

		let count = 0;
		form_review.on("form:result:partial", async () => {
			if (count < 2) {
				form_retry.mount("#onboarding-manual-container");
				count += 1;
			}
		});
	}
}
