export const configurations = {
    async configureWelcome(configureWelcome) {
        let configWelcome = { name: "WELCOME", type: "manual" };

        if (configureWelcome === "true") {
            configWelcome = {
                name: "WELCOME",
                type: "manual",
                title: { label: "Config Title" },
                descriptions: [
                    { label: "Config Description Line 1", style: {} }
                ],
                instructions: {
                    content: [{ label: " Config Instructions" }],
                    style: { "ff-instructions": { "font-family": "Helvetica" } }
                },
                cta: {
                    label: "Config button",
                    style: { "ff-button": { backgroundColor: "green" } }
                }
            };
        }
        return configWelcome;
    },

    async configureConsent(configureConsent) {
        let configConsent = { name: "CONSENT" };

        if (configureConsent === "true") {
            configConsent = {
                name: "CONSENT",
                title: {
                    label: "Config Consent Title",
                    style: { "ff-title": { "font-family": "Cascadia code" } }
                },
                descriptions: [
                    { label: "Config Description 1", style: {} },
                    { label: "Config Description 2", style: {} },
                    { label: "Config Description 3", style: {} }
                ],
                cta: {
                    label: "Config Consent Button",
                    style: { "ff-button": { backgroundColor: "green" } }
                }
            };
        }
        return configConsent;
    },

    async configurePersonal(configurePersonal) {
        let configPersonal = {
            name: "PERSONAL",
            type: "manual",
            personal: {
                countries: {
                    default: {
                        default: {
                            fields: [
                                {
                                    fieldType: "input",
                                    dataType: "text",
                                    label: "Email",
                                    name: "extraData.email",
                                    hide: false,
                                    rules: {
                                        required: {
                                            value: true,
                                            message: "Please enter your email"
                                        }
                                    }
                                },
                                {
                                    fieldType: "phone",
                                    dataType: "phone",
                                    label: "Phone Number",
                                    name: "extraData.phone",
                                    hide: false,
                                    placeholder: {
                                        cc: "Code",
                                        phoneNumber: "e.g. 0400 000 000"
                                    },
                                    options: [
                                        { label: "AU +61", value: "+61" },
                                        { label: "NZ +64", value: "+64" }
                                    ],
                                    rules: {
                                        required: {
                                            value: true,
                                            message:
                                                "Please enter your phone number"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        };

        if (configurePersonal === "true") {
            configPersonal = {
                name: "PERSONAL",
                type: "manual",
                title: { label: "Config Personal Title" },
                descriptions: [{ label: "Config Description 1", style: {} }],
                cta: {
                    label: "Config Personal Button",
                    style: { "ff-button": { backgroundColor: "red" } }
                },
                showPreps: true,
                personal: {
                    countries: {
                        AUS: {
                            default: {
                                fields: [
                                    {
                                        fieldType: "input",
                                        dataType: "text",
                                        name: "givenName",
                                        label: "Given Config Label",
                                        hide: false,
                                        placeholder: "Given Config Placeholder",
                                        rules: {
                                            minLength: {
                                                value: 4,
                                                message:
                                                    "Given name input minimum length 4 Characters config"
                                            },
                                            maxLength: {
                                                value: 10,
                                                message:
                                                    "Given name input maximum legth 10 Characters config"
                                            }
                                        }
                                    },
                                    {
                                        fieldType: "input",
                                        dataType: "text",
                                        name: "middleName",
                                        label: "Middle Config Label",
                                        hide: false,
                                        placeholder:
                                            "Middle Config Placeholder",
                                        rules: {
                                            minLength: {
                                                value: 4,
                                                message:
                                                    "Middle name input minimum length 4 Characters config"
                                            },
                                            maxLength: {
                                                value: 10,
                                                message:
                                                    "Middle name input maximum legth 10 Characters config"
                                            }
                                        }
                                    },
                                    {
                                        fieldType: "input",
                                        dataType: "text",
                                        name: "familyName",
                                        label: "Family Config Label",
                                        hide: false,
                                        placeholder:
                                            "Family Config Placeholder",
                                        rules: {
                                            minLength: {
                                                value: 4,
                                                message:
                                                    "Family name input minimum length 4 Characters config"
                                            },
                                            maxLength: {
                                                value: 10,
                                                message:
                                                    "Family name input maximum legth 10 Characters config"
                                            }
                                        }
                                    },
                                    {
                                        fieldType: "input",
                                        dataType: "text",
                                        label: "Config Email Label",
                                        name: "extraData.email",
                                        hide: false,
                                        placeholder: "Email Config Placeholder",
                                        rules: {
                                            required: {
                                                value: true,
                                                message:
                                                    "Config Email Error Message"
                                            }
                                        }
                                    },
                                    {
                                        fieldType: "date",
                                        dataType: "text",
                                        label: "Config DOB Label",
                                        name: "dateOfBirth",
                                        hide: false,
                                        calendarConfig: {
                                            type: "gregory",
                                            locale: "en"
                                        }
                                    },
                                    {
                                        fieldType: "phone",
                                        dataType: "phone",
                                        label: "Config Phone Number Label",
                                        name: "extraData.phone",
                                        hide: false,
                                        placeholder: {
                                            cc: "Code",
                                            phoneNumber: "e.g. 0400 000 000"
                                        },
                                        options: [
                                            { label: "AU +61", value: "+61" },
                                            { label: "NZ +64", value: "+64" }
                                        ],
                                        rules: {
                                            required: {
                                                value: true,
                                                message:
                                                    "Config Phone number Error Message"
                                            }
                                        }
                                    },
                                    {
                                        fieldType: "address",
                                        dataType: "current_addr",
                                        label: "Config Address Label",
                                        name: "address.fullAddress",
                                        hide: false,
                                        placeholder:
                                            "Config Long Address Placeholder"
                                    }
                                    // {
                                    //     fieldType: "address",
                                    //     dataType: "current_addr",
                                    //     name: "address.fullAddress",
                                    //     label: "AUS Residential Address",
                                    //     hide: false,
                                    //     placeholder:
                                    //         "Config Long Address Placeholder"
                                    // }
                                ]
                            }
                        }
                    }
                }
            };
        }

        return configPersonal;
    },

    async configureDocument(
        configureIDSelect,
        configureNumID,
        configurePassport,
        configureDriver,
        configureMedicare
    ) {
        let configPassport = "";
        let configDriver = "";
        let configMedicare = "";

        if (
            configureNumID === null ||
            configureNumID === "" ||
            configureNumID === "1"
        ) {
            configureNumID = 1;
        }
        console.log("Number of ID: " + configureNumID);
        let configID = {
            name: "DOCUMENT",
            type: "manual",
            numberOfIDs: configureNumID
        };

        console.log(configID);

        if (configurePassport === "true") {
            configPassport = {
                type: "PASSPORT",
                label: "Config Passport Label",
                countries: {
                    default: {
                        default: {
                            fields: [
                                {
                                    fieldType: "select",
                                    name: "country",
                                    label: "Config Passport Country",
                                    //   options: [
                                    //     {
                                    //       label: "New Zealand",
                                    //       value: "NZL"
                                    //     },
                                    //   ],
                                    hide: false
                                },
                                {
                                    fieldType: "input",
                                    name: "idNumber",
                                    label: "Config Passport Number",
                                    placeholder: "Passport Number Placeholder",
                                    hide: false
                                }
                            ]
                        }
                    },
                    NZL: {
                        default: {
                            fields: [
                                {
                                    fieldType: "select",
                                    name: "country",
                                    label: "Config Passport Country",
                                    hide: false
                                },
                                {
                                    fieldType: "input",
                                    name: "idNumber",
                                    label: "Config Passport Number",
                                    placeholder: "Passport Number Placeholder",
                                    hide: false
                                }
                            ]
                        }
                    }
                }
            };
        }

        if (configureDriver === "true") {
            configDriver = {
                type: "DRIVERS_LICENCE",
                label: "Config Driver Licence Label",
                countries: {
                    default: {
                        default: {
                            fields: [
                                {
                                    fieldType: "select",
                                    name: "country",
                                    label: "Config country",
                                    hide: false
                                },
                                {
                                    fieldType: "select",
                                    name: "region",
                                    label: "Config State Label",
                                    placeholder: "Config State Placeholder",
                                    hide: false
                                },
                                {
                                    fieldType: "input",
                                    name: "idNumber",
                                    label: "Config Licence Number Label",
                                    placeholder:
                                        "Config Licence Number Placeholder",
                                    hide: false
                                },
                                {
                                    fieldType: "input",
                                    name: "extraData.document_number",
                                    label: "Config Extra Document Label",
                                    placeholder:
                                        "Config Extra Document Placeholder",
                                    hide: false
                                }
                            ]
                        }
                    },
                    AUS: {
                        default: {
                            fields: [
                                {
                                    fieldType: "select",
                                    name: "country",
                                    label: "Config country",
                                    hide: false
                                },
                                {
                                    fieldType: "select",
                                    name: "region",
                                    label: "Config State Label",
                                    placeholder: "Config State Placeholder",
                                    hide: false
                                },
                                {
                                    fieldType: "input",
                                    name: "idNumber",
                                    label: "Config Licence Number Label",
                                    placeholder:
                                        "Config Licence Number Placeholder",
                                    hide: false
                                },
                                {
                                    fieldType: "input",
                                    name: "extraData.document_number",
                                    label: "Config Card Number Label",
                                    placeholder:
                                        "Config Card Number Placeholder",
                                    hide: false
                                }
                            ]
                        }
                    }
                }
            };
        }

        if (configureMedicare === "true") {
            configMedicare = {
                type: "NATIONAL_HEALTH_ID",
                label: "Config Medicare Label",
                countries: {
                    default: {
                        default: {
                            fields: [
                                {
                                    fieldType: "select",
                                    name: "idSubType",
                                    label: "Config medicare colour Label",
                                    hide: false
                                },
                                {
                                    fieldType: "input",
                                    name: "idNumber",
                                    label: "Config card number Label",
                                    placeholder:
                                        "Config Card Number Placeholder",
                                    hide: false
                                },
                                {
                                    fieldType: "input",
                                    name: "extraData.reference",
                                    label: "Config Position Label",
                                    placeholder: "Config Position Placeholder",
                                    hide: false
                                },
                                {
                                    fieldType: "date",
                                    name: "idExpiry",
                                    label: "Config Expiry Label",
                                    hide: false
                                }
                            ]
                        }
                    }
                }
            };
        }

        if (configureIDSelect === "true") {
            configID = {
                name: "DOCUMENT",
                type: "manual",
                title: { label: "Config Document Title" },
                descriptions: [
                    { label: "Config Document Description", style: {} }
                ],
                numberOfIDs: configureNumID,
                documents: [configDriver, configPassport, configMedicare]
                //showPreps: true,
            };
        }
        return configID;
    },

    async configureWelcomeOCR(configureWelcomeOCR) {
        let configWelcomeOCR = {
            name: "WELCOME"
        };

        if (configureWelcomeOCR === "true") {
            configWelcomeOCR = {
                name: "WELCOME",
                type: "manual",
                title: { label: "Config Title" },
                descriptions: [
                    { label: "Config Description Line 1", style: {} }
                ],
                instructions: {
                    content: [{ label: " Config Instructions" }],
                    style: { "ff-instructions": { "font-family": "Helvetica" } }
                },
                cta: {
                    label: "Config button",
                    style: { "ff-button": { backgroundColor: "green" } }
                }
            };
        }
        return configWelcomeOCR;
    },

    async configureConsentOCR(configureConsentOCR) {
        let configConsentOCR = {
            name: "CONSENT"
        };

        if (configureConsentOCR === "true") {
            configConsentOCR = {
                name: "CONSENT",
                title: {
                    label: "Config Consent Title",
                    style: { "ff-title": { "font-family": "Cascadia code" } }
                },
                descriptions: [
                    { label: "Config Description 1", style: {} },
                    { label: "Config Description 2", style: {} },
                    { label: "Config Description 3", style: {} }
                ],
                cta: {
                    label: "Config Consent Button",
                    style: { "ff-button": { backgroundColor: "green" } }
                }
            };
        }
        return configConsentOCR;
    },

    async configureDocumentIDOCR(
        configureDocumentIDOCR,
        configurePassportOCR,
        configureDriverOCR,
        configureMedicareOCR
    ) {
        let configPassportOCR = "";
        let configDriverOCR = "";
        let configMedicareOCR = "";

        let configDocumentOCR = { name: "DOCUMENT", showPreps: true };

        if (configurePassportOCR === "true") {
            configPassportOCR = {
                type: "PASSPORT",
                label: "Config Passport"
            };
        }

        if (configureDriverOCR === "true") {
            configDriverOCR = {
                type: "DRIVERS_LICENCE",
                label: "Config Driver Licence"
            };
        }
        if (configureMedicareOCR === "true") {
            configMedicareOCR = {
                type: "NATIONAL_HEALTH_ID",
                label: "Config Medicare"
            };
        }

        if (configureDocumentIDOCR === "true") {
            configDocumentOCR = {
                name: "DOCUMENT",
                type: "ocr",
                title: { label: "Configure ID" },
                descriptions: [{ label: "Configure Description" }],
                documents: [
                    configPassportOCR,
                    configDriverOCR,
                    configMedicareOCR
                ]
            };
        }

        return configDocumentOCR;
    },

    async resultsState(resultsState) {
        let state = "FAIL";

        if (resultsState === "SUCCESS") {
            state = "SUCCESS";
        }
        return state;
    }
};