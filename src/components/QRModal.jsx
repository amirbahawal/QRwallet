import { QRCodeSVG } from 'qrcode.react';

const QRModal = ({ qr, onClose }) => {
    if (!qr) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div 
                className="relative w-full max-w-sm bg-white rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="flex flex-col items-center">
                    <div className="p-4 bg-white border-8 border-gray-50 rounded-2xl mb-6 shadow-inner">
                        <QRCodeSVG value={qr.qrData} size={250} level="H" includeMargin={true} />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-800 text-center mb-1">{qr.name}</h3>
                    <p className="text-gray-500 text-center mb-8">{qr.platform || 'General'}</p>

                    <button
                        onClick={onClose}
                        className="w-full py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-2xl transition-all shadow-lg active:scale-95"
                    >
                        Done
                    </button>
                </div>
            </div>
            
            {/* Click outside to close */}
            <div className="absolute inset-0 -z-10" onClick={onClose} />
        </div>
    );
};

export default QRModal;
