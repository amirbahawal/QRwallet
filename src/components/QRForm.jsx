import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const QRForm = ({ qrData, onSave, onCancel }) => {
    const [name, setName] = useState('');
    const [platform, setPlatform] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        const newQR = {
            id: uuidv4(),
            name: name.trim(),
            platform: platform.trim(),
            qrData,
            createdAt: Date.now()
        };

        onSave(newQR);
        setName('');
        setPlatform('');
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white rounded-[2rem] shadow-2xl p-8 border border-gray-50 animate-in fade-in zoom-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">QR Captured</h2>
                    <p className="text-sm text-gray-400 font-medium">Add some details to save it</p>
                </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="group">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Label / Name</label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Bullpaid Business"
                        className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-gray-800 placeholder:text-gray-300 font-medium"
                    />
                </div>
                
                <div className="group">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Platform</label>
                    <input
                        type="text"
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                        placeholder="e.g. Bank, Wallet, Payment"
                        className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-gray-800 placeholder:text-gray-300 font-medium"
                    />
                </div>

                <div className="pt-4 flex gap-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-2xl transition-all active:scale-95"
                    >
                        Discard
                    </button>
                    <button
                        type="submit"
                        className="flex-[2] px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-200 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
                    >
                        <span>Save Securely</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default QRForm;
