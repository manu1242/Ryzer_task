import React, { useState } from 'react';
import FileUpload from './components/DocumentUpload';
import DocumentViewer from './components/DocumentViewer';
import DocumentList from './components/DocumentList';

function App() {
  const [documents, setDocuments] = useState([]);
  const [viewerDoc, setViewerDoc] = useState(null);


  const [propertyId] = useState("property-123");

  const handleUpload = (files) => {
    setDocuments(prev => [...prev, ...files]);
  };

  const handleDelete = (id) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">📁 Document Management</h1>
      <FileUpload
        propertyId={propertyId}
        onFileUpload={handleUpload}
        setDocuments={setDocuments}
      />
      {documents.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-2">Uploaded Documents ({documents.length})</h2>
          <DocumentList
            documents={documents}
            onView={setViewerDoc}
            onDelete={handleDelete}
          />
        </div>
      )}
      {viewerDoc && (
        <DocumentViewer
          document={viewerDoc}
          onClose={() => setViewerDoc(null)}
        />
      )}
    </div>
  );
}

export default App;
