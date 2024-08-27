<script setup>
import { useOneSdkSession } from '@/composables/onesdk-session';
import { configurations } from '@/helper/onboarding.config';
import OneSDK from '@frankieone/one-sdk';
import { watchEffect } from 'vue';

const session = useOneSdkSession()

watchEffect(async () => {
	if (!session.value) return

	const oneSdk = await OneSDK({
		session: session.value,
		mode: "development",
		recipe: {
				form: {
					provider: {
						name: 'legacy',
						version: 'v4'
					}
				}
			},
	});

	const oneSdkIndividual = oneSdk.individual();
	oneSdkIndividual.addConsent("general");
	oneSdkIndividual.addConsent("docs");
	oneSdkIndividual.addConsent("creditheader");
	await oneSdkIndividual.submit();

	let ff_phrases_object =
	{
		"common": {
			"next_button_cta": "Next",
			"confirm_button_cta": "Yes, that's correct",
			"save_button_cta": "Save",
			"edit_button_cta": "Edit",
			"cancel_button_cta": "Cancel",
			"mandatory_field": "*"
		},
		"applicant": {
			"name": "Name",
			"english_name": "English Name",
			"native_name": "Native Name",
			"date_of_birth": "Date of Birth",
			"date_of_birth_buddhist": "Buddhist Date of Birth",
			"current_address": "Current Residential Address",
			"previous_address": "Previous Residential Address",
			"gender": "Gender",
			"marital_status": "Marital status"
		},
		"document": {
			"number": "Number",
			"type_passport": {
				"label": "Passport",
				"subtitle": "",
				"number": "Passport Number",
				"country": "Country of Issue",
				"expiry": "Date of Expiry"
			},
			"type_drivers_licence": {
				"heading": "Driver's licence",
				"label": "Driver's Licence",
				"subtitle": "(recommended)",
				"state": "State or Territory of Issue",
				"licence_number": "Licence Number",
				"card_number": "Card Number",
				"country": "Country of Issue",
				"version_number": "Version Number",
				"digital_consent": "This is a digital licence and I don't have my physical licence with me.",
				"digital_notification_banner": "A physical licence is required to open an account. You may complete the application however you may need to provide additional information."
			},
			"type_medicare": {
				"label": "Medicare Card",
				"subtitle": "",
				"number": "Number",
				"colour": "Colour",
				"position": "Position",
				"expiry": "Expiry Date",
				"name": "Name as shown on card"
			},
			"type_national_id": {
				"label": "National ID",
				"subtitle": "(Citizen / Permanent resident)",
				"laser_code": "Laser Code",
				"country": "Country of Citizenship",
				"identification_number": "Identification Number",
				"name": "Name as shown on card",
				"nationality": "Nationality"
			}
		},
		"document_select": {
			"title": "Choose your ID",
			"title_extra": "Looks like you need to try a different ID",
			"subtitle": "We'll need at least one of the following documents to verify your identity.",
			"hint_message": "Choose which ID you'd like to provide.",
			"footer_text": "Your ID must be valid and not expired"
		},
		"document_uploads": {
			"title": "Upload your document",
			"guide_text": "Please choose and upload one of the following documents to complete your verification.",
			"select_placeholder": "Select document type",
			"upload_cta": "Upload",
			"upload_success": "Successfully uploaded",
			"generic_error": "There was a problem uploading your file",
			"summary_title": "Documents uploaded",
			"unsupported_file_type": "Uploaded file is of invalid type"
		},
		"name_input_screen": {
			"title": "Your name",
			"dual_name_english_title": "Your English name",
			"dual_name_native_title": "Your Native name",
			"title_loop": "Check your name",
			"dual_name_english_title_loop": "Check your English name",
			"dual_name_native_title_loop": "Check your Native name",
			"subtitle": "What is your full legal name as it is shown exactly on your ID.",
			"honorific_title_label": "Title",
			"given_name_label": "Given Name",
			"given_name_confirmation_label": "(as shown on ID)",
			"middle_name_label": "Middle Name or Initial",
			"middle_name_confirmation_label": "(only include if shown on ID)",
			"family_name_label": "Surname",
			"family_name_confirmation_label": "(as shown on ID)",
			"medicare_middle_name_label": "How is your middle name displayed on your Medicare Card?"
		},
		"passport_input_screen": {
			"title": "Your passport details",
			"title_loop": "Check your passport details",
			"expiry_date_placeholder": "DD/MM/YYYY",
			"australian_passport_number_invalid_message": "This passport number is invalid"
		},
		"current_address_screen": {
			"title": "Your current residential address",
			"title_loop": "Check your current residential address"
		},
		"previous_address_screen": {
			"title_first_time": "What is your previous residential address?",
			"title": "Your previous residential address",
			"title_loop": "Check your current residential address",
			"question_has_previous_address": "Have you been at your address for less than 6 months?"
		},
		"date_of_birth_input_screen": {
			"title": "Your date of birth",
			"title_loop": "Check your date of birth",
			"full_date_label": "Day / Month / Year",
			"full_date_label_buddhist": "Day / Month / Year (Day and month are optional)",
			"day_label": "DD",
			"month_label": "MM",
			"year_label": "YYYY",
			"message_label": "Your birthday is the {0}, making you {1} years old",
			"minimum_age_error_label": "You must be over {0} years old to open an account",
			"error_message_label": "Oops, looks like there might have been a mistake, try again",
			"buddhist": "Buddhist",
			"gregorian": "Gregorian"
		},
		"medicare_input_screen": {
			"title": "Your Medicare card details",
			"title_loop": "Check your Medicare card details"
		},
		"drivers_licence_input_screen": {
			"title": "Your driver's licence details",
			"title_loop": "Check your driver's licence details",
			"state_screen_title": "What state was your driver's licence issued?",
			"licence_number": {
				"placeholder": {
					"AUS": {
						"ACT": "e.g. 1234567890",
						"NSW": "e.g. 1234567890",
						"NT": "e.g. 1234567",
						"QLD": "e.g. 123456789",
						"SA": "e.g. W12345",
						"TAS": "e.g. 1234567",
						"VIC": "e.g. 1234567890",
						"WA": "e.g. 1234567"
					}
				},
				"error": "This licence number is invalid"
			},
			"document_number": {
				"placeholder": {
					"AUS": {
						"ACT": "e.g. A123456789",
						"NSW": "e.g. 1234567890",
						"NT": "e.g. 12345678",
						"QLD": "e.g. FCC1234567",
						"SA": "e.g. D12345678",
						"TAS": "e.g. D12345678",
						"VIC": "e.g. P1234567",
						"WA": "e.g. L123456789"
					}
				},
				"hint": {
					"AUS": {
						"ACT": "The card number is located on the front of your card, running vertically alongside your photo.",
						"NSW": "The card number is located on the front of your card, in the top right corner above your photo.",
						"NT": "The card number is located on the back of your card, either in the bottom left corner or bottom middle.",
						"QLD": "The card number is located in the bottom middle on the front, or the bottom right of the back of your card.",
						"SA": "The card number is located on the back of your card, in the top right corner.",
						"TAS": "The card number is located on the back of your card, in the top right corner.",
						"VIC": "The card number is located on the back of your card, either in the top right corner or middle right.",
						"WA": "The card number is located on the back of your card, in the middle of the right side."
					}
				},
				"error": "This card number is invalid"
			}
		},
		"national_id_input_screen": {
			"title": "Your national ID details",
			"title_loop": "Check your National ID details"
		},
		"address_manual_input_screen": {
			"unit_label": "Unit Number",
			"street_number_label": "Street Number",
			"street_name_label": "Street Name",
			"country_placeholder": "Country",
			"suburb_label": "Suburb",
			"town_label": "Suburb / Town",
			"state_label": "State",
			"postcode_label": "Postcode",
			"country_label": "Country",
			"full_address_label": "Full address",
			"unit_placeholder": "Unit",
			"street_number_placeholder": "Street Number",
			"street_name_placeholder": "Street Name",
			"suburb_placeholder": "Suburb",
			"town_placeholder": "Suburb / Town",
			"state_placeholder": "State",
			"postcode_placeholder": "Postcode",
			"full_address_placeholder": "Full address"
		},
		"address_autocomplete_input_screen": {
			"switch_to_manual": "Enter address manually",
			"autocomplete_label": "Cannot be a PO Box",
			"autocomplete_placeholder": "Start typing your address...",
			"autocomplete_no_match_message": "No results found. Click here to add address manually."
		},
		"review_details_screen": {
			"title": "Are these details correct?",
			"personal_info_label": "Your Personal Info",
			"submit_button_idle": "Verifying",
			"submit_button_cta": "Looks good, verify my identity",
			"edit_title_name": "Edit your name",
			"edit_title_dual_name_english": "Edit your English name",
			"edit_title_dual_name_native": "Edit your native name",
			"edit_title_dob": "Edit your date of birth",
			"edit_title_current_address": "Edit your current residential address",
			"edit_title_previous_address": "Edit your previous residential address",
			"edit_title_passport": "Edit your passport details",
			"edit_title_drivers_licence": "Edit your driver's licence details",
			"edit_title_national_health_id": "Edit your Medicare details",
			"edit_title_national_id": "Edit your national ID details",
			"loading_verification": "<h1>Verifying your identity...</h1><p>Please do not close or refresh this page.</p>"
		},
		"success_screen": {
			"title": "Woohoo!",
			"title_credit_header": "Your identity has been verified",
			"subtitle": "Your identity has been verified.",
			"credit_header_title": "Please Note:",
			"credit_header_description_p_1": "The details you provided didn't match the records held on file by one or all of the credit reporting agencies we checked (Illion, Equifax and/or Experian).",
			"credit_header_description_p_2": "Don't worry, this doesn't mark or affect credit history in any way. However this could be why we've had trouble verifying your identity.",
			"credit_header_description_p_3": "There is nothing you need to do, however if you'd like more information please feel free to get in touch with our customer service team."
		},
		"failure_screen": {
			"title": "Oh no!",
			"subtitle": "Unfortunately we couldn't verify your identity at this time. test",
			"failure_hint": "Please contact our customer support team who will be happy to help you open your account. test",
			"credit_header_title": "Please Note:",
			"credit_header_description_p_1": "The details you provided didn't match the records held on file by one or all of the credit reporting agencies we checked (Illion, Equifax and/or Experian).",
			"credit_header_description_p_2": "Don't worry, this doesn't mark or affect credit history in any way. However this could be why we've had trouble verifying your identity.",
			"credit_header_description_p_3": "There is nothing you need to do, however if you'd like more information please feel free to get in touch with our customer service team.",
			"cta_text": "Check your ID information"
		},
		"pending_screen": {
			"title": "You're all done...",
			"innner_p_1": "There are still a couple of things we need to check before opening your account.",
			"innner_p_2": "We'll let you know once it's complete.",
			"credit_header_title": "Please Note:",
			"credit_header_description_p_1": "The details you provided didn't match the records held on file by one or all of the credit reporting agencies we checked (Illion, Equifax and/or Experian).",
			"credit_header_description_p_2": "Don't worry, this doesn't mark or affect credit history in any way. However this could be why we've had trouble verifying your identity.",
			"credit_header_description_p_3": "There is nothing you need to do, however if you'd like more information please feel free to get in touch with our customer service team."
		},
		"partial_match_screen": {
			"title": "We couldn't verify your identity",
			"subtitle": " Most of the time it's just a typo, let's check your details have been entered correctly.",
			"credit_header_title": "Please Note:",
			"credit_header_description_p_1": "The details you provided didn't match the records held on file by one or all of the credit reporting agencies we checked (Illion, Equifax and/or Experian).",
			"credit_header_description_p_2": "Don't worry, this doesn't mark or affect credit history in any way. However this could be why we've had trouble verifying your identity.",
			"credit_header_description_p_3": "There is nothing you need to do, however if you'd like more information please feel free to get in touch with our customer service team.",
			"cta_text": "Check your ID information"
		},
		"no_match_screen": {
			"title": "We're having trouble verifying your identity test",
			"subtitle": " Most of the time it's just a typo, let's check your details have been entered correctly. test",
			"credit_header_title": "Please Note:",
			"credit_header_description_p_1": "The details you provided didn't match the records held on file by one or all of the credit reporting agencies we checked (Illion, Equifax and/or Experian).",
			"credit_header_description_p_2": "Don't worry, this doesn't mark or affect credit history in any way. However this could be why we've had trouble verifying your identity.",
			"credit_header_description_p_3": "There is nothing you need to do, however if you'd like more information please feel free to get in touch with our customer service team."
		},
		"credit_header_failure_screen": {
			"title": "Before we proceed...",
			"credit_header_description_p_1": "The details you provided didn't match the records held on file by one or all of the credit reporting agencies we checked (Illion, Equifax and/or Experian).",
			"credit_header_description_p_2": "Don't worry, this doesn't mark or affect credit history in any way. However this could be why we've had trouble verifying your identity.",
			"credit_header_description_p_3": "Please contact our customer support team who will be happy to help.",
			"cta_text": "Proceed"
		},
		"unauthorize_error_screen": {
			"title": "This link has expired.",
			"sub_titlte_p_1": "You will need to get a new link to proceed.",
			"sub_titlte_p_2": "Links last 2 hours."
		},
		"error_label": {
			"missing": "{fieldName} is required",
			"invalid": "{fieldName} is invalid",
			"incomplete": "{fieldName} is incomplete",
			"expired": "{documentName} is expired"
		},
		"errors": {
			"default": {
				"text": "Something went wrong.",
				"explanation": "Please try refreshing or contact our support team.",
				"cta": "Refresh",
				"url": ""
			},
			"400": {
				"text": "Token is not authorised",
				"explanation": "Please re-initialise with a different token"
			},
			"1023 - 404": {
				"text": "Can't retrieve original document",
				"explanation": "Contact help desk"

			}
		}
	};

	const ff_config_object = {
		"mode": "production",
		ageRange: [18, 125],
		organisationName: "BobBank",
		"checkProfile": "customer",
		"phrases": ff_phrases_object,
		"maxAttemptCount": 2,
		"welcomeScreen": {
			"htmlContent": "HI",
			"ctaText": "START NOW"
		},
		"documentTypes": [
			"PASSPORT",
			"DRIVERS_LICENCE",

		],
		"failureScreen": {
			"ctaUrl": "https://google.com",
			"ctaText": "testing failure screen"
		},
		"progressBar": true,
		"googleAPIKey": process.env.VUE_APP_GOOGLE_API_KEY,
		"acceptedCountries": [
			"AUS"
		],

		"dateOfBirth": {
			"type": "gregorian"
		},
		"idScanVerification": {
			"welcomeScreen": {
				"title": "Verify your identity",
				"content": ["We need to collect some personal information to verify your identity before we can open your account."],
				"ctaText": "Start Identity Verification"
			}
		},
		"pendingScreen": {
			"htmlContent": null,
			"ctaActions": [{
				"url": "",
				"text": "testing failure screen"
			}]
		},
		"requestAddress": false,
		"documentUploads": false,
		"lazyIDCheck": false,
		"requestID": true,
		"disableThirdPartyAnalytics": false,
		"saveOnly": true
	};

	const ff_passport = {
		...ff_config_object,
		welcomeScreen: {
			"htmlContent": "Test Edit welcome screen",
			"ctaText": "Welcome"
		},
		documentTypes: ["PASSPORT"], //will override everything above
	};
	const ff_dl = {
		...ff_config_object,
		welcomeScreen: {
			"htmlContent": "Test Edit welcome screen",
			"ctaText": "Welcome"
		},
		documentTypes: ["DRIVERS_LICENCE"], //will override everything above
	};

	const config_table = {
		default: ff_config_object,
		passport: ff_passport,
		dl: ff_dl
	};

	let smartui_config = 'passport';
	const form = oneSdk.component("form", config_table[smartui_config]);

	form.mount("#smartui-container");
})
</script>

<template>
	<div id="smartui-container" style="width: '100%'; height: 85vh"></div>
</template>