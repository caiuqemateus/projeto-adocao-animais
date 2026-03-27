
export const uploadController = async (req, res) => {
  try {
    const files = req.files

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "Nenhuma imagem enviada" });
    }

    const imageUrls = files.map(file => `/uploads/${file.filename}`);

    return res.json({
      message: "Upload realizado",
      images: imageUrls
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no upload" });
  }
};