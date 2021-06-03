require("dotenv").config();
const Express = require("express");
const app = Express();
app.use(Express.json())
const dbConnection = require("./db");
// app.use(Express.static(__dirname + '/public'));
// console.log(__dirname);
// app.get('/', (req, res) => res.render('index'));
const controllers = require("./controllers");
const middleware = require("./middleware");

app.use(middleware.headers);

app.use("/user", controllers.usercontroller);
//app.use("/pies", controllers.piecontroller);
app.use("/pies",middleware.validateSession, controllers.piecontroller);


dbConnection
  .authenticate()
  .then(() => dbConnection.sync())
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`[Server]: App is listening on ${process.env.PORT}`);
    });
  })
  .catch((err) => {
      console.log("[Server]: Server crashed");
      console.log(err);
  })
  /*    The .authenticate() method tests if the connection with the database is okay. 
        That returns a promise. If the connection is good, we use the .sync() method to 
        sync the models to our database.
  */