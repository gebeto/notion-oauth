module.exports = async (req, res) => {
  res.json({ env: process.env.HOST && process.env.PORT && true });
};
