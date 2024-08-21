"use client"
import React from "react";
import { useEffect } from "react";
import useOneSDK from "../useOneSDK";

const IDVerse = () => {
  const config = {
    mode: "development",
    session: {
      persist: true,
      appReference: "VMA Web",
    },
    recipe: {
      idv: {
        provider: {
          name: "ocrlabs"
        }
      }
    },
  };
  const alternateKey = true
  const reinit = true
  const { oneSDKInstance, error: errorOneSDK, loading } = useOneSDK({ config, alternateKey, reinit })
  
  const initOneSDK = async () => {
      // 4. Use IDV component
      const idv = oneSDKInstance.flow("idv");
      const oneSdkIndividual = oneSDKInstance.individual();
      oneSdkIndividual.addConsent("general");
      oneSdkIndividual.addConsent("docs");
      oneSdkIndividual.addConsent("creditheader");
      // oneSdkIndividual.setProfileType("default")
      await oneSdkIndividual.submit();

      idv.mount("#idv-el-incode-verse");
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

    idv.on("error", ({ message, payload }) => {
      console.log("received error");
      console.log(message, payload);
    });


    idv.on("detection_complete", (message) => {
      console.log("capture finished");
      console.log(message);
    });
  }
    
  useEffect(() => {
    if(oneSDKInstance) {

      initOneSDK()
    }
  }, [oneSDKInstance])
  const IDV = () => {
    
    return 
  }
  return <>{loading && <div>Loading...</div>}  <div id='idv-el-incode-verse' ></div></>
}

export default IDVerse