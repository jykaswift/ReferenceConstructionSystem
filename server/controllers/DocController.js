const searchController = require("./SearchController");

class DocController {
  async search(req, res) {
    const { query } = req;
    let response;
    if (query) {
      response = await searchController.getAllTitlesBy(query);
    }

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET");
    res.header("Access-Control-Allow-Headers", "accept, content-type");
    res.header("Access-Control-Max-Age", "1728000");
    res.set("total-page", response.total);
    res.set("Access-Control-Expose-Headers", "total-page");

    res.json(response.response);
  }
}

module.exports = new DocController();
