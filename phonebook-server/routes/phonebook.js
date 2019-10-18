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

    
}

module.exports = router;
