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
    <div className="min-h-screen bg-[#FDFDFF] text-gray-900 font-sans pb-24 selection:bg-indigo-100 selection:text-indigo-700">
      {/* Premium Header */}
      <header className="sticky top-0 z-40 px-6 py-5 bg-white/80 backdrop-blur-xl border-b border-gray-100/50">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-default">
            <div className="w-12 h-12 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-200/50 transform group-hover:rotate-6 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 17h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-gray-900 leading-none mb-0.5">QR Wallet</h1>
              <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest opacity-80">Secure Storage</p>
            </div>
          </div>
          
          <button 
            onClick={() => setIsScanning(!isScanning)}
            className={`premium-button flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
              isScanning 
                ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-200'
            }`}
          >
            {isScanning ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Cancel Scan</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span>Add New QR</span>
              </>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 pt-10 space-y-12">
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
        <section className="animate-in fade-in slide-in-from-bottom-2 duration-700 delay-150">
          <div className="flex items-end justify-between mb-6 px-1">
            <div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Your Collection</h2>
              <p className="text-sm font-medium text-gray-400">Manage your saved access codes</p>
            </div>
            <div className="px-4 py-1.5 bg-gray-100/50 backdrop-blur-sm text-gray-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-gray-100/50">
              {qrs.length} {qrs.length === 1 ? 'Item' : 'Items'}
            </div>
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
