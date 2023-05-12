const joi = require("joi");

const createSchema = joi.object({
    userId: joi.string().min(3).required(),
    prodId: joi.string().min(3).required(),
    quantity: joi.number().integer().positive(),
});

const updateSchema = joi.object({
    _id: joi.string().required(),
    quantity: joi.number().integer().positive().required()
})

module.exports= { createSchema, updateSchema} 