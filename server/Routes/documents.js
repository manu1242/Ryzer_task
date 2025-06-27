const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Document = require("../models/Document");

const router = express.Router();

// ✅ Ensure the uploads folder exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// ✅ Upload endpoint
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { propertyId } = req.body;
    const file = req.file;

    console.log("📥 Incoming upload request");
    console.log("📁 Uploaded file:", file);
    console.log("🏠 Property ID:", propertyId);

    if (!file || !propertyId) {
      return res.status(400).json({ message: "File and propertyId are required." });
    }

    
    const document = new Document({
      fileName: file.originalname,
      fileType: file.mimetype,
      fileUrl: `${req.protocol}://${req.get("host")}/uploads/${file.filename}`,
      propertyId: propertyId.trim(),
    });

    await document.save();
    console.log("✅ Document uploaded:", document);
    res.status(201).json({ message: "File uploaded successfully.", data: document });
  } catch (err) {
    console.error("❌ Upload failed:", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
});

// ✅ Delete endpoint
router.delete("/:id", async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Document not found" });

    const filename = path.basename(doc.fileUrl);
    const filePath = path.join(uploadDir, filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await doc.deleteOne();
    res.status(200).json({ message: "Document and file deleted successfully." });
  } catch (error) {
    console.error("❌ Deletion failed:", error);
    res.status(500).json({ message: "Deletion failed", error: error.message });
  }
});

// ✅ Fetch endpoint
router.get("/:propertyId", async (req, res) => {
  try {
    const documents = await Document.find({ propertyId: req.params.propertyId });
    res.status(200).json(documents);
  } catch (err) {
    res.status(500).json({ error: "Fetching documents failed" });
  }
});

module.exports = router;
