const express = require("express");
const router = express.Router();
const Phonebook = require("../models/phonebook");
const DataAggregation = require("../helper/DataAggregation");
const aggregation = new DataAggregation(Phonebook);

/* GET list. */
router.get("/", (req, res) => {});

router.post("/"), (req,res,next) => {
    const {name, phoneNumber} = req.body;
    let response = {
        status: true,
        message: `${name} have benn added to phonebook`
    }

    
}

module.exports = router;
