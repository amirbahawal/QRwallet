import { QRCodeSVG } from 'qrcode.react';

const QRModal = ({ qr, onClose }) => {
    if (!qr) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-gray-900/40 backdrop-blur-md animate-in fade-in duration-500">
            <div 
                className="relative w-full max-w-sm bg-white rounded-[2.5rem] p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 cubic-bezier(0.16, 1, 0.3, 1)"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 text-gray-300 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all active:scale-90"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="flex flex-col items-center">
                    <div className="p-6 bg-white border border-gray-100 rounded-[2rem] mb-8 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] group">
                        <QRCodeSVG 
                            value={qr.qrData} 
                            size={240} 
                            level="H" 
                            includeMargin={false}
                            className="group-hover:scale-[1.02] transition-transform duration-500"
                        />
                    </div>
                    
                    <h3 className="text-2xl font-black text-gray-900 text-center mb-1 tracking-tight">{qr.name}</h3>
                    <p className="text-sm font-bold text-indigo-500 text-center mb-10 uppercase tracking-widest opacity-80">{qr.platform || 'General Access'}</p>

                    <button
                        onClick={onClose}
                        className="w-full py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-2xl transition-all shadow-xl active:scale-95 text-lg"
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
