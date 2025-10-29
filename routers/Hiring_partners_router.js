const fileUpload = require("express-fileupload")
const hiring_partenrs_controllers = require("../Controlers/Hiring_partners_controller")
const authenticateToken = require("../Authentication")

express = require("express")



const hiring_partenrs_router = express.Router()




hiring_partenrs_router.post(

    "/add",

 fileUpload(
    {
        createParentPath:true
    }
 ),

 authenticateToken,

(req,res)=>{

    
        const result = new hiring_partenrs_controllers().add(req.body,req.files.logo)

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

hiring_partenrs_router.get(
    "/read/:id?/:collage_id?",
(req,res)=>{

        const result = new hiring_partenrs_controllers().read(req.params.id??null , req.params.collage_id??null)
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



hiring_partenrs_router.put(

    "/edit/:id",


    authenticateToken,

(req,res)=>{

        const result = new hiring_partenrs_controllers().edit(req.params.id,req.body)
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


hiring_partenrs_router.patch(

    "/logo_edit/:id",

    fileUpload(
        {
            createParentPath:true
        }
     ),
     authenticateToken,
  

(req,res)=>{


        const result = new hiring_partenrs_controllers().logo_update(req.params.id, req.body, req.files.logo)
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



hiring_partenrs_router.delete(

    "/delete/:id/:logo",
    fileUpload(
        {
            createParentPath:true
        }
     ),
     authenticateToken,
  

(req,res)=>{

        const result = new hiring_partenrs_controllers().delete(req.params.id,req.params.logo)
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







module.exports= hiring_partenrs_router 