export const Validate = (schema) => (req,res,next) => {
    const{value,error} = schema.validate(req.body);
    if(error)
    {
        return res.status(404).json({
            success:false,
            error: error.details.map((err) => ({
                message:err.message
            })),
        })
    }
    req.validate=value;
    next();
}