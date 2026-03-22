import { QRCodeSVG } from 'qrcode.react';

const QRList = ({ qrs, onDelete, onView }) => {
    if (qrs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 px-6 text-center bg-gray-50/50 rounded-[2.5rem] border-2 border-dashed border-gray-200/60 animate-in fade-in zoom-in duration-700">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-4xl mb-6 shadow-sm border border-gray-100">
                    <span className="grayscale opacity-50">📭</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">Your wallet is empty</h3>
                <p className="text-gray-400 max-w-[240px] mx-auto mt-2 text-sm font-medium leading-relaxed">
                    Scan or upload a QR code to start building your collection.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {qrs.map((qr, index) => (
                <div 
                    key={qr.id}
                    onClick={() => onView(qr)}
                    style={{ animationDelay: `${index * 100}ms` }}
                    className="group relative bg-white rounded-3xl p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] border border-gray-100/50 transition-all cursor-pointer active:scale-[0.98] animate-in fade-in slide-in-from-bottom-3 duration-500 fill-mode-both"
                >
                    <div className="flex items-center gap-5">
                        <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-indigo-50 transition-colors duration-300">
                            <QRCodeSVG value={qr.qrData} size={56} level="H" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-black text-gray-900 truncate tracking-tight">{qr.name}</h3>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                                <p className="text-xs font-bold text-gray-400 truncate uppercase tracking-wider">{qr.platform || 'General'}</p>
                            </div>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(qr.id);
                            }}
                            className="p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                            title="Delete"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default QRList;
