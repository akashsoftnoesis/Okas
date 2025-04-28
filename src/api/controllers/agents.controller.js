const cache = require("../../helpers/redisService");
const { getAgentByID, derrimutAgentArray, truganinaAgentArray } = require("../../helpers/agentsHelper");
const { allAgentsList } = require("../../helpers/constants");
// const derrimutAgentArray = [
//   'vish@okaspropertygroup.com.au',
//   'neha@okaspropertygroup.com.au',
//   'priydeep@okaspropertygroup.com.au',
//   'ridhima@okaspropertygroup.com.au',
//   'thao@okaspropertygroup.com.au',
//   'cindy@okaspropertygroup.com.au',
//   'marie@okaspropertygroup.com.au',
//   'hardik@okaspropertygroup.com.au',
//   'prachi@okaspropertygroup.com.au',
//   'gaylene@okaspropertygroup.com.au',
//   "amol@okaspropertygroup.com.au",
//   "trinh@okaspropertygroup.com.au",
//   "nav@okaspropertygroup.com.au",
// ]

// const truganinaAgentArray = [
//   'nirali@okaspropertygroup.com.au',
//   'abhi@okaspropertygroup.com.au',
//   'anuj@okaspropertygroup.com.au',
//   'ellie@okaspropertygroup.com.au',
//   'kuldip@okaspropertygroup.com.au',
//   'nirav@okaspropertygroup.com.au',
//   'saloni@okaspropertygroup.com.au',
//   'hardik@okaspropertygroup.com.au',
//   "kapil@okaspropertygroup.com.au",
// ]

const agentsToRemove = [
  'gaylene@okaspropertygroup.com.au',
  'ire@okaspropertygroup.com.au',
  'marketing @okaspropertygroup.com.au',
  'marketing@okaspropertygroup.com.au',
  'kuldip@okaspropertygroup.com.au'
]

const fetchAllAgents = async (req, res) => {
  try {
    const property_from = req.query.from;
    let response = await JSON.parse(await cache.getAsync(allAgentsList));
    response = response.filter((agent) => !agentsToRemove.includes(agent?.email))
    if (Number(property_from) === 1) {
      response = response.filter((agent) => derrimutAgentArray.includes(agent?.email));
    } else if (Number(property_from) === 2) {
      response = response.filter((agent) => truganinaAgentArray.includes(agent?.email));
    }
    const finalResponse = [
      ...new Map(response.map((agent) => [agent["email"], agent])).values(),
    ];
    return res.status(200).json({
      data: { items: finalResponse, totalItems: finalResponse.length },
    });
  } catch (error) {
    if (error?.response?.status === 404) {
      return res.status(200).json({
        message: "No data found.",
        data: {},
      });
    }
    return res.status(400).json({
      error,
    });
  }
};

const fetchAgentByID = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        data: null,
        message: "Agent ID not found.",
      });
    }
    const response = await getAgentByID(id);
    return res.status(200).json({
      data: response,
    });
  } catch (error) {
    if (error?.response?.status === 404) {
      return res.status(200).json({
        message: "No data found.",
        data: {},
      });
    }
    return res.status(400).json({
      error,
    });
  }
};

const fetchAllAgentsRecordForRoutes = async (req, res) => {
  try {
    const response = await JSON.parse(await cache.getAsync(allAgentsList));
    const finalArray = []
    response.forEach(agent => {
      const json = {}
      json["id"] = agent.id
      json["firstName"] = agent.firstName
      json["lastName"] = agent.lastName
      finalArray.push(json)
    });
    return res.status(200).json({
      data: finalArray,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
}
module.exports = {
  fetchAllAgents,
  fetchAgentByID,
  fetchAllAgentsRecordForRoutes,
};
