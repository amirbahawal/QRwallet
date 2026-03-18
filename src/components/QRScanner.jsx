import { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QRScanner = ({ onScan }) => {
    const scannerRef = useRef(null);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "reader",
            { 
                fps: 10, 
                qrbox: { width: 250, height: 250 },
                aspectRatio: 1.0
            },
            /* verbose= */ false
        );

        const onSuccess = (decodedText) => {
            scanner.clear().then(() => {
                onScan(decodedText);
            }).catch(error => {
                console.error("Failed to clear scanner", error);
                onScan(decodedText);
            });
        };

        const onError = (errorMessage) => {
            // console.warn(errorMessage); // Frequent errors are normal while scanning
        };

        scanner.render(onSuccess, onError);

        return () => {
            scanner.clear().catch(error => {
                console.error("Failed to clear scanner during unmount", error);
            });
        };
    }, [onScan]);

    return (
        <div className="w-full max-w-md mx-auto overflow-hidden rounded-2xl bg-white shadow-xl p-4 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Scan QR Code</h2>
            <div id="reader" className="w-full"></div>
            <p className="mt-4 text-sm text-gray-500 text-center">
                Point your camera at a QR code to scan it.
            </p>
        </div>
    );
};

export default QRScanner;
