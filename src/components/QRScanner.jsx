import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const QRScanner = ({ onScan }) => {
    const [scannerMode, setScannerMode] = useState('camera'); // 'camera' or 'file'
    const [cameras, setCameras] = useState([]);
    const [selectedCameraId, setSelectedCameraId] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const scannerRef = useRef(null);
    const fileRef = useRef(null);

    useEffect(() => {
        // Fetch available cameras
        Html5Qrcode.getCameras().then(devices => {
            if (devices && devices.length > 0) {
                setCameras(devices);
                setSelectedCameraId(devices[0].id);
            }
        }).catch(err => {
            console.error("Error getting cameras", err);
        });

        return () => {
            stopScanning();
        };
    }, []);

    const startScanning = async (cameraId) => {
        if (!cameraId) return;
        
        try {
            if (scannerRef.current) {
                await stopScanning();
            }

            const html5QrCode = new Html5Qrcode("reader");
            scannerRef.current = html5QrCode;
            setIsScanning(true);

            await html5QrCode.start(
                cameraId,
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 }
                },
                (decodedText) => {
                    stopScanning();
                    onScan(decodedText);
                },
                (errorMessage) => {
                    // Ignore errors during scanning
                }
            );
        } catch (err) {
            console.error("Failed to start scanning", err);
            setIsScanning(false);
        }
    };

    const stopScanning = async () => {
        if (scannerRef.current) {
            try {
                await scannerRef.current.stop();
                scannerRef.current = null;
                setIsScanning(false);
            } catch (err) {
                console.error("Failed to stop scanner", err);
            }
        }
    };

    const handleCameraSwitch = (cameraId) => {
        setSelectedCameraId(cameraId);
        if (isScanning) {
            startScanning(cameraId);
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const html5QrCode = new Html5Qrcode("reader");
        try {
            const decodedText = await html5QrCode.scanFile(file, true);
            onScan(decodedText);
        } catch (err) {
            console.error("Error scanning file", err);
            alert("No QR code found in this image.");
        }
    };

    return (
        <div className="w-full max-w-md mx-auto overflow-hidden rounded-3xl bg-white shadow-2xl p-6 border border-gray-100 transition-all">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Scan QR Code</h2>
                <div className="flex bg-gray-100 p-1 rounded-xl">
                    <button
                        onClick={() => { setScannerMode('camera'); stopScanning(); }}
                        className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${scannerMode === 'camera' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Camera
                    </button>
                    <button
                        onClick={() => { setScannerMode('file'); stopScanning(); }}
                        className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${scannerMode === 'file' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Upload
                    </button>
                </div>
            </div>

            <div className="relative aspect-square w-full bg-gray-900 rounded-2xl overflow-hidden mb-6 group">
                <div id="reader" className="w-full h-full"></div>
                
                {scannerMode === 'camera' && !isScanning && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/60 transition-opacity">
                        <button
                            onClick={() => startScanning(selectedCameraId)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-bold shadow-xl transform active:scale-95 transition-all"
                        >
                            Start Camera
                        </button>
                    </div>
                )}

                {scannerMode === 'file' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl m-2">
                        <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">Choose a QR image to upload</p>
                        <button
                            onClick={() => fileRef.current?.click()}
                            className="bg-white border border-gray-200 text-gray-700 px-6 py-2 rounded-xl text-sm font-semibold shadow-sm hover:bg-gray-50 transition-colors"
                        >
                            Select Image
                        </button>
                        <input
                            type="file"
                            ref={fileRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />
                    </div>
                )}
            </div>

            {scannerMode === 'camera' && cameras.length > 1 && (
                <div className="flex gap-3 mb-4 justify-center">
                    {cameras.map((camera, index) => (
                        <button
                            key={camera.id}
                            onClick={() => handleCameraSwitch(camera.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
                                selectedCameraId === camera.id
                                    ? 'bg-indigo-50 border-indigo-200 text-indigo-600 shadow-sm'
                                    : 'bg-white border-gray-200 text-gray-500 hover:border-indigo-100 hover:bg-indigo-50/50'
                            }`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Camera {index + 1}
                        </button>
                    ))}
                </div>
            )}

            <p className="text-xs text-gray-400 text-center leading-relaxed">
                {scannerMode === 'camera' 
                    ? "Center the QR code in the box for best results." 
                    : "Upload an image containing a visible QR code."}
            </p>
        </div>
    );
};

export default QRScanner;
