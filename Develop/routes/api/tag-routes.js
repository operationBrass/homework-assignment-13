const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll(
    {
      include: [{model: Product}]
    }
  )
  .then((result) =>{
    res.send(result);
   })
   .catch((err)=>{
     console.log("There was an error ", err)
   });
});

router.get('/:id', (req, res) => 
{
  // update a category by its `id` value
  Tag.findOne(
  {
    where:{id:req.params.id
  }})
  .then((result) => 
  {
    if(result !== null)
    {
      res.send(result);
    }
    else
    {
      res.status(404).send("Record not found");
    }
  })
  .catch(err => console.log(err));
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Tag.destroy(
  {
    where:
    {
      id: req.params.id
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

router.post('/', (req, res) => {
  // create a new tag
   Tag.findOrCreate(
    {
     where:
      {
       tag_name: req.body.tag_name
      }
    })
   .then(([result,wasCreated]) => 
   {
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
  // update a tag's name by its `id` value

  // update a category by its `id` value
  Tag.findOne({where:{id:req.params.id}})
  .then((result) => 
  {
    if(result !== null)
    {
    result.update(
      {
        tag_name: req.body.tag_name,
      })
    .then(update => {res.send(JSON.stringify(update))});
    }
    else
    {
      res.status(404);
      res.end("Record not found..");
    }
  });

});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy(
    {
      where:
      {
        id: req.params.id
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
