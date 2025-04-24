const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    


    if (!authHeader) {
        return res.json({ msg: 'Token is required', status: 0 });
    }

    jwt.verify(authHeader, process.env.TOKEN_KEY, (err, user) => {
      
      
        if (err) {
            return res.json({ msg: 'Invalid token', status: 0 });
        }

else{
  
  next();
}

       
      
    });
};

module.exports = authenticateToken;
