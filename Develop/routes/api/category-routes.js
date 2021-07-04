const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => 
{

 Category.findAll()
 .then((result) =>{
   res.send(result);
  })
  .catch((err)=>{
    console.log("There was an error ", err)
  });
});

router.get('/:id', (req, res) => 
{
  // find one category by its `id` value
  // be sure to include its associated Products

Category.findOne(
{
  where:
  {
    id:req.params.id
  }
})
.then((result) => {
  if(result !== null)
  {
  res.send(result);
  }
  else
  {
  res.status(404)
  res.end("Category not found..")
  }
})
.catch((err) => {
    res.status("500",err)
    res.send(err)
  });
});

router.post('/', (req, res) => 
{
  // create a new category

  Category.findOrCreate({where:{category_name: req.body.category_name}})
  .then(([result,wasCreated]) => {

    if (wasCreated === true)
    {
      res.status(201).send(JSON.stringify(result));
    }
    else
    {
      res.status(409);
      res.end("Record already exists");
    }
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.findOne({where:{id:req.params.id}})
  .then((result) => {console.log(result)});
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy(
  {
    where:
    {id: req.params.id
    }
  })
  .then((result) => 
  {
    if (result) 
    {
      res.send("Successfully Deleted")
    }
    else
    {
      res.status(404);
      res.end("Record not found..");
    }
  });
});


module.exports = router;
