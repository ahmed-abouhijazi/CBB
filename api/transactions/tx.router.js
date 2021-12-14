const { createTx,getTx } = require("./tx.controller");
const router = require("express").Router();

router.post("/insert",createTx);
router.get("/transactions",getTx);

module.exports = router;