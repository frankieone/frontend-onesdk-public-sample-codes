"use client"
import { useEffect } from "react";
import useOneSDK from "../useOneSDK";

const Sardine = () => {
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
  
  const initOneSDK = async () => {
    const device = oneSDKInstance.component("device", {
        activityType: "REGISTRATION",
        //sessionId: "469368b5-f8aa-4b38-867b-5583db791185",
      });
      device.start();

      // 6. Add phone and email
      // oneSDKInstance.individual().setPhoneNumber("+61-0822082577");
      // oneSDKInstance.individual().setEmail("admin@riskybusiness.com");

      // 7. Initialise onboarding form
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
        personal: {
          countries:{
            default:{
              default:{
                fields:[
                 {
                    fieldType: 'input',
                    dataType: 'text',
                    label: 'Email',
                    name: 'extraData.email',
                    hide: false,
                    rules:{
                      required: {
                        value: true,
                        message: "Please enter your email"
                      }
                    }
                  },
                  {
                    fieldType: 'phone',
                    dataType: 'phone',
                    label: 'Phone Number',
                    name: 'extraData.phone',
                    hide: false,
                    placeholder: {
                      cc: "Code",
                      phoneNumber: "e.g. 0400 000 000"
                    },
                    options: [
                      {label: "AU +61", value: "+61"},
                      {label: "NZ +64", value: "+64"},
                      {label: "PH +63", value: "+63"},
                    ],
                    rules:{
                      required: {
                        value: true,
                        message: "Please enter your phone number"
                      }
                    }
                  },
                ]
              }
            }
          }
        }
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

      // const result = oneSDKInstance.component("form", {
      //   name: "RESULT",
      //   mode: "individual",
      //   type: "manual",
      //   state: "FAIL",
      // });

      welcome.on("form:welcome:ready", () => {
        consent.mount("#form-container-sardine");
      });

      consent.on("form:consent:ready", async () => {
        personal.mount("#form-container-sardine");
      });

      personal.on("form:personal:ready", async () => {
        document.mount("#form-container-sardine");
      });

      document.on("form:document:back", async () => {
        personal.mount("#form-container-sardine");
      });

      document.on("form:document:ready", async () => {
        review.mount("#form-container-sardine");
      });

      let count = 0;
      review.on("form:result:partial", async () => {
        if (count < 2) {
          retry.mount("#form-container-sardine");
          count += 1;
        }
      });

      welcome.mount("#form-container-sardine");
  }
    
  useEffect(() => {
    if(oneSDKInstance) {

      initOneSDK()
    }
  }, [oneSDKInstance])
  
  return (
    <>
      {loading && <div>Loading..</div>}
      {errorOneSDK && <div>{errorOneSDK}</div>}
      <div id='form-container-sardine'></div>
    </>
  )
}

export default Sardine