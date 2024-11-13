"use client"
import { useEffect } from "react";
import useOneSDK from "../useOneSDK";

const IDVIncode = () => {
  const config = {
    mode: "development",
    recipe: {
      idv: {
        provider: {
          name: 'incode'
        }
      },
    },
  };
  const { oneSDKInstance, loading } = useOneSDK({ config })

	const appContainer = '#idv-el-incode';
  
  const initOneSDK = async () => {
      // 4. Use IDV component
      const idv = oneSDKInstance.flow("idv");

			const review = oneSDKInstance.component("form", {
				name: "REVIEW",
				mode: "individual",
				type: "ocr",
				verify: true,
			});
      const oneSdkIndividual = oneSDKInstance.individual();
      oneSdkIndividual.addConsent("general");
      oneSdkIndividual.addConsent("docs");
      oneSdkIndividual.addConsent("creditheader");
      // oneSdkIndividual.setProfileType("default")
      await oneSdkIndividual.submit();

      idv.mount("#idv-el-incode");
      // 5. Monitor OCR results
      idv.on("results", async ({checkStatus, document, entityId}) => {
        if (checkStatus) {
          console.log("results successful");
          console.log(checkStatus);
          console.log(document);
          console.log(entityId);
        } else {
          console.log("no data returned");
        }
    });

		const extract_loading = oneSDKInstance.component("form", {
			name: "LOADING",
			title: {label: "Extracting data..."},
			descriptions: [
				{
					label: "Hold tight, this can take up to 30 seconds. Please do not refresh this page or click the 'back' button on your browser."
				}
			]
		});
	
		const result = oneSDKInstance.component('form', {
			name: 'RESULT',
			mode: 'individual',
			type: 'manual',
			state: 'SUCCESS',
			title: { label: "Thanks, you're all done" },
			descriptions: [
				{
					label:
						'You can close this page and continue your application.',
				},
			],
			cta: null,
		});
	
		const failed = oneSDKInstance.component("form", {
			name: "RESULT",
			mode: "individual",
			state: "FAIL",
			type: "manual",
		});
	
		const retry = oneSDKInstance.component("form", {
			name: "RETRY",
			mode: "individual",
			type: "manual",
		});
	
		idv.on('detection_complete', (message) => {
      console.log("capture finished");
      console.log(message);
			extract_loading.mount(appContainer);
		});
	
		idv.on('results', () => {
			extract_loading.unmount();
			review.mount(appContainer);
		})
	
		idv.on('error', (message, payload) => {
      console.log("received error");
      console.log(message, payload);
			extract_loading.unmount();
			failed.mount(appContainer);
		})
	
		review.on('form:review:ready', async () => {
			await oneSDKInstance.individual().submit({ verify: true });
			appContainer.style.display = 'block';
	
			result.mount(appContainer);
		})
	
		review.on("form:result:failed", async () => {
			failed.mount(appContainer);
		});
	
		let count = 0;
		review.on("form:result:partial", async () => {
			if (count < 2) {
				retry.mount(appContainer);
				count += 1;
			}
		});
	
		idv.on('ready', () => {
			appContainer.style.display = 'block';
		});
	
		idv.mount(appContainer);
  }
    
  useEffect(() => {
    if(oneSDKInstance) {

      initOneSDK()
    }
  }, [oneSDKInstance])
  
  return <>{loading && <div>Loading...</div> } <div id='idv-el-incode' ></div></>
}

export default IDVIncode