const { check, validationResult } = require("express-validator");

const generateValidators = () => [
    check("title")
        .isString()
        .withMessage("Invalid format!")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Title can not be empty!"),
    
    check("color")
        .isString()
        .withMessage("Invalid format!")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Color can not be empty!")
];

const reporter = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});
    next();
};

module.exports = {
    createAndUpdate: [
        generateValidators(),
        reporter
    ]
};