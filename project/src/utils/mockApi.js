// Mock API functions to simulate backend operations
export const mockApi = {
  // Get all properties
  getProperties: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const savedProperties = localStorage.getItem('properties');
        if (savedProperties) {
          resolve(JSON.parse(savedProperties));
        } else {
          const initialProperties = [
            {
              id: '1',
              name: 'Downtown Office Complex',
              address: '123 Business Ave, Downtown, NY 10001',
              type: 'Commercial',
              value: '$2,500,000',
              lastUpdated: '2024-01-15',
              documents: [
                {
                  id: 'doc1',
                  name: 'Property Deed.pdf',
                  type: 'application/pdf',
                  size: 1024000,
                  uploadDate: '2024-01-10',
                  url: '/sample-docs/deed.pdf',
                  propertyId: '1'
                },
                {
                  id: 'doc2',
                  name: 'Building Inspection Report.pdf',
                  type: 'application/pdf',
                  size: 2048000,
                  uploadDate: '2024-01-12',
                  url: '/sample-docs/inspection.pdf',
                  propertyId: '1'
                },
                {
                  id: 'doc3',
                  name: 'Property Photos.jpg',
                  type: 'image/jpeg',
                  size: 3072000,
                  uploadDate: '2024-01-14',
                  url: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
                  preview: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=200',
                  propertyId: '1'
                }
              ]
            },
            {
              id: '2',
              name: 'Sunset Residential Complex',
              address: '456 Sunset Blvd, Westside, CA 90210',
              type: 'Residential',
              value: '$3,200,000',
              lastUpdated: '2024-01-20',
              documents: [
                {
                  id: 'doc4',
                  name: 'Property Survey.pdf',
                  type: 'application/pdf',
                  size: 1536000,
                  uploadDate: '2024-01-18',
                  url: '/sample-docs/survey.pdf',
                  propertyId: '2'
                },
                {
                  id: 'doc5',
                  name: 'Exterior View.png',
                  type: 'image/png',
                  size: 2560000,
                  uploadDate: '2024-01-19',
                  url: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
                  preview: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=200',
                  propertyId: '2'
                },
                {
                  id: 'doc6',
                  name: 'Floor Plans.pdf',
                  type: 'application/pdf',
                  size: 1800000,
                  uploadDate: '2024-01-20',
                  url: '/sample-docs/floorplans.pdf',
                  propertyId: '2'
                }
              ]
            },
            {
              id: '3',
              name: 'Industrial Warehouse',
              address: '789 Industrial Way, Port District, TX 77001',
              type: 'Industrial',
              value: '$1,800,000',
              lastUpdated: '2024-01-25',
              documents: [
                {
                  id: 'doc7',
                  name: 'Warehouse Interior.jpg',
                  type: 'image/jpeg',
                  size: 2048000,
                  uploadDate: '2024-01-25',
                  url: 'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=800',
                  preview: 'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=200',
                  propertyId: '3'
                }
              ]
            },
            {
              id: '4',
              name: 'Luxury Penthouse',
              address: '321 Sky Tower, Manhattan, NY 10022',
              type: 'Residential',
              value: '$5,500,000',
              lastUpdated: '2024-01-28',
              documents: []
            }
          ];
          localStorage.setItem('properties', JSON.stringify(initialProperties));
          resolve(initialProperties);
        }
      }, 500);
    });
  },

  // Upload documents for a property
  uploadDocuments: async (propertyId, files) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const savedProperties = JSON.parse(localStorage.getItem('properties') || '[]');
        const propertyIndex = savedProperties.findIndex(p => p.id === propertyId);
        
        if (propertyIndex !== -1) {
          const newDocuments = files.map(fileData => ({
            id: 'doc_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            name: fileData.file.name,
            type: fileData.file.type,
            size: fileData.file.size,
            uploadDate: new Date().toISOString().split('T')[0],
            url: fileData.preview || URL.createObjectURL(fileData.file),
            propertyId: propertyId,
            preview: fileData.preview
          }));

          savedProperties[propertyIndex].documents = [
            ...(savedProperties[propertyIndex].documents || []),
            ...newDocuments
          ];
          
          savedProperties[propertyIndex].lastUpdated = new Date().toISOString().split('T')[0];
          
          localStorage.setItem('properties', JSON.stringify(savedProperties));
          resolve(savedProperties[propertyIndex]);
        }
      }, 1000);
    });
  },

  // Bulk upload documents to multiple properties
  bulkUploadDocuments: async (uploads) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const savedProperties = JSON.parse(localStorage.getItem('properties') || '[]');
        const updatedProperties = [];
        
        uploads.forEach(({ propertyId, files }) => {
          const propertyIndex = savedProperties.findIndex(p => p.id === propertyId);
          
          if (propertyIndex !== -1) {
            const newDocuments = files.map(fileData => ({
              id: 'doc_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
              name: fileData.file.name,
              type: fileData.file.type,
              size: fileData.file.size,
              uploadDate: new Date().toISOString().split('T')[0],
              url: fileData.preview || URL.createObjectURL(fileData.file),
              propertyId: propertyId,
              preview: fileData.preview
            }));

            savedProperties[propertyIndex].documents = [
              ...(savedProperties[propertyIndex].documents || []),
              ...newDocuments
            ];
            
            savedProperties[propertyIndex].lastUpdated = new Date().toISOString().split('T')[0];
            updatedProperties.push(savedProperties[propertyIndex]);
          }
        });
        
        localStorage.setItem('properties', JSON.stringify(savedProperties));
        resolve(updatedProperties);
      }, 1500);
    });
  },

  // Get documents for a property
  getDocuments: async (propertyId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const savedProperties = JSON.parse(localStorage.getItem('properties') || '[]');
        const property = savedProperties.find(p => p.id === propertyId);
        resolve(property?.documents || []);
      }, 300);
    });
  },

  // Delete a document
  deleteDocument: async (documentId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const savedProperties = JSON.parse(localStorage.getItem('properties') || '[]');
        
        savedProperties.forEach(property => {
          if (property.documents) {
            property.documents = property.documents.filter(doc => doc.id !== documentId);
          }
        });
        
        localStorage.setItem('properties', JSON.stringify(savedProperties));
        resolve(true);
      }, 500);
    });
  }
};