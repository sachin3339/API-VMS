const jwt = require('jsonwebtoken');
function checkAuth(req,res,next){

try{
    const token = req.headers.authorization.split(" ")[1]; //Bearer #$%#@#%$$$^%$%$#$#
    const decodedToken = jwt.verify(token,process.env.JWT_KEY);
    req.userdata = decodedToken;
    if(req.userdata.role==='Admin')
    {next();}
    else
    {
        return res.status(401).json({
            'message':'You are not authorized to use this service'
        })
    }
    

}
catch(e){
    return res.status(401).json({
        'message':'Invalid or expired token provided',
        'error':e
    })
}

}

module.exports={
    checkAuth:checkAuth
}