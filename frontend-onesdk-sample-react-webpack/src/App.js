import React from 'react';
import { useState } from 'react';
import End2End from './QATest/End2End';
import End2EndOCR from './QATest/End2EndOCR';
import IDVIncode from './QATest/IDVIncode';
import IDVerse from './QATest/IDVerse';
import IDVIncodeDynamic from './QATest/IDVIncodeDynamic';
import NewOnboarding from './QATest/NewOnboarding';
import NewOnboardingManual from './QATest/NewOnboardingManual';
import Onfido from './QATest/OnfidoNew';
import Sardine from './QATest/Sardine';
import SmartUI from './QATest/SmartUI';

const App = () => {
  const methodMapping = ['End2End', 'End2EndOCR', 'IDV Incode', 'IDV Incode Dynamic', 'IDVerse', 'New Onboarding', 'New Onboarding Manual', 'Onfido', 'Sardine', 'Smart UI']

  const [selectedMethod, setSelectedMethod] = useState('')
  const handleOnClickMethod = (method) => {
    setSelectedMethod(method)
  }
  const renderOneSDK = () => {
    switch (selectedMethod) {
      case 'End2End': return <End2End/>
      case 'End2EndOCR': return <End2EndOCR/>
      case 'IDV Incode': return <IDVIncode/>
      case 'IDVerse': return <IDVerse/>
      case 'IDV Incode Dynamic': return <IDVIncodeDynamic/>
      case 'New Onboarding': return <NewOnboarding/>
      case 'New Onboarding Manual' : return <NewOnboardingManual/>
      case 'Onfido': return <Onfido/>
      case 'Sardine': return <Sardine/>
      case 'Smart UI' : return <SmartUI/>
      default:
        break;
    }
  }
  return (
    <div className="App">
      <div style={{display: 'flex', flexDirection:'row', alignItems: 'center', gap: '8px', justifyContent: 'center', marginTop: 54}}>
        {
          methodMapping.map((method, i) => (<button key={i} onClick={() => handleOnClickMethod(method)}>{method}</button>))
        }
      </div>
      <div style={{display: 'flex', flexDirection:'row', alignItems: 'center', gap: '8px', justifyContent: 'center', marginTop: 24, marginBottom:24}}>{selectedMethod}</div>
      
      {renderOneSDK()}
    </div>
  );
};

export default App;
