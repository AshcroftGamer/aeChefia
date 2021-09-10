const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {
        console.log("token")
        console.log(req.body)
        console.log(req.headers.authorization)
        console.log("fim token")
        const token = req.headers.authorization;
        //const decode = jwt.verify(token, process.env.JWT_KEY);
        jwt.verify(token, process.env.JWT_KEY, function(err, decode){
          if(err){

            console.log("entour no err")
            console.log(err)
            res.status(401).send({mensagem: "Falha na autenticacao"})

           // res.redirect("/");


          }else{

            console.log("entour noelesser")

            req.usuario = decode;
            console.log("decode")
            console.log(decode)
            next();

          }

        });
       

    } catch (error) {

      //  res.status(401).send({mensagem: "Falha na autenticacao"})

      res.redirect("/");


    }


}