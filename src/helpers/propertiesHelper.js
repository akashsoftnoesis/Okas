const cache = require("./redisService");
const constants = require("./constants");
const {
  ApiGet,
  headersForDerrimut,
  headersForTruganina,
} = require("./apiHelper");
const moment = require("moment")

const redisCacheTime = 30 * 60;

const getPropertiesForSale = async () => {
  try {
    // let getData = await cache.getAsync(constants.saleProperties);
    // if (!getData) {
    // const [responseForDerrimut, responseForTruganina] = await Promise.all([
    const responseForDerrimut = await ApiGet("properties/sale", headersForDerrimut, {
      pagesize: 1000,
      status: "listing",
    })
    const responseForTruganina = await ApiGet("properties/sale", headersForTruganina, {
      pagesize: 1000,
      status: "listing",
    })
    // ]);
    responseForDerrimut.data.items.forEach((property) => {
      property["agency"] = constants.derrimut;
    });
    responseForTruganina.data.items.forEach((property) => {
      property["agency"] = constants.truganina;
    });
    const response = responseForDerrimut.data.items.concat(
      responseForTruganina.data.items
    );
    await cache.setAsync(
      constants.saleProperties,
      JSON.stringify(response),
      // "EX",
      // redisCacheTime
    );
    // getData = await cache.getAsync(constants.saleProperties);
    // }
    // return JSON.parse(getData);
    return response;
  } catch (error) {
    console.log("getPropertiesForSale error => ", error);
    throw error;
  }
};

const getPropertiesForLease = async () => {
  try {
    // let getData = await cache.getAsync(constants.leaseProperties);
    // if (!getData) {
    // const [responseForDerrimut, responseForTruganina] = await Promise.all([
    const responseForDerrimut = await ApiGet("properties/lease", headersForDerrimut, {
      pagesize: 1000,
      status: "management",
      availableOnly: true,
    })
    const responseForTruganina = await ApiGet("properties/lease", headersForTruganina, {
      pagesize: 1000,
      status: "management",
      availableOnly: true,
    })
    // ]);
    responseForDerrimut.data.items.forEach((property) => {
      property["agency"] = constants.derrimut;
    });
    responseForTruganina.data.items.forEach((property) => {
      property["agency"] = constants.truganina;
    });
    const response = responseForDerrimut.data.items.concat(
      responseForTruganina.data.items
    );
    await cache.setAsync(
      constants.leaseProperties,
      JSON.stringify(response),
      // "EX",
      // redisCacheTime
    );
    // getData = await cache.getAsync(constants.leaseProperties);
    // }
    // return JSON.parse(getData);
    return response;
  } catch (error) {
    console.log(" getPropertiesForLease error => ", error);
    throw error;
  }
};

const getSalePropertyByID = async (
  property_type,
  property_id,
  property_from
) => {
  try {
    // let getData = await cache.getAsync(`${property_id}-sale-details`);
    // if (!getData) {
    let apiURL = "";
    switch (property_type) {
      case "residential":
        apiURL = `properties/residential/sale/${property_id}`;
        break;
      case "commercial":
        apiURL = `properties/commercial/sale/${property_id}`;
        break;
      case "business":
        apiURL = `properties/business/sale/${property_id}`;
        break;
      case "rural":
        apiURL = `properties/rural/sale/${property_id}`;
        break;
      case "land":
        apiURL = `properties/land/sale/${property_id}`;
        break;
      default:
        apiURL = `properties/residential/sale/${property_id}`;
        break;
    }

    // const [response, featuresDetails] = await Promise.all([
    const response = await ApiGet(
      apiURL,
      Number(property_from) === 1
        ? headersForDerrimut
        : headersForTruganina,
      {}
    )
    const featuresDetails = await ApiGet(
      `properties/${property_id}/features`,
      Number(property_from) === 1
        ? headersForDerrimut
        : headersForTruganina,
      {}
    )
    // ]);
    const featuresArray = [];
    featuresDetails.data?.items?.forEach((feature) => {
      feature.features.forEach((featureElem) => {
        if (featureElem.data?.toString() == "true") {
          featuresArray.push({
            displayName: featureElem.displayName,
            name: featureElem.name,
          });
        }
      });
    });
    response.data["features"] = featuresArray;
    await cache.setAsync(
      `${property_id}-sale-details`,
      JSON.stringify(response.data),
      // "EX",
      // redisCacheTime
    );
    // getData = await cache.getAsync(`${property_id}-sale-details`);
    // }
    // return JSON.parse(getData);
    return response.data;
  } catch (error) {
    console.log(" getSalePropertyByID error => ", error);
    throw error;
  }
};

const getLeasePropertyByID = async (
  property_type,
  property_id,
  property_from
) => {
  try {
    // let getData = await cache.getAsync(`${property_id}-lease-details`);
    // if (!getData) {
    let apiURL = "";
    switch (property_type) {
      case "residential":
        apiURL = `properties/residential/lease/${property_id}`;
        break;
      case "commercial":
        apiURL = `properties/commercial/lease/${property_id}`;
        break;
      case "holidayRental":
        apiURL = `properties/holidayRental/lease/${property_id}`;
        break;
      default:
        apiURL = `properties/residential/lease/${property_id}`;
        break;
    }

    // const [response, featuresDetails] = await Promise.all([
    const response = await ApiGet(
      apiURL,
      Number(property_from) === 1
        ? headersForDerrimut
        : headersForTruganina,
      {}
    )
    const featuresDetails = await ApiGet(
      `properties/${property_id}/features`,
      Number(property_from) === 1
        ? headersForDerrimut
        : headersForTruganina,
      {}
    )
    // ]);
    const featuresArray = [];
    featuresDetails.data?.items?.forEach((feature) => {
      feature.features.forEach((featureElem) => {
        if (featureElem.data?.toString() == "true") {
          featuresArray.push({
            displayName: featureElem.displayName,
            name: featureElem.name,
          });
        }
      });
    });
    response.data["features"] = featuresArray;
    await cache.setAsync(
      `${property_id}-lease-details`,
      JSON.stringify(response.data),
      // "EX",
      // redisCacheTime
    );
    //   getData = await cache.getAsync(`${property_id}-lease-details`);
    // }
    // return JSON.parse(getData);
    return response.data;
  } catch (error) {
    console.log(" getLeasePropertyByID error => ", error);
    throw error;
  }
};

const getUpcomingOpenHomes = async (type) => {
  try {
    // let getData = await cache.getAsync(
    //   `${type}-${constants.upcomingOpenHomes}`
    // );
    // if (!getData) {
    // const [
    //   responseForDerrimut,
    //   responseForTruganina,
    //   salePropertyDetails,
    //   leasePropertyDetails,
    // ] = await Promise.all([
    const responseForDerrimut = await ApiGet("account/upcomingOpenHomes", headersForDerrimut, {
      pagesize: 1000,
    })
    const responseForTruganina = await ApiGet("account/upcomingOpenHomes", headersForTruganina, {
      pagesize: 1000,
    })
    const salePropertyDetails = await JSON.parse(await cache.getAsync(constants.saleProperties))
    const leasePropertyDetails = await JSON.parse(await cache.getAsync(constants.leaseProperties))
    // getPropertiesForSale(),
    // getPropertiesForLease(),
    // ]);
    responseForDerrimut.data.items.forEach((property) => {
      property["agency"] = constants.derrimut;
    });
    responseForTruganina.data.items.forEach((property) => {
      property["agency"] = constants.truganina;
    });

    const finalResponse = {};
    const response = responseForDerrimut.data.items.concat(
      responseForTruganina.data.items
    );
    response.forEach((openHome) => {
      if (type == "sale") {
        const matchedProperty = salePropertyDetails.find(
          (property) => property.id === openHome.property.id
        );
        openHome["property_details"] = matchedProperty;
      } else if (type == "lease") {
        const matchedProperty = leasePropertyDetails.find(
          (property) => property.id === openHome.property.id
        );
        openHome["property_details"] = matchedProperty;
      }
      if (openHome["property_details"]) {
        // if (Date.now() < new Date(openHome?.start).getTime()) {
        if (moment().tz("Australia/Sydney").valueOf() < moment(openHome?.start).tz("Australia/Sydney").valueOf()) {
          const splitDate = moment(openHome?.start).tz("Australia/Sydney").format()?.toString().split("T");
          if (finalResponse[splitDate[0]]) {
            finalResponse[splitDate[0]].push(openHome);
          } else {
            finalResponse[splitDate[0]] = [openHome];
          }
        }
      }
    });
    await cache.setAsync(
      `${type}-${constants.upcomingOpenHomes}`,
      JSON.stringify(finalResponse),
      // "EX",
      // redisCacheTime
    );
    // getData = await cache.getAsync(`${type}-${constants.upcomingOpenHomes}`);
    // }
    // return JSON.parse(getData);
    return finalResponse;
  } catch (error) {
    console.log(" getUpcomingOpenHomes error => ", error);
    throw error;
  }
};

// const getSoldProperties = async () => {
//   try {
//     // let getData = await cache.getAsync(constants.soldProperties);
//     // if (!getData) {
//     // const [
//     //   residentialDerrimut,
//     // ruralDerrimut,
//     // commercialDerrimut,
//     // businessDerrimut,
//     // landDerrimut,
//     // residentialTruganina,
//     // ruralTruganina,
//     // commercialTruganina,
//     // businessTruganina,
//     // landTruganina,
//     // ] = await Promise.all([
//     const residentialDerrimut = await ApiGet("properties/residential/sale/sold", headersForDerrimut, {
//       pagesize: 1000,
//     })
//     const ruralDerrimut = await ApiGet("properties/rural/sale/sold", headersForDerrimut, {
//       pagesize: 1000,
//     })
//     const commercialDerrimut = await ApiGet("properties/commercial/sale/sold", headersForDerrimut, {
//       pagesize: 1000,
//     })
//     const businessDerrimut = await ApiGet("properties/business/sale/sold", headersForDerrimut, {
//       pagesize: 1000,
//     })
//     const landDerrimut = await ApiGet("properties/land/sale/sold", headersForDerrimut, {
//       pagesize: 1000,
//     })
//     const residentialTruganina = await ApiGet("properties/residential/sale/sold", headersForTruganina, {
//       pagesize: 1000,
//     })
//     const ruralTruganina = await ApiGet("properties/rural/sale/sold", headersForTruganina, {
//       pagesize: 1000,
//     })
//     const commercialTruganina = await ApiGet("properties/commercial/sale/sold", headersForTruganina, {
//       pagesize: 1000,
//     })
//     const businessTruganina = await ApiGet("properties/business/sale/sold", headersForTruganina, {
//       pagesize: 1000,
//     })
//     const landTruganina = await ApiGet("properties/land/sale/sold", headersForTruganina, {
//       pagesize: 1000,
//     })
//     // ]);
//     const responseForDerrimut = residentialDerrimut.data.items.concat(
//       ruralDerrimut.data.items,
//       commercialDerrimut.data.items,
//       businessDerrimut.data.items,
//       landDerrimut.data.items
//     );
//     const responseForTruganina = residentialTruganina.data.items.concat(
//       ruralTruganina.data.items,
//       commercialTruganina.data.items,
//       businessTruganina.data.items,
//       landTruganina.data.items
//     );
//     responseForDerrimut.forEach((property) => {
//       property["agency"] = constants.derrimut;
//     });
//     responseForTruganina.forEach((property) => {
//       property["agency"] = constants.truganina;
//     });

//     const response = responseForDerrimut.concat(responseForTruganina);
//     await cache.setAsync(
//       constants.soldProperties,
//       JSON.stringify(response),
//       // "EX",
//       // redisCacheTime
//     );
//     //   getData = await cache.getAsync(constants.soldProperties);
//     // }
//     // return JSON.parse(getData);
//     return response;
//   } catch (error) {
//     console.log("getSoldProperties error => ", error);
//     throw error;
//   }
// };


// Add new code for get sold data from valuter 20-11-2024 by A&K
const fetchAllData = async (url, headers, params) => {
  try {
    let allData = [];
    let currentPage = 1;
    let totalPages = 1;

    // Loop through all pages of the data
    while (currentPage <= totalPages) {
      // Update the params to request the current page
      const response = await ApiGet(url, headers, { ...params, page: currentPage });
      
      // Update the totalPages from the response
      totalPages = response.data.totalPages;

      // Add the current page data to the allData array
      allData = allData.concat(response.data.items);

      // Move to the next page
      currentPage++;
    }

    return allData;
  } catch (error) {
    console.log("Error fetching data:", error);
    throw error;
  }
};

const getSoldProperties = async () => {
  try {
    // Fetch data from all pages for each category (Derrimut and Truganina)
    const residentialDerrimut = await fetchAllData(
      "properties/residential/sale/sold",
      headersForDerrimut,
      { pagesize: 2000 }
    );
    const ruralDerrimut = await fetchAllData(
      "properties/rural/sale/sold",
      headersForDerrimut,
      { pagesize: 2000 }
    );
    const commercialDerrimut = await fetchAllData(
      "properties/commercial/sale/sold",
      headersForDerrimut,
      { pagesize: 2000 }
    );
    const businessDerrimut = await fetchAllData(
      "properties/business/sale/sold",
      headersForDerrimut,
      { pagesize: 2000 }
    );
    const landDerrimut = await fetchAllData(
      "properties/land/sale/sold",
      headersForDerrimut,
      { pagesize: 2000 }
    );

    const residentialTruganina = await fetchAllData(
      "properties/residential/sale/sold",
      headersForTruganina,
      { pagesize: 2000 }
    );
    const ruralTruganina = await fetchAllData(
      "properties/rural/sale/sold",
      headersForTruganina,
      { pagesize: 2000 }
    );
    const commercialTruganina = await fetchAllData(
      "properties/commercial/sale/sold",
      headersForTruganina,
      { pagesize: 2000 }
    );
    const businessTruganina = await fetchAllData(
      "properties/business/sale/sold",
      headersForTruganina,
      { pagesize: 2000 }
    );
    const landTruganina = await fetchAllData(
      "properties/land/sale/sold",
      headersForTruganina,
      { pagesize: 2000 }
    );

    // Combine all the results for Derrimut
    const responseForDerrimut = residentialDerrimut.concat(
      ruralDerrimut,
      commercialDerrimut,
      businessDerrimut,
      landDerrimut
    );

    // Combine all the results for Truganina
    const responseForTruganina = residentialTruganina.concat(
      ruralTruganina,
      commercialTruganina,
      businessTruganina,
      landTruganina
    );

    // Add agency info to each property in Derrimut
    responseForDerrimut.forEach((property) => {
      property["agency"] = constants.derrimut;
    });

    // Add agency info to each property in Truganina
    responseForTruganina.forEach((property) => {
      property["agency"] = constants.truganina;
    });

    // Combine results from both Derrimut and Truganina
    const response = responseForDerrimut.concat(responseForTruganina);

    // Store data in cache
    await cache.setAsync(constants.soldProperties, JSON.stringify(response));

    // Return the combined response
    return response;
  } catch (error) {
    console.log("getSoldProperties error => ", error);
    throw error;
  }
};

// End Add new code for get sold data from valuter 20-11-2024 by A&K



const getSinglePropertyOpenHome = async (property_id, property_type, lifeId, property_from) => {
  const date = new Date()
  const response = await ApiGet(
    `properties/${property_id}/${property_type}/${lifeId}/openHomes`,
    Number(property_from) === 1 ? headersForDerrimut : headersForTruganina,
    {
      startingAfter: date
    }
  );
  await cache.setAsync(
    `${property_id}-${constants.upcomingOpenHomes}`,
    JSON.stringify(response.data),
  );
  return response.data
}

module.exports = {
  getPropertiesForSale,
  getPropertiesForLease,
  getSalePropertyByID,
  getLeasePropertyByID,
  getUpcomingOpenHomes,
  getSoldProperties,
  getSinglePropertyOpenHome,
};
