const check = (req, res) => {
  res.json({
    success: true,
    message: "Shelf Life API is running",
  });
};

export default { check };