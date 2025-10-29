const fileUpload = require("express-fileupload")

const placement_controller = require("../Controlers/placement_controller")
const authenticateToken = require("../Authentication")

express = require("express")



const placement_router = express.Router()




placement_router.post(

    "/add",

 fileUpload(
    {
        createParentPath:true
    }
 ),

 authenticateToken,

(req,res)=>{

    
        const result = new placement_controller().add(req.body)

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

placement_router.get(

    "/read/:id?/:collage_id?",


   

(req,res)=>{

        const result = new placement_controller().read(req.params.id??null,req.params.collage_id??null)
        
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



placement_router.put(

    "/edit/:id",

    authenticateToken,
  

(req,res)=>{

        const result = new placement_controller().edit(req.params.id,req.body)
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






placement_router.delete(

    "/delete/:id",
    fileUpload(
        {
            createParentPath:true
        }
     ),

     authenticateToken,

(req,res)=>{

        const result = new placement_controller().delete(req.params.id)
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







module.exports= placement_router 