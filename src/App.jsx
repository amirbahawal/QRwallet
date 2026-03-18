import { useState, useEffect } from 'react';
import QRScanner from './components/QRScanner';
import QRForm from './components/QRForm';
import QRList from './components/QRList';
import QRModal from './components/QRModal';
import { getQRs, saveQRs } from './utils/storage';
import './App.css';

function App() {
  const [qrs, setQrs] = useState([]);
  const [scannedData, setScannedData] = useState(null);
  const [selectedQR, setSelectedQR] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  // Load data on mount
  useEffect(() => {
    setQrs(getQRs());
  }, []);

  const handleScan = (data) => {
    setScannedData(data);
    setIsScanning(false);
  };

  const handleSave = (newQR) => {
    const updatedQRs = [newQR, ...qrs];
    setQrs(updatedQRs);
    saveQRs(updatedQRs);
    setScannedData(null);
  };

  const handleDelete = (id) => {
    const updatedQRs = qrs.filter(qr => qr.id !== id);
    setQrs(updatedQRs);
    saveQRs(updatedQRs);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 px-4 py-4 mb-6">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 17h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">QR Wallet</h1>
          </div>
          
          <button 
            onClick={() => setIsScanning(!isScanning)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all ${
              isScanning 
                ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100'
            }`}
          >
            {isScanning ? 'Cancel' : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Scan New
              </>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 space-y-8">
        {/* Active Scan Area */}
        {isScanning && !scannedData && (
          <div className="animate-in slide-in-from-top-4 duration-300">
            <QRScanner onScan={handleScan} />
          </div>
        )}

        {/* Scan Success Form */}
        {scannedData && (
          <div className="animate-in slide-in-from-top-4 duration-300">
            <QRForm 
              qrData={scannedData} 
              onSave={handleSave} 
              onCancel={() => setScannedData(null)} 
            />
          </div>
        )}

        {/* List of saved QR codes */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Your Wallet</h2>
            <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs font-bold rounded-md">
              {qrs.length} Items
            </span>
          </div>
          
          <QRList 
            qrs={qrs} 
            onDelete={handleDelete} 
            onView={(qr) => setSelectedQR(qr)} 
          />
        </section>
      </main>

      {/* Modal View */}
      {selectedQR && (
        <QRModal 
          qr={selectedQR} 
          onClose={() => setSelectedQR(null)} 
        />
      )}
    </div>
  );
}

export default App;
