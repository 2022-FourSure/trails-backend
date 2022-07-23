const haltOnTimedout = (req, res, next) => {
  if (!req.timedout) {
    next();
  } else {
    res.status(503).json({ error: "Error: Response timeout" });
  }
};

module.exports = haltOnTimedout;
