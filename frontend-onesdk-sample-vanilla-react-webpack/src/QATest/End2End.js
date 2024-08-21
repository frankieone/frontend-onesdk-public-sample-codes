"use client"
import React from "react";
import { useEffect } from "react";
import useOneSDK from "../useOneSDK";

const End2End = () => {
  const config = {
    mode: "development",
    recipe: {
      form: {
        provider: {
          name: "react",
          googleApiKey: ""
        },
      },
    },
  };
  const alternateKey = true
  const { oneSDKInstance, error: errorOneSDK, loading } = useOneSDK({ config, alternateKey })
  
    const initOneSDK = () => {
      const welcome = oneSDKInstance.component('form', {
      name: 'WELCOME',
      type: 'manual',
      /*descriptions: [
              { label: ‘This is a sample dynamic page.’, style: {} },
              { label: ‘It can contain multiple paragraphs.’, style: {} },
            ], */
      //cta: {style: {‘ff-button’:{backgroundColor: “red”}}}
    });
    const form_consent = oneSDKInstance.component("form", {name: "CONSENT"});
    const form_loading1 = oneSDKInstance.component("form", {name: "LOADING", title: {label: "Loading..."}, descriptions: [{label: ""}]});
    const form_loading2 = oneSDKInstance.component("form", {name: "LOADING", title: {label: "Extracting data..."}, descriptions: [{label: "Hold tight, this can take up to 30 seconds. Please do not referesh this page or click the 'back' button on your browser."}]});
    const form_loading3 = oneSDKInstance.component("form", {name: "LOADING", title: {label: "Hold on..."}, descriptions: [{label: ""}]});
    const form_document = oneSDKInstance.component("form", {
      name: "DOCUMENT",
      showPreps: true,
    });
    const form_review = oneSDKInstance.component("form", {
      name: "REVIEW",
      type: "ocr",
    });
    
    const biometrics = oneSDKInstance.component('biometrics');

    welcome.mount("#form-container-e2e");
    welcome.on("form:welcome:ready", () => {
      form_consent.mount("#form-container-e2e");
    });

    form_consent.on("form:consent:ready", async () => {

      form_document.mount("#form-container-e2e");
    });

    welcome.on("form:welcome:failed", () => {
      // display error message
    });

    welcome.on("*", (message) => {
      console.log(message);
    });

    let docType;

    form_document.on("form:document:ready", async ({inputInfo}) => {

      form_loading1.mount("#form-container-e2e");
      docType = inputInfo.documentType;
      
      const ocr = oneSDKInstance.component("ocr", {
        documents: [{ type: docType, countries: ["AUS"] }],
      });

      ocr.mount("#form-container-e2e");
      ocr.on("ready", () => form_loading1.unmount())

      ocr.on("*", (message) => {
        console.log(message);
      });

      ocr.on("results", ({ document }) => {   
        doSomethingAfterOcr({ document })
      });

      ocr.on("loading", (display)=>{
        if(display){
          form_loading2.mount("#form-container-e2e");
        }else{
          form_loading2.unmount() 
        }
      });
    });

    function doSomethingAfterOcr({ document }) {
      // Present the details of the document that were detected from the uploaded image or images.
      // Decide whether to proceed to the next stage of the onboarding process
      // depending on whether document verification was successful.
      if (document) {
        console.log(document);
        console.log(document.ocrResult.dateOfBirth);
        console.log("trying to load review screen");
        
        form_review.mount("#form-container-e2e");
        
      } else {
        console.log("No document returned");
      }
    }

    form_review.on("form:review:ready", async () => {
      biometrics.mount("#form-container-e2e");
    });

    biometrics.on("*", (message) => {
      console.log(message);
    });

    biometrics.on('error', console.error);

    let error = false;
    biometrics.on('detection_failed', () => (error = true));
    biometrics.on('session_closed', () => {
      // If the session was closed due to an error, try running the biometrics component again.
      if (error) biometrics.mount("#form-container-e2e");
      error = false;
    });

    biometrics.on("loading", (display)=>{
      if(display){
        //alert("loading, show now")
        form_loading3.mount("#form-container-e2e");
      }else{
        form_loading3.unmount() 
      }
    });

    biometrics.on('processing', () => alert('We will get back to you with results soon'));
    biometrics.on('results', (result) => {
      // Decide whether to proceed to the next stage of the onboarding process
      // depending on whether biometrics verification was successful.
      console.log(result);
    });
    // oneSdkReact.on('*', console.log('oke'));
    }
    
  useEffect(() => {
    if(oneSDKInstance) {

      initOneSDK()
    }
  }, [oneSDKInstance])

  return (
    <>
      {loading && <div>loading...</div>}
      <div id='form-container-e2e'></div>
    </>
  )
}

export default End2End