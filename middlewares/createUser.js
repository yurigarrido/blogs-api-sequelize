const { User } = require('../models');

const validateDisplayName = async (req, res, next) => {
  const { displayName } = req.body;
  if (!displayName) {
    return res.status(400).json({ message: '"displayName" is required' });
  }

  if (displayName.length < 8) {
    return res.status(400).json({ 
      message: '"displayName" length must be at least 8 characters long', 
    });
  }

  next();
};

const validateEmailName = async (req, res, next) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: '"email" is required' });

  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const emailIsValid = regex.test(email);

  if (!emailIsValid) return res.status(400).json({ message: '"email" must be a valid email' });

  const emailAlreadyRegistered = await User.findOne({ where: { email } });

  if (emailAlreadyRegistered) return res.status(409).json({ message: 'User already registered' });

  return next();
};

const validatePassword = async (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: '"password" is required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ 
      message: '"password" length must be 6 characters long', 
    });
  }

  next();
};

module.exports = { validateDisplayName, validateEmailName, validatePassword };