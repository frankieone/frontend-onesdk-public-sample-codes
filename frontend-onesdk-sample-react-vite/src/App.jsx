"use client"
import { useState } from 'react';
import End2End from './flows/End2End';
import IDVIncode from './flows/IDVIncode';
import IDVIncodeDynamic from './flows/IDVIncodeDynamic';
import NewOnboarding from './flows/NewOnboarding';
import NewOnboardingManual from './flows/NewOnboardingManual';
import Onfido from './flows/OnfidoNew';
import Sardine from './flows/Sardine';
import End2EndOCR from './flows/End2EndOCR';
import IDVerse from './flows/IDVerse';
import SmartUI from './flows/SmartUI';
import AdvancedKycForm from './flows/advanced-use-case/AdvancedKycForm'

function App() {
  const methodMapping = [ 'Advanced Kyc', 'End2End', 'End2EndOCR', 'IDV Incode', 'IDV Incode Dynamic', 'IDVerse', 'New Onboarding', 'New Onboarding Manual', 'Onfido', 'Sardine', 'Smart UI']

  const [selectedMethod, setSelectedMethod] = useState('')
  const handleOnClickMethod = (method) => {
    setSelectedMethod(method)
  }
  const renderOneSDK = () => {
    switch (selectedMethod) {
      case 'Advanced Kyc': return <AdvancedKycForm />
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
