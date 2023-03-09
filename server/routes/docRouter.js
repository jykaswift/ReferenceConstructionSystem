const Router = require("express");
const router = new Router();
const docController = require("../controllers/DocController");

router.get("/search", docController.search);

module.exports = router;
