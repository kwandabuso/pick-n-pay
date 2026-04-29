module.exports = function (req, res, next) {
  const auth = req.headers.authorization;

  if (!auth) return res.status(401).json({ message: "Missing token" });

  if (auth !== "Bearer mock-valid-token") {
    return res.status(403).json({ message: "Invalid token" });
  }

  next();
};
