
const fileUpload = require("express-fileupload")
const course_controller = require("../Controlers/Course_controller")
const authenticateToken = require("../Authentication")

express = require("express")


const course_router = express.Router()




course_router.post(

    "/add",

    fileUpload(
        {
            createParentPath:true
        }
     ),
     authenticateToken,

(req,res)=>{

        const result = new course_controller().add(req.body,req.files.course_image)
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


course_router.get(

    "/read/:id?",
   
  

(req,res)=>{

        const result = new course_controller().read(req.params.id??null,req.query??null)
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


course_router.get(

    "/read_top10course",
    
(req,res)=>{

        const result = new course_controller().read_top_10_course()
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

course_router.get(

    "/top10course_by_city/:city",
    
(req,res)=>{

        const result = new course_controller().top10course_by_city(req.params.city)
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

course_router.get(

    "/top10course_by_state/:state",
    
(req,res)=>{

        const result = new course_controller().top10course_by_state(req.params.state)
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




course_router.put(

    "/edit/:id",
    authenticateToken,
  

(req,res)=>{

        const result = new course_controller().edit(req.params.id,req.body)
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


course_router.patch(

    "/logo_edit/:id",
    fileUpload(
        {
            createParentPath:true
        }
     ),

     authenticateToken,

(req,res)=>{

        const result = new course_controller().logo_update(req.params.id, req.body, req.files.logo)
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

course_router.delete(

    "/delete/:id/:old_logo",

    authenticateToken,  

(req,res)=>{

        const result = new course_controller().delete(req.params.id,req.params.old_logo)
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






module.exports= course_router 