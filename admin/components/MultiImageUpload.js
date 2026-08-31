import { useState } from 'react';
import { UploadCloud, X, Loader2 } from 'lucide-react';
import { uploadImage } from '../api';

export default function MultiImageUpload({ value = [], onChange, aspectRatio }) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Filter to only allow images
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      setError('Please select valid image files');
      return;
    }

    try {
      setIsUploading(true);
      setError('');
      
      const newUrls = [];
      for (const file of imageFiles) {
        const data = await uploadImage(file);
        if (data.url || data.imageUrl) {
          newUrls.push(data.url || data.imageUrl);
        }
      }
      
      onChange([...value, ...newUrls]);
    } catch (err) {
      setError('Failed to upload some images');
      console.error(err);
    } finally {
      setIsUploading(false);
      // Reset input
      e.target.value = null;
    }
  };

  const handleRemove = (indexToRemove) => {
    const newValues = value.filter((_, index) => index !== indexToRemove);
    onChange(newValues);
  };

  return (
    <div className="w-full space-y-4">
      {/* Upload Button Area */}
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          disabled={isUploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
        />
        <div className={`w-full p-6 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-3 transition-colors ${isUploading ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-blue-400'}`}>
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
                <p className="text-sm font-medium text-gray-700">Click or drag images to upload</p>
                <p className="text-xs text-gray-500 mt-1">You can select multiple files</p>
              </div>
            </>
          )}
        </div>
      </div>
      
      {error && <p className="text-sm text-red-500">{error}</p>}
      
      {/* Image Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {value.map((url, index) => (
            <div key={index} className="relative rounded-lg overflow-hidden border border-gray-200 group bg-gray-50 aspect-[2/3] flex items-center justify-center">
              <img
                src={url}
                alt={`Uploaded preview ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                  title="Remove image"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
