const hapiJoiValidator = require("@hapi/joi");
const bcrypt = require("bcrypt");

const validateUser = (data) => {

  try {
    const saltRounds = 12; // Adjust the number of salt rounds based on your security needs

    const hashedpassword = bcrypt.hash(data.password, saltRounds);
      
    const hashedconfirmPassword = bcrypt.hash(data.confirmPassword, saltRounds);
  
  
        const validateStudent = hapiJoiValidator.object({
        firstName: hapiJoiValidator.string().min(3).max(40).trim().pattern(/^[a-zA-Z]+$/).required().messages({
          'string.empty': 'firstName cannot be empty',
          'string.min': 'Min 3 characteers',
        }),
        lastName: hapiJoiValidator.string().min(3).max(40).trim().pattern(/^[a-zA-Z]+$/).required().messages({
          'string.empty': 'firstName cannot be empty',
          'string.min': 'Min 3 characteers',
        }),
        phoneNumber: hapiJoiValidator.string().min(11).trim().regex(/^\+\d{11,}$/).required(),
        username: hapiJoiValidator.string().min(3).max(40).trim().pattern(/^[a-zA-Z]+$/).required().messages({
          'string.empty': 'firstName cannot be empty',
          'string.min': 'Min 3 characteers',
        }),
        email: hapiJoiValidator.string().email({ tlds: { allow: false } }).trim().min(5).required(),
        password: hapiJoiValidator.string().min(8).max(30).required(),
        confirmPassword: hapiJoiValidator.string().min(8).max(30).required()
      })

    return validateStudent.validate(data);

  } catch (err) {
    console.log(err.message);
  }
};

module.exports.validateUser = validateUser;