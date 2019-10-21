const express = require("express");
const router = express.Router();
const Phonebook = require("../models/phonebook");
const DataAggregation = require("../helper/DataAggregation");
const aggregation = new DataAggregation(Phonebook);

/* GET list. */
router.get("/", (req, res) => {
  Phonebook.aggregate()
    .collation({ locale: "id" })
    .sort("name")
    .exec()
    .then(docs => res.status(200).json(docs))
    .catch(err => console.error(err));
});

// search
router.post("/search", (req, res) => {
  const { name, phoneNumber } = req.body;
  const filter = {
    name: { $regex: name, $options: "i" },
    phoneNumber: { $regex: phoneNumber, $options: "i" }
  };
  Phonebook.aggregate()
    .match(filter)
    .collation({ locale: "id" })
    .sort("name")
    .exec()
    .then(docs => res.status(200).json(docs))
    .catch(err => console.error(err));
});

//add
router.post("/", (req, res, next) => {
  const { id, name, phoneNumber } = req.body;
  let response = {
    status: true,
    message: `${name} have been added to phonebook`
  };

  let phoneBooks = new Phonebook({ id, name, phoneNumber });

  phoneBooks
    .save()
    .then(doc => {
      response.data = doc;
      res.json(response);
    })
    .catch(err => {
      response.status = false;
      response.message = "Cannot add Phonebook";
      res.json(response);
    });
});

// edit
router.put("/:id", (req, res) => {
  Phonebook.findByIdAndUpdate(req.params.id, req.body, (err, response) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        status: true,
        message: "Data have been updated",
        id: req.params.id,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber
      });
    }
  });
});

// delete
router.delete("/:id", (req, res) => {
  Phonebook.findByIdAndDelete(req.params.id, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      res.status(201).json({
        status: true,
        message: `${docs.name} have been deleted from phonebook"`,
        id: req.params.id,
        name: docs.name,
        phoneNumber: docs.phoneNumber
      });
    }
  });
});

module.exports = router;
