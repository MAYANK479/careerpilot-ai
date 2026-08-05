const fs = require("fs/promises");
const { PDFParse } = require("pdf-parse");
const { analyzeResume } = require("../services/resumeAnalysisService");

exports.uploadResume = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }

  try {
    const fileBuffer = await fs.readFile(req.file.path);
    const parser = new PDFParse({ data: fileBuffer });
    const parsedPdf = await parser.getText();
    await parser.destroy();

    const resumeText = parsedPdf.text.trim();
    if (!resumeText) {
      return res.status(422).json({
        success: false,
        message: "No readable text was found in this PDF.",
      });
    }

    const analysis = await analyzeResume(resumeText);
    return res.status(200).json({
      success: true,
      message: analysis
        ? "Resume uploaded and analyzed successfully!"
        : "Resume uploaded and text extracted successfully.",
      file: req.file.filename,
      resumeText,
      analysis,
      analysisAvailable: Boolean(analysis),
    });
  } catch (error) {
    return next(error);
  } finally {
    // Always clean up the uploaded file
    if (req.file?.path) {
      await fs.unlink(req.file.path).catch(() => {});
    }
  }
};
