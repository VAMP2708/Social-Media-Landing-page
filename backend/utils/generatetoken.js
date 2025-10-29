const jwt = require('jsonwebtoken');

const generatetoken = (userid)=>{
    return jwt.sign({id:userid},process.env.JWT_SECRET,{expiresIn:'7d'})

}

module.exports = generatetoken