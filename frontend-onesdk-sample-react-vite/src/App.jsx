"use client"
import { useState } from 'react';
import End2End from './QATest/End2End';
import IDVIncode from './QATest/IDVIncode';
import IDVIncodeDynamic from './QATest/IDVIncodeDynamic';
import NewOnboarding from './QATest/NewOnboarding';
import NewOnboardingManual from './QATest/NewOnboardingManual';
import Onfido from './QATest/OnfidoNew';
import Sardine from './QATest/Sardine';
import End2EndOCR from './QATest/End2EndOCR';
import IDVerse from './QATest/IDVerse';
import SmartUI from './QATest/SmartUI';

function App() {
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
    <main style={{display: 'flex', flexDirection: 'column', padding: 24}}>
      <div>
        <div>
          {
            methodMapping.map((method,i) => (<button key={i} onClick={() => handleOnClickMethod(method)}>{method}</button>))
          }
        </div>
        <div>{selectedMethod}</div>
        
        {renderOneSDK()}
      </div>
    </main>
  );
}

export default App;
