"use client"
import React from "react";
import { useEffect } from "react";
import useOneSDK from "../useOneSDK";
import { configurations } from "../config/newonboarding.config";

const NewOnboarding = () => {
  const config = {
    mode: "development",
    recipe: {
      ocr: {
        provideReviewScreen: false,
        maxDocumentCount: 1,
      },
      form:{
        provider:{
          name: 'react',
          googleApiKey: ""
        }
      }
    },
  };
  const alternateKey = true
  const { oneSDKInstance, error: errorOneSDK, loading } = useOneSDK({ config, alternateKey })
  
  const initOneSDK = async () => {
    const ref = null
    // set mock url params
    const confWelcomeOCR = true
    const confConsentOCR = true
    const confDocumentIDOCR = true
    const confPassportOCR = true
    const confDriverOCR = true
    const confMedicareOCR = true
    // 
    const oneSdkIndividual = oneSDKInstance.individual();
    oneSdkIndividual.addConsent("general");
    oneSdkIndividual.addConsent("docs");
    oneSdkIndividual.addConsent("creditheader");
    // oneSdkIndividual.setProfileType("default")
    await oneSdkIndividual.submit();

    const welcome = oneSDKInstance.component('form', await configurations.configureWelcomeOCR(confWelcomeOCR));
    const consent = oneSDKInstance.component('form', await configurations.configureConsentOCR(confConsentOCR));
    const document = oneSDKInstance.component('form', await configurations.configureDocumentIDOCR(confDocumentIDOCR, confPassportOCR, confDriverOCR, confMedicareOCR));
    const ocr = oneSDKInstance.component('ocr');
    const review = oneSDKInstance.component('form', {
      name: 'REVIEW',
    });
    welcome.on('form:welcome:ready', () => {
      consent.mount('#form-container-nob');
    });
    consent.on('form:consent:ready', () => {
      if (ref===null){
        document.mount('#form-container-nob')
      } else {
        review.mount('#form-container-nob');
      }
      
    });
    document.on('form:document:ready', () => {
      ocr.mount('#form-container-nob');
    });
    ocr.on('results', () => {
      review.mount('#form-container-nob');
    });


    welcome.mount('#form-container-nob');
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

export default NewOnboarding