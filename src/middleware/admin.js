const jwt = require('jsonwebtoken')

module.exports.adminMiddleware = (req, res, next)=>{
    next()
}

module.exports.jwtVerify = (req, res, next)=>{

    const authHeader = req.headers.authorization;
    if(!authHeader)
        return res.status(401).send({ error: 'No token provided'});
    
    const parts = authHeader.split(' ');
    if (!parts.length === 2) {
        return res.status(401).send({ error: 'Token error' });
    }

    const [ scheme, token ] = parts;
    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token malformatted' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Token Invalid' });
        //else  res.status(200).send({auth: true});
        const user = decoded.user
        console.log(user)
        req.user = user;
        next();
    });

}



