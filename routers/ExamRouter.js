
const fileUpload = require("express-fileupload")


const ExamController = require("../Controlers/ExamController")


const authenticateToken = require("../Authentication")

express = require("express")


const ExamRouter = express.Router()




ExamRouter.post(

    "/add",

    fileUpload({createParentPath:true}),   


     authenticateToken,
    

(req,res)=>{

        const result = new ExamController().add(req.body,
            req.files.logo,
            req.files.PreviousPapper
        ) 


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


ExamRouter.get(

    "/read/:id?",
   
  

(req,res)=>{

        const result = new ExamController().read(req.params.id??null,req.query??null)
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




ExamRouter.put(

    "/edit/:id",

    authenticateToken,

(req,res)=>{

        const result = new ExamController().edit(req.params.id,req.body)
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


ExamRouter.patch(
     "/ImageEdits/:id/:filepath/:objectKey",

     fileUpload({createParentPath:true}), 

    authenticateToken,

(req,res)=>{
        const result = new ExamController().ImageEdits(
            req.params.id, 
            req.body,
             req.files.image,
             req.params.filepath,
             req.params.objectKey
            )
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



ExamRouter.delete(

    "/delete/:id/:oldlogo/:oldpaper",

    authenticateToken,  

(req,res)=>{

        const result = new ExamController().delete(req.params.id,req.params.oldlogo,req.params.oldpaper)
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






module.exports= ExamRouter 