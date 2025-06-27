import React from 'react';
import { FileText, Image, Download, Eye, Trash2, Calendar } from 'lucide-react';

const DocumentList = ({ documents, onView, onDelete }) => {
  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return <Image className="h-6 w-6 text-blue-500" />;
    return <FileText className="h-6 w-6 text-red-500" />;
  };

  const formatSize = (bytes) => {
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-6">
      {documents.map((doc) => (
        <div key={doc._id} className="bg-white p-4 rounded-lg border shadow hover:shadow-lg transition">
          <div className="flex items-center space-x-3 mb-3">
            {getFileIcon(doc.fileType || doc.type)}
            <h4 className="font-semibold text-gray-800 truncate">{doc.fileName || doc.name}</h4>
          </div>
          <div className="text-sm text-gray-600 space-y-1 mb-3">
            <div className="flex justify-between"><span>Size:</span><span>{formatSize(doc.size || 0)}</span></div>
            <div className="flex justify-between">
              <span><Calendar className="h-4 w-4 inline" /> Uploaded:</span>
              <span>{doc.uploadDate || new Date(doc.date).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <button onClick={() => onView(doc)} className="text-blue-600 hover:underline flex items-center space-x-1">
              <Eye className="h-4 w-4" /> <span>View</span>
            </button>
            <a href={doc.fileUrl || doc.url || doc.preview} download={doc.fileName || doc.name} className="text-gray-700 hover:underline flex items-center space-x-1">
              <Download className="h-4 w-4" /> <span>Download</span>
            </a>
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentList;
