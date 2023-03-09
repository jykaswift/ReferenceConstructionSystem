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

    res.json(response);
  }
}

module.exports = new DocController();
