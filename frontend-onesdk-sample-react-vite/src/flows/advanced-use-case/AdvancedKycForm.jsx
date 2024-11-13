"use client"
import { useEffect } from "react";
import useOneSDK from "../../useOneSDK";

const AdvancedKyc = () => {
  const config = {
    mode: "production",
    recipe: {
      form:{
        provider:{
          name: 'react',
          googleApiKey: ""
        }
      }
    },
  };
  const alternateKey = false
  const { oneSDKInstance } = useOneSDK({ config, alternateKey })
	const appContainer = '#form-container-nob'
  
  const initOneSDK = async () => {
		const oneSdkIndividual = oneSDKInstance.individual();
		oneSdkIndividual.setProfileType("auto");
	
		const welcome = oneSDKInstance.component("form", {
			name: "WELCOME",
			mode: "individual",
			type: "manual",
		});
		const consent = oneSDKInstance.component("form", {
			name: "CONSENT",
			mode: "individual",
			type: "manual",
		});
	
		const personal = oneSDKInstance.component("form", {
			name: "PERSONAL",
			mode: "individual",
			type: "manual",
			title: {
				label: "Personal Details",
			},
			descriptions: [
				{
					label: "In this section, we need your personal information",
				},
				{
					label: "Please enter your information accordingly",
				},
			],
			personal: {
				countries: {
					default: {
						default: {
							fields: [
								{
									fieldType: "address",
									name: "address.fullAddress",
									acceptedCountries: ["PHL", "AUS", "SGP", "CHN"],
								},
							],
						},
					},
					CHN: {
						default: {
							fields: [
								{
									fieldType: "date",
									label: "出生日期",
									name: "dateOfBirth",
									hide: false,
									calendarConfig: {
										age: {
											min: 18,
											max: 85,
											message: "年龄必须在18到85岁之间",
											locale: "chinese",
										},
									},
									helperText: "请输入您的出生日期",
								},
	
								{
									fieldType: "input",
									label: "名字",
									name: "givenName",
									hide: false,
									helperText: "请输入您的名字",
								},
								{
									fieldType: "input",
									label: "中间名",
									name: "middleName",
									hide: false,
								},
								{
									fieldType: "input",
									label: "姓氏",
									name: "familyName",
									hide: false,
									helperText: "请输入您的姓氏",
								},
								{
									fieldType: "address",
									label: "法定地址",
									name: "address.fullAddress",
									helperText: "请输入您的居住地址",
									placeholder: "请输入一个地址",
								},
							],
						},
					},
				},
			},
		});
	
		const document = oneSDKInstance.component("form", {
			name: "DOCUMENT",
			mode: "individual",
			type: "manual",
		});
	
		const review = oneSDKInstance.component("form", {
			name: "REVIEW",
			mode: "individual",
			type: "manual",
			verify: true,
		});
	
		const retry = oneSDKInstance.component("form", {
			name: "RETRY",
			mode: "individual",
			type: "manual",
		});
	
		const result_success = oneSDKInstance.component("form", {
			name: "RESULT",
			type: "manual",
			state: "SUCCESS",
			title: { label: "Complete" },
			descriptions: [
				{ label: "Process is now complete. You can close the page" },
			],
			cta: { label: "Done" },
		});
	
		const result_fail = oneSDKInstance.component("form", {
			name: "RESULT",
			type: "manual",
			state: "FAIL",
		});
	
		const partial = oneSDKInstance.component("form", {
			name: "RESULT",
			mode: "individual",
			state: "PARTIAL",
			type: "manual",
		});
	
		welcome.on("form:welcome:ready", () => {
			consent.mount(appContainer);
		});
	
		consent.on("form:consent:ready", async () => {
			personal.mount(appContainer);
		});
	
		personal.on("form:personal:ready", async () => {
			document.mount(appContainer);
		});
	
		document.on("form:document:back", async () => {
			personal.mount(appContainer);
		});
	
		document.on("form:document:ready", async () => {
			review.mount(appContainer);
		});
	
		review.on("form:review:success", async () => {
			result_success.mount(appContainer);
		});
	
		review.on("form:review:failed", async () => {
			result_fail.mount(appContainer);
		});
	
		let retryCount = 0;
		review.on("form:review:partial", async () => {
			// block of code for partial success
			// here, we limit user to retry 2 times
			// if more, we will mount failed screen
			if (retryCount < 2) {
				partial.mount(appContainer);
			} else {
				result_fail.mount(appContainer);
			}
		});
	
		result_success.on("form:result:success", async () => {
			console.log("success")
			// block of code for submission success
		});
	
		result_fail.on("form:result:failed", async () => {
			console.log("failed")
			// block of code for submission failed
		});
	
		partial.on("form:result:partial", async () => {
			retryCount += 1
			retry.mount(appContainer)
		})
	
	
		welcome.mount(appContainer);
  }
    
  useEffect(() => {
    if(oneSDKInstance) {
      initOneSDK()
    }
  }, [oneSDKInstance])

  const onBoard = () => {
    return <div id='form-container-nob' ></div>
  }
  return onBoard()
}

export default AdvancedKyc 