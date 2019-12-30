module.exports.help = (req, res, next)=>{
    
    res.sendError = (num, msg)=>{
        res.status(num).send(msg)
    }

    next()
}