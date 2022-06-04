import joi from "joi"

const AssgmentValidations = (validation) => {
    const schema = joi.object({
        asgName: joi.string().min(3).max(255).required().messages({
            "string.base": "Assignment Name must be a string",
            "string.empty": "Assignment Name is required",
            "string.min": "Assignment Name must be at least 3 characters",
            "string.max": "Assignment Name must be less than 255 characters" 
        }),
          
        endDate: joi.string().required().messages({
            "string.base": "End Date must be a string",
            "string.empty": "End Date is required"
        }),
        endTime: joi.string().required().messages({
            "string.base": "End Time must be a string",
            "string.empty": "End Time is required"
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


export default AssgmentValidations;