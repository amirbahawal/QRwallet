import { QRCodeSVG } from 'qrcode.react';

const QRList = ({ qrs, onDelete, onView }) => {
    if (qrs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-3xl mb-4">📭</div>
                <h3 className="text-lg font-semibold text-gray-800">No QR codes yet</h3>
                <p className="text-gray-500 max-w-xs mx-auto mt-2">
                    Scan your first QR code to store it in your digital wallet.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {qrs.map((qr) => (
                <div 
                    key={qr.id}
                    onClick={() => onView(qr)}
                    className="group relative bg-white rounded-2xl p-4 shadow-sm hover:shadow-md border border-gray-100 transition-all cursor-pointer active:scale-95"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-gray-50 rounded-xl">
                            <QRCodeSVG value={qr.qrData} size={64} level="H" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-800 truncate">{qr.name}</h3>
                            <p className="text-sm text-gray-500 truncate">{qr.platform || 'General'}</p>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(qr.id);
                            }}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
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
