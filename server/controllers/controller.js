const Document = require("../models/Document");

// Upload a document
exports.uploadDocuments = async (req, res) => {
  const { propertyId } = req.body;

  if (!req.file) {
    console.log("❌ No file uploaded.");
    return res.status(400).json({ message: "No file uploaded." });
  }

  if (!propertyId || propertyId.trim() === "") {
    console.log("❌ No property ID provided.");
    return res.status(400).json({ message: "Property ID is required." });
  }

  const file = req.file;

  const document = {
    fileName: file.originalname,
    fileType: file.mimetype,
    fileUrl: `http://localhost:5000/uploads/${file.filename}`,
    propertyId: propertyId.trim(),
    date: new Date(),
  };

  try {
    const result = await Document.create(document);
    console.log("✅ Document saved in DB:", result);
    res.status(201).json({ message: "File uploaded successfully.", data: result });
  } catch (error) {
    console.error("❌ Upload failed:", error.message);
    res.status(500).json({ message: "Upload failed." });
  }
};


exports.getDocumentsByProperty = async (req, res) => {
  const { propertyId } = req.params;

  if (!propertyId || propertyId.trim() === "") {
    return res.status(400).json({ message: "Property ID is required." });
  }

  try {
    const documents = await Document.find({ propertyId: propertyId.trim() }).sort({ date: -1 });
    console.log(`📂 Found ${documents.length} docs for propertyId: ${propertyId}`);
    res.json(documents);
  } catch (error) {
    console.error("❌ Fetch by property failed:", error.message);
    res.status(500).json({ message: "Failed to fetch documents by property." });
  }
};

exports.getAllDocuments = async (req, res) => {
  try {
    const docs = await Document.find().sort({ date: -1 });
    console.log("📄 Total documents found:", docs.length);
    res.json(docs);
  } catch (err) {
    console.error("❌ Fetch all failed:", err.message);
    res.status(500).json({ message: "Failed to fetch all documents." });
  }
};
