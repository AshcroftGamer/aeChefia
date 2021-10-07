const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        //const decode = jwt.verify(token, process.env.JWT_KEY);
        jwt.verify(token, process.env.JWT_KEY, function(err, decode){
          if(err){
            res.status(401).send({mensagem: "Falha na autenticacao"})

          }else{

            req.usuario = decode;
            next();

          }

        });
       

    } catch (error) {
      res.redirect("/");

    }


}