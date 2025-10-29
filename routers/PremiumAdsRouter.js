

const authenticateToken = require("../Authentication")
const CollegePremiumAddController = require("../Controlers/CollegePremiumAddController")

const fileUpload = require("express-fileupload")


express = require("express")


const PremiumAdRouter = express.Router()








PremiumAdRouter.post(

    "/add",
    fileUpload(
        {
            createParentPath:true
        }
     ),
     authenticateToken,

(req,res)=>{




        const result = new CollegePremiumAddController().add(req.body, req.files.image)
        result.then(
            (succes)=>{
                res.send( succes)
            }
        )
        
        .catch(
            (error)=>{
                res.send( error) 
            }
        )

    }
)


PremiumAdRouter.get(

    "/read/:id?/:college_id?",

    

(req,res)=>{

        const result =  new CollegePremiumAddController().read(req.params.id??null,req.params.college_id??null)

        result.then(
            (succes)=>{
                res.send( succes)
            }
        )
        
        .catch(
            (error)=>{
                res.send( error) 
            }
        )

    }
)




PremiumAdRouter.delete(

    "/delete/:id/:banner",

    authenticateToken,

(req,res)=>{

        const result = new CollegePremiumAddController().delete(req.params.id,req.params.banner)
        result.then(
            (succes)=>{
                res.send( succes)
            }
        )
        
        .catch(
            (error)=>{
                res.send( error) 
            }
        )

    }
)






module.exports= PremiumAdRouter 