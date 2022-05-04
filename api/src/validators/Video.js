const { check, validationResult } = require("express-validator");

const generateValidators = () => [
    check("title")
        .isString()
        .withMessage("Invalid format!")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Title can not be empty!"),
    
    check("desc")
        .isString()
        .withMessage("Invalid format!")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Description can not be empty!")
        .isLength({min: 20})
        .withMessage("Minimum 20 characters required!"),
    
    check("url")
        .isString()
        .withMessage("Invalid format!")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Url can not be empty!")
        .isURL({
            protocols: ["http", "https"],
            require_valid_protocol: true
        })
        .withMessage("Invalid url!")
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
