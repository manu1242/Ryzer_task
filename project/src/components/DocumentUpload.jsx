import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";

const FileUpload = ({ onFileUpload, propertyId }) => {
  const [uploading, setUploading] = useState(false);

  const uploadDocuments = async (files) => {
    const formData = new FormData();
    files.forEach((f) => formData.append("file", f));
    formData.append("propertyId", propertyId);

    setUploading(true);

    try {
      const res = await fetch("http://localhost:5000/api/documents/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Upload error:", error);
      return [];
    } finally {
      setUploading(false);
    }
  };

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const filesWithPreview = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date().toLocaleDateString(),
        id: Date.now() + Math.random(),
      }));

      onFileUpload(filesWithPreview); 

      if (propertyId) {
        const rawFiles = filesWithPreview.map(({ file }) => file);
        await uploadDocuments(rawFiles);
      } else {
        console.warn("No propertyId provided for upload");
      }
    },
    [onFileUpload, propertyId]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    multiple: true,
  });

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-8 text-center rounded-lg cursor-pointer transition-all duration-300 ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 bg-blue-100 rounded-full">
            <Upload className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-lg font-medium text-gray-900">
            {isDragActive
              ? "Drop files here..."
              : "Drag & drop files here, or click to select"}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Supports PDF, JPEG, and PNG files
          </p>
          {uploading && (
            <p className="text-sm text-blue-500 mt-2 animate-pulse">
              Uploading files...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
