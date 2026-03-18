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
        <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6 border border-gray-100 animate-in fade-in zoom-in duration-300">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-lg">✓</span>
                QR Scanned!
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Amir - Easypaisa"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Platform (Optional)</label>
                    <input
                        type="text"
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                        placeholder="e.g. Easypaisa, JazzCash"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                </div>

                <div className="pt-2 flex gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5"
                    >
                        Save QR
                    </button>
                </div>
            </form>
        </div>
    );
};

export default QRForm;
