



const rating_controller = require("../Controlers/Rating_controller")



express = require("express")

const rating_router=express.Router()

rating_router.post(

    "/add",

(req,res)=>{

    
        const result = new rating_controller().add(req.body)

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

rating_router.get(

    "/read/:id?",


  

(req,res)=>{

        const result = new rating_controller().read(req.params.id??null)
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










rating_router.delete(

    "/delete/:id",
   

  

(req,res)=>{

        const result = new rating_controller().delete(req.params.id)
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







module.exports= rating_router 