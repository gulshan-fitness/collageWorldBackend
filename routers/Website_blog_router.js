const fileUpload = require("express-fileupload")


const authenticateToken = require("../Authentication")
const website_blogs_controller = require("../Controlers/Website_blog_controller")


express = require("express")



const website_blogs_router = express.Router()




website_blogs_router.post(

    "/add",

 fileUpload(
    {
        createParentPath:true
    }
 ),
 authenticateToken,
  

(req,res)=>{

    
        const result = new website_blogs_controller().add(req.body,req.files.logo)

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

website_blogs_router.get(

    "/read/:id?",


  
    
(req,res)=>{

        const result = new website_blogs_controller().read(req.params.id??null,req.query??null)
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



website_blogs_router.put(

    "/edit/:id",


    authenticateToken,

(req,res)=>{

        const result = new website_blogs_controller().edit(req.params.id,req.body)
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


website_blogs_router.patch(

    "/logo_edit/:id",
    fileUpload(
        {
            createParentPath:true
        }
     ),

     authenticateToken,

(req,res)=>{

        const result = new website_blogs_controller().logo_update(req.params.id, req.body, req.files.logo)
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



website_blogs_router.delete(

    "/delete/:id/:logo",
    fileUpload(
        {
            createParentPath:true
        }
     ),

     authenticateToken,

(req,res)=>{

        const result = new website_blogs_controller().delete(req.params.id,req.params.logo)
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







module.exports= website_blogs_router 