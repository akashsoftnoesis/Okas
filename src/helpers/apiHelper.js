const axios = require("axios");

const ApiGet = async (url, headers, params) => {
  try {
    console.log("API called => ", url, " => at ", new Date() );
    const response = await axios.get(
      "https://ap-southeast-2.api.vaultre.com.au/api/v1.3/" + url,
      {
        headers,
        params,
      }
    );
    return response;
  } catch (error) {
    if (error?.response?.status === 404) {
      return {
        data: {
          items: [],
        },
      };
    } else {
      throw error
    }
  }
};

const headersForDerrimut = {
  Authorization: `Bearer ${process.env.DERRIMUT_API_TOKEN}`,
  "X-Api-Key": process.env.DERRIMUT_API_KEY,
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  mode: "no-cors",
};
const headersForTruganina = {
  Authorization: `Bearer ${process.env.TRUGANINA_API_TOKEN}`,
  "X-Api-Key": process.env.TRUGANINA_API_KEY,
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  mode: "no-cors",
};

module.exports = {
  ApiGet,
  headersForDerrimut,
  headersForTruganina,
};
