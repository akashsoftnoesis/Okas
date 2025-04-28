const { getAllAgents } = require("./agentsHelper");
const constants = require("./constants");
const {
  getPropertiesForSale,
  getPropertiesForLease,
  getSoldProperties,
  getSalePropertyByID,
  getLeasePropertyByID,
  getUpcomingOpenHomes,
  getSinglePropertyOpenHome,
} = require("./propertiesHelper");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const propertyAndAgentCronJob = async () => {
  console.log("Property and Agent Cron job started At =>", new Date());
  // const [propertiesSale,
  //   // propertiesLease, propertiesSold
  // ] = await Promise.all([
  //   getPropertiesForSale(),
  //   // getPropertiesForLease(),
  //   // getSoldProperties(),
  // ]);

  const propertiesSale = await getPropertiesForSale();
  const propertiesLease = await getPropertiesForLease();
  const propertiesSold = await getSoldProperties();
  await getAllAgents();

  for (const property of propertiesSale) {
    console.log("\n\n\n\n propertiesSale property id", property?.id);
    await sleep(1000);
    if (property?.type?.propertyClass?.internalName) {
      await getSalePropertyByID(
        property?.type?.propertyClass?.internalName,
        property?.id,
        property?.agency === constants.derrimut ? 1 : 2
      );
    }
  }

  for (const property of propertiesLease) {
    console.log("\n\n\n\n propertiesLease property id", property?.id);
    await sleep(1000);

    if (property?.type?.propertyClass?.internalName) {
      await getLeasePropertyByID(
        property?.type?.propertyClass?.internalName,
        property?.id,
        property?.agency === constants.derrimut ? 1 : 2
      );
    }
  }

  for (const property of propertiesSold) {
    console.log("\n\n\n\n propertiesSold property id", property?.id);
    await sleep(1000);

    if (property?.type?.propertyClass?.internalName) {
      await getSalePropertyByID(
        property?.type?.propertyClass?.internalName,
        property?.id,
        property?.agency === constants.derrimut ? 1 : 2
      );
    }
  }
  console.log("Property and Agent Cron job ended At =>", new Date());
};

const openHomesCronJob = async () => {
  console.log("OpenHomes Cron job started At =>", new Date());
  await getUpcomingOpenHomes("sale");
  await getUpcomingOpenHomes("lease");

  const salePropertyDetails = await JSON.parse(
    await cache.getAsync(constants.saleProperties)
  );
  const leasePropertyDetails = await JSON.parse(
    await cache.getAsync(constants.leaseProperties)
  );

  for (const property of salePropertyDetails) {
    await sleep(1129);
    await getSinglePropertyOpenHome(
      property?.id,
      "sale",
      property?.saleLifeId,
      property?.agency === constants.derrimut ? 1 : 2
    );
  }

  for (const property of leasePropertyDetails) {
    await sleep(1129);
    await getSinglePropertyOpenHome(
      property?.id,
      "lease",
      property?.leaseLifeId,
      property?.agency === constants.derrimut ? 1 : 2
    );
  }

  console.log("OpenHomes Cron job ended At =>", new Date());
};

module.exports = { propertyAndAgentCronJob, openHomesCronJob };
