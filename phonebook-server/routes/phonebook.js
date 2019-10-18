const express = require("express");
const router = express.Router();
const Phonebook = require("../models/phonebook");
const DataAggregation = require("../helper/DataAggregation");
const aggregation = new DataAggregation(Phonebook);

/* GET list. */
router.get("/", (req, res) => {
  let limit = req.header("Limit");
  let skip = Number(req.header("Skip") || 0);
  aggregation
    .countData()
    .then(result => {
      if (limit == "all") limit = result[0].count;
      limit = Number(limit || result[0].count);
      const numOfPages = Math.ceil((result[0].count || 0) / limit);
      if (skip >= result[0].count) skip -= limit;
      aggregation
        .getData(limit, skip)
        .then(data => {
          res.status(200).json({ numOfPages, data });
        })
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
});

// search
router.post("/search", (req, res) => {
  const filter = Object.keys(req.body).map(JSON.parse)[0];
  let limit = req.header("Limit");
  let skip = Number(req.header("Skip") || 0);

  aggregation.countData(filter).then(result => {
    let numOfPages = 0;
    if (result[0]) {
      if (limit == "all") limit = result[0].count;
      limit = Number(limit || result[0].count);
      numOfPages = Math.ceil((result[0].count || 0) / limit);
      if (skip >= result[0].count) skip -= limit;
    }
    limit = Number(limit);

    aggregation
      .getData(limit, skip, filter)
      .then(data => {
        res.status(200).json({ numOfPages, data });
      })
      .catch(err => console.error(err));
  });
});

router.post("/"), (req,res,next) => {
    const {name, phoneNumber} = req.body;
    let response = {
        status: true,
        message: `${name} have benn added to phonebook`
    }

    let phoneBooks = new Phonebook({name, phoneNumber})

    phoneBooks.save().then(data => {
        res.status(200).json(data)
        .catch(err => {
            response.status.false,
            response.message = "Can't not added Phonebook"
        })
    })
}

router.put("/:id",(req, res)=> {
    Phonebook.findByIdAndUpdate(req.params.id, req.body, (err,response)=> {
        if(err){
            console.log(err);
            
        }else{
            res.status(200).json({
                status:true,
                message:"data have been update",
                id: req.body._id,
                name: req.body.name,
                phoneNumber: req.body.phoneNumber
            })
        }
    })
})

router.delete("/:id",(req,res) => {
    Phonebook.findByIdAndDelete(req.params.id, req.body, (err,resposnse)=> {
        if(err){
            console.log(err);
            
        }else{
            res.status(201).json({
                status:true,
                message: "data have been delete",
                id: req.body._id,
                name: req.body.name,
                phoneNumber: req.body.phoneNumber
            })
        }
    })
})

module.exports = router;
