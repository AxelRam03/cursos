import { useEffect, useRef } from 'react';
import Quagga from 'quagga';
import { X } from 'lucide-react';

export default function BarcodeScanner({ onDetected, onClose }) {
  const scannerRef = useRef(null);
  const lastResult = useRef(null);

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: scannerRef.current,
          constraints: { facingMode: 'environment', width: { min: 640 }, height: { min: 480 } },
        },
        decoder: {
          readers: ['code_128_reader', 'ean_reader', 'ean_8_reader', 'upc_reader', 'upc_e_reader', 'code_39_reader'],
        },
        locate: true,
      },
      (err) => { if (!err) Quagga.start(); }
    );

    Quagga.onDetected((result) => {
      const code = result.codeResult.code;
      if (code !== lastResult.current) {
        lastResult.current = code;
        onDetected(code);
        setTimeout(() => { lastResult.current = null; }, 2000);
      }
    });

    return () => {
      Quagga.offDetected();
      Quagga.stop();
    };
  }, [onDetected]);

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl overflow-hidden w-full max-w-sm shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-gray-900">Escanear código de barras</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative bg-black" style={{ height: 280 }}>
          <div ref={scannerRef} className="w-full h-full" />
          {/* Overlay viewfinder */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-52 h-32 border-2 border-rose-400/70 rounded-lg relative">
              <span className="absolute top-0 left-0  w-5 h-5 border-t-[3px] border-l-[3px] border-rose-500 rounded-tl-sm" />
              <span className="absolute top-0 right-0 w-5 h-5 border-t-[3px] border-r-[3px] border-rose-500 rounded-tr-sm" />
              <span className="absolute bottom-0 left-0  w-5 h-5 border-b-[3px] border-l-[3px] border-rose-500 rounded-bl-sm" />
              <span className="absolute bottom-0 right-0 w-5 h-5 border-b-[3px] border-r-[3px] border-rose-500 rounded-br-sm" />
              {/* Scan line */}
              <div className="absolute inset-x-0 top-1/2 h-px bg-rose-400/80 animate-pulse" />
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 py-4 px-4">
          Apunta la cámara al código de barras del producto
        </p>
      </div>
    </div>
  );
}
