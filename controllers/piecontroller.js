const router = require('express').Router();
const {PieModel} = require('../models');
const middleware = require('../middleware');

router.get('/', async (req, res) => { //1
  try { //2
      const allPies = await PieModel.findAll(); //3
      res.status(200).json(allPies);
  } catch (err) {
    res.status(500).json({
        error: err
    })
  }
})
router.get('/:name', async (req, res) => { //7
  //console.log("NAME OF PIE: ", req.params.name)
  try{
    const locatedPie = await PieModel.findOne({
      where: {
        nameOfPie: req.params.name  //8
      }
    })
    res.status(200).json({
      msg: `Success!`,
      locatedPie
    })
  } catch (err) {
    res.status(500).json({
      message: `Failed to retrieve pies: ${err}`
    })
  }
})
router.post('/', middleware.validateSession, async (req, res) => {
  const {
    nameOfPie, 
    baseOfPie, 
    crust, 
    timeToBake, 
    servings, 
    ratings
  } = req.body; //4

  try { 
    const Pie = await PieModel.create({ //5
      nameOfPie,
      baseOfPie,
      crust,
      timeToBake,
      servings,
      ratings
    })
    res.status(201).json({ //6
      message: `Pie successfully created!`,
      Pie
    })
  } catch (err) {
    res.status(500).json({
      message: `Failed to create pie: ${err}`
    })
  };
});
router.put('/:id', middleware.validateSession, async (req, res) => {
  const {
    nameOfPie, baseOfPie, crust, timeToBake, servings, ratings
  } = req.body;
  try {
    const piesUpdated = await PieModel.update(
      {nameOfPie, baseOfPie, crust, timeToBake, servings, ratings},
      {where: {id: req.params.id}}
    )
    res.status(200).json({
      message: `Pie successfully updated`,
      piesUpdated
    })
  } catch (err) {
    res.status(500).json({
      message: `Failed to update pie: ${err}`
    })
  }
})

router.delete("/:id", middleware.validateSession, async (req, res) => {
    try{
        const locatedPie = await PieModel.destroy({
            where: {id: req.params.id}
        })
            res.status(200).json({
                message: `Pie successfully deleted`,
                deletedPie: result
            })
    } catch(err){
        res.status(500).json({
            message: `Failed to delete Pie: ${err}`
        })
    }
})
//Challenge => Try to build out a delete endpoint
module.exports = router;
/* 
? 1 => The res (response) object represents the HTTP response that an Express app 
? sends back to us when it receives an HTTP request.
? 2 => We add some error handling to this by wrapping the code 
? inside of a try...catch statement.
? 3 => findAll() is a sequelize query method we can use to GET all objects 
? stored in a table from the database. This returns a promise that, 
? in conjunction with the async/await, gets captured in a variable called allPies.
* 4 => We use object deconstruction to extrapolate data from the request. 
* req.body allows you to access the JSON data that was sent in the request. 
* Generally used in POST/PUT requests to send arbitrary-length JSON to the server
* 5 => We use the sequelize method of .create() and pass in the data from the deconstructed request. 
* This builds a new instance of our model and is expecting the values of our keys to be sent through 
* the request body. We then capture the response from database as the pie was created and assign that 
* to a variable called Pie.
* 6 => We build a response and provide a 201 (content created) status code. 
* We also provide a message indicating this success and appending the newly created pie to the response.
? 7 => We use the the colon in this endpoint to accept a parameter. 
? 8 => req.params will look into the parameters of the endpoint, then we specify what to pull from it.
*/