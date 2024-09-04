import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const UploadZone = ({ setImage, img }) => {
  const [base64Image, setBase64Image] = useState(null); // Initialize with img if provided

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        setBase64Image(result);
        setImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.png']
    },
    onDrop,
    multiple: false,
  });

  const removeImage = () => {
    setBase64Image(null);
    setImage("");
  };

  return (
    <div>
      <div className="flex items-center justify-center w-full">
        <div
          {...getRootProps()}
          className={`relative flex flex-col items-center justify-center h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 ${isDragActive ? 'bg-gray-100' : 'dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'}`}
        >
          <input {...getInputProps()} className="hidden" />
          {base64Image ? (
            <>
              <img src={base64Image} alt="Uploaded preview" className="w-56 h-56 rounded-lg" />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg">
                <span className="text-white text-xs font-semibold">Click to change image</span>
              </div>
            </>
          ) : img ? (
            <>
              <img src={img} alt="Uploaded preview" className="w-56 h-56 rounded-lg" />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg">
                <span className="text-white text-xs font-semibold">Click to change image</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex w-56 flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG</p>
              </div>
            </>
          )}
        </div>
      </div>
      {(base64Image || img) && (
        <div className="flex items-center justify-center mt-4">
          <button
            type="button"
            onClick={removeImage}
            className="px-4 py-2 text-sm font-semibold text-red-500 transition-colors duration-300 bg-transparent border border-red-500 rounded-lg hover:bg-red-500 hover:text-white focus:outline-none focus:ring focus:ring-red-300"
          >
            Remove image
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadZone;
