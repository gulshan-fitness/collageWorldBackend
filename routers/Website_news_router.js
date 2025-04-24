const fileUpload = require("express-fileupload")


const authenticateToken = require("../Authentication")
const website_news_controller = require("../Controlers/Website_news_controller")



express = require("express")



const website_news_router = express.Router()




website_news_router.post(

    "/add",

 fileUpload(
    {
        createParentPath:true
    }
 ),
 authenticateToken,
  

(req,res)=>{

    
        const result = new website_news_controller().add(req.body,req.files.logo,req.files.news_media_logo)

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

website_news_router.get(

    "/read/:id?",


  
    
(req,res)=>{

        const result = new website_news_controller().read(req.params.id??null,req.query??null)
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




website_news_router.delete(

    "/delete/:id/:logo/:news_media_logo",
    fileUpload(
        {
            createParentPath:true
        }
     ),

     authenticateToken,

(req,res)=>{

        const result = new website_news_controller().delete(req.params.id,req.params.logo,req.params.news_media_logo)
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







module.exports= website_news_router 