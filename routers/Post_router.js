const fileUpload = require("express-fileupload")

const post_controller = require("../Controlers/Post_controller")
const authenticateToken = require("../Authentication")

express = require("express")



const post_router = express.Router()




post_router.post(

    "/add",

 fileUpload(
    {
        createParentPath:true
    }
 ),
 authenticateToken,
  

(req,res)=>{

    
        const result = new post_controller().add(req.body,req.files.logo)

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

post_router.get(

    "/read/:id?/:collage_id?",


  
    
(req,res)=>{

        const result = new post_controller().read(req.params.id??null, req.params.collage_id??null )
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



post_router.put(

    "/edit/:id",


    authenticateToken,

(req,res)=>{

        const result = new post_controller().edit(req.params.id,req.body)
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


post_router.patch(

    "/logo_edit/:id",
    fileUpload(
        {
            createParentPath:true
        }
     ),

     authenticateToken,

(req,res)=>{

        const result = new post_controller().logo_update(req.params.id, req.body, req.files.logo)
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



post_router.delete(

    "/delete/:id/:logo",
    fileUpload(
        {
            createParentPath:true
        }
     ),

     authenticateToken,

(req,res)=>{

        const result = new post_controller().delete(req.params.id,req.params.logo)
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







module.exports= post_router 