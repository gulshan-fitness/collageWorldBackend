const fileUpload = require("express-fileupload")
const college_controller = require("../Controlers/College_controller")
const authenticateToken = require("../Authentication")

express = require("express")


const college_router = express.Router()








college_router.post(

    "/submission",
 fileUpload(
    {
        createParentPath:true
    }
 ),
 authenticateToken,
  

(req,res)=>{
    
    

        const result = new college_controller().submission(req.body,req.files.logo, req.files.campus??null, req.files.pdf??null,req.files.office_photo??null)

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

college_router.get(

    "/read/:id?",


   

(req,res)=>{

        const result = new college_controller().read(req.params.id??null,req.query??null)
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

college_router.get(

    "/read_name/:name",

  

(req,res)=>{

        const result = new college_controller().read_name(req.params.name)
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

college_router.get(

    "/read_by_rating",

  

(req,res)=>{

        const result = new college_controller().read_by_rating()
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

college_router.get(

    "/top10_colleges_by_city/:city",

  

(req,res)=>{

    console.log(req.params.city);
    
        const result = new college_controller().top10_colleges_by_city(req.params.city)
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

college_router.get(

    "/top10_colleges_by_state/:state",

  

(req,res)=>{

    
    
        const result = new college_controller().top10_colleges_by_state(req.params.state)
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




college_router.get(

    "/state_wise_colleges",

  

(req,res)=>{

        const result = new college_controller().state_wise_colleges()
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



college_router.put(

    "/edit/:id",


    authenticateToken,

(req,res)=>{

        const result = new college_controller().edit(req.params.id??null,req.body)
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

college_router.patch(

    "/logo_edit/:id",
    fileUpload(
        {
            createParentPath:true
        }
     ),

     authenticateToken,

(req,res)=>{

        const result = new college_controller().logo_update(req.params.id, req.body, req.files.logo)
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

college_router.patch(

    "/pdf_edit/:id",
    fileUpload(
        {
            createParentPath:true
        }
     ),
     authenticateToken,
  

(req,res)=>{

        const result = new college_controller().pdf_update(req.params.id, req.body, req.files.pdf)
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


college_router.patch(

    "/office_photo_edit/:id",
    fileUpload(
        {
            createParentPath:true
        }
     ),
     authenticateToken,
  

(req,res)=>{

        const result = new college_controller().office_photo_update(req.params.id, req.body, req.files.office_photo)
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

college_router.patch(

    "/campus_images_edit/:id",
    fileUpload(
        {
            createParentPath:true
        }
     ),

     authenticateToken,

(req,res)=>{

        const result = new college_controller().campus_images_update(req.params.id, req.body, req.files.campus_images)
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

college_router.delete(

    "/delete/:id/:logo/:campus_images/:pdf/:office_photo",
  

    authenticateToken,

(req,res)=>{

        const result = new college_controller().delete(req.params.id,req.params.logo,req.params.campus_images,req.params.pdf, req.params.office_photo)
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








module.exports= college_router 