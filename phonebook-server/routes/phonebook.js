const express = require("express");
const router = express.Router();
const Phonebook = require("../models/phonebook");
const DataAggregation = require("../helper/DataAggregation");
const aggregation = new DataAggregation(Phonebook);

/* GET list. */
router.get("/", (req, res) => {});

module.exports = router;
