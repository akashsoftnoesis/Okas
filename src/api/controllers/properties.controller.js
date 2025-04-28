const {
  ApiGet,
  headersForDerrimut,
  headersForTruganina,
} = require("../../helpers/apiHelper");
const cache = require("../../helpers/redisService");
const { derrimut, truganina, saleProperties, leaseProperties, soldProperties, upcomingOpenHomes } = require("../../helpers/constants");
const {
  getPropertiesForSale,
  getPropertiesForLease,
  getSalePropertyByID,
  getLeasePropertyByID,
  getUpcomingOpenHomes,
  getSoldProperties,
} = require("../../helpers/propertiesHelper");

const fetchPropertiesForSale = async (req, res) => {
  try {
    const property_from = req.query.from;
    let response = await JSON.parse(await cache.getAsync(saleProperties))
    if (Number(property_from) === 1) {
      response = response.filter((property) => property?.agency === derrimut);
    } else if (Number(property_from) === 2) {
      response = response.filter((property) => property?.agency === truganina);
    }
    return res.status(200).json({
      data: { items: response, totalItems: response.length },
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

const fetchPropertiesForLease = async (req, res) => {
  try {
    const property_from = req.query.from;
    let response = await JSON.parse(await cache.getAsync(leaseProperties))
    if (Number(property_from) === 1) {
      response = response.filter((property) => property?.agency === derrimut);
    } else if (Number(property_from) === 2) {
      response = response.filter((property) => property?.agency === truganina);
    }
    return res.status(200).json({
      data: { items: response, totalItems: response.length },
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

const fetchSalePropertyByID = async (req, res) => {
  try {
    const property_type = req.query.type;
    const property_from = req.query.from;
    const property_id = req.params.id;
    // const response = await getSalePropertyByID(
    //   property_type,
    //   property_id,
    //   property_from
    // );
    const response = await JSON.parse(await cache.getAsync(`${property_id}-sale-details`))
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

const fetchLeasePropertyByID = async (req, res) => {
  try {
    const property_type = req.query.type;
    const property_from = req.query.from;
    const property_id = req.params.id;
    // const response = await getLeasePropertyByID(
    //   property_type,
    //   property_id,
    //   property_from
    // );
    const response = await JSON.parse(await cache.getAsync(`${property_id}-lease-details`))
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

const fetchUpcomingOpenHomes = async (req, res) => {
  try {
    const { type } = req.query;
    // const response = await getUpcomingOpenHomes(type.toString());
    const response = await JSON.parse(await cache.getAsync(`${type?.toString()}-${upcomingOpenHomes}`))
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

const fetchSoldProperties = async (req, res) => {
  try {
    const property_from = req.query.from;
    let response = await JSON.parse(await cache.getAsync(soldProperties))
    if (Number(property_from) === 1) {
      response = response.filter((property) => property?.agency === derrimut);
    } else if (Number(property_from) === 2) {
      response = response.filter((property) => property?.agency === truganina);
    }
    return res.status(200).json({
      data: { items: response, totalItems: response.length },
    });
  } catch (error) {
    console.log("errrorrr ===> ", error);
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

const fetchUpcomingOpenHomesById = async (req, res) => {
  try {
    const { id, type, lifeId } = req.params;
    const property_from = req.query.from;
    // const date = new Date()
    // const response = await ApiGet(
    //   `properties/${id}/${type}/${lifeId}/openHomes`,
    //   Number(property_from) === 1 ? headersForDerrimut : headersForTruganina,
    //   {
    //     startingAfter: date
    //   }
    // );
    const response = await JSON.parse(await cache.getAsync(`${id}-${upcomingOpenHomes}`))
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

const fetchAllPropertiesList = async (req, res) => {
  try {
    const [propertiesForSale, propertiesForLease, soldProperties] =
      await Promise.all([
        // getPropertiesForSale(),
        // getPropertiesForLease(),
        // getSoldProperties(),
        JSON.parse(await cache.getAsync(saleProperties)),
        JSON.parse(await cache.getAsync(leaseProperties)),
        JSON.parse(await cache.getAsync(soldProperties)),
      ]);
    const finalArray = [];
    propertiesForSale.forEach((property) => {
      const json = {};
      json["id"] = property.id;
      json["agency"] = property.agency;
      json["category"] = "sale";
      json["displayAddress"] = property.displayAddress;
      json["propertyType"] = property.class.internalName;
      finalArray.push(json);
    });
    propertiesForLease.forEach((property) => {
      const json = {};
      json["id"] = property.id;
      json["agency"] = property.agency;
      json["category"] = "lease";
      json["displayAddress"] = property.displayAddress;
      json["propertyType"] = property.class.internalName;
      finalArray.push(json);
    });
    soldProperties.forEach((property) => {
      const json = {};
      json["id"] = property.id;
      json["agency"] = property.agency;
      json["category"] = "sold";
      json["displayAddress"] = property.displayAddress;
      json["propertyType"] = property.class.internalName;
      finalArray.push(json);
    });

    return res.status(200).json({
      data: finalArray,
    });
  } catch (error) {
    if (error?.response?.statusCode === 404) {
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

module.exports = {
  fetchPropertiesForSale,
  fetchPropertiesForLease,
  fetchSalePropertyByID,
  fetchLeasePropertyByID,
  fetchUpcomingOpenHomes,
  fetchSoldProperties,
  fetchUpcomingOpenHomesById,
  fetchAllPropertiesList,
};
