express = require("express");



const User_routers = express.Router();

const user_controller = require("../Controlers/User_controller");

User_routers.post(
  "/sign_up",

  (req, res) => {
    const result = new user_controller().sign_up(req.body);
    result
      .then((succes) => {
        res.send(succes);
      })

      .catch((error) => {
        res.send(error);
      });
  }
);

User_routers.post(
  "/login",

  (req, res) => {
    const result = new user_controller().login(req.body);
    result
      .then((succes) => {
        res.send(succes);
      })

      .catch((error) => {
        res.send(error);
      });
  }
);

User_routers.get(
  "/read/:user_id?",

  (req, res) => {
    const result = new user_controller().get_users(
      req.params.user_id ?? null,
      req.query ?? null,
     
    );
    result
      .then((succes) => {
        res.send(succes);
      })

      .catch((error) => {
        res.send(error);
      });
  }
);


User_routers.get(
  "/exist_user/:email",

  (req, res) => {
    const result = new user_controller().exist_user(
      req.params.email,
    
    
    );
    result
      .then((succes) => {
        res.send(succes);
      })

      .catch((error) => {
        res.send(error);
      });
  }
);


User_routers.get(
  "/get_users_recent_enquiry_city_wise/:city",

  (req, res) => {
    const result = new user_controller().get_users_recent_enquiry_city_wise(
      req.params.city ,
      
    );
    result
      .then((succes) => {
        res.send(succes);
      })

      .catch((error) => {
        res.send(error);
      });
  }
);



User_routers.put(
  "/edit/:id",

  (req, res) => {
    const result = new user_controller().edit(req.params.id, req.body);

    result
      .then((succes) => {
        res.send(succes);
      })

      .catch((error) => {
        res.send(error);
      });
  }
);

User_routers.patch(
  "/checked_status_edit/:id/:status",

  (req, res) => {
    const result = new user_controller().checked_status_edit(
      req.params.id,
      req.params.status
    );

    result
      .then((succes) => {
        res.send(succes);
      })

      .catch((error) => {
        res.send(error);
      });
  }
);

User_routers.patch(
  "/user_response_edit/:id/:response",

  (req, res) => {
    const result = new user_controller().user_response_edit(
      req.params.id,
      req.params.response
    );

    result
      .then((succes) => {
        res.send(succes);
      })

      .catch((error) => {
        res.send(error);
      });
  }
);

User_routers.patch(
  "/college_edit/:id/:college_id",

  (req, res) => {
    const result = new user_controller().college_edit(
      req.params.id,
      req.params.college_id
    );

    result
      .then((succes) => {
        res.send(succes);
      })

      .catch((error) => {
        res.send(error);
      });
  }
);

User_routers.patch(
  "/course_edit/:id/:course",

  (req, res) => {
    const result = new user_controller().course_edit(
      req.params.id,
      req.params.course
    );

    result
      .then((succes) => {
        res.send(succes);
      })

      .catch((error) => {
        res.send(error);
      });
  }
);

User_routers.delete(
  "/delete/:id",

  (req, res) => {
    const result = new user_controller().delete(req.params.id);

    result
      .then((succes) => {
        res.send(succes);
      })

      .catch((error) => {
        res.send(error);
      });
  }
);

User_routers.patch(
    "/enquiry_edit/:id",

  
    (req, res) => {

     
      
      const result = new user_controller().enquiry_edit(
        req.params.id,
        req.body
      );
  
      result
        .then((succes) => {
          res.send(succes);
        })
  
        .catch((error) => {
          res.send(error);
        });
    }
  );

module.exports = User_routers;
