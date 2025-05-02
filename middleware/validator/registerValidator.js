const {validationResult, body} = require("express-validator");

const registerValidator = [
   body('userName')
   .notEmpty()
   .withMessage('User Name is required')
   .isLength({min:3})
   .withMessage('User Name must be at least  3 characters'),

    body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email format")
    .normalizeEmail(),

    body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({min:6})
    .withMessage("password should be at least 6 character")
]


const handleValidation = (req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            message:"Validation Failed",
            errors:errors.array().map(err=>({
                  field:err.param,
                  message:err.msg
            }))


        })
    }
    next();
}

module.exports = { registerValidator, handleValidation };
