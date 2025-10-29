



const placementScore_controller = require("../Controlers/PlacementScore_controller")



express = require("express")

const placementScore_router = express.Router()

placementScore_router.post(

    "/add",



  

(req,res)=>{

    
        const result = new placementScore_controller().add(req.body)

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

placementScore_router.get(

    "/read/:id?/:college_id?",


  

(req,res)=>{

        const result = new placementScore_controller().read(req.params.id??null,req.params.college_id??null)
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










placementScore_router.delete(

    "/delete/:id",
   

  

(req,res)=>{

        const result = new placementScore_controller().delete(req.params.id)
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







module.exports= placementScore_router 