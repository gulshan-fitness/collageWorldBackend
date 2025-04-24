

const authenticateToken = require("../Authentication")



const fileUpload = require("express-fileupload")
const slider_banner_controller = require("../Controlers/Slider_banner_controller")


express = require("express")


const slider_banner_router = express.Router()








slider_banner_router.post(

    "/add",
    

    fileUpload(
        {
            createParentPath:true
        }
     ),
     authenticateToken,

(req,res)=>{




        const result = new slider_banner_controller().add(req.files.banner)
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


slider_banner_router.get(

    "/read/:id?",

    

(req,res)=>{

        const result = new slider_banner_controller().read(req.params.id??null)
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




slider_banner_router.delete(

    "/delete/:id/:banner",

    authenticateToken,

(req,res)=>{

        const result = new slider_banner_controller().delete(req.params.id,req.params.banner)
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






module.exports= slider_banner_router 