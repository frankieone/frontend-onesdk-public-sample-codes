"use client"
import { useEffect } from "react";
import useOneSDK from "../useOneSDK";

const Onfido = () => {
  const config = {
    mode: "development",
    recipe: {
      ocr: {
        //provideReviewScreen: false,
        //maxDocumentCount: 2,
        provider: {
          name: "onfido",

          customUI: {
            "borderRadiusButton": "56px",
            "borderStyleSurfaceModal": "0px",
            "fontWeightBody": 400,
            "fontSizeBody": "16px",
            "fontSizeSubtitle": "16px",
            "fontSizeTitle": "40px",
            "colorBackgroundSurfaceModal": "white",
            "colorBackgroundIcon": "black",
            "colorBorderLinkUnderline": "black",
            "colorBackgroundLinkActive": "black",
            "colorBackgroundLinkHover": "blue",
            "colorBackgroundDocTypeButton": "black",
            "colorContentBody": "rgb(255,255,255)",
            "colorContentTitle": "rgb(247, 25, 233)",
            "colorContentSubtitle": "rgb(247, 25, 233)",

            "colorContentButtonPrimaryText": "rgb(41, 140, 41)",
            "colorBackgroundButtonPrimary": "rgb(237, 245, 17)",
            "colorBackgroundButtonPrimaryHover": "rgb(55, 115, 245)",
            "colorBackgroundButtonPrimaryActive": "rgb(55, 115, 245)",

            "colorContentButtonSecondaryText": "rgb(255,255,255)",
            "colorBackgroundButtonSecondary": "rgb(50,53,61)",
            "colorBackgroundButtonSecondaryHover": "rgb(30,32,37)",
            "colorBackgroundButtonSecondaryActive": "rgb(30,32,37)",
            "colorContentLinkTextHover": "rgb(55, 115, 245)",
            "colorBorderDocTypeButton": "rgb(20, 21, 25)",
            "colorBackgroundDocTypeButtonHover": "rgb(30,32,37)",
            "colorBackgroundDocTypeButtonActive": "rgb(30,32,37)",
            "colorContentDocTypeButton": "rgb(255,255,255)",
            "colorIcon": "rgb(55, 115, 245)",
            "colorContentInfoPill": "rgb(10,11,13)",
            "colorBackgroundInfoPill": "rgb(55, 115, 245)",
            "colorBackgroundSelector": "red",
            "colorInputOutline": "rgb(87, 139, 250)",
            "colorContentButtonTertiaryText": "rgb(255,255,255)",
            "colorContentInput": "blue",
            "colorBackgroundInput": "green",
            "colorBorderInput": "yellow"
          }
          //sdkVersion: "1.69.1"
        },
        documents: [
        {
          type: "PASSPORT",
          countries: ["AUS"],
        },
        {
          type: "DRIVERS_LICENCE",
          countries: ["AUS"],
        },
        {
          type: "NATIONAL_ID",
          countries: ["AUS"],
        },
        ]
      },
      biometrics: {
        provider: {
          customUI: {
            "borderRadiusButton": "56px",
            "borderStyleSurfaceModal": "0px",
            "fontWeightBody": 400,
            "fontSizeBody": "16px",
            "fontSizeSubtitle": "16px",
            "fontSizeTitle": "40px",
            "colorBackgroundSurfaceModal": "white",
            "colorBackgroundIcon": "black",
            "colorBorderLinkUnderline": "black",
            "colorBackgroundLinkActive": "black",
            "colorBackgroundLinkHover": "blue",
            "colorBackgroundDocTypeButton": "black",
            "colorContentBody": "rgb(255,255,255)",
            "colorContentTitle": "rgb(247, 25, 233)",
            "colorContentSubtitle": "rgb(247, 25, 233)",

            "colorContentButtonPrimaryText": "rgb(41, 140, 41)",
            "colorBackgroundButtonPrimary": "rgb(237, 245, 17)",
            "colorBackgroundButtonPrimaryHover": "rgb(55, 115, 245)",
            "colorBackgroundButtonPrimaryActive": "rgb(55, 115, 245)",

            "colorContentButtonSecondaryText": "rgb(255,255,255)",
            "colorBackgroundButtonSecondary": "rgb(50,53,61)",
            "colorBackgroundButtonSecondaryHover": "rgb(30,32,37)",
            "colorBackgroundButtonSecondaryActive": "rgb(30,32,37)",
            "colorContentLinkTextHover": "rgb(55, 115, 245)",
            "colorBorderDocTypeButton": "rgb(20, 21, 25)",
            "colorBackgroundDocTypeButtonHover": "rgb(30,32,37)",
            "colorBackgroundDocTypeButtonActive": "rgb(30,32,37)",
            "colorContentDocTypeButton": "rgb(255,255,255)",
            "colorIcon": "rgb(55, 115, 245)",
            "colorContentInfoPill": "rgb(10,11,13)",
            "colorBackgroundInfoPill": "rgb(55, 115, 245)",
            "colorBackgroundSelector": "red",
            "colorInputOutline": "rgb(87, 139, 250)",
            "colorContentButtonTertiaryText": "rgb(255,255,255)",
            "colorContentInput": "blue",
            "colorBackgroundInput": "green",
            "colorBorderInput": "yellow"
          }
        }
      },
    }
  };
  const { oneSDKInstance, loading } = useOneSDK({ config })
  
  const initOneSDK = async () => {
    const onesdkParam = oneSDKInstance.component('ocr');
    const oneSdkIndividual = oneSDKInstance.individual();
    oneSdkIndividual.addConsent("general");
    oneSdkIndividual.addConsent("docs");
    oneSdkIndividual.addConsent("creditheader");
    // oneSdkIndividual.setProfileType("default")
    await oneSdkIndividual.submit();

    onesdkParam.mount("#idv-el-onf");
      // 5. Monitor OCR results
      onesdkParam.on("results", async ({checkStatus, document, entityId}) => {
        if (checkStatus) {
          console.log("results successful");
          console.log(checkStatus);
          console.log(document);
          console.log(entityId);
        } else {
          console.log("no data returned");
        }
    });

    onesdkParam.on("error", ({ message, payload }) => {
      console.log("received error");
      console.log(message, payload);
    });


    onesdkParam.on("detection_complete", (message) => {
      console.log("capture finished");
      console.log(message);
    });
  }
    
  useEffect(() => {
    if(oneSDKInstance) {

      initOneSDK()
    }
  }, [oneSDKInstance])
  
  return <>{loading && <div>Loading...</div>}  <div id='idv-el-onf'></div></>
}

export default Onfido