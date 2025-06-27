import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCw, Download } from 'lucide-react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

import workerSrc from "pdfjs-dist/build/pdf.worker?url"; 

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const DocumentViewer = ({ document, onClose }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState(0);

  const isPDF = document?.type === 'application/pdf';
  const isImage = document?.type?.startsWith('image/');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold">{document.name}</h2>
          <div className="flex items-center space-x-2">
            {isPDF && (
              <>
                <ZoomOut
                  onClick={() => setScale(prev => Math.max(0.5, prev - 0.1))}
                  className="cursor-pointer"
                />
                <ZoomIn
                  onClick={() => setScale(prev => Math.min(3, prev + 0.1))}
                  className="cursor-pointer"
                />
                <RotateCw
                  onClick={() => setRotation(prev => (prev + 90) % 360)}
                  className="cursor-pointer"
                />
              </>
            )}
            <a
              href={document.url || document.preview}
              download={document.name}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download />
            </a>
            <X onClick={onClose} className="cursor-pointer" />
          </div>
        </div>

        {/* Viewer */}
        <div className="flex-1 overflow-auto flex items-center justify-center bg-gray-100">
          {isPDF ? (
            <Document
              file={document.url || document.preview}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              loading={
                <div className="text-gray-600 animate-pulse">Loading PDF...</div>
              }
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                rotate={rotation}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
          ) : isImage ? (
            <img
              src={document.url || document.preview}
              alt={document.name}
              className="max-h-full max-w-full"
              style={{ transform: `scale(${scale}) rotate(${rotation}deg)` }}
            />
          ) : (
            <p className="text-center text-gray-500">
              Preview not available for this file type.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;
