"use client"
import React from "react";
import { useEffect } from "react";
import useOneSDK from "../useOneSDK";

const IDVIncodeDynamic = () => {
  const config = {
    mode: "development",
    // recipe: {
    //   idv: {
    //     provider: {
    //       name: 'incode'
    //     }
    //   },
    // },
  };
  const { oneSDKInstance, error: errorOneSDK, loading } = useOneSDK({ config })
  
  const initOneSDK = async () => {
      // 4. Use IDV component
      const idv = oneSDKInstance.flow("idv");
      const oneSdkIndividual = oneSDKInstance.individual();
      console.log(idv, oneSdkIndividual, 'test')
      oneSdkIndividual.addConsent("general");
      oneSdkIndividual.addConsent("docs");
      oneSdkIndividual.addConsent("creditheader");
      
      // oneSdkIndividual.setProfileType("default")
      await oneSdkIndividual.submit();

      idv.mount("#idv-el");
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
    if(errorOneSDK) return <div>{errorOneSDK}</div>
    return 
  }
  return <>{loading && <div>Loading...</div>}  <div id='idv-el' ></div></>
}

export default IDVIncodeDynamic