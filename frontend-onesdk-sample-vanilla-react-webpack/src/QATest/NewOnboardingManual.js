"use client"
import React from "react";
import { useEffect } from "react";
import useOneSDK from "../useOneSDK";
import { configurations } from "../config/newonboarding.config";

const NewOnboardingManual = () => {
  const config = {
    mode: "development",
    recipe: {
      ocr: {
        maxDocumentCount: 3,
      },
      form: {
        provider: {
          name: 'react',
          googleApiKey: ""
        },
      }
    }
  };
  const { oneSDKInstance, error: errorOneSDK, loading } = useOneSDK({ config })
  
  const initOneSDK = async () => {
    const ref = null
    // set mock url params
    const confWelcome = true;
    const confConsent = true;
    const confPersonal = true;

    const confDocument  = true
    const confNumID  = true
    const confPassport  = true
    const confDriver  = true
    const confMedicare  = true
    // 
    const oneSdkIndividual = oneSDKInstance.individual();
    oneSdkIndividual.addConsent("general");
    oneSdkIndividual.addConsent("docs");
    oneSdkIndividual.addConsent("creditheader");
    // oneSdkIndividual.setProfileType("default")
    await oneSdkIndividual.submit();

      const form_welcome = oneSDKInstance.component("form", await configurations.configureWelcome(confWelcome));
      const form_consent = oneSDKInstance.component("form", await configurations.configureConsent(confConsent));
      // const form_loading1 = oneSDKInstance.component("form", {name: "LOADING", title: {label: "Loading..."}, descriptions: [{label: ""}]});
      // const form_loading2 = oneSDKInstance.component("form", {name: "LOADING", title: {label: "Extracting data..."}, descriptions: [{label: "Hold tight, this can take up to 30 seconds. Please do not refresh this page or click the 'back' button on your browser."}]});
      // const form_loading3 = oneSDKInstance.component("form", {name: "LOADING", title: {label: "Hold on..."}, descriptions: [{label: ""}]});
      
      const form_personal = oneSDKInstance.component("form", await configurations.configurePersonal(confPersonal));

      const form_document = oneSDKInstance.component("form", await configurations.configureDocument(confDocument,confNumID,confPassport,confDriver,confMedicare));

      console.log(form_document)
        const form_review = oneSDKInstance.component("form", {
          name: "REVIEW",
          type: "manual",
          verify: true
        });

        const form_retry = oneSDKInstance.component("form", {
          name: "RETRY",
          type: "manual",
        });
      
        // const form_result = oneSDKInstance.component("form", {
        //   name: "RESULT",
        //   type: "manual",
        //   state: 'FAIL',
        //   title: {label:'Complete'},
        //   descriptions: [{label:'Process is now complete. You can close the page'}],
        //   cta:{label: 'Close'}
        //   //title: {label: "Choose Your ID"}
        
        //   //showPreps: true,
        // });

      // const biometrics = oneSDKInstance.component('biometrics');

      form_welcome.mount("#smartui-container");
      form_welcome.on("form:welcome:ready", () => {
        form_consent.mount("#smartui-container");
      });
      
      form_consent.on("form:consent:ready", async () => {
        //await oneSdkIndividual.submit();
        form_personal.mount("#smartui-container");
      });

      form_welcome.on("form:welcome:failed", () => {
        // display error message
      });
      
      form_welcome.on("*", (message) => {
        console.log(message);
      });

      // let docType;

      form_personal.on("form:personal:ready", async () => {
        //await oneSdkIndividual.submit();
        form_document.mount("#smartui-container");
      });

      form_document.on("form:document:back", async ({inputInfo}) => {
        //document.querySelector(".loader-wrapper").style.display = "block"
        
        //const ocr = oneSdk.component("ocr");
        form_personal.mount("#smartui-container");
      
      });

      form_document.on("form:document:ready", async ({inputInfo}) => {
        //document.querySelector(".loader-wrapper").style.display = "block"
        
        //const ocr = oneSdk.component("ocr");
        form_review.mount("#smartui-container");
      
      });

      form_review.on("form:review:ready", async ({inputInfo}) => {
        //document.querySelector(".loader-wrapper").style.display = "block"
        
        //const ocr = oneSdk.component("ocr");
        //form_review.mount("#smartui-container");
       
      });

      let count = 0;
      form_review.on("form:result:partial", async () => {
        //biometrics.mount("#smartui-container");
        
        if (count < 2)
        {
          form_retry.mount("#smartui-container");
          count+=1;
        }
        console.log(count);

      });
  }
    
  useEffect(() => {
    if(oneSDKInstance) {

      initOneSDK()
    }
  }, [oneSDKInstance])
  const onBoard = () => {
    if(errorOneSDK) return <div>{errorOneSDK}</div>
    return <div id='smartui-container' ></div>
  }
  return <>{loading && <div>Loading...</div> } <div id='smartui-container' ></div></>
}

export default NewOnboardingManual