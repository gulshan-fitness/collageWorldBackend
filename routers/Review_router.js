




const review_controller = require("../Controlers/Review_controller")



express = require("express")

const review_router = express.Router()

review_router.post(

    "/add",


 

  

(req,res)=>{

    
        const result = new review_controller().add(req.body)

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

review_router.get(

    "/read/:id?",


  

(req,res)=>{

        const result = new review_controller().read(req.params.id??null)
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




review_router.delete(

    "/delete/:id",
 

  

(req,res)=>{

        const result = new review_controller().delete(req.params.id)
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







module.exports= review_router 