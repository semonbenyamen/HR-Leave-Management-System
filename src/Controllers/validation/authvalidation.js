const joi = require("joi");

const registerSchema = joi.object({
    name: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(255).required(),
    role: joi.string().valid("employee", "hr").default("employee"),
})

module.exports = {
    registerSchema
}
