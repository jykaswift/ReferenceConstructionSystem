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
      from: page === "1" ? 1 : page * 10,
      size: 5,
      query: {
        match: {
          doc_html: query,
        },
      },
    };

    return await this.axios
      .post(
        `http://${this.ELASTIC_HOST}:${this.ELASTIC_PORT}/_search`,
        queryData
      )
      .then((response) => {
        return response.data.hits.hits;
      })
      .catch((e) => {
        console.log(e);
      });
  }
}

module.exports = new SearchController();
