const cache = require("./redisService");
const constants = require("./constants");
const vCardsJS = require("vcards-js2");
const {
  ApiGet,
  headersForDerrimut,
  headersForTruganina,
} = require("./apiHelper");
// const {
//   getPropertiesForSale,
//   getSoldProperties,
//   getPropertiesForLease,
// } = require("./propertiesHelper");
const { hardikAsAgent, agentsStaticData, agentDataWhichNotInVaultRe } = require("./constantData");

const getAgentMobileNumber = async (contactDetails, type) => {
  const mobileObj = await contactDetails?.find(
    (contact) => contact?.typeCode == type.toString()
  );
  return mobileObj?.number;
};

const redisCacheTime = 30 * 60;

const derrimutAgentArray = [
  "vish@okaspropertygroup.com.au",
  "neha@okaspropertygroup.com.au",
  "priydeep@okaspropertygroup.com.au",
  "ridhima@okaspropertygroup.com.au",
  "thao@okaspropertygroup.com.au",
  "cindy@okaspropertygroup.com.au",
  "marie@okaspropertygroup.com.au",
  "hardik@okaspropertygroup.com.au",
  "prachi@okaspropertygroup.com.au",
  "gaylene@okaspropertygroup.com.au",
  "amol@okaspropertygroup.com.au",
  "trinh@okaspropertygroup.com.au",
  "nav@okaspropertygroup.com.au",
  "priyanka@okaspropertygroup.com.au",
];

const truganinaAgentArray = [
  "nirali@okaspropertygroup.com.au",
  "abhi@okaspropertygroup.com.au",
  "anuj@okaspropertygroup.com.au",
  "ellie@okaspropertygroup.com.au",
  "kuldip@okaspropertygroup.com.au",
  "nirav@okaspropertygroup.com.au",
  "saloni@okaspropertygroup.com.au",
  "hardik@okaspropertygroup.com.au",
  "kapil@okaspropertygroup.com.au",
  "adminokas@okaspropertygroup.com.au",
  "rentals@okaspropertygroup.com.au",
  "samir@okaspropertygroup.com.au",
  "Rashpal@okaspropertygroup.com.au"
];

const agentPriorityJson = {
  "hardik@okaspropertygroup.com.au": 1,
  "kuldip@okaspropertygroup.com.au": 2,
  "nirali@okaspropertygroup.com.au": 3,
  "vish@okaspropertygroup.com.au": 4,
  "anuj@okaspropertygroup.com.au": 5,
  "neha@okaspropertygroup.com.au": 6,
  "abhi@okaspropertygroup.com.au": 7,
  "cindy@okaspropertygroup.com.au": 8,
  "ellie@okaspropertygroup.com.au": 9,
  "nirav@okaspropertygroup.com.au": 10,
  "thao@okaspropertygroup.com.au": 11,
  "ridhima@okaspropertygroup.com.au": 12,
  "saloni@okaspropertygroup.com.au": 13,
  "priydeep@okaspropertygroup.com.au": 14,
  "marie@okaspropertygroup.com.au": 15,
  "prachi@okaspropertygroup.com.au": 16,
  // "gaylene@okaspropertygroup.com.au": 17,
  "kapil@okaspropertygroup.com.au": 18,
  "amol@okaspropertygroup.com.au": 19,
  "trinh@okaspropertygroup.com.au": 20,
  "nav@okaspropertygroup.com.au": 21,
  "ami@okaspropertygroup.com.au": 22,
  "priyanka@okaspropertygroup.com.au": 23,
  "samir@okaspropertygroup.com.au": 24,
  "leasing@okaspropertygroup.com.au": 25,
  "rentals@okaspropertygroup.com.au": 26,
  "adminokas@okaspropertygroup.com.au": 27,
  "Rashpal@okaspropertygroup.com.au": 28,
  "ire@okaspropertygroup.com.au": 1000,
};

const getAllAgents = async () => {
  try {
    // let getData = await cache.getAsync(constants.allAgentsList);
    // if (getData) {
    // const [responseForDerrimut, responseForTruganina] = await Promise.all([
    const responseForDerrimut = await ApiGet(
      "account/users",
      headersForDerrimut,
      {
        pagesize: 1000,
      }
    );
    const responseForTruganina = await ApiGet(
      "account/users",
      headersForTruganina,
      {
        pagesize: 1000,
      }
    );
    // ]);
    await responseForDerrimut.data.items.forEach(async (property) => {
      property["agency"] = derrimutAgentArray.includes(property?.email)
        ? constants.derrimut
        : truganinaAgentArray.includes(property?.email)
          ? constants.truganina
          : constants.derrimut;
      property["agent_priority"] = agentPriorityJson[property?.email];
      const selectedData = await agentsStaticData.find(
        (agent) => agent?.email === property?.email
      );
      property["description"] = selectedData?.description;
      property["facebook_url"] = selectedData?.facebook_url;
      property["instagram_url"] = selectedData?.instagram_url;
      property["linkedIn_url"] = selectedData?.linkedIn_url;
      property["rateMyAgent_url"] = selectedData?.rateMyAgent_url;
      if (selectedData?.image_name) {
        property["photo"][
          "original"
        ] = `${process.env.SITE_URL}/uploads/${selectedData?.image_name}`;
        property["photo"][
          "thumb_360"
        ] = `${process.env.SITE_URL}/uploads/${selectedData?.image_name}`;
      } else {
        property["photo"][
          "original"
        ] = `${process.env.SITE_URL}/uploads/rectangle.jpg`;
        property["photo"][
          "thumb_360"
        ] = `${process.env.SITE_URL}/uploads/rectangle.jpg`;
      }
    });
    await responseForTruganina.data.items.forEach(async (property) => {
      property["agency"] = truganinaAgentArray.includes(property?.email)
        ? constants.truganina
        : derrimutAgentArray.includes(property?.email)
          ? constants.derrimut
          : constants.truganina;
      property["agent_priority"] = agentPriorityJson[property?.email];
      const selectedData = await agentsStaticData.find(
        (agent) => agent?.email === property?.email
      );
      property["description"] = selectedData?.description;
      property["facebook_url"] = selectedData?.facebook_url;
      property["instagram_url"] = selectedData?.instagram_url;
      property["linkedIn_url"] = selectedData?.linkedIn_url;
      property["rateMyAgent_url"] = selectedData?.rateMyAgent_url;
      if (selectedData?.image_name) {
        property["photo"][
          "original"
        ] = `${process.env.SITE_URL}/uploads/${selectedData?.image_name}`;
        property["photo"][
          "thumb_360"
        ] = `${process.env.SITE_URL}/uploads/${selectedData?.image_name}`;
      } 
      // else {
      //   property["photo"][
      //     "original"
      //   ] = `${process.env.SITE_URL}/uploads/rectangle.jpg`;
      //   property["photo"][
      //     "thumb_360"
      //   ] = `${process.env.SITE_URL}/uploads/rectangle.jpg`;
      // }
    });
    const response = responseForDerrimut.data.items.concat(
      responseForTruganina.data.items
    );
    response.push(
      { ...hardikAsAgent, agency: constants.derrimut },
      { ...hardikAsAgent, agency: constants.truganina }
    );
    agentDataWhichNotInVaultRe.forEach(agent => {
      response.push({...agent, agent_priority: agentPriorityJson[agent?.email]})
    })
    for (const agent of response) {
      const vCard = vCardsJS();
      vCard.firstName = agent.firstName;
      vCard.lastName = agent.lastName;
      vCard.title = agent.position;
      vCard.organization = "Okas Property Group";
      vCard.cellPhone = await getAgentMobileNumber(agent?.phoneNumbers, "M");
      vCard.workPhone =
        agent?.agency === constants.derrimut ? "03 8390 0699" : "03 7038 6527";
      vCard.workAddress.street =
        agent?.agency === constants.derrimut
          ? "Unit 5, 31 Elgar Road"
          : "3/209 Palmers Rd";
      vCard.workAddress.city =
        agent?.agency === constants.derrimut ? "Derrimut" : "Truganina";
      vCard.workAddress.stateProvince = "VIC";
      vCard.workAddress.postalCode =
        agent?.agency === constants.derrimut ? "3026" : "3029";
      vCard.email = agent.email;
      vCard.workEmail = "info@okaspropertygroup.com.au";
      agent["vCard"] = vCard.getFormattedString();
    }
    await cache.setAsync(
      constants.allAgentsList,
      JSON.stringify(response)
      // "EX",
      // redisCacheTime
    );
    // getData = await cache.getAsync(constants.allAgentsList);
    // }
    // return JSON.parse(getData);
    return response;
  } catch (error) {
    console.log("getAllAgents error => ", error);
    throw error;
  }
};

const getAgentByID = async (agent_id) => {
  try {
    let getData = await cache.getAsync(`${agent_id}-agent`);
    if (!getData) {
      const [
        agentsList,
        allSaleProperties,
        allLeaseProperties,
        allSoldProperties,
      ] = await Promise.all([
        // getAllAgents(),
        // getPropertiesForSale(),
        // getPropertiesForLease(),
        // getSoldProperties(),
        JSON.parse(await cache.getAsync(constants.allAgentsList)),
        JSON.parse(await cache.getAsync(constants.saleProperties)),
        JSON.parse(await cache.getAsync(constants.leaseProperties)),
        JSON.parse(await cache.getAsync(constants.soldProperties)),
      ]);
      const selectedAgent = await agentsList.find(
        (agent) => agent.id === Number(agent_id)
      );
      const [salePropertyOfagent, leasePropertyOfagent, soldPropertyOfagent] =
        await Promise.all([
          filterPropertiesOfAgent(selectedAgent?.email, allSaleProperties),
          filterPropertiesOfAgent(selectedAgent?.email, allLeaseProperties),
          filterPropertiesOfAgent(selectedAgent?.email, allSoldProperties),
        ]);

      selectedAgent["saleProperties"] = salePropertyOfagent || [];
      selectedAgent["leaseProperties"] = leasePropertyOfagent || [];
      selectedAgent["soldProperties"] = soldPropertyOfagent || [];

      await cache.setAsync(
        `${agent_id}-agent`,
        JSON.stringify(selectedAgent),
        "EX",
        redisCacheTime
      );
      getData = await cache.getAsync(`${agent_id}-agent`);
    }
    return JSON.parse(getData);
  } catch (error) {
    console.log("getAgentByID error => ", error);
    throw error;
  }
};

const filterPropertiesOfAgent = async (email, propertiesArray) => {
  try {
    const propertiesOfAgent = await propertiesArray.filter((property) => {
      const matchedAgent = property?.contactStaff.filter(
        (staff) => staff.email == email
      );
      return matchedAgent?.length;
    });
    return propertiesOfAgent;
  } catch (error) {
    console.log("filterPropertiesOfAgent error => ", error);
    throw error;
  }
};

const getPropertyClass = async () => {
  try {
    const response = await ApiGet(
      "types/propertyClass",
      headersForDerrimut,
      {}
    );
    await cache.setAsync(
      constants.propertyClassLabel,
      JSON.stringify(response.data)
      // "EX",
      // redisCacheTime
    );
    return response.data;
  } catch (error) {
    console.log("getPropertyClass error => ", error);
    throw error;
  }
};

module.exports = {
  getAllAgents,
  getAgentByID,
  getPropertyClass,
  derrimutAgentArray,
  truganinaAgentArray,
};
