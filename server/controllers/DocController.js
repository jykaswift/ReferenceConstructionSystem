const ApiError = require("../error/ApiError");
const axios = require("axios");
const { ELASTIC_HOST, ELASTIC_PORT } = require("../env");

class DocController {
  async getDocsBySearch(req, res, next) {
    const { query, page } = req.query;

    if (!page || !query) {
      return next(ApiError.badRequest("No query or page"));
    }

    const queryData = {
      _source: "doc_name",
      from: page * 10,
      size: 10,
      query: {
        match: {
          doc_html: query,
        },
      },
    };

    axios
      .post(`http://${ELASTIC_HOST}:${ELASTIC_PORT}/_search`, queryData)
      .then((elastic_res) => {
        const total = Math.floor(elastic_res.data.hits.total.value / 10);

        const result = [];
        elastic_res.data.hits.hits.forEach((obj) => {
          result.push({
            id: obj._id,
            doc_name: obj._source.doc_name,
          });
        });

        res.set("total-page", total);
        res.set("Access-Control-Expose-Headers", "total-page");

        res.json(result);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async getDocById(req, res, next) {
    const { id } = req.query;

    if (!id) {
      return next(ApiError.badRequest("No id argument"));
    }

    axios
      .get(`http://${ELASTIC_HOST}:${ELASTIC_PORT}/html_data/_source/${id}`)
      .then((elastic_res) => {
        res.json(elastic_res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
}

module.exports = new DocController();
