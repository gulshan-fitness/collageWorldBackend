

const authenticateToken = require("../Authentication")
const banner_controller = require("../Controlers/Banner_controller")

const fileUpload = require("express-fileupload")


express = require("express")


const banner_router = express.Router()








banner_router.post(

    "/add",
    fileUpload(
        {
            createParentPath:true
        }
     ),
     authenticateToken,

(req,res)=>{




        const result = new banner_controller().add(req.files.banner)
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


banner_router.get(

    "/read/:id?",

    

(req,res)=>{

        const result = new banner_controller().read(req.params.id??null)
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




banner_router.delete(

    "/delete/:id/:banner",

    authenticateToken,

(req,res)=>{

        const result = new banner_controller().delete(req.params.id,req.params.banner)
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






module.exports= banner_router 