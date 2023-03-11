const { response } = require("express");

class SearchController {
  constructor() {
    this.axios = require("axios").default;
    require("dotenv").config();
    this.ELASTIC_HOST = process.env.ELASTIC_HOST;
    this.ELASTIC_PORT = process.env.ELASTIC_PORT;
  }

  async getAllTitlesBy({ query, page }) {
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
    console.log(queryData);
    return await this.axios
      .post(
        `http://${this.ELASTIC_HOST}:${this.ELASTIC_PORT}/_search`,
        queryData
      )
      .then((resp) => {
        console.log(resp.data.hits.total.value);
        const total = Math.floor(resp.data.hits.total.value / 10);

        const response = [];
        resp.data.hits.hits.forEach((obj) => {
          response.push({
            id: obj._id,
            doc_name: obj._source.doc_name,
          });
        });

        return { response, total };
      })
      .catch((e) => {
        console.log(e);
      });
  }
}

module.exports = new SearchController();
