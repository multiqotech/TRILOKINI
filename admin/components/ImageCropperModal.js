import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { X, ZoomIn, ZoomOut } from 'lucide-react';
import getCroppedImg from '../utils/cropImage';

export default function ImageCropperModal({ imageSrc, onCropDone, onCropCancel, aspectRatio }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    if (!croppedAreaPixels) return;
    try {
      setIsProcessing(true);
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      onCropDone(croppedBlob);
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden flex flex-col shadow-2xl" style={{ maxHeight: '90vh' }}>
        
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800">Crop Image</h3>
          <button 
            onClick={onCropCancel} 
            className="p-1 rounded-full hover:bg-gray-200 text-gray-500 transition-colors"
            disabled={isProcessing}
          >
            <X size={20} />
          </button>
        </div>

        {/* Cropper Area */}
        <div className="relative w-full bg-gray-900" style={{ height: '50vh', minHeight: '400px' }}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspectRatio}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            objectFit="contain"
          />
        </div>

        {/* Controls */}
        <div className="p-6 bg-white flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <ZoomOut size={20} className="text-gray-500" />
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <ZoomIn size={20} className="text-gray-500" />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onCropCancel}
              className="px-6 py-2 rounded-xl text-gray-600 font-medium hover:bg-gray-100 transition-colors"
              disabled={isProcessing}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isProcessing}
              className="px-6 py-2 rounded-xl text-white font-medium bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isProcessing ? 'Processing...' : 'Crop & Upload'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
