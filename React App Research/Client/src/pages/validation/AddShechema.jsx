import joi from "joi"

const ShemaValidations = (validation) => {
    const schema = joi.object({
        schemaName: joi.string().min(3).max(255).required().messages({
            "string.base": "Assignment Name must be a string",
            "string.empty": "Assignment Name is required",
            "string.min": "Assignment Name must be at least 3 characters",

        }),
        department: joi.string().required().messages({
            "string.base": "Department must be a string",
            "string.empty": "Department is required"
        })

    })
    const result = schema.validate(validation);

    if (result.error) {
        return {
            status: false,
            error: result.error.message,
        }
    } else {
        return {
            status: true
        }
    }
};


export default ShemaValidations ;