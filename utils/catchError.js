module.exports = (func) => {
    return (req,res,next) => {
        func(req,res,next).catch(err => {
            if(err&&err.response&&err.response.status===404)
                return res.status(404).json({
                    success: false,
                    message: "No such word found"
                });
            return res.status(500).json({
            success: false,
            message: "An error occurred"
        })
    });
    }
}