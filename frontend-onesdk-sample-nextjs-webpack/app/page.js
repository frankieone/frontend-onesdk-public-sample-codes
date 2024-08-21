"use client"
import Link from 'next/link';
import './globals.css'


function App() {
  const methodMapping = [
    { name: 'End2End', path: '/end2end' },
    { name: 'End2EndOCR', path: '/end2endocr' },
    { name: 'IDV Incode', path: '/idvincode' },
    { name: 'IDV Incode Dynamic', path: '/idvincodedynamic' },
    { name: 'IDVerse', path: '/idverse' },
    { name: 'New Onboarding', path: '/newonboarding' },
    { name: 'New Onboarding Manual', path: '/newonboardingmanual' },
    { name: 'Onfido', path: '/onfidonew' },
    { name: 'Sardine', path: '/sardine' },
    { name: 'Smart UI', path: '/smartui' },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <div className="flex space-x-4 button-container">
          {methodMapping.map((method, i) => (
            <Link href={method.path} key={i} className="bg-white text-gray-800 rounded-lg shadow-md hover:bg-gray-100 px-4 py-2 border border-gray-300">
              <span >
                {method.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
