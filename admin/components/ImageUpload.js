import { useState } from 'react';
import { UploadCloud, X, Loader2 } from 'lucide-react';
import { uploadImage } from '../api';
import ImageCropperModal from './ImageCropperModal';

export default function ImageUpload({ value, onChange, aspectRatio }) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  
  const [imageToCrop, setImageToCrop] = useState(null);
  const [originalFile, setOriginalFile] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    /* --- CROPPER COMMENTED OUT FOR NOW ---
    // Instead of uploading immediately, read it for the cropper
    setError('');
    setOriginalFile(file);
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setImageToCrop(reader.result);
    });
    reader.readAsDataURL(file);
    // Reset input so the same file can be selected again if canceled
    e.target.value = null;
    */

    // Direct upload
    try {
      setIsUploading(true);
      setError('');
      const data = await uploadImage(file);
      onChange(data.url || data.imageUrl);
    } catch (err) {
      setError('Failed to upload image');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCropCancel = () => {
    setImageToCrop(null);
    setOriginalFile(null);
  };

  const handleCropDone = async (croppedBlob) => {
    setImageToCrop(null);
    setIsUploading(true);
    setError('');

    try {
      // Convert Blob to File
      const croppedFile = new File([croppedBlob], originalFile.name, {
        type: 'image/jpeg',
        lastModified: Date.now(),
      });

      const data = await uploadImage(croppedFile);
      onChange(data.url || data.imageUrl);
    } catch (err) {
      setError('Failed to upload image');
      console.error(err);
    } finally {
      setIsUploading(false);
      setOriginalFile(null);
    }
  };

  return (
    <div className="w-full">
      {imageToCrop && (
        <ImageCropperModal 
          imageSrc={imageToCrop} 
          onCropCancel={handleCropCancel}
          onCropDone={handleCropDone}
          aspectRatio={aspectRatio}
        />
      )}
      
      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-gray-200 group bg-gray-50 aspect-video flex items-center justify-center">
          <img
            src={value}
            alt="Uploaded preview"
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
              title="Remove image"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      ) : (
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading || !!imageToCrop}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
          />
          <div className={`w-full p-8 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-3 transition-colors ${isUploading ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-blue-400'}`}>
            {isUploading ? (
              <>
                <Loader2 size={32} className="text-blue-500 animate-spin" />
                <p className="text-sm font-medium text-blue-600">Uploading...</p>
              </>
            ) : (
              <>
                <div className="p-3 bg-white rounded-full shadow-sm">
                  <UploadCloud size={24} className="text-gray-400" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700">Click or drag image to upload</p>
                  <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
