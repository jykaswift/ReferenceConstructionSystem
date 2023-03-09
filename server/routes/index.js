const Router = require("express");
const router = new Router();

const docRouter = require("./docRouter");

router.use("/doc", docRouter);

module.exports = router;
