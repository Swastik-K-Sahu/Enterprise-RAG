import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/upload_file', {
        method: 'POST',
        body: formData,
      });

      setIsLoading(false); 

      if (response.ok) {
        const data = await response.json();
        toast.success(`${data.message}`);
      } else {
        toast.error('Failed to upload file.');
      }
    } catch (error) {
      setIsLoading(false); 
      toast.error('Error uploading file.');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <Toaster position="top-center" reverseOrder={false} />

      <h2 className="text-lg font-semibold mb-4">Upload PDF Document</h2>

      {!isLoading && (
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileSelect}
          className="mb-4"
        />
      )}

      <button
        onClick={handleFileUpload}
        className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${isLoading && 'opacity-50 cursor-not-allowed'}`}
        disabled={isLoading} 
      >
        {isLoading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};

export default Upload;
